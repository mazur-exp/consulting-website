import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { useCountry } from '../hooks/useCountry';
import { CLIENTS, DISTRICTS, Client, ClientMarket } from '../config/clients';

/**
 * Wall of client logos for the country page. One screen on desktop: a dense
 * grid of the restaurants we currently manage (logo + name, click opens the
 * GrabFood card), then a line of text chips with the brands that worked with
 * us before. Everything is plain text in the DOM (names, districts, links),
 * plus an ItemList schema, so crawlers and AI engines read the whole list
 * without expanding anything. Decision log: BACKLOG.md, "Страница /clients",
 * revised 2026-09-20 to live on /id and /th instead of a separate page.
 */

const MARKET_BY_COUNTRY: Partial<Record<string, ClientMarket>> = { id: 'ID', th: 'TH' };

const DISTRICT_LABELS: Record<string, { ru: string; en: string; id?: string; th?: string }> = {
  Canggu: { ru: 'Чангу', en: 'Canggu' },
  Uluwatu: { ru: 'Улувату', en: 'Uluwatu' },
  Ubud: { ru: 'Убуд', en: 'Ubud' },
  Seminyak: { ru: 'Семиньяк', en: 'Seminyak' },
  'Nusa Dua': { ru: 'Нуса Дуа', en: 'Nusa Dua' },
  Kuta: { ru: 'Кута', en: 'Kuta' },
  Sanur: { ru: 'Санур', en: 'Sanur' },
  'Bang Tao': { ru: 'Банг Тао', en: 'Bang Tao', th: 'บางเทา' },
  Rawai: { ru: 'Раваи', en: 'Rawai', th: 'ราไวย์' },
  Karon: { ru: 'Карон', en: 'Karon', th: 'กะรน' },
  Patong: { ru: 'Патонг', en: 'Patong', th: 'ป่าตอง' },
  Chalong: { ru: 'Чалонг', en: 'Chalong', th: 'ฉลอง' },
  'Old Town': { ru: 'Старый город', en: 'Old Town', th: 'เมืองเก่า' },
};

/** Multi-outlet brands collapse into one chip: "Immigrant ×4". */
const groupFormer = (list: Client[]) => {
  const map = new Map<string, { name: string; count: number; district?: string }>();
  for (const c of list) {
    const key = c.name.trim().toLowerCase();
    const cur = map.get(key);
    if (cur) cur.count += 1;
    else map.set(key, { name: c.name.trim(), count: 1, district: c.district });
  }
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
};

const FORMER_PREVIEW = 24;

