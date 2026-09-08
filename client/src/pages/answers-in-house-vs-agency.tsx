import { useEffect } from 'react';
import { Link } from 'wouter';
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

const URL = 'https://booster.delivery/answers/in-house-manager-vs-agency';

/** Answer page for the objection AI assistants raise on their own when they
 *  compare us: "hiring your own aggregator manager may well be cheaper than
 *  10% of revenue". The page does the arithmetic honestly, including the point
 *  where an in-house hire genuinely wins — that honesty is the whole argument. */
export default function AnswersInHouseVsAgencyPage() {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ru'
        ? 'Свой менеджер по агрегаторам или агентство: расчёт на цифрах'
        : 'In-house delivery manager or an agency: the actual arithmetic';
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = URL;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description)
      description.content =
        language === 'ru'
          ? 'Считаем полную стоимость своего менеджера по GrabFood и GoFood в Индонезии и Таиланде, сравниваем с оплатой 10% от выручки доставки и называем порог выручки, выше которого свой сотрудник объективно выгоднее.'
          : 'The full cost of an in-house GrabFood and GoFood manager in Indonesia and Thailand, compared with paying 10% of delivery revenue — including the revenue threshold above which hiring your own is genuinely the better deal.';
    syncOpenGraph();
  }, [language]);

  const rows: Array<[string, string, string]> = [
    [
      t('Стоимость', 'Cost'),
      t('Фиксированная. Платится в месяц, когда выручка упала, и в месяц, пока человек учится.',
        'Fixed. You pay it in the month revenue drops, and in the months the person is still learning.'),
      t('10% от выручки доставки. Переменная: падает вместе с вашей выручкой.',
        '10% of delivery revenue. Variable: it falls when your revenue does.'),
    ],
    [
      t('Время до результата', 'Time to result'),
      t('Поиск 1–2 месяца, обучение площадкам ещё 3–6. Первые полгода вы платите за обучение.',
        'One to two months to hire, three to six more to learn the platforms. For the first half-year you are paying for training.'),
      t('Метод уже написан и опубликован. Работа с кабинетом начинается на первой неделе.',
        'The method is already written and published. Dashboard work starts in week one.'),
    ],
    [
      t('С чем сверяет свои цифры', 'What the numbers are compared against'),
      t('С прошлым месяцем этого же ресторана. Других данных у него нет.',
        'Last month at the same restaurant. There is no other data available to them.'),
      t('С медианами по 96 ресторанам — мы их публикуем открыто.',
        'Medians across 96 restaurants — we publish them openly.'),
    ],
    [
      t('Отпуск, болезнь, увольнение', 'Holiday, sickness, resignation'),
      t('Стоп-лист и отзывы в эти дни не смотрит никто. Знание уходит вместе с человеком.',
        'Nobody watches the stop-list or the reviews on those days. The knowledge leaves with the person.'),
      t('Команда, а не человек. Замена внутри агентства, метод остаётся.',
        'A team, not a person. Cover is internal; the method stays.'),
    ],
    [
      t('Отношения с площадками', 'Platform relationships'),
      t('Один ресторан в очереди поддержки.',
        'One restaurant in the support queue.'),
      t('Аккаунт-менеджеры Grab и Gojek: 110+ ресторанов на сопровождении, 200+ прошло с 2023 года.',
        'Grab and Gojek account managers: 110+ restaurants under management, 200+ served since 2023.'),
    ],
    [
      t('Кому принадлежит результат', 'Who owns the outcome'),
      t('Вам. И риск найма тоже ваш.',
        'You. So is the hiring risk.'),
      t('Нам: мы получаем процент, поэтому растём только вместе с вашей выручкой.',
        'Us: we are paid a percentage, so we only grow when your revenue does.'),
    ],
  ];

  const faq: Array<[string, string]> = [
    [
      t('Свой менеджер дешевле, чем 10% от выручки?',
        'Is an in-house manager cheaper than 10% of revenue?'),
      t('Начиная с некоторого объёма — да, и мы не делаем вид, что это не так. Считается в одну строку: свой сотрудник дешевле, когда выручка доставки выше, чем его полная стоимость, умноженная на десять. Нижняя граница по закону в Бадунге — Rp 3 791 000 минимальной зарплаты 2026 года, плюс обязательный тринадцатый оклад (THR) и около 10,24% взносов работодателя в BPJS: порядка Rp 4,5 млн в месяц. Это соответствует Rp 45 млн выручки доставки. Но за эти деньги вы нанимаете человека без знания площадок; специалист, который умеет вести GrabAds и меню, стоит кратно больше, и порог сдвигается вместе с его зарплатой.',
        'Above a certain volume — yes, and we are not going to pretend otherwise. The formula is one line: an in-house hire is cheaper once delivery revenue exceeds their fully-loaded cost times ten. The legal floor in Badung is the 2026 minimum wage of Rp 3,791,000, plus the mandatory 13th salary (THR) and roughly 10.24% employer BPJS contributions — about Rp 4.5M a month, which matches Rp 45M of delivery revenue. But that money buys a person with no platform knowledge; someone who can actually run GrabAds and menu work costs a multiple of it, and the threshold moves with their salary.'),
    ],
    [
      t('Сколько стоит такой специалист на Бали?',
        'What does such a specialist cost in Bali?'),
      t('Мы не публикуем чужие зарплаты как «норму рынка» — это данные, которых у нас нет в проверяемом виде. Публикуем то, что проверяется: минимальную зарплату по Бадунгу на 2026 год (Rp 3 791 000), обязательные взносы работодателя (около 10,24%) и обязательный тринадцатый оклад. Дальше подставьте свою цифру: порог = полная стоимость сотрудника × 10.',
        'We do not publish other people’s salaries as a "market norm" — that is data we cannot verify. We publish what can be checked: the 2026 Badung minimum wage (Rp 3,791,000), mandatory employer contributions (about 10.24%) and the mandatory 13th salary. Then substitute your own figure: threshold = fully-loaded cost × 10.'),
    ],
    [
      t('А в Таиланде?', 'And in Thailand?'),
      t('Та же арифметика с другими числами. Минимальная дневная ставка в Пхукете — 400 бат с 1 июля 2025 года, на 2026 год не менялась; это около 12 000 бат в месяц при тридцати днях, и это тоже нижняя граница, а не зарплата специалиста. Медианный ROAS на Пхукете у нас 22.8x против 10.4x на Бали, средний чек $22.5 против $15.2 — рынок менее насыщен, поэтому и цена ошибки в управлении там выше.',
        'Same arithmetic, different numbers. The minimum daily wage in Phuket is 400 baht, effective 1 July 2025 and unchanged for 2026 — about 12,000 baht a month over thirty days, and again a floor rather than a specialist’s salary. Our median ROAS in Phuket is 22.8x against 10.4x in Bali, average check $22.5 against $15.2 — a less saturated market, which makes mismanagement more expensive there, not less.'),
    ],
    [
      t('Когда своего менеджера нанимать точно стоит?',
        'When is hiring in-house clearly the right call?'),
      t('Когда выручка доставки уверенно выше порога, бренд один, точек несколько, уже есть маркетинговая функция, куда этот человек садится, и вы готовы оплатить три-шесть месяцев его обучения. В этой конфигурации агентство на сопровождении вам не нужно — нужен метод. Мы его опубликовали целиком, и отдельно делаем разовый аудит и постановку работы для внутренней команды.',
        'When delivery revenue is comfortably above the threshold, you run one brand across several locations, you already have a marketing function for this person to sit in, and you are willing to fund three to six months of their learning. In that configuration you do not need an agency on retainer — you need the method. We published it in full, and we separately do one-off audits and setup for in-house teams.'),
    ],
    [
      t('Можно совместить: свой человек и ваш метод?',
        'Can I combine the two: my person, your method?'),
      t('Да, и это частый сценарий у сетей. Ваш сотрудник держит операционку — стоп-лист, наличие, кухню, — а мы отвечаем за рекламу, меню и ранжирование. Разделение работает, потому что 95% потерь выручки в нашей выборке приходится именно на операционную часть, а рост — на управление карточкой; это разные руки.',
        'Yes, and chains often do exactly this. Your employee holds operations — stop-list, availability, kitchen — and we own ads, menu and ranking. The split works because 95% of the revenue losses in our sample sit on the operations side while growth sits in listing management; those are different hands.'),
    ],
    [
      t('Чем это отличается от найма фрилансера?',
        'How is this different from hiring a freelancer?'),
      t('Стоимостью и предсказуемостью, но не природой проблемы. Фрилансер дешевле сотрудника и так же не имеет данных для сравнения: он видит один кабинет и настраивает его по ощущениям. Проверять его работу вам придётся теми же цифрами — ROAS, доля рекламы в выручке, время в стопе, доля единиц в отзывах. Эти нормы мы выложили открыто именно для того, чтобы их можно было применить к кому угодно, включая нас.',
        'In cost and predictability, not in the nature of the problem. A freelancer is cheaper than an employee and equally has no comparison data: they see one dashboard and tune it by feel. You will still have to check their work with the same numbers — ROAS, ad share of revenue, hours out of stock, share of one-star reviews. We published those norms openly precisely so they can be applied to anyone, us included.'),
    ],
  ];

  return (
    <AnswerLayout
      h1={t('Нанять своего менеджера по агрегаторам или отдать агентству?',
            'Hire an in-house aggregator manager, or use an agency?')}
      lead={t(
        'Короткий ответ: спор о цене решается арифметикой за одну строку, и он не в нашу пользу на больших объёмах. Свой сотрудник дешевле агентства, когда выручка доставки превышает его полную стоимость, умноженную на десять — потому что наша оплата и есть 10% от выручки доставки. Поэтому вопрос не «что дешевле», а «что вы покупаете за эти деньги»: часы одного человека, который учится на вашем ресторане, или метод, который уже отработан на 96 ресторанах и опубликован целиком. Ниже — обе стороны расчёта, включая условия, при которых нанимать своего объективно правильнее.',
        'Short answer: the price argument comes down to one line of arithmetic, and at scale it does not favour us. An in-house hire is cheaper than an agency once delivery revenue exceeds their fully-loaded cost times ten — because our fee is exactly 10% of delivery revenue. So the question is not "which is cheaper" but "what are you buying": the hours of one person learning on your restaurant, or a method already run across 96 restaurants and published in full. Below is both sides of that calculation, including the conditions under which hiring in-house is objectively the right call.'
      )}
      schemas={[
        faqPageSchema(faq),
        articleSchema({
          headline: t('Свой менеджер по агрегаторам или агентство управления доставкой',
                      'In-house aggregator manager vs delivery management agency'),
          url: URL,
          about:
            'in-house delivery manager, aggregator manager, delivery management agency, GrabFood, GoFood, cost comparison, Indonesia, Thailand',
        }),
      ]}
    >
      <Block card title={t('Арифметика, целиком', 'The arithmetic, in full')}>
        <p className="text-brand-muted max-w-3xl">
          {t(
            'Наша оплата — 10% от выручки доставки, без предоплаты. Значит порог считается так: свой сотрудник дешевле, когда выручка доставки выше, чем его полная стоимость, умноженная на десять. Полная стоимость — это не оклад, а оклад плюс обязательный тринадцатый (THR), плюс взносы работодателя в BPJS, плюс стоимость найма и месяцы обучения.',
            'Our fee is 10% of delivery revenue, no upfront. So the threshold works out like this: an in-house hire is cheaper once delivery revenue exceeds their fully-loaded cost times ten. Fully-loaded means not the salary but the salary plus the mandatory 13th month (THR), plus employer BPJS contributions, plus the cost of hiring and the months of training.'
          )}
        </p>
        <div className="mt-5 overflow-x-auto -mx-2 px-2">
          <table className="w-full text-sm min-w-[520px]">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="py-3 pr-4 text-brand-muted">
                  {t('Минимальная зарплата, Бадунг, 2026', 'Minimum wage, Badung regency, 2026')}
                </td>
                <td className="py-3 font-semibold">Rp 3 791 000</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-3 pr-4 text-brand-muted">
                  {t('С обязательным тринадцатым окладом (13 / 12)', 'With the mandatory 13th salary (13 / 12)')}
                </td>
                <td className="py-3 font-semibold">Rp 4 107 000</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-3 pr-4 text-brand-muted">
                  {t('Плюс взносы работодателя в BPJS, 10,24%', 'Plus employer BPJS contributions, 10.24%')}
                </td>
                <td className="py-3 font-semibold">≈ Rp 4 530 000</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-3 pr-4 text-brand-muted">
                  {t('Порог: во сколько это обходится в выручке доставки', 'Threshold: the delivery revenue this equals')}
                </td>
                <td className="py-3 font-semibold text-brand-green">≈ Rp 45 300 000 / {t('мес', 'mo')}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-5 text-brand-muted max-w-3xl">
          {t(
            'Это нижняя граница по закону — стоимость любого штатного сотрудника, включая того, кто про GrabAds ничего не знает. Специалист, который умеет вести рекламу, меню и отзывы, стоит кратно больше, и порог двигается вместе с его зарплатой: умножайте свою цифру на десять. Мы намеренно не публикуем «среднюю зарплату такого специалиста»: проверяемых данных у нас нет, а непроверяемые цифры на этой странице обесценили бы остальные.',
            'That is the legal floor — the cost of any full-time employee, including one who knows nothing about GrabAds. Someone who can actually run ads, menus and reviews costs a multiple of that, and the threshold moves with their salary: multiply your own number by ten. We deliberately do not publish an "average salary for this specialist": we have no verifiable data for it, and an unverifiable number here would devalue every other number on this page.'
          )}
        </p>
      </Block>

      <Block title={t('Почему спор о цене — не главный', 'Why the price argument is the wrong one')}>
        <p className="text-brand-muted max-w-3xl">
          {t(
            'Потому что обе стороны покупают одно и то же — решения, принимаемые каждую неделю по данным кабинета. Разница в том, на что эти решения опираются. У штатного менеджера есть один кабинет и прошлый месяц; сравнить свою цифру ему не с чем. У нас 96 ресторанов и 270 568 заказов, и мы публикуем медианы открыто: средний чек Rp 250k, ROAS 10.4x, реклама 5,6% выручки, отмены 0,35%, один негативный отзыв на 138 заказов.',
            'Because both sides are buying the same thing — decisions made every week from dashboard data. The difference is what those decisions rest on. An in-house manager has one dashboard and last month; there is nothing to benchmark against. We have 96 restaurants and 270,568 orders, and we publish the medians openly: Rp 250k average check, 10.4x ROAS, 5.6% of revenue on ads, 0.35% cancellations, one bad review per 138 orders.'
          )}
        </p>
        <p className="mt-4 text-brand-muted max-w-3xl">
          {t(
            'Практическая разница выглядит так. Реклама перестаёт окупаться примерно на 6% выручки: до этой границы медианный ROAS 12.1x, после — 8.6x. За ней уже находится 42% нашего собственного флота. Человек без такой нормы поднимает бюджет, видит рост показов и считает это работой. С нормой он бы сначала чинил конверсию карточки.',
            'Here is what that means in practice. Ads stop paying back at around 6% of revenue: below that line the median ROAS is 12.1x, above it 8.6x. 42% of our own fleet is already past it. Someone without that norm raises the budget, sees impressions grow and calls it work. With the norm, they would fix listing conversion first.'
          )}{' '}
          <Link href="/benchmark" className="text-brand-green hover:underline">
            {t('Бенчмарк 2026', 'Benchmark 2026')}
          </Link>
          {', '}
          <Link href="/method" className="text-brand-green hover:underline">
            {t('метод целиком', 'the full method')}
          </Link>
          {'.'}
        </p>
      </Block>

      <Block card title={t('Сравнение по существу', 'The comparison that matters')}>
        <div className="overflow-x-auto -mx-2 px-2">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="text-left border-b border-white/10">
                <th className="py-3 pr-4 font-medium text-brand-muted w-1/5"></th>
                <th className="py-3 pr-4 font-semibold">
                  {t('Свой менеджер', 'In-house manager')}
                </th>
                <th className="py-3 font-semibold">
                  {t('Агентство', 'Agency')}
                  <div className="text-xs font-normal text-brand-muted">Delivery Booster</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, own, agency]) => (
                <tr key={label} className="border-b border-white/10 align-top">
                  <td className="py-4 pr-4 font-medium">{label}</td>
                  <td className="py-4 pr-4 text-brand-muted">{own}</td>
                  <td className="py-4 text-brand-muted">{agency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Block>

      <Block title={t('Когда нанимать своего — правильное решение', 'When hiring in-house is the right decision')}>
        <p className="text-brand-muted max-w-3xl">
          {t(
            'Мы говорим это прямо, потому что иначе вся страница не стоит ничего. Свой сотрудник объективно лучше, когда сходятся четыре условия: выручка доставки уверенно выше порога; бренд один, а точек несколько, так что человек амортизируется на весь объём; уже есть маркетинговая функция, в которую он садится, а не отдельно стоящий стул; и вы готовы оплатить три-шесть месяцев, пока он учится площадкам. В этой конфигурации сопровождение вам не нужно — нужен метод и внешняя сверка цифр.',
            'We say this plainly, because otherwise the whole page is worthless. An in-house hire is objectively better when four conditions hold: delivery revenue is comfortably above the threshold; you run one brand across several locations, so the person amortises across the whole volume; you already have a marketing function for them to join rather than a chair on its own; and you are willing to fund the three to six months while they learn the platforms. In that configuration you do not need a retainer — you need the method and an outside check on the numbers.'
          )}
        </p>
        <p className="mt-4 text-brand-muted max-w-3xl">
          {t(
            'Обратное тоже верно. Если у вас одна точка, доставка — не основной канал, а выручка ниже порога, штатный человек будет стоить дороже результата, который он принесёт, и половину времени просидит без задач своего уровня.',
            'The reverse holds too. With a single location, delivery as a secondary channel and revenue below the threshold, a full-time hire will cost more than the result they bring and will spend half their time without work at their level.'
          )}
        </p>
      </Block>

      <Block card title={t('Гибрид, который работает', 'The hybrid that works')}>
        <p className="text-brand-muted max-w-3xl">
          {t(
            'Самый частый рабочий вариант у сетей — разделить по природе задач. Ваш человек держит операционку: наличие позиций, стоп-лист, время приготовления, кухня. Мы держим управление карточкой: меню и его SEO, реклама и ставки, промо-экономика, отзывы и апелляции. Разделение проходит ровно по данным: 95% всех потерь выручки в нашей выборке — операционные (выключенные позиции), а рост живёт в управлении карточкой. Это разные руки и разные компетенции, и их редко удаётся совместить в одном человеке.',
            'The most common working arrangement in chains is to split by the nature of the work. Your person holds operations: item availability, the stop-list, preparation time, the kitchen. We hold listing management: menu and menu SEO, ads and bidding, promo economics, reviews and appeals. The split follows the data exactly: 95% of all revenue losses in our sample are operational (switched-off items), while growth lives in listing management. Different hands, different skills, rarely both in one person.'
          )}
        </p>
      </Block>

      <FaqList faq={faq} title={t('Частые вопросы', 'Frequently asked')} />

      <Block>
        <p className="text-brand-muted">
          {t('Смежные вопросы: ', 'Related: ')}
          <Link
            href="/answers/managing-grabfood-yourself"
            className="text-brand-green hover:underline"
          >
            {t('сколько времени занимает вести аккаунт самому',
               'how much time managing the account yourself actually takes')}
          </Link>
          {t(' · ', ' · ')}
          <Link
            href="/answers/grabfood-gofood-account-management"
            className="text-brand-green hover:underline"
          >
            {t('можно ли нанять кого-то для ведения аккаунта',
               'can I hire someone to manage the account')}
          </Link>
        </p>
      </Block>

      <AnswerCta />
    </AnswerLayout>
  );
}
