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
  if (lang) params.set('lang', lang);
  return `${DIAGNOSTIC_URL}?${params.toString()}`;
};

/** Мессенджер — вторая дорожка: «хочу поговорить с человеком». */
export const messengerUrl = (language: string) =>
  language === 'ru' ? 'https://t.me/delivery_booster' : 'https://wa.me/79520029077';
