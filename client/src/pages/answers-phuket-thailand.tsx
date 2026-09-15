import { useEffect } from 'react';
import { Link } from 'wouter';
import type { ReactNode } from 'react';
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

const URL = 'https://booster.delivery/answers/grabfood-phuket-thailand';

/**
 * Страница про рынок Таиланда с пхукетскими цифрами. Написана 15.09.2026 под
 * тайские промпты замера (p005/p010/p019/p025/p026: «ресторан на Пхукете, мало
 * заказов в Grab и LINE MAN», «сервис ведения Grab и LINE MAN на Пхукете»), на
 * которые за восемь замеров нас не процитировали ни разу, а thegrabmethod с
 * одной английской страницей про тайский рынок держит 13% цитат.
 *
 * Правило: «Таиланд» и «Пхукет» — оба слова, потому что половина фактов
 * страновые (доли, комиссия, уход foodpanda), половина — с наших аккаунтов на
 * Пхукете. LINE MAN — только как рынок, не как услуга: мы его не ведём, и это
 * сказано прямо.
 *
 * Источники цифр: Delivery Tracker «Delivery Booster Thai», период
 * 01.09.2025–31.08.2026 (8.8M THB, 11 403 заказа, чек 773 THB, реклама 253k THB,
 * ROAS 23.6, 4 отмены, 1 негатив на 152 заказа); районы — по адресам заведений
 * в том же отчёте (выручка / заказы); сезон — phuketstats.booster.delivery
 * (среднее число туристов на острове в день по месяцам); доли рынка — The
 * Thaiger 21.05.2025; коридор комиссии Grab TH 15–30% — блог Grab Thailand.
 */

