/**
 * 1) Formspree: создайте форму на https://formspree.io и вставьте полный endpoint в formspreeEndpoint.
 * 2) Telegram / WhatsApp — по желанию.
 *
 * Тексты на странице опираются на подсказки Яндекс.Вордстата (РФ + регион Ростов):
 * «снять квартиру посуточно», «квартиры посуточно ростов на дону», «без посредников»,
 * «от хозяина», «в центре», «недорого», «с фото», «у вокзала», «посуточная аренда».
 */
const CONFIG = {
  /** Полный URL формы Formspree (бронь и «заказать звонок») */
  formspreeEndpoint: "https://formspree.io/f/xojrdgjq",
  /** логин Telegram без @ */
  telegramUser: "antonbutov",
  /** только цифры, формат 79001234567 */
  whatsappPhone: "79896377901",
  maxGuests: 3,
};

const IMAGES = [
  "https://static.sutochno.ru/doc/files/objects/2/297/384/1020x690/69f4853b880d1.jpg",
  "https://static.sutochno.ru/doc/files/objects/2/297/384/711x450/69f4853cb2d23.jpg",
  "https://static.sutochno.ru/doc/files/objects/2/297/384/1020x690/69f4853dc78b8.jpg",
  "https://static.sutochno.ru/doc/files/objects/2/297/384/1020x690/69f4853ec7993.jpg",
  "https://static.sutochno.ru/doc/files/objects/2/297/384/69f4853fa6102.jpg",
  "https://static.sutochno.ru/doc/files/objects/2/297/384/69f485408ce3f.jpg",
  "https://static.sutochno.ru/doc/files/objects/2/297/384/69f485419bfb9.jpg",
  "https://static.sutochno.ru/doc/files/objects/2/297/384/69f48542ad18a.jpg",
  "https://static.sutochno.ru/doc/files/objects/2/297/384/69f485438e886.jpg",
  "https://static.sutochno.ru/doc/files/objects/2/297/384/69f4854480a97.jpg",
].map((u) =>
  u.startsWith("//") ? "https:" + u : u.startsWith("http") ? u : "https://" + u
);

/** Панорамы Ростова-на-Дону: Wikimedia Commons, CC BY 4.0 (не интерьер квартиры). */
const ROSTOV_VIEWS = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Rostov-on-Don%2C_Don_River%2C_City%2C_Russia.jpg/1920px-Rostov-on-Don%2C_Don_River%2C_City%2C_Russia.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Rostov-on-Don%2C_Panorama_of_Rostov-on-Don_and_Don_River%2C_Russia.jpg/1920px-Rostov-on-Don%2C_Panorama_of_Rostov-on-Don_and_Don_River%2C_Russia.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Rostov-on-Don%2C_Skyline_2%2C_Russia.jpg/1920px-Rostov-on-Don%2C_Skyline_2%2C_Russia.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Rostov-on-Don%2C_Quietly_Flows_the_Don%2C_Russia.jpg/1920px-Rostov-on-Don%2C_Quietly_Flows_the_Don%2C_Russia.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Rostov-on-Don%2C_Don_River%2C_Russia.jpg/1920px-Rostov-on-Don%2C_Don_River%2C_Russia.jpg",
];

