/** Реквизиты компании: одно место, откуда они берутся на /pricing, /terms, /refund,
 *  в футере и в схеме. Адрес и телефон те же, что в анкете платёжного провайдера
 *  (Xendit, 06.11.2026); email для счетов и возвратов добавлен 17.11.2026. */
export const COMPANY = {
  legalName: 'PT Delivery Booster Group',
  address: 'Jalan Raya Semer No. 40 B, Kerobokan, Kuta Utara, Badung, Bali 80361, Indonesia',
  phone: '+62 859 5677 9546',
  phoneHref: 'tel:+6285956779546',
  email: 'billing@booster.delivery',
  emailHref: 'mailto:billing@booster.delivery',
};

/** Юридические страницы существуют только на английском (язык договора и платёжного
 *  провайдера). Для них не строим ?lang=-версии: иначе четыре адреса отдавали бы один
 *  и тот же текст. Список читают useLanguage (canonical, hreflang) и LegalLayout. */
export const EN_ONLY_PATHS = ['/terms', '/refund'];

export const isEnOnlyPath = (pathname: string) =>
  EN_ONLY_PATHS.includes(pathname.replace(/\/+$/, ''));
