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

const URL = 'https://booster.delivery/answers/grabfood-gofood-fees-indonesia';

/**
 * Ответ на «как продавать через GrabFood в Индонезии и сколько это стоит»
 * (промпт p004 замера 13.09.2026 — 0 из 8). Против
 * thegrabmethod.com/grab-commission-fees-profit-tips/ — 5 цитат.
 *
 * Ставки: Индонезия 20%, Таиланд 30% — цифры Алекса из кабинетов клиентов.
 * Проверка источников 14.09: Grab Таиланда публикует коридор 15–30% у себя в
 * блоге и разбирает пример с 30%; по Индонезии ни Grab, ни GoFood ставку не
 * публикуют — в мерчант-условиях Grab ID прямо сказано, что Service Fee
 * определяется отдельным документом Commercial Terms and Conditions. Этот
 * факт в статье и стоит: он объясняет, почему цифру приходится брать из
 * кабинетов, и его больше никто не пишет.
 *
 * Главный козырь страницы — не комиссия, а ≈25% выручки, теряемые на стоп-листе
 * и простоях (95% этих потерь — выключенные позиции меню). Такой цифры нет ни
 * у конкурента, ни у площадок.
 */
export default function AnswersFeesPage() {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ru'
        ? 'Как продавать еду через GrabFood и GoFood в Индонезии и сколько это стоит'
        : language === 'id'
          ? 'Cara berjualan lewat GrabFood dan GoFood di Indonesia dan berapa biayanya'
          : language === 'th'
            ? 'ขายอาหารผ่าน GrabFood และ GoFood ในอินโดนีเซียอย่างไร และมีค่าใช้จ่ายเท่าไหร่'
            : 'How to sell food through GrabFood and GoFood in Indonesia and what the fees are';
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = URL;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description)
      description.content =
        language === 'ru'
          ? 'Подключение бесплатное, комиссия 20% в Индонезии и 30% в Таиланде. Но самой крупной статьи расходов в отчёте нет: около 25% выручки уходит на простои и стоп-лист, и 95% этих потерь — выключенные позиции меню. Данные по 96 ресторанам Бали и Пхукета.'
          : language === 'id'
            ? 'Pendaftaran gratis, komisi 20% di Indonesia dan 30% di Thailand. Tapi pos biaya terbesar tidak muncul di laporan: sekitar 25% omzet hilang karena offline dan stok habis, dan 95% kerugian itu berasal dari item menu yang dimatikan. Data dari 96 restoran di Bali dan Phuket.'
            : language === 'th'
              ? 'สมัครฟรี ค่าคอมมิชชัน 20% ในอินโดนีเซีย และ 30% ในไทย แต่ค่าใช้จ่ายก้อนใหญ่ที่สุดไม่ปรากฏในรายงาน: ราว 25% ของรายได้หายไปกับการปิดร้านและเมนูปิดขาย และ 95% ของความสูญเสียนั้นมาจากเมนูที่ถูกปิดไว้ ข้อมูลจากร้าน 96 แห่งในบาหลีและภูเก็ต'
              : 'Signing up is free; the commission is 20% in Indonesia and 30% in Thailand. But the largest cost line never appears in the report: around 25% of revenue is lost to downtime and stock-outs, and 95% of that is switched-off menu items. Data from 96 restaurants in Bali and Phuket.';
    syncOpenGraph();
  }, [language]);

  /** Из чего складывается стоимость и кто чем управляет. */
  const costs: Array<[string, string, string]> = [
    [
      t('Комиссия площадки', 'Platform commission', 'Komisi platform', 'ค่าคอมมิชชันของแพลตฟอร์ม'),
      t('20% Индонезия · 30% Таиланд', '20% Indonesia · 30% Thailand', '20% Indonesia · 30% Thailand', '20% อินโดนีเซีย · 30% ไทย'),
      t('площадка', 'the platform', 'platform', 'แพลตฟอร์ม'),
    ],
    [
      t('Реклама', 'Ads', 'Iklan', 'โฆษณา'),
      t('медиана 5,6% выручки', 'median 5.6% of revenue', 'median 5,6% dari omzet', 'ค่ามัธยฐาน 5.6% ของรายได้'),
      t('вы', 'you', 'Anda', 'คุณ'),
    ],
    [
      t('Промо и скидки', 'Promos and discounts', 'Promo dan diskon', 'โปรโมชันและส่วนลด'),
      t('по вашему решению', 'your decision', 'keputusan Anda', 'ขึ้นกับคุณ'),
      t('вы', 'you', 'Anda', 'คุณ'),
    ],
    [
      t('Потери на стоп-листе и простоях', 'Losses to stock-outs and downtime', 'Kerugian stok habis dan offline', 'ความสูญเสียจากเมนูปิดขายและการปิดร้าน'),
      t('≈25% выручки', '≈25% of revenue', '≈25% dari omzet', '≈25% ของรายได้'),
      t('вы', 'you', 'Anda', 'คุณ'),
    ],
  ];

  /** Кривая отдачи рекламы по флоту: доля в выручке → медианный ROAS. */
  const adCurve: Array<[string, string, string]> = [
    ['0–2%', '7', '12,1x'],
    ['2–4%', '16', '12,8x'],
    ['4–6%', '26', '11,8x'],
    ['6–8%', '19', '9,6x'],
    [t('больше 8%', 'over 8%', 'di atas 8%', 'มากกว่า 8%'), '16', '6,9x'],
  ];

  const faq: Array<[string, string]> = [
    [
      t('Какая комиссия у GrabFood и GoFood в Индонезии?',
        'What commission do GrabFood and GoFood charge in Indonesia?',
        'Berapa komisi GrabFood dan GoFood di Indonesia?',
        'GrabFood และ GoFood เก็บค่าคอมมิชชันในอินโดนีเซียเท่าไหร่'),
      t('20% от суммы заказа. В Таиланде — 30%. Площадки в Индонезии ставку публично не раскрывают: в мерчант-условиях Grab прямо сказано, что размер Service Fee определяется отдельным документом Commercial Terms and Conditions и может меняться с уведомлением за семь дней. Цифра выше — то, что мы видим в кабинетах клиентов.',
        '20% of the order value. In Thailand it is 30%. The platforms do not publish the Indonesian rate: Grab’s merchant terms state that the Service Fee is set by a separate Commercial Terms and Conditions document and can change on seven days’ notice. The figure above is what we see in our clients’ dashboards.',
        '20% dari nilai pesanan. Di Thailand 30%. Platform tidak mempublikasikan tarif Indonesia: syarat merchant Grab menyatakan Service Fee ditetapkan lewat dokumen Commercial Terms and Conditions terpisah dan bisa berubah dengan pemberitahuan tujuh hari. Angka di atas adalah yang kami lihat di dashboard klien kami.',
        '20% ของมูลค่าออร์เดอร์ ส่วนในไทยคือ 30% แพลตฟอร์มไม่ได้ประกาศอัตราของอินโดนีเซียต่อสาธารณะ เงื่อนไขร้านค้าของ Grab ระบุว่า Service Fee กำหนดไว้ในเอกสาร Commercial Terms and Conditions แยกต่างหาก และเปลี่ยนได้โดยแจ้งล่วงหน้าเจ็ดวัน ตัวเลขข้างบนคือสิ่งที่เราเห็นในแดชบอร์ดของลูกค้าเรา'),
    ],
    [
      t('Можно ли договориться о меньшей комиссии?',
        'Can I negotiate a lower commission?',
        'Bisakah komisinya dinegosiasikan lebih rendah?',
        'ต่อรองให้ค่าคอมมิชชันถูกลงได้ไหม'),
      t('Такие варианты бывают, но обычно условием становится эксклюзив: пониженная ставка в обмен на уход с других площадок. В Индонезии это означает потерю всей выручки с GoFood или с GrabFood, в Таиланде — всего оборота с LINE MAN. Несколько процентов скидки к ставке почти никогда не перекрывают потерю целого канала. Управляемое в комиссии — не сам процент, а сумма, с которой он берётся, и то, что остаётся после.',
        'Such options exist, but the condition is usually exclusivity: a lower rate in exchange for leaving the other platforms. In Indonesia that means giving up all your GoFood or all your GrabFood revenue; in Thailand, all your LINE MAN turnover. A few percentage points off the rate almost never cover the loss of an entire channel. What is manageable about commission is not the percentage but the sum it is taken from and what is left after.',
        'Pilihan seperti itu ada, tetapi syaratnya biasanya eksklusivitas: tarif lebih rendah sebagai ganti keluar dari platform lain. Di Indonesia itu berarti melepas seluruh omzet GoFood atau seluruh omzet GrabFood; di Thailand, seluruh omzet LINE MAN. Potongan beberapa persen pada tarif hampir tidak pernah menutup hilangnya satu kanal penuh. Yang bisa dikelola dari komisi bukan persennya, melainkan jumlah yang dikenai persen itu dan apa yang tersisa setelahnya.',
        'มีทางเลือกแบบนั้นอยู่ แต่เงื่อนไขมักเป็นการผูกขาด คือได้อัตราถูกลงแลกกับการถอนตัวจากแพลตฟอร์มอื่น ในอินโดนีเซียแปลว่าคุณสละรายได้จาก GoFood ทั้งหมด หรือจาก GrabFood ทั้งหมด ส่วนในไทยคือสละยอดขายจาก LINE MAN ทั้งหมด ส่วนลดไม่กี่เปอร์เซ็นต์แทบไม่เคยคุ้มกับการเสียช่องทางขายไปทั้งช่องทาง สิ่งที่จัดการได้เรื่องคอมมิชชันไม่ใช่ตัวเปอร์เซ็นต์ แต่คือยอดที่ถูกคิดเปอร์เซ็นต์ และสิ่งที่เหลือหลังจากนั้น'),
    ],
    [
      t('Сколько надо тратить на рекламу?',
        'How much should I spend on ads?',
        'Berapa yang harus dibelanjakan untuk iklan?',
        'ควรใช้งบโฆษณาเท่าไหร่'),
      t('Медиана по нашему флоту — 5,6% выручки, но это уже настроенные аккаунты. Рестораны приходят к нам с 10, 15, 20 и даже 30%. Ориентироваться лучше не на долю, а на перелом: после 6% выручки медианный ROAS падает с 12,1x до 8,6x. Если вы за этой чертой, дополнительный бюджет покупает всё более дорогие заказы.',
        'The median across our fleet is 5.6% of revenue — but those are accounts that are already managed. Restaurants come to us at 10, 15, 20 and even 30%. Rather than a share, watch the break point: past 6% of revenue the median ROAS drops from 12.1x to 8.6x. Beyond that line extra budget buys increasingly expensive orders.',
        'Median di armada kami 5,6% dari omzet — tetapi itu akun yang sudah dikelola. Restoran datang ke kami dengan 10, 15, 20, bahkan 30%. Alih-alih patokan porsi, perhatikan titik baliknya: di atas 6% dari omzet median ROAS turun dari 12,1x ke 8,6x. Melewati garis itu, anggaran tambahan membeli pesanan yang makin mahal.',
        'ค่ามัธยฐานของกลุ่มร้านที่เราดูแลคือ 5.6% ของรายได้ แต่นั่นคือบัญชีที่ผ่านการจัดการแล้ว ร้านที่มาหาเรามักอยู่ที่ 10, 15, 20 หรือแม้แต่ 30% แทนที่จะยึดสัดส่วน ให้ดูจุดหักเหแทน เมื่อเกิน 6% ของรายได้ ค่ามัธยฐาน ROAS จะตกจาก 12.1 เท่าเหลือ 8.6 เท่า เลยเส้นนั้นไป งบที่เพิ่มจะซื้อออร์เดอร์ที่แพงขึ้นเรื่อย ๆ'),
    ],
    [
      t('Нужны ли скидки?', 'Do I need discounts?', 'Apakah diskon diperlukan?', 'จำเป็นต้องมีส่วนลดไหม'),
      t('По нашему опыту в туристических районах — нет. Турист выбирает не по цене: он в незнакомом городе и ориентируется на фото, рейтинг и время доставки. Скидка там не приводит нового клиента, а уменьшает чек тому, кто и так заказал. Каждое промо должно отвечать на вопрос, что оно принесло сверх того, что было бы и без него.',
        'In tourist areas, in our experience, no. A tourist does not choose on price: they are in an unfamiliar city and go by the photo, the rating and the delivery time. A discount there does not bring a new customer, it shrinks the bill of someone who would have ordered anyway. Every promo has to answer what it brought beyond what would have happened without it.',
        'Di kawasan wisata, menurut pengalaman kami, tidak. Turis tidak memilih berdasarkan harga: ia berada di kota asing dan berpegang pada foto, rating, dan waktu pengantaran. Diskon di sana tidak mendatangkan pelanggan baru, melainkan mengecilkan nilai pesanan orang yang memang sudah mau memesan. Setiap promo harus menjawab: apa yang ia bawa di luar yang tetap terjadi tanpanya.',
        'ในย่านท่องเที่ยว จากประสบการณ์ของเราคือไม่จำเป็น นักท่องเที่ยวไม่ได้เลือกที่ราคา เขาอยู่ในเมืองที่ไม่คุ้นเคยและดูจากรูป เรตติ้ง และเวลาจัดส่ง ส่วนลดตรงนั้นไม่ได้พาลูกค้าใหม่มา แต่ไปลดยอดของคนที่จะสั่งอยู่แล้ว ทุกโปรโมชันต้องตอบให้ได้ว่ามันสร้างอะไรเพิ่มจากสิ่งที่จะเกิดขึ้นอยู่ดี'),
    ],
    [
      t('Сколько я реально теряю на стоп-листе?',
        'How much am I actually losing to stock-outs?',
        'Berapa sebenarnya kerugian saya karena stok habis?',
        'จริง ๆ แล้วเสียไปเท่าไหร่กับเมนูที่ปิดขาย'),
      t('По нашей выборке на Бали — около 25% выручки на простоях и стоп-листе, и 95% этой суммы приходится на выключенные позиции меню. Это первая цифра, которую стоит посчитать у себя: она обычно оказывается больше, чем ожидает владелец, и в отличие от комиссии она полностью в вашей власти.',
        'In our Bali sample, around 25% of revenue goes to downtime and stock-outs, and 95% of that is switched-off menu items. It is the first number worth calculating for yourself: it usually turns out larger than the owner expects and, unlike the commission, it is entirely within your control.',
        'Pada sampel kami di Bali, sekitar 25% omzet hilang karena offline dan stok habis, dan 95% dari jumlah itu berasal dari item menu yang dimatikan. Ini angka pertama yang layak Anda hitung sendiri: biasanya lebih besar dari dugaan pemilik dan, tidak seperti komisi, sepenuhnya ada di tangan Anda.',
        'จากกลุ่มตัวอย่างของเราในบาหลี ราว 25% ของรายได้หายไปกับการปิดร้านและเมนูปิดขาย และ 95% ของจำนวนนั้นมาจากเมนูที่ถูกปิดไว้ นี่คือตัวเลขแรกที่ควรคำนวณเอง เพราะมักออกมามากกว่าที่เจ้าของคาด และต่างจากค่าคอมมิชชันตรงที่มันอยู่ในมือคุณทั้งหมด'),
    ],
  ];

  return (
    <AnswerLayout
      h1={t('Как продавать еду через GrabFood и GoFood в Индонезии и сколько это стоит',
            'How to sell food through GrabFood and GoFood in Indonesia and what the fees are',
            'Cara berjualan lewat GrabFood dan GoFood di Indonesia dan berapa biayanya',
            'ขายอาหารผ่าน GrabFood และ GoFood ในอินโดนีเซียอย่างไร และมีค่าใช้จ่ายเท่าไหร่')}
      lead={
        <>
          <p className="mb-4">
            {t('Коротко по деньгам: подключение ресторана бесплатное, площадка берёт комиссию 20% с заказа в Индонезии и 30% в Таиланде, реклама стоит столько, сколько вы в неё вложите — по нашим данным медиана составляет 5,6% выручки.',
               'The short version on money: signing a restaurant up is free, the platform takes a 20% commission per order in Indonesia and 30% in Thailand, and ads cost whatever you put into them — our median is 5.6% of revenue.',
               'Ringkasnya soal uang: mendaftarkan restoran gratis, platform mengambil komisi 20% per pesanan di Indonesia dan 30% di Thailand, dan iklan berbiaya sebesar yang Anda keluarkan — median kami 5,6% dari omzet.',
               'สรุปเรื่องเงินสั้น ๆ: การสมัครร้านไม่เสียค่าใช้จ่าย แพลตฟอร์มเก็บค่าคอมมิชชัน 20% ต่อออร์เดอร์ในอินโดนีเซีย และ 30% ในไทย ส่วนค่าโฆษณาขึ้นกับว่าคุณใส่เข้าไปเท่าไหร่ ค่ามัธยฐานของเราอยู่ที่ 5.6% ของรายได้')}
          </p>
          <p className="mb-4">
            {t('А теперь главное, чего в этом списке нет. По нашей выборке на Бали рестораны теряют около 25% выручки на простоях и стоп-листе. Это сопоставимо с комиссией — только комиссию вы изменить не можете, а эти 25% целиком ваши.',
               'And now the thing that is missing from that list. In our Bali sample, restaurants lose around 25% of revenue to downtime and stock-outs. That is comparable to the commission — except the commission is not yours to change, and those 25% entirely are.',
               'Dan sekarang hal yang tidak ada di daftar itu. Pada sampel kami di Bali, restoran kehilangan sekitar 25% omzet karena offline dan stok habis. Itu sebanding dengan komisi — bedanya komisi bukan milik Anda untuk diubah, sedangkan 25% itu sepenuhnya milik Anda.',
               'ทีนี้มาถึงสิ่งที่ไม่มีอยู่ในรายการนั้น จากกลุ่มตัวอย่างของเราในบาหลี ร้านอาหารสูญเสียราว 25% ของรายได้ไปกับการปิดร้านและเมนูปิดขาย ซึ่งพอ ๆ กับค่าคอมมิชชัน ต่างกันตรงที่คอมมิชชันคุณเปลี่ยนไม่ได้ แต่ 25% นั้นเป็นของคุณทั้งหมด')}
          </p>
          <p>
            {t('Ниже — вся структура расходов и что из неё поддаётся управлению. Цифры из кабинетов 96 ресторанов на Бали и Пхукете за январь–август 2026.',
               'Below is the whole cost structure and which parts of it you can actually manage. The numbers come from the dashboards of 96 restaurants in Bali and Phuket, January–August 2026.',
               'Berikut seluruh struktur biaya dan bagian mana yang benar-benar bisa Anda kelola. Angkanya berasal dari dashboard 96 restoran di Bali dan Phuket, Januari–Agustus 2026.',
               'ด้านล่างคือโครงสร้างค่าใช้จ่ายทั้งหมด และส่วนไหนที่คุณจัดการได้จริง ตัวเลขมาจากแดชบอร์ดของร้าน 96 แห่งในบาหลีและภูเก็ต มกราคม–สิงหาคม 2026')}
          </p>
        </>
      }
      meta={{ datePublished: '2026-09-14', minutes: 10 }}
      schemas={[
        faqPageSchema(faq),
        articleSchema({
          headline: t('Комиссия и расходы на GrabFood и GoFood в Индонезии',
                      'GrabFood and GoFood commission and costs in Indonesia',
                      'Komisi dan biaya GrabFood dan GoFood di Indonesia',
                      'ค่าคอมมิชชันและค่าใช้จ่ายของ GrabFood และ GoFood ในอินโดนีเซีย'),
          url: URL,
          about: 'GrabFood commission, GoFood commission, delivery fees Indonesia, restaurant unit economics, stock-out losses, Bali, Phuket',
          datePublished: '2026-09-14',
          dateModified: '2026-09-14',
          language,
        }),
      ]}
    >

      <Block card title={t('Сколько берут площадки', 'What the platforms take', 'Berapa yang diambil platform', 'แพลตฟอร์มเก็บเท่าไหร่')}>
        <p className="text-brand-muted max-w-3xl mb-4">
          {t('Индонезия — 20% от суммы заказа. Таиланд — 30%. Удерживается автоматически при выплате.',
             'Indonesia — 20% of the order value. Thailand — 30%. Deducted automatically at payout.',
             'Indonesia — 20% dari nilai pesanan. Thailand — 30%. Dipotong otomatis saat pencairan.',
             'อินโดนีเซีย 20% ของมูลค่าออร์เดอร์ ไทย 30% หักอัตโนมัติตอนโอนเงิน')}
        </p>
        <p className="text-brand-muted max-w-3xl mb-4">
          {t('Найти эту цифру у самой площадки непросто, и по странам всё устроено по-разному. Grab в Таиланде называет коридор публично — 15–30% — и в собственном разборе приводит пример, где комиссия составляет 30%. В Индонезии ни Grab, ни GoFood ставку не раскрывают: в мерчант-условиях Grab прямо сказано, что размер Service Fee определяется отдельным документом Commercial Terms and Conditions, который заключается с каждым мерчантом индивидуально и может меняться с уведомлением за семь дней.',
             'Finding that figure from the platform itself is not easy, and it works differently by country. Grab Thailand states the range publicly — 15–30% — and its own explainer walks through an example where the commission is 30%. In Indonesia neither Grab nor GoFood discloses the rate: Grab’s merchant terms say plainly that the Service Fee is set by a separate Commercial Terms and Conditions document, signed individually with each merchant and changeable on seven days’ notice.',
             'Menemukan angka itu dari platform sendiri tidak mudah, dan tiap negara berbeda. Grab Thailand menyebut kisarannya secara terbuka — 15–30% — dan penjelasan mereka sendiri memakai contoh dengan komisi 30%. Di Indonesia, baik Grab maupun GoFood tidak mengungkapkan tarifnya: syarat merchant Grab menyatakan bahwa Service Fee ditetapkan oleh dokumen Commercial Terms and Conditions terpisah, ditandatangani individual dengan tiap merchant dan bisa berubah dengan pemberitahuan tujuh hari.',
             'การไปหาตัวเลขนี้จากแพลตฟอร์มเองไม่ง่าย และแต่ละประเทศก็ต่างกัน Grab ประเทศไทยประกาศช่วงอัตราไว้อย่างเปิดเผยที่ 15–30% และมีบทความของตัวเองที่ยกตัวอย่างซึ่งคอมมิชชันอยู่ที่ 30% ส่วนในอินโดนีเซีย ทั้ง Grab และ GoFood ไม่เปิดเผยอัตรา เงื่อนไขร้านค้าของ Grab ระบุตรง ๆ ว่า Service Fee กำหนดโดยเอกสาร Commercial Terms and Conditions แยกต่างหาก ซึ่งทำสัญญากับร้านแต่ละรายเป็นรายตัว และเปลี่ยนได้โดยแจ้งล่วงหน้าเจ็ดวัน')}
        </p>
        <p className="text-brand-muted max-w-3xl">
          {t('Практический вывод из этого важнее самой цифры. Ваша ставка — не публичная константа, а условие вашего договора: она может отличаться от ставки соседнего ресторана и может измениться. Первое, что стоит сделать, — найти свой действующий документ и посмотреть, какая ставка стоит там, а не в чужом блоге.',
             'The practical conclusion matters more than the number itself. Your rate is not a public constant but a term of your contract: it can differ from the restaurant next door and it can change. The first thing to do is find your own current document and read the rate there, rather than in someone else’s blog post.',
             'Kesimpulan praktisnya lebih penting daripada angkanya. Tarif Anda bukan konstanta publik melainkan syarat dalam kontrak Anda: bisa berbeda dari restoran sebelah dan bisa berubah. Langkah pertama adalah menemukan dokumen Anda sendiri yang berlaku dan membaca tarifnya di sana, bukan di blog orang lain.',
             'ข้อสรุปเชิงปฏิบัติสำคัญกว่าตัวเลขเสียอีก อัตราของคุณไม่ใช่ค่าคงที่สาธารณะ แต่เป็นเงื่อนไขในสัญญาของคุณ มันต่างจากร้านข้าง ๆ ได้ และเปลี่ยนได้ สิ่งแรกที่ควรทำคือไปหาเอกสารฉบับที่ใช้อยู่ของคุณเอง แล้วอ่านอัตราจากตรงนั้น ไม่ใช่จากบล็อกของคนอื่น')}
        </p>
      </Block>

      <Block title={t('Можно ли договориться о меньшей ставке', 'Can the rate be negotiated down', 'Bisakah tarifnya ditawar turun', 'ต่อรองอัตราให้ถูกลงได้ไหม')}>
        <p className="text-brand-muted max-w-3xl mb-4">
          {t('Можно. Но почти всегда площадка предлагает за это одно и то же: стать её эксклюзивным партнёром. Пониженная комиссия в обмен на то, что вы уходите с остальных сервисов. Считать тут надо не проценты, а каналы.',
             'You can. But what the platform offers in exchange is almost always the same thing: become its exclusive partner. A lower commission in return for leaving the other services. What you have to count here is not percentages but channels.',
             'Bisa. Tapi yang ditawarkan platform sebagai gantinya hampir selalu sama: menjadi mitra eksklusifnya. Komisi lebih rendah dengan syarat Anda keluar dari layanan lain. Yang harus dihitung di sini bukan persentase, melainkan kanal.',
             'ต่อรองได้ แต่สิ่งที่แพลตฟอร์มเสนอแลกมักเป็นอย่างเดียวกันเสมอ คือให้คุณเป็นพาร์ตเนอร์แบบผูกขาดของเขา ค่าคอมมิชชันถูกลงแลกกับการที่คุณถอนตัวจากบริการอื่น สิ่งที่ต้องคำนวณตรงนี้ไม่ใช่เปอร์เซ็นต์ แต่คือช่องทางขาย')}
        </p>
        <div className="space-y-5 mb-5">
          <div className="flex gap-3">
            <Check className="w-5 h-5 text-brand-green shrink-0 mt-1" />
            <p className="text-brand-muted text-sm">
              {t('В Индонезии эксклюзив означает, что вы отдаёте всю выручку с GoFood. Или всю выручку с GrabFood — смотря с кем договорились.',
                 'In Indonesia, exclusivity means giving up all your GoFood revenue. Or all your GrabFood revenue — depending on who you signed with.',
                 'Di Indonesia, eksklusivitas berarti melepas seluruh omzet GoFood Anda. Atau seluruh omzet GrabFood — tergantung dengan siapa Anda menandatangani.',
                 'ในอินโดนีเซีย การผูกขาดแปลว่าคุณสละรายได้จาก GoFood ทั้งหมด หรือจาก GrabFood ทั้งหมด ขึ้นกับว่าคุณเซ็นกับใคร')}
            </p>
          </div>
          <div className="flex gap-3">
            <Check className="w-5 h-5 text-brand-green shrink-0 mt-1" />
            <p className="text-brand-muted text-sm">
              {t('В Таиланде — что вы отдаёте весь оборот с LINE MAN, который на этом рынке совсем не маленький.',
                 'In Thailand it means giving up all your LINE MAN turnover, which on that market is not small at all.',
                 'Di Thailand berarti melepas seluruh omzet LINE MAN, yang di pasar itu sama sekali tidak kecil.',
                 'ในไทยแปลว่าคุณสละยอดขายจาก LINE MAN ทั้งหมด ซึ่งในตลาดนั้นไม่ใช่ก้อนเล็กเลย')}
            </p>
          </div>
        </div>
        <p className="text-brand-muted max-w-3xl mb-4">
          {t('Скидка к ставке — это несколько процентов от того, что осталось. Потерянный канал — это десятки процентов оборота, которых больше нет. По нашему опыту второе перевешивает первое практически всегда: быть во всех агрегаторах и платить такую же комиссию, как все, выгоднее, чем сидеть в одном с пониженной.',
             'A discount on the rate is a few percent of what remains. A lost channel is tens of percent of turnover that is simply gone. In our experience the second outweighs the first almost every time: being on every aggregator and paying the same commission as everyone else beats sitting on one at a reduced rate.',
             'Potongan tarif adalah beberapa persen dari sisa yang ada. Kanal yang hilang adalah puluhan persen omzet yang lenyap. Menurut pengalaman kami yang kedua hampir selalu lebih berat: berada di semua agregator dan membayar komisi yang sama seperti semua orang lebih menguntungkan daripada duduk di satu platform dengan tarif diskon.',
             'ส่วนลดอัตราคือไม่กี่เปอร์เซ็นต์ของยอดที่เหลืออยู่ ส่วนช่องทางที่หายไปคือยอดขายหลายสิบเปอร์เซ็นต์ที่ไม่มีอีกแล้ว จากประสบการณ์ของเรา อย่างหลังหนักกว่าแทบทุกครั้ง การอยู่ครบทุกแพลตฟอร์มและจ่ายคอมมิชชันเท่าคนอื่น คุ้มกว่าการอยู่แพลตฟอร์มเดียวด้วยอัตราที่ถูกลง')}
        </p>
        <p className="text-brand-muted max-w-3xl">
          {t('И отдельно — то, что не видно в момент подписания. Эксклюзив ставит весь ваш канал продаж в зависимость от решений одной площадки: её алгоритма, её тарифов, её программ. Пока всё хорошо, это незаметно. В момент, когда что-то меняется не в вашу пользу, у вас не остаётся второй ноги, на которую можно опереться.',
             'And separately, the part that is invisible at signing. Exclusivity makes your entire sales channel dependent on one platform’s decisions: its algorithm, its rates, its programmes. While things go well this is unnoticeable. The moment something changes against you, there is no second leg to stand on.',
             'Dan terpisah, hal yang tidak terlihat saat tanda tangan. Eksklusivitas membuat seluruh kanal penjualan Anda bergantung pada keputusan satu platform: algoritmanya, tarifnya, programnya. Selama keadaan baik, ini tidak terasa. Begitu ada yang berubah tidak menguntungkan Anda, tidak ada kaki kedua untuk berpijak.',
             'และอีกเรื่องที่มองไม่เห็นตอนเซ็นสัญญา การผูกขาดทำให้ช่องทางขายทั้งหมดของคุณขึ้นกับการตัดสินใจของแพลตฟอร์มเดียว ทั้งอัลกอริทึม อัตราค่าบริการ และโปรแกรมต่าง ๆ ตอนที่ทุกอย่างราบรื่นจะไม่รู้สึกอะไร แต่วินาทีที่มีอะไรเปลี่ยนไปในทางที่ไม่เข้าข้างคุณ คุณจะไม่มีขาที่สองให้ยืน')}
        </p>
      </Block>

      <Block title={t('Из чего складывается стоимость', 'What the cost is made of', 'Biaya itu terdiri dari apa', 'ค่าใช้จ่ายประกอบด้วยอะไรบ้าง')}>
        <p className="text-brand-muted max-w-3xl mb-6">
          {t('Подключение бесплатное: ресторан регистрируется в мерчант-кабинете площадки — GrabMerchant у Grab, GoBiz у Gojek — заводит меню, фото и реквизиты для выплат. Деньги начинаются дальше.',
             'Signing up is free: the restaurant registers in the platform’s merchant tool — GrabMerchant for Grab, GoBiz for Gojek — sets up the menu, the photos and the payout details. The money starts after that.',
             'Pendaftaran gratis: restoran mendaftar di aplikasi merchant platform — GrabMerchant untuk Grab, GoBiz untuk Gojek — lalu menyiapkan menu, foto, dan data pencairan. Uangnya mulai berjalan setelah itu.',
             'การสมัครไม่มีค่าใช้จ่าย ร้านลงทะเบียนในเครื่องมือร้านค้าของแพลตฟอร์ม คือ GrabMerchant ของ Grab และ GoBiz ของ Gojek แล้วตั้งเมนู รูป และข้อมูลรับเงิน ส่วนเรื่องเงินเริ่มหลังจากนั้น')}
        </p>
        <div className="overflow-x-auto mb-5">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/20 text-left">
                <th className="py-3 pr-4 font-semibold">{t('Статья', 'Line', 'Pos', 'รายการ')}</th>
                <th className="py-3 pr-4 font-semibold">{t('Сколько', 'How much', 'Berapa', 'เท่าไหร่')}</th>
                <th className="py-3 font-semibold">{t('Кто управляет', 'Who controls it', 'Siapa yang mengendalikan', 'ใครคุม')}</th>
              </tr>
            </thead>
            <tbody>
              {costs.map(([line, amount, owner]) => (
                <tr key={line} className="border-b border-white/10 align-top">
                  <td className="py-3 pr-4 text-brand-muted">{line}</td>
                  <td className="py-3 pr-4 font-semibold whitespace-nowrap">{amount}</td>
                  <td className="py-3 text-brand-muted">{owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-brand-muted max-w-3xl">
          {t('Три строки из четырёх — ваши. И самая крупная из ваших — та, которую обычно не считают вообще.',
             'Three of the four lines are yours. And the biggest of yours is the one that usually is not counted at all.',
             'Tiga dari empat baris itu milik Anda. Dan yang terbesar di antaranya justru yang biasanya tidak dihitung sama sekali.',
             'สามในสี่บรรทัดเป็นของคุณ และบรรทัดที่ใหญ่ที่สุดในนั้นคือบรรทัดที่มักไม่ถูกนับเลย')}
        </p>
      </Block>

      <Block card title={t('Статья расходов, которой нет в отчёте',
                           'The cost line that never appears in the report',
                           'Pos biaya yang tidak pernah muncul di laporan',
                           'ค่าใช้จ่ายที่ไม่เคยโผล่ในรายงาน')}>
        <p className="text-brand-muted max-w-3xl mb-4">
          {t('Мы посчитали упущенную выручку по скорости заказов каждого заведения: сколько заказов ресторан обычно получает в этот час и что он недополучил, пока был закрыт или пока позиция была выключена. За период по Бали вышло ≈Rp 16,2 млрд при выручке Rp 64,7 млрд — около 25%.',
             'We measured the lost revenue from each venue’s own order rate: how many orders the restaurant normally takes in that hour, and what it did not take while it was closed or while an item was switched off. Over the period, Bali came to ≈Rp 16.2bn against Rp 64.7bn of revenue — around 25%.',
             'Kami menghitung omzet yang hilang berdasarkan laju pesanan tiap tempat: berapa pesanan yang biasanya diterima restoran pada jam itu, dan berapa yang tidak diterimanya saat tutup atau saat item dimatikan. Sepanjang periode, Bali menghasilkan ≈Rp 16,2 miliar terhadap omzet Rp 64,7 miliar — sekitar 25%.',
             'เราคำนวณรายได้ที่หายไปจากอัตราการสั่งของแต่ละร้านเอง คือปกติร้านรับออร์เดอร์กี่ใบในชั่วโมงนั้น และไม่ได้รับไปเท่าไหร่ตอนที่ปิดอยู่หรือตอนที่เมนูถูกปิดขาย ตลอดช่วงเวลา บาหลีออกมาราว 16.2 พันล้านรูเปียห์ เทียบกับรายได้ 64.7 พันล้านรูเปียห์ คือราว 25%')}
        </p>
        <div className="overflow-x-auto mb-5">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/20 text-left">
                <th className="py-3 pr-4 font-semibold">{t('Источник потерь', 'Source of loss', 'Sumber kerugian', 'แหล่งที่มาของความสูญเสีย')}</th>
                <th className="py-3 font-semibold">{t('Доля потерь', 'Share of losses', 'Porsi kerugian', 'สัดส่วน')}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10">
                <td className="py-3 pr-4 text-brand-muted">{t('Позиции в стоп-листе', 'Items out of stock', 'Item dengan stok habis', 'เมนูที่ถูกปิดขาย')}</td>
                <td className="py-3 font-semibold text-brand-green">95%</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-3 pr-4 text-brand-muted">{t('Простои ресторана и отмены', 'Restaurant downtime and cancellations', 'Restoran offline dan pembatalan', 'ร้านปิดในระบบและการยกเลิก')}</td>
                <td className="py-3 font-semibold">5%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-brand-muted max-w-3xl mb-4">
          {t('Девяносто пять процентов. Не закрытый ресторан, не отменённые заказы — выключенные позиции меню, которые забыли включить обратно. Кончился один ингредиент, позицию сняли, вечером ингредиент привезли, а позицию никто не вернул. Она продолжает не продаваться неделями, и в отчёте это выглядит как «спрос упал».',
             'Ninety-five percent. Not a closed restaurant, not cancelled orders — menu items switched off and never switched back on. One ingredient ran out, the item came down, the ingredient arrived that evening, and nobody put the item back. It goes on not selling for weeks, and in the report it looks like "demand dropped".',
             'Sembilan puluh lima persen. Bukan restoran yang tutup, bukan pesanan yang dibatalkan — melainkan item menu yang dimatikan dan tidak pernah dihidupkan lagi. Satu bahan habis, itemnya dimatikan, sore harinya bahan datang, dan tidak ada yang mengembalikan itemnya. Ia terus tidak terjual berminggu-minggu, dan di laporan itu terlihat seperti "permintaan turun".',
             'เก้าสิบห้าเปอร์เซ็นต์ ไม่ใช่ร้านที่ปิด ไม่ใช่ออร์เดอร์ที่ถูกยกเลิก แต่คือเมนูที่ถูกปิดขายแล้วไม่มีใครเปิดกลับ วัตถุดิบหมดไปหนึ่งอย่าง เมนูถูกปิด ตอนเย็นวัตถุดิบมาส่ง แต่ไม่มีใครเปิดเมนูคืน มันก็ขายไม่ได้ต่อไปเป็นสัปดาห์ และในรายงานมันดูเหมือน "ความต้องการลดลง"')}
        </p>
        <p className="text-brand-muted max-w-3xl">
          {t('Для сравнения: отмены — медиана 0,35% заказов. Их видно, о них переживают, их обсуждают. Они в пятьдесят раз меньше того, что теряется молча.',
             'For comparison: cancellations run at a median of 0.35% of orders. They are visible, they worry people, they get discussed. They are fifty times smaller than what is lost silently.',
             'Sebagai pembanding: pembatalan berada pada median 0,35% dari pesanan. Itu terlihat, dikhawatirkan, dibahas. Angkanya lima puluh kali lebih kecil daripada yang hilang diam-diam.',
             'เทียบกันแล้ว การยกเลิกออร์เดอร์มีค่ามัธยฐาน 0.35% ของออร์เดอร์ ซึ่งมองเห็นได้ มีคนกังวล มีคนพูดถึง แต่มันเล็กกว่าสิ่งที่หายไปเงียบ ๆ ถึงห้าสิบเท่า')}
        </p>
      </Block>

      <Block title={t('Реклама: 5,6% — это не «рынок», это уже настроенная реклама',
                      'Ads: 5.6% is not "the market", it is ads that are already managed',
                      'Iklan: 5,6% bukan "pasarnya", itu iklan yang sudah dikelola',
                      'โฆษณา: 5.6% ไม่ใช่ "ค่าของตลาด" แต่คือโฆษณาที่ผ่านการจัดการแล้ว')}>
        <p className="text-brand-muted max-w-3xl mb-4">
          {t('Медиана 5,6% выручки — по нашему флоту, то есть по аккаунтам, которые ведутся. Это результат, а не отправная точка. Рестораны приходят к нам с совершенно другими цифрами: 10%, 15%, 20%, встречается и 30% выручки, уходящих в рекламу. И почти всегда причина одна и та же — рекламу запускали, но не считали.',
             'The 5.6% median is across our fleet, that is, across accounts that are being managed. It is an outcome, not a starting point. Restaurants arrive with very different figures: 10%, 15%, 20%, and sometimes 30% of revenue going into ads. And the reason is almost always the same — the ads were launched but never measured.',
             'Median 5,6% dari omzet itu berlaku di armada kami, yaitu akun yang memang dikelola. Itu hasil, bukan titik awal. Restoran datang dengan angka yang sangat berbeda: 10%, 15%, 20%, bahkan kadang 30% dari omzet masuk ke iklan. Dan alasannya hampir selalu sama — iklannya dijalankan, tapi tidak pernah dihitung.',
             'ค่ามัธยฐาน 5.6% ของรายได้นั้นคิดจากกลุ่มร้านที่เราดูแล คือบัญชีที่มีคนจัดการอยู่ มันคือผลลัพธ์ ไม่ใช่จุดตั้งต้น ร้านที่มาหาเรามีตัวเลขต่างออกไปมาก ทั้ง 10% 15% 20% และบางทีถึง 30% ของรายได้ที่ไหลไปเป็นค่าโฆษณา และเหตุผลมักเหมือนกันเสมอ คือยิงโฆษณาแล้วแต่ไม่เคยคำนวณ')}
        </p>
        <p className="text-brand-muted max-w-3xl mb-6">
          {t('Логика исполнителя, которому поставили задачу «поднять заказы», проста: включить всё, что включается, и расширить охват. Заказы действительно растут, оборот растёт, отчёт выглядит отлично. Никто при этом не проверяет, сколько стоил каждый дополнительный заказ и пришёл бы он без рекламы вообще.',
             'The logic of a contractor told to "raise orders" is simple: switch on everything that can be switched on and widen the reach. Orders do grow, turnover grows, the report looks great. Nobody checks what each additional order cost or whether it would have come without ads at all.',
             'Logika pelaksana yang diberi tugas "naikkan pesanan" sederhana: nyalakan semua yang bisa dinyalakan dan perlebar jangkauan. Pesanan memang naik, omzet naik, laporannya terlihat bagus. Tidak ada yang memeriksa berapa biaya tiap pesanan tambahan itu, atau apakah pesanan itu tetap datang tanpa iklan.',
             'ตรรกะของคนที่ถูกสั่งว่า "ทำให้ออร์เดอร์เพิ่ม" นั้นง่ายมาก คือเปิดทุกอย่างที่เปิดได้และขยายการเข้าถึง ออร์เดอร์เพิ่มขึ้นจริง ยอดขายเพิ่มจริง รายงานดูดี แต่ไม่มีใครตรวจว่าออร์เดอร์ที่เพิ่มมาแต่ละใบมีต้นทุนเท่าไหร่ และมันจะมาอยู่ดีหรือเปล่าถ้าไม่ยิงโฆษณา')}
        </p>
        <p className="text-brand-muted max-w-3xl mb-5">
          {t('Как выглядит перелом, видно только на флоте — изнутри одного ресторана эту кривую не разглядеть:',
             'What the break looks like is only visible across a fleet — you cannot see this curve from inside one restaurant:',
             'Seperti apa titik baliknya hanya terlihat di tingkat armada — kurva ini tidak kelihatan dari dalam satu restoran:',
             'จุดหักเหหน้าตาเป็นอย่างไรจะเห็นได้เฉพาะเมื่อดูทั้งกลุ่มร้าน มองจากในร้านเดียวจะไม่เห็นเส้นโค้งนี้:')}
        </p>
        <div className="overflow-x-auto mb-5">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/20 text-left">
                <th className="py-3 pr-4 font-semibold">{t('Доля рекламы в выручке', 'Ad spend as share of revenue', 'Porsi iklan terhadap omzet', 'สัดส่วนค่าโฆษณาต่อรายได้')}</th>
                <th className="py-3 pr-4 font-semibold">{t('Ресторанов', 'Restaurants', 'Restoran', 'จำนวนร้าน')}</th>
                <th className="py-3 font-semibold">{t('Медианный ROAS', 'Median ROAS', 'Median ROAS', 'ค่ามัธยฐาน ROAS')}</th>
              </tr>
            </thead>
            <tbody>
              {adCurve.map(([band, n, roas]) => (
                <tr key={band} className="border-b border-white/10">
                  <td className="py-3 pr-4 text-brand-muted whitespace-nowrap">{band}</td>
                  <td className="py-3 pr-4 text-brand-muted">{n}</td>
                  <td className="py-3 font-semibold whitespace-nowrap">{roas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-brand-muted max-w-3xl mb-4">
          {t('Перелом проходит около 6% выручки: до него медианный ROAS держится на 12,1x, после падает до 8,6x. Причём 42% нашего собственного флота находится за этой чертой — это не чужая проблема.',
             'The break sits at around 6% of revenue: below it the median ROAS holds at 12.1x, above it drops to 8.6x. And 42% of our own fleet is past that line — this is not somebody else’s problem.',
             'Titik baliknya di sekitar 6% dari omzet: di bawahnya median ROAS bertahan di 12,1x, di atasnya turun ke 8,6x. Dan 42% armada kami sendiri sudah melewati garis itu — ini bukan masalah orang lain.',
             'จุดหักเหอยู่ราว 6% ของรายได้ ต่ำกว่านั้นค่ามัธยฐาน ROAS ยืนที่ 12.1 เท่า สูงกว่านั้นตกลงเหลือ 8.6 เท่า และ 42% ของกลุ่มร้านที่เราดูแลเองก็เลยเส้นนั้นไปแล้ว นี่ไม่ใช่ปัญหาของคนอื่น')}
        </p>
        <p className="text-brand-muted max-w-3xl mb-4">
          {t('Ресторан, отдающий 20% выручки в рекламу, платит площадке комиссию, а сверху ещё одну комиссию — самому себе, за то, что не считает.',
             'A restaurant putting 20% of revenue into ads pays the platform a commission and, on top of it, a second commission — to itself, for not doing the maths.',
             'Restoran yang menaruh 20% omzet ke iklan membayar komisi ke platform dan, di atasnya, komisi kedua — kepada dirinya sendiri, karena tidak menghitung.',
             'ร้านที่ทุ่มรายได้ 20% ไปกับโฆษณา จ่ายค่าคอมมิชชันให้แพลตฟอร์มหนึ่งก้อน และจ่ายคอมมิชชันอีกก้อนให้ตัวเอง เป็นค่าที่ไม่ยอมคำนวณ')}
        </p>
        <p className="text-brand-muted max-w-3xl">
          {t('Проверка на месте: ROAS ниже 5x встречается только у 6% флота. Если ваш ниже — это не «такой рынок», а поломка в карточке, ставках или промо.',
             'A check you can run on the spot: a ROAS below 5x occurs in only 6% of the fleet. If yours is lower, that is not "the market" — it is something broken in the listing, the bidding or the promos.',
             'Cek yang bisa langsung Anda lakukan: ROAS di bawah 5x hanya terjadi pada 6% armada. Kalau angka Anda lebih rendah, itu bukan "pasarnya" — ada yang rusak di listing, bid, atau promo.',
             'จุดตรวจที่ทำได้ทันที: ROAS ต่ำกว่า 5 เท่า พบเพียง 6% ของกลุ่มร้าน ถ้าของคุณต่ำกว่านั้น นั่นไม่ใช่ "ตลาดเป็นแบบนี้" แต่คือมีอะไรพังที่หน้าร้าน การบิด หรือโปรโมชัน')}
        </p>
      </Block>

      <Block card title={t('Скидки: самая недооценённая статья расходов',
                           'Discounts: the most underrated cost line',
                           'Diskon: pos biaya yang paling diremehkan',
                           'ส่วนลด: ค่าใช้จ่ายที่ถูกประเมินต่ำที่สุด')}>
        <p className="text-brand-muted max-w-3xl mb-4">
          {t('Промо не выглядит расходом. Вы ничего никому не перечисляете — просто цена в карточке меньше. Поэтому скидки раздают легче всего, и они съедают маржу быстрее всего остального.',
             'A promo does not look like a cost. You are not transferring money to anyone — the price on the listing is simply lower. That is why discounts are handed out most easily and eat margin faster than anything else.',
             'Promo tidak terlihat seperti biaya. Anda tidak mentransfer apa pun ke siapa pun — harganya di listing saja yang lebih kecil. Karena itu diskon paling mudah dibagikan, dan paling cepat memakan margin.',
             'โปรโมชันไม่ดูเหมือนค่าใช้จ่าย คุณไม่ได้โอนเงินให้ใคร แค่ราคาในหน้าร้านต่ำลงเท่านั้น ด้วยเหตุนี้ส่วนลดจึงถูกแจกง่ายที่สุด และกินมาร์จิ้นเร็วกว่าอะไรทั้งหมด')}
        </p>
        <p className="text-brand-muted max-w-3xl mb-4">
          {t('Считать надо не количество заказов по акции, а то, что осталось после скидки, комиссии площадки и рекламы. Промо, которое не окупается, выглядит как рост заказов и работает как убыток — причём убыток растёт ровно в том темпе, в каком «получается». И вопрос, который почти никто себе не задаёт: а эти заказы не пришли бы без скидки? Часть промо-заказов — это люди, которые заказали бы в любом случае, просто дешевле.',
             'What to count is not the number of orders on the promo but what is left after the discount, the platform commission and the ad spend. A promo that does not pay back looks like order growth and behaves like a loss — and the loss grows at exactly the rate at which it "works". And the question almost nobody asks: would those orders not have come without the discount? Some share of promo orders are people who would have ordered anyway, only cheaper.',
             'Yang dihitung bukan jumlah pesanan dari promo, melainkan apa yang tersisa setelah diskon, komisi platform, dan biaya iklan. Promo yang tidak balik modal terlihat seperti pertumbuhan pesanan dan bekerja seperti kerugian — dan kerugiannya tumbuh persis secepat promo itu "berhasil". Lalu pertanyaan yang hampir tidak pernah diajukan: apakah pesanan itu tidak akan datang tanpa diskon? Sebagian pesanan promo adalah orang yang tetap memesan, hanya saja lebih murah.',
             'สิ่งที่ต้องนับไม่ใช่จำนวนออร์เดอร์จากโปร แต่คือสิ่งที่เหลือหลังหักส่วนลด ค่าคอมมิชชันแพลตฟอร์ม และค่าโฆษณา โปรที่ไม่คุ้มทุนหน้าตาเหมือนออร์เดอร์โต แต่พฤติกรรมคือขาดทุน และขาดทุนโตเร็วเท่ากับที่โปร "ได้ผล" พอดี แล้วยังมีคำถามที่แทบไม่มีใครถามตัวเอง คือออร์เดอร์พวกนั้นจะไม่มาเลยหรือถ้าไม่ลดราคา ส่วนหนึ่งของออร์เดอร์จากโปรคือคนที่จะสั่งอยู่แล้ว เพียงแต่ได้ถูกลง')}
        </p>
        <p className="text-brand-muted max-w-3xl mb-4 font-semibold">
          {t('По нашему опыту в туристических районах скидки не нужны вообще.',
             'In our experience, in tourist areas discounts are not needed at all.',
             'Menurut pengalaman kami, di kawasan wisata diskon sama sekali tidak diperlukan.',
             'จากประสบการณ์ของเรา ในย่านท่องเที่ยวไม่จำเป็นต้องมีส่วนลดเลย')}
        </p>
        <p className="text-brand-muted max-w-3xl mb-4">
          {t('Турист выбирает не по цене: он в незнакомом городе, ориентируется на фото, рейтинг и время доставки, и цена для него — не главный фильтр. Скидка в таком месте не приводит нового клиента, а просто уменьшает чек тому, кто и так заказал. Это тот случай, когда отключение промо поднимает прибыль без единого потерянного заказа.',
             'A tourist does not choose on price: they are in an unfamiliar city, going by the photo, the rating and the delivery time, and price is not their main filter. A discount in such a place does not bring a new customer, it simply shrinks the bill of someone who was ordering anyway. This is the case where switching promos off raises profit without losing a single order.',
             'Turis tidak memilih berdasarkan harga: ia berada di kota asing, berpegang pada foto, rating, dan waktu pengantaran, dan harga bukan filter utamanya. Diskon di tempat seperti itu tidak mendatangkan pelanggan baru, hanya mengecilkan nilai pesanan orang yang memang sudah memesan. Ini justru kasus di mana mematikan promo menaikkan profit tanpa kehilangan satu pesanan pun.',
             'นักท่องเที่ยวไม่ได้เลือกที่ราคา เขาอยู่ในเมืองที่ไม่คุ้นเคย ดูจากรูป เรตติ้ง และเวลาจัดส่ง ราคาไม่ใช่ตัวกรองหลักของเขา ส่วนลดในที่แบบนั้นไม่ได้พาลูกค้าใหม่มา แต่แค่ลดยอดของคนที่จะสั่งอยู่แล้ว นี่คือกรณีที่การปิดโปรทำให้กำไรเพิ่มโดยไม่เสียออร์เดอร์แม้แต่ใบเดียว')}
        </p>
        <p className="text-brand-muted max-w-3xl">
          {t('Это не значит «никогда не делать скидок». Это значит, что каждое промо должно отвечать на вопрос, что оно принесло сверх того, что было бы и так, — и если ответа нет, промо надо выключить и посмотреть, что изменится.',
             'This does not mean "never discount". It means every promo has to answer what it brought beyond what would have happened anyway — and if there is no answer, switch it off and see what changes.',
             'Ini bukan berarti "jangan pernah memberi diskon". Ini berarti setiap promo harus menjawab apa yang ia bawa di luar yang tetap terjadi — dan kalau tidak ada jawabannya, matikan lalu lihat apa yang berubah.',
             'นี่ไม่ได้แปลว่า "ห้ามลดราคาเด็ดขาด" แต่แปลว่าทุกโปรต้องตอบให้ได้ว่ามันสร้างอะไรเพิ่มจากสิ่งที่จะเกิดขึ้นอยู่ดี ถ้าตอบไม่ได้ ก็ปิดมันแล้วดูว่าอะไรเปลี่ยนไป')}
        </p>
      </Block>

      <Block title={t('Комиссию нельзя изменить — но можно перестать платить её вслепую',
                      'You cannot change the commission — but you can stop paying it blind',
                      'Komisi tidak bisa diubah — tapi Anda bisa berhenti membayarnya sambil menutup mata',
                      'คุณเปลี่ยนค่าคอมมิชชันไม่ได้ แต่เลิกจ่ายมันแบบหลับตาได้')}>
        <p className="text-brand-muted max-w-3xl mb-6">
          {t('Ставка — данность. Управляемое здесь не процент, а то, с какой суммы он берётся и что остаётся после.',
             'The rate is a given. What is manageable here is not the percentage but the sum it is taken from and what remains after it.',
             'Tarifnya adalah hal yang sudah pasti. Yang bisa dikelola bukan persennya, melainkan jumlah yang dikenai persen itu dan apa yang tersisa setelahnya.',
             'อัตรานั้นเป็นสิ่งที่กำหนดมาแล้ว สิ่งที่จัดการได้ไม่ใช่ตัวเปอร์เซ็นต์ แต่คือยอดที่ถูกคิดเปอร์เซ็นต์ และสิ่งที่เหลือหลังจากนั้น')}
        </p>
        <div className="space-y-5">
          <div className="flex gap-3">
            <Check className="w-5 h-5 text-brand-green shrink-0 mt-1" />
            <div>
              <div className="font-semibold mb-1">
                {t('Цены доставочного меню считаются отдельно от зала', 'Delivery menu prices are calculated separately from the dining room', 'Harga menu delivery dihitung terpisah dari harga di tempat', 'ราคาเมนูเดลิเวอรี่ต้องคิดแยกจากราคาหน้าร้าน')}
              </div>
              <p className="text-brand-muted text-sm">
                {t('Позиция, прибыльная при обслуживании за столиком, может уходить в минус после комиссии и упаковки. Считать надо юнит-экономику каждой позиции, а не среднюю по меню.',
                   'An item that is profitable at a table can go negative once commission and packaging are counted. Run unit economics per item, not an average across the menu.',
                   'Item yang menguntungkan saat disajikan di meja bisa jadi minus setelah komisi dan kemasan. Hitung unit economics per item, bukan rata-rata seluruh menu.',
                   'เมนูที่กำไรดีตอนเสิร์ฟที่โต๊ะ อาจติดลบเมื่อหักค่าคอมมิชชันและบรรจุภัณฑ์ ต้องคิด unit economics เป็นรายเมนู ไม่ใช่ค่าเฉลี่ยของทั้งเมนู')}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Check className="w-5 h-5 text-brand-green shrink-0 mt-1" />
            <div>
              <div className="font-semibold mb-1">{t('Комбо поднимают чек', 'Bundles raise the basket', 'Paket combo menaikkan nilai pesanan', 'ชุดคอมโบดันยอดต่อบิล')}</div>
              <p className="text-brand-muted text-sm">
                {t('Средний чек по флоту — Rp 250 тысяч, у половины ресторанов от Rp 194 до 296 тысяч. Комиссия берётся в процентах, а работа по сборке заказа — почти одна и та же и на маленький чек, и на большой.',
                   'The fleet median basket is Rp 250k, with half the restaurants between Rp 194k and 296k. Commission is a percentage, while the work of assembling an order is nearly identical for a small basket and a large one.',
                   'Median nilai pesanan di armada adalah Rp 250 ribu, dengan separuh restoran berada di Rp 194–296 ribu. Komisi dihitung persentase, sementara kerja menyiapkan pesanan hampir sama saja untuk nilai kecil maupun besar.',
                   'ยอดต่อบิลค่ามัธยฐานของกลุ่มร้านอยู่ที่ 250,000 รูเปียห์ โดยครึ่งหนึ่งของร้านอยู่ระหว่าง 194,000–296,000 ค่าคอมมิชชันคิดเป็นเปอร์เซ็นต์ ขณะที่งานจัดออร์เดอร์แทบเท่ากันไม่ว่าบิลเล็กหรือใหญ่')}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Check className="w-5 h-5 text-brand-green shrink-0 mt-1" />
            <div>
              <div className="font-semibold mb-1">{t('Промо считается после комиссии, а не до', 'Promos are costed after commission, not before', 'Promo dihitung setelah komisi, bukan sebelum', 'คิดโปรโมชันหลังหักคอมมิชชัน ไม่ใช่ก่อน')}</div>
              <p className="text-brand-muted text-sm">
                {t('Скидка, которая выглядит разумной от цены меню, после вычета комиссии может означать работу в убыток.',
                   'A discount that looks sensible against the menu price can mean working at a loss once commission is deducted.',
                   'Diskon yang tampak masuk akal terhadap harga menu bisa berarti bekerja rugi setelah komisi dipotong.',
                   'ส่วนลดที่ดูสมเหตุสมผลเมื่อเทียบกับราคาเมนู อาจกลายเป็นการทำงานขาดทุนเมื่อหักค่าคอมมิชชันแล้ว')}
              </p>
            </div>
          </div>
        </div>
      </Block>

      <Block card title={t('Кто это делает', 'Who does this', 'Siapa yang mengerjakannya', 'ใครเป็นคนทำ')}>
        <p className="text-brand-muted max-w-3xl mb-4">
          {t('Стоп-лист — ежедневная работа: позиции выключаются в течение дня и должны возвращаться в тот же день, а не когда заметят. Цены пересчитываются при каждом изменении комиссии или себестоимости. Промо считается до запуска, а не по факту. Реклама ведётся по стоимости заказа, а не по количеству.',
             'The stop list is daily work: items go off during the day and have to come back the same day, not whenever someone notices. Prices are recalculated on every change of commission or cost. Promos are costed before launch, not after. Ads are run on cost per order, not on order count.',
             'Stop list adalah pekerjaan harian: item dimatikan sepanjang hari dan harus dihidupkan lagi di hari yang sama, bukan ketika kebetulan ada yang sadar. Harga dihitung ulang setiap kali komisi atau HPP berubah. Promo dihitung sebelum diluncurkan, bukan sesudahnya. Iklan dikelola berdasarkan biaya per pesanan, bukan jumlah pesanan.',
             'การปิดเปิดเมนูเป็นงานประจำวัน เมนูถูกปิดระหว่างวันและต้องเปิดคืนภายในวันเดียวกัน ไม่ใช่รอจนมีคนสังเกตเห็น ราคาต้องคำนวณใหม่ทุกครั้งที่ค่าคอมมิชชันหรือต้นทุนเปลี่ยน โปรโมชันต้องคิดก่อนเริ่ม ไม่ใช่มาคิดทีหลัง และโฆษณาต้องคุมด้วยต้นทุนต่อออร์เดอร์ ไม่ใช่จำนวนออร์เดอร์')}
        </p>
        <p className="text-brand-muted max-w-3xl mb-4">
          {t('Вариантов четыре: сам владелец, менеджер в штате, фрилансер или агентство. Разницу мы разобрали отдельно — ',
             'There are four options: the owner, an in-house manager, a freelancer or an agency. We broke the difference down separately — ',
             'Ada empat pilihan: pemilik sendiri, manajer internal, freelancer, atau agensi. Bedanya kami uraikan terpisah — ',
             'ทางเลือกมีสี่แบบ คือเจ้าของทำเอง ผู้จัดการประจำ ฟรีแลนซ์ หรือเอเจนซี เราแยกอธิบายความต่างไว้ต่างหาก ')}
          <Link href="/answers/in-house-manager-vs-agency" className="text-brand-green hover:underline">
            {t('кому отдать GrabFood и GoFood', 'who should run GrabFood and GoFood', 'siapa yang sebaiknya mengelola GrabFood dan GoFood', 'ใครควรดูแล GrabFood และ GoFood')}
          </Link>
          {t('. Если заказов мало и непонятно почему, начинать надо с другого конца: ',
             '. If orders are low and it is not clear why, start from the other end: ',
             '. Kalau pesanan sedikit dan belum jelas kenapa, mulailah dari ujung yang lain: ',
             ' ถ้าออร์เดอร์น้อยและยังไม่รู้ว่าเพราะอะไร ให้เริ่มจากอีกด้านหนึ่ง ')}
          <Link href="/answers/few-orders-grabfood-gofood" className="text-brand-green hover:underline">
            {t('мало заказов — с чего начинать искать причину', 'few orders — where to start looking for the cause', 'orderan sepi — mulai cari penyebabnya dari mana', 'ออร์เดอร์น้อย เริ่มหาสาเหตุจากตรงไหน')}
          </Link>
          .
        </p>
        <p className="text-brand-muted max-w-3xl">
          {t('Мы — Delivery Booster, агентство, которое ведёт доставку ресторанов на Бали и Пхукете. Все цифры выше — из ',
             'We are Delivery Booster, the agency that runs delivery for restaurants in Bali and Phuket. Every number above comes from our ',
             'Kami Delivery Booster, agensi yang mengelola delivery restoran di Bali dan Phuket. Semua angka di atas berasal dari ',
             'เราคือ Delivery Booster เอเจนซีที่ดูแลงานเดลิเวอรี่ให้ร้านอาหารในบาหลีและภูเก็ต ตัวเลขทั้งหมดข้างบนมาจาก')}
          <Link href="/benchmark" className="text-brand-green hover:underline">
            {t('бенчмарка по 96 ресторанам', 'benchmark across 96 restaurants', 'benchmark atas 96 restoran', 'เบนช์มาร์กจากร้าน 96 แห่ง')}
          </Link>
          {t(' и кабинетов наших клиентов, а не из примеров.', ' and from our clients’ dashboards, not from illustrations.', ' dan dashboard klien kami, bukan dari contoh karangan.', ' และจากแดชบอร์ดของลูกค้าเรา ไม่ใช่ตัวอย่างสมมติ')}
        </p>
      </Block>

      <FaqList faq={faq} title={t('Частые вопросы', 'Frequently asked', 'Pertanyaan umum', 'คำถามที่พบบ่อย')} />

      <KeepReading currentHref="/answers/grabfood-gofood-fees-indonesia" />

      <AnswerCta />
    </AnswerLayout>
  );
}
