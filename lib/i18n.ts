// ============================================================================
//  i18n — locale dictionaries for «Код Молодости» / Code of Youth
//  ----------------------------------------------------------------------------
//  The Russian site (/, /v2) is the canonical product; English (/v3) is a
//  standalone demo for English-speaking contacts. RU reuses the data already
//  living in content.ts (the single source of truth for SEO / server code);
//  EN carries its own translated data + every UI string.
//
//  useDict() (see components/LocaleProvider.tsx) defaults to RU, so any
//  component rendered without a provider keeps its original Russian copy.
// ============================================================================

import {
  brand as ruBrand,
  contacts as ruContacts,
  advantages as ruAdvantages,
  services as ruServices,
  specialists as ruSpecialists,
  portalCards as ruPortalCards,
  heroImage,
  nav as ruNav,
  type ServiceCategory,
} from "./content";

export type Locale = "ru" | "en";

type Hours = { days: string; time: string }[];
type Social = { label: string; href: string };
type Advantage = { n: string; title: string; text: string };
type Specialist = { name: string; role: string; exp: string };
type PortalCard = {
  id: string;
  label: string;
  caption: string;
  target: string;
  image: string;
};
type NavItem = { label: string; target: string };

export interface Dict {
  locale: Locale;
  brand: {
    name: string;
    monogram: [string, string];
    logoLine1: string;
    logoLine2: string;
    type: string;
    city: string;
    since: number;
    principle: string;
    legalName: string;
    license: string;
  };
  contacts: {
    address: string;
    phone: string;
    phoneHref: string;
    email: string;
    hours: Hours;
    mapSrc: string;
    socials: Social[];
  };
  advantages: Advantage[];
  services: ServiceCategory[];
  specialists: Specialist[];
  portalCards: PortalCard[];
  heroImage: string;
  nav: NavItem[];
  ui: {
    privacyHref: string;
    header: {
      book: string;
      bookFull: string;
      homeAria: string;
      navAria: string;
      mapAria: string;
      mapsHrefBase: string;
      openMenu: string;
      closeMenu: string;
      mobileNavAria: string;
    };
    hero: {
      titleTop: string;
      titleAccent: string;
      bookCta: string;
      servicesCta: string;
      statYears: string;
      statAreas: string;
      statLicense: string;
      cardStreet: string;
      imgAlt: string;
    };
    about: {
      eyebrow: string;
      title: string;
      body: string;
    };
    services: {
      eyebrow: string;
      titleTop: string;
      titleBottom: string;
      intro: string;
      priceNote: string;
      cta: string;
    };
    specialists: {
      eyebrow: string;
      titleTop: string;
      titleBottom: string;
      body: string;
      photoBadge: string;
      note: string;
    };
    contacts: {
      eyebrow: string;
      titleTop: string;
      titleBottom: string;
      labelAddress: string;
      labelPhone: string;
      labelEmail: string;
      labelHours: string;
    };
    map: {
      showMap: string;
      aria: string;
      iframeTitle: string;
    };
    booking: {
      eyebrow: string;
      title: string;
      subtitle: string;
      successTitle: string;
      successBody: string;
      sendAnother: string;
      labelName: string;
      phName: string;
      labelPhone: string;
      phPhone: string;
      labelService: string;
      servicePlaceholder: string;
      labelMessage: string;
      phMessage: string;
      consentPre: string;
      consentLink: string;
      consentPost: string;
      errConsent: string;
      errSend: string;
      submitting: string;
      submit: string;
    };
    footer: {
      tagline: string;
      sections: string;
      contacts: string;
      rights: string;
      privacy: string;
      demo: string;
    };
    cookie: {
      pre: string;
      link: string;
      post: string;
      accept: string;
      close: string;
    };
    intro: {
      codeKey: string;
    };
    portal: {
      sinceLabel: string;
      hintTouch: string;
      hintWheel: string;
      book: string;
      navAria: string;
      enterAriaPre: string;
      enterAriaPost: string;
    };
  };
}

