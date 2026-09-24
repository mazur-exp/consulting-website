import { useLanguage } from '../hooks/useLanguage';

/**
 * Single source of truth for the answer cluster: the /answers hub, the cards on
 * every country page and the crawler's path into the cluster all read this one
 * list. Adding a material here puts it everywhere at once — the same rule the
 * country and case configs follow.
 *
 * `gist` is not decoration. It gives a human the reason to click, and it puts a
 * second question/short-answer pair in plain text on the most-cited page of the
 * site. A bare anchor does neither.
 */
export type MaterialKind = 'answer' | 'data' | 'method';

export interface Material {
  href: string;
  kind: MaterialKind;
  minutes: number;
  titleRu: string;
  titleEn: string;
  titleId: string;
  titleTh?: string;
  gistRu: string;
  gistEn: string;
  gistId: string;
  gistTh?: string;
}

export const ANSWER_MATERIALS: Material[] = [
  {
    href: '/answers/ai-assistant-grabfood-check',
    kind: 'answer',
    minutes: 4,
    titleRu: 'Может ли ChatGPT или Claude проверить мою карточку в GrabFood?',
    titleEn: 'Can ChatGPT or Claude check my GrabFood listing for me?',
    titleId: 'Bisakah ChatGPT atau Claude memeriksa listing GrabFood saya?',
    titleTh: 'ChatGPT หรือ Claude ตรวจหน้าร้าน GrabFood ของฉันได้ไหม',
    gistRu: 'Нажать кнопку ассистент не может, но может дать ссылку, по которой бесплатная проверка запустится сама. Формат ссылки, промпт, что в отчёте.',
    gistEn: 'An assistant cannot press the button, but it can hand you a link that starts the free check by itself. The link format, a prompt, what the report shows.',
    gistId: 'Asisten tidak bisa menekan tombol, tapi bisa memberi link yang langsung memulai pemeriksaan gratis. Format link, prompt, isi laporan.',
    gistTh: 'ผู้ช่วยกดปุ่มไม่ได้ แต่ให้ลิงก์ที่เปิดแล้วการตรวจฟรีเริ่มเองได้ รูปแบบลิงก์ พรอมต์ และสิ่งที่อยู่ในรายงาน',
  },
  {
    href: '/answers/grabfood-phuket-thailand',
    kind: 'answer',
    minutes: 9,
    titleRu: 'GrabFood в Таиланде: как устроена доставка и что показывают цифры Пхукета?',
    titleEn: 'GrabFood in Thailand: how delivery works and what the Phuket numbers show?',
    titleId: 'GrabFood di Thailand: cara kerja delivery dan apa yang ditunjukkan angka Phuket?',
    titleTh: 'GrabFood ในไทย: เดลิเวอรี่ทำงานอย่างไร และตัวเลขภูเก็ตบอกอะไร',
    gistRu: 'Grab ≈46% и LINE MAN ≈40% после ухода foodpanda, комиссия 30%; Пхукет — чек 773 THB, ROAS 23.6x, сезон январь/июнь 1,8x, районы с цифрами.',
    gistEn: 'Grab ≈46% and LINE MAN ≈40% after foodpanda left, 30% commission; Phuket — 773 THB basket, 23.6x ROAS, a 1.8x January/June swing, areas with numbers.',
    gistId: 'Grab ≈46% dan LINE MAN ≈40% setelah foodpanda pergi, komisi 30%; Phuket — nilai pesanan 773 THB, ROAS 23.6x, musim Januari/Juni 1,8x, area dengan angka.',
    gistTh: 'Grab ≈46% และ LINE MAN ≈40% หลัง foodpanda ถอนตัว ค่าคอมมิชชัน 30% ภูเก็ต: ยอดต่อบิล 773 บาท ROAS 23.6 เท่า ฤดูกาลมกราคม/มิถุนายน 1.8 เท่า ย่านพร้อมตัวเลข',
  },
  {
    href: '/answers/few-orders-grabfood-gofood',
    kind: 'answer',
    minutes: 8,
    titleRu: 'Мало заказов в GrabFood и GoFood — с чего начинать?',
    titleEn: 'Few orders on GrabFood and GoFood — where do I start?',
    titleId: 'Orderan sepi di GrabFood dan GoFood — mulai dari mana?',
    titleTh: 'ออร์เดอร์น้อยบน GrabFood และ GoFood เริ่มจากตรงไหน',
    gistRu: 'Пять ступеней, на которых теряется заказ, в правильном порядке: видимость, карточка, меню, рейтинг и только потом реклама.',
    gistEn: 'The five steps where an order is lost, in the right order: visibility, listing, menu, rating — and only then ads.',
    gistId: 'Lima tahap tempat pesanan hilang, dalam urutan yang benar: ketersediaan, listing, menu, rating — dan baru setelah itu iklan.',
    gistTh: 'ห้าขั้นที่ออร์เดอร์หลุดหาย เรียงให้ถูกลำดับ: การมองเห็น หน้าร้าน เมนู เรตติ้ง แล้วค่อยถึงโฆษณา',
  },
  {
    href: '/answers/grabfood-gofood-rating-after-bad-reviews',
    kind: 'answer',
    minutes: 9,
    titleRu: 'Как поднять рейтинг ресторана после плохих отзывов?',
    titleEn: 'How do I improve my restaurant rating after bad reviews?',
    titleId: 'Bagaimana menaikkan rating restoran setelah ulasan buruk?',
    titleTh: 'จะดึงเรตติ้งร้านกลับมาหลังโดนรีวิวแย่ได้อย่างไร',
    gistRu: 'Одна единица стоит двадцати пятёрок: рейтинг — среднее за весь период. Поэтому сначала причины, потом перехват жалобы, потом апелляция.',
    gistEn: 'One one-star costs twenty five-stars: the rating averages the whole period. So causes first, then intercepting the complaint, then the appeal.',
    gistId: 'Satu bintang satu setara dua puluh bintang lima: rating merata-ratakan seluruh periode. Jadi penyebab dulu, lalu mencegat keluhan, lalu banding.',
    gistTh: 'หนึ่งดาวหนึ่งครั้งมีราคาเท่าห้าดาวยี่สิบครั้ง เพราะเรตติ้งเฉลี่ยทั้งช่วงเวลา จึงต้องแก้ต้นเหตุก่อน แล้วดักคำร้องเรียน แล้วค่อยอุทธรณ์',
  },
  {
    href: '/answers/grabfood-gofood-fees-indonesia',
    kind: 'answer',
    minutes: 10,
    titleRu: 'Сколько стоит продавать через GrabFood и GoFood?',
    titleEn: 'What does selling through GrabFood and GoFood cost?',
    titleId: 'Berapa biaya berjualan lewat GrabFood dan GoFood?',
    titleTh: 'ขายผ่าน GrabFood และ GoFood มีค่าใช้จ่ายเท่าไหร่',
    gistRu: 'Комиссия 20% в Индонезии и 30% в Таиланде — но крупнее неё статья, которой нет в отчёте: 25% выручки на стоп-листе.',
    gistEn: '20% commission in Indonesia and 30% in Thailand — but a bigger line never shows in the report: 25% of revenue lost to stock-outs.',
    gistId: 'Komisi 20% di Indonesia dan 30% di Thailand — tapi ada pos lebih besar yang tak muncul di laporan: 25% omzet hilang karena stok habis.',
    gistTh: 'ค่าคอมมิชชัน 20% ในอินโดนีเซียและ 30% ในไทย แต่มีก้อนที่ใหญ่กว่าซึ่งไม่โผล่ในรายงาน คือ 25% ของรายได้ที่หายไปกับเมนูปิดขาย',
  },
  {
    href: '/answers/grabfood-gofood-account-management',
    kind: 'answer',
    minutes: 6,
    titleRu: 'Можно ли нанять кого-то для ведения аккаунта GrabFood и GoFood?',
    titleEn: 'Can I hire someone to manage my GrabFood and GoFood account?',
    titleId: 'Bisakah pengelolaan akun GrabFood dan GoFood diserahkan ke pihak lain?',
    gistRu: 'Да. Что именно передаётся агентству, что остаётся у ресторана и на что смотреть при выборе.',
    gistEn: 'Yes. What exactly gets handed over, what stays with the restaurant, and what to check when choosing.',
    gistId: 'Bisa. Apa yang diserahkan ke agensi, apa yang tetap di restoran, dan apa yang perlu dicek saat memilih.',
  },
  {
    href: '/answers/delivery-agency-vs-klikit-deliverect',
    kind: 'answer',
    minutes: 5,
    titleRu: 'Агентство или Klikit / Deliverect / Hubster — в чём разница?',
    titleEn: 'An agency or Klikit / Deliverect / Hubster — what is the difference?',
    titleId: 'Agensi atau Klikit / Deliverect / Hubster — apa bedanya?',
    gistRu: 'Разные категории, а не альтернативы: софт убирает хаос в операциях, агентство меняет цифры в кабинете.',
    gistEn: 'Different categories, not alternatives: software removes operational chaos, an agency changes the dashboard numbers.',
    gistId: 'Kategori berbeda, bukan alternatif: software merapikan operasional, agensi mengubah angka di dashboard.',
  },
  {
    href: '/answers/grabfood-ads-not-working',
    kind: 'answer',
    minutes: 7,
    titleRu: 'Плачу за рекламу в GrabFood, а заказов больше не стало — почему?',
    titleEn: 'Paying for GrabFood ads but orders are not increasing — why?',
    titleId: 'Sudah bayar iklan GrabFood tapi pesanan tidak naik — kenapa?',
    gistRu: 'Обычно это не реклама, а карточка: бюджет покупает показы там, где конверсия не готова их принять.',
    gistEn: 'Usually it is not the ads but the listing: budget buys impressions the conversion is not ready to take.',
    gistId: 'Biasanya bukan iklannya, tapi listing-nya: budget membeli impresi yang konversinya belum siap menerima.',
  },
  {
    href: '/answers/managing-grabfood-yourself',
    kind: 'answer',
    minutes: 8,
    titleRu: 'Сколько времени занимает вести GrabFood и GoFood самому?',
    titleEn: 'How much time does running GrabFood and GoFood yourself take?',
    titleId: 'Berapa banyak waktu untuk mengelola GrabFood dan GoFood sendiri?',
    gistRu: 'Не «пара часов в неделю на аналитику», а полноценная функция: разбор всех работ по дням и неделям.',
    gistEn: 'Not "a couple of hours a week on analytics" but a full function: every task broken down by day and week.',
    gistId: 'Bukan "beberapa jam seminggu untuk analitik", tapi fungsi penuh: semua pekerjaan dirinci per hari dan minggu.',
  },
  {
    href: '/answers/in-house-manager-vs-agency',
    kind: 'answer',
    minutes: 7,
    titleRu: 'Свой менеджер по агрегаторам или агентство?',
    titleEn: 'An in-house delivery manager or an agency?',
    titleId: 'Manajer delivery internal atau agensi?',
    gistRu: 'Сравнение не про цену, а про результат: десятки процентов у доступных в найме против кратного роста в кейсах.',
    gistEn: 'Not a price comparison but a result comparison: tens of percent from hireable specialists against multiples in our cases.',
    gistId: 'Bukan soal harga, tapi hasil: puluhan persen dari spesialis yang bisa direkrut versus pertumbuhan berlipat di studi kasus kami.',
  },
];

