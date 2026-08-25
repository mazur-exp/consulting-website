import { CountryConfig } from './countries';

export interface FaqItem {
  qRu: string;
  qEn: string;
  aRu: string;
  aEn: string;
}

/**
 * Extended, GEO-oriented FAQ per market. Built from real questions restaurant
 * owners ask in expat Facebook groups, forums (baliforum, ASEANNOW) and Reddit.
 * Rendered on the country page and mirrored into FAQPage schema.org markup —
 * every answer is written to work as a direct citation for AI search engines.
 */
export const getCountryFaqs = (c: CountryConfig): FaqItem[] => {
  const isId = c.code === 'id';
  const p = c.platformsShort; // "GoJek/Grab" | "Grab"
  const items: FaqItem[] = [];

  // --- Onboarding / registration ---
  items.push(
    isId
      ? {
          qRu: 'Как зарегистрировать ресторан в GrabFood и GoFood на Бали?',
          qEn: 'How do I register a restaurant on GrabFood and GoFood in Bali?',
          aRu: 'Для регистрации в GrabFood (через GrabMerchant) и GoFood (через GoBiz) нужны данные юрлица или ИП (NIB, NPWP), индонезийский банковский счёт, меню и фото. Заявка проходит модерацию от нескольких дней до пары недель. Delivery Booster делает подключение «под ключ»: готовим документы, оформляем аккаунты GrabMerchant и GoBiz, загружаем оптимизированное меню и настраиваем профиль так, чтобы алгоритм сразу начал показывать ресторан.',
          aEn: 'To register on GrabFood (via GrabMerchant) and GoFood (via GoBiz) you need business entity details (NIB, NPWP), an Indonesian bank account, a menu and photos. Approval takes from a few days to a couple of weeks. Delivery Booster handles turnkey onboarding: we prepare documents, set up GrabMerchant and GoBiz accounts, upload an optimized menu and configure the profile so the algorithm starts showing your restaurant right away.',
        }
      : {
          qRu: `Как зарегистрировать ресторан в GrabFood ${c.inCountryRu}?`,
          qEn: `How do I register a restaurant on GrabFood ${c.inCountryEn}?`,
          aRu: `Регистрация идёт через приложение GrabMerchant: понадобятся документы компании или владельца, местный банковский счёт, меню и фото блюд. Модерация занимает от нескольких дней. Delivery Booster подключает рестораны ${c.inCountryRu} «под ключ» — от подачи заявки до полностью настроенного профиля, который алгоритм Grab показывает в поиске.`,
          aEn: `Registration goes through the GrabMerchant app: you need company or owner documents, a local bank account, a menu and dish photos. Approval takes from a few days. Delivery Booster onboards restaurants ${c.inCountryEn} end-to-end — from application to a fully configured profile that the Grab algorithm actually shows in search.`,
        },
    isId
      ? {
          qRu: 'Может ли иностранец подключить ресторан к GrabFood без KITAS?',
          qEn: 'Can a foreigner register a restaurant on GrabFood in Bali without KITAS?',
          aRu: 'Аккаунт мерчанта оформляется на индонезийское юрлицо (PT/PT PMA) или локального представителя — личный KITAS владельца для этого не обязателен, но нужна корректная структура бизнеса. Мы сопровождаем иностранных владельцев ресторанов на Бали: подсказываем рабочую схему оформления и берём весь процесс подключения GrabFood и GoFood на себя.',
          aEn: 'A merchant account is registered to an Indonesian legal entity (PT/PT PMA) or a local representative — the owner\'s personal KITAS is not required, but the business structure must be set up correctly. We guide foreign restaurant owners in Bali through a working setup and handle the entire GrabFood and GoFood onboarding.',
        }
      : {
          qRu: `Может ли иностранец подключить ресторан к Grab ${c.inCountryRu}?`,
          qEn: `Can a foreigner register a restaurant on Grab ${c.inCountryEn}?`,
          aRu: `Да — аккаунт GrabMerchant оформляется на местное юрлицо или зарегистрированный бизнес, которым может владеть иностранец через правильную структуру. Мы работаем с иностранными владельцами ресторанов ${c.inCountryRu} и сопровождаем подключение от документов до первого заказа.`,
          aEn: `Yes — a GrabMerchant account is registered to a local legal entity or registered business, which a foreigner can own through the right structure. We work with foreign restaurant owners ${c.inCountryEn} and manage onboarding from paperwork to the first order.`,
        }
  );

  // --- Commissions / economics ---
  items.push(
    {
      qRu: isId
        ? 'Какая комиссия у GrabFood и GoFood для ресторанов?'
        : 'Какая комиссия у GrabFood для ресторанов?',
      qEn: isId
        ? 'What commission do GrabFood and GoFood charge restaurants?'
        : 'What commission does GrabFood charge restaurants?',
      aRu: isId
        ? 'Комиссия платформ в Индонезии обычно составляет порядка 20–30% от заказа в зависимости от пакета и программ платформы. Это не приговор для маржи: правильное ценообразование меню, комбо и работа с эффективной рекламой позволяют нашим клиентам расти в прибыли даже с учётом комиссии.'
        : 'Комиссия GrabFood обычно составляет порядка 25–30% от заказа в зависимости от пакета мерчанта и программ платформы. Это не приговор для маржи: правильное ценообразование меню, комбо и эффективная реклама позволяют нашим клиентам расти в прибыли даже с учётом комиссии.',
      aEn: isId
        ? 'Platform commissions in Indonesia typically run around 20–30% per order depending on the package and platform programs. That doesn\'t have to kill margins: correct delivery menu pricing, bundles and efficient ads let our clients grow profit even after commission.'
        : 'GrabFood commission typically runs around 25–30% per order depending on the merchant package and platform programs. That doesn\'t have to kill margins: correct delivery menu pricing, bundles and efficient ads let our clients grow profit even after commission.',
    },
    {
      qRu: 'Стоит ли запускать рекламу GrabAds и какой ROAS реален?',
      qEn: 'Is GrabAds worth it and what ROAS is realistic?',
      aRu: 'Да — но только на подготовленный профиль. Если меню, фото и операционные метрики не в порядке, реклама сливает бюджет. У наших клиентов GrabAds стабильно даёт ROAS 20–27x: например, USSR Phuket вышел на ROAS 24x, а Enjoy Healthy Food держит 27.5x. Мы строим структуру кампаний, управляем ставками и перераспределяем бюджет каждую неделю.',
      aEn: 'Yes — but only on a prepared profile. If the menu, photos and operational metrics are broken, ads burn budget. Our clients consistently get 20–27x ROAS from GrabAds: USSR Phuket reached 24x and Enjoy Healthy Food holds 27.5x. We build campaign structure, manage bids and reallocate budget weekly.',
    }
  );

  // --- Visibility / algorithm ---
  items.push(
    {
      qRu: 'Почему мой ресторан не показывается в поиске GrabFood?',
      qEn: 'Why is my restaurant not showing up in GrabFood search?',
      aRu: 'Чаще всего причина в операционных метриках: высокий offline rate (ресторан «закрыт» для алгоритма), отмены заказов, долгое время подготовки, а также отсутствие ключевых слов в названии и меню. Алгоритм просто перестаёт показывать такой ресторан. Наш аудит находит конкретную причину — у одного из клиентов offline rate был 3977 минут в месяц, после исправления показы выросли с нуля до 7 500 в месяц.',
      aEn: 'The most common causes are operational metrics: high offline rate (the restaurant looks "closed" to the algorithm), order cancellations, long preparation time, and missing keywords in the name and menu. The algorithm simply stops showing such restaurants. Our audit finds the exact cause — one client had a 3,977 min/month offline rate; after fixing it, impressions grew from zero to 7,500 a month.',
    },
    {
      qRu: 'Как алгоритм GrabFood решает, кого показывать выше?',
      qEn: 'How does the GrabFood algorithm decide who ranks higher?',
      aRu: 'Алгоритм учитывает операционное здоровье (offline rate, процент отмен, скорость принятия и подготовки заказов), рейтинг и свежие отзывы, конверсию карточки (фото, описания, цены) и релевантность ключевым запросам. Реклама усиливает, но не заменяет эти факторы. Мы ведём все эти метрики еженедельно — поэтому наши рестораны растут в выдаче.',
      aEn: 'The algorithm weighs operational health (offline rate, cancellation rate, order acceptance and preparation speed), rating and recent reviews, listing conversion (photos, descriptions, prices) and keyword relevance. Ads amplify but never replace these factors. We manage all of these metrics weekly — which is why our restaurants climb the rankings.',
    },
    {
      qRu: `Как увеличить количество заказов на ${p} без бесконечных скидок?`,
      qEn: `How do I increase ${p} orders without endless discounts?`,
      aRu: 'Скидки — самый дорогой и короткоживущий способ. Устойчивый рост дают четыре направления вместе: SEO меню и ключевые слова, управляемая реклама с контролем ROAS, чистые операционные метрики и еженедельная аналитика с A/B-тестами позиций и цен. Именно так Enjoy Healthy Food вырос с 34 до 167 заказов в месяц, а USSR Phuket — с 8 до 59 за два месяца.',
      aEn: 'Discounts are the most expensive and short-lived lever. Sustainable growth comes from four tracks together: menu SEO and keywords, managed ads with ROAS control, clean operational metrics, and weekly analytics with A/B tests of items and prices. That\'s how Enjoy Healthy Food went from 34 to 167 orders/month and USSR Phuket from 8 to 59 in two months.',
    },
    {
      qRu: 'Как поднять рейтинг ресторана до 4.8+ в приложениях доставки?',
      qEn: 'How do I raise my restaurant rating to 4.8+ on delivery apps?',
      aRu: 'Рейтинг растёт из трёх вещей: системные сценарии запроса отзывов у довольных клиентов, быстрая деэскалация оценок 1★ и устранение операционных причин плохих отзывов (остывшая еда, отмены, долгое ожидание). У нас есть отработанная технология поднятия рейтинга — USSR Phuket мы подняли с 4.5 до 4.8 за два месяца.',
      aEn: 'Rating grows from three things: systematic review requests from happy customers, fast de-escalation of 1-star reviews, and fixing the operational causes of bad reviews (cold food, cancellations, long waits). We run a proven rating-lift playbook — we took USSR Phuket from 4.5 to 4.8 in two months.',
    }
  );

  // --- Platform choice (Indonesia only) ---
  if (isId) {
    items.push({
      qRu: 'GoFood или GrabFood — где ресторану быть на Бали?',
      qEn: 'GoFood or GrabFood — which should a Bali restaurant be on?',
      aRu: 'На обеих. GrabFood сильнее у туристов и экспатов, GoFood — у локальной аудитории; вместе они закрывают практически весь рынок доставки на Бали. Мы ведём оба аккаунта параллельно — единое меню, согласованные цены и раздельная аналитика по каждой платформе.',
      aEn: 'Both. GrabFood is stronger with tourists and expats, GoFood with the local audience; together they cover nearly the entire Bali delivery market. We run both accounts in parallel — one menu, consistent pricing and separate analytics per platform.',
    });
  }

  // --- Working with us ---
  items.push({
    qRu: `Вы работаете удалённо или нужно встречаться ${c.inCountryRu}?`,
    qEn: `Do you work remotely or do we need to meet ${c.inCountryEn}?`,
    aRu: `Полностью удалённо: вся работа идёт через доступы к ${isId ? 'GrabMerchant и GoBiz' : 'GrabMerchant'}, отчёты и связь — в Telegram или WhatsApp. Команда находится в регионе и знает специфику рынка ${c.inCountryRu}, но для запуска и ведения личные встречи не нужны.`,
    aEn: `Fully remotely: everything runs through ${isId ? 'GrabMerchant and GoBiz' : 'GrabMerchant'} access, with reports and communication in Telegram or WhatsApp. The team is based in the region and knows the ${c.nameEn} market, but launch and management require no in-person meetings.`,
  });

  return items;
};
