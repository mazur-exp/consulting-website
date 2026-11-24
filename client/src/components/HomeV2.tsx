import { useRef, useState } from 'react';
import { Link } from 'wouter';
import { useLanguage } from '../hooks/useLanguage';
import { useCountry } from '../hooks/useCountry';
import { diagnosticUrl, messengerUrl } from '../lib/cta';
import { CLIENTS } from '../config/clients';
import { CaseV2, Lang, casesForCountry, heroCasesForCountry, tv } from '../config/cases';
import { avgPrice } from '../config/price';

/**
 * Блоки главной страны по финальному ТЗ маркетолога (24.11.2026):
 * первый экран с карточками клиентов, лента логотипов, карусель кейсов,
 * «кому», «что делаем», «как работаем», цена, отзывы, финальный призыв.
 * Вопросы, статьи и блок основателя остались прежними компонентами.
 */

const BAR_COLORS = { pre: '#5B6B62', a: '#F97316', start: '#86EFAC', us: '#22C55E' } as const;

export const PhoneFrame = ({ src, alt }: { src: string; alt: string }) => (
  <div className="v-phone">
    <div>
      <img src={src} alt={alt} loading="lazy" />
    </div>
  </div>
);

export const usePlatforms = () => {
  const { t } = useLanguage();
  const country = useCountry();
  return t(country.platformsRu, country.platformsEn, country.platformsId, country.platformsTh ?? country.platformsEn);
};

