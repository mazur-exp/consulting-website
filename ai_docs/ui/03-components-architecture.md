# Components Architecture — Delivery Booster

Архитектура компонентов и их взаимодействие в проекте Delivery Booster.

---

## 📁 Структура компонентов

```
client/src/
├── components/
│   ├── ui/                         # 47 базовых UI компонентов (shadcn/ui)
│   │   ├── accordion.tsx
│   │   ├── alert-dialog.tsx
│   │   ├── avatar.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── carousel.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── popover.tsx
│   │   ├── scroll-area.tsx
│   │   ├── select.tsx
│   │   ├── tabs.tsx
│   │   ├── toast.tsx
│   │   ├── toaster.tsx
│   │   ├── tooltip.tsx
│   │   └── ... (еще 32 компонента)
│   │
│   ├── AnimatedBackground.tsx      # Анимированный фон (плавающие блобы)
│   ├── Header.tsx                  # Навигационная шапка (fixed)
│   ├── Footer.tsx                  # Подвал сайта
│   ├── LanguageToggle.tsx          # Переключатель языка (RU/EN)
│   ├── HeroSection.tsx             # Главная секция (заголовок + галерея)
│   ├── TargetAudienceSection.tsx   # Целевая аудитория
│   ├── ServicesSection.tsx         # 6 услуг
│   ├── WorkProcessSection.tsx      # Процесс работы
│   ├── CaseStudiesSection.tsx      # 4 кейса с lightbox
│   ├── TestimonialsSection.tsx     # 3 отзыва с каруселью
│   ├── FounderSection.tsx          # Об основателе
│   ├── CTASection.tsx              # Призыв к действию
│   └── VideoSection.tsx            # Видео YouTube
│
├── hooks/
│   ├── useLanguage.tsx             # Контекст и хук для i18n
│   ├── use-mobile.tsx              # Определение мобильного устройства
│   └── use-toast.ts                # Управление toast уведомлениями
│
├── lib/
│   ├── utils.ts                    # Утилиты (cn, clsx)
│   └── queryClient.ts              # TanStack Query клиент
│
├── pages/
│   ├── home.tsx                    # Главная страница (композиция секций)
│   └── not-found.tsx               # 404 страница
│
├── App.tsx                         # Root компонент (роутинг, провайдеры)
├── main.tsx                        # Точка входа React
└── index.css                       # Глобальные стили
```

---

## 🏗️ Архитектура приложения

### App.tsx — Root компонент
```tsx
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <Toaster />
          <Router />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
```

**Провайдеры (снаружи → внутрь):**
1. `QueryClientProvider` — TanStack React Query для API запросов
2. `TooltipProvider` — Radix UI tooltips
3. `LanguageProvider` — Custom контекст для двуязычности (RU/EN)
4. `Toaster` — Toast уведомления (Radix UI)
5. `Router` — Wouter роутинг

---

## 📄 Структура страниц

### home.tsx — Главная страница
```tsx
export default function Home() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text overflow-x-hidden">
      <AnimatedBackground />
      <Header />

      <main className="relative pt-16 z-10">
        <HeroSection />
        <TargetAudienceSection />
        <ServicesSection />
        <WorkProcessSection />
        <CaseStudiesSection />
        <TestimonialsSection />
        <FounderSection />
        <CTASection />
        <VideoSection />
      </main>

      <Footer />
    </div>
  );
}
```

**Порядок секций:**
1. `AnimatedBackground` — фиксированный фон (z-0)
2. `Header` — фиксированная навигация (z-50)
3. `<main>` — основной контент (z-10, pt-16 для header)
4. 9 секций контента по порядку
5. `Footer` — подвал

---

## 🧩 Основные компоненты

### 1. Header (Навигация)

**Файл:** `client/src/components/Header.tsx`

