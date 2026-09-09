import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

export const TargetAudienceSection = () => {
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

  const audiences = [
    {
      title: "Owner",
      description: {
        ru: "Быстрое повышение заказов, рейтинга и дохода, без бесконечных скидок. Снимаем операционную нагрузку: работа с платформами полностью на нашей стороне.",
        en: "Fast increase in orders, rating and income, without endless discounts. We remove operational burden: platform management is entirely on our side.",
        id: "Pesanan, rating, dan pendapatan naik cepat tanpa diskon terus-menerus. Beban operasional kami ambil alih: pengelolaan akun platform sepenuhnya di sisi kami.",
        th: "ออร์เดอร์ เรตติ้ง และรายได้เพิ่มขึ้นเร็ว โดยไม่ต้องลดราคาตลอดเวลา งานดูแลระบบเรารับไปทำเอง — จัดการบัญชีบนแพลตฟอร์มทั้งหมดอยู่ที่ฝั่งเรา"
      }
    },
    {
      title: "General Manager", 
      description: {
        ru: "Сократить отмены и задержки, улучшить SLA и качество выполнения заказов.",
        en: "Reduce cancellations and delays, improve SLA and order fulfillment quality.",
        id: "Kurangi pembatalan dan keterlambatan, tingkatkan SLA dan kualitas pemenuhan pesanan.",
        th: "ลดการยกเลิกและความล่าช้า ยกระดับ SLA และคุณภาพการจัดส่ง"
      }
    },
    {
      title: "Marketing Lead",
      description: {
        ru: "Только эффективные Ads с прозрачной отчетностью и высоким ROAS.",
        en: "Only effective Ads with transparent reporting and high ROAS.",
        id: "Hanya iklan yang efektif, dengan laporan transparan dan ROAS tinggi.",
        th: "ยิงโฆษณาเฉพาะที่ได้ผล พร้อมรายงานโปร่งใสและ ROAS สูง"
      }
    },
    {
      title: "Cloud/Ghost Kitchen",
      description: {
        ru: "Больше заказов и узнаваемости в приложениях доставки — без необходимости открывать зал.",
        en: "More orders and visibility in delivery apps – without needing a dining room.",
        id: "Lebih banyak pesanan dan visibilitas di aplikasi delivery — tanpa perlu ruang makan.",
        th: "ออร์เดอร์และการมองเห็นในแอปเดลิเวอรีเพิ่มขึ้น โดยไม่ต้องมีหน้าร้านนั่งทาน"
      }
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-audience-title">
            {t("Кому мы помогаем", "Who we help", "Untuk siapa layanan ini", 'เราช่วยใครได้บ้าง')}
          </h2>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {audiences.map((audience, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="glass-card p-6 rounded-2xl hover:bg-white/10 transition-all duration-300"
              data-testid={`card-audience-${index}`}
            >
              <div className="inline-block px-3 py-1 bg-brand-green/20 border border-brand-green/40 text-brand-green text-xs rounded-full mb-4 font-medium">
                {audience.title}
              </div>
              <p className="text-brand-muted">
                {t(audience.description.ru, audience.description.en, audience.description.id, audience.description.th)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