const STRINGS = {
  ru: {
    brand: "Привокзальная · Ростов",
    heroTitle: "Однокомнатная квартира посуточно в Ростове‑на‑Дону у вокзала и набережной",
    addressLine: "Привокзальная ул. 3/1, г. Ростов-на-Дону",
    heroLead:
      "Если вы искали, где снять однокомнатную квартиру в Ростове посуточно рядом с центром и вокзалами — это жильё на Привокзальной: новый дом, двор с детской площадкой, набережная Дона рядом. Актуальные фото ниже, как при запросе «снять квартиру посуточно с фото». Связь и бронирование напрямую от хозяина через форму на сайте — без посредников.",
    priceHint: "3000 - сутки\n\n2500 - неделя\n\n2000 - более 2х недель",
    bookCta: "Оставить заявку",
    callCta: "Заказать звонок",
    callSectionTitle: "Заказать обратный звонок",
    callSectionLead:
      "Оставьте имя и телефон — перезвоню и отвечу на вопросы по квартире. Удобное время укажите по желанию.",
    callMailSubject: "Звонок: Привокзальная 3/1, Ростов-на-Дону",
    labelCallbackPhone: "Телефон",
    labelEmailOptional: "Email (необязательно)",
    labelCallbackTime: "Когда удобно позвонить",
    labelCallbackComment: "Комментарий",
    phCallbackTime: "Например, сегодня после 18:00",
    phCallbackComment: "Вопрос по датам, заселению…",
    callSubmit: "Жду звонка",
    callPhoneRequiredError: "Для обратного звонка укажите номер телефона.",
    fabCall: "Звонок",
    checkDates: "Выберите даты заезда и выезда",
    guests: "гостей",
    night: "ночь",
    nights: "ночей",
    clear: "Сбросить",
    location: "Локация и посуточная аренда в городе",
    locationText:
      "Многие ищут квартиры посуточно в Ростове‑на‑Дону по районам или «у метро» — здесь удобная подсадка к центру и к вокзалам: спокойный новый комплекс и быстрый выход в деловую часть города. Рядом набережная, родник для купания и зоны отдыха у воды.",
    amenities: "Удобства",
    amenitiesList: [
      "Однокомнатная квартира для коротких и длинных остановок (посуточная аренда квартиры)",
      "Кухня для готовки, быстрый Wi‑Fi, стиральная машина",
      "Реальные фото в галерее — без «кота в мешке»",
    ],
    bookingTitle: "Календарь и даты заявки",
    bookingHelp:
      "Выберите заезд и выезд — значения подставятся в форму бронирования ниже. Так удобнее, чем писать даты вручную, когда нужно снять квартиру посуточно недорого и на конкретные ночи.",
    writeUs: "Или напишите в мессенджер",
    reviewsTitle: "Отзывы гостей",
    reviewsIntro:
      "Ниже — примеры формулировок; замените на реальные отзывы тех, кто уже снимал квартиру посуточно у вас.",
    reviewSample1:
      "Удобно добраться от вокзала, тихий двор, чисто. Набережная рядом — вечером гуляли без такси.",
    reviewSample2:
      "Новый дом, детям понравилась площадка во дворе. Заселение без сюрпризов.",
    reviewSample3:
      "Квартира свежая и аккуратная, всё как на фото. Быстро подтвердили бронь и были на связи.",
    reviewSample4:
      "Удобная локация для командировки: до центра недалеко, вечером спокойно отдохнули.",
    reviewSample5:
      "Понравилось, что есть стиральная машина и нормальная кухня — для нескольких дней очень удобно.",
    mapTitle: "Как добраться",
    footerNote:
      "Информация на странице носит справочный характер. Условия, залог и оплата — в переписке после заявки.",
    fabBook: "Заявка",
    fabMsg: "Чат",
    galleryTitle: "Фото квартиры",
    cityViewsTitle: "Ростов у Дона — виды рядом",
    cityViewsLead:
      "Набережная, панорамы центра и широкий Дон — то, ради чего гости часто выбирают остановку ближе к воде и прогулкам по городу.",
    cityViewsCredit: "Иллюстрации города с",
    cityViewsLicense: "· лицензия CC BY 4.0 (не фото квартиры).",
    cityViewsAlt: "Ростов-на-Дону, река Дон, вид на город",
    reviewCite: "— гость",
    metaCity: "Ростов‑на‑Дону",
    metaTagline: "Посуточно · напрямую · с фото",
    afterReviewsCta: "Перейти к форме заявки",
    formSectionTitle: "Бронирование через сайт",
    formSectionLead:
      "Оставьте заявку — отвечу по почте, телефону или в мессенджере. Укажите даты заезда и выезда и число гостей — так проще согласовать бронь.",
    formMailSubject: "Бронь: Привокзальная 3/1, Ростов-на-Дону",
    labelName: "Имя",
    labelEmail: "Email",
    labelPhone: "Телефон",
    labelCheckin: "Заезд",
    labelCheckout: "Выезд",
    labelGuests: "Гостей",
    labelMessage: "Комментарий",
    phName: "Как к вам обращаться",
    phEmail: "you@example.com",
    phPhone: "+7 …",
    phGuests: "Например, 2",
    phMessage: "Командировка, дети, животные, время прибытия…",
    contactRequiredHint: "Для заявки укажите телефон или email.",
    formSubmit: "Отправить заявку",
    formPrivacy:
      "Данные уходят на Formspree; хранение и обработка — по правилам сервиса Formspree.",
    formNotConfigured:
      "Укажите в app.js адрес формы: CONFIG.formspreeEndpoint = \"https://formspree.io/f/…\"",
    contactRequiredError: "Укажите телефон или email, чтобы я мог связаться с вами.",
    calEmpty: "Нажмите день заезда, затем день выезда.",
    calSelected: (a, b, n) =>
      `Заезд ${a} · Выезд ${b} · ${n} ${n === 1 ? "ночь" : n < 5 ? "ночи" : "ночей"}`,
  },
  en: {
    brand: "Privokzalnaya · Rostov",
    heroTitle: "One-bedroom apartment for daily rent in Rostov-on-Don near station & embankment",
    addressLine: "3/1 Privokzalnaya St., Rostov-on-Don, Russia",
    heroLead:
      "Looking for a one-bedroom short‑term rental in Rostov near the centre and railway area? This flat on Privokzalnaya is in a new building with a kids’ playground and the Don embankment nearby. Real photos in the gallery — book directly from the host via the on‑site form (no middlemen).",
    priceHint: "From ~3000 RUB/night — final rate after we confirm dates",
    bookCta: "Request a booking",
    callCta: "Request a call",
    callSectionTitle: "Request a call back",
    callSectionLead:
      "Leave your name and phone — I’ll call you back to answer questions about the flat. Add a preferred time if you like.",
    callMailSubject: "Call back: Privokzalnaya 3/1, Rostov-on-Don",
    labelCallbackPhone: "Phone",
    labelEmailOptional: "Email (optional)",
    labelCallbackTime: "Best time to call",
    labelCallbackComment: "Comment",
    phCallbackTime: "e.g. today after 6 pm",
    phCallbackComment: "Dates, check-in…",
    callSubmit: "Request a call",
    callPhoneRequiredError: "Phone number is required for a callback request.",
    fabCall: "Call",
    checkDates: "Pick check-in and check-out",
    guests: "guests",
    night: "night",
    nights: "nights",
    clear: "Clear",
    location: "Location & short stays",
    locationText:
      "Handy for trains and the city centre: a quiet new complex while staying close to what visitors search for — “daily rent”, “apartment near station”, embankment walks. Near the Don embankment, a spring bathing spot and waterfront recreation areas.",
    amenities: "Amenities",
    amenitiesList: [
      "Full apartment for short or longer stays",
      "Kitchen, fast Wi‑Fi, washing machine",
      "Real photos in the gallery",
    ],
    bookingTitle: "Calendar & dates",
    bookingHelp:
      "Pick check-in and check-out — they are copied into the booking form below.",
    writeUs: "Or message us",
    reviewsTitle: "Guest reviews",
    reviewsIntro:
      "Samples below — replace with real quotes from guests who stayed.",
    reviewSample1:
      "Easy from the station, quiet courtyard, clean. Evening walks on the embankment without needing a taxi.",
    reviewSample2:
      "New building, kids loved the playground. Straightforward check-in.",
    reviewSample3:
      "Fresh and tidy flat, exactly like in the photos. Booking was confirmed quickly and communication was easy.",
    reviewSample4:
      "Great location for a business trip: close enough to the centre and quiet at night.",
    reviewSample5:
      "The washing machine and proper kitchen were a big plus for a multi-day stay.",
    mapTitle: "Getting here",
    footerNote:
      "Information here is indicative; terms, deposit and payment are agreed after your request.",
    fabBook: "Book",
    fabMsg: "Chat",
    galleryTitle: "Photos",
    cityViewsTitle: "Rostov-on-Don by the Don — nearby views",
    cityViewsLead:
      "Embankments, skyline and the wide Don — what many visitors come for when they stay close to the water and evening walks.",
    cityViewsCredit: "City photos from",
    cityViewsLicense: "· CC BY 4.0 (not the apartment interior).",
    cityViewsAlt: "Rostov-on-Don, Don River, city view",
    reviewCite: "— guest",
    metaCity: "Rostov-on-Don",
    metaTagline: "Daily rent · direct · photos",
    afterReviewsCta: "Go to booking form",
    formSectionTitle: "Book via the form",
    formSectionLead:
      "Send a request — I’ll reply by email, phone or messenger. Add dates and guest count like a normal short‑term booking inquiry.",
    formMailSubject: "Booking: Privokzalnaya 3/1, Rostov-on-Don",
    labelName: "Name",
    labelEmail: "Email",
    labelPhone: "Phone",
    labelCheckin: "Check-in",
    labelCheckout: "Check-out",
    labelGuests: "Guests",
    labelMessage: "Message",
    phName: "Your name",
    phEmail: "you@example.com",
    phPhone: "+7 …",
    phGuests: "e.g. 2",
    phMessage: "Business trip, kids, pets, arrival time…",
    contactRequiredHint: "Please provide either a phone number or an email.",
    formSubmit: "Send request",
    formPrivacy: "Submissions go to Formspree; data handling follows Formspree’s policies.",
    formNotConfigured: 'Set CONFIG.formspreeEndpoint = "https://formspree.io/f/…" in app.js',
    contactRequiredError: "Please provide a phone number or an email so I can contact you.",
    calEmpty: "Tap check-in day, then check-out day.",
    calSelected: (a, b, n) =>
      `Check-in ${a} · Check-out ${b} · ${n} ${n === 1 ? "night" : "nights"}`,
  },
};

