import React, { createContext, useContext, useState } from 'react';

type Language = 'de' | 'en';

interface Translations {
  navHome: string;
  navMenu: string;
  navLunch: string;
  navContact: string;
  navBook: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBookBtn: string;
  heroMenuBtn: string;
  statusOpen: string;
  statusClosed: string;
  statusClosingSoon: string;
  philosophyEyebrow: string;
  philosophyTitle: string;
  philosophySubtitle: string;
  pillar1Title: string;
  pillar1Subtitle: string;
  pillar1Desc: string;
  pillar2Title: string;
  pillar2Subtitle: string;
  pillar2Desc: string;
  pillar3Title: string;
  pillar3Subtitle: string;
  pillar3Desc: string;
  menuEyebrow: string;
  menuTitle: string;
  menuSubtitle: string;
  menuRegularTab: string;
  menuLunchTab: string;
  menuLunchNote: string;
  menuSearchPlaceholder: string;
  filterAll: string;
  filterVegetarian: string;
  filterVegan: string;
  filterSpicy: string;
  filterGlutenFree: string;
  reserveTitle: string;
  reserveSubtitle: string;
  reserveFallback: string;
  reserveOpenNewTab: string;
  contactEyebrow: string;
  contactTitle: string;
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
  hoursTitle: string;
  hoursRegular: string;
  hoursSummer: string;
  hoursSummerValidity: string;
  hoursTuesdayClosed: string;
  hoursToday: string;
  cookieTitle: string;
  cookieText: string;
  cookieAcceptAll: string;
  cookieDecline: string;
  cookieManage: string;
  cookieSave: string;
  cookieNecessary: string;
  cookieNecessaryDesc: string;
  cookieAnalytics: string;
  cookieAnalyticsDesc: string;
  legalImprint: string;
  legalPrivacy: string;
  legalRevocation: string;
  closeBtn: string;
  lunchMenuTitle: string;
  lunchExtraOption: string;
  copyright: string;
}

