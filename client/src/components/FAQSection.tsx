import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { useCountry } from '../hooks/useCountry';
import { getCountryFaqs } from '../config/faqs';
import { ANSWER_MATERIALS, ASSET_MATERIALS, MaterialCard } from './AnswersIndex';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQSection = () => {
  const { t, language } = useLanguage();
  const country = useCountry();
  const platforms = country.platformsShort;

  const extendedFaqs = getCountryFaqs(country).map((f) => ({
    q: { ru: f.qRu, en: f.qEn, id: f.qId ?? f.qEn, th: f.qTh ?? f.qEn },
    a: { ru: f.aRu, en: f.aEn, id: f.aId ?? f.aEn, th: f.aTh ?? f.aEn },
  }));

  const faqs = [
    {
      q: { ru: "Сколько стоит?", en: "How much does it cost?", id: "Berapa biayanya?", th: "ราคาเท่าไหร่?" },
      a: {
        ru: (
          <>
            Условно бесплатно - узнай в <a href="https://t.me/delivery_booster" target="_blank" rel="noopener noreferrer" className="text-brand-green hover:text-brand-green-light underline transition-colors">чате</a> как.
            {'\n'}10% от выручки {platforms}. Среднее $400-800/мес. Нет рисков, нет предоплаты.
          </>
        ),
        en: (
          <>
            Conditionally free - find out how in the <a href="https://wa.me/79520029077" target="_blank" rel="noopener noreferrer" className="text-brand-green hover:text-brand-green-light underline transition-colors">chat</a>.
            {'\n'}10% of {platforms} revenue. Average $400-800/month. No risk, no upfront payment.
          </>
        ),
        id: (
          <>
            Praktis gratis - cari tahu caranya di <a href="https://wa.me/79520029077" target="_blank" rel="noopener noreferrer" className="text-brand-green hover:text-brand-green-light underline transition-colors">chat</a>.
            {'\n'}10% dari omzet {platforms}. Rata-rata $400-800/bulan. Tanpa risiko, tanpa pembayaran di muka.
          </>
        ),
        th: (
          <>
            แทบจะฟรี — ถามวิธีได้ใน<a href="https://wa.me/79520029077" target="_blank" rel="noopener noreferrer" className="text-brand-green hover:text-brand-green-light underline transition-colors">แชท</a>
            {'\n'}10% ของรายได้จาก {platforms} เฉลี่ย $400-800/เดือน ไม่มีความเสี่ยง ไม่ต้องจ่ายล่วงหน้า
          </>
        )
      }
    },
    {
      q: { ru: "Как быстро результат?", en: "How fast are results?", id: "Seberapa cepat hasilnya?", th: "เห็นผลเร็วแค่ไหน?" },
      a: {
        ru: "Первый рост: 2-4 недели. Полная раскачка: 3-6 месяцев. Подтверждено 110+ ресторанами на сопровождении и 200+, прошедшими через агентство с 2023 года.",
        en: "First growth: 2-4 weeks. Full ramp-up: 3-6 months. Confirmed by 110+ restaurants under management and 200+ served since 2023.",
        id: "Pertumbuhan pertama: 2-4 minggu. Ramp-up penuh: 3-6 bulan. Terbukti pada 110+ restoran dalam pengelolaan dan 200+ yang ditangani sejak 2023.",
        th: "เห็นผลแรก 2-4 สัปดาห์ เต็มกำลัง 3-6 เดือน พิสูจน์แล้วกับร้านกว่า 110 แห่งที่ดูแลอยู่ และกว่า 200 แห่งตั้งแต่ปี 2023"
      }
    },
    {
      q: { ru: "Есть гарантия?", en: "Is there a guarantee?", id: "Ada garansi?", th: "มีการรับประกันไหม?" },
      a: {
        ru: "Да. Целевые продажи за 6 месяцев или возврат комиссии.",
        en: "Yes. Target sales in 6 months or commission refund.",
        id: "Ya. Target penjualan dalam 6 bulan atau komisi dikembalikan.",
        th: "ใช่ ทำยอดขายไม่ถึงเป้าใน 6 เดือน เราคืนค่าคอมมิชชัน"
      }
    },
    {
      q: { ru: "Что входит?", en: "What's included?", id: "Apa saja yang termasuk?", th: "ครอบคลุมอะไรบ้าง?" },
      a: {
        ru: `Полное управление ${platforms}. Вы тратите 0 часов, получаете отчеты.`,
        en: `Full ${platforms} management. You spend 0 hours, get reports.`,
        id: `Pengelolaan penuh ${platforms}. Anda habiskan 0 jam, laporan tetap Anda terima.`,
        th: `ดูแล ${platforms} แบบครบวงจร คุณใช้เวลา 0 ชั่วโมง และยังได้รับรายงานตามปกติ`
      }
    },
    {
      q: { ru: "Почему не делать самому?", en: "Why not do it yourself?", id: "Kenapa tidak dikerjakan sendiri?", th: "ทำไมไม่ทำเองล่ะ?" },
      a: {
        ru: "Можете! Самостоятельное обучение займёт 3-6 месяцев, а ошибки в процессе обойдутся в $5-10k упущенной прибыли и времени.",
        en: "You can! Self-learning will take 3-6 months, and mistakes along the way will cost you $5-10k in lost profits and time.",
        id: "Bisa saja. Belajar sendiri butuh 3-6 bulan, dan kesalahan di prosesnya menghabiskan $5-10k potensi profit dan waktu Anda.",
        th: "ทำเองก็ได้ แต่การเรียนรู้เองใช้เวลา 3-6 เดือน และความผิดพลาดระหว่างทางกินกำไรที่ควรได้ไป 5-10 พันดอลลาร์ บวกกับเวลาของคุณ"
      }
    },
    ...extendedFaqs
  ];

  return (
    <section className="py-16 border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          data-testid="text-faq-title"
        >
          {t("Вопросы", "Questions", "Pertanyaan", 'คำถามที่พบบ่อย')}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Accordion type="multiple" className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-white/10"
                data-testid={`faq-item-${index}`}
              >
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-brand-green transition-colors">
                  {typeof faq.q === 'string'
                    ? t(faq.q, faq.q, faq.q)
                    : language === 'ru'
                      ? faq.q.ru
                      : language === 'id'
                        ? faq.q.id
                        : language === 'th'
                          ? faq.q.th
                          : faq.q.en}
                </AccordionTrigger>
                <AccordionContent className="text-brand-muted text-base pt-2 whitespace-pre-line">
                  {typeof faq.a === 'object' && 'ru' in faq.a
                    ? language === 'ru'
                      ? faq.a.ru
                      : language === 'id'
                        ? faq.a.id
                        : language === 'th'
                          ? faq.a.th
                          : faq.a.en
                    : faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Real <a href> in every card so crawlers have a path from every market
            page into the answer cluster (see ai_docs/development/DEPLOYMENT.md).
            The one-line gist is not decoration: it gives a person a reason to
            click and puts a second short question/answer pair in plain text on
            the most-cited page of the site. */}
        <div className="mt-14">
          <div className="flex items-end justify-between gap-4 mb-6">
            <h3 className="text-xl sm:text-2xl font-bold">
              {t('Разбираем подробно', 'Worked through in full', 'Dibahas sampai tuntas', 'อธิบายแบบละเอียด')}
            </h3>
            <a href="/answers" className="text-brand-green hover:underline text-sm whitespace-nowrap">
              {t('Все ответы', 'All answers', 'Semua jawaban', 'คำตอบทั้งหมด')} →
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {ANSWER_MATERIALS.map((m) => (
              <MaterialCard key={m.href} m={m} />
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 mt-4">
            {ASSET_MATERIALS.map((m) => (
              <MaterialCard key={m.href} m={m} large />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