// ----------------------------------------------------------------------------
//  RU — reuses content.ts data, adds UI strings
// ----------------------------------------------------------------------------
const ru: Dict = {
  locale: "ru",
  brand: {
    name: ruBrand.name,
    monogram: ["К", "М"],
    logoLine1: "Код",
    logoLine2: "Молодости",
    type: ruBrand.type,
    city: ruBrand.city,
    since: ruBrand.since,
    principle: ruBrand.principle,
    legalName: ruBrand.legalName,
    license: ruBrand.license,
  },
  contacts: ruContacts,
  advantages: ruAdvantages,
  services: ruServices,
  specialists: ruSpecialists,
  portalCards: ruPortalCards,
  heroImage,
  nav: ruNav,
  ui: {
    privacyHref: "/privacy",
    header: {
      book: "Записаться",
      bookFull: "Записаться на приём",
      homeAria: "Код Молодости — на главную",
      navAria: "Основная навигация",
      mapAria: "Адрес на карте",
      mapsHrefBase: "https://yandex.ru/maps/?text=",
      openMenu: "Открыть меню",
      closeMenu: "Закрыть меню",
      mobileNavAria: "Мобильная навигация",
    },
    hero: {
      titleTop: "Код",
      titleAccent: "Молодости",
      bookCta: "Записаться на приём",
      servicesCta: "Смотреть услуги",
      statYears: "лет опыта",
      statAreas: "направлений",
      statLicense: "Медицинская лицензия",
      cardStreet: "ул. Сакко, 33",
      imgAlt: "Процедура в клинике медицинской косметологии «Код Молодости»",
    },
    about: {
      eyebrow: "О клинике",
      title: "Медицина в основе красоты",
      body:
        "«Код Молодости» — официальное медицинское учреждение в Иванове. " +
        "С 2021 года мы объединяем экспертизу врачей, сертифицированные " +
        "препараты и технологии экспертного класса.",
    },
    services: {
      eyebrow: "Услуги",
      titleTop: "Шесть направлений",
      titleBottom: "эстетической медицины",
      intro:
        "От лазерной эпиляции до контурной пластики — индивидуальный протокол " +
        "подбирает врач на консультации.",
      priceNote:
        "* Цены указаны ориентировочно. Точную стоимость уточняйте у администратора.",
      cta: "Подобрать процедуру",
    },
    specialists: {
      eyebrow: "Специалисты",
      titleTop: "Врачи, которым",
      titleBottom: "доверяют тысячи пациентов",
      body:
        "Команда с высшим медицинским образованием и постоянным обучением. " +
        "Каждый протокол выстраивается индивидуально и безопасно.",
      photoBadge: "Фото будет добавлено",
      note:
        "* Демонстрационный блок. Имена, фотографии и регалии врачей будут " +
        "добавлены после согласования.",
    },
    contacts: {
      eyebrow: "Контакты",
      titleTop: "Ждём вас",
      titleBottom: "в Иванове",
      labelAddress: "Адрес",
      labelPhone: "Телефон",
      labelEmail: "Почта",
      labelHours: "Часы работы",
    },
    map: {
      showMap: "Показать карту",
      aria: "Показать карту проезда",
      iframeTitle: "Карта — клиника «Код Молодости», ул. Сакко, 33, Иваново",
    },
    booking: {
      eyebrow: "Запись",
      title: "Оставьте заявку — мы перезвоним",
      subtitle:
        "Администратор свяжется с вами, подберёт удобное время и ответит на " +
        "вопросы о процедурах и подготовке.",
      successTitle: "Заявка отправлена",
      successBody:
        "Спасибо! Мы свяжемся с вами в ближайшее время в рабочие часы клиники.",
      sendAnother: "Отправить ещё одну",
      labelName: "Имя",
      phName: "Как к вам обращаться",
      labelPhone: "Телефон",
      phPhone: "+7 (___) ___-__-__",
      labelService: "Направление",
      servicePlaceholder: "Выберите направление (необязательно)",
      labelMessage: "Комментарий",
      phMessage: "Удобное время, вопросы, пожелания",
      consentPre:
        "Я согласен(а) на обработку персональных данных в соответствии с ",
      consentLink: "политикой конфиденциальности",
      consentPost: ".",
      errConsent: "Необходимо согласие на обработку персональных данных.",
      errSend: "Не удалось отправить заявку. Позвоните нам по телефону.",
      submitting: "Отправляем…",
      submit: "Отправить заявку",
    },
    footer: {
      tagline: "Клиника медицинской косметологии в Иванове. ООО «Бьюти».",
      sections: "Разделы",
      contacts: "Контакты",
      rights: "Все права защищены.",
      privacy: "Политика конфиденциальности",
      demo: "Демо-концепт",
    },
    cookie: {
      pre:
        "Мы используем cookie, чтобы сайт работал корректно. Продолжая " +
        "пользоваться сайтом, вы соглашаетесь с ",
      link: "политикой конфиденциальности",
      post: ".",
      accept: "Принять",
      close: "Закрыть",
    },
    intro: {
      codeKey: "код",
    },
    portal: {
      sinceLabel: "с",
      hintTouch: "Проведите пальцем — выберите раздел",
      hintWheel: "Листайте колёсиком — выберите раздел",
      book: "Записаться",
      navAria: "Навигация по разделам",
      enterAriaPre: "Открыть раздел «",
      enterAriaPost: "»",
    },
  },
};

