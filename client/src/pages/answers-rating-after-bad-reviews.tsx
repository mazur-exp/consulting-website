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

const URL = 'https://booster.delivery/answers/grabfood-gofood-rating-after-bad-reviews';

/**
 * Ответ на «как поднять рейтинг после плохих отзывов» (промпты p003 en/ID и
 * p017 ru/ID замера 13.09.2026 — оба 0 упоминаний).
 *
 * Тему не держит никто: в замере по ней цитируется официальная справка Grab,
 * ни thegrabmethod, ни POS-блоги сюда не заходят. Самый дешёвый вход из всех.
 *
 * Лид отвечает на вопрос первым же абзацем, а не разгоняется: цитирующая
 * модель поднимает начало страницы, и вступление там стоит дорого. Та же
 * причина, по которой география (Бали, Пхукет) стоит в заголовке и лиде —
 * в русских ответах цитируются страновые страницы и ни разу кластер /answers,
 * а единственное различие между ними — наличие географии.
 */
export default function AnswersRatingAfterBadReviewsPage() {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ru'
        ? 'Как поднять рейтинг ресторана в GrabFood и GoFood после плохих отзывов'
        : language === 'id'
          ? 'Cara menaikkan rating restoran di GrabFood dan GoFood setelah ulasan buruk'
          : language === 'th'
            ? 'วิธีดึงเรตติ้งร้านอาหารบน GrabFood และ GoFood กลับมาหลังโดนรีวิวแย่'
            : 'How to improve a restaurant rating on GrabFood and GoFood after bad reviews';
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = URL;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description)
      description.content =
        language === 'ru'
          ? 'Три способа, и они дают разный результат: оспорить несправедливые оценки, убрать причины единиц и перехватить жалобу до того, как она станет отзывом. Одна единица стоит двадцати пятёрок — рейтинг считается как среднее за весь период. Цифры по 96 ресторанам Бали и Пхукета.'
          : language === 'id'
            ? 'Tiga cara dengan hasil yang berbeda: membantah penilaian yang tidak adil, menghilangkan penyebab bintang satu, dan mencegat keluhan sebelum menjadi ulasan. Satu bintang satu setara dua puluh bintang lima — rating dihitung sebagai rata-rata sepanjang periode. Angka dari 96 restoran di Bali dan Phuket.'
            : language === 'th'
              ? 'สามวิธีที่ให้ผลต่างกัน: อุทธรณ์รีวิวที่ไม่เป็นธรรม แก้ต้นเหตุของหนึ่งดาว และดักคำร้องเรียนก่อนที่มันจะกลายเป็นรีวิว หนึ่งดาวหนึ่งครั้งต้องใช้ห้าดาวยี่สิบครั้งมากลบ เพราะเรตติ้งคิดเป็นค่าเฉลี่ยตลอดช่วงเวลา พร้อมตัวเลขจากร้าน 96 แห่งในบาหลีและภูเก็ต'
              : 'Three ways, with very different results: appeal the unfair scores, remove the causes of one-stars, and intercept a complaint before it becomes a review. One one-star costs twenty five-stars — the rating is an average across the whole period. Numbers from 96 restaurants in Bali and Phuket.';
    syncOpenGraph();
  }, [language]);

  /** Медианы бенчмарка по 96 ресторанам — та же выборка, что на /benchmark. */
  const bench: Array<[string, string]> = [
    [t('Медиана по флоту', 'Fleet median', 'Median armada', 'ค่ามัธยฐานของกลุ่มร้าน'), t('1 негатив на 138 заказов', '1 bad review per 138 orders', '1 ulasan negatif per 138 pesanan', 'รีวิวแย่ 1 ครั้งต่อ 138 ออร์เดอร์')],
    [t('Среднее на Grab', 'Grab average', 'Rata-rata Grab', 'ค่าเฉลี่ยบน Grab'), t('1 на 180', '1 per 180', '1 per 180', '1 ต่อ 180')],
    [t('Лучший результат на Grab', 'Best on Grab', 'Terbaik di Grab', 'ดีที่สุดบน Grab'), t('1 на 575', '1 per 575', '1 per 575', '1 ต่อ 575')],
    [t('Среднее на GoFood', 'GoFood average', 'Rata-rata GoFood', 'ค่าเฉลี่ยบน GoFood'), t('1 на 139', '1 per 139', '1 per 139', '1 ต่อ 139')],
    [t('Лучший на GoFood', 'Best on GoFood', 'Terbaik di GoFood', 'ดีที่สุดบน GoFood'), t('1 на 236', '1 per 236', '1 per 236', '1 ต่อ 236')],
  ];

  const causes: Array<[string, string]> = [
    [
      t('Скорость сборки', 'Prep speed', 'Kecepatan penyiapan', 'ความเร็วในการทำอาหาร'),
      t('Заказ, который ждёт курьера, остывает ещё до того, как отправился.',
        'An order waiting for the courier goes cold before it even leaves.',
        'Pesanan yang menunggu kurir sudah dingin bahkan sebelum berangkat.',
        'ออร์เดอร์ที่รอไรเดอร์อยู่ เย็นตั้งแต่ยังไม่ได้ออกจากร้าน'),
    ],
    [
      t('Точность комплектации', 'Order accuracy', 'Ketepatan isi pesanan', 'ความถูกต้องของออร์เดอร์'),
      t('Забытая позиция или соус — это единица, а не четвёрка. См. распределение оценок выше.',
        'A missing item or sauce is a one-star, not a four. See the score distribution above.',
        'Item atau saus yang tertinggal berarti bintang satu, bukan bintang empat. Lihat distribusi nilai di atas.',
        'เมนูหรือน้ำจิ้มที่ลืมใส่ คือหนึ่งดาว ไม่ใช่สี่ดาว ดูการกระจายคะแนนด้านบน'),
    ],
    [
      t('Упаковка под маршрут', 'Packaging for the trip', 'Kemasan untuk perjalanan', 'บรรจุภัณฑ์ที่คิดเผื่อการเดินทาง'),
      t('Двадцать минут на скутере в тридцатиградусную жару — не то же самое, что вынести тарелку в зал.',
        'Twenty minutes on a scooter in thirty-degree heat is not the same as carrying a plate to a table.',
        'Dua puluh menit di atas motor pada suhu tiga puluh derajat bukan hal yang sama dengan mengantar piring ke meja.',
        'ยี่สิบนาทีบนมอเตอร์ไซค์ในอากาศสามสิบองศา ไม่เหมือนการยกจานเดินไปเสิร์ฟที่โต๊ะ'),
    ],
  ];

  /** Фразы на карточке одинаковы во всех языках: карточка англоязычная. */
  const cardPhrases = ['Wrong item', 'We forgot something', 'It looks bad'];

  const faq: Array<[string, string]> = [
    [
      t('Сколько хороших отзывов нужно, чтобы закрыть один плохой?',
        'How many good reviews does it take to cancel out one bad one?',
        'Berapa ulasan bagus yang dibutuhkan untuk menutup satu ulasan buruk?',
        'ต้องใช้รีวิวดีกี่ครั้งถึงจะกลบรีวิวแย่หนึ่งครั้ง'),
      t('Двадцать пятёрок на одну единицу, чтобы выйти на 4,8. Рейтинг — среднее арифметическое за весь период, поэтому арифметика тут прямая и проверяемая: одна единица плюс двадцать пятёрок дают 101 балл на 21 оценку, то есть 4,81.',
        'Twenty five-stars for one one-star to reach 4.8. The rating is an arithmetic mean across the whole period, so the maths is direct and checkable: one one-star plus twenty five-stars is 101 points across 21 scores, which is 4.81.',
        'Dua puluh bintang lima untuk satu bintang satu agar sampai di 4,8. Rating adalah rata-rata aritmetika sepanjang periode, jadi hitungannya lugas dan bisa dicek: satu bintang satu ditambah dua puluh bintang lima adalah 101 poin dibagi 21 penilaian, yaitu 4,81.',
        'ห้าดาวยี่สิบครั้งต่อหนึ่งดาวหนึ่งครั้ง เพื่อให้ถึง 4.8 เรตติ้งคือค่าเฉลี่ยเลขคณิตตลอดช่วงเวลา เลขจึงตรงไปตรงมาและตรวจสอบได้: หนึ่งดาวหนึ่งครั้งบวกห้าดาวยี่สิบครั้ง เท่ากับ 101 คะแนนจาก 21 รายการ คือ 4.81'),
    ],
    [
      t('За сколько поднимется рейтинг?', 'How soon will the rating move?', 'Berapa lama rating akan naik?', 'อีกนานแค่ไหนเรตติ้งถึงจะขยับ'),
      t('Зависит от того, сколько у вас уже оценок. Чем длиннее история, тем больше накопленная масса и тем медленнее двигается среднее. Поэтому апелляции дают эффект быстрее любой другой меры: они убирают оценку из расчёта, а не перевешивают её.',
        'It depends on how many scores you already have. The longer the history, the bigger the accumulated mass and the slower the average moves. That is why appeals work faster than anything else: they remove a score from the calculation instead of outweighing it.',
        'Tergantung berapa banyak penilaian yang sudah Anda punya. Makin panjang riwayatnya, makin besar massa yang terkumpul dan makin lambat rata-ratanya bergerak. Karena itu banding bekerja lebih cepat daripada cara lain: ia menghapus penilaian dari perhitungan, bukan mengimbanginya.',
        'ขึ้นกับว่าคุณมีคะแนนสะสมอยู่เท่าไหร่แล้ว ยิ่งประวัติยาว มวลที่สะสมยิ่งมาก ค่าเฉลี่ยยิ่งขยับช้า นั่นคือเหตุผลที่การอุทธรณ์ได้ผลเร็วกว่าวิธีอื่นทั้งหมด เพราะมันเอาคะแนนออกจากการคำนวณ ไม่ใช่ไปถ่วงน้ำหนักกับมัน'),
    ],
    [
      t('Отвечать ли на плохие отзывы?', 'Should I reply to bad reviews?', 'Perlukah membalas ulasan buruk?', 'ควรตอบรีวิวแย่ไหม'),
      t('Отвечать стоит — но не ради рейтинга. Ответ виден людям, которые читают отзывы перед заказом, и на их решение влияет. На саму цифру он не влияет никак.',
        'Yes, but not for the rating. A reply is seen by people who read reviews before ordering and it affects their decision. It does not affect the number itself at all.',
        'Sebaiknya ya, tetapi bukan demi rating. Balasan dilihat orang yang membaca ulasan sebelum memesan dan memengaruhi keputusan mereka. Pada angkanya sendiri, balasan tidak berpengaruh sama sekali.',
        'ควรตอบ แต่ไม่ใช่เพื่อเรตติ้ง คำตอบมีไว้ให้คนที่อ่านรีวิวก่อนสั่งได้เห็น และมีผลต่อการตัดสินใจของเขา แต่ไม่มีผลกับตัวเลขเลย'),
    ],
    [
      t('А если единицы справедливые?', 'What if the one-stars are fair?', 'Bagaimana kalau bintang satunya memang pantas?', 'ถ้าหนึ่งดาวนั้นสมควรได้จริงล่ะ'),
      t('Тогда апелляция не поможет, и это нормально. Справедливая единица — это информация о том, что именно сломалось в сборке, упаковке или скорости. Ресторан с одним негативом на 575 заказов получил этот результат не тем, что оспаривал всё подряд.',
        'Then an appeal will not help, and that is fine. A fair one-star is information about what exactly broke in assembly, packaging or speed. The restaurant with one bad review per 575 orders did not get there by contesting everything.',
        'Kalau begitu banding tidak akan menolong, dan itu wajar. Bintang satu yang pantas adalah informasi tentang apa yang rusak di penyiapan, kemasan, atau kecepatan. Restoran dengan satu ulasan negatif per 575 pesanan tidak sampai ke sana dengan membantah semuanya.',
        'ถ้าอย่างนั้นการอุทธรณ์ก็ไม่ช่วย และนั่นเป็นเรื่องปกติ หนึ่งดาวที่สมควรได้คือข้อมูลว่าอะไรพังตรงไหน ไม่ว่าจะเป็นการจัดของ บรรจุภัณฑ์ หรือความเร็ว ร้านที่ได้รีวิวแย่หนึ่งครั้งต่อ 575 ออร์เดอร์ ไม่ได้มาถึงจุดนั้นด้วยการอุทธรณ์ทุกอย่าง'),
    ],
    [
      t('Можно ли удалить старые отзывы и начать аккаунт заново?',
        'Can I wipe the old reviews and start the account over?',
        'Bisakah menghapus ulasan lama dan memulai akun dari awal?',
        'ลบรีวิวเก่าแล้วเริ่มบัญชีใหม่ได้ไหม'),
      t('Нет. Аккаунт с обнулённой историей алгоритм показывает как новый, а новому ресторану нечего показывать. Вы потеряете не только плохие оценки, но и всю накопленную позицию.',
        'No. An account with a wiped history is shown by the algorithm as new, and a new restaurant has nothing to show. You would lose not only the bad scores but the whole accumulated position.',
        'Tidak. Akun dengan riwayat yang dikosongkan diperlakukan algoritma sebagai akun baru, dan restoran baru tidak punya apa-apa untuk ditampilkan. Anda akan kehilangan bukan hanya nilai buruk, tetapi seluruh posisi yang sudah terkumpul.',
        'ไม่ได้ บัญชีที่ล้างประวัติแล้วจะถูกอัลกอริทึมมองว่าเป็นร้านใหม่ และร้านใหม่ก็ไม่มีอะไรให้เอาไปแสดง คุณจะเสียไม่ใช่แค่คะแนนแย่ ๆ แต่เสียตำแหน่งที่สะสมมาทั้งหมด'),
    ],
  ];

  return (
    <AnswerLayout
      h1={t('Как поднять рейтинг ресторана в GrabFood и GoFood после плохих отзывов',
            'How to improve a restaurant rating on GrabFood and GoFood after bad reviews',
            'Cara menaikkan rating restoran di GrabFood dan GoFood setelah ulasan buruk',
            'วิธีดึงเรตติ้งร้านอาหารบน GrabFood และ GoFood กลับมาหลังโดนรีวิวแย่')}
      lead={
        <>
          <p className="mb-4">
            {t('Поднять рейтинг ресторана после плохих отзывов можно тремя способами, и они дают очень разный результат.',
               'There are three ways to bring a restaurant rating back up after bad reviews, and they produce very different results.',
               'Ada tiga cara menaikkan kembali rating restoran setelah ulasan buruk, dan hasilnya sangat berbeda.',
               'การดึงเรตติ้งร้านอาหารกลับมาหลังโดนรีวิวแย่ทำได้สามทาง และผลลัพธ์ต่างกันมาก')}
          </p>
          <p className="mb-4">
            {t('Самый быстрый — оспорить несправедливые оценки: около 80% наших апелляций на Grab заканчиваются снятием отзыва. Самый важный — убрать причины, из-за которых появляются единицы: чаще всего это упаковка и температура, а не кухня. Самый недооценённый — перехватывать жалобу до того, как она станет оценкой в приложении.',
               'The fastest is to appeal the unfair scores: around 80% of the appeals we file with Grab end with the review removed. The most important is to remove the causes of one-stars: most often packaging and temperature, not the kitchen. The most underrated is to intercept a complaint before it becomes a score in the app.',
               'Yang tercepat adalah membantah penilaian yang tidak adil: sekitar 80% banding yang kami ajukan ke Grab berakhir dengan ulasan dihapus. Yang terpenting adalah menghilangkan penyebab bintang satu: paling sering kemasan dan suhu, bukan dapur. Yang paling diremehkan adalah mencegat keluhan sebelum ia menjadi penilaian di aplikasi.',
               'ทางที่เร็วที่สุดคืออุทธรณ์คะแนนที่ไม่เป็นธรรม การอุทธรณ์ที่เรายื่นกับ Grab ราว 80% จบด้วยการลบรีวิว ทางที่สำคัญที่สุดคือแก้ต้นเหตุของหนึ่งดาว ซึ่งส่วนใหญ่คือบรรจุภัณฑ์และอุณหภูมิ ไม่ใช่ครัว ส่วนทางที่ถูกมองข้ามที่สุดคือการดักคำร้องเรียนก่อนที่มันจะกลายเป็นคะแนนในแอป')}
          </p>
          <p className="mb-4">
            {t('А самый популярный — набирать новые пятёрки в надежде, что они перевесят, — работает медленнее всех. Рейтинг считается как среднее арифметическое за весь период, и одна единица стоит двадцати пятёрок.',
               'And the most popular one — collecting new five-stars and hoping they outweigh the rest — works slowest of all. The rating is an arithmetic mean across the whole period, and one one-star costs twenty five-stars.',
               'Dan yang paling populer — mengumpulkan bintang lima baru dengan harapan akan mengimbangi — justru paling lambat. Rating dihitung sebagai rata-rata aritmetika sepanjang periode, dan satu bintang satu setara dua puluh bintang lima.',
               'ส่วนทางที่คนนิยมที่สุด คือไล่เก็บห้าดาวใหม่โดยหวังว่าจะกลบของเดิมได้ กลับช้าที่สุด เพราะเรตติ้งคิดเป็นค่าเฉลี่ยเลขคณิตตลอดช่วงเวลา และหนึ่งดาวหนึ่งครั้งมีราคาเท่ากับห้าดาวยี่สิบครั้ง')}
          </p>
          <p>
            {t('Ниже — тот же порядок, в котором мы поднимаем рейтинг на аккаунтах ресторанов на Бали и Пхукете.',
               'Below is the same order we follow when raising the rating on restaurant accounts in Bali and Phuket.',
               'Berikut urutan yang sama yang kami pakai saat menaikkan rating pada akun restoran di Bali dan Phuket.',
               'ด้านล่างคือลำดับเดียวกับที่เราใช้ดึงเรตติ้งของบัญชีร้านอาหารในบาหลีและภูเก็ต')}
          </p>
        </>
      }
      meta={{ datePublished: '2026-09-14', minutes: 9 }}
      schemas={[
        faqPageSchema(faq),
        articleSchema({
          headline: t('Как поднять рейтинг в GrabFood и GoFood после плохих отзывов',
                      'How to improve a GrabFood and GoFood rating after bad reviews',
                      'Cara menaikkan rating GrabFood dan GoFood setelah ulasan buruk',
                      'วิธีดึงเรตติ้ง GrabFood และ GoFood กลับมาหลังโดนรีวิวแย่'),
          url: URL,
          about: 'GrabFood rating, GoFood rating, bad reviews, review appeals, restaurant reviews, Bali, Phuket',
          datePublished: '2026-09-14',
          dateModified: '2026-09-14',
          language,
        }),
      ]}
    >

      <Block card title={t('Почему одна единица стоит двадцати пятёрок',
                           'Why one one-star costs twenty five-stars',
                           'Kenapa satu bintang satu setara dua puluh bintang lima',
                           'ทำไมหนึ่งดาวหนึ่งครั้งถึงมีราคาเท่าห้าดาวยี่สิบครั้ง')}>
        <p className="text-brand-muted max-w-3xl mb-4">
          {t('Рейтинг на площадке — это среднее арифметическое по всем оценкам за весь период. Не за месяц, не по скользящему окну. За всё время. Посчитайте сами: одна единица плюс двадцать пятёрок — это 101 балл на 21 оценку, то есть 4,81. Двадцать безупречных заказов, чтобы отыграть один плохой. Вот почему стратегия «наберём хороших отзывов, они перевесят» почти никогда не срабатывает: перевешивать приходится в двадцатикратном размере.',
             'The platform rating is an arithmetic mean of every score across the whole period. Not a month, not a rolling window. All of it. Do the maths yourself: one one-star plus twenty five-stars is 101 points across 21 scores, which is 4.81. Twenty flawless orders to undo one bad one. That is why "we will collect good reviews and they will outweigh it" almost never works: you have to outweigh twentyfold.',
             'Rating di platform adalah rata-rata aritmetika dari seluruh penilaian sepanjang periode. Bukan sebulan, bukan jendela bergerak. Seluruhnya. Hitung sendiri: satu bintang satu ditambah dua puluh bintang lima adalah 101 poin dibagi 21 penilaian, yaitu 4,81. Dua puluh pesanan sempurna untuk menebus satu yang buruk. Itulah kenapa strategi "kumpulkan ulasan bagus, nanti terimbangi" hampir tidak pernah berhasil: Anda harus mengimbangi dua puluh kali lipat.',
             'เรตติ้งบนแพลตฟอร์มคือค่าเฉลี่ยเลขคณิตของทุกคะแนนตลอดช่วงเวลาที่ร้านเปิดมา ไม่ใช่รายเดือน ไม่ใช่หน้าต่างเลื่อน แต่คือทั้งหมด ลองคิดเองดู: หนึ่งดาวหนึ่งครั้งบวกห้าดาวยี่สิบครั้ง เท่ากับ 101 คะแนนจาก 21 รายการ คือ 4.81 ต้องมีออร์เดอร์ที่สมบูรณ์แบบยี่สิบครั้งเพื่อแก้ออร์เดอร์แย่หนึ่งครั้ง นี่คือเหตุผลที่แผน "ไล่เก็บรีวิวดี ๆ เดี๋ยวมันก็กลบเอง" แทบไม่เคยได้ผล เพราะต้องกลบถึงยี่สิบเท่า')}
        </p>
        <p className="text-brand-muted max-w-3xl mb-4">
          {t('4,8 — та отметка, к которой мы ведём все аккаунты: с неё алгоритм отдаёт показы заметно охотнее, и человек, выбирающий между двумя карточками в списке, смотрит на цифру рядом с названием раньше, чем на всё остальное.',
             '4.8 is the mark we take every account to: from there the algorithm serves impressions noticeably more willingly, and a customer choosing between two listings looks at the number next to the name before anything else.',
             '4,8 adalah angka yang kami tuju untuk setiap akun: dari situ algoritma memberi tayangan jauh lebih rela, dan pelanggan yang memilih di antara dua listing melihat angka di sebelah nama sebelum hal lain apa pun.',
             '4.8 คือระดับที่เราพาทุกบัญชีไปให้ถึง เพราะจากจุดนั้นอัลกอริทึมปล่อยการมองเห็นให้ง่ายขึ้นอย่างเห็นได้ชัด และลูกค้าที่เลือกระหว่างสองร้านจะดูตัวเลขข้างชื่อร้านก่อนอย่างอื่นทั้งหมด')}
        </p>
        <p className="text-brand-muted max-w-3xl">
          {t('И ещё одна деталь, которая делает картину жёстче. Мы посмотрели выборку из 432 отзывов за 30 дней: 51% пятёрок, 28% единиц и только 3% четвёрок. Оценки в доставке бимодальны — человек пишет отзыв либо когда всё было отлично, либо когда всё было плохо. Никаких «четыре с минусом» за забытый соус не будет. Будет единица.',
             'And one more detail that makes the picture harsher. We looked at a sample of 432 reviews over 30 days: 51% five-stars, 28% one-stars and only 3% fours. Delivery scores are bimodal — people write a review either when everything was great or when everything went wrong. Nobody gives a "four minus" for a forgotten sauce. They give a one.',
             'Dan satu detail lagi yang membuat gambarannya lebih keras. Kami melihat sampel 432 ulasan selama 30 hari: 51% bintang lima, 28% bintang satu, dan hanya 3% bintang empat. Penilaian di delivery bersifat bimodal — orang menulis ulasan entah ketika semuanya luar biasa atau ketika semuanya kacau. Tidak ada "empat kurang" untuk saus yang tertinggal. Yang ada bintang satu.',
             'และมีอีกรายละเอียดที่ทำให้ภาพยิ่งโหด เราดูตัวอย่างรีวิว 432 ครั้งในรอบ 30 วัน พบห้าดาว 51% หนึ่งดาว 28% และสี่ดาวเพียง 3% คะแนนในธุรกิจเดลิเวอรี่กระจุกอยู่สองขั้ว คนเขียนรีวิวตอนที่ทุกอย่างดีมาก หรือตอนที่ทุกอย่างพัง ไม่มีใครให้ "สี่ดาวหย่อน ๆ" เพราะลืมใส่น้ำจิ้ม มีแต่จะให้หนึ่งดาว')}
        </p>
      </Block>

      <Block title={t('Шаг 1. Не получать негатив', 'Step 1. Do not earn the negatives', 'Langkah 1. Jangan sampai dapat negatif', 'ขั้นที่ 1 อย่าให้เกิดรีวิวแย่ตั้งแต่ต้น')}>
        <p className="text-brand-muted max-w-3xl mb-6">
          {t('Первое и главное — качество и ошибки при сборке. Не «работа с отзывами», а то, из-за чего отзывы появляются. Наши медианы по 96 ресторанам на Бали и Пхукете за январь–август 2026:',
             'First and foremost: quality and assembly errors. Not "review management" but the thing reviews come from. Our medians across 96 restaurants in Bali and Phuket, January–August 2026:',
             'Yang pertama dan utama: kualitas dan kesalahan saat menyiapkan pesanan. Bukan "mengelola ulasan", melainkan hal yang memunculkan ulasan itu. Median kami dari 96 restoran di Bali dan Phuket, Januari–Agustus 2026:',
             'อย่างแรกและสำคัญที่สุดคือคุณภาพและความผิดพลาดตอนจัดของ ไม่ใช่ "การจัดการรีวิว" แต่คือสิ่งที่ทำให้รีวิวเกิดขึ้น ค่ามัธยฐานของเราจากร้าน 96 แห่งในบาหลีและภูเก็ต มกราคม–สิงหาคม 2026:')}
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <tbody>
              {bench.map(([k, v]) => (
                <tr key={k} className="border-b border-white/10">
                  <td className="py-3 pr-4 text-brand-muted">{k}</td>
                  <td className="py-3 font-semibold whitespace-nowrap">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-brand-muted max-w-3xl mb-6">
          {t('Если у вас негатив чаще, чем один на сотню заказов, проблема почти всегда в упаковке или температуре, а не на кухне. Еда, безупречная на выдаче, приезжает остывшей или растёкшейся — и получает единицу за кухню, которая ни в чём не виновата. Это самая частая причина, которую владелец ищет дольше всего, потому что ищет её в еде.',
             'If you get a negative more often than one per hundred orders, the problem is almost always packaging or temperature, not the kitchen. Food that was flawless at handover arrives cold or spilled — and collects a one-star aimed at a kitchen that did nothing wrong. It is the most common cause and the one owners take longest to find, because they look for it in the food.',
             'Kalau Anda dapat ulasan negatif lebih sering daripada satu per seratus pesanan, masalahnya hampir selalu kemasan atau suhu, bukan dapur. Makanan yang sempurna saat diserahkan tiba dalam keadaan dingin atau tumpah — dan mendapat bintang satu yang ditujukan ke dapur yang tidak bersalah. Ini penyebab paling umum sekaligus yang paling lama dicari pemilik, karena dicarinya di makanan.',
             'ถ้าคุณได้รีวิวแย่บ่อยกว่าหนึ่งครั้งต่อร้อยออร์เดอร์ ปัญหามักอยู่ที่บรรจุภัณฑ์หรืออุณหภูมิ ไม่ใช่ครัว อาหารที่สมบูรณ์แบบตอนส่งมอบไปถึงในสภาพเย็นหรือหก แล้วได้หนึ่งดาวที่เล็งไปที่ครัวซึ่งไม่ได้ผิดอะไร นี่คือสาเหตุที่พบบ่อยที่สุดและเจ้าของใช้เวลาหานานที่สุด เพราะไปหาในตัวอาหาร')}
        </p>
        <p className="text-brand-muted max-w-3xl mb-5 font-semibold">
          {t('Три вещи, которые дают почти весь негатив:', 'Three things account for nearly all of it:', 'Tiga hal yang menyumbang hampir semuanya:', 'สามอย่างที่เป็นต้นเหตุเกือบทั้งหมด:')}
        </p>
        <div className="space-y-5">
          {causes.map(([title, body]) => (
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

      <Block card title={t('Шаг 2. Перехватить жалобу до того, как она станет оценкой',
                           'Step 2. Intercept the complaint before it becomes a score',
                           'Langkah 2. Cegat keluhan sebelum jadi penilaian',
                           'ขั้นที่ 2 ดักคำร้องเรียนก่อนที่มันจะกลายเป็นคะแนน')}>
        <p className="text-brand-muted max-w-3xl mb-4">
          {t('Даже в хорошо работающем ресторане ошибки случаются. Разница между рестораном с 4,5 и рестораном с 4,8 часто не в количестве ошибок, а в том, куда уходит недовольный человек: в приложение ставить единицу или к вам в WhatsApp.',
             'Mistakes happen even in a well-run restaurant. The difference between a 4.5 restaurant and a 4.8 one is often not the number of mistakes but where the unhappy customer goes: into the app to leave a one-star, or into your WhatsApp.',
             'Kesalahan tetap terjadi bahkan di restoran yang dikelola baik. Beda antara restoran 4,5 dan 4,8 sering bukan pada jumlah kesalahan, melainkan ke mana pelanggan yang kecewa pergi: ke aplikasi untuk memberi bintang satu, atau ke WhatsApp Anda.',
             'ต่อให้ร้านบริหารดีแค่ไหน ความผิดพลาดก็เกิดขึ้นได้ ความต่างระหว่างร้านที่ 4.5 กับร้านที่ 4.8 มักไม่ได้อยู่ที่จำนวนความผิดพลาด แต่อยู่ที่ว่าลูกค้าที่ไม่พอใจเดินไปทางไหน ไปกดหนึ่งดาวในแอป หรือทักมาที่ WhatsApp ของคุณ')}
        </p>
        <p className="text-brand-muted max-w-3xl mb-4">
          {t('Это наша собственная разработка, и она выглядит проще, чем работает. К пакету с заказом крепится бизнес-карточка. Именно карточка, а не флаер — это принципиально. Флаер человек опознаёт как рекламу и выбрасывает не глядя. Карточка опознаётся как контакт: её первый смысл для любого человека — «сюда можно написать».',
             'This is our own development and it looks simpler than it works. A business card is attached to the order bag. A card, not a flyer — and that distinction is the whole point. A flyer reads as advertising and gets binned unread. A card reads as a contact: its first meaning to anyone is "you can write here".',
             'Ini pengembangan kami sendiri dan tampak lebih sederhana daripada cara kerjanya. Sebuah kartu nama ditempelkan pada kantong pesanan. Kartu nama, bukan selebaran — dan perbedaan itulah intinya. Selebaran terbaca sebagai iklan dan langsung dibuang. Kartu nama terbaca sebagai kontak: makna pertamanya bagi siapa pun adalah "ke sini bisa menulis".',
             'นี่คือสิ่งที่เราคิดขึ้นเอง และมันดูง่ายกว่าที่มันทำงานจริง เราติดนามบัตรไว้กับถุงใส่อาหาร ต้องเป็นนามบัตร ไม่ใช่ใบปลิว และความต่างตรงนี้คือหัวใจ ใบปลิวถูกอ่านว่าเป็นโฆษณาแล้วถูกทิ้งโดยไม่ดู ส่วนนามบัตรถูกอ่านว่าเป็นช่องทางติดต่อ ความหมายแรกของมันสำหรับทุกคนคือ "ทักมาทางนี้ได้"')}
        </p>
        <p className="text-brand-muted max-w-3xl mb-4">
          {t('На карточке большими буквами три фразы:', 'Three phrases on it, in large type:', 'Di kartu itu ada tiga frasa dengan huruf besar:', 'บนนามบัตรมีสามประโยคตัวใหญ่:')}
        </p>
        <div className="rounded-xl border border-white/15 bg-white/5 p-6 mb-4 max-w-md">
          <div className="space-y-2">
            {cardPhrases.map((p) => (
              <div key={p} className="text-xl sm:text-2xl font-bold tracking-tight">{p}</div>
            ))}
          </div>
          <p className="text-brand-muted text-sm mt-4">
            {t('+ крупный QR-код, ведущий прямо в WhatsApp заведения',
               '+ a large QR code leading straight to the restaurant’s WhatsApp',
               '+ QR code besar yang langsung menuju WhatsApp restoran',
               '+ QR โค้ดขนาดใหญ่ที่พาไปที่ WhatsApp ของร้านโดยตรง')}
          </p>
        </div>
        <p className="text-brand-muted max-w-3xl mb-4">
          {t('Почему именно эти три фразы. Мы прочитали больше двух тысяч отзывов на Grab и Gojek и выписали, какими словами люди формулируют претензию. Эти три — самые цитируемые. Они же — самые частые ошибки, которые совершает команда на сборке.',
             'Why these three. We read more than two thousand reviews on Grab and Gojek and wrote down the words people actually use to state a complaint. These three are the most quoted. They are also the three mistakes the team makes most often during assembly.',
             'Kenapa tiga ini. Kami membaca lebih dari dua ribu ulasan di Grab dan Gojek dan mencatat kata-kata yang benar-benar dipakai orang untuk menyatakan keluhan. Tiga ini yang paling sering dikutip. Ketiganya juga kesalahan yang paling sering dilakukan tim saat menyiapkan pesanan.',
             'ทำไมต้องสามประโยคนี้ เราอ่านรีวิวบน Grab และ Gojek มากกว่าสองพันรายการ แล้วจดว่าคนใช้คำแบบไหนในการบอกปัญหา สามประโยคนี้คือคำที่ถูกใช้ซ้ำมากที่สุด และมันคือความผิดพลาดสามอย่างที่ทีมทำบ่อยที่สุดตอนจัดของ')}
        </p>
        <p className="text-brand-muted max-w-3xl mb-4">
          {t('Человек, открывший пакет и увидевший не то, что заказывал, читает на карточке собственную мысль, сформулированную за него, и рядом — способ высказать её прямо сейчас. Это занимает меньше усилий, чем открыть приложение и поставить оценку.',
             'Someone who opens the bag and sees the wrong thing reads their own thought on the card, already worded for them, with a way to say it right now sitting next to it. That takes less effort than opening the app and leaving a score.',
             'Orang yang membuka kantong dan melihat isinya keliru membaca pikirannya sendiri di kartu itu, sudah dirumuskan untuknya, dengan cara menyampaikannya saat itu juga tepat di sebelahnya. Itu lebih sedikit usahanya daripada membuka aplikasi dan memberi nilai.',
             'คนที่เปิดถุงแล้วเจอของผิด จะได้อ่านความคิดของตัวเองบนนามบัตร ที่มีคนเรียบเรียงไว้ให้แล้ว พร้อมช่องทางพูดออกมาตอนนั้นเลยอยู่ข้าง ๆ ซึ่งใช้แรงน้อยกว่าการเปิดแอปแล้วกดให้คะแนน')}
        </p>
        <p className="text-brand-muted max-w-3xl">
          {t('Дальше работает арифметика из начала статьи. Одна перехваченная жалоба — это не «сэкономленная единица». Это двадцать пятёрок, которые вам не придётся зарабатывать. И второй эффект: жалоба в WhatsApp — это шанс исправить заказ и вернуть человека. Единица в приложении — конец разговора.',
             'From there the arithmetic at the top of this page takes over. One intercepted complaint is not "a one-star saved". It is twenty five-stars you will not have to earn. And there is a second effect: a complaint in WhatsApp is a chance to fix the order and keep the customer. A one-star in the app is the end of the conversation.',
             'Selanjutnya aritmetika di awal halaman ini yang bekerja. Satu keluhan yang dicegat bukan berarti "satu bintang satu terselamatkan". Itu dua puluh bintang lima yang tidak perlu Anda kumpulkan. Ada efek kedua: keluhan di WhatsApp adalah kesempatan memperbaiki pesanan dan mempertahankan pelanggan. Bintang satu di aplikasi adalah akhir percakapan.',
             'จากนั้นเลขคณิตตอนต้นหน้านี้ก็ทำงานต่อ คำร้องเรียนหนึ่งครั้งที่ดักไว้ได้ ไม่ใช่แค่ "รอดจากหนึ่งดาวหนึ่งครั้ง" แต่คือห้าดาวยี่สิบครั้งที่คุณไม่ต้องไปหามา และยังมีผลข้อที่สอง คำร้องเรียนใน WhatsApp คือโอกาสแก้ออร์เดอร์และรักษาลูกค้าไว้ ส่วนหนึ่งดาวในแอปคือจุดจบของบทสนทนา')}
        </p>
      </Block>

      <Block title={t('Шаг 3. Снять то, что не должно было появиться',
                      'Step 3. Remove what should never have appeared',
                      'Langkah 3. Hapus yang seharusnya tidak ada',
                      'ขั้นที่ 3 ลบสิ่งที่ไม่ควรเกิดขึ้นตั้งแต่แรก')}>
        <p className="text-brand-muted max-w-3xl mb-4">
          {t('Несправедливый отзыв можно оспорить, и это работает чаще, чем принято думать. Из апелляций, которые мы подавали на Grab, около 80% заканчиваются снятием отзыва. Условий два, и оба обязательные.',
             'An unfair review can be contested, and it works more often than people assume. Around 80% of the appeals we have filed with Grab end with the review removed. There are two conditions and both are mandatory.',
             'Ulasan yang tidak adil bisa dibantah, dan itu berhasil lebih sering daripada yang diduga orang. Sekitar 80% banding yang kami ajukan ke Grab berakhir dengan ulasan dihapus. Ada dua syarat dan keduanya wajib.',
             'รีวิวที่ไม่เป็นธรรมสามารถอุทธรณ์ได้ และได้ผลบ่อยกว่าที่คนคิด การอุทธรณ์ที่เรายื่นกับ Grab ราว 80% จบด้วยการลบรีวิว มีเงื่อนไขสองข้อ และจำเป็นทั้งคู่')}
        </p>
        <div className="space-y-5 mb-5">
          <div className="flex gap-3">
            <Check className="w-5 h-5 text-brand-green shrink-0 mt-1" />
            <div>
              <div className="font-semibold mb-1">{t('Подавать быстро', 'File fast', 'Ajukan cepat', 'ยื่นให้เร็ว')}</div>
              <p className="text-brand-muted text-sm">
                {t('Чем свежее заказ, тем больше данных по нему доступно площадке и тем выше шанс.',
                   'The fresher the order, the more data the platform still has on it and the higher the chance.',
                   'Makin baru pesanannya, makin banyak data yang masih dimiliki platform dan makin besar peluangnya.',
                   'ยิ่งออร์เดอร์ใหม่ แพลตฟอร์มยิ่งมีข้อมูลของมันเหลืออยู่มาก และโอกาสยิ่งสูง')}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Check className="w-5 h-5 text-brand-green shrink-0 mt-1" />
            <div>
              <div className="font-semibold mb-1">
                {t('Приводить факты конкретного заказа', 'Cite the facts of the specific order', 'Sertakan fakta pesanan spesifik', 'อ้างข้อเท็จจริงของออร์เดอร์นั้นโดยตรง')}
              </div>
              <p className="text-brand-muted text-sm">
                {t('«Клиент неправ» — не апелляция. Апелляция — это время принятия, время сборки, состав заказа, фото упаковки, переписка с курьером. То, что можно проверить.',
                   '"The customer is wrong" is not an appeal. An appeal is the acceptance time, the prep time, the order contents, the packaging photo, the courier chat. Things that can be verified.',
                   '"Pelanggannya salah" bukan banding. Banding adalah waktu penerimaan, waktu penyiapan, isi pesanan, foto kemasan, percakapan dengan kurir. Hal-hal yang bisa diverifikasi.',
                   '"ลูกค้าเข้าใจผิด" ไม่ใช่การอุทธรณ์ การอุทธรณ์คือเวลารับออร์เดอร์ เวลาทำอาหาร รายการในออร์เดอร์ รูปบรรจุภัณฑ์ แชทกับไรเดอร์ สิ่งที่ตรวจสอบได้')}
              </p>
            </div>
          </div>
        </div>
        <p className="text-brand-muted max-w-3xl">
          {t('Апелляция — единственный инструмент, который убирает оценку из истории, а не разбавляет её. Поэтому она даёт результат быстрее всего остального: снять одну единицу — это то же самое, что заработать двадцать пятёрок, только за день.',
             'An appeal is the only tool that removes a score from the history instead of diluting it. That is why it produces a result faster than anything else: removing one one-star is the same as earning twenty five-stars, except it takes a day.',
             'Banding adalah satu-satunya alat yang menghapus penilaian dari riwayat, bukan mengencerkannya. Karena itu hasilnya datang lebih cepat daripada cara lain: menghapus satu bintang satu sama dengan mendapat dua puluh bintang lima, hanya saja dalam sehari.',
             'การอุทธรณ์เป็นเครื่องมือเดียวที่เอาคะแนนออกจากประวัติ ไม่ใช่แค่ไปเจือจางมัน จึงให้ผลเร็วกว่าวิธีอื่นทั้งหมด การลบหนึ่งดาวออกหนึ่งครั้ง เท่ากับได้ห้าดาวยี่สิบครั้ง เพียงแต่ใช้เวลาแค่วันเดียว')}
        </p>
      </Block>

      <Block title={t('Как понять, что это работает', 'How to tell it is working', 'Cara tahu ini berhasil', 'จะรู้ได้อย่างไรว่ามันได้ผล')}>
        <p className="text-brand-muted max-w-3xl">
          {t('Перестаньте смотреть на рейтинг как на главный показатель. Он усредняет всю историю и потому реагирует с запозданием в месяцы. Смотрите на другую цифру: сколько заказов проходит между двумя негативными отзывами. Она реагирует на то, что происходит на этой неделе, — и именно она первой покажет, что шаги 1 и 2 заработали. Медианы для сравнения — в таблице выше.',
             'Stop treating the rating as your main indicator. It averages the entire history and therefore reacts months late. Watch a different number: how many orders pass between two negative reviews. That one reacts to what is happening this week, and it is the first place where steps 1 and 2 show up. The medians to compare against are in the table above.',
             'Berhentilah memperlakukan rating sebagai indikator utama. Ia merata-ratakan seluruh riwayat sehingga bereaksi terlambat berbulan-bulan. Perhatikan angka lain: berapa pesanan yang lewat di antara dua ulasan negatif. Angka itu bereaksi pada apa yang terjadi minggu ini, dan di sanalah langkah 1 dan 2 pertama kali terlihat. Median pembandingnya ada di tabel di atas.',
             'เลิกใช้เรตติ้งเป็นตัวชี้วัดหลัก เพราะมันเฉลี่ยประวัติทั้งหมดจึงตอบสนองช้าเป็นเดือน ให้ดูอีกตัวเลขหนึ่งแทน คือมีออร์เดอร์กี่ใบคั่นระหว่างรีวิวแย่สองครั้ง ตัวเลขนี้ตอบสนองต่อสิ่งที่เกิดขึ้นในสัปดาห์นี้ และเป็นที่แรกที่ผลของขั้นที่ 1 และ 2 จะโผล่ให้เห็น ค่ามัธยฐานสำหรับเทียบอยู่ในตารางด้านบน')}
        </p>
      </Block>

      <Block title={t('Чего делать нельзя', 'What you must not do', 'Yang tidak boleh dilakukan', 'สิ่งที่ห้ามทำ')}>
        <p className="text-brand-muted max-w-3xl mb-4">
          {t('На тех же маркетплейсах, где нанимают исполнителя, рядом продают отзывы и рейтинги — от Rp 99 000. Покупает их обычно не владелец, а нанятый человек, который не знает, чем это заканчивается.',
             'On the same marketplaces where you hire a contractor, reviews and ratings are sold right next door — from Rp 99,000. The buyer is usually not the owner but the hired person, who does not know how this ends.',
             'Di marketplace yang sama tempat Anda menyewa pelaksana, ulasan dan rating dijual persis di sebelahnya — mulai Rp 99.000. Pembelinya biasanya bukan pemilik, melainkan orang yang disewa, yang tidak tahu ujungnya seperti apa.',
             'ในมาร์เก็ตเพลสเดียวกับที่คุณไปจ้างคนทำงาน มีคนขายรีวิวและเรตติ้งอยู่ข้าง ๆ เริ่มต้นที่ 99,000 รูเปียห์ คนที่ซื้อมักไม่ใช่เจ้าของร้าน แต่เป็นคนที่ถูกจ้างมา ซึ่งไม่รู้ว่ามันจบยังไง')}
        </p>
        <p className="text-brand-muted max-w-3xl mb-4">
          {t('Grab и Gojek отслеживают накрутку системно: им видно устройство, аккаунт и скорость появления оценок. К нам приходил владелец ресторана, получивший от Grab второе и последнее предупреждение за фальшивые отзывы — их накручивали с одного и того же аккаунта, самая грубая схема из возможных. Следующий шаг после последнего предупреждения — не понижение в выдаче и не снятие отзывов, а закрытый мерчант-аккаунт вместе со всей историей заказов, рейтингом и позицией, которую ресторан зарабатывал месяцами.',
             'Grab and Gojek track fake reviews systematically: they see the device, the account and the speed at which scores appear. A restaurant owner came to us having received a second and final warning from Grab for fake reviews — they had been posted from one and the same account, the crudest scheme there is. The step after a final warning is not a ranking penalty and not review removal: it is a closed merchant account, together with the whole order history, the rating and the position the restaurant spent months earning.',
             'Grab dan Gojek melacak ulasan palsu secara sistematis: mereka melihat perangkat, akun, dan kecepatan munculnya penilaian. Seorang pemilik restoran datang ke kami setelah menerima peringatan kedua dan terakhir dari Grab karena ulasan palsu — ulasan itu dikirim dari akun yang sama, skema paling kasar yang ada. Langkah setelah peringatan terakhir bukan penurunan peringkat dan bukan penghapusan ulasan, melainkan akun merchant ditutup, bersama seluruh riwayat pesanan, rating, dan posisi yang dikumpulkan restoran selama berbulan-bulan.',
             'Grab และ Gojek ตรวจจับรีวิวปลอมอย่างเป็นระบบ พวกเขาเห็นทั้งอุปกรณ์ บัญชี และความเร็วที่คะแนนโผล่เข้ามา เคยมีเจ้าของร้านมาหาเราหลังได้รับคำเตือนครั้งที่สองและครั้งสุดท้ายจาก Grab เรื่องรีวิวปลอม ซึ่งถูกปั่นมาจากบัญชีเดียวกันทั้งหมด เป็นวิธีที่หยาบที่สุดเท่าที่มี ขั้นถัดจากคำเตือนครั้งสุดท้ายไม่ใช่การลดอันดับและไม่ใช่การลบรีวิว แต่คือการปิดบัญชีร้านค้า พร้อมประวัติออร์เดอร์ทั้งหมด เรตติ้ง และตำแหน่งที่ร้านสะสมมาหลายเดือน')}
        </p>
        <p className="text-brand-muted max-w-3xl mb-4">
          {t('Подробнее этот случай — ', 'The case in full — ', 'Kasus selengkapnya — ', 'รายละเอียดของเคสนี้ ')}
          <Link href="/answers/in-house-manager-vs-agency" className="text-brand-green hover:underline">
            {t('в разборе про непрофильных исполнителей', 'in the breakdown of non-specialist contractors', 'di ulasan tentang pelaksana non-spesialis', 'อยู่ในบทวิเคราะห์เรื่องผู้รับงานที่ไม่ใช่สายตรง')}
          </Link>
          .
        </p>
        <p className="text-brand-muted max-w-3xl">
          {t('Разница простая. После апелляции у вас на один несправедливый отзыв меньше. После накрутки — на одно предупреждение больше.',
             'The difference is simple. After an appeal you have one unfair review less. After fake reviews you have one warning more.',
             'Bedanya sederhana. Setelah banding, ulasan tidak adil Anda berkurang satu. Setelah ulasan palsu, peringatan Anda bertambah satu.',
             'ความต่างนั้นง่ายมาก หลังอุทธรณ์ คุณมีรีวิวที่ไม่เป็นธรรมน้อยลงหนึ่งรายการ หลังปั่นรีวิว คุณมีคำเตือนเพิ่มขึ้นหนึ่งครั้ง')}
        </p>
      </Block>

      <Block title={t('Что получается на практике', 'What it looks like in practice', 'Hasilnya dalam praktik', 'ผลลัพธ์จริงเป็นอย่างไร')}>
        <p className="text-brand-muted max-w-3xl">
          <Link href="/cases/ussr-phuket" className="text-brand-green hover:underline">USSR Phuket</Link>
          {t(' — с 4,5 до 4,8. ', ' — from 4.5 to 4.8. ', ' — dari 4,5 ke 4,8. ', ' — จาก 4.5 เป็น 4.8 ')}
          <Link href="/cases/zaytun-ubud" className="text-brand-green hover:underline">Zaytun Ubud</Link>
          {t(' — с 4,67 до 4,8. В обоих случаях это не работа с отзывами, а работа с причинами: доступность, скорость, комплектация, перехват жалоб и апелляции по несправедливым оценкам.',
             ' — from 4.67 to 4.8. In both cases this was not review management but work on the causes: availability, speed, order accuracy, complaint interception and appeals against unfair scores.',
             ' — dari 4,67 ke 4,8. Pada kedua kasus ini bukan pengelolaan ulasan, melainkan penanganan penyebab: ketersediaan, kecepatan, ketepatan isi pesanan, pencegatan keluhan, dan banding atas penilaian yang tidak adil.',
             ' — จาก 4.67 เป็น 4.8 ทั้งสองเคสไม่ใช่การไปจัดการรีวิว แต่คือการแก้ต้นเหตุ ได้แก่ ความพร้อมขาย ความเร็ว ความถูกต้องของออร์เดอร์ การดักคำร้องเรียน และการอุทธรณ์คะแนนที่ไม่เป็นธรรม')}
        </p>
      </Block>

      <Block card title={t('Кто это делает', 'Who does this', 'Siapa yang mengerjakannya', 'ใครเป็นคนทำ')}>
        <p className="text-brand-muted max-w-3xl mb-4">
          {t('Апелляции надо подавать быстро — значит, кто-то читает новые отзывы каждый день, а не раз в месяц. Причины единиц разбираются по конкретным заказам, а не по ощущениям. Карточки должны лежать на упаковке каждый день, а сообщения в WhatsApp — получать ответ. Это ежедневная работа, и именно поэтому она обычно не делается.',
             'Appeals have to be filed fast, which means someone reads the new reviews every day, not once a month. The causes of one-stars get traced through specific orders, not impressions. The cards have to be on the packaging every day and the WhatsApp messages have to be answered. This is daily work, and that is exactly why it usually does not happen.',
             'Banding harus diajukan cepat, artinya ada orang yang membaca ulasan baru setiap hari, bukan sebulan sekali. Penyebab bintang satu ditelusuri lewat pesanan konkret, bukan lewat perasaan. Kartu harus ada di kemasan setiap hari, dan pesan WhatsApp harus dijawab. Ini pekerjaan harian, dan justru karena itu biasanya tidak dikerjakan.',
             'การอุทธรณ์ต้องยื่นให้เร็ว แปลว่าต้องมีคนอ่านรีวิวใหม่ทุกวัน ไม่ใช่เดือนละครั้ง ต้นเหตุของหนึ่งดาวต้องไล่จากออร์เดอร์จริง ไม่ใช่จากความรู้สึก นามบัตรต้องอยู่บนบรรจุภัณฑ์ทุกวัน และข้อความใน WhatsApp ต้องได้รับคำตอบ นี่คืองานประจำวัน และนั่นคือเหตุผลที่มันมักไม่ถูกทำ')}
        </p>
        <p className="text-brand-muted max-w-3xl mb-4">
          {t('Вариантов четыре: сам владелец, менеджер в штате, фрилансер или агентство. Разницу мы разобрали отдельно — ',
             'There are four options: the owner, an in-house manager, a freelancer or an agency. We broke the difference down separately — ',
             'Ada empat pilihan: pemilik sendiri, manajer internal, freelancer, atau agensi. Bedanya kami uraikan terpisah — ',
             'ทางเลือกมีสี่แบบ คือเจ้าของทำเอง ผู้จัดการประจำ ฟรีแลนซ์ หรือเอเจนซี เราแยกอธิบายความต่างไว้ต่างหาก ')}
          <Link href="/answers/in-house-manager-vs-agency" className="text-brand-green hover:underline">
            {t('кому отдать GrabFood и GoFood', 'who should run GrabFood and GoFood', 'siapa yang sebaiknya mengelola GrabFood dan GoFood', 'ใครควรดูแล GrabFood และ GoFood')}
          </Link>
          {t('. Если рейтинг просел не сам по себе, а вместе с заказами, начинать надо не с него: ',
             '. If the rating did not drop on its own but together with the orders, it is not where to start: ',
             '. Kalau rating turun bukan sendirian melainkan bersama pesanan, bukan dari situ mulainya: ',
             ' ถ้าเรตติ้งไม่ได้ตกลำพัง แต่ตกพร้อมกับออร์เดอร์ ก็ไม่ควรเริ่มจากตรงนี้ ')}
          <Link href="/answers/few-orders-grabfood-gofood" className="text-brand-green hover:underline">
            {t('мало заказов — с чего начинать искать причину', 'few orders — where to start looking for the cause', 'orderan sepi — mulai cari penyebabnya dari mana', 'ออร์เดอร์น้อย เริ่มหาสาเหตุจากตรงไหน')}
          </Link>
          .
        </p>
        <p className="text-brand-muted max-w-3xl">
          {t('Мы — Delivery Booster, агентство, которое ведёт доставку ресторанов на Бали и Пхукете. Цифры выше — из кабинетов наших клиентов и нашего ',
             'We are Delivery Booster, the agency that runs delivery for restaurants in Bali and Phuket. The numbers above come from our clients’ dashboards and our ',
             'Kami Delivery Booster, agensi yang mengelola delivery restoran di Bali dan Phuket. Angka-angka di atas berasal dari dashboard klien kami dan dari ',
             'เราคือ Delivery Booster เอเจนซีที่ดูแลงานเดลิเวอรี่ให้ร้านอาหารในบาหลีและภูเก็ต ตัวเลขข้างบนมาจากแดชบอร์ดของลูกค้าเราและจาก')}
          <Link href="/benchmark" className="text-brand-green hover:underline">
            {t('бенчмарка по 96 ресторанам', 'benchmark across 96 restaurants', 'benchmark atas 96 restoran', 'เบนช์มาร์กจากร้าน 96 แห่ง')}
          </Link>
          {t(', а не из примеров.', ', not from illustrations.', ', bukan dari contoh karangan.', ' ไม่ใช่ตัวอย่างสมมติ')}
        </p>
      </Block>

      <FaqList faq={faq} title={t('Частые вопросы', 'Frequently asked', 'Pertanyaan umum', 'คำถามที่พบบ่อย')} />

      <KeepReading currentHref="/answers/grabfood-gofood-rating-after-bad-reviews" />

      <AnswerCta />
    </AnswerLayout>
  );
}