let lang = localStorage.getItem("lang") === "en" ? "en" : "ru";
let calOffset = 0;
let rangeStart = null;
let rangeEnd = null;

function t(key) {
  const bundle = STRINGS[lang];
  return bundle[key];
}

function formatDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function parseYMD(s) {
  const [y, m, day] = s.split("-").map(Number);
  return new Date(y, m - 1, day);
}

function nightsBetween(a, b) {
  const ms = b.getTime() - a.getTime();
  return Math.max(0, Math.round(ms / 86400000));
}

function dayStamp(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x.getTime();
}

function syncBookingForm() {
  const inEl = document.getElementById("field-checkin");
  const outEl = document.getElementById("field-checkout");
  const sub = document.getElementById("rent-subject");
  const callSub = document.getElementById("callback-subject");
  if (inEl) inEl.value = rangeStart ? formatDate(rangeStart) : "";
  if (outEl) outEl.value = rangeEnd ? formatDate(rangeEnd) : "";
  if (sub) sub.value = t("formMailSubject");
  if (callSub) callSub.value = t("callMailSubject");
}

function applyI18n() {
  document.documentElement.lang = lang === "en" ? "en" : "ru";
  document.title =
    lang === "en"
      ? "Daily rent Rostov-on-Don · station · Privokzalnaya 3/1"
      : "Квартира посуточно Ростов у вокзала · Привокзальная 3/1";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key === "amenitiesList") {
      const list = t("amenitiesList");
      el.innerHTML = list.map((x) => `<li>${x}</li>`).join("");
      return;
    }
    el.textContent = t(key);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
  });
  document.querySelectorAll('button[name="lang"]').forEach((btn) => {
    btn.setAttribute("aria-pressed", btn.value === lang ? "true" : "false");
  });
  renderCalendar();
  updateRangeSummary();
  syncBookingForm();
}

function startOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function addMonths(d, n) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}

function buildMonthGrid(viewMonth) {
  const first = startOfMonth(viewMonth);
  const year = first.getFullYear();
  const month = first.getMonth();
  const lastDay = new Date(year, month + 1, 0).getDate();
  const startDow = (first.getDay() + 6) % 7;
  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= lastDay; d++) {
    cells.push(new Date(year, month, d));
  }
  return cells;
}

function isPastDay(d) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x < today;
}

function inSelectedRange(d) {
  if (!rangeStart || !rangeEnd) return false;
  const t = dayStamp(d);
  const a = dayStamp(rangeStart);
  const b = dayStamp(rangeEnd);
  return t > a && t < b;
}

function renderCalendar() {
  const host = document.getElementById("cal-host");
  if (!host) return;
  const base = addMonths(new Date(), calOffset);
  const m1 = base;
  const m2 = addMonths(base, 1);
  host.innerHTML = [m1, m2].map((vm) => renderOneMonth(vm)).join("");
  host.querySelectorAll(".cal-day").forEach((btn) => {
    btn.addEventListener("click", onDayClick);
  });
}

function renderOneMonth(viewMonth) {
  const cells = buildMonthGrid(viewMonth);
  const title = viewMonth.toLocaleDateString(lang === "en" ? "en-GB" : "ru-RU", {
    month: "long",
    year: "numeric",
  });
  const dows =
    lang === "en"
      ? ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
      : ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let grid = dows.map((d) => `<div class="cal-dow">${d}</div>`).join("");
  for (const d of cells) {
    if (!d) {
      grid += `<div></div>`;
      continue;
    }
    const ymd = formatDate(d);
    const past = isPastDay(d);
    let cls = "cal-day";
    if (past) cls += " past";
    if (d.getTime() === today.getTime()) cls += " today";
    if (rangeStart && formatDate(d) === formatDate(rangeStart)) cls += " range-start";
    if (rangeEnd && formatDate(d) === formatDate(rangeEnd)) cls += " range-end";
    if (inSelectedRange(new Date(d))) cls += " in-range";
    grid += `<button type="button" class="${cls}" data-ymd="${ymd}" ${
      past ? "disabled" : ""
    }">${d.getDate()}</button>`;
  }

  return `
    <div class="cal-month">
      <h4>${title}</h4>
      <div class="cal-grid">${grid}</div>
    </div>`;
}

