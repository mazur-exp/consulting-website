import { LegalLayout, type LegalSection } from '../components/LegalLayout';
import { COMPANY } from '../config/company';

const link = 'text-brand-green hover:underline';
const email = <a href={COMPANY.emailHref} className={link}>{COMPANY.email}</a>;

/**
 * /refund: Return & Refund Policy. Требование платёжного провайдера (Xendit, 16.11.2026).
 * Текст утверждён Алексом 17.11.2026. ВАЖНО: возврата комиссии за недостигнутую цель НЕТ ни
 * здесь, ни в договоре (есть только право клиента расторгнуть без штрафа). Обещание возврата
 * на этой странице стало бы обязательством, на которое клиент сошлётся при оспаривании платежа.
 */
const sections: LegalSection[] = [
  {
    heading: 'Scope',
    body: [
      `This policy applies to payments made to ${COMPANY.legalName} for consulting services. We sell services, not physical goods, so there is nothing to return.`,
    ],
  },
  {
    heading: 'Fees for services rendered',
    body: [
      'We invoice after the month in which the services were provided. Service fees paid for services already rendered are non-refundable.',
    ],
  },
  {
    heading: 'Erroneous and duplicate payments',
    body: [
      'A payment made by mistake or made twice is refunded in full, to the same payment method, within 14 business days of our receiving the refund request.',
    ],
  },
  {
    heading: 'How to request a refund',
    body: [
      <>
        Email {email} with the invoice number, the payment date, the amount and a proof of payment. We confirm receipt and tell you the outcome by email.
      </>,
    ],
  },
  {
    heading: 'Six-month target',
    body: [
      'If the net income target set in the individual agreement is not reached within the first 6 months, the client may terminate the agreement without penalty. A missed target does not give a right to a refund of service fees already paid.',
    ],
  },
  {
    heading: 'Questions about an invoice',
    body: [
      <>
        If you think an invoice is wrong, write to {email} before paying it. We recheck the amount against the platform figures and issue a corrected invoice if we find an error.
      </>,
    ],
  },
  {
    heading: 'Contact',
    body: [
      <>
        {COMPANY.legalName}, {COMPANY.address}. Phone: <a href={COMPANY.phoneHref} className={link}>{COMPANY.phone}</a>. Email: {email}.
      </>,
    ],
  },
];

export default function RefundPage() {
  return (
    <LegalLayout
      path="/refund"
      title="Return & Refund Policy"
      description="Return & Refund Policy of PT Delivery Booster Group: fees for services rendered are non-refundable; erroneous and duplicate payments are refunded in full to the same payment method within 14 business days."
      updated="17 November 2026"
      sections={sections}
    />
  );
}
