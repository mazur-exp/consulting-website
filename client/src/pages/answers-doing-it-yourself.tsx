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
        : 'How much time does running GrabFood and GoFood yourself take?';
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = URL;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description)
      description.content =
        language === 'ru'
          ? 'Это не «пара часов в неделю на аналитику», а функция полного рабочего дня: стоп-лист, отзывы и негатив, доступность, ставки, промо. И до вопроса о времени стоит вопрос знаний — стартовую настройку и рекламу без них не сделать.'
          : 'It is not "a couple of hours a week on analytics" but a full-time function: stop-list, reviews and negatives, availability, bidding, promos. And before the time question comes the knowledge question — setup and ads cannot be done without it.';
    syncOpenGraph();
  }, [language]);

  const daily: Array<[string, string]> = [
    [
      t('Стоп-лист и наличие', 'Stop-list and availability'),
      t('Позиции выключаются в течение дня — кухней, кассой, самой площадкой. Каждый час выключенного хита — это заказы, ушедшие к соседу, и сигнал алгоритму, что вы ненадёжны.',
        'Items switch off during the day — by the kitchen, the till, the platform itself. Every hour a bestseller is off is orders going to the restaurant next door and a signal to the algorithm that you are unreliable.'),
    ],
    [
      t('Отзывы и работа с негативом', 'Reviews and negative handling'),
      t('Отвечать нужно быстро и по существу. Отдельный навык — оспорить несправедливый отзыв так, чтобы площадка его сняла: это умеют и знают единицы, а на молодом аккаунте одна такая звезда стоит дороже, чем кажется.',
        'Replies must be fast and to the point. A separate skill is contesting an unfair review so the platform removes it: very few people know how, and on a young account one such star costs more than it looks.'),
    ],
    [
      t('Доступность и отмены', 'Uptime and cancellations'),
      t('Офлайн-часы и отмены роняют ранжирование сильнее всего, а восстанавливается оно медленно — площадке нужна новая история.',
        'Offline hours and cancellations hurt ranking most, and recovery is slow — the platform needs a new history.'),
    ],
    [
      t('Ставки и бюджеты', 'Bids and budgets'),
      t('Автоставка набирает дешёвые нерелевантные показы. Ручное ведение — это правки под фактический результат, а не разовая настройка.',
        'Auto-bidding collects cheap irrelevant impressions. Manual management means adjusting to actual results, not configuring once.'),
    ],
    [
      t('Промо и их экономика', 'Promos and their economics'),
      t('Считать нужно не заказы по акции, а что осталось после скидки, комиссии площадки и стоимости рекламы. Промо, которое не окупается, выглядит как рост.',
        'What counts is not orders from the promo but what is left after the discount, the platform commission and the ad spend. A promo that does not pay back looks like growth.'),
    ],
    [
      t('Аналитика и решения на её основе', 'Analytics — and acting on it'),
      t('Открыть отчёт — это не работа. Работа начинается, когда по нему что-то меняется в меню, ставках или ценах на этой неделе.',
        'Opening a report is not the work. The work starts when something in the menu, the bids or the prices changes because of it this week.'),
    ],
  ];

  const faq: Array<[string, string]> = [
    [
      t('Так сколько это часов в неделю?',
        'So how many hours a week is it?'),
      t('Мы не публикуем цифру в часах, потому что честная единица здесь — не часы, а роль. У ресторана на 500 заказов в месяц и на 3 000 объём разный, но набор ежедневных задач один и тот же, и он не помещается в «пару часов по пятницам». Если делать всё перечисленное, а не только смотреть отчёт, это функция полного рабочего дня.',
        'We do not publish an hours figure, because the honest unit here is a role, not hours. A restaurant at 500 orders a month and one at 3,000 differ in volume, but the daily task set is the same — and it does not fit into "a couple of hours on Fridays". Done properly rather than as report-reading, it is a full-time function.'),
    ],
    [
      t('А если просто загрузить меню и включить рекламу?',
        'What if I just upload the menu and switch ads on?'),
      t('Так делает большинство — и поэтому большинство считает, что «доставка не работает». Меню, загруженное как есть, не оптимизировано под поиск внутри приложения; реклама на такой карточке покупает просмотры без заказов. Работать начинает не то, что включено, а то, что настроено.',
        'That is what most owners do — and why most conclude that "delivery does not work". A menu uploaded as-is is not optimized for in-app search; ads on such a listing buy views without orders. What works is not what is switched on, but what is set up.'),
    ],
    [
      t('Можно нанять своего человека вместо агентства?',
        'Can I hire my own person instead of an agency?'),
      t('Да, и для большой сети это разумно. Считать нужно честно: зарплата такого сотрудника, время на его обучение и то, что учиться он будет на ваших аккаунтах и ваших ошибках. У агентства эти ошибки уже оплачены на других ресторанах.',
        'Yes, and for a large chain it makes sense. Just count honestly: that person’s salary, the time to train them, and the fact that they will learn on your accounts and your mistakes. An agency has already paid for those mistakes on other restaurants.'),
    ],
    [
      t('Что теряется, когда доставкой занимаются «по остатку»?',
        'What gets lost when delivery is done with whatever time is left?'),
      t('Не разовая выручка, а позиция. Ранжирование — накопительная величина: выключенные позиции, медленные ответы и неотвеченный негатив копятся в историю аккаунта. Вернуть позицию дороже и дольше, чем удержать.',
        'Not one-off revenue — position. Ranking is cumulative: switched-off items, slow replies and unanswered negatives accumulate into the account’s history. Regaining position costs more and takes longer than holding it.'),
    ],
  ];

  return (
    <AnswerLayout
      h1={t('Сколько времени занимает самому вести GrabFood и GoFood?',
            'How much time does running GrabFood and GoFood yourself take?')}
      lead={t(
        'Короткий ответ: это не «пара часов в неделю на аналитику», а функция полного рабочего дня — если делать её целиком, а не только смотреть отчёты. Но у вопроса есть более ранняя часть, которую обычно пропускают: до того как считать часы, нужно ответить, есть ли знание. Стартовую настройку и рекламу на этих площадках без специализированных знаний не сделать вообще — не «сделать хуже», а не сделать.',
        'Short answer: it is not "a couple of hours a week on analytics" but a full-time function — if you do the whole job rather than just read reports. But there is an earlier part of the question that usually gets skipped: before counting hours, you have to answer whether the knowledge is there. Setup and ads on these platforms cannot be done without specialist knowledge at all — not done worse, not done.'
      )}
      schemas={[
        faqPageSchema(faq),
        articleSchema({
          headline: t('Сколько времени и знаний требует самостоятельное ведение GrabFood и GoFood',
                      'The time and knowledge it takes to run GrabFood and GoFood yourself'),
          url: URL,
          about:
            'GrabFood account management, GoFood management, delivery operations, GrabAds, restaurant delivery ranking',
        }),
      ]}
    >
      <Block card title={t('Часть первая: стартовая настройка', 'Part one: the initial setup')}>
        <p className="text-brand-muted max-w-3xl">
          {t(
            'Самое частое заблуждение владельца звучит так: «я загрузил меню, дальше оно работает само». Не работает. Без оптимизации под поиск внутри приложения, без правильной структуры и порядка позиций в меню, без правильных фотографий карточка просто не показывается тем, кто ищет вашу категорию. Это не вопрос старательности и не вопрос времени — это вопрос знания того, как устроена выдача. Первичную настройку без него сделать невозможно, сколько часов в неё ни вложи.',
            'The most common owner assumption sounds like this: "I uploaded the menu, now it works by itself." It does not. Without optimization for in-app search, without the right structure and order of items, without the right photos, the listing simply is not shown to people searching your category. This is not a question of diligence or of time — it is a question of knowing how the ranking works. The initial setup cannot be done without that, no matter how many hours go into it.'
          )}
        </p>
      </Block>

      <Block card title={t('Часть вторая: почему реклама здесь работает не так, как вы привыкли',
                           'Part two: why ads here do not work the way you expect')}>
        <p className="text-brand-muted max-w-3xl mb-4">
          {t(
            'Это главное, чего не понимают почти все. Grab и Gojek — не рекламные площадки. Рекламная сеть зарабатывает на показах и кликах, и потому продаёт вам место в выдаче на аукционе. Grab и Gojek зарабатывают на комиссии с заказов, а их главный актив — собственная аудитория. Отсюда следует всё остальное: их алгоритм ранжирования зависит прежде всего от того, насколько хорошо вы монетизируете эту аудиторию.',
            'This is what almost nobody gets. Grab and Gojek are not ad networks. An ad network earns on impressions and clicks, and therefore auctions you a place in the results. Grab and Gojek earn a commission on orders, and their core asset is their own audience. Everything else follows from that: their ranking algorithm depends first of all on how well you monetise that audience.'
          )}
        </p>
        <p className="text-brand-muted max-w-3xl">
          {t(
            'Практический вывод: ставка за клик усиливает вашу позицию, но не создаёт её. Ресторан, который превращает показ в заказ и держит высокий средний чек, площадке выгоднее — и она поднимает его сама, потому что зарабатывает на нём больше. Поэтому самое сложное здесь — не «настроить рекламу», а понимать, как привлечь аудиторию и продать ей с высокой конверсией и высоким чеком. Эта часть и есть работа; ставки — только рычаг усиления.',
            'The practical consequence: your cost per click amplifies your position but does not create it. A restaurant that turns an impression into an order and holds a high average check is worth more to the platform — so the platform lifts it on its own, because it earns more from it. Which is why the hard part here is not "setting up ads" but understanding how to attract that audience and sell to it with high conversion and a high check. That part is the work; bidding is only the amplifier.'
          )}
        </p>
      </Block>

      <Block card title={t('Часть третья: что происходит каждый день', 'Part three: what happens every day')}>
        <p className="text-brand-muted max-w-3xl mb-6">
          {t(
            'Допустим, настройка сделана и реклама включена. Дальше начинается то, что обычно и не закладывают в расчёт времени:',
            'Say the setup is done and ads are running. What begins then is what usually never makes it into the time estimate:'
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

      <Block title={t('Честный вывод', 'The honest conclusion')}>
        <p className="text-brand-muted max-w-3xl">
          {t(
            'Если сложить всё вместе — не только настройку и еженедельную аналитику, но и контроль стоп-листа, ответы на отзывы, работу с негативом и оспаривание несправедливых отзывов, — получается не задача владельца между делом, а полноценный сотрудник, который занимается доставкой постоянно, полный рабочий день. Поэтому реальный выбор не «делать самому или отдать», а «нанять и обучить своего человека или отдать команде, у которой это уже поставлено».',
            'Put it all together — not just setup and weekly analytics, but stop-list control, review replies, negative handling and contesting unfair reviews — and what you get is not an owner’s side task but a full-time employee working on delivery every day. So the real choice is not "do it myself or hand it over" but "hire and train my own person, or hand it to a team that already runs this".'
          )}
        </p>
      </Block>

      <Block>
        <p className="text-brand-muted">
          {t('Смежные ответы: ', 'Related answers: ')}
          <Link href="/answers/grabfood-gofood-account-management" className="text-brand-green hover:underline">
            {t('можно ли отдать ведение аккаунта', 'can I hand the account over')}
          </Link>
          {' · '}
          <Link href="/answers/grabfood-ads-not-working" className="text-brand-green hover:underline">
            {t('почему реклама не приносит заказов', 'why ads bring no orders')}
          </Link>
          {' · '}
          <Link href="/method" className="text-brand-green hover:underline">
            {t('метод целиком', 'the full method')}
          </Link>
        </p>
      </Block>

      <FaqList faq={faq} title={t('Частые вопросы', 'Frequently asked')} />

      <AnswerCta />
    </AnswerLayout>
  );
}