function onDayClick(e) {
  const ymd = e.currentTarget.getAttribute("data-ymd");
  if (!ymd) return;
  const d = parseYMD(ymd);
  if (isPastDay(d)) return;

  if (!rangeStart || (rangeStart && rangeEnd)) {
    rangeStart = d;
    rangeEnd = null;
  } else {
    if (d.getTime() <= rangeStart.getTime()) {
      rangeStart = d;
      rangeEnd = null;
    } else {
      rangeEnd = d;
    }
  }
  renderCalendar();
  updateRangeSummary();
  syncBookingForm();
}

function updateRangeSummary() {
  const el = document.getElementById("range-summary");
  if (!el) return;
  if (!rangeStart) {
    el.textContent = t("calEmpty");
    return;
  }
  if (!rangeEnd) {
    const a = rangeStart.toLocaleDateString(lang === "en" ? "en-GB" : "ru-RU");
    el.textContent = `${t("checkDates")}: ${a} — …`;
    return;
  }
  const n = nightsBetween(rangeStart, rangeEnd);
  const a = rangeStart.toLocaleDateString(lang === "en" ? "en-GB" : "ru-RU");
  const b = rangeEnd.toLocaleDateString(lang === "en" ? "en-GB" : "ru-RU");
  el.textContent = t("calSelected")(a, b, n);
}

function initGallery() {
  const main = document.getElementById("hero-img");
  const host = document.getElementById("thumbs");
  if (!main || !host) return;
  main.src = IMAGES[0];
  main.alt = t("heroTitle");
  host.innerHTML = IMAGES.map(
    (src, i) =>
      `<button type="button" aria-label="Photo ${i + 1}"><img src="${src}" alt="" loading="lazy" /></button>`
  ).join("");
  host.querySelectorAll("button").forEach((btn, i) => {
    btn.addEventListener("click", () => {
      main.src = IMAGES[i];
      host.querySelectorAll("button").forEach((b) => b.removeAttribute("data-active"));
      btn.setAttribute("data-active", "true");
    });
  });
}

function initCityViews() {
  const host = document.getElementById("city-grid");
  if (!host) return;
  if (!host.dataset.built) {
    host.innerHTML = ROSTOV_VIEWS.map(
      (src) =>
        `<figure class="city-card"><img src="${src}" alt="" loading="lazy" width="960" height="600" decoding="async" /></figure>`
    ).join("");
    host.dataset.built = "1";
  }
  host.querySelectorAll("img").forEach((img) => {
    img.alt = t("cityViewsAlt");
  });
}

function formspreeReady() {
  const ep = (CONFIG.formspreeEndpoint || "").trim();
  return ep.startsWith("https://formspree.io/");
}

function bindFormspree(form) {
  if (!form) return;
  if (formspreeReady()) {
    form.action = CONFIG.formspreeEndpoint.trim();
    form.removeEventListener("submit", onFormspreeMissing);
  } else {
    form.action = "#";
    form.addEventListener("submit", onFormspreeMissing);
  }
}

function validateBookingContact() {
  const form = document.getElementById("rent-form");
  if (!form) return true;
  const email = form.querySelector('input[name="email"]');
  const phone = form.querySelector('input[name="phone"]');
  if (!email || !phone) return true;

  const hasEmail = email.value.trim().length > 0;
  const hasPhone = phone.value.trim().length > 0;
  const message = t("contactRequiredError");

  email.setCustomValidity("");
  phone.setCustomValidity("");

  if (hasEmail || hasPhone) return true;

  email.setCustomValidity(message);
  phone.setCustomValidity(message);
  return false;
}