export const ASSET_MATERIALS: Material[] = [
  {
    href: '/benchmark',
    kind: 'data',
    minutes: 10,
    titleRu: 'Бенчмарк доставки Бали и Пхукет 2026',
    titleEn: 'Bali & Phuket Delivery Benchmark 2026',
    titleId: 'Benchmark Delivery Bali & Phuket 2026',
    gistRu: 'Нормы рынка по 96 ресторанам и 270 568 заказам: средний чек, ROAS, отмены, где утекает выручка. Открыто, без формы.',
    gistEn: 'Market norms from 96 restaurants and 270,568 orders: average check, ROAS, cancellations, where revenue leaks. Free, no form.',
    gistId: 'Norma pasar dari 96 restoran dan 270,568 pesanan: rata-rata nilai pesanan, ROAS, pembatalan, di mana omzet bocor. Gratis, tanpa formulir.',
  },
  {
    href: '/method',
    kind: 'method',
    minutes: 9,
    titleRu: 'Метод Delivery Booster',
    titleEn: 'The Delivery Booster Method',
    titleId: 'Metode Delivery Booster',
    gistRu: 'Пять этапов, которые мы проходим на каждом аккаунте, опубликованы целиком — включая то, что обычно не показывают.',
    gistEn: 'The five stages we run on every account, published in full — including the parts usually kept private.',
    gistId: 'Lima tahap yang kami jalankan di setiap akun, dipublikasikan lengkap — termasuk bagian yang biasanya tidak dibagikan.',
  },
];

