import { syncOpenGraph } from '../components/AnswerLayout';
import { useEffect } from 'react';
import { Link } from 'wouter';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { PhoneFrame } from '../components/HomeV2';
import { CountryProvider } from '../hooks/useCountry';
import { useLanguage } from '../hooks/useLanguage';
import { diagnosticUrl, messengerUrl } from '../lib/cta';
import { getCaseBySlug } from '../config/case-studies';
import { Bar, CaseV2, L, Lang, MONTH_FULL, MONTH_SHORT, MonthKey, Pt, casesForCountry, getCaseV2, l, tv } from '../config/cases';
import NotFound from '@/pages/not-found';

/**
 * Страница кейса /cases/<slug>, шаблон из финального ТЗ маркетолога (24.11.2026).
 * Два типа: «рост выручки» (точка А с цифрами до нас) и «запуск с нуля».
 * Прежний длинный текст кейса не выброшен: он лежит в свёрнутом блоке
 * «Подробнее о работе» и остаётся в HTML, его читают ИИ-ассистенты.
 */

const ORDER: MonthKey[] = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const COLORS = { pre: '#5B6B62', a: '#F97316', start: '#86EFAC', us: '#22C55E' } as const;

const monthName = (m: MonthKey, lang: Lang, lower = false) => {
  const s = MONTH_FULL[m][lang];
  return lower && lang === 'ru' ? s.toLowerCase() : s;
};
/** Год первого столбика: идём от последнего назад и уменьшаем год на переходе через январь. */
const firstBarYear = (bars: Bar[], lastYear: number) => {
  let y = lastYear;
  for (let i = bars.length - 1; i > 0; i--) if (ORDER.indexOf(bars[i - 1].m) > ORDER.indexOf(bars[i].m) || bars[i - 1].m === bars[i].m) y--;
  return y;
};
const and = (lang: Lang) => ({ ru: ' и ', en: ' and ', id: ' dan ', th: 'และ' })[lang];
const pair = (a: Pt, b: Pt, lang: Lang, lower: boolean) =>
  a.y === b.y
    ? `${monthName(a.m, lang, lower)}${and(lang)}${monthName(b.m, lang, true)} ${b.y}`
    : `${monthName(a.m, lang, lower)} ${a.y}${and(lang)}${monthName(b.m, lang, true)} ${b.y}`;

