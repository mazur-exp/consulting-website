import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

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
      name: {
        ru: "Арина",
        en: "Arina"
      },
      restaurant: {
        ru: "Only Eggs",
        en: "Only Eggs"
      },
      text: {
        ru: "За первый месяц работы количество заказов выросло на 40%. Особенно впечатлила работа с меню и позиционированием.",
        en: "Orders increased by 40% in the first month. Menu optimization and positioning were especially impressive."
      },
      rating: 5
    },
    {
      name: {
        ru: "Мария К.",
        en: "Maria K."
      },
      restaurant: {
        ru: "Кафе здорового питания",
        en: "Healthy Food Cafe"
      },
      text: {
        ru: "Профессиональный подход и быстрые результаты. Теперь понимаем, как правильно работать с GrabFood и увеличивать прибыль.",
        en: "Professional approach and quick results. Now we understand how to work with GrabFood properly and increase profits."
      },
      rating: 5
    },
    {
      name: {
        ru: "Дмитрий П.",
        en: "Dmitry P."
      },
      restaurant: {
        ru: "Пиццерия",
        en: "Pizzeria"
      },
      text: {
        ru: "Аудит показал неочевидные проблемы, которые мы не замечали. После внедрения рекомендаций средний чек вырос на 25%.",
        en: "The audit revealed non-obvious problems we hadn't noticed. After implementing recommendations, the average check increased by 25%."
      },
      rating: 5
    }
  ];

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-testimonials-title">
            {t("Отзывы", "Testimonials")}
          </h2>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  data-testid={`card-testimonial-${index}`}
                >
                  <div className="glass-card p-6 rounded-xl h-full flex flex-col">
                    <Quote className="w-10 h-10 text-brand-primary mb-4 opacity-50" />
                    
                    <p className="text-brand-text mb-6 flex-grow">
                      {t(testimonial.text.ru, testimonial.text.en)}
                    </p>
                    
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-brand-primary"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    
                    <div>
                      <p className="font-semibold text-brand-text">
                        {t(testimonial.name.ru, testimonial.name.en)}
                      </p>
                      <p className="text-sm text-brand-muted">
                        {t(testimonial.restaurant.ru, testimonial.restaurant.en)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-2 bg-brand-primary/20 hover:bg-brand-primary/30 rounded-full text-white transition-colors backdrop-blur-sm"
            data-testid="button-testimonials-prev"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-2 bg-brand-primary/20 hover:bg-brand-primary/30 rounded-full text-white transition-colors backdrop-blur-sm"
            data-testid="button-testimonials-next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                selectedIndex === index 
                  ? 'w-8 bg-brand-primary' 
                  : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
              data-testid={`button-testimonial-dot-${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
