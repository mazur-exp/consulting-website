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

const URL = 'https://booster.delivery/answers/grabfood-ads-not-working';

/** Answer page for the live complaint "I pay for GrabFood ads but orders are
 *  not increasing" (ID: "udh pkai iklan, tetap sepi"). Diagnostic order first,
 *  then the real dashboard numbers behind each step. */
export default function AnswersAdsNotWorkingPage() {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ru'
        ? 'Плачу за рекламу в GrabFood, а заказов больше нет — почему'
        : language === 'id'
          ? 'Saya bayar iklan GrabFood, tapi pesanan tidak bertambah — kenapa?'
          : 'I’m paying for GrabFood ads but orders are not increasing — why?';
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = URL;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description)
      description.content =
        language === 'ru'
          ? 'Реклама покупает показы, а не заказы. Порядок диагностики: доступность, конверсия карточки, экономика промо, рейтинг — и только потом ставки. С реальными цифрами кабинетов: конверсия 0.5% → 1.9%, ROAS 0.25x → 15.52x.'
          : language === 'id'
            ? 'Iklan membeli tayangan, bukan pesanan. Urutan diagnosisnya: ketersediaan, konversi listing, ekonomi promo, rating — dan baru setelah itu bid. Dengan angka nyata dari dashboard: konversi 0.5% → 1.9%, ROAS 0.25x → 15.52x.'
            : 'Ads buy impressions, not orders. The diagnostic order: availability, listing conversion, promo economics, rating — and only then bids. With real dashboard numbers: conversion 0.5% → 1.9%, ROAS 0.25x → 15.52x.';
    syncOpenGraph();
  }, [language]);

  const steps: Array<[string, string]> = [
    [
      t('1. Доступность: офлайн-часы и отмены',
        '1. Availability: offline hours and cancellations',
        '1. Ketersediaan: jam offline dan pembatalan'),
      t('Самая частая и самая дорогая причина. Пока ресторан офлайн, реклама либо не крутится, либо ведёт в закрытую карточку, а алгоритм запоминает ненадёжность и режет органические показы. У USSR Phuket было 3 977 минут офлайна в месяц; после того как их убрали, показы в поиске выросли с нуля до 7 481 в месяц. У Enjoy Healthy Food доля офлайна была 73% — после доведения до 0% показы выросли с 7 038 до 25 543 в месяц.',
        'The most common and most expensive cause. While the restaurant is offline, ads either do not run or lead to a closed listing — and the algorithm remembers the unreliability and cuts organic impressions. USSR Phuket had 3,977 offline minutes a month; once removed, search impressions went from zero to 7,481 a month. Enjoy Healthy Food had a 73% offline rate — brought to 0%, impressions grew from 7,038 to 25,543 a month.',
        'Penyebab paling sering dan paling mahal. Selama restoran offline, iklan tidak berjalan atau justru mengarah ke listing yang tutup — dan algoritma mengingat ketidakandalan itu lalu memotong tayangan organik. USSR Phuket punya 3,977 menit offline per bulan; setelah itu dihilangkan, tayangan di pencarian naik dari nol ke 7,481 per bulan. Enjoy Healthy Food punya porsi offline 73% — setelah dibawa ke 0%, tayangan naik dari 7,038 ke 25,543 per bulan.'),
    ],
    [
      t('2. Конверсия карточки: смотрят, но не заказывают',
        '2. Listing conversion: they look but do not order',
        '2. Konversi listing: dilihat, tapi tidak dipesan'),
      t('Если показы есть, а заказов нет, реклама ни при чём — не работает карточка. У Etna Phuket карточку видели 39 211 человек в месяц, заказ делали 182: сквозная конверсия 0.5% при средней по нашему флоту 0.9%. Меню открывали только 5.2% увидевших. Пока это не починено, каждый вложенный в рекламу доллар покупает ещё один просмотр без заказа.',
        'If impressions are there and orders are not, ads are not the problem — the listing is. At Etna Phuket, 39,211 people saw the listing monthly and 182 ordered: 0.5% through-conversion against our 0.9% fleet average. Only 5.2% of viewers even opened the menu. Until that is fixed, every ad dollar buys one more look without an order.',
        'Kalau tayangan ada tetapi pesanan tidak, masalahnya bukan iklan — melainkan listing. Di Etna Phuket, 39,211 orang melihat listing per bulan dan 182 memesan: konversi menyeluruh 0.5% terhadap rata-rata 0.9% di portofolio kami. Hanya 5.2% dari yang melihat sampai membuka menu. Selama itu belum diperbaiki, setiap dolar iklan hanya membeli satu tampilan lagi tanpa pesanan.'),
    ],
    [
      t('3. Экономика промо: скидка ради скидки',
        '3. Promo economics: discounting for its own sake',
        '3. Ekonomi promo: diskon demi diskon'),
      t('Промо поднимает позицию в выдаче и режет маржу одновременно. Считать надо не «сколько заказов пришло по акции», а сколько осталось после скидки, комиссии площадки и стоимости рекламы. Промо, которое не окупается, выглядит как рост заказов и работает как убыток.',
        'A promo lifts your position and cuts your margin at the same time. What matters is not "how many orders the promo brought" but what is left after the discount, the platform commission and the ad spend. A promo that does not pay back looks like order growth and behaves like a loss.',
        'Promo menaikkan posisi Anda dan memotong margin pada saat yang sama. Yang penting bukan "berapa pesanan yang datang dari promo", melainkan berapa yang tersisa setelah diskon, komisi platform, dan biaya iklan. Promo yang tidak balik modal terlihat seperti pertumbuhan pesanan dan bekerja seperti kerugian.'),
    ],
    [
      t('4. Рейтинг и отзывы',
        '4. Rating and reviews',
        '4. Rating dan ulasan'),
      t('С 4.8 алгоритм отдаёт показы щедрее, и человек, выбирающий между двумя карточками, смотрит на цифру рядом с названием. Реклама приводит его к карточке — рейтинг решает, закажет ли он. У USSR Phuket рейтинг вырос с 4.5 до 4.8, у Zaytun Ubud — с 4.67 до 4.8.',
        'From 4.8 the algorithm serves impressions more generously, and a customer choosing between two listings looks at the number next to the name. Ads bring them to the listing; the rating decides whether they order. USSR Phuket went from 4.5 to 4.8, Zaytun Ubud from 4.67 to 4.8.',
        'Mulai dari 4.8 algoritma memberi tayangan lebih murah hati, dan pelanggan yang memilih di antara dua listing melihat angka di sebelah nama. Iklan membawa mereka ke listing; rating yang menentukan apakah mereka memesan. USSR Phuket naik dari 4.5 ke 4.8, Zaytun Ubud dari 4.67 ke 4.8.'),
    ],
    [
      t('5. И только теперь — сама реклама',
        '5. And only now — the ads themselves',
        '5. Dan baru sekarang — iklannya sendiri'),
      t('Автоставка набирает дешёвые нерелевантные показы: платите за тех, кто не кликает. У Etna мы перешли на ручной CPO с ежедневным ведением — CTR вырос с 2.8% до 5.59%, стоимость заказа упала с 42 до 29 бат, ROAS с 14.75x до 34.57x. Бюджет при этом подняли всего на 50%, а выручка с рекламы выросла в 3.4 раза. У Zaytun Ubud кампании GoFood шли в убыток с ROAS 0.25x — потратили 3,1 млн рупий, вернули 763 тысячи; после пересборки ROAS 15.52x при почти том же бюджете.',
        'Auto-bidding buys cheap, irrelevant impressions: you pay for people who do not click. At Etna we switched to manual CPO with daily management — CTR went from 2.8% to 5.59%, cost per order from 42 to 29 THB, ROAS from 14.75x to 34.57x. The budget rose only 50% while ads revenue grew 3.4x. At Zaytun Ubud, GoFood campaigns were losing money at 0.25x ROAS — Rp 3.1M spent, Rp 763K returned; after the rebuild, 15.52x on nearly the same budget.',
        'Bid otomatis mengumpulkan tayangan murah yang tidak relevan: Anda membayar orang yang tidak mengklik. Di Etna kami beralih ke CPO manual dengan pengelolaan harian — CTR naik dari 2.8% ke 5.59%, biaya per pesanan turun dari 42 ke 29 THB, ROAS dari 14.75x ke 34.57x. Anggaran hanya naik 50%, sementara omzet dari iklan tumbuh 3.4x. Di Zaytun Ubud kampanye GoFood merugi dengan ROAS 0.25x — Rp 3.1M keluar, Rp 763K kembali; setelah dirakit ulang, 15.52x dengan anggaran yang hampir sama.'),
    ],
  ];

  const faq: Array<[string, string]> = [
    [
      t('Какой ROAS в GrabAds считать нормальным?',
        'What ROAS should I expect from GrabAds?',
        'ROAS berapa yang wajar diharapkan dari GrabAds?'),
      t('Наши клиенты держат 20–27x, в отдельных кампаниях выше. Но ROAS без контекста обманчив: он считается по выручке с рекламы и не учитывает скидку, комиссию площадки и то, что часть этих заказов пришла бы и без рекламы. Смотреть надо на связку ROAS + сквозная конверсия + маржа после промо.',
        'Our clients hold 20–27x, higher in individual campaigns. But ROAS in isolation is misleading: it counts ads revenue and ignores your discount, the platform commission, and the share of those orders you would have received anyway. Read ROAS together with through-conversion and post-promo margin.',
        'Klien kami bertahan di 20–27x, pada kampanye tertentu lebih tinggi. Tapi ROAS tanpa konteks menyesatkan: angka itu menghitung omzet dari iklan dan mengabaikan diskon Anda, komisi platform, serta bagian pesanan yang tetap datang tanpa iklan. Baca ROAS bersama konversi menyeluruh dan margin setelah promo.'),
    ],
    [
      t('Может, просто поднять бюджет?',
        'Should I just raise the budget?',
        'Apa cukup menaikkan anggaran saja?'),
      t('Если карточка не конвертит, больший бюджет купит больше просмотров без заказов — это самый быстрый способ потратить деньги впустую. У Etna мы подняли бюджет на 50% уже ПОСЛЕ того, как починили карточку и ставки, и получили втрое больше выручки с рекламы.',
        'If the listing does not convert, a bigger budget buys more views without orders — the fastest way to waste money. At Etna we raised the budget 50% only AFTER fixing the listing and the bidding, and got 3.4x the ads revenue.',
        'Kalau listing tidak berkonversi, anggaran yang lebih besar hanya membeli lebih banyak tampilan tanpa pesanan — cara tercepat membuang uang. Di Etna kami menaikkan anggaran 50% justru SETELAH listing dan bid diperbaiki, dan mendapat 3.4x omzet dari iklan.'),
    ],
    [
      t('Сколько ждать результата?',
        'How long until results?',
        'Berapa lama sampai ada hasil?'),
      t('Первые изменения — 2–4 недели, полная раскачка — 3–6 месяцев. Быстрее всего отзываются доступность и ставки; конверсия карточки и рейтинг набираются медленнее, потому что алгоритму нужна история.',
        'First movement in 2–4 weeks, full ramp-up in 3–6 months. Availability and bidding respond fastest; listing conversion and rating take longer because the algorithm needs history.',
        'Perubahan pertama dalam 2–4 minggu, hasil penuh dalam 3–6 bulan. Ketersediaan dan bid paling cepat merespons; konversi listing dan rating butuh waktu lebih lama karena algoritma perlu riwayat.'),
    ],
    [
      t('Реклама вообще нужна, если карточка хорошая?',
        'Do I need ads at all if my listing is good?',
        'Apakah iklan tetap perlu kalau listing sudah bagus?'),
      t('Нужна — но как усилитель, а не как замена. Реклама покупает показы; заказ делает карточка. В правильном порядке реклама умножает то, что уже работает; в неправильном — оплачивает то, что не работает.',
        'Yes — but as an amplifier, not a substitute. Ads buy impressions; the listing earns the order. In the right order, ads multiply what already works; in the wrong one, they pay for what does not.',
        'Perlu — tapi sebagai penguat, bukan pengganti. Iklan membeli tayangan; listing yang menghasilkan pesanan. Dalam urutan yang benar, iklan melipatgandakan yang sudah bekerja; dalam urutan yang salah, iklan membayari yang tidak bekerja.'),
    ],
  ];

  return (
    <AnswerLayout
      h1={t('Плачу за рекламу в GrabFood, а заказов больше не стало. Почему?',
            'I’m paying for GrabFood ads but orders are not increasing. Why?',
            'Saya bayar iklan GrabFood, tapi pesanan tidak bertambah. Kenapa?')}
      lead={t(
        'Потому что реклама покупает показы, а не заказы. Если карточка не конвертит, ресторан часто офлайн или рейтинг ниже 4.8 — реклама просто быстрее приводит людей туда, где они не заказывают. Ниже — порядок, в котором мы разбираем это у клиентов: сначала доступность, потом конверсия карточки, промо и рейтинг, и только пятым пунктом ставки. В такой последовательности реклама начинает работать почти всегда; в обратной — почти никогда.',
        'Because ads buy impressions, not orders. If your listing does not convert, your restaurant is often offline, or your rating is below 4.8, ads simply bring people faster to a place where they do not order. Below is the order we work through with clients: availability first, then listing conversion, promos and rating — and bidding only fifth. In that sequence ads almost always start working; in the reverse one, almost never.',
        'Karena iklan membeli tayangan, bukan pesanan. Kalau listing Anda tidak berkonversi, restoran sering offline, atau rating di bawah 4.8, iklan hanya membawa orang lebih cepat ke tempat yang tidak membuat mereka memesan. Berikut urutan yang kami jalankan bersama klien: ketersediaan dulu, lalu konversi listing, promo dan rating — dan bid baru di urutan kelima. Dengan urutan itu iklan hampir selalu mulai bekerja; dengan urutan sebaliknya, hampir tidak pernah.'
      )}
      schemas={[
        faqPageSchema(faq),
        articleSchema({
          headline: t('Почему реклама в GrabFood не приносит заказов',
                      'Why GrabFood ads are not bringing orders',
                      'Kenapa iklan GrabFood tidak menghasilkan pesanan'),
          url: URL,
          about: 'GrabAds, GrabFood advertising, ROAS, delivery app ranking, listing conversion',
          datePublished: '2026-09-08',
          dateModified: '2026-09-08',
          language,
        }),
      ]}
    >
      <Block card title={t('Порядок диагностики', 'The diagnostic order', 'Urutan diagnosis')}>
        <div className="space-y-6">
          {steps.map(([title, body]) => (
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

      <Block title={t('Главная ошибка', 'The one mistake', 'Kesalahan utama')}>
        <p className="text-brand-muted max-w-3xl">
          {t(
            'Реклама — единственный рычаг, который работает мгновенно и виден в отчёте, поэтому за него хватаются первым. Остальные четыре пункта требуют ежедневной работы и не дают красивого графика на второй день. Но именно они определяют, во что превратится купленный показ. Реклама на неготовой карточке — это плата за скорость, с которой вы теряете клиента.',
            'Ads are the only lever that works instantly and shows up in a report, so they get pulled first. The other four steps require daily work and produce no pretty chart by day two. Yet they decide what a purchased impression turns into. Ads on an unprepared listing are payment for the speed at which you lose the customer.',
            'Iklan adalah satu-satunya tuas yang bekerja seketika dan terlihat di laporan, jadi itu yang pertama ditarik. Empat langkah lainnya menuntut kerja harian dan tidak memberi grafik cantik di hari kedua. Padahal justru merekalah yang menentukan jadi apa tayangan yang Anda beli. Iklan pada listing yang belum siap adalah biaya atas kecepatan Anda kehilangan pelanggan.'
          )}
        </p>
      </Block>

      <Block card title={t('Кейсы с полными цифрами', 'Case studies with the full numbers', 'Studi kasus dengan angka lengkap')}>
        <p className="text-brand-muted max-w-3xl">
          <Link href="/cases/etna-phuket" className="text-brand-green hover:underline">
            Etna Phuket
          </Link>
          {t(' — заказы x2.2 на падающем трафике, ROAS 14.75x → 34.57x. ',
             ' — orders x2.2 on falling traffic, ROAS 14.75x → 34.57x. ',
             ' — pesanan x2.2 pada trafik yang menurun, ROAS 14.75x → 34.57x. ')}
          <Link href="/cases/zaytun-ubud" className="text-brand-green hover:underline">
            Zaytun Ubud
          </Link>
          {t(' — реклама GoFood из убытка ROAS 0.25x в 15.52x. ',
             ' — GoFood ads from a loss-making 0.25x ROAS to 15.52x. ',
             ' — iklan GoFood dari ROAS 0.25x yang merugi menjadi 15.52x. ')}
          <Link href="/cases/enjoy-healthy-food" className="text-brand-green hover:underline">
            Enjoy Healthy Food
          </Link>
          {t(' — выручка x9.4 за 14 месяцев, доля офлайна 73% → 0%.',
             ' — revenue x9.4 in 14 months, offline rate 73% → 0%.',
             ' — omzet x9.4 dalam 14 bulan, porsi offline 73% → 0%.')}
        </p>
      </Block>

      <FaqList faq={faq} title={t('Частые вопросы', 'Frequently asked', 'Pertanyaan umum')} />

      <Block>
        <p className="text-brand-muted">
          {t('Смежные ответы: ', 'Related answers: ', 'Jawaban terkait: ')}
          <Link
            href="/answers/grabfood-gofood-account-management"
            className="text-brand-green hover:underline"
          >
            {t('можно ли отдать ведение аккаунта', 'can I hand the account over', 'bisakah pengelolaan akun diserahkan')}
          </Link>
          {' · '}
          <Link href="/method" className="text-brand-green hover:underline">
            {t('метод Delivery Booster целиком', 'the full Delivery Booster Method', 'Delivery Booster Method selengkapnya')}
          </Link>
        </p>
      </Block>

      <AnswerCta />
    </AnswerLayout>
  );
}