/* ---------- первый экран */
export const HeroV2 = () => {
  const { t, language } = useLanguage();
  const lang = language as Lang;
  const country = useCountry();
  const p = usePlatforms();
  const th = country.code === 'th';
  const [a, b] = heroCasesForCountry(country.code);
  const zero = th ? '0 THB' : country.code === 'id' ? '0 IDR' : '$0';

  const badge = (c: CaseV2) => (
    <div className="v-badge">
      <small>{c.name} · {c.place[lang].split(',')[0]} · {t('кейс', 'case', 'kasus', 'เคส')} →</small>
      {c.badge.pre && <em>{c.badge.pre[lang]}</em>}
      {c.badge.bars ? (
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <b>{tv(c.badge.value, lang)}</b>
          <em>{c.badge.line[lang]}</em>
        </div>
      ) : (
        <>
          <b className="sm">{tv(c.badge.value, lang)}</b>
          <em>{c.badge.line[lang]}</em>
        </>
      )}
      {c.badge.bars && (
        <div className="v-mini" aria-hidden="true">
          {c.bars.map((x, i) => (
            <i key={i} style={{ height: `${Math.max(x.h, 3)}%`, background: BAR_COLORS[x.c] }} />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <section id="top" className="v-hero">
      <div className="v-hero-l">
        <span className="v-pill" data-testid="text-hero-social-proof">
          {th
            ? t('Консалтинг по GrabFood в Таиланде · 15+ ресторанов в управлении', 'GrabFood consulting in Thailand · 15+ restaurants under management', 'Konsultan GrabFood di Thailand · 15+ restoran kami kelola', 'ที่ปรึกษา GrabFood ในประเทศไทย · ดูแลร้านอาหารกว่า 15 แห่ง')
            : t(country.socialProofRu, country.socialProofEn, country.socialProofId, country.socialProofTh)}
        </span>
        <h1 className="v-h1" data-testid="text-hero-title">
          {th
            ? t(`Рост продаж в 2-6 раз в ${country.platformsRu}`, `2-6x sales growth on ${country.platformsEn}`, `Penjualan naik 2-6x di ${country.platformsId ?? country.platformsEn}`, `ยอดขายโต 2-6 เท่าบน ${country.platformsTh ?? country.platformsEn}`)
            : t(`Увеличение продаж в 2-6 раз в ${country.platformsRu}`, `2-6x sales increase in ${country.platformsEn}`, `Penjualan naik 2-6x di ${country.platformsId ?? country.platformsEn}`, `ยอดขายเพิ่มขึ้น 2-6 เท่าบน ${country.platformsTh ?? country.platformsEn}`)}
        </h1>
        <p className="v-hero-sub" data-testid="text-hero-subtitle">
          {t(
            `Берём ${p} на себя: реклама, поиск и меню, рейтинг, обучение команды и отчёты. Вы занимаетесь кухней.`,
            `We take ${p} off your hands: ads, search and menu, rating, team training and reports. You run the kitchen.`,
            `Kami tangani ${p} untuk Anda: iklan, pencarian dan menu, rating, pelatihan tim dan laporan. Anda fokus di dapur.`,
            `เราดูแล ${p} ให้ทั้งหมด: โฆษณา การค้นหาและเมนู เรตติ้ง อบรมทีม และรายงาน คุณดูแลครัวอย่างเดียว`,
          )}
        </p>
        <div className="v-cta2">
          <a className="v-btn" href={diagnosticUrl('hero', language)} target="_blank" rel="noopener noreferrer" data-testid="button-primary-cta">
            {t('Проверить карточку бесплатно', 'Check my listing free', 'Cek listing saya gratis', 'ตรวจหน้าร้านฟรี')}
          </a>
          <a className="v-btn2" href={messengerUrl(language, 'hero', { platforms: p })} target="_blank" rel="noopener noreferrer" data-slot="hero">
            {t('Написать нам', 'Message us', 'Hubungi kami', 'ทักหาเรา')}
          </a>
        </div>
        <div className="v-stats">
          <div><b>110+</b><span>{t('ресторанов на сопровождении', 'restaurants under management', 'restoran dalam pengelolaan', 'ร้านที่เราดูแลอยู่')}</span></div>
          <div><b>200+</b><span>{t('прошли через нас с 2023', 'served since 2023', 'sudah bekerja sama sejak 2023', 'ร้านที่เคยทำงานกับเราตั้งแต่ปี 2023')}</span></div>
          <div><b>{zero}</b><span>{t('предоплаты', 'upfront payment', 'uang muka', 'ค่าใช้จ่ายล่วงหน้า')}</span></div>
        </div>
      </div>
      <div className="v-phones">
        {[a, b].map((c, i) => (
          <Link key={c.slug} href={`/cases/${c.slug}`} className={`v-ph v-ph${i + 1}`} aria-label={`${t('Открыть кейс', 'Open the case study', 'Buka studi kasus', 'เปิดเคส')} ${c.name}`}>
            <PhoneFrame src={`/case-phones/${c.slug}.jpg`} alt={`${c.name}: ${t('карточка ресторана в приложении Grab', 'restaurant listing in the Grab app', 'halaman restoran di aplikasi Grab', 'หน้าร้านในแอป Grab')}`} />
            {badge(c)}
          </Link>
        ))}
      </div>
    </section>
  );
};

/* ---------- логотипы клиентов (Таиланд и страны без клиентов) */
const SAMUI = new Set(['sassy-go-bang-po-beach', 'sassy-go-chaweng']);
export const LogosStrip = () => {
  const { t } = useLanguage();
  const mine = CLIENTS.filter((c) => c.market === 'TH');
  const active = mine.filter((c) => c.active).sort((x, y) => (x.tile ?? x.name).replace(/^\./, '').localeCompare((y.tile ?? y.name).replace(/^\./, '')));
  const former = mine.filter((c) => !c.active).map((c) => c.name);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Delivery Booster clients in Thailand',
    description: 'Restaurants in Thailand whose GrabFood accounts are managed by Delivery Booster.',
    numberOfItems: active.length,
    itemListElement: active.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Restaurant',
        name: c.tile ?? c.name,
        ...(c.grab ? { url: c.grab } : {}),
        ...(c.logo ? { image: `https://booster.delivery${c.logo}` } : {}),
        address: {
          '@type': 'PostalAddress',
          ...(c.district ? { addressLocality: c.district } : {}),
          addressRegion: SAMUI.has(c.slug) ? 'Koh Samui' : 'Phuket',
          addressCountry: 'TH',
        },
      },
    })),
  };
  return (
    <section className="v-sec" id="clients" aria-labelledby="clients-title" data-testid="section-clients">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="v-wrap v-logos">
        <h2 id="clients-title">{t('Нам доверяют рестораны Таиланда', 'Trusted by restaurants in Thailand', 'Dipercaya restoran di Thailand', 'ร้านอาหารในประเทศไทยไว้วางใจเรา')}</h2>
        <div className="v-logos-grid">
          {active.map((c) => {
            const name = c.tile ?? c.name;
            const inner = (
              <>
                {c.logo ? <img src={c.logo} alt={`${name} logo`} width={64} height={64} loading="lazy" /> : <i>{name.replace(/^\./, '').charAt(0).toUpperCase()}</i>}
                <span>{name}</span>
              </>
            );
            return c.grab ? (
              <a key={c.slug} className="v-lt" href={c.grab} target="_blank" rel="noopener noreferrer nofollow">{inner}</a>
            ) : (
              <div key={c.slug} className="v-lt">{inner}</div>
            );
          })}
        </div>
        {former.length > 0 && (
          <p className="v-former">{t('Также работали с нами', 'Also worked with us', 'Juga pernah bekerja sama dengan kami', 'ร้านที่เคยทำงานกับเรา')}: {former.join(', ')}</p>
        )}
      </div>
    </section>
  );
};

