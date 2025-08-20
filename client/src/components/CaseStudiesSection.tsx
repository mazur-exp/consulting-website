import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

export const CaseStudiesSection = () => {
  const { t } = useLanguage();

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
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      alt: "Analytics dashboard showing growth metrics"
    },
    {
      src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      alt: "Professional food presentation"
    },
    {
      src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      alt: "Five-star restaurant rating display"
    },
    {
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      alt: "Successful food delivery completion"
    }
  ];

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
              className="glass-card p-4 rounded-xl"
              data-testid={`card-case-${index}`}
            >
              <img 
                src={image.src}
                alt={image.alt}
                className="w-full h-32 object-cover rounded-lg"
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
      </div>
    </section>
  );
};
