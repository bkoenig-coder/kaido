import React, { createContext, useContext, useState } from 'react';

type Language = 'de' | 'en';

interface Translations {
  navHome: string;
  navMenu: string;
  navContact: string;
  navBook: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBookBtn: string;
  heroMenuBtn: string;
  statusOpen: string;
  statusClosed: string;
  statusClosingSoon: string;
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
    navContact: 'Kontakt & Öffnungszeiten',
    navBook: 'Tisch Reservieren',
    heroTitle: 'Herzlich Willkommen',
    heroSubtitle: 'Bock auf richtig gutes Sushi und asiatische Speisen? Dann bist du bei uns richtig 😋🍣',
    heroBookBtn: 'Tisch reservieren',
    heroMenuBtn: 'Speisekarte ansehen',
    statusOpen: 'Jetzt geöffnet',
    statusClosed: 'Derzeit geschlossen',
    statusClosingSoon: 'Schließt bald',
    menuTitle: 'Unsere Speisekarte',
    menuSubtitle: 'Frisch zubereitetes Sushi, traditionelle Bento Boxen, wärmende Pho-Suppen und herzhafte asiatische Klassiker.',
    menuRegularTab: 'Hauptkarte',
    menuLunchTab: 'Mittagsmenü',
    menuLunchNote: 'Montag bis Freitag, 11:00 - 14:00 Uhr (außer Dienstag). Jedes Mittagsmenü wird mit 1 Stk. Sommerrolle und Miso-Suppe serviert.',
    menuSearchPlaceholder: 'Nach Speisen, Zutaten oder Nummern suchen (z.B. Lachs, V3, Maki)...',
    filterAll: 'Alle Gerichte',
    filterVegetarian: 'Vegetarisch',
    filterVegan: 'Vegan',
    filterSpicy: 'Scharf',
    filterGlutenFree: 'Glutenfrei',
    reserveTitle: 'Einen Tisch reservieren',
    reserveSubtitle: 'Buchen Sie Ihren gemütlichen Abend bei uns schnell und unkompliziert.',
    reserveFallback: 'Falls das Formular nicht geladen wird, klicken Sie bitte hier, um direkt bei Gastro.site zu buchen:',
    reserveOpenNewTab: 'In neuem Fenster öffnen',
    contactTitle: 'Hier finden Sie uns',
    contactAddress: 'Adresse',
    contactPhone: 'Telefon',
    contactEmail: 'E-Mail',
    hoursTitle: 'Öffnungszeiten',
    hoursRegular: 'Reguläre Öffnungszeiten',
    hoursSummer: 'Sommer-Öffnungszeiten',
    hoursSummerValidity: 'Gültig vom 13. Juli bis 6. September 2026',
    hoursTuesdayClosed: 'Dienstag: Ruhetag',
    hoursToday: 'Heute',
    cookieTitle: 'Cookie-Einstellungen',
    cookieText: 'Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten, Zugriffsanalysen durchzuführen und die Benutzerfreundlichkeit zu erhöhen.',
    cookieAcceptAll: 'Alle akzeptieren',
    cookieDecline: 'Ablehnen',
    cookieManage: 'Einstellungen anpassen',
    cookieSave: 'Einstellungen speichern',
    cookieNecessary: 'Notwendige Cookies',
    cookieNecessaryDesc: 'Diese Cookies sind für das Funktionieren der Website erforderlich und können nicht deaktiviert werden.',
    cookieAnalytics: 'Analytische Cookies',
    cookieAnalyticsDesc: 'Helfen uns zu verstehen, wie Besucher mit der Website interagieren, indem Informationen anonym gesammelt und gemeldet werden.',
    legalImprint: 'Impressum',
    legalPrivacy: 'Datenschutzerklärung',
    legalRevocation: 'Widerrufsbelehrung',
    closeBtn: 'Schließen',
    lunchMenuTitle: 'Menü',
    lunchExtraOption: 'Wahlweise mit Rind, Ente oder Shrimps: +€ 1,50',
    copyright: '© 2026 Kaido KG. Alle Rechte vorbehalten.'
  },
  en: {
    navHome: 'Home',
    navMenu: 'Menu',
    navContact: 'Contact & Hours',
    navBook: 'Book Table',
    heroTitle: 'A Warm Welcome',
    heroSubtitle: 'In the mood for really good sushi and Asian dishes? Then you\'ve come to the right place! 😋🍣',
    heroBookBtn: 'Reserve Table',
    heroMenuBtn: 'View Speisekarte',
    statusOpen: 'Open Now',
    statusClosed: 'Closed Now',
    statusClosingSoon: 'Closing Soon',
    menuTitle: 'Our Menu',
    menuSubtitle: 'Freshly rolled sushi, traditional bento boxes, comforting pho soups, and robust Asian classics.',
    menuRegularTab: 'Regular Menu',
    menuLunchTab: 'Lunch Menu',
    menuLunchNote: 'Monday to Friday, 11:00 AM - 2:00 PM (except Tuesday). Each lunch menu includes 1 pc Summer Roll and Miso Soup.',
    menuSearchPlaceholder: 'Search for dishes, ingredients, or numbers (e.g. salmon, V3, maki)...',
    filterAll: 'All Dishes',
    filterVegetarian: 'Vegetarian',
    filterVegan: 'Vegan',
    filterSpicy: 'Spicy',
    filterGlutenFree: 'Gluten-Free',
    reserveTitle: 'Reserve a Table',
    reserveSubtitle: 'Book your cozy sushi experience instantly and securely.',
    reserveFallback: 'If the form is not loading properly, please click here to book directly on Gastro.site:',
    reserveOpenNewTab: 'Open in new window',
    contactTitle: 'Find Us Here',
    contactAddress: 'Address',
    contactPhone: 'Phone',
    contactEmail: 'Email',
    hoursTitle: 'Opening Hours',
    hoursRegular: 'Regular Opening Hours',
    hoursSummer: 'Summer Opening Hours',
    hoursSummerValidity: 'Valid from July 13th until September 6th, 2026',
    hoursTuesdayClosed: 'Tuesday: Closed (Ruhetag)',
    hoursToday: 'Today',
    cookieTitle: 'Cookie Settings',
    cookieText: 'We use cookies to optimize your browsing experience, perform analysis of website usage, and support basic functionality.',
    cookieAcceptAll: 'Accept All',
    cookieDecline: 'Decline',
    cookieManage: 'Manage Settings',
    cookieSave: 'Save Settings',
    cookieNecessary: 'Necessary Cookies',
    cookieNecessaryDesc: 'These cookies are required for basic site functions and cannot be switched off.',
    cookieAnalytics: 'Analytics Cookies',
    cookieAnalyticsDesc: 'Allow us to measure visitor traffic and analyze behavior to continuously improve user experience.',
    legalImprint: 'Imprint',
    legalPrivacy: 'Privacy Policy',
    legalRevocation: 'Revocation Policy',
    closeBtn: 'Close',
    lunchMenuTitle: 'Menu',
    lunchExtraOption: 'Option with beef, duck, or prawns: +€ 1.50',
    copyright: '© 2026 Kaido KG. All rights reserved.'
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
    // Default to German since the restaurant is in Vienna, Austria
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