/* ---------- кейсы: карусель */
export const CaseCardV2 = ({ c }: { c: CaseV2 }) => {
  const { t, language } = useLanguage();
  const lang = language as Lang;
  return (
    <article className="v-ccard" data-testid={`case-card-${c.slug}`}>
      <div className="v-who">
        <img src={c.logo} alt={`${c.name} logo`} width={48} height={48} loading="lazy" />
        <div><b>{c.name}</b><span>{c.place[lang]}</span></div>
      </div>
      <div>
        <span className="v-big">{tv(c.card.value, lang)}</span>
        <span style={{ fontSize: 16, color: 'var(--t2)' }}>{c.card.label[lang]}</span>
      </div>
      <div className="v-chips">{c.card.chips.map((x, i) => <span key={i}>{x[lang]}</span>)}</div>
      <Link href={`/cases/${c.slug}`} className="v-link" style={{ marginTop: 'auto', padding: '6px 0' }}>
        {t('Читать кейс', 'Read the case study', 'Baca studi kasus', 'อ่านเคส')} →
      </Link>
    </article>
  );
};

export const CasesV2 = () => {
  const { t } = useLanguage();
  const country = useCountry();
  const cases = casesForCountry(country.code);
  const track = useRef<HTMLDivElement>(null);
  const move = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('.v-ccard');
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 320) + 20), behavior: 'smooth' });
  };
  const src = country.code === 'id' ? 'Grab и GoFood' : 'Grab';
  const n = cases.length;
  return (
    <section className="v-sec" id="cases">
      <div className="v-wrap">
        <div className="v-head">
          <span className="v-eye">{t('Кейсы', 'Case studies', 'Studi kasus', 'เคส')}</span>
          <h2 className="v-h2" data-testid="text-cases-title">{t('Кейсы наших клиентов', 'Our clients’ results', 'Hasil klien kami', 'ผลลัพธ์ของลูกค้าเรา')}</h2>
          <p className="v-lead">
            {t(
              `Цифры из ${src}: показываем как есть, с точками «было» и «стало». Результат зависит от ресторана, района и сезона.`,
              `Numbers from ${src.replace(' и ', ' and ')}, shown as they are, with before and after points. Results depend on the restaurant, the area and the season.`,
              `Angka dari ${src.replace(' и ', ' dan ')}, ditampilkan apa adanya, dengan titik sebelum dan sesudah. Hasil bergantung pada restoran, area dan musim.`,
              `ตัวเลขจาก ${src.replace(' и ', ' และ ')} แสดงตามจริง พร้อมจุดก่อนและหลัง ผลลัพธ์ขึ้นอยู่กับร้าน ย่าน และฤดูกาล`,
            )}
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="v-track" ref={track}>
            {cases.map((c) => <CaseCardV2 key={c.slug} c={c} />)}
          </div>
          <div className="v-ctl">
            <span>{t(`${n} кейсов`, `${n} case studies`, `${n} studi kasus`, `${n} เคส`)}</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" aria-label={t('Предыдущий кейс', 'Previous case', 'Kasus sebelumnya', 'เคสก่อนหน้า')} onClick={() => move(-1)}>
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
              </button>
              <button type="button" aria-label={t('Следующий кейс', 'Next case', 'Kasus berikutnya', 'เคสถัดไป')} onClick={() => move(1)}>
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- кому, что делаем, как работаем */
export const AudienceV2 = () => {
  const { t } = useLanguage();
  const p = usePlatforms();
  const items = [
    [t('Владельцу', 'For owners', 'Untuk pemilik', 'สำหรับเจ้าของร้าน'), t(`Больше заказов, выше рейтинг и доход, без бесконечных скидок. Работа с ${p} полностью на нашей стороне.`, `More orders, a higher rating and more income, without endless discounts. All the work with ${p} is on our side.`, `Lebih banyak pesanan, rating dan pendapatan lebih tinggi, tanpa diskon tanpa henti. Semua pekerjaan di ${p} kami yang tangani.`, `ออร์เดอร์มากขึ้น เรตติ้งและรายได้สูงขึ้น โดยไม่ต้องลดราคาไม่รู้จบ งานบน ${p} ทั้งหมดเราดูแลให้`)],
    [t('Управляющему', 'For managers', 'Untuk manajer', 'สำหรับผู้จัดการ'), t('Меньше отмен и задержек, быстрее сборка заказов, выше качество сервиса.', 'Fewer cancellations and delays, faster order prep, better service quality.', 'Lebih sedikit pembatalan dan keterlambatan, penyiapan pesanan lebih cepat, kualitas layanan lebih baik.', 'ยกเลิกและล่าช้าน้อยลง เตรียมออร์เดอร์เร็วขึ้น คุณภาพบริการดีขึ้น')],
    [t('Маркетологу', 'For marketers', 'Untuk marketer', 'สำหรับนักการตลาด'), t('Реклама, которая окупается: прозрачные отчёты и понятная отдача от бюджета.', 'Ads that pay back: transparent reports and a clear return on the budget.', 'Iklan yang balik modal: laporan transparan dan hasil yang jelas dari anggaran.', 'โฆษณาที่คุ้มทุน: รายงานโปร่งใสและผลตอบแทนจากงบที่ชัดเจน')],
    [t('Дарк китчен', 'For dark kitchens', 'Untuk dark kitchen', 'สำหรับคลาวด์คิทเช่น'), t(`Больше заказов и узнаваемости в ${p}, без зала и вывесок.`, `More orders and recognition on ${p}, with no dining room and no signage.`, `Lebih banyak pesanan dan lebih dikenal di ${p}, tanpa ruang makan dan papan nama.`, `ออร์เดอร์และการจดจำบน ${p} มากขึ้น โดยไม่ต้องมีหน้าร้านหรือป้าย`)],
  ];
  return (
    <section className="v-sec">
      <div className="v-wrap">
        <div className="v-head">
          <span className="v-eye">{t('Кому помогаем', 'Who we help', 'Siapa yang kami bantu', 'เราช่วยใคร')}</span>
          <h2 className="v-h2" data-testid="text-audience-title">{t('Кому подходит работа с нами', 'Who we work with', 'Untuk siapa layanan kami', 'เราเหมาะกับใคร')}</h2>
        </div>
        <div className="v-g4">
          {items.map(([h, d]) => <div className="v-tile" key={h}><h3>{h}</h3><p>{d}</p></div>)}
        </div>
      </div>
    </section>
  );
};

export const ServicesV2 = () => {
  const { t } = useLanguage();
  const p = usePlatforms();
  const items = [
    [t('Реклама', 'Ads', 'Iklan', 'โฆษณา'), t('Ставки под заказы, а не под показы. Ежедневный контроль и прозрачные результаты.', 'Bids set for orders, not impressions. Daily control and transparent results.', 'Bid untuk pesanan, bukan impresi. Kontrol harian dan hasil yang transparan.', 'ตั้งบิดเพื่อออร์เดอร์ ไม่ใช่ยอดแสดงผล ดูแลทุกวันและผลลัพธ์โปร่งใส')],
    [t('Меню и цены', 'Menu and prices', 'Menu dan harga', 'เมนูและราคา'), t('Хиты, комбо и наборы, средний чек с учётом комиссии площадки.', 'Best-sellers, combos and sets, an average order priced with the platform commission in mind.', 'Menu terlaris, combo dan paket, nilai pesanan yang memperhitungkan komisi platform.', 'เมนูขายดี คอมโบ และเซ็ต ยอดต่อออร์เดอร์ที่คิดค่าคอมมิชชันแพลตฟอร์มแล้ว')],
    [t('Карточка ресторана', 'Restaurant listing', 'Halaman restoran', 'หน้าร้าน'), t('Фото, тексты, теги, «герои» меню и ключевые слова для поиска.', 'Photos, texts, tags, hero items and search keywords.', 'Foto, teks, tag, menu andalan dan kata kunci pencarian.', 'รูป ข้อความ แท็ก เมนูเด่น และคำค้นสำหรับการค้นหา')],
    [t('Рейтинг и отзывы', 'Rating and reviews', 'Rating dan ulasan', 'เรตติ้งและรีวิว'), t('Ответы на отзывы, жалобы на несправедливые оценки, цель: рейтинг 4.8+.', 'Replies to reviews, appeals against unfair ratings, target: rating 4.8+.', 'Balasan ulasan, banding atas penilaian tidak adil, target: rating 4.8+.', 'ตอบรีวิว ยื่นคำร้องเรื่องคะแนนที่ไม่เป็นธรรม เป้าหมาย: เรตติ้ง 4.8+')],
    [t('Обучение команды', 'Team training', 'Pelatihan tim', 'อบรมทีม'), t('Видеотренинг, тест и гайд для сотрудников ресторана.', 'Video training, a test and a guide for restaurant staff.', 'Pelatihan video, tes dan panduan untuk staf restoran.', 'วิดีโออบรม แบบทดสอบ และคู่มือสำหรับพนักงานร้าน')],
    [t('Аналитика', 'Analytics', 'Analitik', 'ข้อมูลและการวิเคราะห์'), t('Автоматический сбор данных, еженедельные отчёты, план экспериментов.', 'Automated data collection, weekly reports, an experiment plan.', 'Pengumpulan data otomatis, laporan mingguan, rencana eksperimen.', 'เก็บข้อมูลอัตโนมัติ รายงานรายสัปดาห์ และแผนการทดลอง')],
  ];
  return (
    <section className="v-sec" id="services">
      <div className="v-wrap">
        <div className="v-head">
          <span className="v-eye">{t('Что мы делаем', 'What we do', 'Apa yang kami kerjakan', 'สิ่งที่เราทำ')}</span>
          <h2 className="v-h2" data-testid="text-services-title">{t(`Ведём ваш ресторан в ${p} целиком`, `We run your restaurant on ${p} end to end`, `Kami kelola restoran Anda di ${p} sepenuhnya`, `เราดูแลร้านของคุณบน ${p} แบบครบวงจร`)}</h2>
        </div>
        <div className="v-g3">
          {items.map(([h, d]) => <div className="v-tile" key={h}><h3>{h}</h3><p>{d}</p></div>)}
        </div>
      </div>
    </section>
  );
};

export const ProcessV2 = () => {
  const { t } = useLanguage();
  const p = usePlatforms();
  const items = [
    [t('Бесплатная диагностика', 'Free diagnostic', 'Diagnostik gratis', 'ตรวจวิเคราะห์ฟรี'), t(`Проверяем карточку в ${p} и находим, где теряются заказы. Приоритеты на 30 дней.`, `We check your listing on ${p} and find where orders are being lost. Priorities for 30 days.`, `Kami cek halaman restoran Anda di ${p} dan mencari di mana pesanan hilang. Prioritas untuk 30 hari.`, `เราตรวจหน้าร้านบน ${p} และหาจุดที่ทำให้เสียออร์เดอร์ พร้อมลำดับความสำคัญสำหรับ 30 วัน`)],
    [t('Индивидуальный план', 'A plan for your restaurant', 'Rencana khusus', 'แผนเฉพาะร้านคุณ'), t('Согласуем цели и объём работ, без типовых пакетов.', 'We agree goals and scope with you, no standard packages.', 'Kami sepakati target dan lingkup kerja, tanpa paket standar.', 'ตกลงเป้าหมายและขอบเขตงานร่วมกัน ไม่มีแพ็กเกจสำเร็จรูป')],
    [t('Запуск и отчёты', 'Launch and reports', 'Peluncuran dan laporan', 'เริ่มงานและรายงาน'), t('Работаем еженедельными итерациями, каждую неделю отчёт и рекомендации.', 'We work in weekly iterations, with a report and recommendations every week.', 'Kami bekerja dalam iterasi mingguan, dengan laporan dan rekomendasi setiap minggu.', 'ทำงานเป็นรอบรายสัปดาห์ มีรายงานและคำแนะนำทุกสัปดาห์')],
  ];
  return (
    <section className="v-sec" id="how">
      <div className="v-wrap">
        <div className="v-head">
          <span className="v-eye">{t('Как работаем', 'How we work', 'Cara kerja', 'วิธีทำงาน')}</span>
          <h2 className="v-h2" data-testid="text-process-title">{t('Три шага до роста', 'Three steps to growth', 'Tiga langkah menuju pertumbuhan', 'สามขั้นตอนสู่การเติบโต')}</h2>
        </div>
        <div className="v-g3">
          {items.map(([h, d], i) => <div className="v-tile" key={h}><span className="v-step">{i + 1}</span><h3>{h}</h3><p>{d}</p></div>)}
        </div>
      </div>
    </section>
  );
};

/* ---------- цена */
const Check = () => (
  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
);
export const PriceV2 = () => {
  const { t, language } = useLanguage();
  const country = useCountry();
  const avg = avgPrice(country.code)[language as Lang];
  return (
    <section className="v-sec v-price" id="price">
      <div className="v-wrap">
        <div className="v-head">
          <span className="v-eye">{t('Цена', 'Pricing', 'Harga', 'ราคา')}</span>
          <h2 className="v-h2" data-testid="text-pricing-title">
            <span style={{ display: 'block' }}>{t('Без предоплаты.', 'No upfront payment.', 'Tanpa uang muka.', 'ไม่ต้องจ่ายล่วงหน้า')}</span>
            <span style={{ display: 'block' }}>{t('Платите, только когда растёте', 'You pay only when you grow', 'Anda membayar hanya saat tumbuh', 'จ่ายเมื่อร้านเติบโตเท่านั้น')}</span>
          </h2>
          <p className="v-lead">{t('Наш доход зависит от вашей выручки, поэтому нам выгодно, чтобы она росла.', 'Our income depends on your revenue, so it is in our interest that it grows.', 'Pendapatan kami bergantung pada omzet Anda, jadi kami berkepentingan agar omzet itu naik.', 'รายได้ของเราขึ้นอยู่กับรายได้ของคุณ เราจึงได้ประโยชน์เมื่อร้านคุณโต')}</p>
        </div>
        <div className="v-pcard">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div className="v-pct">
              <b>10%</b>
              <span data-testid="text-pricing-main">{t(`от чистой выплаты ${country.platformsShort}`, `of the net payout from ${country.platformsShort}`, `dari pencairan bersih ${country.platformsShort}`, `ของยอดเงินโอนสุทธิจาก ${country.platformsShort}`)}</span>
            </div>
            <span style={{ fontSize: 15, color: 'var(--mut)' }}>
              {t('После комиссий площадок и рекламы.', 'After platform commissions and ad costs.', 'Setelah komisi platform dan biaya iklan.', 'หลังหักค่าคอมมิชชันแพลตฟอร์มและค่าโฆษณา')}
              {avg}
            </span>
          </div>
          <ul>
            <li><Check />{t('Без абонентской платы и предоплаты', 'No subscription fee and no upfront payment', 'Tanpa biaya langganan dan tanpa uang muka', 'ไม่มีค่ารายเดือนและไม่ต้องจ่ายล่วงหน้า')}</li>
            <li><Check />{t('Реклама, меню, карточка, рейтинг, аналитика и отчёты', 'Ads, menu, listing, rating, analytics and reports', 'Iklan, menu, halaman restoran, rating, analitik dan laporan', 'โฆษณา เมนู หน้าร้าน เรตติ้ง ข้อมูล และรายงาน')}</li>
            <li><Check />{t('Delivery Tracker: мониторинг ресторана, бесплатно для клиентов', 'Delivery Tracker: restaurant monitoring, free for clients', 'Delivery Tracker: pemantauan restoran, gratis untuk klien', 'Delivery Tracker: ระบบติดตามร้าน ฟรีสำหรับลูกค้า')}</li>
          </ul>
          <a className="v-btn" href={messengerUrl(language, 'pricing')} target="_blank" rel="noopener noreferrer" data-testid="button-pricing-cta" data-slot="pricing">
            {t('Узнать подробнее', 'Learn more', 'Pelajari lebih lanjut', 'ดูรายละเอียด')}
          </a>
          <p className="v-note" data-testid="text-pricing-footnote">{t('Есть вариант, при котором работа для вас бесплатна, расскажем в переписке.', 'There is an option where the work costs you nothing; we will explain in chat.', 'Ada opsi di mana layanan ini gratis untuk Anda; kami jelaskan lewat chat.', 'มีทางเลือกที่คุณใช้บริการได้ฟรี เราอธิบายให้ในแชต')}</p>
        </div>
      </div>
    </section>
  );
};

/* ---------- отзывы (ТЗ, раздел 6: два реальных отзыва, показываем на всех версиях) */
const Star = () => (
  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="#E8F2EC"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z" /></svg>
);
export const ReviewsV2 = () => {
  const { t } = useLanguage();
  const country = useCountry();
  const thaiReviews = [
    {
      text: t(
        'За время работы с командой Delivery Booster продажи с доставки растут в геометрической прогрессии. Команда всегда на связи, стоит на страже нашего рейтинга и помогает эффективно работать с доставкой.',
        'Since we started working with the Delivery Booster team, our delivery sales have been growing exponentially. The team is always in touch, guards our rating and helps us work with delivery efficiently.',
        'Sejak bekerja dengan tim Delivery Booster, penjualan delivery kami tumbuh berlipat ganda. Tim selalu bisa dihubungi, menjaga rating kami dan membantu kami mengelola delivery dengan efektif.',
        'ตั้งแต่ทำงานกับทีม Delivery Booster ยอดขายเดลิเวอรีของเราโตแบบทวีคูณ ทีมติดต่อได้ตลอด คอยปกป้องเรตติ้งของเรา และช่วยให้เราทำเดลิเวอรีได้อย่างมีประสิทธิภาพ',
      ),
      name: t('Екатерина', 'Ekaterina', 'Ekaterina', 'Ekaterina'),
      role: t('Управляющая .island, Банг Тао и Чалонг', 'Manager of .island, Bang Tao and Chalong', 'Manajer .island, Bang Tao dan Chalong', 'ผู้จัดการ .island บางเทาและฉลอง'),
    },
    {
      text: t(
        'У нас пошли прям хорошие чеки на доставку, это радует, и хочется становиться лучше. Мы вам очень-очень благодарны, наше сотрудничество было судьбоносным!',
        'We started getting really good order values in delivery. It makes us happy and makes us want to get better. We are very, very grateful to you: working together has been a turning point for us!',
        'Nilai pesanan delivery kami jadi benar-benar bagus. Itu menyenangkan dan membuat kami ingin jadi lebih baik. Kami sangat, sangat berterima kasih: kerja sama ini menjadi titik balik bagi kami!',
        'ยอดต่อออร์เดอร์เดลิเวอรีของเราดีขึ้นมากจริง ๆ เราดีใจและอยากพัฒนาให้ดียิ่งขึ้น ขอบคุณมาก ๆ การร่วมงานกันครั้งนี้เป็นจุดเปลี่ยนของเรา',
      ),
      name: t('Александра', 'Aleksandra', 'Aleksandra', 'Aleksandra'),
      role: t('Владелица USSR Restaurant, Патонг', 'Owner of USSR Restaurant, Patong', 'Pemilik USSR Restaurant, Patong', 'เจ้าของ USSR Restaurant ป่าตอง'),
    },
  ];
  // Индонезия: три прежних отзыва балийских клиентов (решение Алекса 24.11.2026, тексты без изменений,
  // длинное тире заменено дефисом). Остальные страны: два отзыва из Таиланда по ТЗ маркетолога.
  const baliReviews = [
    {
      text: t(
        'За первый месяц работы количество заказов выросло на 40%. Особенно впечатлила работа с меню и позиционированием.',
        'Orders increased by 40% in the first month. Menu optimization and positioning were especially impressive.',
        'Dalam bulan pertama kerja sama, jumlah pesanan naik 40%. Yang paling berkesan adalah penataan menu dan positioning.',
        'เดือนแรกที่ร่วมงานกัน ออร์เดอร์เพิ่มขึ้น 40% สิ่งที่ประทับใจที่สุดคือการจัดโครงสร้างเมนูและการวางตำแหน่งร้าน',
      ),
      name: t('Арина', 'Arina', 'Arina', 'Arina'),
      role: 'Only Eggs',
    },
    {
      text: t(
        'Профессиональный подход и быстрые результаты. Теперь понимаем, как правильно работать с Gojek и Grab и увеличивать прибыль. Сняли большую головную боль по работе с платформами - наконец появилось время заниматься развитием бизнеса.',
        'Professional approach and quick results. Now we understand how to work with Gojek and Grab properly and increase profits. Removed a huge headache from working with platforms - finally have time to focus on business development.',
        'Pendekatan yang profesional dan hasil yang cepat. Sekarang kami paham cara bekerja dengan Gojek dan Grab dengan benar dan menaikkan laba. Beban besar dalam mengurus platform sudah diambil alih - akhirnya kami punya waktu untuk mengembangkan bisnis.',
        'ทำงานเป็นมืออาชีพและเห็นผลเร็ว ตอนนี้เราเข้าใจแล้วว่าต้องทำงานกับ Gojek และ Grab อย่างไรให้ถูกต้องและเพิ่มกำไร ภาระหนักในการดูแลแพลตฟอร์มถูกยกไป เราจึงมีเวลาไปพัฒนาธุรกิจจริง ๆ',
      ),
      name: t('Алексей', 'Aleksei', 'Aleksei', 'Aleksei'),
      role: 'Prana Kitchen',
    },
    {
      text: t(
        'Аудит показал неочевидные проблемы, которые мы не замечали. После внедрения рекомендаций средний чек вырос на 25%.',
        "The audit revealed non-obvious problems we hadn't noticed. After implementing recommendations, the average check increased by 25%.",
        'Audit menunjukkan masalah yang tidak kami sadari sebelumnya. Setelah rekomendasinya diterapkan, rata-rata nilai pesanan naik 25%.',
        'การวิเคราะห์ชี้ปัญหาที่เราไม่เคยรู้มาก่อน พอทำตามคำแนะนำ ยอดต่อบิลก็เพิ่มขึ้น 25%',
      ),
      name: t('Дмитрий П.', 'Dmitry P.', 'Dmitry P.', 'Dmitry P.'),
      role: t('Пиццерия', 'Pizzeria', 'Pizzeria', 'ร้านพิซซ่า'),
    },
  ];
  const reviews = country.code === 'id' ? baliReviews : thaiReviews;
  return (
    <section className="v-sec" id="reviews">
      <div className="v-wrap">
        <div className="v-head">
          <span className="v-eye">{t('Отзывы', 'Reviews', 'Ulasan', 'รีวิว')}</span>
          <h2 className="v-h2" data-testid="text-testimonials-title">{t('Что говорят владельцы ресторанов', 'What restaurant owners say', 'Kata pemilik restoran', 'เสียงจากเจ้าของร้าน')}</h2>
        </div>
        <div className="v-reviews">
          {reviews.map((r) => (
            <figure className="v-review" key={r.name}>
              <blockquote>«{r.text}»</blockquote>
              <div>
                <div className="v-stars" role="img" aria-label="5 / 5"><Star /><Star /><Star /><Star /><Star /></div>
                <figcaption><b>{r.name}</b><span>{r.role}</span></figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- финальный призыв */
export const FinalCtaV2 = () => {
  const { t, language } = useLanguage();
  const p = usePlatforms();
  return (
    <section className="v-sec" id="contact">
      <div className="v-wrap">
        <div className="v-ctab">
          <h2 className="v-h2" data-testid="text-cta-title">{t('Готовы увеличить заказы?', 'Ready to increase orders?', 'Siap menambah pesanan?', 'พร้อมเพิ่มออร์เดอร์แล้วหรือยัง')}</h2>
          <p data-testid="text-cta-description">
            {t(
              'Бесплатная автоматическая диагностика карточки на diagnostic.booster.delivery: вставьте ссылку на ресторан в Grab или GoFood, через минуту отчёт, что теряет заказы прямо сейчас. Без логина и оплаты.',
              'A free automated listing check at diagnostic.booster.delivery: paste your Grab or GoFood restaurant link and in a minute you see what loses orders right now. No login, no payment.',
              'Pemeriksaan listing otomatis gratis di diagnostic.booster.delivery: tempel link restoran Anda di Grab atau GoFood, semenit kemudian terlihat apa yang membuat pesanan hilang sekarang. Tanpa login dan tanpa bayar.',
              'ตัวตรวจหน้าร้านอัตโนมัติฟรีที่ diagnostic.booster.delivery: วางลิงก์ร้านของคุณบน Grab หรือ GoFood อีกหนึ่งนาทีเห็นเลยว่าอะไรทำให้เสียออร์เดอร์อยู่ตอนนี้ ไม่ต้องล็อกอิน ไม่ต้องจ่าย',
            )}
          </p>
          <div className="v-cta2" style={{ justifyContent: 'center', marginTop: 8 }}>
            <a className="v-btn" href={diagnosticUrl('landing-bottom', language)} target="_blank" rel="noopener noreferrer" data-testid="button-cta-main">
              {t('Проверить карточку бесплатно', 'Check my listing free', 'Cek listing saya gratis', 'ตรวจหน้าร้านฟรี')}
            </a>
            <a className="v-btn2" href={messengerUrl(language, 'landing-bottom', { platforms: p })} target="_blank" rel="noopener noreferrer" data-slot="landing-bottom">
              {t('Написать нам', 'Message us', 'Hubungi kami', 'ทักหาเรา')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

/** Свернуть хвост списка, оставив его в HTML: ИИ-краулеры читают скрытые пункты. */
export const useShowMore = () => {
  const [all, setAll] = useState(false);
  return { all, toggle: () => setAll((v) => !v) };
};
