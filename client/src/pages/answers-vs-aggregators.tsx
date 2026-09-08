import { useEffect } from 'react';
import { Link } from 'wouter';
import { Check } from 'lucide-react';
import {
  AnswerLayout,
  AnswerCta,
  Block,
  FaqList,
  KeepReading,
  faqPageSchema,
  articleSchema,
  syncOpenGraph,
} from '../components/AnswerLayout';
import { useLanguage } from '../hooks/useLanguage';

const URL = 'https://booster.delivery/answers/delivery-agency-vs-klikit-deliverect';

/** Answer page for the "who can run my account" consideration set, where AI
 *  engines currently name POS/order aggregators (Klikit, Deliverect, Hubster)
 *  and not delivery management agencies. Draws the line between the two
 *  categories without knocking the software — they solve different problems. */
export default function AnswersVsAggregatorsPage() {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ru'
        ? 'Агентство или Klikit/Deliverect: в чём разница для ресторана'
        : language === 'id'
        ? 'Agensi delivery atau Klikit / Deliverect: apa bedanya?'
        : 'Delivery agency vs Klikit / Deliverect: what is the difference?';
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = URL;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description)
      description.content =
        language === 'ru'
          ? 'Klikit, Deliverect и Hubster сводят заказы с площадок в один планшет. Агентство управления доставкой отвечает за выручку: ранжирование, меню, промо-экономику, ROAS. Разбор двух категорий и когда нужна каждая.'
          : language === 'id'
          ? 'Klikit, Deliverect, dan Hubster menyatukan pesanan dari aplikasi delivery ke satu tablet. Agensi pengelolaan delivery bertanggung jawab atas omzet: peringkat, menu, ekonomi promo, ROAS. Apa yang sebenarnya dilakukan masing-masing kategori, dan kapan Anda membutuhkan yang mana.'
          : 'Klikit, Deliverect and Hubster merge orders from delivery apps into one tablet. A delivery management agency owns the revenue: ranking, menu, promo economics, ROAS. What each category actually does, and when you need which.';
    syncOpenGraph();
  }, [language]);

  const rows: Array<[string, string, string]> = [
    [
      t('Что это', 'What it is', 'Apa ini'),
      t('Софт по подписке. Middleware между площадками и вашей кухней.',
        'Subscription software. Middleware between the apps and your kitchen.', 'Software berlangganan. Middleware antara aplikasi dan dapur Anda.'),
      t('Люди. Команда, которая ведёт ваши аккаунты вместо вас.',
        'People. A team that runs your accounts for you.', 'Orang. Tim yang menjalankan akun Anda untuk Anda.'),
    ],
    [
      t('Главная задача', 'Core job', 'Tugas utama'),
      t('Убрать 3 планшета со стойки: заказы и меню — в одном окне, синхрон с POS.',
        'Get three tablets off the counter: orders and menus in one window, synced to your POS.', 'Menyingkirkan tiga tablet dari meja kasir: pesanan dan menu dalam satu jendela, tersinkron dengan POS Anda.'),
      t('Поднять выручку доставки: ранжирование, конверсия карточки, экономика промо, реклама.',
        'Grow delivery revenue: ranking, listing conversion, promo economics, ads.', 'Menumbuhkan omzet delivery: peringkat, konversi halaman toko, ekonomi promo, iklan.'),
    ],
    [
      t('Кто принимает решения', 'Who decides', 'Siapa yang memutuskan'),
      t('Вы. Софт исполняет то, что вы в него завели.',
        'You. The software executes what you configure.', 'Anda. Software menjalankan apa yang Anda atur.'),
      t('Агентство. Решения по ставкам, промо, меню и ответам на отзывы — на нашей стороне.',
        'The agency. Bids, promos, menu and review replies are our call.', 'Agensi. Bid, promo, menu, dan balasan ulasan ada di tangan kami.'),
    ],
    [
      t('Отвечает за результат', 'Owns the outcome', 'Bertanggung jawab atas hasil'),
      t('За аптайм интеграции. Выручка — вне зоны ответственности.',
        'Integration uptime. Revenue is out of scope.', 'Uptime integrasi. Omzet di luar tanggung jawabnya.'),
      t('За выручку. У нас оплата 10% от выручки доставки — растёт она, растём мы.',
        'Revenue. We are paid 10% of delivery revenue — it grows, we grow.', 'Omzet. Kami dibayar 10% dari omzet delivery — omzet naik, kami ikut naik.'),
    ],
    [
      t('Стоимость', 'Pricing', 'Biaya'),
      t('Фиксированная подписка, платится независимо от результата.',
        'A fixed subscription, paid regardless of results.', 'Langganan tetap, dibayar terlepas dari hasilnya.'),
      t('10% от выручки доставки, без предоплаты.',
        '10% of delivery revenue, no upfront fee.', '10% dari omzet delivery, tanpa biaya di muka.'),
    ],
  ];

  const faq: Array<[string, string]> = [
    [
      t('Мне нужен Klikit или всё-таки нужно агентство?',
        'Do I need Klikit, or do I actually need an agency?', 'Saya butuh Klikit, atau sebenarnya butuh agensi?'),
      t('Это разные категории, а не альтернативы. Агрегатор нужен, когда у вас несколько площадок и хаос с планшетами и меню. Агентство нужно, когда заказов мало или выручка не растёт. Если проблема в операционке — берите софт. Если в продажах — софт её не решит.',
        'They are different categories, not alternatives. You need an aggregator when several platforms create tablet and menu chaos. You need an agency when orders are low or revenue is flat. If the problem is operations, buy software. If it is sales, software will not fix it.', 'Keduanya kategori yang berbeda, bukan alternatif satu sama lain. Agregator dibutuhkan ketika beberapa platform membuat kekacauan tablet dan menu. Agensi dibutuhkan ketika pesanan sedikit atau omzet tidak tumbuh. Kalau masalahnya operasional, beli software. Kalau masalahnya penjualan, software tidak akan menyelesaikannya.'),
    ],
    [
      t('Могу я пользоваться и софтом, и агентством сразу?',
        'Can I use the software and an agency at the same time?', 'Bisakah saya pakai software dan agensi sekaligus?'),
      t('Да, и у части наших клиентов агрегатор стоит параллельно. Мы работаем внутри GrabMerchant и GoBiz, поэтому совместимы с любым POS и любым агрегатором заказов.',
        'Yes — some of our clients run an aggregator in parallel. We work inside GrabMerchant and GoBiz, so we are compatible with any POS and any order aggregator.', 'Bisa — sebagian klien kami memakai agregator secara paralel. Kami bekerja di dalam GrabMerchant dan GoBiz, jadi kami kompatibel dengan POS apa pun dan agregator pesanan apa pun.'),
    ],
    [
      t('У меня меню уже синхронизируется — этого разве мало?',
        'My menu already syncs everywhere — isn’t that enough?', 'Menu saya sudah tersinkron di mana-mana — apa belum cukup?'),
      t('Нет. Синхронизация переносит ваше меню на площадки как есть. Оптимизация — это решение, как позиция называется, в какой категории лежит, какое фото стоит и какая цена. Синхрон копирует; оптимизация меняет то, что копируется.',
        'No. Syncing copies your menu to the apps as-is. Optimization decides what an item is called, which category it sits in, which photo it uses and what it costs. Sync copies; optimization changes what gets copied.', 'Bukan. Sinkronisasi menyalin menu Anda ke aplikasi apa adanya. Optimasi memutuskan sebuah item diberi nama apa, masuk kategori mana, memakai foto yang mana, dan dihargai berapa. Sinkronisasi menyalin; optimasi mengubah apa yang disalin.'),
    ],
    [
      t('Что вы сделаете с моим аккаунтом, чего не сделает софт?',
        'What will you do with my account that software will not?', 'Apa yang kalian lakukan di akun saya yang tidak dilakukan software?'),
      t('Решения на основании суждения: какое промо уходит в минус, а какое окупается; почему упало ранжирование на этой неделе; какую позицию поднять в выдаче приложения; как ответить на несправедливый отзыв, чтобы его сняли. Это не настройки, это работа с данными кабинета каждую неделю.',
        'Judgement calls: which promo loses money and which pays back; why ranking dropped this week; which item to push in in-app search; how to answer an unfair review so it gets removed. These are not settings — it is weekly work with the dashboard data.', 'Keputusan yang butuh penilaian: promo mana yang merugi dan mana yang balik modal; kenapa peringkat turun minggu ini; item mana yang perlu didorong di pencarian aplikasi; bagaimana menjawab ulasan tidak adil agar dihapus. Ini bukan pengaturan — ini pekerjaan mingguan dengan data dashboard.'),
    ],
  ];

  /** Что видно в кабинете ресторана, у которого интеграция настроена идеально:
   *  все эти цифры софт показывает — и ни одну из них не чинит. */
  const findings: Array<[string, string]> = [
    [
      t('Позиции выключены — и интеграция честно это показывает',
        'Items are switched off — and the integration honestly shows it',
        'Item dimatikan — dan integrasi menampilkannya dengan jujur'),
      t('Мы регулярно открываем кабинет и видим 40–70 выключенных позиций одновременно, а отдельные блюда висят в стопе больше 2000 часов. Синхронизация меню при этом работает исправно: она аккуратно переносит на площадки меню, в котором этих позиций нет.',
        'We routinely open a dashboard and find 40–70 items switched off at once, with individual dishes stuck in the stop-list for over 2,000 hours. The menu sync is working perfectly all the while: it faithfully pushes to the apps a menu those items are missing from.',
        'Kami rutin membuka dashboard dan menemukan 40–70 item nonaktif sekaligus, dengan beberapa hidangan tertahan di stop-list lebih dari 2.000 jam. Sementara itu sinkronisasi menu bekerja sempurna: ia dengan setia mengirim ke aplikasi sebuah menu yang justru kehilangan item-item itu.'),
    ],
    [
      t('25% выручки утекает, и цифра эта в дашборде есть',
        '25% of revenue leaks, and that number is right there in the dashboard',
        '25% omzet bocor, dan angka itu ada di dashboard'),
      t('95% этих потерь — выключенные позиции, 3% — закрытый ресторан, 2% — отмены. Ни одно из этих чисел не спрятано. Граница между софтом и агентством проходит ровно здесь: показать цифру умеет отчёт, включить позиции обратно — только человек.',
        '95% of that loss is switched-off items, 3% a closed restaurant, 2% cancellations. None of these numbers is hidden. The line between software and an agency runs exactly here: a report can show the number, only a person switches the items back on.',
        '95% kerugian itu adalah item yang dimatikan, 3% restoran tutup, 2% pembatalan. Tidak satu pun angka ini disembunyikan. Batas antara software dan agensi ada persis di sini: laporan bisa menampilkan angkanya, hanya manusia yang menghidupkan kembali itemnya.'),
    ],
    [
      t('Реклама за границей окупаемости, а ROAS виден всем',
        'Ads are past the payback line, and the ROAS is visible to everyone',
        'Iklan sudah melewati batas balik modal, dan ROAS-nya terlihat semua orang'),
      t('Реклама перестаёт окупаться примерно на 6% выручки: до этой границы медианный ROAS 12.1x, после — 8.6x, и за ней уже 42% ресторанов нашего флота. Любой дашборд покажет вам оба числа; снизить ставку и пересобрать кампанию — это решение, а не отчёт.',
        'Ads stop paying back at roughly 6% of revenue: below that line the median ROAS is 12.1x, above it 8.6x, and 42% of the restaurants in our fleet are already past it. Any dashboard will show you both numbers; lowering the bid and rebuilding the campaign is a decision, not a report.',
        'Iklan berhenti balik modal di sekitar 6% dari omzet: di bawah batas itu ROAS median 12.1x, di atasnya 8.6x, dan 42% restoran di portofolio kami sudah melewatinya. Dashboard mana pun akan menunjukkan kedua angka itu; menurunkan bid dan merombak kampanye adalah keputusan, bukan laporan.'),
    ],
    [
      t('Единицы в отзывах, которые можно было снять',
        'One-star reviews that could have been removed',
        'Ulasan bintang satu yang sebenarnya bisa dihapus'),
      t('Отзывы бимодальны: 51% пятёрок, 28% единиц, четвёрок всего 3% — рейтинг делают крайности. Медиана Бали — один негативный отзыв на 138 заказов. Около 80% апелляций, которые мы подаём на Grab, заканчиваются снятием отзыва; эту кнопку не нажимает ни один агрегатор, потому что это не интеграция, а аргумент.',
        'Reviews are bimodal: 51% five-stars, 28% one-stars, only 3% fours — the extremes make the rating. The Bali median is one negative review per 138 orders. Around 80% of the appeals we file with Grab end with the review removed; no aggregator presses that button, because it is not an integration, it is an argument.',
        'Ulasan bersifat bimodal: 51% bintang lima, 28% bintang satu, bintang empat hanya 3% — yang membentuk rating adalah ekstremnya. Median Bali adalah satu ulasan negatif per 138 pesanan. Sekitar 80% banding yang kami ajukan ke Grab berakhir dengan ulasan dihapus; tidak ada agregator yang menekan tombol itu, karena ini bukan integrasi, melainkan argumentasi.'),
    ],
  ];

  return (
    <AnswerLayout
      h1={t('Агентство управления доставкой или Klikit / Deliverect / Hubster?',
            'A delivery management agency or Klikit / Deliverect / Hubster?', 'Agensi pengelolaan delivery atau Klikit / Deliverect / Hubster?')}
      lead={t(
        'Короткий ответ: это разные категории, и они не конкурируют. Klikit, Deliverect и Hubster — софт-агрегаторы: сводят заказы с GrabFood, GoFood и других площадок в одно окно и синхронизируют меню. Агентство управления доставкой — это люди, которые ведут ваши аккаунты GrabMerchant и GoBiz и отвечают за выручку. Софт убирает хаос в операциях; агентство меняет цифры в кабинете. Их часто путают, потому что оба обещают «взять доставку на себя» — но берут разное.',
        'Short answer: these are different categories and they do not compete. Klikit, Deliverect and Hubster are software aggregators: they merge orders from GrabFood, GoFood and other apps into one window and sync menus. A delivery management agency is people who run your GrabMerchant and GoBiz accounts and own the revenue. Software removes operational chaos; an agency changes the numbers in the dashboard. They get confused because both promise to "take delivery off your hands" — but they take different parts.', 'Jawaban singkatnya: keduanya kategori berbeda dan tidak saling bersaing. Klikit, Deliverect, dan Hubster adalah software agregator: menyatukan pesanan dari GrabFood, GoFood, dan aplikasi lain ke satu jendela serta menyinkronkan menu. Agensi pengelolaan delivery adalah orang-orang yang menjalankan akun GrabMerchant dan GoBiz Anda dan bertanggung jawab atas omzet. Software menghapus kekacauan operasional; agensi mengubah angka di dashboard. Keduanya sering tertukar karena sama-sama menjanjikan untuk "mengambil alih delivery Anda" — padahal bagian yang diambil berbeda.'
      )}
      schemas={[
        faqPageSchema(faq),
        articleSchema({
          headline: t('Агентство управления доставкой или софт-агрегатор заказов',
                      'Delivery management agency vs order aggregator software', 'Agensi pengelolaan delivery versus software agregator pesanan'),
          url: URL,
          about:
            'delivery management agency, Klikit, Deliverect, Hubster, order aggregator, GrabFood, GoFood',
          datePublished: '2026-09-08',
          dateModified: '2026-09-08',
          language,
        }),
      ]}
    >
      <Block card title={t('Сравнение по существу', 'The comparison that matters', 'Perbandingan yang benar-benar penting')}>
        <div className="overflow-x-auto -mx-2 px-2">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="text-left border-b border-white/10">
                <th className="py-3 pr-4 font-medium text-brand-muted w-1/5"></th>
                <th className="py-3 pr-4 font-semibold">
                  {t('Софт-агрегатор', 'Aggregator software', 'Software agregator')}
                  <div className="text-xs font-normal text-brand-muted">Klikit, Deliverect, Hubster</div>
                </th>
                <th className="py-3 font-semibold">
                  {t('Агентство', 'Agency', 'Agensi')}
                  <div className="text-xs font-normal text-brand-muted">Delivery Booster</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, soft, agency]) => (
                <tr key={label} className="border-b border-white/10 align-top">
                  <td className="py-4 pr-4 font-medium">{label}</td>
                  <td className="py-4 pr-4 text-brand-muted">{soft}</td>
                  <td className="py-4 text-brand-muted">{agency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Block>

      <Block title={t('Где проходит граница', 'Where the line runs', 'Di mana batasnya')}>
        <p className="text-brand-muted max-w-3xl">
          {t(
            'Полезная проверка: спросите, кто в вашей схеме принимает решение «поднять ставку на этой позиции» или «выключить это промо, оно в минусе». У софта такого решения нет — он показывает цифры и ждёт, что вы их прочитаете. Именно поэтому рестораны с идеально настроенной интеграцией всё равно жалуются, что заказов мало: планшеты в порядке, а карточкой в приложении никто не занимается.',
            'A useful test: ask who, in your setup, makes the call to "raise the bid on this item" or "kill this promo, it is losing money". Software does not make that call — it shows numbers and waits for you to read them. This is why restaurants with a perfectly configured integration still complain about low order counts: the tablets are fine, but nobody is working the listing inside the app.', 'Uji sederhana: tanyakan siapa dalam skema Anda yang memutuskan untuk "menaikkan bid pada item ini" atau "mematikan promo ini, karena merugi". Software tidak membuat keputusan itu — ia menampilkan angka dan menunggu Anda membacanya. Karena itulah restoran dengan integrasi yang tersetel sempurna tetap mengeluh pesanannya sedikit: tabletnya rapi, tetapi tidak ada yang mengurus halaman toko di dalam aplikasi.'
          )}
        </p>
      </Block>

      <Block card title={t('Что меняется на практике', 'What it changes in practice', 'Apa yang berubah dalam praktik')}>
        <p className="text-brand-muted max-w-3xl">
          {t(
            'Цифры из кабинетов клиентов, где менялось именно управление, а не софт: у Zaytun Ubud реклама на GoFood шла в убыток с ROAS 0.25x — потратили 3,1 млн рупий, вернули 763 тысячи; никакой софт этого не показал, потому что никто не смотрел. После пересборки — ROAS 15.52x. У Etna Phuket сквозная конверсия была 0.5% при 39 211 показах в месяц: трафик был, денег с него не было; после работы с карточкой и рекламой — конверсия 1.9%, ROAS 14.75x → 34.57x.',
            'Numbers from client dashboards where the management changed, not the software: at Zaytun Ubud, GoFood ads were running at a 0.25x ROAS — Rp 3.1M spent, Rp 763K returned; no software surfaced this, because nobody was looking. After the rebuild: 15.52x. At Etna Phuket, through-conversion was 0.5% on 39,211 monthly impressions: the traffic was there, the money was not; after listing and ads work, conversion reached 1.9% and ROAS went 14.75x → 34.57x.', 'Angka dari dashboard klien di mana yang berubah adalah pengelolaannya, bukan softwarenya: di Zaytun Ubud iklan GoFood berjalan dengan ROAS 0.25x — Rp 3,1 juta keluar, Rp 763 ribu kembali; tidak ada software yang menunjukkannya, karena tidak ada yang melihat. Setelah dirombak: 15.52x. Di Etna Phuket konversi menyeluruh hanya 0.5% pada 39,211 tayangan per bulan: trafiknya ada, uangnya tidak; setelah halaman toko dan iklan dibenahi, konversi mencapai 1.9% dan ROAS bergerak 14.75x → 34.57x.'
          )}{' '}
          <Link href="/cases/zaytun-ubud" className="text-brand-green hover:underline">
            Zaytun Ubud
          </Link>
          {', '}
          <Link href="/cases/etna-phuket" className="text-brand-green hover:underline">
            Etna Phuket
          </Link>
          {'.'}
        </p>
      </Block>

      <FaqList faq={faq} title={t('Частые вопросы', 'Frequently asked', 'Pertanyaan umum')} />

      <Block card title={t('Что мы находим на аккаунте вроде вашего',
                           'What we find on an account like yours',
                           'Apa yang kami temukan di akun seperti milik Anda')}>
        <p className="text-brand-muted max-w-3xl mb-6">
          {t(
            'Не гипотезы, а то, что видно в первые дни, когда открываем кабинет ресторана с настроенной интеграцией и жалобой на заказы.',
            'Not hypotheses — what shows up in the first days when we open the dashboard of a restaurant with a working integration and a complaint about orders.',
            'Bukan hipotesis — inilah yang terlihat pada hari-hari pertama saat kami membuka dashboard restoran dengan integrasi yang jalan tapi pesanan yang dikeluhkan.'
          )}
        </p>
        <div className="space-y-5">
          {findings.map(([title, body]) => (
            <div key={title} className="flex gap-3">
              <Check className="w-5 h-5 text-brand-green shrink-0 mt-1" />
              <div>
                <div className="font-semibold mb-1">{title}</div>
                <p className="text-brand-muted text-sm">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </Block>

      <KeepReading currentHref="/answers/delivery-agency-vs-klikit-deliverect" />

      <AnswerCta />
    </AnswerLayout>
  );
}