export default function CasePage({ slug }: { slug: string }) {
  const { t, language } = useLanguage();
  const lang = language as Lang;
  const c = getCaseV2(slug);
  const old = getCaseBySlug(slug);

  useEffect(() => {
    if (!c) return;
    document.title = `${t('Кейс', 'Case study', 'Studi kasus', 'เคส')} ${c.name}: ${c.headline[lang]} | Delivery Booster`;
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = `https://booster.delivery/cases/${c.slug}`;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) description.content = `${c.name}, ${c.place[lang]}. ${c.headline[lang]}. ${c.lead[lang]}`;
    syncOpenGraph();
  }, [lang, c]);

  if (!c) return <NotFound />;

  const th = c.country === 'th';
  const launch = c.kind === 'launch';
  const cur = th ? 'THB' : 'Rp';
  const plat = th ? 'Grab' : t('Grab и GoFood', 'Grab and GoFood', 'Grab dan GoFood', 'Grab และ GoFood');
  const countryName = th ? t('Таиланд', 'Thailand', 'Thailand', 'ประเทศไทย') : t('Индонезия', 'Indonesia', 'Indonesia', 'อินโดนีเซีย');
  const sameYear = c.a.y === c.b.y;
  const colA = launch ? t('Старт', 'Start', 'Awal', 'เริ่มต้น') : `${monthName(c.a.m, lang)}${sameYear ? '' : ` ${c.a.y}`}`;
  const colB = `${monthName(c.b.m, lang)}${sameYear ? '' : ` ${c.b.y}`}`;
  const tableTitle = launch
    ? t(`Старт и ${monthName(c.b.m, lang, true)} в цифрах`, `The start and ${monthName(c.b.m, lang)} in numbers`, `Awal dan ${monthName(c.b.m, lang)} dalam angka`, `ตัวเลขตอนเริ่มต้นและเดือน${monthName(c.b.m, lang)}`)
    : t(`${pair(c.a, c.b, lang, false).replace(/ \d{4}$/, sameYear ? '' : '$&')} в цифрах`, `${pair(c.a, c.b, lang, false).replace(/ \d{4}$/, sameYear ? '' : '$&')} in numbers`, `${pair(c.a, c.b, lang, false).replace(/ \d{4}$/, sameYear ? '' : '$&')} dalam angka`, `ตัวเลขเดือน${pair(c.a, c.b, lang, false).replace(/ \d{4}$/, sameYear ? '' : '$&')}`);
  const source = `${t('Цифры из', 'Numbers from', 'Angka dari', 'ตัวเลขจาก')} ${plat} · ${launch ? `${monthName(c.b.m, lang, true)} ${c.b.y}` : pair(c.a, c.b, lang, true)}`;
  const y0 = firstBarYear(c.bars, c.b.y);
  const first = c.bars[0].m;
  const period = y0 === c.b.y ? `${monthName(first, lang, true)}-${monthName(c.b.m, lang, true)} ${c.b.y}` : `${monthName(first, lang, true)} ${y0} - ${monthName(c.b.m, lang, true)} ${c.b.y}`;
  const kinds = new Set(c.bars.map((x) => x.c));
  const legend: [keyof typeof COLORS, string][] = [
    ['pre', launch ? t('Аккаунта нет', 'No account yet', 'Belum ada akun', 'ยังไม่มีบัญชี') : t('Ресторан сам', 'On its own', 'Restoran sendiri', 'ร้านทำเอง')],
    ['a', t('Точка А', 'Point A', 'Titik A', 'จุด A')],
    ['start', launch ? t('Запуск', 'Launch', 'Peluncuran', 'เปิดร้าน') : t('Месяц старта', 'Start month', 'Bulan mulai', 'เดือนที่เริ่ม')],
    ['us', t('С Delivery Booster', 'With Delivery Booster', 'Bersama Delivery Booster', 'กับ Delivery Booster')],
  ];
  const n = c.work.cards.length;
  const others = casesForCountry(c.country).filter((x) => x.slug !== c.slug);
  const pk = (o: Record<string, unknown> | undefined, base: string): string => {
    if (!o) return '';
    const suf = { ru: 'Ru', en: 'En', id: 'Id', th: 'Th' }[lang];
    return ((o[base + suf] ?? o[base + 'En']) as string) ?? '';
  };
  const pkList = (o: Record<string, unknown>, base: string): string[] => {
    const suf = { ru: 'Ru', en: 'En', id: 'Id', th: 'Th' }[lang];
    return ((o[base + suf] ?? o[base + 'En']) as string[]) ?? [];
  };
  const dash = (s: string) => s.replace(/ — /g, ' - ').replace(/—/g, '-');

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${c.name}: ${c.headline[lang]}`,
    description: c.lead[lang],
    about: { '@type': 'Restaurant', name: c.name, address: c.place.en },
    author: { '@type': 'Organization', name: 'Delivery Booster', url: 'https://booster.delivery' },
    publisher: { '@type': 'Organization', name: 'Delivery Booster' },
    url: `https://booster.delivery/cases/${c.slug}`,
    image: [`https://booster.delivery/case-phones/${c.slug}.jpg`],
  };
  const eye = (s: string) => <span className="v-eye">{s}</span>;
  const row = (r: { m: L; a: string | L; b: string | L }, i: number) => (
    <tr key={i}><th scope="row">{r.m[lang]}</th><td>{tv(r.a, lang)}</td><td>{tv(r.b, lang)}</td></tr>
  );
  const thead = (
    <thead><tr><th scope="col">{t('Показатель', 'Metric', 'Indikator', 'ตัวชี้วัด')}</th><th scope="col">{colA}</th><th scope="col">{colB}</th></tr></thead>
  );

  return (
    <CountryProvider country={c.country}>
      <div className="v v-hpad">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <Header />
        <main>
          <div className="v-crumb">
            <Link href={`/${c.country}#cases`} data-testid="link-back">
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
              {t('Все кейсы', 'All case studies', 'Semua studi kasus', 'เคสทั้งหมด')}
            </Link>
          </div>

          <section className="v-chero">
            <div className="v-chero-l">
              <span className="v-cpill">{t('Кейс', 'Case study', 'Studi kasus', 'เคส')} · {th ? 'Grab' : 'Grab + GoFood'} · {countryName}</span>
              <div className="v-cwho">
                <img src={c.logo} alt={`${c.name} logo`} width={56} height={56} />
                <div><b>{c.name}</b><span>{c.place[lang]}{c.tag ? ` · ${c.tag[lang]}` : ''}</span></div>
              </div>
              <h1 className="v-ch1" data-testid="text-case-title">{c.headline[lang]}</h1>
              <p className="v-clead">{c.lead[lang]}</p>
              <div className="v-kpis">
                {c.kpis.map((k, i) => <div className="v-kpi" key={i}><b>{tv(k.v, lang)}</b><span>{k.l[lang]}</span></div>)}
              </div>
              <span className="v-src">{source}</span>
            </div>
            <figure className="v-cphone">
              <PhoneFrame src={`/case-phones/${c.slug}.jpg`} alt={`${c.name}: ${t('карточка ресторана в приложении Grab', 'restaurant listing in the Grab app', 'halaman restoran di aplikasi Grab', 'หน้าร้านในแอป Grab')}`} />
              <figcaption>{t(`Карточка ${c.name} в Grab сейчас`, `${c.name} on Grab today`, `${c.name} di Grab saat ini`, `${c.name} บน Grab ตอนนี้`)}</figcaption>
            </figure>
          </section>

          <section className="v-sec v-csec">
            <div className="v-wrap">
              <div className="v-head">
                {eye(launch ? `${t('Старт', 'Start', 'Awal', 'เริ่มต้น')} · ${monthName(c.a.m, lang, true)} ${c.a.y}` : `${t('Точка А', 'Point A', 'Titik A', 'จุด A')} · ${monthName(c.a.m, lang, true)} ${c.a.y}`)}
                <h2 className="v-h2">{launch ? t('Точка А - ноль', 'Point A: zero', 'Titik A: nol', 'จุด A: ศูนย์') : t('С чем ресторан пришёл', 'Where the restaurant started', 'Kondisi awal restoran', 'จุดเริ่มต้นของร้าน')}</h2>
              </div>
              <div className="v-kpis">
                {c.pointA.stats.map((k, i) => (
                  <div className="v-kpi a" key={i}>
                    <b className={k.warn && !k.note ? 'w' : undefined}>{tv(k.v, lang)}</b>
                    <span>{k.l[lang]}</span>
                    {k.note && <small className={k.warn ? 'w' : undefined}>{k.note[lang]}</small>}
                  </div>
                ))}
              </div>
              <ul className="v-bul">{c.pointA.bullets.map((b, i) => <li key={i}>{b[lang]}</li>)}</ul>
            </div>
          </section>

          <section className="v-sec v-csec">
            <div className="v-wrap">
              <div className="v-head">
                {eye(t('Что мы сделали', 'What we did', 'Yang kami kerjakan', 'สิ่งที่เราทำ'))}
                <h2 className="v-h2">
                  {launch
                    ? t('Запуск под ключ', 'A turnkey launch', 'Peluncuran sampai jalan', 'เปิดร้านแบบครบวงจร')
                    : t(`${n} ${n >= 5 ? 'направлений' : 'направления'} работы`, `${n} areas of work`, `${n} area pekerjaan`, `งาน ${n} ด้าน`)}
                </h2>
                {c.work.sub && <p className="v-lead">{c.work.sub[lang]}</p>}
              </div>
              <div className="v-work">
                {c.work.cards.map((w, i) => (
                  <div className="v-wcard" key={i}>
                    <h3>{w.t[lang]}</h3>
                    <ul>{w.items.map((x, j) => <li key={j}>{x[lang]}</li>)}</ul>
                    <div className="v-wres"><b>{tv(w.v, lang)}</b><span>{tv(w.l, lang)}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="v-sec v-csec">
            <div className="v-wrap">
              <div className="v-head">
                {eye(t('Результат', 'Result', 'Hasil', 'ผลลัพธ์'))}
                <h2 className="v-h2">{launch ? t('Продажи по месяцам: путь с нуля', 'Sales by month: starting from zero', 'Penjualan per bulan: mulai dari nol', 'ยอดขายรายเดือน: เริ่มจากศูนย์') : t('Продажи по месяцам', 'Sales by month', 'Penjualan per bulan', 'ยอดขายรายเดือน')}</h2>
                <p style={{ fontSize: 15, color: 'var(--mut)' }}>{th ? 'Grab' : 'Grab + GoFood'} · {t(`${cur} в месяц`, `${cur} a month`, `${cur} per bulan`, `${cur} ต่อเดือน`)} · {period}</p>
              </div>
              <div className="v-chart">
                <div className="v-legend">
                  {legend.filter(([k]) => kinds.has(k)).map(([k, label]) => <span key={k}><i style={{ background: COLORS[k] }} />{label}</span>)}
                </div>
                <div className="v-bars" style={{ ['--n' as string]: c.bars.length }}>
                  {c.bestLine && <div className="v-bestline" aria-hidden="true" style={{ bottom: `calc((100% - 46px) * ${c.bestLine.h / 100})` }} />}
                  {c.bars.map((x, i) => (
                    <div className="v-bar" key={i}>
                      <span>{x.label ? tv(x.label, lang) : ''}</span>
                      <i style={{ height: `calc((100% - 18px) * ${x.h / 100})`, background: COLORS[x.c] }} />
                    </div>
                  ))}
                </div>
                <div className="v-months" style={{ ['--n' as string]: c.bars.length }}>
                  {c.bars.map((x, i) => <span key={i} className={x.label ? 'b' : undefined}>{MONTH_SHORT[x.m][lang]}</span>)}
                </div>
                {c.bestLine && <span style={{ fontSize: 13, color: 'var(--orange)' }}>- - - {c.bestLine.label[lang]}</span>}
              </div>
              {c.chartNote && <p className="v-text">{c.chartNote[lang]}</p>}
            </div>
          </section>

          <section className="v-sec v-csec">
            <div className="v-wrap">
              <div className="v-head">
                {eye(t('Было → стало', 'Before → after', 'Sebelum → sesudah', 'ก่อน → หลัง'))}
                <h2 className="v-h2">{tableTitle}</h2>
              </div>
              <div className="v-tbl"><table>{thead}<tbody>{c.rows.map(row)}</tbody></table></div>
              {c.tableNote && <p className="v-text">{c.tableNote[lang]}</p>}
            </div>
          </section>

          {c.season && (
            <section className="v-sec v-csec">
              <div className="v-wrap">
                <div className="v-head">
                  {eye(t('Сезон', 'Season', 'Musim', 'ฤดูกาล'))}
                  <h2 className="v-h2">{c.season.title[lang]}</h2>
                </div>
                <div className="v-k3">
                  {c.season.tiles.map((k, i) => <div className="v-kpi" key={i} style={{ padding: 18, gap: 6 }}><b className={k.warn ? 'w' : undefined}>{tv(k.v, lang)}</b><span>{k.l[lang]}</span></div>)}
                </div>
                {c.season.text && <p className="v-text">{c.season.text[lang]}</p>}
                {th && (
                  <a className="v-link" style={{ alignSelf: 'flex-start', padding: '6px 0' }} href="https://phuketstats.booster.delivery/phuket-tourists" target="_blank" rel="noopener">
                    {t('Туристы на Пхукете по месяцам', 'Phuket tourists by month', 'Wisatawan Phuket per bulan', 'นักท่องเที่ยวภูเก็ตรายเดือน')} →
                  </a>
                )}
              </div>
            </section>
          )}

          {(old || c.details) && (
            <section className="v-sec v-csec">
              <div className="v-wrap">
                <details className="v-det" data-testid="case-details">
                  <summary>{t('Подробнее о работе', 'More about the work', 'Selengkapnya tentang pekerjaan ini', 'รายละเอียดงานเพิ่มเติม')}</summary>
                  <div className="v-det-in">
                    {c.details && (
                      <>
                        <p>{c.details.text[lang]}</p>
                        <div className="v-tbl"><table>{thead}<tbody>{c.details.rows.map(row)}</tbody></table></div>
                        {c.details.queries && (
                          <div>
                            <h3>{t('Что ищут гости: топ запросов по продажам', 'What guests search for: top queries by sales', 'Apa yang dicari tamu: kata kunci teratas menurut penjualan', 'ลูกค้าค้นหาอะไร: คำค้นที่ทำยอดขายสูงสุด')}</h3>
                            <ul>{c.details.queries.map((q) => <li key={q.q}>{q.q}: {q.v} THB</li>)}</ul>
                            {c.details.queriesNote && <p style={{ marginTop: 8 }}>{c.details.queriesNote[lang]}</p>}
                          </div>
                        )}
                      </>
                    )}
                    {old && (
                      <>
                        <p>{(c.oldNote ?? l(
                          'Разбор ниже написан раньше. Суммы в нём могут быть даны по выплатам ресторану (после комиссии площадки), а не по продажам, поэтому отличаются от цифр выше.',
                          'The write-up below was written earlier. Its amounts may be payouts to the restaurant (after the platform commission) rather than sales, so they differ from the numbers above.',
                          'Ulasan di bawah ditulis lebih awal. Angkanya bisa berupa pencairan ke restoran (setelah komisi platform), bukan penjualan, sehingga berbeda dari angka di atas.',
                          'บทสรุปด้านล่างเขียนไว้ก่อนหน้านี้ ตัวเลขอาจเป็นยอดเงินโอนให้ร้าน (หลังหักค่าคอมมิชชันแพลตฟอร์ม) ไม่ใช่ยอดขาย จึงต่างจากตัวเลขด้านบน',
                        ))[lang]}</p>
                        <div>
                          <h3>{t('Ситуация до начала работы', 'The situation before we started', 'Situasi sebelum kami mulai', 'สถานการณ์ก่อนเริ่มงาน')}</h3>
                          <p>{dash(pk(old as never, 'situation'))}</p>
                          <ul style={{ marginTop: 10 }}>{pkList(old as never, 'problems').map((p, i) => <li key={i}>{dash(p)}</li>)}</ul>
                        </div>
                        {old.work.map((w, i) => (
                          <div key={i}>
                            <h3>{dash(pk(w as never, 'title'))}</h3>
                            <ul>{pkList(w as never, 'items').map((x, j) => <li key={j}>{dash(x)}</li>)}</ul>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </details>
              </div>
            </section>
          )}

          <section className="v-sec v-csec">
            <div className="v-wrap">
              <div className="v-cctab">
                <h2 className="v-h2">{t(`Хотите такой же рост на ${plat}?`, `Want the same growth on ${plat}?`, `Ingin pertumbuhan yang sama di ${plat}?`, `อยากโตแบบนี้บน ${plat} ไหม`)}</h2>
                <p>{(c.cta ?? l('Бесплатно проверим карточку вашего ресторана и покажем, что можно улучшить.', 'We will check your restaurant listing for free and show what can be improved.', 'Kami cek halaman restoran Anda gratis dan tunjukkan apa yang bisa diperbaiki.', 'เราตรวจหน้าร้านของคุณฟรีและบอกว่าปรับอะไรได้บ้าง'))[lang]}</p>
                <div className="v-cta2" style={{ width: '100%' }}>
                  <a className="v-btn" href={diagnosticUrl('case', language)} target="_blank" rel="noopener noreferrer" data-testid="button-case-cta">
                    {t('Проверить карточку бесплатно', 'Check my listing free', 'Cek listing saya gratis', 'ตรวจหน้าร้านฟรี')}
                  </a>
                  <a className="v-btn2" href={messengerUrl(language, 'case', { platforms: plat })} target="_blank" rel="noopener noreferrer" data-slot="case">
                    {t('Написать нам', 'Message us', 'Hubungi kami', 'ทักหาเรา')}
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="v-sec v-csec">
            <div className="v-wrap" style={{ gap: 24 }}>
              <h2 className="v-h2" style={{ fontSize: 32 }}>{t('Другие кейсы', 'More case studies', 'Studi kasus lain', 'เคสอื่น ๆ')}</h2>
              <div className="v-others">
                {others.map((o) => (
                  <Link key={o.slug} href={`/cases/${o.slug}`} className="v-ocard">
                    <div className="v-who"><img src={o.logo} alt={`${o.name} logo`} width={40} height={40} loading="lazy" /><div><b>{o.name}</b><span>{o.place[lang]}</span></div></div>
                    <div className="v-oval"><b>{tv(o.card.value, lang)}</b><span>{o.badge.line[lang]}</span></div>
                    <span className="v-link">{t('Читать кейс', 'Read the case study', 'Baca studi kasus', 'อ่านเคส')} →</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </CountryProvider>
  );
}
