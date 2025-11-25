# Design System — Delivery Booster

Полная спецификация дизайн-системы проекта Delivery Booster.

---

## 🎨 Цветовая палитра

### Брендовые цвета (Brand Colors)

Основная фирменная палитра проекта — **темно-зеленая тема** с акцентами ярко-зеленого цвета.

```css
/* Основные брендовые цвета */
--brand-green: hsl(142 67% 35%)        /* #29C267 — основной зеленый */
--brand-green-light: hsl(142 65% 47%) /* #4BD87C — светлый зеленый */
--brand-bg: hsl(135 28% 6%)           /* #0A0F0C — темный фон */
--brand-text: hsl(135 35% 92%)        /* #E8F4EA — светлый текст */
--brand-muted: hsl(135 25% 82%)       /* #CDE5D1 — приглушенный текст */
```

**Использование:**
- `brand-green` — основной акцентный цвет (кнопки, ссылки, акценты)
- `brand-green-light` — светлый оттенок для hover-эффектов и градиентов
- `brand-bg` — темный фон всего сайта
- `brand-text` — основной цвет текста (светлый на темном фоне)
- `brand-muted` — второстепенный текст (описания, подписи)

### Семантические цвета (Semantic Colors)

```css
/* Основные (Light mode - не используется, но определено) */
--background: hsl(0 0% 100%)
--foreground: hsl(210 25% 7.8431%)

/* Основные (Dark mode - активная тема) */
--background: hsl(135 28% 6%)         /* = brand-bg */
--foreground: hsl(135 35% 92%)        /* = brand-text */

/* Компоненты */
--card: hsl(228 9.8039% 10%)          /* Фон карточек */
--card-foreground: hsl(0 0% 85.0980%) /* Текст карточек */

--popover: hsl(135 28% 6%)            /* Фон всплывающих окон */
--popover-foreground: hsl(135 35% 92%)

/* Акценты */
--primary: hsl(142 67% 35%)           /* = brand-green */
--primary-foreground: hsl(0 0% 100%)  /* Белый текст на зеленом */

--secondary: hsl(195 15.3846% 94.9020%)
--secondary-foreground: hsl(210 25% 7.8431%)

--accent: hsl(205.7143 70% 7.8431%)   /* Темно-синий акцент */
--accent-foreground: hsl(142 65% 47%) /* = brand-green-light */

/* Состояния */
--destructive: hsl(356.3033 90.5579% 54.3137%) /* Красный для ошибок */
--destructive-foreground: hsl(0 0% 100%)

--muted: hsl(135 15% 15%)             /* Приглушенный фон */
--muted-foreground: hsl(135 25% 82%)  /* = brand-muted */

/* Границы и элементы */
--border: hsl(135 15% 20%)            /* Цвет границ */
--input: hsl(207.6923 27.6596% 18.4314%) /* Фон инпутов */
--ring: hsl(142 67% 35%)              /* Outline/focus ring = brand-green */
```

### Прозрачные эффекты (Glass Morphism)

```css
/* Glass Card — для карточек с эффектом стекла */
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
}

/* Glass Navigation — для навигации */
.glass-nav {
  background: rgba(10, 15, 12, 0.8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(12px);
}
```

**Где используется:**
- Все карточки секций (услуги, кейсы, отзывы)
- Навигационный header (fixed, glass-nav)
- Галерея изображений в Hero секции
- Кнопки второго уровня (не primary CTA)

---

## 📝 Типографика

### Шрифты

```css
--font-sans: Inter, system-ui, sans-serif;
--font-serif: Georgia, serif;
--font-mono: Menlo, monospace;
```

**Основной шрифт:** `Inter` (загружается через Google Fonts)
- Используется для всего интерфейса
- Вес: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

**Загрузка шрифта:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
```

### Размеры заголовков (Headings)

```tsx
/* H1 — Главный заголовок Hero */
className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
// Mobile: 36px (2.25rem / 4xl)
// Tablet: 48px (3rem / 5xl)
// Desktop: 60px (3.75rem / 6xl)

/* H2 — Заголовки секций */
className="text-3xl sm:text-4xl font-bold mb-4"
// Mobile: 30px (1.875rem / 3xl)
// Desktop: 36px (2.25rem / 4xl)

/* H3 — Заголовки карточек */
className="text-xl font-semibold mb-3"
// 20px (1.25rem / xl)
```

### Размеры текста (Body Text)

```tsx
/* Большой текст (Lead/Subtitle) */
className="text-xl text-brand-muted leading-relaxed"
// 20px (1.25rem / xl)

