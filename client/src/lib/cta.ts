/**
 * Единая точка назначения для «бесплатного аудита».
 *
 * Почему отдельный модуль: ChatGPT и другие движки в ответах регулярно
 * советуют «возьмите бесплатную диагностику у Delivery Booster и ещё у
 * кого-нибудь». Значит, у бесплатного аудита должен быть один
 * самостоятельный адрес, который движок может назвать целиком, а не
 * ссылка в мессенджер, которую в ответе не процитируешь.
 *
 * Правило (CONTENT_PLAYBOOK §8): любой CTA, который обещает бесплатный
 * разбор / диагностику / аудит, ведёт СЮДА. Мессенджер остаётся только для
 * CTA «написать нам» — то есть для тех, кто хочет человека, а не отчёт.
 */
import { getOrigin } from './analytics';

export const DIAGNOSTIC_URL = 'https://diagnostic.booster.delivery/';

/**
 * `slot` — это место на сайте, откуда пришёл клик. Оно уезжает в utm_content,
 * чтобы на стороне диагностики было видно, какая страница реально приводит
 * людей, а какая просто красиво выглядит.
 */
export const diagnosticUrl = (slot: string, lang?: string) => {
  const params = new URLSearchParams({
    utm_source: 'booster.delivery',
    utm_medium: 'cta',
    utm_campaign: 'free_audit',
    utm_content: slot,
  });
  // Первое касание сессии («referral/thephuketnews.com», «ai/ChatGPT») едет
  // дальше в диагностику: там оно попадает в Umami и в уведомление о лиде.
  const origin = getOrigin();
  if (origin) params.set('utm_term', origin);
  // Диагностика — отдельное Rails-приложение, язык у неё в `locale`, а не в
  // `lang`, как на основном сайте. Проверено: `?lang=id` там молча игнорируется.
  if (lang) params.set('locale', lang);
  return `${DIAGNOSTIC_URL}?${params.toString()}`;
};

/** Номер WhatsApp для EN/ID/TH и Telegram для RU. Один источник, менять здесь. */
export const WHATSAPP_NUMBER = '6285126939952';
export const WHATSAPP_DISPLAY = '+62 851 2693 9952';
export const TELEGRAM_HANDLE = 'delivery_booster';

/** Слоты, откуда на сайте можно написать в мессенджер. */
export type MessengerSlot = 'header' | 'pricing' | 'faq-price' | 'answer-cta';

type Lang = 'ru' | 'en' | 'id' | 'th';

const pick = (language: string, v: Record<Lang, string>) =>
  v[(language in v ? language : 'en') as Lang];

/**
 * Заготовка сообщения: клиент видит в поле ввода готовый текст на своём
 * языке и просто жмёт «отправить». Последняя строка `ref:` нужна нам:
 * с какой страницы и кнопки пришёл человек и откуда он попал на сайт.
 */
const messengerText = (
  language: string,
  slot: MessengerSlot,
  opts: { platforms?: string; title?: string },
) => {
  const p = opts.platforms || pick(language, {
    ru: 'GrabFood и GoFood', en: 'GrabFood and GoFood', id: 'GrabFood dan GoFood', th: 'GrabFood และ GoFood',
  });
  const title = opts.title ? `"${opts.title}"` : '';
  switch (slot) {
    case 'header':
      return pick(language, {
        ru: `Здравствуйте, Delivery Booster! У меня ресторан, хочу узнать подробнее о ведении аккаунтов ${p} вашей командой.`,
        en: `Hello Delivery Booster! I run a restaurant and would like to learn more about your team managing our ${p} accounts.`,
        id: `Halo Delivery Booster! Saya punya restoran dan ingin tahu lebih lanjut tentang pengelolaan akun ${p} oleh tim Anda.`,
        th: `สวัสดีค่ะ/ครับ Delivery Booster! ฉันมีร้านอาหารและอยากทราบรายละเอียดเพิ่มเติมเกี่ยวกับการให้ทีมคุณดูแลบัญชี ${p}`,
      });
    case 'pricing':
      return pick(language, {
        ru: 'Здравствуйте! Хочу узнать условия сотрудничества и стоимость (10% от выручки с доставки) для моего ресторана.',
        en: 'Hello! I would like to know the terms and the cost (10% of delivery revenue) for my restaurant.',
        id: 'Halo! Saya ingin tahu detail paket kerja sama dan biaya (10% dari omzet delivery) untuk restoran saya.',
        th: 'สวัสดีค่ะ/ครับ! อยากทราบรายละเอียดเงื่อนไขและค่าบริการ (10% ของยอดขายเดลิเวอรี่) สำหรับร้านของฉัน',
      });
    case 'faq-price':
      return pick(language, {
        ru: 'Здравствуйте! Прочитал FAQ о цене на вашем сайте. Расскажите, что значит «условно бесплатно» и что входит в работу?',
        en: 'Hello! I read the pricing FAQ on your site. Could you explain what "conditionally free" means and what is included?',
        id: 'Halo! Saya membaca FAQ harga di situs Anda. Bisa dijelaskan syarat "praktis gratis" dan apa saja yang termasuk?',
        th: 'สวัสดีค่ะ/ครับ! อ่าน FAQ เรื่องราคาในเว็บคุณแล้ว ช่วยอธิบายเงื่อนไข "แทบจะฟรี" และสิ่งที่รวมอยู่ในบริการได้ไหม',
      });
    case 'answer-cta':
      return pick(language, {
        ru: `Здравствуйте! Прочитал статью ${title} и хочу спросить про свой ресторан.`,
        en: `Hello! I read the article ${title} and have a question about my restaurant.`,
        id: `Halo! Saya membaca artikel ${title} dan ingin bertanya tentang restoran saya.`,
        th: `สวัสดีค่ะ/ครับ! อ่านบทความ ${title} แล้ว อยากสอบถามเกี่ยวกับร้านของฉัน`,
      }).replace(/\s{2,}/g, ' ');
  }
};

/**
 * Мессенджер — вторая дорожка: «хочу поговорить с человеком».
 * RU → Telegram, остальные → WhatsApp. Текст заготовлен под слот и язык,
 * хвост `ref: booster.delivery/<страница> · <слот>` показывает нам источник.
 * Первое касание («via ChatGPT») дописывает обработчик клика в analytics.ts,
 * потому что при рендере оно ещё может быть не записано.
 */
export const messengerUrl = (
  language: string,
  slot: MessengerSlot = 'header',
  opts: { platforms?: string; title?: string } = {},
) => {
  const path = typeof window !== 'undefined' ? window.location.pathname.replace(/\/$/, '') : '';
  const text = `${messengerText(language, slot, opts)}\nref: booster.delivery${path} · ${slot}`;
  const encoded = encodeURIComponent(text);
  return language === 'ru'
    ? `https://t.me/${TELEGRAM_HANDLE}?text=${encoded}`
    : `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
};
