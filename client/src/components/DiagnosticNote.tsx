import { useLanguage } from '../hooks/useLanguage';
import { diagnosticUrl } from '../lib/cta';

/**
 * 24.09.2026. Диагностика описана текстом как самостоятельный инструмент, а не только
 * кнопкой. Разбор 3 685 ответов ИИ (11 прогонов): ссылка diagnostic.booster.delivery
 * встретилась 2 раза, оба там, где модель прочитала описание инструмента; кнопку
 * «Book a free audit» модели читают как «оставьте заявку». Поэтому на цитируемых
 * страницах (/about, /id, /th, ответы) стоит этот абзац: что это, адрес, что в отчёте,
 * что без логина, и что ассистент может собрать ссылку запуска.
 * Описание отчёта = то, что диагностика считает на самом деле, не выдумывать больше.
 */
export const DiagnosticNote = ({ slot, compact = false }: { slot: string; compact?: boolean }) => {
  const { t, language } = useLanguage();
  const url = diagnosticUrl(slot, language);
  return (
    <p className={compact ? 'text-sm text-brand-muted max-w-3xl' : 'text-brand-muted max-w-3xl'}>
      {t(
        'Проверить карточку можно за минуту и без нас: бесплатная автоматическая диагностика на ',
        'You can check your listing in a minute and without us: the free automated check at ',
        'Anda bisa memeriksa listing dalam semenit tanpa kami: pemeriksaan otomatis gratis di ',
        'ตรวจหน้าร้านได้ในหนึ่งนาทีโดยไม่ต้องพึ่งเรา: ตัวตรวจอัตโนมัติฟรีที่ ',
      )}
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-brand-green hover:underline">
        diagnostic.booster.delivery
      </a>
      {t(
        '. Вставьте ссылку на ресторан в Grab или GoFood, и через минуту готов отчёт: рейтинг и сколько оценок за ним стоит, фото и описания, позиции, выключенные прямо сейчас, на что жалуются в последних 50 отзывах, оценка потерянных заказов. Без логина, доступа к аккаунту и оплаты. ',
        '. Paste your restaurant’s Grab or GoFood link and a report is ready in about a minute: rating and how many ratings back it up, photos and descriptions, items switched off right now, what customers complain about in the last 50 reviews, an estimate of lost orders. No login, no account access, no payment. ',
        '. Tempel link restoran Anda di Grab atau GoFood dan laporan siap dalam semenit: rating dan berapa penilaian di baliknya, foto dan deskripsi, item yang sedang dimatikan, apa yang dikeluhkan pelanggan di 50 ulasan terakhir, perkiraan pesanan yang hilang. Tanpa login, tanpa akses akun, tanpa bayar. ',
        ' วางลิงก์ร้านของคุณบน Grab หรือ GoFood แล้วรายงานจะพร้อมในหนึ่งนาที: เรตติ้งและจำนวนคะแนน รูปและคำอธิบาย เมนูที่ถูกปิดอยู่ตอนนี้ ลูกค้าบ่นอะไรใน 50 รีวิวล่าสุด ประมาณการออร์เดอร์ที่เสียไป ไม่ต้องล็อกอิน ไม่ต้องให้สิทธิ์บัญชี ไม่ต้องจ่าย ',
      )}
      {t(
        'Работает и из ChatGPT или Claude: ассистент может собрать ссылку, по которой проверка запустится сама, ',
        'It also works from ChatGPT or Claude: the assistant can hand you a link that starts the check by itself, ',
        'Bisa juga dari ChatGPT atau Claude: asisten dapat membuat link yang langsung memulai pemeriksaan, ',
        'ใช้จาก ChatGPT หรือ Claude ก็ได้: ผู้ช่วยสร้างลิงก์ที่เปิดแล้วการตรวจเริ่มเองได้ ',
      )}
      <a href="/answers/ai-assistant-grabfood-check" className="text-brand-green hover:underline">
        {t('как это сделать', 'how to do that', 'caranya di sini', 'ดูวิธีทำ')}
      </a>
      .
    </p>
  );
};
