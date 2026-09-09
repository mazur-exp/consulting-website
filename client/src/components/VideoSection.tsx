import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { Play } from 'lucide-react';
import { useState } from 'react';

export const VideoSection = () => {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoClick = () => {
    setIsPlaying(true);
  };

  const videoPoints = [
    {
      ru: "Объемы рынка доставки на Бали и его особенности",
      en: "Bali delivery market volumes and features",
      id: "Ukuran pasar delivery di Bali dan karakteristiknya",
      th: "ขนาดตลาดเดลิเวอรีในบาหลีและลักษณะเฉพาะของมัน"
    },
    {
      ru: "Нужно ли вашему бизнесу заниматься доставкой?",
      en: "Does your business need delivery services?",
      id: "Apakah bisnis Anda perlu masuk ke layanan delivery?",
      th: "ธุรกิจของคุณจำเป็นต้องเข้าสู่บริการเดลิเวอรีหรือไม่"
    },
    {
      ru: "Как настроить аккаунты в Gojek и Grab и правильно оформить меню",
      en: "How to set up Gojek and Grab accounts and design menu properly",
      id: "Cara menyiapkan akun Gojek dan Grab serta menyusun menu dengan benar",
      th: "วิธีตั้งค่าบัญชี Gojek และ Grab และจัดเมนูให้ถูกต้อง"
    },
    {
      ru: "Советы по повышению среднего чека и формированию товаров-локомотивов",
      en: "Tips for increasing average order value and creating bestsellers",
      id: "Tips menaikkan rata-rata nilai pesanan dan membentuk item penarik pesanan",
      th: "เคล็ดลับเพิ่มยอดต่อบิลและสร้างเมนูที่ดึงออร์เดอร์"
    },
    {
      ru: "Рекомендации по ведению рекламных кампаний и работе с аккаунт-менеджерами",
      en: "Recommendations for advertising campaigns and account manager relationships",
      id: "Rekomendasi menjalankan kampanye iklan dan bekerja dengan account manager",
      th: "คำแนะนำการยิงโฆษณาและการทำงานกับ account manager"
    },
    {
      ru: "Как эффективно управлять рейтингами на платформах доставки",
      en: "How to effectively manage ratings on delivery platforms",
      id: "Cara mengelola rating di platform delivery secara efektif",
      th: "วิธีดูแลเรตติ้งบนแพลตฟอร์มเดลิเวอรีให้ได้ผล"
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
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 whitespace-pre-line" data-testid="text-video-title">
            {t("Платформы доставки еды Gojek и Grab на Бали.\nКак подключиться и заработать на этом.", "Gojek and Grab food delivery platforms in Bali.\nHow to connect and profit from it.", "Platform delivery makanan Gojek dan Grab di Bali.\nCara bergabung dan mendapat untung darinya.", 'แพลตฟอร์มเดลิเวอรี Gojek และ Grab ในบาหลี\nเชื่อมต่ออย่างไรและทำกำไรได้อย่างไร')}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {!isPlaying ? (
              <div
                className="relative group cursor-pointer"
                onClick={handleVideoClick}
                data-testid="button-video-play"
              >
                <div className="aspect-video rounded-2xl glass-card overflow-hidden relative">
                  <img
                    src="/video-preview.jpg"
                    alt="Video thumbnail showing presentation about delivery orders"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-20 h-20 brand-gradient rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="glass-card p-3 rounded-lg">
                      <p className="text-sm font-medium text-brand-text">
                        {t(
                          "Платформы доставки еды Gojek и Grab на Бали",
                          "Gojek and Grab food delivery platforms in Bali",
                          "Platform delivery makanan Gojek dan Grab di Bali"
                        , 'แพลตฟอร์มเดลิเวอรี Gojek และ Grab ในบาหลี')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="aspect-video rounded-2xl overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/oXg8VAd1gQw?autoplay=1"
                  title="Gojek and Grab food delivery platforms in Bali"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            )}
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {videoPoints.map((point, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                viewport={{ once: true }}
                data-testid={`text-video-point-${index}`}
              >
                <div className="w-6 h-6 brand-gradient rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <p className="text-brand-muted leading-relaxed">
                  {t(point.ru, point.en, point.id, point.th)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};