/* Обычный текст */
className="text-brand-text"
// 16px (1rem / base) — по умолчанию

/* Мелкий текст (Captions) */
className="text-sm text-brand-muted"
// 14px (0.875rem / sm)
```

### Line Height (Межстрочный интервал)

```css
leading-tight     /* 1.25 — для заголовков */
leading-relaxed   /* 1.625 — для подзаголовков */
/* default */     /* 1.5 — для обычного текста */
```

---

## 📐 Spacing & Layout

### Отступы (Padding/Margin)

**Система отступов Tailwind CSS:**
```css
--spacing: 0.25rem; /* 4px базовая единица */

/* Используемые значения: */
px-4   = 16px (1rem)
px-6   = 24px (1.5rem)
py-3   = 12px (0.75rem)
py-8   = 32px (2rem)
py-16  = 64px (4rem)
py-24  = 96px (6rem)
py-32  = 128px (8rem)
```

### Секции (Section Padding)

```tsx
/* Стандартная секция */
className="py-16 border-t border-white/10"
// Вертикальные отступы: 64px
// Верхняя граница: полупрозрачная белая

/* Hero секция */
className="relative py-16 sm:py-24 lg:py-32"
// Mobile: 64px
// Tablet: 96px
// Desktop: 128px
```

### Container (Ширина контента)

```tsx
className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
// Макс. ширина: 1280px (7xl)
// Центрирование: mx-auto
// Боковые отступы адаптивные:
//   Mobile: 16px (px-4)
//   Tablet: 24px (sm:px-6)
//   Desktop: 32px (lg:px-8)
```

### Grid System

```tsx
/* 2 колонки на десктопе */
className="grid lg:grid-cols-2 gap-12 items-center"

/* 3 колонки для карточек услуг */
className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"

/* 4 колонки для кейсов */
className="grid grid-cols-2 md:grid-cols-4 gap-4"
```

**Gap (промежутки между элементами):**
- `gap-4` (16px) — мелкая сетка (галереи)
- `gap-6` (24px) — средняя сетка (карточки)
- `gap-12` (48px) — большая сетка (Hero layout)

---

## 🔘 Компоненты

### Кнопки (Buttons)

#### Primary CTA (Call-to-Action)
```tsx
className="brand-gradient text-white px-6 py-3 rounded-xl font-medium
           brand-shadow hover:brand-shadow-hover transition-all
           duration-300 transform hover:scale-105"
```

**Стили:**
- Градиентный фон (`brand-gradient`)
- Белый текст
- Padding: 24px × 12px
- Скругление: 12px (rounded-xl)
- Shadow с зеленым свечением
- Hover: увеличенное свечение + scale 105%
- Transition: 300ms

#### Secondary Buttons (Glass)
```tsx
className="glass-card px-6 py-3 rounded-xl font-medium
           hover:bg-white/10 transition-all duration-300"
```

**Стили:**
- Glass morphism фон
- Padding: 24px × 12px
- Скругление: 12px
- Hover: полупрозрачный белый overlay
- Transition: 300ms

#### Header Button (Small Glass)
```tsx
className="glass-card px-4 py-2 rounded-lg text-sm font-medium
           hover:bg-white/10 transition-all duration-300"
```

**Стили:**
- Уменьшенный padding: 16px × 8px
- Скругление: 8px (rounded-lg)
- Мелкий текст (text-sm)

### Карточки (Cards)

#### Стандартная карточка
```tsx
className="glass-card p-6 rounded-2xl hover:bg-white/10
           transition-all duration-300"
```

**Стили:**
- Glass morphism фон
- Padding: 24px
- Скругление: 16px (rounded-2xl)
- Hover: светлый overlay
- Transition: 300ms

#### Карточка с изображением
```tsx
<div className="glass-card p-4 rounded-xl cursor-pointer
                hover:bg-white/10 transition-all duration-300">
  <img className="w-full h-32 object-cover rounded-lg
                  hover:scale-105 transition-transform duration-300" />
</div>
```

**Стили:**
- Внешний padding: 16px
- Внутреннее изображение: скругление 8px
- Hover на изображении: scale 105%

### Лого (Brand Logo)

```tsx
<div className="w-9 h-9 brand-gradient rounded-lg
                flex items-center justify-center">
  <span className="text-white font-bold text-sm">DB</span>
