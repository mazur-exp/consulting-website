# Animations — Delivery Booster

Полное руководство по анимациям и motion design в проекте Delivery Booster.

---

## 📚 Библиотеки

### Framer Motion 11.18.2
Основная библиотека для анимаций в React.

```tsx
import { motion } from 'framer-motion';
```

**Установленные пакеты:**
- `framer-motion` 11.18.2 — основная библиотека
- `tailwindcss-animate` — Tailwind плагин для CSS анимаций
- `tw-animate-css` 1.2.5 — дополнительные CSS анимации

---

## 🎬 Паттерны анимаций

### 1. Fade In Up (Появление снизу)

**Самый частый паттерн** — элемент появляется с opacity 0 → 1 и поднимается снизу вверх.

```tsx
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

<motion.div {...fadeInUp}>
  Контент
</motion.div>
```

**Параметры:**
- `opacity`: 0 → 1
- `y`: 30px → 0 (поднимается вверх)
- `duration`: 0.6s
- `ease`: easeOut (замедление в конце)

**Где используется:**
- Hero секция (заголовок)
- Все заголовки секций
- Карточки при первой загрузке

---

### 2. Fade In Up с задержкой (Delayed)

Та же анимация, но с задержкой для создания последовательности.

```tsx
const fadeInUpDelayed = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut", delay: 0.2 }
};

<motion.div {...fadeInUpDelayed}>
  Контент
</motion.div>
```

**Параметры:**
- Те же, что у `fadeInUp`
- `delay`: 0.2s (задержка перед началом)

**Где используется:**
- Hero секция (галерея изображений справа)
- Элементы, которые должны появиться после других

---

### 3. Stagger Children (Последовательное появление)

Дочерние элементы появляются **по очереди** с небольшой задержкой.

```tsx
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1  // Задержка между детьми: 100ms
    }
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

<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  {items.map((item, index) => (
    <motion.div key={index} variants={itemVariants}>
      {item}
    </motion.div>
  ))}
</motion.div>
```

**Параметры:**
- `staggerChildren`: 0.1s (100ms между элементами)
- Дочерние элементы: `opacity: 0 → 1`, `y: 20px → 0`

**Где используется:**
- Секция Services (6 карточек услуг)
- Секция Case Studies (4 кейса)
- Любые списки карточек

---

### 4. Scroll-triggered animations (whileInView)

Анимация запускается, когда элемент **появляется во viewport**.

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}  // Анимация только один раз
>
  Контент
</motion.div>
```

**Параметры:**
- `initial`: начальное состояние (невидимый, ниже)
- `whileInView`: состояние во viewport (видимый, на месте)
- `viewport={{ once: true }}`: анимация срабатывает **только один раз**

**Где используется:**
- Все заголовки секций
- Карточки услуг, кейсов, отзывов
- Текстовые блоки

---

### 5. Hover Scale (Увеличение при наведении)

Элемент **увеличивается** при наведении мыши.

#### Вариант A: Через CSS класс
```tsx
className="transform hover:scale-105 transition-all duration-300"
```

**Параметры:**
- `scale`: 1 → 1.05 (увеличение на 5%)
- `transition-all`: плавная анимация всех свойств
- `duration-300`: 300ms

**Где используется:**
- Primary CTA кнопки
- Изображения в галереях

#### Вариант B: Через Framer Motion
```tsx
<motion.img
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.3 }}
/>
```

---

### 6. Animated Background (Плавающие блобы)

**Постоянная анимация фона** с плавающими цветными пятнами.

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
      <div className="... animate-float-delayed" />
      <div className="... animate-float-delayed-2" />
    </div>
  );
};
```

**CSS keyframes:**
```css
@keyframes float {
  0% {
    transform: translate(-10%, 0);
  }
  50% {
    transform: translate(10%, 10%);
  }
  100% {
    transform: translate(-10%, 0);
  }
}

.animate-float {
  animation: float 12s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float 12s ease-in-out infinite;
  animation-delay: -4s;  /* Сдвиг фазы на 4 секунды */
}

.animate-float-delayed-2 {
  animation: float 12s ease-in-out infinite;
  animation-delay: -8s;  /* Сдвиг фазы на 8 секунд */
}
```

