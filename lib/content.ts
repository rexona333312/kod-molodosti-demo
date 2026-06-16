// ============================================================================
//  КОД МОЛОДОСТИ — content layer (RU)
//  Single source of truth for copy, services and contacts.
//  Structured so an English locale can be layered on top later.
// ============================================================================

export const brand = {
  name: "Код Молодости",
  monogram: "КМ",
  type: "Клиника медицинской косметологии",
  city: "Иваново",
  since: 2021,
  principle:
    "Не только сохранить здоровье и молодость вашей кожи, но и подчеркнуть вашу индивидуальность.",
  legalName: "ООО «Бьюти»",
  license: "Лицензия № Л041-01139-37/00361455 от 12.04.2021",
};

export const contacts = {
  address: "г. Иваново, ул. Сакко, д. 33",
  phone: "+7 (996) 516-14-14",
  phoneHref: "tel:+79965161414",
  email: "kodmolodosticlinic@yandex.ru",
  hours: [
    { days: "Пн — Пт", time: "09:00 — 21:00" },
    { days: "Сб — Вс", time: "09:00 — 19:00" },
  ],
  // Yandex static map embed for ул. Сакко, 33, Иваново
  mapSrc:
    "https://yandex.ru/map-widget/v1/?ll=40.974%2C56.999&z=15&pt=40.974%2C56.999%2Cpm2dgl&text=" +
    encodeURIComponent("Иваново, улица Сакко, 33"),
  socials: [
    { label: "Telegram", href: "#" },
    { label: "ВКонтакте", href: "#" },
    { label: "WhatsApp", href: "#" },
  ],
};

export const advantages = [
  {
    n: "01",
    title: "С 2021 года",
    text: "Тысячи довольных пациентов и репутация, построенная на результате.",
  },
  {
    n: "02",
    title: "Медицинская лицензия",
    text: "Официальное медицинское учреждение под контролем Департамента здравоохранения.",
  },
  {
    n: "03",
    title: "Высококвалифицированные врачи",
    text: "Специалисты с высшим медицинским образованием, постоянное обучение.",
  },
  {
    n: "04",
    title: "Сертифицированные препараты",
    text: "Только проверенные препараты и оборудование экспертного класса.",
  },
];

export type ServiceItem = { name: string; price?: string; note?: string };
export type ServiceCategory = {
  id: string;
  index: string;
  title: string;
  summary: string;
  items: ServiceItem[];
};

export const services: ServiceCategory[] = [
  {
    id: "laser-hair",
    index: "01",
    title: "Лазерная эпиляция",
    summary: "Гладкость без компромиссов на лазерах экспертного класса.",
    items: [
      { name: "Александритовый лазер Candela", price: "от 1 500 ₽" },
      { name: "Гибридный лазер Diolaze XL", price: "от 1 200 ₽" },
    ],
  },
  {
    id: "massage",
    index: "02",
    title: "Массаж",
    summary: "Скульптурирование контуров и глубокое восстановление тонуса.",
    items: [
      { name: "RSL-скульптурирование", price: "от 3 500 ₽" },
      { name: "Therapy Pulse", price: "от 3 000 ₽" },
    ],
  },
  {
    id: "injection",
    index: "03",
    title: "Инъекционная косметология",
    summary: "Точные протоколы для упругости, увлажнения и сияния кожи.",
    items: [
      { name: "Биоревитализация", price: "от 8 000 ₽" },
      { name: "Плацентарная терапия", price: "от 6 500 ₽" },
      { name: "Ботулинотерапия", price: "от 9 000 ₽" },
      { name: "Плазмотерапия", price: "от 4 500 ₽" },
      { name: "Мезотерапия", price: "от 5 000 ₽" },
      { name: "Липолитики", price: "от 4 000 ₽" },
      { name: "Коллагенотерапия", price: "от 7 000 ₽" },
    ],
  },
  {
    id: "apparatus",
    index: "04",
    title: "Аппаратная косметология",
    summary: "Технологии мирового уровня для лифтинга и омоложения.",
    items: [
      { name: "SMAS-лифтинг", price: "от 15 000 ₽" },
      { name: "Микроигольчатый RF-лифтинг Morpheus8", price: "от 25 000 ₽" },
      { name: "Интимное омоложение Forma V", price: "от 12 000 ₽" },
      { name: "Фотоомоложение Lumecca", price: "от 7 000 ₽" },
      { name: "Фотодинамическая терапия Revixan", price: "от 6 000 ₽" },
      { name: "Термолифтинг Forma", price: "от 5 000 ₽" },
      { name: "Криолиполиз Clatuu", price: "от 12 000 ₽" },
      { name: "Лазерная система Fotona", price: "от 9 000 ₽" },
    ],
  },
  {
    id: "contour",
    index: "05",
    title: "Контурная пластика",
    summary: "Гармония черт лица в руках врачей-экспертов.",
    items: [
      { name: "Контурная пластика губ", price: "от 26 000 ₽" },
      { name: "Коррекция носослёзной борозды", price: "от 28 000 ₽" },
      { name: "Бланширование морщин", price: "от 12 000 ₽" },
      { name: "Скулы, подбородок и углы нижней челюсти", price: "от 30 000 ₽" },
    ],
  },
  {
    id: "aesthetic",
    index: "06",
    title: "Эстетическая косметология",
    summary: "Ритуалы ухода для здорового и сияющего вида кожи.",
    items: [
      { name: "Чистка лица", price: "от 3 500 ₽" },
      { name: "Пилинги", price: "от 4 000 ₽" },
      { name: "Уходовые процедуры", price: "от 4 500 ₽" },
    ],
  },
];

// Specialists — placeholders until real bios & photos are provided.
export const specialists = [
  { name: "Врач-косметолог", role: "Инъекционные методики", exp: "опыт 9 лет" },
  { name: "Врач-дерматолог", role: "Аппаратные технологии", exp: "опыт 12 лет" },
  { name: "Косметолог-эстетист", role: "Уход и пилинги", exp: "опыт 7 лет" },
];

// Portal cards — the 3D entry destinations.
export const portalCards = [
  {
    id: "services",
    label: "Услуги",
    caption: "6 направлений",
    target: "services",
    image: "/images/services.jpg",
  },
  {
    id: "specialists",
    label: "Специалисты",
    caption: "Врачи-эксперты",
    target: "specialists",
    image: "/images/specialists.jpg",
  },
  {
    id: "about",
    label: "О клинике",
    caption: "С 2021 года",
    target: "about",
    image: "/images/about.jpg",
  },
  {
    id: "contacts",
    label: "Контакты",
    caption: "Иваново",
    target: "contacts",
    image: "/images/contacts.jpg",
  },
];

export const heroImage = "/images/hero.jpg";

export const nav = [
  { label: "О клинике", target: "about" },
  { label: "Услуги", target: "services" },
  { label: "Специалисты", target: "specialists" },
  { label: "Контакты", target: "contacts" },
];
