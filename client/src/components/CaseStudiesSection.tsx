import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { useState, useCallback, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

export const CaseStudiesSection = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center' },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const caseImages = [
    {
      src: "/case-1.jpg",
      alt: "Grab merchant dashboard analytics"
    },
    {
      src: "/case-2.jpg",
      alt: "Gojek merchant performance metrics"
    },
    {
      src: "/case-3.jpg",
      alt: "Delivery platform insights"
    },
    {
      src: "/case-4.jpg",
      alt: "Merchant analytics overview"
    },
    {
      src: "/case-5.jpg",
      alt: "Soul restaurant growth metrics"
    }
  ];

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const handleLightboxPrevious = () => {
    setSelectedImage((prev) => prev === null ? null : prev === 0 ? caseImages.length - 1 : prev - 1);
  };

  const handleLightboxNext = () => {
    setSelectedImage((prev) => prev === null ? null : prev === caseImages.length - 1 ? 0 : prev + 1);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

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
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-cases-title">
            {t("Кейсы", "Case studies")}
          </h2>
        </motion.div>

        {/* Results preview - above images */}
        {/* Results preview cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="glass-card p-6 rounded-xl text-center">
            <p className="text-3xl font-bold text-brand-green mb-2">x6</p>
            <p className="text-brand-muted">{t("продаж", "sales")}</p>
            <p className="text-sm text-brand-muted mt-2">To The Moon</p>
          </div>
          <div className="glass-card p-6 rounded-xl text-center">
            <p className="text-3xl font-bold text-brand-green mb-2">300 {t("млн", "M")} IDR</p>
            <p className="text-brand-muted">{t("в месяц", "per month")}</p>
            <p className="text-sm text-brand-muted mt-2">Only Eggs</p>
          </div>
          <div className="glass-card p-6 rounded-xl text-center">
            <p className="text-3xl font-bold text-brand-green mb-2">x3</p>
            <p className="text-brand-muted">{t("продаж", "sales")}</p>
            <p className="text-sm text-brand-muted mt-2">Lit Pizza</p>
          </div>
        </motion.div>

        {/* Carousel with screenshots */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {caseImages.map((image, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-4"
                >
                  <div
                    className="glass-card p-4 rounded-xl cursor-pointer hover:bg-white/10 transition-all duration-300"
                    onClick={() => handleImageClick(index)}
                    data-testid={`card-case-${index}`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-64 object-contain rounded-lg hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-2 bg-brand-primary/20 hover:bg-brand-primary/30 rounded-full text-white transition-colors backdrop-blur-sm"
            data-testid="button-cases-prev"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-2 bg-brand-primary/20 hover:bg-brand-primary/30 rounded-full text-white transition-colors backdrop-blur-sm"
            data-testid="button-cases-next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {caseImages.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                selectedIndex === index
                  ? 'w-8 bg-brand-primary'
                  : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
              data-testid={`button-case-dot-${index}`}
            />
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                data-testid="button-close-lightbox"
              >
                <X className="w-6 h-6" />
              </button>
              
              <button
                onClick={handleLightboxPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                data-testid="button-prev-image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleLightboxNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                data-testid="button-next-image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              
              <img
                src={caseImages[selectedImage].src}
                alt={caseImages[selectedImage].alt}
                className="max-w-full max-h-full object-contain rounded-lg"
                data-testid="img-lightbox"
              />
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center">
                <p className="text-sm bg-black/50 px-4 py-2 rounded-full">
                  {selectedImage + 1} / {caseImages.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
