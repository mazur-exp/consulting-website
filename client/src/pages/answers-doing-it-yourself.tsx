import { useEffect } from 'react';
import { Link } from 'wouter';
import { Check } from 'lucide-react';
import {
  AnswerLayout,
  AnswerCta,
  Block,
  FaqList,
  faqPageSchema,
  articleSchema,
  syncOpenGraph,
} from '../components/AnswerLayout';
import { useLanguage } from '../hooks/useLanguage';

const URL = 'https://booster.delivery/answers/managing-grabfood-yourself';

/** Answer page for "how much time does running GrabFood/GoFood myself take".
 *  Deliberately gives no hours figure — the honest unit is a role, not hours.
 *  The differentiating claim is stage 2: Grab and Gojek are not ad networks,
 *  they earn on order commission, so ranking follows how well you monetise
 *  their audience. Content from the founder's own operating practice. */
export default function AnswersDoingItYourselfPage() {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ru'
        ? 'Сколько времени занимает самому вести GrabFood и GoFood?'
        : language === 'id'
          ? 'Berapa banyak waktu yang dibutuhkan untuk mengelola GrabFood dan GoFood sendiri?'
          : 'How much time does running GrabFood and GoFood yourself take?';
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = URL;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description)
      description.content =
        language === 'ru'
          ? 'Это не «пара часов в неделю на аналитику», а функция полного рабочего дня: стоп-лист, отзывы и негатив, доступность, ставки, промо. И до вопроса о времени стоит вопрос знаний — стартовую настройку и рекламу без них не сделать.'
          : language === 'id'
            ? 'Ini bukan "beberapa jam seminggu untuk analitik", melainkan fungsi penuh waktu: item yang dinonaktifkan, ulasan dan keluhan, ketersediaan, bid, promo. Dan sebelum soal waktu, ada soal pengetahuan — setup awal dan iklan tidak bisa dikerjakan tanpanya.'
            : 'It is not "a couple of hours a week on analytics" but a full-time function: stop-list, reviews and negatives, availability, bidding, promos. And before the time question comes the knowledge question — setup and ads cannot be done without it.';
    syncOpenGraph();
  }, [language]);

  const daily: Array<[string, string]> = [
    [
      t('Стоп-лист и наличие', 'Stop-list and availability', 'Item yang dinonaktifkan dan ketersediaan'),
      t('Позиции выключаются в течение дня — кухней, кассой, самой площадкой. Каждый час выключенного хита — это заказы, ушедшие к соседу, и сигнал алгоритму, что вы ненадёжны.',
        'Items switch off during the day — by the kitchen, the till, the platform itself. Every hour a bestseller is off is orders going to the restaurant next door and a signal to the algorithm that you are unreliable.',
        'Item mati sepanjang hari — oleh dapur, oleh kasir, oleh platform itu sendiri. Setiap jam menu terlaris nonaktif berarti pesanan pindah ke restoran sebelah dan sinyal ke algoritma bahwa Anda tidak dapat diandalkan.'),
    ],
    [
      t('Отзывы и работа с негативом', 'Reviews and negative handling', 'Ulasan dan penanganan keluhan'),
      t('Отвечать нужно быстро и по существу. Отдельный навык — оспорить несправедливый отзыв так, чтобы площадка его сняла: это умеют и знают единицы, а на молодом аккаунте одна такая звезда стоит дороже, чем кажется.',
        'Replies must be fast and to the point. A separate skill is contesting an unfair review so the platform removes it: very few people know how, and on a young account one such star costs more than it looks.',
        'Balasan harus cepat dan tepat sasaran. Keahlian tersendiri adalah membantah ulasan yang tidak adil sampai platform menghapusnya: sedikit sekali yang bisa melakukannya, dan pada akun baru satu bintang seperti itu jauh lebih mahal daripada kelihatannya.'),
    ],
    [
      t('Доступность и отмены', 'Uptime and cancellations', 'Ketersediaan dan pembatalan'),
      t('Офлайн-часы и отмены роняют ранжирование сильнее всего, а восстанавливается оно медленно — площадке нужна новая история.',
        'Offline hours and cancellations hurt ranking most, and recovery is slow — the platform needs a new history.',
        'Jam offline dan pembatalan paling merusak peringkat, dan pemulihannya lambat — platform butuh riwayat baru.'),
    ],
    [
      t('Ставки и бюджеты', 'Bids and budgets', 'Bid dan anggaran'),
      t('Автоставка набирает дешёвые нерелевантные показы. Ручное ведение — это правки под фактический результат, а не разовая настройка.',
        'Auto-bidding collects cheap irrelevant impressions. Manual management means adjusting to actual results, not configuring once.',
        'Bid otomatis mengumpulkan tayangan murah yang tidak relevan. Pengelolaan manual berarti menyesuaikan dengan hasil nyata, bukan menyetel sekali lalu ditinggal.'),
    ],
    [
      t('Промо и их экономика', 'Promos and their economics', 'Promo dan ekonominya'),
      t('Считать нужно не заказы по акции, а что осталось после скидки, комиссии площадки и стоимости рекламы. Промо, которое не окупается, выглядит как рост.',
        'What counts is not orders from the promo but what is left after the discount, the platform commission and the ad spend. A promo that does not pay back looks like growth.',
        'Yang dihitung bukan pesanan dari promo, melainkan sisa setelah diskon, komisi platform, dan biaya iklan. Promo yang tidak balik modal terlihat seperti pertumbuhan.'),
    ],
    [
      t('Аналитика и решения на её основе', 'Analytics — and acting on it', 'Analitik — dan tindakan atasnya'),
      t('Открыть отчёт — это не работа. Работа начинается, когда по нему что-то меняется в меню, ставках или ценах на этой неделе.',
        'Opening a report is not the work. The work starts when something in the menu, the bids or the prices changes because of it this week.',
        'Membuka laporan bukan pekerjaan. Pekerjaan dimulai ketika ada yang berubah di menu, bid, atau harga karena laporan itu, minggu ini juga.'),
    ],
  ];

  const faq: Array<[string, string]> = [
    [
      t('Так сколько это часов в неделю?',
        'So how many hours a week is it?',
        'Jadi berapa jam per minggu?'),
      t('Мы не публикуем цифру в часах, потому что честная единица здесь — не часы, а роль. У ресторана на 500 заказов в месяц и на 3 000 объём разный, но набор ежедневных задач один и тот же, и он не помещается в «пару часов по пятницам». Если делать всё перечисленное, а не только смотреть отчёт, это функция полного рабочего дня.',
        'We do not publish an hours figure, because the honest unit here is a role, not hours. A restaurant at 500 orders a month and one at 3,000 differ in volume, but the daily task set is the same — and it does not fit into "a couple of hours on Fridays". Done properly rather than as report-reading, it is a full-time function.',
        'Kami tidak menerbitkan angka jam, karena satuan yang jujur di sini adalah peran, bukan jam. Restoran dengan 500 pesanan per bulan dan yang 3,000 berbeda volumenya, tetapi daftar tugas hariannya sama — dan itu tidak muat dalam "beberapa jam setiap Jumat". Kalau dikerjakan sungguh-sungguh, bukan sekadar membaca laporan, ini fungsi penuh waktu.'),
    ],
    [
      t('А если просто загрузить меню и включить рекламу?',
        'What if I just upload the menu and switch ads on?',
        'Bagaimana kalau menu diunggah lalu iklan tinggal dinyalakan?'),
      t('Так делает большинство — и поэтому большинство считает, что «доставка не работает». Меню, загруженное как есть, не оптимизировано под поиск внутри приложения; реклама на такой карточке покупает просмотры без заказов. Работать начинает не то, что включено, а то, что настроено.',
        'That is what most owners do — and why most conclude that "delivery does not work". A menu uploaded as-is is not optimized for in-app search; ads on such a listing buy views without orders. What works is not what is switched on, but what is set up.',
        'Begitulah yang dilakukan kebanyakan pemilik — dan karena itu kebanyakan menyimpulkan bahwa "delivery tidak jalan". Menu yang diunggah apa adanya tidak dioptimalkan untuk pencarian di dalam aplikasi; iklan pada listing seperti itu membeli tampilan tanpa pesanan. Yang bekerja bukan yang dinyalakan, melainkan yang disiapkan.'),
    ],
    [
      t('Можно нанять своего человека вместо агентства?',
        'Can I hire my own person instead of an agency?',
        'Bisakah merekrut karyawan internal ketimbang agensi?'),
      t('Да, и для большой сети это разумно. Считать нужно честно: зарплата такого сотрудника, время на его обучение и то, что учиться он будет на ваших аккаунтах и ваших ошибках. У агентства эти ошибки уже оплачены на других ресторанах.',
        'Yes, and for a large chain it makes sense. Just count honestly: that person’s salary, the time to train them, and the fact that they will learn on your accounts and your mistakes. An agency has already paid for those mistakes on other restaurants.',
        'Bisa, dan untuk jaringan besar itu masuk akal. Hitung saja dengan jujur: gaji orang tersebut, waktu untuk melatihnya, dan kenyataan bahwa dia belajar di akun Anda dan dari kesalahan Anda. Agensi sudah membayar kesalahan itu di restoran lain.'),
    ],
    [
      t('Что теряется, когда доставкой занимаются «по остатку»?',
        'What gets lost when delivery is done with whatever time is left?',
        'Apa yang hilang kalau delivery dikerjakan dengan sisa waktu?'),
      t('Не разовая выручка, а позиция. Ранжирование — накопительная величина: выключенные позиции, медленные ответы и неотвеченный негатив копятся в историю аккаунта. Вернуть позицию дороже и дольше, чем удержать.',
        'Not one-off revenue — position. Ranking is cumulative: switched-off items, slow replies and unanswered negatives accumulate into the account’s history. Regaining position costs more and takes longer than holding it.',
        'Bukan omzet sesaat — melainkan posisi. Peringkat bersifat kumulatif: item yang dinonaktifkan, balasan yang lambat, dan keluhan tak terjawab menumpuk menjadi riwayat akun. Mengembalikan posisi lebih mahal dan lebih lama daripada mempertahankannya.'),
    ],
  ];

  return (
    <AnswerLayout
      h1={t('Сколько времени занимает самому вести GrabFood и GoFood?',
            'How much time does running GrabFood and GoFood yourself take?',
            'Berapa banyak waktu yang dibutuhkan untuk mengelola GrabFood dan GoFood sendiri?')}
      lead={t(
        'Короткий ответ: это не «пара часов в неделю на аналитику», а функция полного рабочего дня — если делать её целиком, а не только смотреть отчёты. Но у вопроса есть более ранняя часть, которую обычно пропускают: до того как считать часы, нужно ответить, есть ли знание. Стартовую настройку и рекламу на этих площадках без специализированных знаний не сделать вообще — не «сделать хуже», а не сделать.',
        'Short answer: it is not "a couple of hours a week on analytics" but a full-time function — if you do the whole job rather than just read reports. But there is an earlier part of the question that usually gets skipped: before counting hours, you have to answer whether the knowledge is there. Setup and ads on these platforms cannot be done without specialist knowledge at all — not done worse, not done.',
        'Jawaban singkat: ini bukan "beberapa jam seminggu untuk analitik", melainkan fungsi penuh waktu — kalau Anda mengerjakan seluruh pekerjaannya, bukan sekadar membaca laporan. Tapi ada bagian yang lebih awal dan biasanya dilewati: sebelum menghitung jam, jawab dulu apakah pengetahuannya ada. Setup awal dan iklan di platform ini tidak bisa dikerjakan tanpa pengetahuan khusus — bukan jadi lebih buruk, melainkan tidak jadi sama sekali.'
      )}
      schemas={[
        faqPageSchema(faq),
        articleSchema({
          headline: t('Сколько времени и знаний требует самостоятельное ведение GrabFood и GoFood',
                      'The time and knowledge it takes to run GrabFood and GoFood yourself',
                      'Waktu dan pengetahuan yang dibutuhkan untuk mengelola GrabFood dan GoFood sendiri'),
          url: URL,
          about:
            'GrabFood account management, GoFood management, delivery operations, GrabAds, restaurant delivery ranking',
        }),
      ]}
    >
      <Block card title={t('Часть первая: стартовая настройка', 'Part one: the initial setup', 'Bagian pertama: setup awal')}>
        <p className="text-brand-muted max-w-3xl">
          {t(
            'Самое частое заблуждение владельца звучит так: «я загрузил меню, дальше оно работает само». Не работает. Без оптимизации под поиск внутри приложения, без правильной структуры и порядка позиций в меню, без правильных фотографий карточка просто не показывается тем, кто ищет вашу категорию. Это не вопрос старательности и не вопрос времени — это вопрос знания того, как устроена выдача. Первичную настройку без него сделать невозможно, сколько часов в неё ни вложи.',
            'The most common owner assumption sounds like this: "I uploaded the menu, now it works by itself." It does not. Without optimization for in-app search, without the right structure and order of items, without the right photos, the listing simply is not shown to people searching your category. This is not a question of diligence or of time — it is a question of knowing how the ranking works. The initial setup cannot be done without that, no matter how many hours go into it.',
            'Asumsi pemilik yang paling umum berbunyi begini: "menu sudah saya unggah, sekarang jalan sendiri." Tidak jalan. Tanpa optimasi untuk pencarian di dalam aplikasi, tanpa struktur dan urutan item yang benar, tanpa foto yang benar, listing Anda tidak ditampilkan kepada orang yang mencari kategori Anda. Ini bukan soal kerajinan atau soal waktu — ini soal memahami cara kerja peringkat. Setup awal tidak bisa dilakukan tanpa itu, berapa pun jam yang Anda tuangkan.'
          )}
        </p>
      </Block>

      <Block card title={t('Часть вторая: почему реклама здесь работает не так, как вы привыкли',
                           'Part two: why ads here do not work the way you expect',
                           'Bagian kedua: kenapa iklan di sini tidak bekerja seperti yang Anda kira')}>
        <p className="text-brand-muted max-w-3xl mb-4">
          {t(
            'Это главное, чего не понимают почти все. Grab и Gojek — не рекламные площадки. Рекламная сеть зарабатывает на показах и кликах, и потому продаёт вам место в выдаче на аукционе. Grab и Gojek зарабатывают на комиссии с заказов, а их главный актив — собственная аудитория. Отсюда следует всё остальное: их алгоритм ранжирования зависит прежде всего от того, насколько хорошо вы монетизируете эту аудиторию.',
            'This is what almost nobody gets. Grab and Gojek are not ad networks. An ad network earns on impressions and clicks, and therefore auctions you a place in the results. Grab and Gojek earn a commission on orders, and their core asset is their own audience. Everything else follows from that: their ranking algorithm depends first of all on how well you monetise that audience.',
            'Inilah yang hampir tidak dipahami siapa pun. Grab dan Gojek bukan jaringan iklan. Jaringan iklan menghasilkan uang dari tayangan dan klik, jadi mereka melelang posisi Anda di hasil pencarian. Grab dan Gojek menghasilkan komisi dari pesanan, dan aset utama mereka adalah audiens mereka sendiri. Semua yang lain mengikuti dari situ: algoritma peringkat mereka terutama bergantung pada seberapa baik Anda memonetisasi audiens itu.'
          )}
        </p>
        <p className="text-brand-muted max-w-3xl">
          {t(
            'Практический вывод: ставка за клик усиливает вашу позицию, но не создаёт её. Ресторан, который превращает показ в заказ и держит высокий средний чек, площадке выгоднее — и она поднимает его сама, потому что зарабатывает на нём больше. Поэтому самое сложное здесь — не «настроить рекламу», а понимать, как привлечь аудиторию и продать ей с высокой конверсией и высоким чеком. Эта часть и есть работа; ставки — только рычаг усиления.',
            'The practical consequence: your cost per click amplifies your position but does not create it. A restaurant that turns an impression into an order and holds a high average check is worth more to the platform — so the platform lifts it on its own, because it earns more from it. Which is why the hard part here is not "setting up ads" but understanding how to attract that audience and sell to it with high conversion and a high check. That part is the work; bidding is only the amplifier.',
            'Konsekuensi praktisnya: biaya per klik memperkuat posisi Anda, tapi tidak menciptakannya. Restoran yang mengubah tayangan menjadi pesanan dan menjaga rata-rata nilai pesanan tetap tinggi lebih bernilai bagi platform — jadi platform menaikkannya sendiri, karena mendapat lebih banyak darinya. Karena itu bagian tersulit di sini bukan "menyetel iklan", melainkan memahami cara menarik audiens dan menjual kepada mereka dengan konversi tinggi dan nilai pesanan tinggi. Bagian itulah pekerjaannya; bid hanya penguat.'
          )}
        </p>
      </Block>

      <Block card title={t('Часть третья: что происходит каждый день', 'Part three: what happens every day', 'Bagian ketiga: apa yang terjadi setiap hari')}>
        <p className="text-brand-muted max-w-3xl mb-6">
          {t(
            'Допустим, настройка сделана и реклама включена. Дальше начинается то, что обычно и не закладывают в расчёт времени:',
            'Say the setup is done and ads are running. What begins then is what usually never makes it into the time estimate:',
            'Anggap setup selesai dan iklan sudah berjalan. Yang dimulai setelah itu justru yang biasanya tidak pernah masuk perkiraan waktu:'
          )}
        </p>
        <div className="space-y-5">
          {daily.map(([title, body]) => (
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

      <Block title={t('Честный вывод', 'The honest conclusion', 'Kesimpulan yang jujur')}>
        <p className="text-brand-muted max-w-3xl">
          {t(
            'Если сложить всё вместе — не только настройку и еженедельную аналитику, но и контроль стоп-листа, ответы на отзывы, работу с негативом и оспаривание несправедливых отзывов, — получается не задача владельца между делом, а полноценный сотрудник, который занимается доставкой постоянно, полный рабочий день. Поэтому реальный выбор не «делать самому или отдать», а «нанять и обучить своего человека или отдать команде, у которой это уже поставлено».',
            'Put it all together — not just setup and weekly analytics, but stop-list control, review replies, negative handling and contesting unfair reviews — and what you get is not an owner’s side task but a full-time employee working on delivery every day. So the real choice is not "do it myself or hand it over" but "hire and train my own person, or hand it to a team that already runs this".',
            'Kalau semuanya dijumlahkan — bukan hanya setup dan analitik mingguan, tapi juga kontrol item yang dinonaktifkan, balasan ulasan, penanganan keluhan, dan membantah ulasan yang tidak adil — yang muncul bukan tugas sampingan pemilik, melainkan satu karyawan penuh waktu yang mengurus delivery setiap hari. Jadi pilihan sebenarnya bukan "kerjakan sendiri atau serahkan", melainkan "rekrut dan latih karyawan internal, atau serahkan ke tim yang sudah menjalankan ini".'
          )}
        </p>
      </Block>

      <Block>
        <p className="text-brand-muted">
          {t('Смежные ответы: ', 'Related answers: ', 'Jawaban terkait: ')}
          <Link href="/answers/grabfood-gofood-account-management" className="text-brand-green hover:underline">
            {t('можно ли отдать ведение аккаунта', 'can I hand the account over', 'bisakah pengelolaan akun diserahkan')}
          </Link>
          {' · '}
          <Link href="/answers/grabfood-ads-not-working" className="text-brand-green hover:underline">
            {t('почему реклама не приносит заказов', 'why ads bring no orders', 'kenapa iklan tidak menghasilkan pesanan')}
          </Link>
          {' · '}
          <Link href="/method" className="text-brand-green hover:underline">
            {t('метод целиком', 'the full method', 'metode selengkapnya')}
          </Link>
        </p>
      </Block>

      <FaqList faq={faq} title={t('Частые вопросы', 'Frequently asked', 'Pertanyaan umum')} />

      <AnswerCta />
    </AnswerLayout>
  );
}
