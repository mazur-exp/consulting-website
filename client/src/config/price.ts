import type { L } from './cases';

/**
 * Средний платёж клиента в месяц. Показываем только там, где есть клиенты и своя
 * статистика: Таиланд (решение Алекса 19.11.2026: «около 7 000 THB», среднее по
 * платежам май-октябрь 7 270) и Индонезия (24.11.2026: «около 4-4,5 млн IDR»).
 * Один источник для блока цены, вопроса «Сколько стоит?», схемы FAQ и /pricing.
 */
const EMPTY: L = { ru: '', en: '', id: '', th: '' };
export const AVG_PRICE: Record<string, L> = {
  th: {
    ru: 'В среднем около 7 000 THB в месяц.',
    en: 'About THB 7,000 a month on average.',
    id: 'Rata-rata sekitar THB 7.000 per bulan.',
    th: 'เฉลี่ยประมาณ 7,000 THB ต่อเดือน',
  },
  id: {
    ru: 'В среднем около 4-4,5 млн IDR в месяц.',
    en: 'About IDR 4-4.5 million a month on average.',
    id: 'Rata-rata sekitar Rp4-4,5 juta per bulan.',
    th: 'เฉลี่ยประมาณ 4-4.5 ล้านรูเปียห์ต่อเดือน',
  },
};
/** Фраза с ведущим пробелом, чтобы вставлять её в середину предложения; пусто, если данных по стране нет. */
export const avgPrice = (code: string): L => {
  const a = AVG_PRICE[code];
  return a ? { ru: ` ${a.ru}`, en: ` ${a.en}`, id: ` ${a.id}`, th: ` ${a.th}` } : EMPTY;
};
