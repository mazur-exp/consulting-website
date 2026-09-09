import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { diagnosticUrl } from '../lib/cta';
import { useCountry } from '../hooks/useCountry';

export const FounderSection = () => {
  const { t, language } = useLanguage();
  const country = useCountry();
  const platformsRu = country.platformsRu;
  const platformsEn = country.platformsEn;
  const platformsId = country.platformsId ?? country.platformsEn;
  const platformsTh = country.platformsTh ?? country.platformsEn;

  return (
    <section className="py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img 
              src="/photo_2025-09-25_04-24-22_1760798837110.jpg"
              alt="Алексей Мазур - основатель Delivery Booster"
              className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              data-testid="img-founder"
            />
          </motion.div>
          
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold" data-testid="text-founder-title">
              {t("Алексей Мазур", "Aleksei Mazur", "Aleksei Mazur", 'Aleksei Mazur')}
            </h2>
            <p className="text-brand-muted text-lg leading-relaxed whitespace-pre-line" data-testid="text-founder-description">
              {t(
                `Основатель Delivery Booster.\n\nСооснователь FoodLab (8 брендов, 2 локации на Бали). До 2025 года — сооснователь IKA Sushi (4 точки на Бали, оборот более 1,5 млрд рупий в месяц), долю продал партнёру.\n\nОпыт работы с маркетплейсами - 8 лет команда делала Android приложения (более 3000 приложений было создано), знания в маркетинге и построении бизнесов - за 15 лет было создано 11 успешных бизнесов в разных сферах.\n\nОснователь Delivery Booster, сервиса по увеличению продаж на ${platformsRu}: 200+ клиентов с 2023 года (110+ на сопровождении сейчас), рост продаж в 2-6 раз за счет настройки и оптимизации услуг доставки.`,
                `Founder of Delivery Booster.\n\nCo-founder of FoodLab (8 brands, 2 locations in Bali). Until 2025, co-founder of IKA Sushi (4 locations in Bali, revenue over 1.5 billion rupiah per month) — share sold to his partner.\n\nExperience with marketplaces - 8 years the team made Android applications (more than 3000 applications were created), knowledge in marketing and business building - over 15 years, 11 successful businesses were created in various fields.\n\nFounder of Delivery Booster, a service to increase sales on ${platformsEn}: 200+ clients since 2023 (110+ under management today), sales growth of 2-6x through setup and optimization of delivery services.`,
                `Pendiri Delivery Booster.\n\nCo-founder FoodLab (8 brand, 2 lokasi di Bali). Hingga 2025 — co-founder IKA Sushi (4 outlet di Bali, omzet lebih dari Rp 1,5 miliar per bulan), sahamnya dijual ke partner.\n\nPengalaman dengan marketplace: selama 8 tahun tim kami membuat aplikasi Android (lebih dari 3000 aplikasi dibuat), ditambah pengetahuan di bidang marketing dan membangun bisnis — dalam 15 tahun terakhir telah dibangun 11 bisnis yang berhasil di berbagai bidang.\n\nPendiri Delivery Booster, layanan peningkatan penjualan di ${platformsId}: 200+ klien sejak 2023 (110+ dalam pengelolaan saat ini), pertumbuhan penjualan 2-6x lewat penataan dan optimasi layanan delivery.`,
                `ผู้ก่อตั้ง Delivery Booster\n\nผู้ร่วมก่อตั้ง FoodLab (8 แบรนด์ 2 สาขาในบาหลี) และจนถึงปี 2025 เป็นผู้ร่วมก่อตั้ง IKA Sushi (4 สาขาในบาหลี ยอดขายกว่า 1.5 พันล้านรูเปียห์ต่อเดือน) ก่อนขายหุ้นให้หุ้นส่วน\n\nประสบการณ์กับมาร์เก็ตเพลส: ทีมของเราทำแอป Android มา 8 ปี (สร้างแอปมาแล้วกว่า 3,000 ตัว) บวกกับความรู้ด้านการตลาดและการสร้างธุรกิจ — ตลอด 15 ปีที่ผ่านมาสร้างธุรกิจที่ประสบความสำเร็จมาแล้ว 11 ธุรกิจในหลากหลายวงการ\n\nผู้ก่อตั้ง Delivery Booster บริการเพิ่มยอดขายบน ${platformsTh}: ลูกค้ากว่า 200 รายตั้งแต่ปี 2023 (ปัจจุบันดูแลอยู่กว่า 110 ราย) ยอดขายโต 2-6 เท่าจากการตั้งค่าและปรับปรุงงานเดลิเวอรี่`
              )}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={diagnosticUrl('founder', language)}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-founder-audit"
                className="brand-gradient text-white px-6 py-3 rounded-xl font-medium brand-shadow hover:brand-shadow-hover transition-all duration-300"
              >
                {t("Записаться на бесплатный аудит", "Book a free audit", "Jadwalkan audit gratis", 'ขอวิเคราะห์ร้านฟรี')}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