```tsx
export const Header = () => {
  const { t } = useLanguage();

  return (
    <header className="fixed top-0 w-full z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          {/* Лого */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 brand-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DB</span>
            </div>
            <span className="text-xl font-bold text-brand-text">Delivery Booster</span>
          </div>

          {/* Действия */}
          <div className="flex items-center space-x-4">
            <a href="https://t.me/DeliveryBoosterBot" className="glass-card ...">
              {t("Чат-бот Delivery Booster", "Delivery Booster Chat-bot")}
            </a>
            <LanguageToggle />
          </div>
        </nav>
      </div>
    </header>
  );
};
```

**Особенности:**
- `fixed top-0` — фиксированная позиция сверху
- `glass-nav` — стеклянный эффект с blur
- `z-50` — поверх всего контента
- Лого слева (DB градиент + текст)
- Справа: ссылка на бота + переключатель языка

**Зависимости:**
- `useLanguage()` для переводов
- `LanguageToggle` компонент

---

### 2. LanguageToggle (Переключатель языка)

**Файл:** `client/src/components/LanguageToggle.tsx`

```tsx
export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 glass-card px-3 py-2 rounded-lg">
      <button
        onClick={() => setLanguage('ru')}
        className={`px-2 py-1 rounded text-sm font-medium transition-all ${
          language === 'ru'
            ? 'bg-brand-primary text-white'
            : 'text-brand-muted hover:text-brand-text'
        }`}
      >
        RU
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 rounded text-sm font-medium transition-all ${
          language === 'en'
            ? 'bg-brand-primary text-white'
            : 'text-brand-muted hover:text-brand-text'
        }`}
      >
        EN
      </button>
    </div>
  );
};
```

**Особенности:**
- Две кнопки (RU / EN)
- Активная кнопка: зеленый фон (`bg-brand-primary`)
- Неактивная: серый текст с hover эффектом
- Glass morphism фон

---

### 3. HeroSection (Главная секция)

**Файл:** `client/src/components/HeroSection.tsx`

```tsx
export const HeroSection = () => {
  const { t } = useLanguage();

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const fadeInUpDelayed = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut", delay: 0.2 }
  };

  return (
    <section className="relative py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Левая колонка: текст + кнопки */}
          <motion.div className="space-y-8" {...fadeInUp}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              {t("Рост заказов на Grab/Gojek...", "Grow Grab/Gojek orders...")}
            </h1>

            <p className="text-xl text-brand-muted leading-relaxed">
              {t("Прокачиваем карточки...", "We fix cards...")}
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="https://t.me/delivery_booster" className="brand-gradient ...">
                {t("Получить бесплатную диагностику", "Book a free audit")}
              </a>
              <a href="https://t.me/DeliveryBoosterBot" className="glass-card ...">
                {t("Чат-бот", "Chat-bot")}
              </a>
              <a href="https://t.me/DeliveryBoosterBali" className="glass-card ...">
                {t("Канал в Telegram", "Telegram channel")}
              </a>
            </div>
          </motion.div>

          {/* Правая колонка: галерея 2×2 */}
          <motion.div {...fadeInUpDelayed}>
            <div className="glass-card p-4 rounded-2xl">
              <div className="grid grid-cols-2 gap-3">
                <img src="/image1.jpg" className="w-full h-40 object-cover rounded-lg" />
                <img src="/image2.jpg" className="w-full h-40 object-cover rounded-lg" />
                <img src="/image3.jpg" className="w-full h-40 object-cover rounded-lg" />
                <img src="/image4.jpg" className="w-full h-40 object-cover rounded-lg" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
```

**Структура:**
- Grid 2 колонки на desktop (1 на mobile)
- Левая: H1 + подзаголовок + 3 кнопки
- Правая: галерея из 4 изображений (2×2)
- Анимация: левая колонка сразу, правая с задержкой 0.2s

**Кнопки:**
1. Primary CTA (зеленый градиент) — консультация
2. Glass button — чат-бот
3. Glass button — Telegram канал

---

### 4. ServicesSection (Услуги)

**Файл:** `client/src/components/ServicesSection.tsx`

```tsx
export const ServicesSection = () => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const services = [
    {
      title: "Profile & Cards",
      description: {
        ru: "Фото, тексты, теги...",
        en: "Photos, copy, tags..."
      }
    },
    // ... еще 5 услуг
  ];

  return (
    <section className="py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12" {.../* fade in animation */}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t("Что именно мы делаем", "What we do")}
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-card p-6 rounded-2xl hover:bg-white/10 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-3 text-center">{service.title}</h3>
              <p className="text-brand-muted">
                {t(service.description.ru, service.description.en)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
```

**Структура:**
- Заголовок секции (H2)
- Grid 3 колонки (2 на tablet, 1 на mobile)
- 6 карточек услуг с stagger анимацией
- Каждая карточка: заголовок + описание
- Hover эффект: светлый overlay

**Данные:**
Массив `services` с 6 объектами (title + description на RU/EN)

---

### 5. CaseStudiesSection (Кейсы с Lightbox)

**Файл:** `client/src/components/CaseStudiesSection.tsx`

```tsx
export const CaseStudiesSection = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const caseImages = [
    { src: "/Cases/magic lamp/...", alt: "..." },
    { src: "/Cases/soul/...", alt: "..." },
    { src: "/Cases/mamu/...", alt: "..." },
    { src: "/Cases/huge/...", alt: "..." }
  ];

  return (
    <section className="py-16 border-t border-white/10">
      {/* Заголовок */}
      <motion.div className="text-center mb-12" {.../* animation */}>
        <h2>{t("Снимки кейсов", "Case snapshots")}</h2>
      </motion.div>

      {/* Сетка 4 изображения */}
      <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4" {.../* stagger */}>
        {caseImages.map((image, index) => (
          <motion.div
            key={index}
            onClick={() => setSelectedImage(index)}
            className="glass-card p-4 rounded-xl cursor-pointer hover:bg-white/10"
          >
            <img src={image.src} className="w-full h-32 object-cover rounded-lg
                                           hover:scale-105 transition-transform" />
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button onClick={() => setSelectedImage(null)}>X</button>
          <button onClick={handlePrevious}>←</button>
          <button onClick={handleNext}>→</button>
          <img src={caseImages[selectedImage].src} className="max-w-full max-h-full" />
          <p>{selectedImage + 1} / {caseImages.length}</p>
        </div>
      )}
    </section>
  );
};
```

**Функциональность:**
- Grid 4 колонки (2 на mobile)
- Клик на изображение → открывает Lightbox
- Lightbox:
  - Полноэкранный черный фон (`bg-black/90`)
  - Кнопки: закрыть (X), предыдущее (←), следующее (→)
  - Индикатор: "2 / 4"
  - Навигация по стрелкам

**State:**
- `selectedImage: number | null` — индекс выбранного изображения

---

### 6. TestimonialsSection (Отзывы с каруселью)

**Файл:** `client/src/components/TestimonialsSection.tsx`

```tsx
import useEmblaCarousel from 'embla-carousel-react';

export const TestimonialsSection = () => {
  const { t } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const testimonials = [
    {
      name: { ru: "Арина", en: "Arina" },
      restaurant: { ru: "Only Eggs", en: "Only Eggs" },
      text: { ru: "За первый месяц...", en: "Orders increased..." },
      rating: 5
    },
    // ... еще 2 отзыва
  ];

  return (
    <section className="py-16 border-t border-white/10">
      {/* Заголовок */}
      <motion.div className="text-center mb-12">
        <h2>{t("Отзывы", "Testimonials")}</h2>
      </motion.div>

      {/* Карусель */}
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-4"
              >
                <div className="glass-card p-6 rounded-xl h-full flex flex-col">
                  <Quote className="w-10 h-10 text-brand-primary mb-4 opacity-50" />
                  <p className="text-brand-text mb-6 flex-grow">
                    {t(testimonial.text.ru, testimonial.text.en)}
                  </p>
                  <div className="flex items-center gap-1 mb-4">
                    {/* 5 звезд */}
                    {[...Array(5)].map((_, i) => <svg>★</svg>)}
                  </div>
                  <div>
                    <p className="font-semibold">{t(testimonial.name.ru, ...)}</p>
                    <p className="text-sm text-brand-muted">{t(testimonial.restaurant.ru, ...)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Кнопки навигации */}
        <button onClick={scrollPrev} className="absolute left-0 ...">←</button>
        <button onClick={scrollNext} className="absolute right-0 ...">→</button>
      </div>

      {/* Точки индикации */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2 rounded-full transition-all ${
              selectedIndex === index ? 'w-8 bg-brand-primary' : 'w-2 bg-white/30'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
```

**Функциональность:**
- **Embla Carousel** — карусель с бесконечной прокруткой
- Responsive:
  - Mobile: 1 карточка
  - Tablet: 2 карточки
  - Desktop: 3 карточки
- Навигация: стрелки влево/вправо
- Индикаторы: точки внизу (активная — длинная линия)
- Каждая карточка: иконка Quote + текст + звезды + имя + ресторан

---

### 7. AnimatedBackground (Фон)

**Файл:** `client/src/components/AnimatedBackground.tsx`

```tsx
export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div
        className="absolute w-96 h-96 -top-20 -left-20 animate-float"
        style={{
          background: 'radial-gradient(closest-side, rgba(41, 194, 103, 0.28), transparent 65%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute w-80 h-80 top-1/3 right-0 animate-float-delayed"
        style={{
          background: 'radial-gradient(closest-side, rgba(41, 194, 103, 0.28), transparent 65%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute w-72 h-72 bottom-0 left-1/3 animate-float-delayed-2"
        style={{
          background: 'radial-gradient(closest-side, rgba(41, 194, 103, 0.28), transparent 65%)',
          filter: 'blur(40px)',
        }}
      />
    </div>
  );
};
```

**Особенности:**
- 3 круга с радиальным градиентом (зеленый)
- Blur 40px (сильное размытие)
- Анимация `float` с разными задержками
- `fixed inset-0` — фиксированный на весь экран
- `pointer-events-none` — не блокирует клики
- `z-0` — за всем контентом

---

## 🔌 Хуки (Hooks)

### useLanguage()

**Файл:** `client/src/hooks/useLanguage.tsx`

```tsx
type Language = 'ru' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (ru: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('ru');

  const t = (ru: string, en: string): string => {
    return language === 'ru' ? ru : en;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
```

**API:**
- `language: 'ru' | 'en'` — текущий язык
- `setLanguage(lang)` — установить язык
- `t(ru, en)` — функция перевода

**Использование:**
```tsx
const { t } = useLanguage();
<h1>{t("Заголовок", "Title")}</h1>
```

**По умолчанию:** русский (`'ru'`)

---

## 🎨 UI компоненты (shadcn/ui)

### Установленные компоненты (47 шт.)

**Список:**
- accordion, alert-dialog, aspect-ratio, avatar
- badge, breadcrumb, button, calendar, card, carousel
- chart, checkbox, collapsible, command, context-menu
- dialog, drawer, dropdown-menu, form
- hover-card, input, input-otp, label, menubar
- navigation-menu, pagination, popover, progress
- radio-group, resizable, scroll-area, select, separator
- sheet, sidebar, skeleton, slider, sonner, switch
- table, tabs, textarea, toast, toaster, toggle
- toggle-group, tooltip

**Паттерн shadcn/ui:**
```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

<Card>
  <CardHeader>Header</CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

**Все компоненты:**
- Используют Radix UI (headless components)
- Полностью кастомизируемы через Tailwind
- Type-safe TypeScript
- Accessibility (a11y) built-in

**В проекте активно используются:**
- `toast` / `toaster` — уведомления
- `tooltip` — подсказки
- Остальные готовы к использованию, но пока не задействованы

---

## 📦 Утилиты (lib/)

### utils.ts

```tsx
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Функция `cn()`:**
- Комбинирует классы с помощью `clsx`
- Мержит Tailwind классы с помощью `twMerge`
- Используется для условных классов:

```tsx
<div className={cn(
  "base-class",
  isActive && "active-class",
  variant === "primary" && "primary-class"
)}>
  Content
</div>
```

### queryClient.ts

```tsx
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey: [url] }) => {
        const response = await fetch(url as string);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      },
    },
  },
});
```

**Настройки:**
- Дефолтный `queryFn` для всех запросов
- Автоматический fetch по URL из queryKey
- Error handling для HTTP ошибок

**Использование:**
```tsx
const { data, isLoading } = useQuery({
  queryKey: ['/api/data'],
});
```

**Примечание:** В текущей версии API запросы не используются (статичный лендинг).

---

## 🎯 Паттерны разработки

### 1. Секция (Section Pattern)

Стандартная структура секции:

```tsx
export const MySection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t("Заголовок RU", "Title EN")}
          </h2>
        </motion.div>

        {/* Контент секции */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Карточки или контент */}
        </div>
      </div>
    </section>
  );
};
```

**Компоненты:**
- `<section>` — внешний wrapper
- `py-16` — вертикальные отступы
- `border-t border-white/10` — верхняя граница
- `max-w-7xl mx-auto` — центрированный контейнер
- Заголовок H2 с анимацией
- Grid для карточек

---

### 2. Карточка (Card Pattern)

Стандартная карточка:

```tsx
<motion.div
  className="glass-card p-6 rounded-2xl hover:bg-white/10 transition-all duration-300"
  variants={itemVariants}
>
  <h3 className="text-xl font-semibold mb-3">{title}</h3>
  <p className="text-brand-muted">{description}</p>
</motion.div>
```

**Компоненты:**
- `glass-card` — стеклянный эффект
- `p-6` — внутренние отступы
- `rounded-2xl` — скругление
- `hover:bg-white/10` — hover эффект
- `transition-all duration-300` — плавная анимация

---

### 3. Кнопка (Button Pattern)

#### Primary CTA:
```tsx
<a
  href="..."
  className="brand-gradient text-white px-6 py-3 rounded-xl font-medium
             brand-shadow hover:brand-shadow-hover transition-all duration-300
             transform hover:scale-105"
>
  {t("Текст RU", "Text EN")}
</a>
```

#### Secondary Button:
```tsx
<a
  href="..."
  className="glass-card px-6 py-3 rounded-xl font-medium
             hover:bg-white/10 transition-all duration-300"
>
  {t("Текст RU", "Text EN")}
</a>
```

---

## 🔄 Взаимодействие компонентов

### Поток данных (Data Flow)

```
App.tsx
  └─ LanguageProvider (language state)
       └─ Router
            └─ Home Page
                 ├─ Header → useLanguage()
                 ├─ HeroSection → useLanguage()
                 ├─ ServicesSection → useLanguage()
                 ├─ CaseStudiesSection → useLanguage() + local state (lightbox)
                 ├─ TestimonialsSection → useLanguage() + Embla Carousel state
                 └─ Footer → useLanguage()
```

**Основной state:**
- `language` (глобальный) — контекст LanguageProvider
- `selectedImage` (локальный) — CaseStudiesSection для lightbox
- `emblaApi` + `selectedIndex` (локальный) — TestimonialsSection для карусели

**Нет Redux/Zustand** — используется React Context для i18n, остальное локальный state.

---

## 📋 Чек-лист для новых компонентов

- [ ] Импортировать `useLanguage()` для переводов
- [ ] Использовать `motion.div` для анимаций
- [ ] Добавить `whileInView` с `viewport={{ once: true }}`
- [ ] Структура: `<section>` → `<div max-w-7xl>` → контент
- [ ] Заголовок H2 с анимацией fade-in
- [ ] Карточки с `glass-card` классом
- [ ] Hover эффекты: `hover:bg-white/10` или `hover:scale-105`
- [ ] Responsive: mobile-first подход
- [ ] data-testid атрибуты для тестирования
- [ ] Accessibility: ARIA labels где нужно

---

**Версия:** 1.0
**Обновлено:** 2025-11-25