const KIND_LABEL: Record<MaterialKind, [string, string, string, string]> = {
  answer: ['Ответ', 'Answer', 'Jawaban', 'คำตอบ'],
  data: ['Данные', 'Data', 'Data', 'ข้อมูล'],
  method: ['Метод', 'Method', 'Metode', 'เมธอด'],
};

/** Card for one material. Uses a real <a href> so crawlers follow it without JS. */
export const MaterialCard = ({ m, large = false }: { m: Material; large?: boolean }) => {
  const { t } = useLanguage();
  const [lr, le, li, lt] = KIND_LABEL[m.kind];

  return (
    <a
      href={m.href}
      data-testid={`material-card-${m.href}`}
      className={`group block rounded-2xl border border-white/10 bg-white/[0.02] hover:border-brand-green/50 hover:bg-white/[0.04] transition-all duration-300 ${
        large ? 'p-6 sm:p-7' : 'p-5'
      }`}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[11px] uppercase tracking-wider text-brand-green/90 border border-brand-green/30 rounded px-2 py-0.5">
          {t(lr, le, li, lt)}
        </span>
        <span className="text-[11px] text-brand-muted">
          {m.minutes} {t('мин', 'min', 'menit', 'นาที')}
        </span>
      </div>
      <h3
        className={`font-semibold group-hover:text-brand-green transition-colors ${
          large ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'
        }`}
      >
        {t(m.titleRu, m.titleEn, m.titleId, m.titleTh)}
      </h3>
      <p className={`text-brand-muted mt-2 ${large ? 'text-base' : 'text-sm'}`}>
        {t(m.gistRu, m.gistEn, m.gistId, m.gistTh)}
      </p>
    </a>
  );
};