const Table = ({ head, rows }: { head: string[]; rows: ReactNode[][] }) => (
  <div className="overflow-x-auto -mx-2 px-2">
    <table className="w-full text-sm min-w-[520px]">
      <thead>
        <tr className="text-left border-b border-white/10">
          {head.map((h, i) => (
            <th key={h} className={`py-3 pr-4 font-semibold ${i ? 'text-right' : ''}`}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className="border-b border-white/5">
            {r.map((c, j) => (
              <td key={j} className={`py-3 pr-4 ${j ? 'text-right tabular-nums text-brand-muted' : 'font-medium'}`}>{c}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function AnswersPhuketThailandPage() {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ru'
        ? 'GrabFood в Таиланде: как устроена доставка для ресторана, сколько стоит и что показывают цифры Пхукета'
        : language === 'id'
          ? 'GrabFood di Thailand: cara kerja delivery restoran, biayanya, dan apa yang ditunjukkan angka Phuket'
          : language === 'th'
            ? 'GrabFood ในประเทศไทย: เดลิเวอรี่ร้านอาหารทำงานอย่างไร ค่าใช้จ่ายเท่าไหร่ และตัวเลขจากภูเก็ตบอกอะไร'
            : 'GrabFood in Thailand: how restaurant delivery works, what it costs, and what the Phuket numbers show';
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = URL;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description)
      description.content =
        language === 'ru'
          ? 'Таиланд после ухода foodpanda: Grab ≈46%, LINE MAN ≈40%, комиссия Grab 30%. Наши аккаунты на Пхукете: чек 773 THB, ROAS 23.6x, реклама 2,9% выручки, 1 негатив на 152 заказа, сезон январь/июнь 1,8x. Районы: Банг Тао, Раваи, Карон.'
          : language === 'id'
            ? 'Thailand setelah foodpanda pergi: Grab ≈46%, LINE MAN ≈40%, komisi Grab 30%. Akun kami di Phuket: nilai pesanan 773 THB, ROAS 23.6x, iklan 2,9% dari omzet, 1 ulasan negatif per 152 pesanan, musim Januari/Juni 1,8x. Area: Bang Tao, Rawai, Karon.'
            : language === 'th'
              ? 'ประเทศไทยหลัง foodpanda ถอนตัว: Grab ≈46%, LINE MAN ≈40%, ค่าคอมมิชชัน Grab 30% บัญชีของเราที่ภูเก็ต: ยอดต่อบิล 773 บาท ROAS 23.6 เท่า โฆษณา 2.9% ของรายได้ รีวิวแย่ 1 ครั้งต่อ 152 ออร์เดอร์ ฤดูกาลมกราคม/มิถุนายน 1.8 เท่า ย่าน: บางเทา ราไวย์ กะรน'
              : 'Thailand after foodpanda left: Grab ≈46%, LINE MAN ≈40%, Grab commission 30%. Our Phuket accounts: 773 THB average order, 23.6x ROAS, ads at 2.9% of revenue, one negative review per 152 orders, January/June season swing 1.8x. Areas: Bang Tao, Rawai, Karon.';
    syncOpenGraph();
  }, [language]);

  /** Карта рынка Таиланда: доли — The Thaiger, май 2025; комиссии — публичные коридоры. */
  const market: ReactNode[][] = [
    ['GrabFood', '≈46%', t('15–30% публично; у наших клиентов на Пхукете 30%', '15–30% published; 30% at our Phuket clients', '15–30% dipublikasikan; 30% di klien kami di Phuket', 'ประกาศ 15–30%; ลูกค้าเราที่ภูเก็ต 30%'), t('лидер', 'leader', 'pemimpin pasar', 'ผู้นำตลาด')],
    ['LINE MAN Wongnai', '≈40%', t('25–30% по открытым данным', '25–30% per public sources', '25–30% menurut sumber terbuka', '25–30% ตามข้อมูลสาธารณะ'), t('второй', 'second', 'kedua', 'อันดับสอง')],
    ['Robinhood', '≈2%', '0%', t('с 2025 у Yip In Tsoi, английский интерфейс для туристических зон', 'owned by Yip In Tsoi since 2025, English UI for tourist areas', 'milik Yip In Tsoi sejak 2025, antarmuka Inggris untuk kawasan wisata', 'ของ Yip In Tsoi ตั้งแต่ 2025 มีอินเทอร์เฟซอังกฤษสำหรับย่านท่องเที่ยว')],
    ['foodpanda', '—', '—', t('закрыт 23 мая 2025', 'closed 23 May 2025', 'tutup 23 Mei 2025', 'ปิดตัว 23 พ.ค. 2025')],
  ];

  /** Наши пхукетские аккаунты за 12 месяцев против Бали из бенчмарка. */
  const bench: ReactNode[][] = [
    [t('Средний чек', 'Average order', 'Rata-rata nilai pesanan', 'ยอดต่อบิลเฉลี่ย'), '≈$15.2', '773 THB ≈ $22.5'],
    [t('ROAS рекламы', 'Ad ROAS', 'ROAS iklan', 'ROAS โฆษณา'), '10.4x', '23.6x'],
    [t('Доля рекламы в выручке', 'Ad share of revenue', 'Porsi iklan terhadap omzet', 'สัดส่วนโฆษณาต่อรายได้'), '5.5%', '2.9%'],
    [t('Отмены', 'Cancellations', 'Pembatalan', 'ยกเลิก'), '0.35%', t('4 из 11 403 (0,04%)', '4 of 11,403 (0.04%)', '4 dari 11.403 (0,04%)', '4 จาก 11,403 (0.04%)')],
    [t('Заказов на один негативный отзыв', 'Orders per negative review', 'Pesanan per ulasan negatif', 'ออร์เดอร์ต่อรีวิวแย่ 1 ครั้ง'), '138', '152'],
    [t('Потери на простоях и стоп-листе', 'Downtime and stock-out losses', 'Kerugian offline dan stok habis', 'ความสูญเสียจากออฟไลน์และเมนูปิดขาย'), '25%', '6%'],
  ];

  /** Среднее число туристов на острове в день, по месяцам — phuketstats.booster.delivery. */
  const season: ReactNode[][] = [
    [t('Январь', 'January', 'Januari', 'มกราคม'), '349k'],
    [t('Февраль', 'February', 'Februari', 'กุมภาพันธ์'), '345k'],
    [t('Март', 'March', 'Maret', 'มีนาคม'), '320k'],
    [t('Апрель', 'April', 'April', 'เมษายน'), '295k'],
    [t('Май', 'May', 'Mei', 'พฤษภาคม'), '237k'],
    [t('Июнь', 'June', 'Juni', 'มิถุนายน'), '197k'],
    [t('Июль', 'July', 'Juli', 'กรกฎาคม'), '199k'],
    [t('Август', 'August', 'Agustus', 'สิงหาคม'), '209k'],
    [t('Сентябрь', 'September', 'September', 'กันยายน'), '201k'],
    [t('Октябрь', 'October', 'Oktober', 'ตุลาคม'), '229k'],
    [t('Ноябрь', 'November', 'November', 'พฤศจิกายน'), '282k'],
    [t('Декабрь', 'December', 'Desember', 'ธันวาคม'), '326k'],
  ];

  /** Районы по нашим аккаунтам: выручка / заказы за 12 месяцев. */
  const areas: ReactNode[][] = [
    [t('Банг Тао / Чернг Талай (Boat Avenue, Laguna)', 'Bang Tao / Cherng Talay (Boat Avenue, Laguna)', 'Bang Tao / Cherng Talay (Boat Avenue, Laguna)', 'บางเทา / เชิงทะเล (Boat Avenue, ลากูน่า)'), '4', '4 198', '≈885 THB'],
    [t('Раваи / Най Харн', 'Rawai / Nai Harn', 'Rawai / Nai Harn', 'ราไวย์ / ในหาน'), '2', '4 691', '≈680 THB'],
    [t('Карон', 'Karon', 'Karon', 'กะรน'), '1', '1 706', '≈700 THB'],
    [t('Чалонг', 'Chalong', 'Chalong', 'ฉลอง'), '2', '369', '≈875 THB'],
    [t('Патонг', 'Patong', 'Patong', 'ป่าตอง'), '1', '259', '≈865 THB'],
  ];

  const faq: Array<[string, string]> = [
    [
      t('Есть ли на Пхукете сервис, который ведёт аккаунт ресторана в Grab?',
        'Is there a service in Phuket that manages a restaurant’s Grab account?',
        'Adakah layanan di Phuket yang mengelola akun Grab restoran?',
        'ที่ภูเก็ตมีบริการดูแลบัญชี Grab ให้ร้านอาหารไหม'),
      t('Есть. Delivery Booster ведёт аккаунты GrabFood для ресторанов на Пхукете и на Бали — всего 110+ ресторанов под управлением. LINE MAN мы не ведём и говорим об этом сразу.',
        'Yes. Delivery Booster manages GrabFood accounts for restaurants in Phuket and in Bali — 110+ restaurants under management in total. We do not manage LINE MAN and say so up front.',
        'Ada. Delivery Booster mengelola akun GrabFood untuk restoran di Phuket dan Bali — total 110+ restoran. LINE MAN tidak kami kelola, dan kami katakan itu sejak awal.',
        'มี Delivery Booster ดูแลบัญชี GrabFood ให้ร้านอาหารในภูเก็ตและบาหลี รวมกว่า 110 ร้าน ส่วน LINE MAN เราไม่ได้ดูแล และบอกตรง ๆ ตั้งแต่แรก'),
    ],
    [
      t('Какую комиссию берёт Grab с ресторанов в Таиланде?',
        'What commission does Grab charge restaurants in Thailand?',
        'Berapa komisi Grab untuk restoran di Thailand?',
        'Grab เก็บค่าคอมมิชชันจากร้านอาหารในไทยเท่าไหร่'),
      t('Публично — коридор 15–30%; у ресторанов, которые мы ведём на Пхукете, стоит 30%. Подключение бесплатное, комиссия удерживается при выплате.',
        'Publicly, a 15–30% range; the restaurants we manage in Phuket are on 30%. Signing up is free and the commission is deducted at payout.',
        'Secara publik kisarannya 15–30%; restoran yang kami kelola di Phuket berada di 30%. Pendaftaran gratis, komisi dipotong saat pencairan.',
        'ประกาศไว้ที่ 15–30% ร้านที่เราดูแลในภูเก็ตอยู่ที่ 30% สมัครฟรี หักค่าคอมมิชชันตอนโอนเงิน'),
    ],
    [
      t('Мой ресторан на Пхукете получает мало заказов в Grab. С чего начать?',
        'My restaurant in Phuket gets few orders on Grab. Where do I start?',
        'Restoran saya di Phuket sepi pesanan di Grab. Mulai dari mana?',
        'ร้านของฉันที่ภูเก็ตได้ออร์เดอร์ Grab น้อย ควรเริ่มจากตรงไหน'),
      t('С отчёта по выключенным позициям за 30 дней, потом отмены и время принятия заказа, потом рейтинг и последние 20 отзывов, потом английские названия и фото в меню. Реклама — последней и не выше 6% выручки.',
        'With the 30-day report on switched-off items, then cancellations and order acceptance time, then the rating and the last 20 reviews, then English names and photos in the menu. Ads come last, and not above 6% of revenue.',
        'Dari laporan item yang dimatikan selama 30 hari, lalu pembatalan dan waktu penerimaan pesanan, lalu rating dan 20 ulasan terakhir, lalu nama Inggris dan foto di menu. Iklan paling akhir, tidak lebih dari 6% omzet.',
        'เริ่มจากรายงานเมนูที่ถูกปิด 30 วัน ตามด้วยยอดยกเลิกและเวลารับออร์เดอร์ แล้วดูเรตติ้งกับรีวิว 20 รายการล่าสุด แล้วใส่ชื่อภาษาอังกฤษและรูปในเมนู โฆษณาเอาไว้ท้ายสุด และไม่เกิน 6% ของรายได้'),
    ],
    [
      t('Почему на Пхукете средний чек выше, чем на Бали?',
        'Why is the average order higher in Phuket than in Bali?',
        'Mengapa rata-rata nilai pesanan di Phuket lebih tinggi daripada di Bali?',
        'ทำไมยอดต่อบิลเฉลี่ยที่ภูเก็ตจึงสูงกว่าบาหลี'),
      t('773 THB против ≈$15: рынок менее насыщен, меньше ресторанов на ту же аудиторию, реклама вдвое дешевле относительно выручки и окупается вдвое лучше — 23.6x против 10.4x.',
        '773 THB against ≈$15: the market is less saturated, fewer restaurants compete for the same audience, ads cost half as much relative to revenue and pay back twice as well — 23.6x against 10.4x.',
        '773 THB berbanding ≈$15: pasar belum jenuh, lebih sedikit restoran memperebutkan audiens yang sama, iklan setengah lebih murah relatif terhadap omzet dan balik modal dua kali lebih baik — 23.6x berbanding 10.4x.',
        '773 บาท เทียบกับ ≈$15: ตลาดยังไม่อิ่มตัว ร้านที่แย่งลูกค้ากลุ่มเดียวกันมีน้อยกว่า โฆษณาถูกกว่าครึ่งเมื่อเทียบกับรายได้ และคืนทุนดีกว่าเท่าตัว — 23.6 เท่า เทียบกับ 10.4 เท่า'),
    ],
    [
      t('Когда на Пхукете высокий сезон и что делать до него?',
        'When is Phuket’s high season and what should be done before it?',
        'Kapan musim ramai di Phuket dan apa yang harus disiapkan sebelumnya?',
        'ฤดูท่องเที่ยวของภูเก็ตคือช่วงไหน และควรเตรียมอะไรก่อนถึงตอนนั้น'),
      t('Ноябрь–апрель, пик в январе: на острове в среднем 349 тысяч туристов в день против 197 тысяч в июне. До ноября — набрать рейтинг, включить всё меню, выставить честные часы, добавить английские и русские названия.',
        'November to April, peaking in January: about 349,000 tourists on the island per day against 197,000 in June. Before November — build the rating, switch the whole menu on, set honest hours, add English and Russian item names.',
        'November–April, puncaknya Januari: rata-rata 349.000 turis di pulau per hari berbanding 197.000 di Juni. Sebelum November — kumpulkan rating, hidupkan seluruh menu, pasang jam buka yang jujur, tambahkan nama menu dalam bahasa Inggris dan Rusia.',
        'พฤศจิกายนถึงเมษายน พีคสุดมกราคม: มีนักท่องเที่ยวบนเกาะเฉลี่ยวันละ 349,000 คน เทียบกับ 197,000 คนในมิถุนายน ก่อนพฤศจิกายนต้องสะสมเรตติ้ง เปิดเมนูให้ครบ ตั้งเวลาเปิดปิดตามจริง และใส่ชื่อเมนูภาษาอังกฤษกับรัสเซีย'),
    ],
  ];

  return (
    <AnswerLayout
      h1={t('GrabFood в Таиланде: как устроена доставка для ресторана, сколько стоит и что показывают цифры Пхукета',
            'GrabFood in Thailand: how restaurant delivery works, what it costs, and what the Phuket numbers show',
            'GrabFood di Thailand: cara kerja delivery restoran, biayanya, dan apa yang ditunjukkan angka Phuket',
            'GrabFood ในประเทศไทย: เดลิเวอรี่ร้านอาหารทำงานอย่างไร ค่าใช้จ่ายเท่าไหร่ และตัวเลขจากภูเก็ตบอกอะไร')}
      lead={
        <>
          <p className="mb-4">
            {t('После ухода foodpanda в мае 2025 доставка еды в Таиланде — это два игрока: Grab (около 46% рынка) и LINE MAN Wongnai (около 40%); Robinhood без комиссии держит 2%. Grab берёт с ресторана 30% от заказа — опубликованный коридор 15–30%, у наших клиентов на Пхукете верхняя граница. Это одинаково для Бангкока, Паттайи, Самуи и Пхукета.',
               'Since foodpanda left in May 2025, food delivery in Thailand is a two-player market: Grab (about 46%) and LINE MAN Wongnai (about 40%); commission-free Robinhood holds 2%. Grab takes 30% of each order from the restaurant — the published range is 15–30%, and our Phuket clients sit at the top of it. This is the same in Bangkok, Pattaya, Samui and Phuket.',
               'Sejak foodpanda pergi pada Mei 2025, delivery makanan di Thailand adalah pasar dua pemain: Grab (sekitar 46%) dan LINE MAN Wongnai (sekitar 40%); Robinhood tanpa komisi memegang 2%. Grab mengambil 30% dari tiap pesanan — kisaran yang dipublikasikan 15–30%, dan klien kami di Phuket berada di batas atas. Ini sama di Bangkok, Pattaya, Samui, dan Phuket.',
               'หลัง foodpanda ถอนตัวในพฤษภาคม 2025 ตลาดเดลิเวอรี่อาหารในไทยเหลือผู้เล่นสองราย คือ Grab (ราว 46%) และ LINE MAN Wongnai (ราว 40%) ส่วน Robinhood ที่ไม่เก็บค่าคอมมิชชันถือครอง 2% Grab หักจากร้าน 30% ต่อออร์เดอร์ — ช่วงที่ประกาศคือ 15–30% และลูกค้าเราที่ภูเก็ตอยู่ที่ขอบบน ซึ่งเหมือนกันทั้งกรุงเทพฯ พัทยา สมุย และภูเก็ต')}
          </p>
          <p className="mb-4">
            {t('Чем Пхукет отличается — это сезон и туристический чек. По нашим аккаунтам на Пхукете за 12 месяцев: 11 403 заказа, средний чек 773 THB (≈$22.5 против ≈$15 на Бали), реклама 2,9% выручки с окупаемостью 23.6x, один негативный отзыв на 152 заказа. Туристов на острове в январе в 1,8 раза больше, чем в июне.',
               'What makes Phuket different is the season and the tourist basket. Across our Phuket accounts over 12 months: 11,403 orders, a 773 THB average order (≈$22.5 against ≈$15 in Bali), ads at 2.9% of revenue paying back 23.6x, one negative review per 152 orders. There are 1.8 times more tourists on the island in January than in June.',
               'Yang membedakan Phuket adalah musim dan nilai pesanan turis. Dari akun kami di Phuket selama 12 bulan: 11.403 pesanan, rata-rata 773 THB (≈$22.5 berbanding ≈$15 di Bali), iklan 2,9% dari omzet dengan balik modal 23.6x, satu ulasan negatif per 152 pesanan. Turis di pulau pada Januari 1,8 kali lebih banyak daripada Juni.',
               'สิ่งที่ทำให้ภูเก็ตต่างออกไปคือฤดูกาลและยอดต่อบิลของนักท่องเที่ยว จากบัญชีของเราที่ภูเก็ตตลอด 12 เดือน: 11,403 ออร์เดอร์ ยอดต่อบิลเฉลี่ย 773 บาท (≈$22.5 เทียบกับ ≈$15 ที่บาหลี) โฆษณา 2.9% ของรายได้ คืนทุน 23.6 เท่า รีวิวแย่ 1 ครั้งต่อ 152 ออร์เดอร์ นักท่องเที่ยวบนเกาะในมกราคมมากกว่ามิถุนายน 1.8 เท่า')}
          </p>
          <p>
            {t('Теряет пхукетский ресторан не на комиссии и не на рекламе, а на выключенных позициях меню в сезон — и это единственное, что полностью в его руках. Ниже — карта рынка, деньги, сезон по месяцам и районы с цифрами.',
               'A Phuket restaurant loses money not on commission or ads but on switched-off menu items in season — and that is the one thing entirely in its own hands. Below: the market map, the money, the season month by month, and the areas with numbers.',
               'Restoran di Phuket rugi bukan karena komisi atau iklan, melainkan karena item menu yang dimatikan saat musim ramai — dan itu satu-satunya hal yang sepenuhnya di tangan sendiri. Di bawah: peta pasar, uang, musim per bulan, dan area dengan angkanya.',
               'ร้านที่ภูเก็ตไม่ได้เสียเงินกับค่าคอมมิชชันหรือโฆษณา แต่เสียกับเมนูที่ถูกปิดไว้ในช่วงฤดูกาล — และนั่นคือสิ่งเดียวที่อยู่ในมือร้านทั้งหมด ด้านล่างคือแผนที่ตลาด เรื่องเงิน ฤดูกาลรายเดือน และย่านต่าง ๆ พร้อมตัวเลข')}
          </p>
        </>
      }
      meta={{ datePublished: '2026-09-15', minutes: 9 }}
      schemas={[
        faqPageSchema(faq),
        articleSchema({
          headline: t('GrabFood в Таиланде и цифры Пхукета: рынок, комиссия, сезон, районы',
                      'GrabFood in Thailand and the Phuket numbers: market, commission, season, areas',
                      'GrabFood di Thailand dan angka Phuket: pasar, komisi, musim, area',
                      'GrabFood ในไทยและตัวเลขภูเก็ต: ตลาด ค่าคอมมิชชัน ฤดูกาล ย่าน'),
          url: URL,
          about: 'GrabFood Thailand, GrabFood Phuket, LINE MAN, Grab commission Thailand, Phuket restaurant delivery, Phuket high season, Bang Tao, Rawai, Karon, Patong',
          datePublished: '2026-09-15',
          dateModified: '2026-09-15',
          language,
        }),
        {
          '@context': 'https://schema.org',
          '@type': 'Dataset',
          name: 'Phuket restaurant delivery, 12 months — Delivery Booster accounts',
          description: 'Orders, average order value, ad spend, ROAS, cancellations and negative-review frequency across GrabFood restaurants managed by Delivery Booster in Phuket, 1 September 2025 – 31 August 2026, plus average daily tourists on the island by month.',
          creator: { '@type': 'Organization', name: 'Delivery Booster', url: 'https://booster.delivery' },
          spatialCoverage: [
            { '@type': 'Place', name: 'Phuket, Thailand' },
            { '@type': 'Country', name: 'Thailand' },
          ],
          temporalCoverage: '2025-09-01/2026-08-31',
          url: URL,
          isBasedOn: 'https://phuketstats.booster.delivery/phuket-tourists',
        },
      ]}
    >

      <Block card title={t('Карта рынка Таиланда: кто остался', 'The Thailand market map: who is left', 'Peta pasar Thailand: siapa yang tersisa', 'แผนที่ตลาดไทย: ใครยังอยู่')}>
        <Table
          head={[t('Площадка', 'Platform', 'Platform', 'แพลตฟอร์ม'), t('Доля рынка', 'Market share', 'Pangsa pasar', 'ส่วนแบ่งตลาด'), t('Комиссия с ресторана', 'Restaurant commission', 'Komisi restoran', 'ค่าคอมมิชชันจากร้าน'), t('Статус', 'Status', 'Status', 'สถานะ')]}
          rows={market}
        />
        <p className="text-brand-muted max-w-3xl mt-6 mb-4">
          {t('Доли — оценка The Thaiger на май 2025; рынок 2024 года — около $4,2 млрд. Для ресторана это означает простую вещь: два приложения покрывают почти всех клиентов, и отказ от любого из них — минус четверть-половина доставки.',
             'Shares are The Thaiger’s estimate as of May 2025; the 2024 market was about $4.2 billion. For a restaurant this means one simple thing: two apps cover almost every customer, and dropping either one costs a quarter to a half of delivery.',
             'Pangsa pasar adalah perkiraan The Thaiger per Mei 2025; pasar 2024 sekitar $4,2 miliar. Bagi restoran artinya sederhana: dua aplikasi menjangkau hampir semua pelanggan, dan meninggalkan salah satunya berarti kehilangan seperempat sampai separuh delivery.',
             'ส่วนแบ่งเป็นการประเมินของ The Thaiger ณ พฤษภาคม 2025 ตลาดปี 2024 มีมูลค่าราว 4.2 พันล้านดอลลาร์ สำหรับร้านอาหารมันหมายความง่าย ๆ ว่าสองแอปครอบคลุมลูกค้าเกือบทั้งหมด และการถอนตัวจากแอปใดแอปหนึ่งคือเสียเดลิเวอรี่ไปหนึ่งในสี่ถึงครึ่งหนึ่ง')}
        </p>
        <p className="text-brand-muted max-w-3xl">
          {t('Мы ведём аккаунты GrabFood. Про LINE MAN на этой странице — только то, что владельцу нужно знать для решений; как услугу мы его не предлагаем.',
             'We manage GrabFood accounts. LINE MAN appears on this page only as far as an owner needs it for decisions; we do not offer it as a service.',
             'Kami mengelola akun GrabFood. LINE MAN muncul di halaman ini hanya sejauh yang perlu diketahui pemilik untuk mengambil keputusan; kami tidak menawarkannya sebagai layanan.',
             'เราดูแลบัญชี GrabFood ส่วน LINE MAN ในหน้านี้พูดถึงเท่าที่เจ้าของร้านต้องรู้เพื่อตัดสินใจเท่านั้น เราไม่ได้ให้บริการดูแล LINE MAN')}
        </p>
      </Block>

      <Block title={t('Сколько это стоит', 'What it costs', 'Berapa biayanya', 'ค่าใช้จ่ายเท่าไหร่')}>
        <p className="text-brand-muted max-w-3xl mb-4">
          {t('Grab в Таиланде — одна из немногих площадок региона, которая называет ставку публично: 15–30%, и в собственном разборе приводит пример с 30%. У ресторанов, которые мы ведём на Пхукете, стоит 30%. LINE MAN по открытым данным — 25–30%. Подключение на обеих площадках бесплатное, комиссия удерживается при выплате.',
             'Grab Thailand is one of the few platforms in the region that states its rate publicly: 15–30%, with its own explainer walking through a 30% example. The restaurants we manage in Phuket are on 30%. LINE MAN, per public sources, is 25–30%. Signing up on both is free; the commission is deducted at payout.',
             'Grab Thailand adalah salah satu dari sedikit platform di kawasan ini yang menyebut tarifnya terbuka: 15–30%, dan penjelasan mereka sendiri memakai contoh 30%. Restoran yang kami kelola di Phuket berada di 30%. LINE MAN, menurut sumber terbuka, 25–30%. Pendaftaran di keduanya gratis; komisi dipotong saat pencairan.',
             'Grab ประเทศไทยเป็นหนึ่งในไม่กี่แพลตฟอร์มในภูมิภาคที่ประกาศอัตราต่อสาธารณะ คือ 15–30% และในบทอธิบายของตัวเองก็ยกตัวอย่างที่ 30% ร้านที่เราดูแลในภูเก็ตอยู่ที่ 30% ส่วน LINE MAN ตามข้อมูลสาธารณะอยู่ที่ 25–30% สมัครฟรีทั้งสองแพลตฟอร์ม หักค่าคอมมิชชันตอนโอนเงิน')}
        </p>
        <p className="text-brand-muted max-w-3xl mb-4">
          {t('Что покупается за 30%: клиентская база двух приложений, курьеры, платежи, поддержка, показы в поиске и подборках. Что за 30% не покупается: место в выдаче. Оно зависит от рейтинга, скорости принятия заказа, полноты меню и доли отмен — то есть от того, как ведётся аккаунт.',
             'What 30% buys: the customer base of two apps, couriers, payments, support, placement in search and collections. What 30% does not buy: your position in the feed. That depends on rating, order acceptance speed, menu completeness and cancellation rate — in other words, on how the account is run.',
             'Yang dibeli dengan 30%: basis pelanggan dua aplikasi, kurir, pembayaran, dukungan, tampil di pencarian dan koleksi. Yang tidak dibeli dengan 30%: posisi di feed. Itu tergantung rating, kecepatan menerima pesanan, kelengkapan menu, dan tingkat pembatalan — dengan kata lain, cara akun dikelola.',
             'สิ่งที่ 30% ซื้อได้: ฐานลูกค้าของสองแอป ไรเดอร์ ระบบชำระเงิน ฝ่ายสนับสนุน การแสดงผลในการค้นหาและคอลเลกชัน สิ่งที่ 30% ซื้อไม่ได้: ตำแหน่งในฟีด ซึ่งขึ้นกับเรตติ้ง ความเร็วในการรับออร์เดอร์ ความครบของเมนู และสัดส่วนการยกเลิก หรือก็คือวิธีดูแลบัญชีนั่นเอง')}
        </p>
        <p className="text-brand-muted max-w-3xl">
          {t('Периодически площадки предлагают пониженную ставку в обмен на эксклюзив. На Пхукете это значит отдать всю выручку LINE MAN или всю выручку Grab ради нескольких процентов скидки. Мы не видели ни одного случая, где это окупилось. Подробнее про структуру расходов — в ',
             'Platforms periodically offer a lower rate in exchange for exclusivity. In Phuket that means giving up all your LINE MAN revenue or all your Grab revenue for a few points of discount. We have not seen a single case where it paid off. More on the cost structure in ',
             'Platform sesekali menawarkan tarif lebih rendah sebagai ganti eksklusivitas. Di Phuket itu berarti melepas seluruh omzet LINE MAN atau seluruh omzet Grab demi potongan beberapa persen. Kami belum pernah melihat satu kasus pun yang balik modal. Struktur biaya selengkapnya di ',
             'แพลตฟอร์มเสนออัตราถูกลงแลกกับการผูกขาดเป็นครั้งคราว ที่ภูเก็ตแปลว่าสละรายได้จาก LINE MAN ทั้งหมด หรือจาก Grab ทั้งหมด เพื่อส่วนลดไม่กี่เปอร์เซ็นต์ เรายังไม่เคยเห็นกรณีไหนที่คุ้ม อ่านโครงสร้างค่าใช้จ่ายเพิ่มเติมได้ที่ ')}
          <Link href="/answers/grabfood-gofood-fees-indonesia" className="text-brand-green hover:underline">
            {t('разборе комиссии и расходов', 'the commission and costs breakdown', 'uraian komisi dan biaya', 'บทวิเคราะห์ค่าคอมมิชชันและค่าใช้จ่าย')}
          </Link>
          .
        </p>
      </Block>

      <Block card title={t('Пхукет против Бали: цифры', 'Phuket versus Bali: the numbers', 'Phuket versus Bali: angkanya', 'ภูเก็ตเทียบกับบาหลี: ตัวเลข')}>
        <Table
          head={[t('Показатель', 'Metric', 'Metrik', 'ตัวชี้วัด'), t('Бали (бенчмарк, 84 ресторана)', 'Bali (benchmark, 84 restaurants)', 'Bali (benchmark, 84 restoran)', 'บาหลี (เบนช์มาร์ก 84 ร้าน)'), t('Пхукет (наши аккаунты, 12 мес.)', 'Phuket (our accounts, 12 months)', 'Phuket (akun kami, 12 bulan)', 'ภูเก็ต (บัญชีของเรา 12 เดือน)')]}
          rows={bench}
        />
        <p className="text-brand-muted max-w-3xl mt-6 mb-4">
          {t('Пхукет — это Бали несколькими годами раньше: меньше ресторанов на ту же аудиторию, дешевле показы, выше чек. Реклама на 253 тысячи бат за год вернула 6 миллионов — при этом почти никто из наших пхукетских ресторанов не тратит на неё больше 4% выручки.',
             'Phuket is Bali a few years earlier: fewer restaurants for the same audience, cheaper impressions, a higher basket. Ads of 253,000 baht over the year brought back 6 million — and almost none of our Phuket restaurants spends more than 4% of revenue on them.',
             'Phuket adalah Bali beberapa tahun lebih awal: lebih sedikit restoran untuk audiens yang sama, tayangan lebih murah, nilai pesanan lebih tinggi. Iklan 253.000 baht setahun mengembalikan 6 juta — dan hampir tak satu pun restoran kami di Phuket mengeluarkan lebih dari 4% omzet untuk iklan.',
             'ภูเก็ตคือบาหลีเมื่อไม่กี่ปีก่อน ร้านที่แย่งลูกค้ากลุ่มเดียวกันน้อยกว่า การแสดงผลถูกกว่า ยอดต่อบิลสูงกว่า โฆษณา 253,000 บาทตลอดปีคืนกลับมา 6 ล้านบาท และแทบไม่มีร้านของเราในภูเก็ตร้านไหนใช้โฆษณาเกิน 4% ของรายได้')}
        </p>
        <p className="text-brand-muted max-w-3xl">
          {t('Оговорка честная: пхукетских аккаунтов у нас на порядок меньше, чем балийских, и эти цифры менее устойчивы. Но направление разницы держится с первого месяца наблюдений. Отмены — 4 заказа из 11 403 за год: на Пхукете курьерская логистика плотнее, чем на Бали.',
             'An honest caveat: we have an order of magnitude fewer accounts in Phuket than in Bali, and these numbers are less stable. But the direction of the difference has held since the first month of observation. Cancellations — 4 orders out of 11,403 in a year: courier logistics in Phuket are tighter than in Bali.',
             'Catatan jujur: akun kami di Phuket jauh lebih sedikit daripada di Bali, dan angka ini kurang stabil. Tapi arah perbedaannya bertahan sejak bulan pertama pengamatan. Pembatalan — 4 pesanan dari 11.403 dalam setahun: logistik kurir di Phuket lebih rapat daripada di Bali.',
             'บอกตรง ๆ ว่าบัญชีของเราในภูเก็ตมีน้อยกว่าบาหลีมาก ตัวเลขจึงนิ่งน้อยกว่า แต่ทิศทางของความต่างคงที่ตั้งแต่เดือนแรกที่เก็บข้อมูล ยกเลิกเพียง 4 ออร์เดอร์จาก 11,403 ในหนึ่งปี แสดงว่าระบบไรเดอร์ที่ภูเก็ตแน่นกว่าบาหลี')}
        </p>
      </Block>

      <Block title={t('Сезон: сколько туристов на острове по месяцам', 'The season: tourists on the island by month', 'Musim: turis di pulau per bulan', 'ฤดูกาล: นักท่องเที่ยวบนเกาะรายเดือน')}>
        <p className="text-brand-muted max-w-3xl mb-6">
          {t('Среднее число туристов, находящихся на Пхукете в день, по месяцам — из нашего трекера ',
             'Average number of tourists on Phuket per day, by month — from our tracker ',
             'Rata-rata jumlah turis yang berada di Phuket per hari, per bulan — dari pelacak kami ',
             'จำนวนนักท่องเที่ยวที่อยู่บนเกาะภูเก็ตเฉลี่ยต่อวัน แยกรายเดือน จากตัวติดตามของเรา ')}
          <a href="https://phuketstats.booster.delivery/phuket-tourists" className="text-brand-green hover:underline" rel="noopener">Phuket Stats</a>
          {t(' (иммиграционные данные и прилёты).', ' (immigration data and arrivals).', ' (data imigrasi dan kedatangan).', ' (ข้อมูลตรวจคนเข้าเมืองและเที่ยวบินขาเข้า)')}
        </p>
        <Table
          head={[t('Месяц', 'Month', 'Bulan', 'เดือน'), t('Туристов на острове в день', 'Tourists on the island per day', 'Turis di pulau per hari', 'นักท่องเที่ยวบนเกาะต่อวัน')]}
          rows={season}
        />
        <p className="text-brand-muted max-w-3xl mt-6 mb-4">
          {t('Пик — январь, дно — июнь, разница 1,8 раза. Ноябрь и декабрь — вход в сезон, апрель — выход. Самая большая группа — россияне: 162 тысячи в январе против 93 тысяч в июле, средний срок пребывания 42 дня; плюс около 30 тысяч постоянно живущих. Дальше Китай, Индия, Британия, Казахстан, Германия. Практический вывод для меню: английские и русские названия позиций и фото на каждую — без этого турист меню не открывает.',
             'Peak in January, trough in June, a 1.8x swing. November and December are the way in, April the way out. The largest group is Russians: 162,000 in January against 93,000 in July, average stay 42 days, plus about 30,000 permanent residents. Then China, India, the UK, Kazakhstan, Germany. The practical conclusion for a menu: English and Russian item names and a photo on every item — without them a tourist does not open the menu.',
             'Puncaknya Januari, terendah Juni, selisih 1,8 kali. November dan Desember adalah pintu masuk musim, April pintu keluarnya. Kelompok terbesar adalah orang Rusia: 162.000 pada Januari berbanding 93.000 pada Juli, rata-rata tinggal 42 hari, ditambah sekitar 30.000 penduduk tetap. Lalu Tiongkok, India, Inggris, Kazakhstan, Jerman. Kesimpulan praktis untuk menu: nama item dalam bahasa Inggris dan Rusia serta foto di tiap item — tanpa itu turis tidak membuka menu.',
             'พีคที่มกราคม ต่ำสุดที่มิถุนายน ต่างกัน 1.8 เท่า พฤศจิกายนและธันวาคมคือช่วงเข้าฤดู เมษายนคือช่วงออก กลุ่มใหญ่ที่สุดคือชาวรัสเซีย 162,000 คนในมกราคม เทียบกับ 93,000 คนในกรกฎาคม พักเฉลี่ย 42 วัน บวกผู้พำนักถาวรอีกราว 30,000 คน รองลงมาคือจีน อินเดีย สหราชอาณาจักร คาซัคสถาน เยอรมนี ข้อสรุปเชิงปฏิบัติสำหรับเมนู: ต้องมีชื่อเมนูภาษาอังกฤษและรัสเซีย พร้อมรูปทุกรายการ ไม่อย่างนั้นนักท่องเที่ยวจะไม่เปิดดูเมนูเลย')}
        </p>
        <p className="text-brand-muted max-w-3xl mb-4">
          {t('В сезон растёт спрос, а вместе с ним — цена каждой ошибки: выключенная позиция в январе стоит почти вдвое дороже, чем в июне. Рейтинг нужно набрать до сезона, потому что поток отзывов в сезон размывает любые усилия. Рекламы в сезон нужно меньше, чем кажется: окупаемость выше 20x — это признак недоиспользованного бюджета, а не сигнал его наращивать сверх точки перелома в 6% выручки.',
             'In season demand rises, and with it the cost of every mistake: a switched-off item in January costs almost twice what it costs in June. The rating has to be built before the season, because the flood of in-season reviews dilutes any effort. Ads are needed less in season than it seems: a payback above 20x is a sign of an under-used budget, not a signal to push it past the 6%-of-revenue break point.',
             'Saat musim ramai, permintaan naik dan begitu pula harga tiap kesalahan: item yang dimatikan pada Januari harganya hampir dua kali lipat Juni. Rating harus dikumpulkan sebelum musim, karena banjir ulasan saat musim ramai mengencerkan usaha apa pun. Iklan saat musim ramai dibutuhkan lebih sedikit dari yang tampak: balik modal di atas 20x adalah tanda anggaran belum terpakai penuh, bukan sinyal untuk mendorongnya melewati titik balik 6% dari omzet.',
             'ในฤดูกาล ความต้องการเพิ่มขึ้น และราคาของความผิดพลาดทุกครั้งก็เพิ่มตาม เมนูที่ถูกปิดในมกราคมแพงกว่ามิถุนายนเกือบเท่าตัว ต้องสะสมเรตติ้งให้ได้ก่อนฤดูกาล เพราะรีวิวที่ทะลักเข้ามาช่วงนั้นจะกลบทุกความพยายาม โฆษณาในฤดูกาลจำเป็นน้อยกว่าที่คิด การคืนทุนเกิน 20 เท่าคือสัญญาณว่างบยังใช้ไม่เต็ม ไม่ใช่สัญญาณให้ดันเกินจุดหักเหที่ 6% ของรายได้')}
        </p>
        <p className="text-brand-muted max-w-3xl">
          {t('В низкий сезон наоборот: меню сокращать, а не выключать позиции «до лучших времён»; часы работы в приложении держать честными, потому что отменённый заказ бьёт по позиции в выдаче сильнее, чем закрытый ресторан.',
             'In low season it is the reverse: shorten the menu rather than switching items off "until better times"; keep the app’s opening hours honest, because a cancelled order hurts your feed position more than a closed restaurant does.',
             'Saat musim sepi kebalikannya: pendekkan menu, bukan mematikan item "sampai keadaan membaik"; jaga jam buka di aplikasi tetap jujur, karena pesanan yang dibatalkan merusak posisi di feed lebih parah daripada restoran yang tutup.',
             'ช่วงโลว์ซีซันกลับกัน คือให้ตัดเมนูให้สั้นลง ไม่ใช่ปิดเมนูไว้ "รอเวลาที่ดีกว่า" และตั้งเวลาเปิดปิดในแอปตามจริง เพราะออร์เดอร์ที่ถูกยกเลิกทำร้ายตำแหน่งในฟีดมากกว่าร้านที่ปิดอยู่')}
        </p>
      </Block>

      <Block card title={t('Районы: чек и объём по нашим аккаунтам', 'Areas: basket and volume across our accounts', 'Area: nilai pesanan dan volume di akun kami', 'ย่านต่าง ๆ: ยอดต่อบิลและปริมาณจากบัญชีของเรา')}>
        <p className="text-brand-muted max-w-3xl mb-6">
          {t('Grab доставляет в радиусе от ресторана, а Пхукет — вытянутый остров: ресторан в Раваи не существует для клиента в Патонге. Выбор района — это выбор чека, конкуренции и сезонности. По нашим аккаунтам за 12 месяцев:',
             'Grab delivers within a radius of the restaurant, and Phuket is a long island: a restaurant in Rawai does not exist for a customer in Patong. Choosing an area is choosing a basket, a level of competition and a seasonality. Across our accounts over 12 months:',
             'Grab mengantar dalam radius dari restoran, dan Phuket adalah pulau memanjang: restoran di Rawai tidak ada bagi pelanggan di Patong. Memilih area berarti memilih nilai pesanan, tingkat persaingan, dan musimnya. Dari akun kami selama 12 bulan:',
             'Grab ส่งในรัศมีจากร้าน และภูเก็ตเป็นเกาะทอดยาว ร้านที่ราไวย์ไม่มีตัวตนสำหรับลูกค้าที่ป่าตอง การเลือกย่านคือการเลือกยอดต่อบิล ระดับการแข่งขัน และฤดูกาล จากบัญชีของเราตลอด 12 เดือน:')}
        </p>
        <Table
          head={[t('Район', 'Area', 'Area', 'ย่าน'), t('Ресторанов', 'Restaurants', 'Restoran', 'ร้าน'), t('Заказов за год', 'Orders per year', 'Pesanan per tahun', 'ออร์เดอร์ต่อปี'), t('Средний чек', 'Average order', 'Rata-rata pesanan', 'ยอดต่อบิลเฉลี่ย')]}
          rows={areas}
        />
        <p className="text-brand-muted max-w-3xl mt-6 mb-4">
          {t('Две картины. Банг Тао и Лагуна — чек на 30% выше, чем в Раваи: виллы, семьи, длинные проживания. Раваи и Най Харн — самый большой объём на ресторан: 2 300 заказов в год против 1 000 в Банг Тао, за счёт экспатов и зимовщиков, которые заказывают круглый год. Карон — между ними по чеку, туристический поток в сезон.',
             'Two pictures. Bang Tao and Laguna — a basket 30% higher than Rawai: villas, families, long stays. Rawai and Nai Harn — the largest volume per restaurant: 2,300 orders a year against 1,000 in Bang Tao, driven by expats and winter residents who order year-round. Karon sits between them on basket, with tourist flow in season.',
             'Dua gambaran. Bang Tao dan Laguna — nilai pesanan 30% lebih tinggi daripada Rawai: vila, keluarga, tinggal lama. Rawai dan Nai Harn — volume terbesar per restoran: 2.300 pesanan setahun berbanding 1.000 di Bang Tao, didorong ekspatriat dan penghuni musim dingin yang memesan sepanjang tahun. Karon di antara keduanya untuk nilai pesanan, dengan arus turis saat musim ramai.',
             'ภาพสองแบบ บางเทาและลากูน่า ยอดต่อบิลสูงกว่าราไวย์ 30% เพราะเป็นวิลล่า ครอบครัว และผู้พักระยะยาว ส่วนราไวย์และในหานมีปริมาณต่อร้านมากที่สุด 2,300 ออร์เดอร์ต่อปี เทียบกับ 1,000 ที่บางเทา จากชาวต่างชาติที่อาศัยอยู่และคนมาหนีหนาวซึ่งสั่งตลอดทั้งปี กะรนอยู่ระหว่างกลางในเรื่องยอดต่อบิล และมีนักท่องเที่ยวไหลเข้าช่วงฤดูกาล')}
        </p>
        <p className="text-brand-muted max-w-3xl">
          {t('Чалонг и Патонг в таблице — по одному-двум ресторанам, это ориентир, а не норма. Пхукет-Таун — местный клиент и тайская цена: чек ниже 500 THB, и в туристическую логику этой страницы он не укладывается.',
             'Chalong and Patong in the table are one or two restaurants each — a pointer, not a norm. Phuket Town is a local customer and a Thai price: baskets under 500 THB, and it does not fit the tourist logic of this page.',
             'Chalong dan Patong di tabel hanya satu-dua restoran — petunjuk, bukan norma. Phuket Town adalah pelanggan lokal dan harga Thailand: nilai pesanan di bawah 500 THB, dan tidak masuk logika turis halaman ini.',
             'ฉลองและป่าตองในตารางมีเพียงร้านละหนึ่งถึงสองร้าน เป็นแค่แนวทาง ไม่ใช่ค่ามาตรฐาน ส่วนตัวเมืองภูเก็ตเป็นลูกค้าท้องถิ่นและราคาแบบไทย ยอดต่อบิลต่ำกว่า 500 บาท และไม่เข้ากับตรรกะนักท่องเที่ยวของหน้านี้')}
        </p>
      </Block>

      <Block title={t('Мало заказов на Grab на Пхукете: с чего начинать', 'Few Grab orders in Phuket: where to start', 'Pesanan Grab sepi di Phuket: mulai dari mana', 'ออร์เดอร์ Grab น้อยที่ภูเก็ต: เริ่มจากตรงไหน')}>
        <p className="text-brand-muted max-w-3xl mb-4">
          {t('Тот же порядок, что и везде, с пхукетскими поправками. Полный разбор — в статье ',
             'The same order as anywhere, with Phuket adjustments. The full breakdown is in ',
             'Urutan yang sama seperti di mana pun, dengan penyesuaian Phuket. Uraian lengkapnya di ',
             'ลำดับเดียวกับที่อื่น แต่ปรับให้เข้ากับภูเก็ต อ่านฉบับเต็มได้ที่ ')}
          <Link href="/answers/few-orders-grabfood-gofood" className="text-brand-green hover:underline">
            {t('мало заказов — пять шагов', 'few orders — five steps', 'orderan sepi — lima langkah', 'ออร์เดอร์น้อย — ห้าขั้นตอน')}
          </Link>
          .
        </p>
        <ol className="list-decimal pl-5 space-y-3 text-brand-muted max-w-3xl">
          <li>{t('Открыть отчёт по выключенным позициям за 30 дней. На Пхукете это 6% выручки в среднем; у отдельных ресторанов больше.', 'Open the 30-day report on switched-off items. In Phuket that is 6% of revenue on average; at some restaurants more.', 'Buka laporan item yang dimatikan selama 30 hari. Di Phuket rata-rata 6% dari omzet; di beberapa restoran lebih.', 'เปิดรายงานเมนูที่ถูกปิดย้อนหลัง 30 วัน ที่ภูเก็ตเฉลี่ย 6% ของรายได้ บางร้านมากกว่านั้น')}</li>
          <li>{t('Проверить долю отмен и время принятия заказа — это двигает место в выдаче на обеих площадках.', 'Check the cancellation rate and order acceptance time — these move your feed position on both platforms.', 'Periksa tingkat pembatalan dan waktu penerimaan pesanan — ini menggerakkan posisi di feed pada kedua platform.', 'ตรวจสัดส่วนการยกเลิกและเวลารับออร์เดอร์ สองอย่างนี้ขยับตำแหน่งในฟีดของทั้งสองแพลตฟอร์ม')}</li>
          <li>{t('Рейтинг и последние 20 отзывов: одна единица стоит двадцати пятёрок, и в сезон исправить это некогда.', 'The rating and the last 20 reviews: one one-star costs twenty five-stars, and in season there is no time to fix it.', 'Rating dan 20 ulasan terakhir: satu bintang satu setara dua puluh bintang lima, dan saat musim ramai tidak ada waktu memperbaikinya.', 'เรตติ้งและรีวิว 20 รายการล่าสุด หนึ่งดาวหนึ่งครั้งมีราคาเท่าห้าดาวยี่สิบครั้ง และในฤดูกาลไม่มีเวลาแก้')}</li>
          <li>{t('Меню: английские и русские названия, фото на каждую позицию, цены в сезон и вне сезона.', 'The menu: English and Russian names, a photo on every item, in-season and off-season prices.', 'Menu: nama Inggris dan Rusia, foto di tiap item, harga musim ramai dan musim sepi.', 'เมนู: ชื่อภาษาอังกฤษและรัสเซีย รูปทุกรายการ ราคาช่วงฤดูกาลและนอกฤดูกาล')}</li>
          <li>{t('Только после этого — реклама, и не выше точки перелома в 6% выручки.', 'Only then ads — and not above the 6%-of-revenue break point.', 'Baru setelah itu iklan — dan tidak melewati titik balik 6% dari omzet.', 'ค่อยถึงคิวโฆษณา และไม่เกินจุดหักเหที่ 6% ของรายได้')}</li>
        </ol>
      </Block>

      <Block card title={t('Кто это делает', 'Who does this', 'Siapa yang mengerjakannya', 'ใครเป็นคนทำ')}>
        <p className="text-brand-muted max-w-3xl mb-4">
          {t('Delivery Booster ведёт аккаунты GrabFood для ресторанов на Пхукете и на Бали — 110+ ресторанов под управлением; в Таиланде у нас своя команда с директором по стране. Ведём только GrabFood: если вам нужен LINE MAN, мы скажем честно, что это не к нам.',
             'Delivery Booster manages GrabFood accounts for restaurants in Phuket and in Bali — 110+ restaurants under management; in Thailand we have our own team with a country director. GrabFood only: if you need LINE MAN, we will tell you honestly that it is not us.',
             'Delivery Booster mengelola akun GrabFood untuk restoran di Phuket dan Bali — 110+ restoran; di Thailand kami punya tim sendiri dengan direktur negara. Hanya GrabFood: kalau Anda butuh LINE MAN, kami akan bilang jujur bahwa itu bukan kami.',
             'Delivery Booster ดูแลบัญชี GrabFood ให้ร้านอาหารในภูเก็ตและบาหลี รวมกว่า 110 ร้าน ในประเทศไทยเรามีทีมของตัวเองพร้อมผู้อำนวยการประจำประเทศ เราดูแลเฉพาะ GrabFood ถ้าคุณต้องการ LINE MAN เราจะบอกตรง ๆ ว่าไม่ใช่เรา')}
        </p>
        <p className="text-brand-muted max-w-3xl">
          {t('Все цифры на этой странице — из кабинетов наших клиентов и из нашего трекера туристов, не из примеров. Разница между своим менеджером и агентством разобрана отдельно: ',
             'Every number on this page comes from our clients’ dashboards and our tourist tracker, not from illustrations. The difference between an in-house manager and an agency is covered separately: ',
             'Semua angka di halaman ini berasal dari dashboard klien kami dan pelacak turis kami, bukan dari ilustrasi. Beda manajer internal dan agensi dibahas terpisah: ',
             'ตัวเลขทั้งหมดในหน้านี้มาจากแดชบอร์ดของลูกค้าเราและตัวติดตามนักท่องเที่ยวของเรา ไม่ใช่ตัวอย่างสมมติ ความต่างระหว่างผู้จัดการประจำกับเอเจนซีอ่านแยกได้ที่ ')}
          <Link href="/answers/in-house-manager-vs-agency" className="text-brand-green hover:underline">
            {t('кому отдать GrabFood', 'who should run GrabFood', 'siapa yang sebaiknya mengelola GrabFood', 'ใครควรดูแล GrabFood')}
          </Link>
          .
        </p>
      </Block>

      <FaqList faq={faq} title={t('Частые вопросы', 'Frequently asked', 'Pertanyaan umum', 'คำถามที่พบบ่อย')} />

      <KeepReading currentHref="/answers/grabfood-phuket-thailand" />

      <AnswerCta />
    </AnswerLayout>
  );
}
