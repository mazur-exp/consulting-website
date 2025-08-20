import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export const CaseStudiesSection = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
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

  const caseImages = [
    {
      src: "/Cases/magic lamp/Снимок экрана 2024-04-19 в 20.40.12.png",
      alt: "Magic Lamp restaurant delivery analytics"
    },
    {
      src: "/Cases/soul/Снимок экрана 2024-04-19 в 13.01.41.png",
      alt: "Soul restaurant growth metrics"
    },
    {
      src: "/Cases/mamu/Снимок экрана 2024-04-19 в 20.49.43.png",
      alt: "Mamu restaurant optimization results"
    },
    {
      src: "/Cases/huge/Снимок экрана 2024-04-19 в 21.27.49.png",
      alt: "Huge restaurant delivery performance"
    }
  ];

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const handlePrevious = () => {
    setSelectedImage((prev) => prev === null ? null : prev === 0 ? caseImages.length - 1 : prev - 1);
  };

  const handleNext = () => {
    setSelectedImage((prev) => prev === null ? null : prev === caseImages.length - 1 ? 0 : prev + 1);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

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
            {t("Снимки кейсов", "Case snapshots")}
          </h2>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {caseImages.map((image, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="glass-card p-4 rounded-xl cursor-pointer hover:bg-white/10 transition-all duration-300"
              data-testid={`card-case-${index}`}
              onClick={() => handleImageClick(index)}
            >
              <img 
                src={image.src}
                alt={image.alt}
                className="w-full h-32 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          ))}
        </motion.div>
        
        <motion.p 
          className="text-brand-muted text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          data-testid="text-cases-note"
        >
          {t(
            "Детали и цифры показываем на консультации. Данные анонимизируем.",
            "We share details on the call; data anonymized."
          )}
        </motion.p>
        
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
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                data-testid="button-prev-image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={handleNext}
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