**Параметры:**
- 3 блоба (круга) с зеленым градиентом
- Размеры: 96×96px, 80×80px, 72×72px
- Blur: 40px (сильное размытие)
- Animation duration: 12s (медленная анимация)
- Разные `animation-delay` для async движения

**Где используется:**
- Фиксированный фон всего сайта (`fixed inset-0`)
- `pointer-events-none` — не мешает кликам
- `z-0` — находится за всем контентом

---

### 7. Hover Background Change

Изменение фона при наведении.

```tsx
className="glass-card hover:bg-white/10 transition-all duration-300"
```

**Параметры:**
- Обычное состояние: `background: rgba(255, 255, 255, 0.03)`
- Hover: `background: rgba(255, 255, 255, 0.1)` (светлее)
- Transition: 300ms

**Где используется:**
- Все карточки (services, cases, testimonials)
- Кнопки второго уровня (glass buttons)

---

### 8. Hover Shadow Enhancement

Усиление тени при наведении.

```tsx
className="brand-shadow hover:brand-shadow-hover transition-all duration-300"
```

**CSS стили:**
```css
.brand-shadow {
  box-shadow: 0 0 24px rgba(41, 194, 103, 0.35);
}

.brand-shadow-hover {
  box-shadow: 0 0 32px rgba(41, 194, 103, 0.5);
}
```

**Параметры:**
- Обычная тень: 24px blur, 35% opacity
- Hover тень: 32px blur, 50% opacity (ярче и больше)

**Где используется:**
- Primary CTA кнопки
- Акцентные элементы

---

## 🎨 Специальные анимации компонентов

### Lightbox Modal (Галерея кейсов)

**Появление модального окна:**
```tsx
{selectedImage !== null && (
  <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
    {/* Контент */}
  </div>
)}
```

**Анимации в Lightbox:**
- Фон: `bg-black/90` (полупрозрачный черный)
- Кнопки: `bg-black/50 hover:bg-black/70 transition-colors`
- Изображение: `max-w-full max-h-full object-contain`
- Индикатор: `bg-black/50 px-4 py-2 rounded-full` (X / Y)

**Управление:**
- X — закрыть
- ← → — предыдущее/следующее изображение
- Навигация с помощью `ChevronLeft` / `ChevronRight` иконок

---

### Carousel (Карусель отзывов)

**Библиотека:** Embla Carousel React 8.6.0

```tsx
import useEmblaCarousel from 'embla-carousel-react';

const [emblaRef, emblaApi] = useEmblaCarousel({
  loop: true,
  align: 'start',
  skipSnaps: false
});
```

**Параметры:**
- `loop: true` — бесконечная прокрутка
- `align: 'start'` — выравнивание по началу
- Navigation: стрелки влево/вправо + точки индикации

**Анимации карусели:**
```tsx
/* Кнопки навигации */
className="p-2 bg-brand-primary/20 hover:bg-brand-primary/30
           rounded-full text-white transition-colors backdrop-blur-sm"

/* Точки индикации */
className={`h-2 rounded-full transition-all duration-300 ${
  selectedIndex === index
    ? 'w-8 bg-brand-primary'      /* Активная: длинная, зеленая */
    : 'w-2 bg-white/30 hover:bg-white/50'  /* Неактивная: круглая */
}`}
```

**Где используется:**
- Секция Testimonials (отзывы клиентов)

---

## ⚙️ Настройки анимаций

### Timing (Длительность)

```tsx
duration: 0.3   // 300ms — быстрые интерактивные эффекты (hover)
duration: 0.6   // 600ms — стандартные входные анимации (fade in)
duration: 12    // 12s — медленные фоновые анимации (плавающие блобы)
```

### Easing Functions

