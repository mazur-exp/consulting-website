/**
 * Аналитика источников трафика.
 *
 * Задача не «посчитать посещения» — её решает любой счётчик из коробки.
 * Задача в том, чтобы на вопрос «нас порекомендовал ИИ?» был ответ строкой в
 * отчёте, а не раскопками в списке рефереров. Поэтому при первом заходе в
 * сессии мы разбираем реферер и UTM, приводим их к понятному имени источника
 * (ChatGPT, Perplexity, YouTube, Telegram) и шлём одно именованное событие.
 *
 * Два счётчика, у каждого своя роль:
 *   Umami  — свой сервер, без кук, согласия не требует, работает всегда.
 *            Она и есть база: если человек откажется от кук, источник мы
 *            всё равно увидим.
 *   GA4    — связка с Search Console (поисковые запросы) и привычные отчёты.
 *            Пишет куки, поэтому включается только по согласию — через
 *            Consent Mode v2: тег грузится сразу, но до согласия
 *            analytics_storage запрещён.
 *
 * Чего эта штука принципиально не может, и это надо помнить, читая отчёты:
 *   1. Google AI Overview шлёт реферер google.com — неотличимо от обычного
 *      поиска. Такие визиты уедут в «поиск».
 *   2. Часть ИИ-клиентов реферер не передаёт вообще — уедут в «прямые».
 *   3. Ни один JS-счётчик не видит краулеров: GPTBot и его родня JS не
 *      исполняют. Обходы ботов пишет сервер — см. server/crawler-log.ts.
 */

export const GA_MEASUREMENT_ID = 'G-GYK9V931F2';
export const UMAMI_WEBSITE_ID = 'a3060360-a401-4885-af8c-e0ecf802cd14';
export const UMAMI_HOST = 'https://analytics.booster.delivery';

const CONSENT_KEY = 'db_consent';
const SOURCE_SENT_KEY = 'db_source_sent';

export type Consent = 'granted' | 'denied';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    umami?: { track: (name: string, data?: Record<string, unknown>) => void };
  }
}

/** Любое обращение к storage может кинуть: приватный режим, отключённые куки. */
const safeGet = (storage: Storage, key: string): string | null => {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
};

const safeSet = (storage: Storage, key: string, value: string) => {
  try {
    storage.setItem(key, value);
  } catch {
    /* не наша беда */
  }
};

export const readConsent = (): Consent | null => {
  const v = safeGet(localStorage, CONSENT_KEY);
  return v === 'granted' || v === 'denied' ? v : null;
};

export const writeConsent = (value: Consent) => {
  safeSet(localStorage, CONSENT_KEY, value);
  window.gtag?.('consent', 'update', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: value === 'granted' ? 'granted' : 'denied',
  });
};

// ---------------------------------------------------------------------------
// Классификация источника
// ---------------------------------------------------------------------------

export type SourceKind = 'ai' | 'search' | 'social' | 'referral' | 'internal' | 'direct';

/** Порядок важен: copilot.microsoft.com должен сработать раньше, чем bing.com. */
const RULES: Array<[RegExp, SourceKind, string]> = [
  // Ответы ИИ
  [/(^|\.)chatgpt\.com$/i, 'ai', 'ChatGPT'],
  [/(^|\.)chat\.openai\.com$/i, 'ai', 'ChatGPT'],
  [/(^|\.)openai\.com$/i, 'ai', 'ChatGPT'],
  [/(^|\.)perplexity\.ai$/i, 'ai', 'Perplexity'],
  [/(^|\.)claude\.ai$/i, 'ai', 'Claude'],
  [/(^|\.)gemini\.google\.com$/i, 'ai', 'Gemini'],
  [/(^|\.)bard\.google\.com$/i, 'ai', 'Gemini'],
  [/(^|\.)copilot\.microsoft\.com$/i, 'ai', 'Copilot'],
  [/(^|\.)you\.com$/i, 'ai', 'You.com'],
  [/(^|\.)phind\.com$/i, 'ai', 'Phind'],
  [/(^|\.)poe\.com$/i, 'ai', 'Poe'],
  [/(^|\.)deepseek\.com$/i, 'ai', 'DeepSeek'],
  [/(^|\.)(grok\.com|x\.ai)$/i, 'ai', 'Grok'],
  [/(^|\.)mistral\.ai$/i, 'ai', 'Le Chat'],
  // Поиск
  [/(^|\.)google\.[a-z.]+$/i, 'search', 'Google'],
  [/(^|\.)bing\.com$/i, 'search', 'Bing'],
  [/(^|\.)duckduckgo\.com$/i, 'search', 'DuckDuckGo'],
  [/(^|\.)yandex\.[a-z.]+$/i, 'search', 'Yandex'],
  [/(^|\.)search\.brave\.com$/i, 'search', 'Brave'],
  [/(^|\.)ecosia\.org$/i, 'search', 'Ecosia'],
  [/(^|\.)baidu\.com$/i, 'search', 'Baidu'],
  // Свои каналы и соцсети
  [/(^|\.)(youtube\.com|youtu\.be)$/i, 'social', 'YouTube'],
  [/(^|\.)(t\.me|telegram\.org|telegram\.me)$/i, 'social', 'Telegram'],
  [/(^|\.)linkedin\.com$/i, 'social', 'LinkedIn'],
  [/(^|\.)(lnkd\.in)$/i, 'social', 'LinkedIn'],
  [/(^|\.)reddit\.com$/i, 'social', 'Reddit'],
  [/(^|\.)instagram\.com$/i, 'social', 'Instagram'],
  [/(^|\.)(facebook\.com|fb\.com|l\.facebook\.com)$/i, 'social', 'Facebook'],
  [/(^|\.)(x\.com|twitter\.com|t\.co)$/i, 'social', 'X'],
  [/(^|\.)tiktok\.com$/i, 'social', 'TikTok'],
  [/(^|\.)(whatsapp\.com|wa\.me)$/i, 'social', 'WhatsApp'],
  [/(^|\.)(medium\.com|quora\.com)$/i, 'social', 'Medium/Quora'],
  // Свои же домены — это не источник, а переход внутри экосистемы
  [/(^|\.)booster\.delivery$/i, 'internal', 'Delivery Booster'],
];

