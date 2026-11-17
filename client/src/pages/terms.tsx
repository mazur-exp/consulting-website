import { Link } from 'wouter';
import { LegalLayout, type LegalSection } from '../components/LegalLayout';
import { COMPANY } from '../config/company';

const link = 'text-brand-green hover:underline';

/**
 * /terms: Terms & Conditions. Требование платёжного провайдера (Xendit, 16.11.2026).
 * Текст утверждён Алексом 17.11.2026 и повторяет действующий Consulting Services Agreement
 * (шаблон «Template 10%» от 06.11.2026). Срок, цель и размер компенсации конкретного клиента
 * сюда не выносятся: «as set out in the individual agreement». Меняется договор - менять здесь.
 */
const sections: LegalSection[] = [
  {
    heading: 'Who we are',
    body: [
      <>
        These Terms apply to the services of {COMPANY.legalName} (“Delivery Booster”, “we”), {COMPANY.address}. Phone:{' '}
        <a href={COMPANY.phoneHref} className={link}>{COMPANY.phone}</a>. Email:{' '}
        <a href={COMPANY.emailHref} className={link}>{COMPANY.email}</a>.
      </>,
    ],
  },
  {
    heading: 'Services',
    body: [
      'We manage restaurant accounts on food delivery platforms such as GrabFood, GoFood and LINE MAN. The work covers an account audit, account and menu setup, promotions and advertising, monitoring of sales and reviews, communication with the platforms, and regular reports. The exact scope for each client is set out in the individual agreement.',
    ],
  },
  {
    heading: 'Individual agreement',
    body: [
      'We provide services only under a signed Consulting Services Agreement (the “individual agreement”). The term, the targets, the fee and all other commercial terms are set out in the individual agreement. If these Terms and the individual agreement differ, the individual agreement prevails.',
    ],
  },
  {
    heading: 'Fees',
    body: [
      'The service fee is 10% of the restaurant’s net payout after platform commissions and advertising costs, calculated monthly from the platforms’ own figures. There is no upfront payment and no setup fee. Platform commissions, advertising budgets and restaurant-funded discounts are paid by the restaurant to the platforms and are not part of our invoice.',
    ],
  },
  {
    heading: 'Invoicing and payment',
    body: [
      'We issue one invoice per month for the previous month. Payment is due within 5 business days from the date the invoice is received. An invoice can be paid by payment link (bank transfer through a virtual account, Visa or Mastercard, QRIS, e-wallets) or by direct bank transfer. We do not accept cash. Bank and transfer charges are borne by the client. Late payment may lead to a late fee and to suspension of the services, as set out in the individual agreement.',
    ],
  },
  {
    heading: 'Client responsibilities',
    body: [
      'The client provides accurate information and source materials, keeps our access to the merchant accounts valid and working, and implements the agreed recommendations. During the agreement the client does not change advertising campaigns, menus or prices in the accounts without our written consent.',
    ],
  },
  {
    heading: 'Term and early termination',
    body: [
      'The term of the engagement is set out in the individual agreement. If the client terminates the agreement before the end of the term, compensation for the remaining months is payable, calculated on the basis of the last service fee, as set out in the individual agreement.',
    ],
  },
  {
    heading: 'Six-month target',
    body: [
      'The individual agreement sets a net income target for the first 6 months. If the target is not reached, the client may terminate the agreement without penalty. This right to terminate is the only remedy for a missed target. Service fees already paid are not refunded.',
    ],
  },
  {
    heading: 'Refunds',
    body: [
      <>
        Refunds are governed by our <Link href="/refund" className={link}>Refund Policy</Link>.
      </>,
    ],
  },
  {
    heading: 'Limitation of liability',
    body: [
      'Final business results such as turnover, profit and number of orders depend on many factors outside our control, including the product, its quality and pricing, location, seasonality, competition and the client’s own operations. We perform the services diligently and within the agreed scope, but we are not liable for a failure to reach particular financial indicators. We are not liable for acts or omissions of the client’s staff, unless they result directly from our own negligence in performing the services. We are not liable for changes, policy updates or other actions taken by the delivery platforms.',
    ],
  },
  {
    heading: 'Confidentiality',
    body: [
      'Each party keeps confidential all information, data and documents received from the other in connection with the services, and does not disclose them to third parties without the other party’s prior written consent, unless disclosure is required by law or by a court order. This obligation applies during the agreement and for 2 years after it ends.',
    ],
  },
  {
    heading: 'Governing law and disputes',
    body: [
      'These Terms are governed by the laws of the Republic of Indonesia. The parties first try to settle any dispute amicably within 30 calendar days of a written notice of dispute. A dispute that is not settled this way is submitted to the District Court of Denpasar.',
    ],
  },
  {
    heading: 'Changes and contact',
    body: [
      <>
        We may update these Terms; the current version is always published on this page. Questions about these Terms or about an invoice:{' '}
        <a href={COMPANY.emailHref} className={link}>{COMPANY.email}</a>.
      </>,
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalLayout
      path="/terms"
      title="Terms & Conditions"
      description="Terms & Conditions of PT Delivery Booster Group: services, fee of 10% of the restaurant’s net payout after platform commissions and advertising costs, monthly invoicing, payment within 5 business days, termination, liability, governing law."
      updated="17 November 2026"
      sections={sections}
    />
  );
}
