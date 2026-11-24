import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useCountry } from '../hooks/useCountry';
import { getCountryFaqs } from '../config/faqs';
import { messengerUrl } from '../lib/cta';
import { avgPrice } from '../config/price';
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
  const faqChat = messengerUrl(language, 'faq-price');
  const avg = avgPrice(country.code);
  const [allFaq, setAllFaq] = useState(false);
  const [allMat, setAllMat] = useState(false);

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
            Условно бесплатно - узнай в <a href={faqChat} target="_blank" rel="noopener noreferrer" data-slot="faq-price" className="text-brand-green hover:text-brand-green-light underline transition-colors">чате</a> как.
            {'\n'}10% от чистой выплаты {platforms} (после комиссий площадок и рекламы).{avg.ru} Нет рисков, нет предоплаты.
          </>
        ),
        en: (
          <>
            Conditionally free - find out how in the <a href={faqChat} target="_blank" rel="noopener noreferrer" data-slot="faq-price" className="text-brand-green hover:text-brand-green-light underline transition-colors">chat</a>.
            {'\n'}10% of net payout from {platforms} (after platform commissions and ad costs).{avg.en} No risk, no upfront payment.
          </>
        ),
        id: (
          <>
            Praktis gratis - cari tahu caranya di <a href={faqChat} target="_blank" rel="noopener noreferrer" data-slot="faq-price" className="text-brand-green hover:text-brand-green-light underline transition-colors">chat</a>.
            {'\n'}10% dari pencairan bersih {platforms} (setelah komisi platform dan biaya iklan).{avg.id} Tanpa risiko, tanpa pembayaran di muka.
          </>
        ),
        th: (
          <>
            แทบจะฟรี - ถามวิธีได้ใน<a href={faqChat} target="_blank" rel="noopener noreferrer" data-slot="faq-price" className="text-brand-green hover:text-brand-green-light underline transition-colors">แชท</a>
            {'\n'}10% ของยอดเงินโอนสุทธิจาก {platforms} (หลังหักค่าคอมมิชชันแพลตฟอร์มและค่าโฆษณา){avg.th} ไม่มีความเสี่ยง ไม่ต้องจ่ายล่วงหน้า
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
        ru: "Да. В договоре фиксируется цель по чистому доходу на первые 6 месяцев. Если она не достигнута, вы можете расторгнуть договор без штрафа.",
        en: "Yes. The agreement sets a net income target for the first 6 months. If it is not reached, you can terminate the agreement without penalty.",
        id: "Ya. Perjanjian menetapkan target pendapatan bersih untuk 6 bulan pertama. Jika tidak tercapai, Anda dapat mengakhiri perjanjian tanpa penalti.",
        th: "มี ในสัญญาจะกำหนดเป้ารายได้สุทธิสำหรับ 6 เดือนแรก หากไม่ถึงเป้า คุณยกเลิกสัญญาได้โดยไม่มีค่าปรับ"
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

  // По ТЗ маркетолога (24.11.2026): видны первые 7 вопросов и 6 материалов, остальное
  // раскрывается кнопкой. Скрытое остаётся в HTML (display: none), его читают ИИ-краулеры.
  const VISIBLE_FAQ = 7;
  const VISIBLE_MAT = 6;
  const materials = [...ANSWER_MATERIALS.slice(0, 4), ...ASSET_MATERIALS, ...ANSWER_MATERIALS.slice(4)];
  const moreFaq = faqs.length - VISIBLE_FAQ;
  const moreMat = materials.length - VISIBLE_MAT;

  return (
    <>
      <section className="v-sec" id="faq">
        <div className="v-wrap">
          <div className="v-head">
            <span className="v-eye">{t('Вопросы', 'Questions', 'Pertanyaan', 'คำถาม')}</span>
            <h2 className="v-h2" data-testid="text-faq-title">
              {t('Частые вопросы', 'Frequently asked questions', 'Pertanyaan umum', 'คำถามที่พบบ่อย')}
            </h2>
          </div>
          <div style={{ maxWidth: 880, width: '100%' }}>
            <Accordion type="multiple" className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className={`border-b border-white/10 ${index >= VISIBLE_FAQ && !allFaq ? 'hidden' : ''}`}
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
          </div>
          {moreFaq > 0 && (
            <button type="button" className="v-more" onClick={() => setAllFaq((v) => !v)} data-testid="button-faq-more">
              {allFaq
                ? t('Свернуть', 'Show less', 'Sembunyikan', 'ย่อ')
                : t(`Показать ещё ${moreFaq} вопросов`, `Show ${moreFaq} more questions`, `Tampilkan ${moreFaq} pertanyaan lagi`, `แสดงอีก ${moreFaq} คำถาม`)}
            </button>
          )}
        </div>
      </section>

      {/* Real <a href> in every card so crawlers have a path from every market
          page into the answer cluster (see ai_docs/development/DEPLOYMENT.md).
          The one-line gist is not decoration: it gives a person a reason to
          click and puts a second short question/answer pair in plain text on
          the most-cited page of the site. */}
      <section className="v-sec" id="answers">
        <div className="v-wrap">
          <div className="flex items-end justify-between gap-4">
            <h2 className="v-h2">
              {t('Разбираем подробно', 'Worked through in full', 'Dibahas sampai tuntas', 'อธิบายแบบละเอียด')}
            </h2>
            <a href="/answers" className="v-link whitespace-nowrap">
              {t('Все ответы', 'All answers', 'Semua jawaban', 'คำตอบทั้งหมด')} →
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {materials.map((m, i) => (
              <div key={m.href} className={i >= VISIBLE_MAT && !allMat ? 'hidden' : 'contents'}>
                <MaterialCard m={m} large={ASSET_MATERIALS.includes(m)} />
              </div>
            ))}
          </div>
          {moreMat > 0 && (
            <button type="button" className="v-more" style={{ alignSelf: 'center' }} onClick={() => setAllMat((v) => !v)} data-testid="button-answers-more">
              {allMat
                ? t('Свернуть', 'Show less', 'Sembunyikan', 'ย่อ')
                : t(`Показать ещё ${moreMat} материалов`, `Show ${moreMat} more articles`, `Tampilkan ${moreMat} artikel lagi`, `แสดงอีก ${moreMat} บทความ`)}
            </button>
          )}
        </div>
      </section>
    </>
  );
};