export const ClientsSection = () => {
  const { t } = useLanguage();
  const country = useCountry();
  const market = MARKET_BY_COUNTRY[country.code];
  const [showAllFormer, setShowAllFormer] = useState(false);

  const { active, former } = useMemo(() => {
    if (!market) return { active: [] as Client[], former: [] as ReturnType<typeof groupFormer> };
    const mine = CLIENTS.filter((c) => c.market === market);
    return {
      active: mine.filter((c) => c.active).sort((a, b) => a.name.localeCompare(b.name)),
      former: groupFormer(mine.filter((c) => !c.active)),
    };
  }, [market]);

  if (!market || active.length === 0) return null;

  const districtLabel = (d: string) => {
    const l = DISTRICT_LABELS[d];
    if (!l) return d;
    return t(l.ru, l.en, l.id ?? l.en, l.th ?? l.en);
  };
  const districtsLine = DISTRICTS[market].map(districtLabel).join(', ');

  const title =
    market === 'ID'
      ? t(
          '110+ ресторанов на сопровождении. Вот часть из них',
          '110+ restaurants under management. Here are some of them',
          '110+ restoran dalam pengelolaan kami. Sebagian di antaranya',
          'ร้านอาหารกว่า 110 แห่งที่เราดูแลอยู่ นี่คือบางส่วน',
        )
      : t(
          '15+ ресторанов Пхукета работают с нами с 2025 года. Сейчас ведём:',
          '15+ Phuket restaurants have worked with us since 2025. Under management now:',
          '15+ restoran Phuket bekerja sama dengan kami sejak 2025. Saat ini kami kelola:',
          'ร้านอาหารในภูเก็ตกว่า 15 แห่งทำงานกับเราตั้งแต่ปี 2025 ตอนนี้เราดูแล:',
        );

  const subtitle =
    market === 'ID'
      ? t(
          `${districtsLine}. Нажмите на логотип, чтобы открыть карточку заведения в GrabFood.`,
          `${districtsLine}. Tap a logo to open the restaurant's GrabFood card.`,
          `${districtsLine}. Ketuk logo untuk membuka halaman restoran di GrabFood.`,
          `${districtsLine} แตะโลโก้เพื่อเปิดหน้าร้านใน GrabFood`,
        )
      : t(
          `${districtsLine}. Нажмите на логотип, чтобы открыть карточку заведения в GrabFood.`,
          `${districtsLine}. Tap a logo to open the restaurant's GrabFood card.`,
          `${districtsLine}. Ketuk logo untuk membuka halaman restoran di GrabFood.`,
          `${districtsLine} แตะโลโก้เพื่อเปิดหน้าร้านใน GrabFood`,
        );

  const formerTitle =
    market === 'ID'
      ? t(
          'И ещё 100+ заведений Бали, которые прошли через нас с 2023 года:',
          'And 100+ more Bali venues that have been through Delivery Booster since 2023:',
          'Dan 100+ tempat makan lain di Bali yang pernah kami kelola sejak 2023:',
          'และร้านอื่นอีกกว่า 100 แห่งในบาหลีที่เคยทำงานกับเราตั้งแต่ปี 2023:',
        )
      : t(
          'Также работали с нами:',
          'Also worked with us:',
          'Juga pernah bekerja sama dengan kami:',
          'ร้านที่เคยทำงานกับเรา:',
        );


  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: market === 'ID' ? 'Delivery Booster clients in Bali' : 'Delivery Booster clients in Phuket',
    description:
      market === 'ID'
        ? 'Restaurants in Bali whose GrabFood and GoFood accounts are managed by Delivery Booster.'
        : 'Restaurants in Phuket whose GrabFood accounts are managed by Delivery Booster.',
    numberOfItems: active.length,
    itemListElement: active.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Restaurant',
        name: c.name,
        ...(c.grab ? { url: c.grab } : {}),
        ...(c.gofood ? { sameAs: [c.gofood] } : {}),
        ...(c.logo ? { image: `https://booster.delivery${c.logo}` } : {}),
        address: {
          '@type': 'PostalAddress',
          ...(c.district ? { addressLocality: c.district } : {}),
          addressRegion: market === 'ID' ? 'Bali' : 'Phuket',
          addressCountry: market === 'ID' ? 'ID' : 'TH',
        },
      },
    })),
  };

  const formerVisible = showAllFormer ? former : former.slice(0, FORMER_PREVIEW);

  return (
    <section className="py-16 border-t border-white/10" id="clients" data-testid="section-clients">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3" data-testid="text-clients-title">
            {title}
          </h2>
          <p className="text-brand-muted text-base sm:text-lg max-w-4xl">{subtitle}</p>
        </motion.div>

        <motion.ul
          className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-[repeat(13,minmax(0,1fr))] gap-2 sm:gap-2.5 list-none p-0 m-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
        >
          {active.map((c) => {
            const href = c.grab || c.gofood;
            const alt = c.district ? `${c.name}, ${districtLabel(c.district)}` : c.name;
            const links = c.grab && c.gofood && (
              <span className="mt-auto pt-1.5 flex justify-center gap-2 text-[10px] leading-none text-brand-muted">
                <a href={c.grab} target="_blank" rel="noopener" className="hover:text-brand-green">
                  Grab
                </a>
                <a href={c.gofood} target="_blank" rel="noopener" className="hover:text-brand-green">
                  GoFood
                </a>
              </span>
            );
            return (
              <li
                key={c.slug}
                className="glass-card border border-white/15 rounded-xl px-1.5 pt-2.5 pb-2 flex flex-col items-center hover:border-brand-green/60 transition-colors duration-300 min-w-0"
                data-testid={`client-${c.slug}`}
              >
                {href ? (
                  <a href={href} target="_blank" rel="noopener" title={alt} className="flex flex-col items-center w-full">
                    {c.logo ? (
                      <img
                        src={c.logo}
                        alt={alt}
                        width={56}
                        height={56}
                        loading="lazy"
                        decoding="async"
                        className="w-14 h-14 rounded-xl object-cover bg-white"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="w-14 h-14 rounded-xl bg-brand-green flex items-center justify-center text-white text-2xl font-bold"
                      >
                        {c.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                    <span className="mt-1.5 block w-full text-center text-[11px] leading-[1.2] font-semibold text-brand-text line-clamp-2 min-h-[2.4em]">
                      {c.name}
                    </span>
                  </a>
                ) : (
                  <div title={alt} className="flex flex-col items-center w-full">
                    {c.logo ? (
                      <img
                        src={c.logo}
                        alt={alt}
                        width={56}
                        height={56}
                        loading="lazy"
                        decoding="async"
                        className="w-14 h-14 rounded-xl object-cover bg-white"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="w-14 h-14 rounded-xl bg-brand-green flex items-center justify-center text-white text-2xl font-bold"
                      >
                        {c.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                    <span className="mt-1.5 block w-full text-center text-[11px] leading-[1.2] font-semibold text-brand-text line-clamp-2 min-h-[2.4em]">
                      {c.name}
                    </span>
                  </div>
                )}
                {c.district && <span className="sr-only">{districtLabel(c.district)}</span>}
                {links}
              </li>
            );
          })}
        </motion.ul>

        {former.length > 0 && (
          <div className="mt-10">
            <h3 className="text-base sm:text-lg font-semibold mb-3">{formerTitle}</h3>
            <ul className="flex flex-wrap gap-1.5 list-none p-0 m-0" data-testid="list-former-clients">
              {formerVisible.map((f) => (
                <li
                  key={f.name}
                  className="px-2.5 py-1 rounded-full border border-white/15 bg-white/5 text-brand-muted text-xs sm:text-[13px]"
                >
                  {f.name}
                  {f.count > 1 && <span className="opacity-70"> ×{f.count}</span>}
                </li>
              ))}
              {!showAllFormer && former.length > FORMER_PREVIEW && (
                <li className="sr-only">{former.slice(FORMER_PREVIEW).map((f) => f.name).join(', ')}</li>
              )}
            </ul>
            {former.length > FORMER_PREVIEW && (
              <button
                type="button"
                onClick={() => setShowAllFormer((v) => !v)}
                className="mt-3 text-sm font-semibold text-brand-green hover:text-brand-green-light"
                data-testid="button-former-toggle"
              >
                {showAllFormer
                  ? t('Свернуть', 'Show fewer', 'Sembunyikan', 'ย่อ')
                  : t(
                      `Показать все ${former.length}`,
                      `Show all ${former.length}`,
                      `Tampilkan semua ${former.length}`,
                      `แสดงทั้งหมด ${former.length}`,
                    )}
              </button>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
