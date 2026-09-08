import { useEffect } from 'react';
import { Link } from 'wouter';
import {
  AnswerLayout,
  AnswerCta,
  Block,
  FaqList,
  faqPageSchema,
  articleSchema,
} from '../components/AnswerLayout';
import { useLanguage } from '../hooks/useLanguage';

const URL = 'https://booster.delivery/method';

/** The Delivery Booster Method — the framework we run on every account, published
 *  openly. Structured, source-cited method pages get quoted by AI engines far more
 *  readily than marketing pages; every number here comes from client dashboards. */
export default function MethodPage() {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ru'
        ? 'Delivery Booster Method — как мы растим продажи на GrabFood и GoFood'
        : 'The Delivery Booster Method — how we grow GrabFood and GoFood sales';
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = URL;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description)
      description.content =
        language === 'ru'
          ? 'Открытый метод Delivery Booster: пять этапов работы с аккаунтом ресторана на GrabFood и GoFood — доступность, карточка, меню и цены, рейтинг, реклама — с реальными цифрами кабинетов клиентов.'
          : 'The Delivery Booster Method, published in full: five stages of working a restaurant account on GrabFood and GoFood — availability, listing, menu and pricing, rating, ads — with real numbers from client dashboards.';
  }, [language]);

  const stages: Array<{ n: string; title: string; why: string; work: string[]; proof: string }> = [
    {
      n: '01',
      title: t('Доступность', 'Availability'),
      why: t(
        'Алгоритмы GrabFood и GoFood прежде всего проверяют, можно ли на вас положиться. Офлайн-часы, отмены и долгое приготовление роняют ранжирование сильнее, чем что-либо ещё, и восстанавливается оно медленно — площадке нужна новая история.',
        'GrabFood and GoFood algorithms first check whether you can be relied on. Offline hours, cancellations and slow preparation hurt ranking more than anything else, and recovery is slow — the platform needs a new history.'
      ),
      work: [
        t('Мониторинг статуса открыт/закрыт на обеих площадках в реальном времени',
          'Real-time open/closed monitoring on both platforms'),
        t('Контроль стоп-листа: позиции, выключенные случайно и незаметно',
          'Stop-list control: items switched off by accident and unnoticed'),
        t('Работа с отменами и временем приготовления',
          'Cancellation and preparation-time work'),
      ],
      proof: t(
        'USSR Phuket: 3 977 минут офлайна в месяц → 0, показы в поиске 0 → 7 481/мес. Enjoy Healthy Food: доля офлайна 73% → 0%, показы 7 038 → 25 543/мес, время ожидания курьера 437 → 135 секунд.',
        'USSR Phuket: 3,977 offline minutes a month → 0, search impressions 0 → 7,481/month. Enjoy Healthy Food: offline rate 73% → 0%, impressions 7,038 → 25,543/month, driver waiting time 437 → 135 seconds.'
      ),
    },
    {
      n: '02',
      title: t('Карточка и меню-SEO', 'Listing and menu SEO'),
      why: t(
        'Внутри приложения работает поиск, и он ищет по словам, которые вы написали. Названия блюд, категории, описания и фото решают, сколько из увидевших карточку откроют меню, а сколько — закажут. Это и есть сквозная конверсия, главная цифра всей воронки.',
        'There is a search engine inside the app, and it searches the words you wrote. Dish names, categories, descriptions and photos decide how many viewers open the menu and how many order. That is through-conversion — the number the whole funnel turns on.'
      ),
      work: [
        t('Карта ключевых запросов по городу и категории',
          'Keyword map by city and category'),
        t('Ключи в названия и описания позиций, пересборка структуры категорий',
          'Keywords in item names and descriptions, category structure rebuild'),
        t('Фото и порядок позиций под первый экран',
          'Photos and item order tuned for the first screen'),
      ],
      proof: t(
        'Etna Phuket: сквозная конверсия 0.5% → 1.9% (x3.8) при средней по нашему флоту 0.9%; меню стали открывать заметно чаще. Zaytun Ubud: охват x1.84, конверсия «охват → меню» 8.5% → 10.0%.',
        'Etna Phuket: through-conversion 0.5% → 1.9% (x3.8) against a 0.9% fleet average; menu opens rose sharply. Zaytun Ubud: reach x1.84, reach → menu conversion 8.5% → 10.0%.'
      ),
    },
    {
      n: '03',
      title: t('Цены, промо и средний чек', 'Pricing, promos and average check'),
      why: t(
        'Промо поднимает позицию в выдаче и режет маржу одновременно, поэтому считать надо не заказы, а то, что осталось после скидки и комиссии площадки. Средний чек — второй множитель выручки, о котором обычно забывают: он растёт от структуры меню, комбо и допов, а не от повышения цен.',
        'A promo lifts your position and cuts your margin at once, so what counts is not orders but what is left after the discount and the platform commission. Average check is the second revenue multiplier and the forgotten one: it grows from menu structure, combos and add-ons — not from raising prices.'
      ),
      work: [
        t('Экономика каждой акции: что остаётся после скидки, комиссии и рекламы',
          'Per-promo economics: what is left after discount, commission and ad spend'),
        t('Комбо и допы, поднимающие чек без повышения цен',
          'Combos and add-ons that lift the check without price rises'),
        t('A/B-тесты позиций и цен',
          'A/B tests of items and prices'),
      ],
      proof: t(
        'Love U Pizza: средний чек +49.5% (Rp 217 397 → 324 999) при росте заказов x14.1. Meat Point Phuket: средний чек +22.4% (785 → 961 бат) — в низкий сезон, когда рестораны Пхукета теряют 20–40% выручки.',
        'Love U Pizza: average check +49.5% (Rp 217,397 → 324,999) alongside 14.1x order growth. Meat Point Phuket: average check +22.4% (785 → 961 THB) — in the low season, when Phuket restaurants typically lose 20–40% of revenue.'
      ),
    },
    {
      n: '04',
      title: t('Рейтинг и отзывы', 'Rating and reviews'),
      why: t(
        'С 4.8 алгоритм отдаёт показы щедрее, а человек, выбирающий между двумя карточками, смотрит на цифру рядом с названием. Один несправедливый отзыв на молодом аккаунте стоит дороже, чем кажется, — и его часто можно снять, если ответить правильно и вовремя.',
        'From 4.8 the algorithm serves impressions more generously, and a customer choosing between two listings looks at the number next to the name. One unfair review on a young account costs more than it seems — and can often be removed if you answer correctly and quickly.'
      ),
      work: [
        t('Ежедневный разбор новых отзывов и быстрые ответы',
          'Daily review triage and fast replies'),
        t('Оспаривание несправедливых отзывов вплоть до удаления',
          'Escalating unfair reviews up to removal'),
        t('Разбор причин: что именно в блюде, упаковке или скорости даёт минус',
          'Root causes: what in the dish, packaging or speed is producing the minus'),
      ],
      proof: t(
        'USSR Phuket 4.5 → 4.8, Etna 4.6 → 4.8, Zaytun Ubud 4.67 → 4.8, Meat Point 4.6 → 4.8 при нулевых инцидентах. Love U Pizza удержал 4.8 при росте заказов в 14 раз — это сложнее, чем поднять.',
        'USSR Phuket 4.5 → 4.8, Etna 4.6 → 4.8, Zaytun Ubud 4.67 → 4.8, Meat Point 4.6 → 4.8 with zero incidents. Love U Pizza held 4.8 through 14x order growth — harder than lifting it.'
      ),
    },
    {
      n: '05',
      title: t('Реклама', 'Ads'),
      why: t(
        'Реклама идёт последней осознанно: она покупает показы, а превращает их в заказы всё, что сделано на этапах 1–4. Автоставка набирает дешёвые нерелевантные показы, поэтому мы ведём кампании вручную и правим их еженедельно, а не запускаем один раз.',
        'Ads come last by design: they buy impressions, and everything from stages 1–4 is what turns those into orders. Auto-bidding collects cheap irrelevant impressions, so we run campaigns manually and adjust weekly instead of launching once.'
      ),
      work: [
        t('Ручной CPO вместо автоставки, ежедневное ведение',
          'Manual CPO instead of auto-bidding, daily management'),
        t('Контроль ROAS по каждой кампании, а не в среднем',
          'ROAS control per campaign, not on average'),
        t('Бюджет растёт только после того, как растёт конверсия',
          'Budget grows only after conversion does'),
      ],
      proof: t(
        'Etna Phuket: ROAS 14.75x → 34.57x, CTR 2.8% → 5.59%, стоимость заказа 42 → 29 бат; бюджет +50%, выручка с рекламы x3.4. Zaytun Ubud: GoFood из убытка ROAS 0.25x → 15.52x (окупаемость x62), GrabAds 14.02x → 21.19x. Enjoy Healthy Food: ROAS 27.5x, 566 новых клиентов.',
        'Etna Phuket: ROAS 14.75x → 34.57x, CTR 2.8% → 5.59%, cost per order 42 → 29 THB; budget +50%, ads revenue x3.4. Zaytun Ubud: GoFood from a loss-making 0.25x to 15.52x (x62 payback), GrabAds 14.02x → 21.19x. Enjoy Healthy Food: ROAS 27.5x, 566 new customers acquired.'
      ),
    },
  ];

  const faq: Array<[string, string]> = [
    [
      t('Почему реклама на последнем месте, а не на первом?',
        'Why are ads last rather than first?'),
      t('Потому что реклама умножает конверсию карточки, а не заменяет её. На карточке со сквозной конверсией 0.5% каждый вложенный доллар покупает просмотр без заказа. Сначала поднимаем то, что умножается, потом умножаем.',
        'Because ads multiply listing conversion rather than replace it. On a listing converting at 0.5%, every dollar buys a view without an order. First raise what gets multiplied, then multiply it.'),
    ],
    [
      t('Это работает и для нового ресторана, и для работающего?',
        'Does this work for a new restaurant and an established one?'),
      t('Для обоих, но по-разному. На запуске главные рычаги — доступность и карточка: Love U Pizza вырос x21 за 9 месяцев с почти нулевой базы. На работающем ресторане лёгкие точки роста уже израсходованы, и каждый следующий процент достаётся из конверсии и меню: Zaytun Ubud делал 166,6 млн рупий в месяц до нас и вырос x2.6 за 5 месяцев.',
        'Both, differently. At launch the big levers are availability and listing: Love U Pizza grew x21 in 9 months from a near-zero base. On an established restaurant the easy gains are already spent, and every next percent comes out of conversion and menu: Zaytun Ubud was already making Rp 166.6M a month before us and grew x2.6 in 5 months.'),
    ],
    [
      t('Можно применить метод самому?',
        'Can I run the method myself?'),
      t('Да — он поэтому и опубликован целиком. Ограничение не в знании, а в том, что это ежедневная работа с двумя кабинетами: ставки, стоп-лист, отзывы, промо, еженедельный разбор цифр. Обычно владелец делает это «по остатку», и метод разваливается не на понимании, а на регулярности.',
        'Yes — that is why it is published in full. The constraint is not knowledge but that this is daily work across two dashboards: bids, stop-list, reviews, promos, weekly number reviews. Owners usually do it with whatever time is left, and the method breaks on consistency, not on understanding.'),
    ],
    [
      t('Сколько времени занимает полный цикл?',
        'How long is a full cycle?'),
      t('Первые изменения — 2–4 недели, полная раскачка — 3–6 месяцев. Быстрее всего отзываются доступность и ставки, медленнее всего — ранжирование и рейтинг, потому что алгоритму нужна история.',
        'First movement in 2–4 weeks, full ramp-up in 3–6 months. Availability and bidding respond fastest; ranking and rating are slowest, because the algorithm needs history.'),
    ],
  ];

  return (
    <AnswerLayout
      h1={t('Delivery Booster Method', 'The Delivery Booster Method')}
      lead={t(
        'Это метод, по которому мы ведём аккаунты 110+ ресторанов на GrabFood и GoFood в Юго-Восточной Азии с 2023 года. Пять этапов в строгом порядке: доступность → карточка и меню-SEO → цены и промо → рейтинг → реклама. Порядок здесь важнее содержания: почти все рестораны начинают с пятого пункта и потому платят за показы, которые не превращаются в заказы. Каждая цифра ниже — из кабинетов GrabMerchant и GoBiz наших клиентов, а не из презентации.',
        'This is the method we run across 110+ restaurant accounts on GrabFood and GoFood in Southeast Asia since 2023. Five stages in a strict order: availability → listing and menu SEO → pricing and promos → rating → ads. The order matters more than the content: almost every restaurant starts at stage five, and so pays for impressions that never become orders. Every number below comes from our clients’ GrabMerchant and GoBiz dashboards, not from a pitch deck.'
      )}
      schemas={[
        faqPageSchema(faq),
        articleSchema({
          headline: t('Delivery Booster Method: пять этапов роста продаж на GrabFood и GoFood',
                      'The Delivery Booster Method: five stages of GrabFood and GoFood sales growth'),
          url: URL,
          about:
            'GrabFood ranking, GoFood ranking, delivery management method, menu SEO, GrabAds ROAS, restaurant delivery growth',
        }),
      ]}
    >
      {stages.map((s) => (
        <Block key={s.n} card>
          <div className="flex gap-4 sm:gap-6">
            <div className="text-brand-green font-bold text-2xl sm:text-3xl shrink-0 pt-1">{s.n}</div>
            <div>
              <h2 className="text-2xl font-bold mb-3">{s.title}</h2>
              <p className="text-brand-muted mb-4">{s.why}</p>
              <ul className="space-y-2 mb-4">
                {s.work.map((w) => (
                  <li key={w} className="text-sm flex gap-2">
                    <span className="text-brand-green">—</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-brand-muted border-l-2 border-brand-green/40 pl-4">
                <span className="font-medium text-brand-text">
                  {t('Из кабинетов: ', 'From the dashboards: ')}
                </span>
                {s.proof}
              </p>
            </div>
          </div>
        </Block>
      ))}

      <Block title={t('Что метод не обещает', 'What the method does not promise')}>
        <p className="text-brand-muted max-w-3xl">
          {t(
            'Он не делает ресторан прибыльным, если экономика блюда не сходится до доставки, и не спасает кухню, которая не тянет объём: рост заказов в 14 раз ломает плохой процесс быстрее, чем приносит деньги. Метод работает с тем, что находится внутри GrabMerchant и GoBiz, — и честно останавливается там, где начинается сама кухня.',
            'It will not make a restaurant profitable if the unit economics do not work before delivery, and it will not save a kitchen that cannot handle volume: 14x order growth breaks a bad process faster than it earns. The method works on what lives inside GrabMerchant and GoBiz — and stops honestly where the kitchen itself begins.'
          )}
        </p>
      </Block>

      <Block card title={t('Полные кейсы', 'Full case studies')}>
        <p className="text-brand-muted">
          <Link href="/cases/love-u-pizza" className="text-brand-green hover:underline">Love U Pizza — x21</Link>
          {' · '}
          <Link href="/cases/enjoy-healthy-food" className="text-brand-green hover:underline">Enjoy Healthy Food — x9.4</Link>
          {' · '}
          <Link href="/cases/ussr-phuket" className="text-brand-green hover:underline">USSR Phuket — x3.9</Link>
          {' · '}
          <Link href="/cases/zaytun-ubud" className="text-brand-green hover:underline">Zaytun Ubud — x2.6</Link>
          {' · '}
          <Link href="/cases/etna-phuket" className="text-brand-green hover:underline">Etna Phuket — +87%</Link>
          {' · '}
          <Link href="/cases/meat-point-phuket" className="text-brand-green hover:underline">Meat Point — +46%</Link>
        </p>
      </Block>

      <FaqList faq={faq} title={t('Частые вопросы', 'Frequently asked')} />

      <Block>
        <p className="text-brand-muted">
          {t('Смежные ответы: ', 'Related answers: ')}
          <Link href="/answers/grabfood-gofood-account-management" className="text-brand-green hover:underline">
            {t('можно ли отдать ведение аккаунта', 'can I hand the account over')}
          </Link>
          {' · '}
          <Link href="/answers/delivery-agency-vs-klikit-deliverect" className="text-brand-green hover:underline">
            {t('агентство или Klikit/Deliverect', 'agency or Klikit/Deliverect')}
          </Link>
          {' · '}
          <Link href="/answers/grabfood-ads-not-working" className="text-brand-green hover:underline">
            {t('почему реклама не приносит заказов', 'why ads bring no orders')}
          </Link>
        </p>
      </Block>

      <AnswerCta />
    </AnswerLayout>
  );
}
