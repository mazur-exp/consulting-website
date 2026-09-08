import { appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import type { Request, Response, NextFunction } from 'express';

/**
 * Серверный лог трафика — то, чего JS-счётчик не видит принципиально.
 *
 * GPTBot, ClaudeBot и PerplexityBot JavaScript не исполняют, поэтому в Umami и
 * GA4 их нет и быть не может. А именно они — опережающий показатель: сегодня
 * краулер забрал /answers, через месяц оттуда приходят люди. Реферал из
 * ChatGPT это уже результат, обход краулера — предсказание.
 *
 * Отдельно ловим «живые» агенты (ChatGPT-User, Perplexity-User, Claude-User):
 * это не плановый обход, а страница, которую движок тянет ПРЯМО СЕЙЧАС, чтобы
 * ответить человеку на вопрос. Ближайшее, что вообще можно измерить к фразе
 * «нас только что порекомендовали».
 *
 * Пишем только то, что несёт смысл: заходы ботов и заходы людей с внешним
 * реферером. Обычные человеческие клики считает Umami, дублировать их здесь
 * незачем — файл рос бы впустую.
 *
 * Формат — JSONL по файлу на день. Читает scripts/traffic-digest.mjs.
 */

export type UaKind =
  | 'ai-crawler'
  | 'ai-user'
  | 'search-crawler'
  | 'social-preview'
  | 'seo-tool'
  | 'monitor'
  | 'other-bot'
  | 'human';

/** Порядок важен: живые агенты проверяются раньше плановых краулеров. */
const UA_RULES: Array<[RegExp, UaKind, string]> = [
  // Движок тянет страницу, чтобы ответить человеку прямо сейчас
  [/ChatGPT-User/i, 'ai-user', 'ChatGPT-User'],
  [/OAI-SearchBot/i, 'ai-crawler', 'OAI-SearchBot'],
  [/Perplexity-User/i, 'ai-user', 'Perplexity-User'],
  [/Claude-User/i, 'ai-user', 'Claude-User'],
  [/Claude-SearchBot/i, 'ai-crawler', 'Claude-SearchBot'],
  // Плановые обходы для обучения и индекса
  [/GPTBot/i, 'ai-crawler', 'GPTBot'],
  [/ClaudeBot/i, 'ai-crawler', 'ClaudeBot'],
  [/anthropic-ai/i, 'ai-crawler', 'anthropic-ai'],
  [/PerplexityBot/i, 'ai-crawler', 'PerplexityBot'],
  [/Google-Extended/i, 'ai-crawler', 'Google-Extended'],
  [/Applebot-Extended/i, 'ai-crawler', 'Applebot-Extended'],
  [/meta-externalagent|FacebookBot/i, 'ai-crawler', 'meta-externalagent'],
  [/cohere-ai/i, 'ai-crawler', 'cohere-ai'],
  [/Bytespider/i, 'ai-crawler', 'Bytespider'],
  [/Amazonbot/i, 'ai-crawler', 'Amazonbot'],
  [/Diffbot/i, 'ai-crawler', 'Diffbot'],
  [/Timpibot|Omgilibot|Webzio/i, 'ai-crawler', 'dataset-crawler'],
  // Обычный поиск
  [/Googlebot/i, 'search-crawler', 'Googlebot'],
  [/bingbot|BingPreview/i, 'search-crawler', 'Bingbot'],
  [/DuckDuckBot/i, 'search-crawler', 'DuckDuckBot'],
  [/YandexBot/i, 'search-crawler', 'YandexBot'],
  [/Applebot/i, 'search-crawler', 'Applebot'],
  [/Baiduspider/i, 'search-crawler', 'Baiduspider'],
  // Превьюшки в мессенджерах и соцсетях
  [/facebookexternalhit/i, 'social-preview', 'Facebook'],
  [/TelegramBot/i, 'social-preview', 'Telegram'],
  [/WhatsApp/i, 'social-preview', 'WhatsApp'],
  [/LinkedInBot/i, 'social-preview', 'LinkedIn'],
  [/Twitterbot/i, 'social-preview', 'X'],
  [/Slackbot/i, 'social-preview', 'Slack'],
  [/Discordbot/i, 'social-preview', 'Discord'],
  // Шум
  [/SemrushBot|AhrefsBot|MJ12bot|DotBot|DataForSeoBot|BLEXBot|SerpstatBot/i, 'seo-tool', 'seo-tool'],
  [/UptimeRobot|Pingdom|StatusCake|Better ?Uptime/i, 'monitor', 'uptime'],
];

export const classifyUserAgent = (ua: string): { kind: UaKind; bot: string | null } => {
  if (!ua) return { kind: 'other-bot', bot: 'unknown' };
  for (const [re, kind, bot] of UA_RULES) {
    if (re.test(ua)) return { kind, bot };
  }
  // Грубая отсечка всего, что называет себя ботом, но нам незнакомо
  if (/bot|crawler|spider|scrape|curl|wget|python-requests|headless/i.test(ua)) {
    return { kind: 'other-bot', bot: 'unknown-bot' };
  }
  return { kind: 'human', bot: null };
};

/** Статика и служебное: в логе источников им делать нечего. */
const SKIP = /\.(js|mjs|css|map|png|jpe?g|gif|svg|webp|avif|ico|woff2?|ttf|mp4|webm|pdf)$/i;

/**
 * IP режем до /24. Для «из какой страны пришёл краулер» этого хватает, а
 * полный адрес посетителя хранить незачем.
 */
const maskIp = (raw: string): string => {
  const ip = (raw.split(',')[0] ?? '').trim();
  if (ip.includes(':')) return ip.split(':').slice(0, 4).join(':') + '::';
  const parts = ip.split('.');
  return parts.length === 4 ? `${parts[0]}.${parts[1]}.${parts[2]}.0` : ip;
};

const hostOf = (referer: string): string => {
  try {
    return new URL(referer).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
};

const LOG_DIR = path.resolve(process.env.TRAFFIC_LOG_DIR || 'logs');
let dirReady: Promise<unknown> | null = null;

const write = async (line: string) => {
  if (!dirReady) dirReady = mkdir(LOG_DIR, { recursive: true }).catch(() => {});
  await dirReady;
  const day = new Date().toISOString().slice(0, 10);
  await appendFile(path.join(LOG_DIR, `traffic-${day}.jsonl`), line + '\n');
};

export const trafficLogger = () => (req: Request, res: Response, next: NextFunction) => {
  next(); // логирование никогда не стоит на пути ответа

  try {
    if (req.method !== 'GET') return;
    const url = req.path;
    if (SKIP.test(url) || url.startsWith('/api') || url === '/health' || url === '/up') return;

    const ua = String(req.headers['user-agent'] ?? '');
    const { kind, bot } = classifyUserAgent(ua);
    const referer = String(req.headers.referer ?? req.headers.referrer ?? '');
    const refHost = hostOf(referer);
    const external = refHost !== '' && !/(^|\.)booster\.delivery$/i.test(refHost);

    // Люди без внешнего реферера — работа Umami, здесь они лишний объём
    if (kind === 'human' && !external) return;
    if (kind === 'monitor') return;

    const entry = {
      ts: new Date().toISOString(),
      kind,
      bot,
      path: url,
      query: req.url.includes('?') ? req.url.slice(req.url.indexOf('?') + 1).slice(0, 200) : '',
      host: String(req.headers.host ?? ''),
      referrer: refHost,
      ua: ua.slice(0, 200),
      ip: maskIp(String(req.headers['x-forwarded-for'] ?? req.socket.remoteAddress ?? '')),
      status: res.statusCode,
    };

    void write(JSON.stringify(entry)).catch(() => {});
  } catch {
    /* лог не имеет права ломать сайт */
  }
};