/** UTM бьёт реферер: ChatGPT размечает ссылки utm_source=chatgpt.com. */
const UTM_RULES: Array<[RegExp, SourceKind, string]> = [
  [/chatgpt/i, 'ai', 'ChatGPT'],
  [/openai/i, 'ai', 'ChatGPT'],
  [/perplexity/i, 'ai', 'Perplexity'],
  [/claude|anthropic/i, 'ai', 'Claude'],
  [/gemini|bard/i, 'ai', 'Gemini'],
  [/copilot/i, 'ai', 'Copilot'],
  [/youtube|yt/i, 'social', 'YouTube'],
  [/telegram|^tg$/i, 'social', 'Telegram'],
  [/linkedin/i, 'social', 'LinkedIn'],
  [/reddit/i, 'social', 'Reddit'],
  [/instagram|^ig$/i, 'social', 'Instagram'],
];

export interface TrafficSource {
  kind: SourceKind;
  source: string;
  referrerDomain: string;
}

export const classifySource = (referrer: string, search: string): TrafficSource => {
  const utm = new URLSearchParams(search).get('utm_source') ?? '';
  if (utm) {
    for (const [re, kind, source] of UTM_RULES) {
      if (re.test(utm)) return { kind, source, referrerDomain: utm.toLowerCase() };
    }
  }

  let host = '';
  try {
    host = referrer ? new URL(referrer).hostname.replace(/^www\./, '') : '';
  } catch {
    host = '';
  }

  if (!host) {
    // Реферера нет. Это либо прямой заход, либо ИИ-клиент, который его не шлёт,
    // либо переход из мессенджера. Различить нельзя — так и пишем.
    return { kind: utm ? 'referral' : 'direct', source: utm || 'Прямой заход', referrerDomain: '' };
  }

  for (const [re, kind, source] of RULES) {
    if (re.test(host)) return { kind, source, referrerDomain: host };
  }
  return { kind: 'referral', source: host, referrerDomain: host };
};

// ---------------------------------------------------------------------------
// Отправка
// ---------------------------------------------------------------------------

const send = (name: string, data: Record<string, unknown>) => {
  try {
    window.umami?.track(name, data);
  } catch {
    /* счётчик не должен ронять страницу */
  }
  try {
    window.gtag?.('event', name.replace(/-/g, '_'), data);
  } catch {
    /* то же самое */
  }
};

/** Один раз за сессию: откуда человек пришёл и на какую страницу попал. */
export const trackTrafficSource = () => {
  if (safeGet(sessionStorage, SOURCE_SENT_KEY)) return;
  const { kind, source, referrerDomain } = classifySource(document.referrer, window.location.search);
  if (kind === 'internal') return; // переход внутри экосистемы — не источник
  safeSet(sessionStorage, SOURCE_SENT_KEY, '1');
  send('traffic-source', {
    kind,
    source,
    referrer_domain: referrerDomain,
    landing: window.location.pathname,
  });
};

/**
 * Umami сама ловит смену маршрута в SPA, а GA4 — нет: gtag считает page_view
 * только при загрузке документа. Без этого весь кластер /answers слипся бы в
 * один просмотр главной.
 */
export const trackPageView = (path: string) => {
  try {
    window.gtag?.('event', 'page_view', {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    });
  } catch {
    /* пусто */
  }
};