function validateCallbackPhone() {
  const form = document.getElementById("callback-form");
  if (!form) return true;
  const phone = form.querySelector('input[name="phone"]');
  if (!phone) return true;

  const hasPhone = phone.value.trim().length > 0;
  phone.setCustomValidity("");
  if (hasPhone) return true;

  phone.setCustomValidity(t("callPhoneRequiredError"));
  return false;
}

function initSpreeForms() {
  bindFormspree(document.getElementById("rent-form"));
  bindFormspree(document.getElementById("callback-form"));
}

function onFormspreeMissing(ev) {
  ev.preventDefault();
  alert(t("formNotConfigured"));
}

function init() {
  initSpreeForms();
  applyI18n();
  initGallery();
  initCityViews();

  const rentForm = document.getElementById("rent-form");
  const rentEmail = rentForm?.querySelector('input[name="email"]');
  const rentPhone = rentForm?.querySelector('input[name="phone"]');
  rentForm?.addEventListener("submit", (event) => {
    if (!validateBookingContact()) {
      event.preventDefault();
      (rentPhone?.value.trim() ? rentEmail : rentPhone)?.reportValidity();
    }
  });
  [rentEmail, rentPhone].forEach((field) => {
    field?.addEventListener("input", () => {
      validateBookingContact();
    });
  });

  const callbackForm = document.getElementById("callback-form");
  const callbackPhone = callbackForm?.querySelector('input[name="phone"]');
  callbackForm?.addEventListener("submit", (event) => {
    if (!validateCallbackPhone()) {
      event.preventDefault();
      callbackPhone?.reportValidity();
    }
  });
  callbackPhone?.addEventListener("input", () => {
    validateCallbackPhone();
  });

  document.querySelectorAll('button[name="lang"]').forEach((btn) => {
    btn.addEventListener("click", () => {
      lang = btn.value;
      localStorage.setItem("lang", lang);
      applyI18n();
      syncMessengerLinks();
      const main = document.getElementById("hero-img");
      if (main) main.alt = t("heroTitle");
      initCityViews();
    });
  });

  document.getElementById("field-checkin")?.addEventListener("change", () => {
    const v = document.getElementById("field-checkin")?.value;
    rangeStart = v ? parseYMD(v) : null;
    if (
      rangeEnd &&
      rangeStart &&
      dayStamp(rangeEnd) <= dayStamp(rangeStart)
    ) {
      rangeEnd = null;
    }
    renderCalendar();
    updateRangeSummary();
  });
  document.getElementById("field-checkout")?.addEventListener("change", () => {
    const v = document.getElementById("field-checkout")?.value;
    rangeEnd = v ? parseYMD(v) : null;
    renderCalendar();
    updateRangeSummary();
  });

  document.getElementById("cal-prev")?.addEventListener("click", () => {
    calOffset--;
    renderCalendar();
  });
  document.getElementById("cal-next")?.addEventListener("click", () => {
    calOffset++;
    renderCalendar();
  });

  document.getElementById("cal-clear")?.addEventListener("click", () => {
    rangeStart = null;
    rangeEnd = null;
    renderCalendar();
    updateRangeSummary();
    syncBookingForm();
  });

  syncMessengerLinks();
}

function syncMessengerLinks() {
  const tgUser = (CONFIG.telegramUser || "").trim().replace(/^@/, "");
  const tg = tgUser.length > 0 ? `https://t.me/${tgUser}` : "#";
  const waText =
    lang === "en"
      ? "Hello! I'd like to book the flat at 3/1 Privokzalnaya St., Rostov-on-Don."
      : "Здравствуйте! Хочу забронировать квартиру по адресу Привокзальная ул. 3/1, г. Ростов-на-Дону.";
  const waDigits = (CONFIG.whatsappPhone || "").replace(/\D/g, "");
  const wa =
    waDigits.length >= 10
      ? `https://wa.me/${waDigits}?text=${encodeURIComponent(waText)}`
      : "#";
  document.querySelectorAll("[data-msg-telegram]").forEach((a) => {
    a.href = tg;
    if (tg === "#") a.setAttribute("aria-disabled", "true");
    else a.removeAttribute("aria-disabled");
  });
  document.querySelectorAll("[data-msg-whatsapp]").forEach((a) => {
    a.href = wa;
    if (wa === "#") a.setAttribute("aria-disabled", "true");
    else a.removeAttribute("aria-disabled");
  });
}

document.addEventListener("DOMContentLoaded", init);