// ----------------------------------------------------------------------------
//  EN — standalone English demo (Code of Youth)
// ----------------------------------------------------------------------------
const enContacts: Dict["contacts"] = {
  address: "12 Rosewood Avenue, Riverside",
  phone: "+1 (555) 014-1414",
  phoneHref: "tel:+15550141414",
  email: "hello@codeofyouth.clinic",
  hours: [
    { days: "Mon — Fri", time: "09:00 — 21:00" },
    { days: "Sat — Sun", time: "09:00 — 19:00" },
  ],
  // Neutral Google Maps embed (click-to-load); no real location / no Yandex.
  mapSrc: "https://www.google.com/maps?q=Riverside&z=12&output=embed",
  socials: [
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "WhatsApp", href: "#" },
  ],
};

const enServices: ServiceCategory[] = [
  {
    id: "laser-hair",
    index: "01",
    title: "Laser hair removal",
    summary: "Flawless smoothness with expert-grade lasers.",
    items: [
      { name: "Candela Alexandrite laser", price: "from €90" },
      { name: "Diolaze XL hybrid laser", price: "from €75" },
    ],
  },
  {
    id: "massage",
    index: "02",
    title: "Massage",
    summary: "Contour sculpting and deep tone restoration.",
    items: [
      { name: "RSL sculpting", price: "from €70" },
      { name: "Therapy Pulse", price: "from €60" },
    ],
  },
  {
    id: "injection",
    index: "03",
    title: "Injectable cosmetology",
    summary: "Precise protocols for firmness, hydration and glow.",
    items: [
      { name: "Biorevitalisation", price: "from €180" },
      { name: "Placental therapy", price: "from €150" },
      { name: "Botulinum therapy", price: "from €220" },
      { name: "PRP plasma therapy", price: "from €160" },
      { name: "Mesotherapy", price: "from €140" },
      { name: "Lipolytics", price: "from €120" },
      { name: "Collagen therapy", price: "from €170" },
    ],
  },
  {
    id: "apparatus",
    index: "04",
    title: "Device-based cosmetology",
    summary: "World-class technology for lifting and rejuvenation.",
    items: [
      { name: "SMAS lifting", price: "from €350" },
      { name: "Morpheus8 microneedling RF lifting", price: "from €600" },
      { name: "Forma V intimate rejuvenation", price: "from €300" },
      { name: "Lumecca photorejuvenation", price: "from €180" },
      { name: "Revixan photodynamic therapy", price: "from €150" },
      { name: "Forma thermal lifting", price: "from €130" },
      { name: "Clatuu cryolipolysis", price: "from €300" },
      { name: "Fotona laser system", price: "from €220" },
    ],
  },
  {
    id: "contour",
    index: "05",
    title: "Dermal fillers & contouring",
    summary: "Facial harmony in the hands of expert physicians.",
    items: [
      { name: "Lip augmentation", price: "from €320" },
      { name: "Tear-trough correction", price: "from €350" },
      { name: "Wrinkle blanching", price: "from €160" },
      { name: "Cheeks, chin & jawline", price: "from €380" },
    ],
  },
  {
    id: "aesthetic",
    index: "06",
    title: "Aesthetic skincare",
    summary: "Care rituals for healthy, radiant skin.",
    items: [
      { name: "Facial cleansing", price: "from €70" },
      { name: "Peels", price: "from €80" },
      { name: "Treatment facials", price: "from €90" },
    ],
  },
];