</div>
```

**Стили:**
- Квадрат 36×36px
- Градиентный фон
- Скругление: 8px
- Белый текст "DB" по центру

---

## 🎯 Border Radius (Скругления)

```css
--radius: 1.3rem; /* 20.8px — базовое значение */

/* Используемые значения: */
rounded-lg    = 8px   /* Маленькие элементы (кнопки, изображения) */
rounded-xl    = 12px  /* Средние элементы (кнопки CTA) */
rounded-2xl   = 16px  /* Большие элементы (карточки) */
rounded-full  = 9999px /* Круглые элементы (аватары, индикаторы) */
```

---

## 🌈 Градиенты и Тени

### Brand Gradient
```css
.brand-gradient {
  background: linear-gradient(90deg,
    var(--brand-green),      /* hsl(142 67% 35%) */
    var(--brand-green-light) /* hsl(142 65% 47%) */
  );
}
```

**Использование:**
- Primary CTA кнопки
- Лого бренда
- Акцентные элементы

### Shadows (Свечение)
```css
.brand-shadow {
  box-shadow: 0 0 24px rgba(41, 194, 103, 0.35);
}

.brand-shadow-hover {
  box-shadow: 0 0 32px rgba(41, 194, 103, 0.5);
}
```

**Использование:**
- Primary CTA кнопки (обычное состояние: brand-shadow)
- Hover состояние: brand-shadow-hover (усиленное свечение)

---

## 📱 Responsive Breakpoints

```css
/* Tailwind CSS breakpoints */
sm:  640px  /* Tablet */
md:  768px  /* Medium */
lg:  1024px /* Desktop */
xl:  1280px /* Large Desktop */
2xl: 1536px /* Extra Large */
```

**Используемые паттерны:**
```tsx
/* Mobile-first подход */
className="text-4xl sm:text-5xl lg:text-6xl"
/* Mobile: 4xl → Tablet: 5xl → Desktop: 6xl */

className="py-16 sm:py-24 lg:py-32"
/* Mobile: 64px → Tablet: 96px → Desktop: 128px */

className="grid lg:grid-cols-2"
/* Mobile: 1 колонка → Desktop: 2 колонки */
```

---

## 🎨 Специальные эффекты

### Backdrop Filter (Blur)
```css
backdrop-filter: blur(10px);  /* Glass cards */
backdrop-filter: blur(12px);  /* Glass navigation */
backdrop-filter: blur(40px);  /* Animated background blobs */
```

### Transitions
```css
/* Стандартная transition для всех интерактивных элементов */
transition-all duration-300

/* Трансформации */
transform hover:scale-105   /* Кнопки, изображения */
```

### Z-index Layers
```css
z-0   /* Animated background (фон) */
z-10  /* Main content (основной контент) */
z-50  /* Header navigation (навигация) */
z-50  /* Lightbox modal (модальные окна) */
```

---

## ✅ Утилитарные классы

### Часто используемые комбинации

```tsx
/* Центрирование flex-контейнера */
className="flex items-center justify-center"

/* Вертикальное расстояние между элементами */
className="space-y-8"  /* 32px между дочерними элементами */

/* Flex с gap */
className="flex flex-wrap gap-4"

/* Smooth scroll */
html {
  scroll-behavior: smooth;
}

/* Antialiased текст */
body {
  @apply font-sans antialiased bg-brand-bg text-brand-text;
}
```

---

## 📋 Чек-лист для новых компонентов

При создании нового UI компонента следуй этим правилам:

- [ ] Используй `glass-card` для карточек
- [ ] Primary CTA должны иметь `brand-gradient` + `brand-shadow`
- [ ] Все интерактивные элементы: `transition-all duration-300`
- [ ] Hover эффекты: `hover:bg-white/10` или `hover:scale-105`
- [ ] Скругления: `rounded-xl` (кнопки) или `rounded-2xl` (карточки)
- [ ] Spacing: используй систему `px-4`, `py-6` и т.д.
- [ ] Responsive: mobile-first подход (`sm:`, `lg:`)
- [ ] Цвета текста: `text-brand-text` (основной), `text-brand-muted` (второстепенный)
- [ ] Границы: `border-white/10` для светлых линий на темном фоне
- [ ] Z-index: фон (0), контент (10), навигация (50)

---

**Версия:** 1.0
**Обновлено:** 2025-11-25