```tsx
ease: "easeOut"      // Замедление в конце (по умолчанию)
ease: "easeIn"       // Ускорение в начале
ease: "easeInOut"    // Ускорение в начале + замедление в конце
ease: "linear"       // Равномерная скорость
```

**В проекте используется:** `easeOut` и `easeInOut`

### Viewport Settings

```tsx
viewport={{ once: true }}  // Анимация один раз при первом появлении
viewport={{ once: false }} // Анимация каждый раз при скролле
viewport={{ amount: 0.3 }} // Запуск, когда видно 30% элемента
```

**В проекте используется:** `once: true` (экономия производительности)

---

## 🎯 Tailwind CSS Animations

### Accordion (Radix UI)

```css
/* Раскрытие аккордеона */
@keyframes accordion-down {
  from { height: 0; }
  to { height: var(--radix-accordion-content-height); }
}

@keyframes accordion-up {
  from { height: var(--radix-accordion-content-height); }
  to { height: 0; }
}

.animate-accordion-down {
  animation: accordion-down 0.2s ease-out;
}

.animate-accordion-up {
  animation: accordion-up 0.2s ease-out;
}
```

**Где используется:**
- Radix UI Accordion компоненты (если будут добавлены)

---

## 📋 Чек-лист анимаций

При добавлении анимаций в новый компонент:

- [ ] **Fade in при загрузке** — используй `whileInView` с `once: true`
- [ ] **Stagger для списков** — используй `staggerChildren: 0.1`
- [ ] **Hover эффекты** — `hover:scale-105` или `hover:bg-white/10`
- [ ] **Длительность** — 300ms для hover, 600ms для появления
- [ ] **Easing** — `easeOut` для входных анимаций
- [ ] **Transitions** — всегда добавляй `transition-all duration-300`
- [ ] **Performance** — используй `transform` вместо `margin/padding`
- [ ] **Viewport** — `viewport={{ once: true }}` для экономии ресурсов
- [ ] **Z-index** — проверь, что слои не конфликтуют
- [ ] **Mobile** — проверь анимации на мобильных устройствах

---

## 🚀 Performance Best Practices

### ✅ ХОРОШО (GPU-accelerated)
```tsx
/* Используй transform для движения */
transform: translate(x, y)
transform: scale(1.05)

/* Используй opacity */
opacity: 0 → 1
```

### ❌ ПЛОХО (Layout reflow)
```tsx
/* Не используй margin/padding для анимаций */
margin-top: 0 → 30px  // Вызывает reflow!
width: 100px → 200px  // Вызывает reflow!
```

### Советы по производительности:

1. **will-change** — автоматически добавляется Framer Motion
2. **viewport={{ once: true }}** — анимация один раз
3. **transform** вместо position/margin
4. **opacity** вместо visibility/display
5. **requestAnimationFrame** — используется внутри Framer Motion

---

## 🎬 Примеры кода

### Пример 1: Заголовок секции с анимацией
```tsx
<motion.div
  className="text-center mb-12"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  <h2 className="text-3xl sm:text-4xl font-bold mb-4">
    {t("Заголовок", "Title")}
  </h2>
</motion.div>
```

### Пример 2: Сетка карточек с stagger
```tsx
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

<motion.div
  className="grid md:grid-cols-3 gap-6"
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  {items.map((item, index) => (
    <motion.div
      key={index}
      variants={itemVariants}
      className="glass-card p-6 rounded-2xl hover:bg-white/10 transition-all duration-300"
    >
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### Пример 3: Кнопка с hover эффектами
```tsx
<motion.button
  className="brand-gradient text-white px-6 py-3 rounded-xl font-medium
             brand-shadow transition-all duration-300"
  whileHover={{
    scale: 1.05,
    boxShadow: '0 0 32px rgba(41, 194, 103, 0.5)'
  }}
  whileTap={{ scale: 0.98 }}
>
  Click me
</motion.button>
```

---

**Версия:** 1.0
**Обновлено:** 2025-11-25