const en: Dict = {
  locale: "en",
  brand: {
    name: "Code of Youth",
    monogram: ["C", "Y"],
    logoLine1: "Code of",
    logoLine2: "Youth",
    type: "Medical Cosmetology Clinic",
    city: "Riverside",
    since: ruBrand.since,
    principle:
      "Not only to preserve the health and youth of your skin, but to " +
      "highlight your individuality.",
    legalName: "Beauty LLC",
    license: "Licensed medical practice · Reg. 2021-0418",
  },
  contacts: enContacts,
  advantages: [
    {
      n: "01",
      title: "Since 2021",
      text: "Thousands of happy patients and a reputation built on results.",
    },
    {
      n: "02",
      title: "Licensed medical clinic",
      text: "An official medical institution overseen by the Department of Health.",
    },
    {
      n: "03",
      title: "Highly qualified doctors",
      text: "Specialists with higher medical education and continuous training.",
    },
    {
      n: "04",
      title: "Certified products",
      text: "Only proven products and expert-grade equipment.",
    },
  ],
  services: enServices,
  specialists: [
    { name: "Cosmetologist", role: "Injectable techniques", exp: "9 years' experience" },
    { name: "Dermatologist", role: "Device-based technologies", exp: "12 years' experience" },
    { name: "Aesthetician", role: "Skincare & peels", exp: "7 years' experience" },
  ],
  portalCards: [
    { id: "services", label: "Services", caption: "6 areas", target: "services", image: "/images/services.jpg" },
    { id: "specialists", label: "Specialists", caption: "Expert doctors", target: "specialists", image: "/images/specialists.jpg" },
    { id: "about", label: "About", caption: "Since 2021", target: "about", image: "/images/about.jpg" },
    { id: "contacts", label: "Contacts", caption: "Riverside", target: "contacts", image: "/images/contacts.jpg" },
  ],
  heroImage,
  nav: [
    { label: "About", target: "about" },
    { label: "Services", target: "services" },
    { label: "Specialists", target: "specialists" },
    { label: "Contacts", target: "contacts" },
  ],
  ui: {
    privacyHref: "/en/privacy",
    header: {
      book: "Book now",
      bookFull: "Book an appointment",
      homeAria: "Code of Youth — home",
      navAria: "Main navigation",
      mapAria: "Address on map",
      mapsHrefBase: "https://www.google.com/maps/search/?api=1&query=",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      mobileNavAria: "Mobile navigation",
    },
    hero: {
      titleTop: "Code of",
      titleAccent: "Youth",
      bookCta: "Book an appointment",
      servicesCta: "View services",
      statYears: "years of experience",
      statAreas: "areas",
      statLicense: "Licensed clinic",
      cardStreet: "12 Rosewood Avenue",
      imgAlt: "A treatment at the Code of Youth medical cosmetology clinic",
    },
    about: {
      eyebrow: "About the clinic",
      title: "Medicine at the heart of beauty",
      body:
        "Code of Youth is a licensed medical clinic in Riverside. " +
        "Since 2021 we have combined physician expertise, certified products " +
        "and expert-grade technology.",
    },
    services: {
      eyebrow: "Services",
      titleTop: "Six areas",
      titleBottom: "of aesthetic medicine",
      intro:
        "From laser hair removal to dermal contouring — your doctor tailors " +
        "an individual protocol during the consultation.",
      priceNote:
        "* Prices are indicative. Please confirm the exact cost with our administrator.",
      cta: "Find your treatment",
    },
    specialists: {
      eyebrow: "Specialists",
      titleTop: "Doctors trusted",
      titleBottom: "by thousands of patients",
      body:
        "A team with higher medical education and continuous training. " +
        "Every protocol is built individually and safely.",
      photoBadge: "Photo coming soon",
      note:
        "* Demo section. Doctors' names, photos and credentials will be added " +
        "after approval.",
    },
    contacts: {
      eyebrow: "Contacts",
      titleTop: "We look forward",
      titleBottom: "to seeing you in Riverside",
      labelAddress: "Address",
      labelPhone: "Phone",
      labelEmail: "Email",
      labelHours: "Opening hours",
    },
    map: {
      showMap: "Show map",
      aria: "Show directions map",
      iframeTitle: "Map — Code of Youth clinic",
    },
    booking: {
      eyebrow: "Booking",
      title: "Leave a request — we'll call you back",
      subtitle:
        "Our administrator will contact you, find a convenient time and answer " +
        "your questions about treatments and preparation.",
      successTitle: "Request sent",
      successBody:
        "Thank you! We'll be in touch shortly, during clinic working hours.",
      sendAnother: "Send another",
      labelName: "Name",
      phName: "How should we address you",
      labelPhone: "Phone",
      phPhone: "+1 (555) ___-____",
      labelService: "Area of interest",
      servicePlaceholder: "Choose an area (optional)",
      labelMessage: "Comment",
      phMessage: "Preferred time, questions, notes",
      consentPre:
        "I consent to the processing of my personal data in accordance with the ",
      consentLink: "privacy policy",
      consentPost: ".",
      errConsent: "Consent to personal data processing is required.",
      errSend: "Couldn't send the request. Please call us.",
      submitting: "Sending…",
      submit: "Send request",
    },
    footer: {
      tagline: "Medical cosmetology clinic in Riverside. Beauty LLC.",
      sections: "Sections",
      contacts: "Contacts",
      rights: "All rights reserved.",
      privacy: "Privacy policy",
      demo: "Demo concept",
    },
    cookie: {
      pre:
        "We use cookies to make the site work properly. By continuing to use " +
        "the site, you agree to our ",
      link: "privacy policy",
      post: ".",
      accept: "Accept",
      close: "Dismiss",
    },
    intro: {
      codeKey: "code",
    },
    portal: {
      sinceLabel: "since",
      hintTouch: "Swipe to choose a section",
      hintWheel: "Scroll to choose a section",
      book: "Book now",
      navAria: "Section navigation",
      enterAriaPre: "Open the ",
      enterAriaPost: " section",
    },
  },
};

export const dictionaries: Record<Locale, Dict> = { ru, en };