const translations: Record<Language, Translations> = {
  de: {
    navHome: 'Startseite',
    navMenu: 'Speisekarte',
    navLunch: 'Mittagsmenü',
    navContact: 'Kontakt',
    navBook: 'Tisch reservieren',
    heroEyebrow: 'Haute Japanese Cuisine & Omakase',
    heroTitle: 'Die Poesie des Meeres.',
    heroSubtitle: 'Ein intimer Rückzugsort zeitgenössischer japanischer Kulinarik im Herzen von Wien. Wo vollendete Schnittkunst, Saisonalität und bedingungslose Hingabe verschmelzen.',
    heroBookBtn: 'Tisch reservieren',
    heroMenuBtn: 'Menü entdecken',
    statusOpen: 'Aktuell geöffnet • Plätze verfügbar',
    statusClosed: 'Derzeit geschlossen',
    statusClosingSoon: 'Service endet in Kürze',
    philosophyEyebrow: 'Das kulinarische Credo',
    philosophyTitle: 'Drei Säulen purer Vollendung',
    philosophySubtitle: 'Unsere Küche entspringt dem tiefen Respekt vor der japanischen Gastronomiegeschichte — reduziert auf das Wesentliche, kompromisslos in der Güte.',
    pillar1Title: 'Omotenashi',
    pillar1Subtitle: 'Gelebte Achtsamkeit',
    pillar1Desc: 'Aufrichtige Gastfreundschaft, die Wünsche erahnt, noch bevor sie ausgesprochen werden. Ein stilles Band des Vertrauens zwischen Gast und Meister.',
    pillar2Title: 'Shyun',
    pillar2Subtitle: 'Der flüchtige Augenblick',
    pillar2Desc: 'Nur Zutaten im absoluten Zenit ihrer Saison finden den Weg an unsere Theke — täglich fangfrisch selektiert und in vollendeter Frische zelebriert.',
    pillar3Title: 'Shokunin',
    pillar3Subtitle: 'Die Kunst des Handwerks',
    pillar3Desc: 'Präzise Schnittführung, traditionell gereifter Reisessig und jahrzehntelange Erfahrung lassen jedes Stück Nigiri zu einem unverwechselbaren Kunstwerk werden.',
    menuEyebrow: 'Gastronomische Auswahl',
    menuTitle: 'Die Kulinarische Komposition',
    menuSubtitle: 'Erlesene Spezialitäten, handgerolltes Omakase-Sushi, erhabene Bento-Kreationen und traditionell über Stunden gekochte Brühen.',
    menuRegularTab: 'Hauptkarte',
    menuLunchTab: 'Mittags-Kabinett',
    menuLunchNote: 'Montag bis Freitag, 11:00 – 14:00 Uhr (Dienstag Ruhetag). Serviert mit einer Sommerrolle und frisch gebrühter Miso-Suppe.',
    menuSearchPlaceholder: 'Gerichte, Zutaten oder Spezialitäten suchen (z.B. Toro, Hamachi, Sake)...',
    filterAll: 'Alle Kreationen',
    filterVegetarian: 'Vegetarisch',
    filterVegan: 'Pflanzlich (Vegan)',
    filterSpicy: 'Feine Schärfe',
    filterGlutenFree: 'Glutenfrei',
    reserveTitle: 'Private Tischreservierung',
    reserveSubtitle: 'Sichern Sie sich Ihren Abend für ein intimes Genusserlebnis.',
    reserveFallback: 'Falls die Buchungsmaske nicht sofort lädt, reservieren Sie bequem direkt über Gastro.site:',
    reserveOpenNewTab: 'Reservierung im neuen Fenster öffnen',
    contactEyebrow: 'Empfang & Salon',
    contactTitle: 'Residenz & Öffnungszeiten',
    contactAddress: 'Atelier Adresse',
    contactPhone: 'Concierge Telefon',
    contactEmail: 'Reservierungs-Anfragen',
    hoursTitle: 'Öffnungszeiten',
    hoursRegular: 'Reguläre Öffnungszeiten',
    hoursSummer: 'Sommer-Öffnungszeiten',
    hoursSummerValidity: 'Gültig vom 13. Juli bis 6. September 2026',
    hoursTuesdayClosed: 'Dienstag: Schließtag (Ruhetag)',
    hoursToday: 'Heute',
    cookieTitle: 'Privatsphäre & Diskretion',
    cookieText: 'Wir verwenden funktionale Technologien zur Gewährleistung unseres Reservierungssystems und zur kontinuierlichen Verfeinerung Ihres Besuchs.',
    cookieAcceptAll: 'Einverstanden',
    cookieDecline: 'Nur Essenzielle',
    cookieManage: 'Individuell anpassen',
    cookieSave: 'Präferenzen sichern',
    cookieNecessary: 'Erforderliche Dienste',
    cookieNecessaryDesc: 'Ermöglichen Kernfunktionen der Tischbuchung und Sitzungsverwaltung.',
    cookieAnalytics: 'Analytische Messung',
    cookieAnalyticsDesc: 'Dient der anonymisierten Auswertung und Veredelung des Nutzererlebnisses.',
    legalImprint: 'Impressum',
    legalPrivacy: 'Datenschutz',
    legalRevocation: 'Widerrufsbelehrung',
    closeBtn: 'Schließen',
    lunchMenuTitle: 'Menü',
    lunchExtraOption: 'Veredelung wahlweise mit Rind, Ente oder Shrimps: +€ 1,50',
    copyright: '© 2026 KAIDO KG. Alle Rechte vorbehalten. Wien.'
  },
  en: {
    navHome: 'Home',
    navMenu: 'Menu',
    navLunch: 'Lunch Menu',
    navContact: 'Contact',
    navBook: 'Reserve Table',
    heroEyebrow: 'Haute Japanese Cuisine & Omakase',
    heroTitle: 'The Poetry of the Ocean.',
    heroSubtitle: 'An intimate sanctuary of contemporary Japanese culinary artistry in the heart of Vienna. Where master blade precision, seasonal purism, and quiet reverence unite.',
    heroBookBtn: 'Reserve a Table',
    heroMenuBtn: 'Explore the Menu',
    statusOpen: 'Currently Open • Seating Available',
    statusClosed: 'Currently Closed',
    statusClosingSoon: 'Service Concluding Soon',
    philosophyEyebrow: 'The Culinary Credo',
    philosophyTitle: 'Three Pillars of Pure Balance',
    philosophySubtitle: 'Our kitchen stems from profound reverence for authentic Japanese culinary heritage — stripped of excess, uncompromising in caliber.',
    pillar1Title: 'Omotenashi',
    pillar1Subtitle: 'Mindful Hospitality',
    pillar1Desc: 'Selfless anticipation of every guest’s unspoken desires. An invisible bond of unspoken trust and harmony between patron and chef.',
    pillar2Title: 'Shyun',
    pillar2Subtitle: 'The Fleeting Moment',
    pillar2Desc: 'Only produce captured at the absolute zenith of its seasonal peak enters our counter — hand-selected each dawn with unyielding scrutiny.',
    pillar3Title: 'Shokunin',
    pillar3Subtitle: 'The Artisan’s Vow',
    pillar3Desc: 'Flawless knife discipline, aged akazu sushi rice, and decades of relentless practice elevate every piece of nigiri into an edible sculpture.',
    menuEyebrow: 'Gastronomic Selection',
    menuTitle: 'The Culinary Composition',
    menuSubtitle: 'Exquisite delicacies, hand-sculpted omakase nigiri, delicate bento arrays, and simmering dashi broths brewed with patience.',
    menuRegularTab: 'Main Carte',
    menuLunchTab: 'Noon Cabinet',
    menuLunchNote: 'Monday to Friday, 11:00 AM – 2:00 PM (excluding Tuesday). Accompanied by a fresh summer roll and house-crafted miso soup.',
    menuSearchPlaceholder: 'Search dishes, ingredients or cuts (e.g., Toro, Hamachi, Sake)...',
    filterAll: 'All Creations',
    filterVegetarian: 'Vegetarian',
    filterVegan: 'Plant-Based (Vegan)',
    filterSpicy: 'Delicate Spice',
    filterGlutenFree: 'Gluten-Free',
    reserveTitle: 'Private Table Reservation',
    reserveSubtitle: 'Secure your seating for an intimate dining experience.',
    reserveFallback: 'If the reservation calendar does not load instantly, book directly through Gastro.site:',
    reserveOpenNewTab: 'Open reservation in new window',
    contactEyebrow: 'Reception & Salon',
    contactTitle: 'Residence & Hours',
    contactAddress: 'Atelier Address',
    contactPhone: 'Concierge Telephone',
    contactEmail: 'Private Enquiries',
    hoursTitle: 'Opening Hours',
    hoursRegular: 'Regular Opening Hours',
    hoursSummer: 'Summer Opening Hours',
    hoursSummerValidity: 'Active from July 13th until September 6th, 2026',
    hoursTuesdayClosed: 'Tuesday: Rest Day (Closed)',
    hoursToday: 'Today',
    cookieTitle: 'Privacy & Discretion',
    cookieText: 'We utilize essential technologies to ensure seamless table bookings and to elevate your browsing experience.',
    cookieAcceptAll: 'Accept All',
    cookieDecline: 'Essential Only',
    cookieManage: 'Customize',
    cookieSave: 'Save Preferences',
    cookieNecessary: 'Essential Services',
    cookieNecessaryDesc: 'Required for table reservation system operations and session handling.',
    cookieAnalytics: 'Discreet Analytics',
    cookieAnalyticsDesc: 'Used solely for anonymous experience refinements and traffic understanding.',
    legalImprint: 'Imprint',
    legalPrivacy: 'Privacy Policy',
    legalRevocation: 'Revocation Terms',
    closeBtn: 'Close',
    lunchMenuTitle: 'Menu',
    lunchExtraOption: 'Accompaniment upgrade with beef, roasted duck, or prawns: +€ 1.50',
    copyright: '© 2026 KAIDO KG. All rights reserved. Vienna.'
  }
};

interface LanguageContextType {
  language: Language;
  t: Translations;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('kaido_language');
    if (saved === 'de' || saved === 'en') return saved;
    return 'de';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('kaido_language', lang);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, t, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
