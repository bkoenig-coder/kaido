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
    heroEyebrow: 'Japanische Küche & Sushi Bar Wien',
    heroTitle: 'Herzlich Willkommen',
    heroSubtitle: 'Bock auf richtig gutes Sushi und asiatische Speisen? Dann bist du bei uns richtig😋🍣',
    heroBookBtn: 'Tisch reservieren',
    heroMenuBtn: 'Speisekarte ansehen',
    statusOpen: 'Jetzt geöffnet • Tische verfügbar',
    statusClosed: 'Derzeit geschlossen',
    statusClosingSoon: 'Schließt in Kürze',
    philosophyEyebrow: 'Qualität & Handwerk',
    philosophyTitle: 'Frische, Qualität & Tradition',
    philosophySubtitle: 'Bei Kaido legen wir größten Wert auf frischeste Zutaten, authentische Rezepte und sorgfältige Zubereitung durch erfahrene Köche.',
    pillar1Title: 'Täglich frischer Fisch',
    pillar1Subtitle: 'Höchste Güteklasse',
    pillar1Desc: 'Für unser Sushi und Sashimi verwenden wir ausschließlich fangfrischen Fisch bester Qualität, täglich frisch geliefert und fachgerecht filetiert.',
    pillar2Title: 'Traditionelle Zubereitung',
    pillar2Subtitle: 'Erfahrene Meister',
    pillar2Desc: 'Von handgerollten Maki bis zu feinen warmen Hauptgerichten — alle Speisen werden frisch und nach traditioneller Methode zubereitet.',
    pillar3Title: 'Mittagsmenü & Takeaway',
    pillar3Subtitle: 'Schnell & Bequem',
    pillar3Desc: 'Montag bis Freitag servieren wir beliebte Mittagsmenüs inklusive Sommerrolle und Miso-Suppe sowie schnelle Vorbestellung zum Mitnehmen.',
    menuEyebrow: 'Unsere Küche',
    menuTitle: 'Speisekarte & Mittagsmenü',
    menuSubtitle: 'Entdecken Sie unsere Sushi-Sets, warmen Hauptgerichte, Bento-Boxen und preiswerten Mittagsangebote.',
    menuRegularTab: 'Hauptkarte',
    menuLunchTab: 'Mittagsmenü (Mo–Fr 11–14h)',
    menuLunchNote: 'Montag bis Freitag, 11:00 – 14:00 Uhr (Dienstag Ruhetag). Zu jedem Menü servieren wir eine Sommerrolle und Miso-Suppe.',
    menuSearchPlaceholder: 'Gericht oder Zutat suchen (z.B. Lachs, Tuna, Bento, Gyoza, Avocado)...',
    filterAll: 'Alle Gerichte',
    filterVegetarian: 'Vegetarisch',
    filterVegan: 'Vegan',
    filterSpicy: 'Scharf',
    filterGlutenFree: 'Glutenfrei',
    reserveTitle: 'Tisch online reservieren',
    reserveSubtitle: 'Buchen Sie Ihren Tisch schnell und bequem im Voraus.',
    reserveFallback: 'Falls die Buchungsmaske nicht sofort lädt, reservieren Sie bequem direkt über Gastro.site:',
    reserveOpenNewTab: 'Reservierung im neuen Fenster öffnen',
    contactEyebrow: 'Ihr Besuch bei Kaido',
    contactTitle: 'Standort & Öffnungszeiten',
    contactAddress: 'Adresse',
    contactPhone: 'Telefon',
    contactEmail: 'E-Mail',
    hoursTitle: 'Öffnungszeiten',
    hoursRegular: 'Öffnungszeiten',
    hoursSummer: 'Aktuelle Öffnungszeiten',
    hoursSummerValidity: 'Küche durchgehend geöffnet bis 21:30 Uhr',
    hoursTuesdayClosed: 'Dienstag: Ruhetag (Geschlossen)',
    hoursToday: 'Heute',
    cookieTitle: 'Cookie-Einstellungen',
    cookieText: 'Wir verwenden Cookies zur Gewährleistung unseres Reservierungssystems und zur Verbesserung unserer Website.',
    cookieAcceptAll: 'Alle akzeptieren',
    cookieDecline: 'Nur Essenzielle',
    cookieManage: 'Anpassen',
    cookieSave: 'Auswahl speichern',
    cookieNecessary: 'Notwendige Cookies',
    cookieNecessaryDesc: 'Ermöglichen Kernfunktionen der Tischbuchung und Sitzungsverwaltung.',
    cookieAnalytics: 'Statistik-Cookies',
    cookieAnalyticsDesc: 'Dient der anonymisierten Auswertung und Verbesserung der Website-Nutzung.',
    legalImprint: 'Impressum',
    legalPrivacy: 'Datenschutz',
    legalRevocation: 'Widerrufsbelehrung',
    closeBtn: 'Schließen',
    lunchMenuTitle: 'Menü',
    lunchExtraOption: 'Auf Wunsch wahlweise mit Rind, Ente oder Shrimps: +€ 1,50',
    copyright: '© 2026 KAIDO KG. Alle Rechte vorbehalten. Wien.'
  },
  en: {
    navHome: 'Home',
    navMenu: 'Menu',
    navLunch: 'Lunch Menu',
    navContact: 'Contact',
    navBook: 'Reserve Table',
    heroEyebrow: 'Japanese Cuisine & Sushi Bar Vienna',
    heroTitle: 'Welcome to Kaido',
    heroSubtitle: 'Craving really good sushi and Asian delicacies? You’ve come to the right place😋🍣',
    heroBookBtn: 'Reserve a Table',
    heroMenuBtn: 'View Menu',
    statusOpen: 'Open Now • Tables Available',
    statusClosed: 'Currently Closed',
    statusClosingSoon: 'Closing Soon',
    philosophyEyebrow: 'Quality & Craft',
    philosophyTitle: 'Freshness, Quality & Tradition',
    philosophySubtitle: 'At Kaido, we focus on fresh ingredients, authentic Japanese recipes, and welcoming hospitality.',
    pillar1Title: 'Daily Fresh Fish',
    pillar1Subtitle: 'Superior Quality',
    pillar1Desc: 'We source only premium grade, fresh fish daily for our sushi, sashimi, and specialty rolls, expertly sliced to order.',
    pillar2Title: 'Authentic Preparation',
    pillar2Subtitle: 'Skilled Chefs',
    pillar2Desc: 'From hand-rolled maki to delicious warm Japanese dishes, every meal is prepared fresh with traditional precision.',
    pillar3Title: 'Lunch Specials & Takeaway',
    pillar3Subtitle: 'Fast & Convenient',
    pillar3Desc: 'Monday to Friday lunch specials with summer roll and miso soup, plus quick pre-ordering for takeaway.',
    menuEyebrow: 'Our Kitchen',
    menuTitle: 'Menu & Lunch Specials',
    menuSubtitle: 'Explore our wide selection of sushi sets, hot main dishes, bento boxes, and lunch specials.',
    menuRegularTab: 'Main Menu',
    menuLunchTab: 'Lunch Menu (Mon–Fri 11–14h)',
    menuLunchNote: 'Monday to Friday, 11:00 AM – 2:00 PM (Closed Tuesdays). Each lunch special includes a summer roll and miso soup.',
    menuSearchPlaceholder: 'Search dishes or ingredients (e.g., Salmon, Tuna, Bento, Gyoza, Avocado)...',
    filterAll: 'All Dishes',
    filterVegetarian: 'Vegetarian',
    filterVegan: 'Vegan',
    filterSpicy: 'Spicy',
    filterGlutenFree: 'Gluten-Free',
    reserveTitle: 'Reserve a Table Online',
    reserveSubtitle: 'Book your table easily and quickly in advance.',
    reserveFallback: 'If the reservation calendar does not load instantly, book directly through Gastro.site:',
    reserveOpenNewTab: 'Open reservation in new window',
    contactEyebrow: 'Visit Kaido',
    contactTitle: 'Location & Opening Hours',
    contactAddress: 'Address',
    contactPhone: 'Phone',
    contactEmail: 'Email',
    hoursTitle: 'Opening Hours',
    hoursRegular: 'Opening Hours',
    hoursSummer: 'Current Opening Hours',
    hoursSummerValidity: 'Kitchen open continuously until 9:30 PM',
    hoursTuesdayClosed: 'Tuesday: Closed (Rest Day)',
    hoursToday: 'Today',
    cookieTitle: 'Cookie Settings',
    cookieText: 'We use cookies to enable table reservations and enhance your website experience.',
    cookieAcceptAll: 'Accept All',
    cookieDecline: 'Essential Only',
    cookieManage: 'Customize',
    cookieSave: 'Save Preferences',
    cookieNecessary: 'Essential Services',
    cookieNecessaryDesc: 'Required for table reservation system operations and session handling.',
    cookieAnalytics: 'Analytics',
    cookieAnalyticsDesc: 'Used for anonymous usage analysis and website improvements.',
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
