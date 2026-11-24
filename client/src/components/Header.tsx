import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useLanguage } from '../hooks/useLanguage';
import { useCountry, saveCountryPreference } from '../hooks/useCountry';
import { COUNTRY_LIST, CountryCode, pathForCountry } from '../config/countries';
import { messengerUrl } from '../lib/cta';

const LANGS = ['ru', 'en', 'id', 'th'] as const;

const Chevron = () => (
  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
);

/**
 * Шапка по финальному ТЗ (24.11.2026). Ноутбук: якоря разделов и один переключатель
 * «страна · язык». Телефон (до 640 px): логотип, страна, «Написать», бургер; языки
 * внутри меню. Раньше кнопки языков на телефоне уезжали за край экрана.
 * Открыт только один список: страна или меню.
 */
export const Header = () => {
  const { t, language, setLanguage } = useLanguage();
  const country = useCountry();
  const [location, setLocation] = useLocation();
  const [open, setOpen] = useState<null | 'country' | 'menu'>(null);
  const ref = useRef<HTMLElement>(null);
  const home = pathForCountry(country.code);
  const onHome = location === home;
  const platforms = t(country.platformsRu, country.platformsEn, country.platformsId, country.platformsTh ?? country.platformsEn);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const switchCountry = (target: CountryCode) => {
    setOpen(null);
    if (target === country.code && onHome) return;
    saveCountryPreference(target);
    setLocation(pathForCountry(target));
    window.scrollTo(0, 0);
  };

  // На странице страны это якоря; с остальных страниц ведём на страницу страны к нужному блоку.
  const anchor = (id: string) => (onHome ? `#${id}` : `${home}#${id}`);
  const nav = [
    { href: anchor('cases'), label: t('Кейсы', 'Cases', 'Studi kasus', 'เคส') },
    { href: anchor('how'), label: t('Как работаем', 'How we work', 'Cara kerja', 'วิธีทำงาน') },
    { href: anchor('price'), label: t('Цена', 'Pricing', 'Harga', 'ราคา') },
    { href: anchor('faq'), label: t('Вопросы', 'FAQ', 'Pertanyaan', 'คำถาม') },
    { href: onHome ? '#answers' : '/answers', label: t('Ответы', 'Answers', 'Jawaban', 'คำตอบ') },
  ];
  const countryName = t(country.nameRu, country.nameEn, country.nameId, country.nameTh);

  const langRow = (
    <div className="v-langs">
      <span>{t('Язык', 'Language', 'Bahasa', 'ภาษา')}</span>
      <div>
        {LANGS.map((code) => (
          <button key={code} type="button" aria-pressed={language === code} data-testid={`button-lang-${code}`} onClick={() => { setLanguage(code); setOpen(null); }}>
            {code.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <header className="v-hdr" ref={ref}>
      <div className="v-hdr-in">
        <Link href={home} className="v-brand" data-testid="brand-logo">
          <i>DB</i>
          <span>Delivery Booster</span>
        </Link>
        <nav className="v-nav" aria-label={t('Основное меню', 'Main menu', 'Menu utama', 'เมนูหลัก')}>
          {nav.map((n) => (
            <a key={n.href} href={n.href} data-testid={n.href === '/answers' || n.href === '#answers' ? 'link-header-answers' : undefined}>{n.label}</a>
          ))}
        </nav>
        <div className="v-hright">
          <button className="v-hbtn" type="button" aria-expanded={open === 'country'} aria-label={`${countryName}, ${language.toUpperCase()}`} data-testid="button-country-toggle" onClick={() => setOpen(open === 'country' ? null : 'country')}>
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" /></svg>
            {country.code.toUpperCase()} · {language.toUpperCase()}
            <Chevron />
          </button>
          <button className="v-cbtn" type="button" aria-expanded={open === 'country'} aria-label={countryName} onClick={() => setOpen(open === 'country' ? null : 'country')}>
            <span aria-hidden="true" style={{ fontSize: 18, lineHeight: 1 }}>{country.flag}</span>
            {country.code.toUpperCase()}
            <Chevron />
          </button>
          <a className="v-wbtn" href={messengerUrl(language, 'header', { platforms })} target="_blank" rel="noopener noreferrer" data-testid="link-header-audit" data-slot="header">
            {t('Написать', 'Contact us', 'Hubungi kami', 'ติดต่อเรา')}
          </a>
          <button className="v-burg" type="button" aria-label={t('Меню', 'Menu', 'Menu', 'เมนู')} aria-expanded={open === 'menu'} onClick={() => setOpen(open === 'menu' ? null : 'menu')}>
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open === 'menu' ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
        {open === 'country' && (
          <div className="v-drop" role="menu" data-testid="menu-country-list">
            {COUNTRY_LIST.map((c) => (
              <a key={c.code} href={pathForCountry(c.code)} aria-current={c.code === country.code} data-testid={`button-country-${c.code}`} onClick={(e) => { e.preventDefault(); switchCountry(c.code); }}>
                <span aria-hidden="true" style={{ fontSize: 17, lineHeight: 1 }}>{c.flag}</span>
                <b>{t(c.nameRu, c.nameEn, c.nameId, c.nameTh)}</b>
                <small>{c.platformsShort}</small>
              </a>
            ))}
            {langRow}
          </div>
        )}
      </div>
      {open === 'menu' && (
        <nav className="v-mmenu" aria-label={t('Меню', 'Menu', 'Menu', 'เมนู')}>
          {nav.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(null)}>{n.label}</a>
          ))}
          {langRow}
        </nav>
      )}
    </header>
  );
};
