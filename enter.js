const ENTER_STRINGS = {
  ru: {
    brand: "Привокзальная · Ростов",
    pageTitle: "Заселение",
    pageLead: "Бесконтактное заселение после 14:00, выезд до 12:00. Приятного отдыха!",
    stepAddressTitle: "Как найти",
    stepAddressText:
      "5-й подъезд во внутреннем дворике П-образной секции, ул. Привокзальная 3/1.",
    stepIntercomTitle: "Домофон",
    stepFloorTitle: "Этаж",
    stepFloorText: "6-й этаж",
    stepBoxTitle: "Ключи в боксе",
    stepAddressPhotoAlt: "Схема проезда к подъезду во дворе ЖК Донская слобода",
    stepWifiTitle: "Wi‑Fi",
    stepWifiNetwork: "Сеть",
    stepWifiPasswordLabel: "пароль",
    stepWifiPhotoAlt: "QR-код для подключения к Wi‑Fi MTSRouter_1079",
    stepWifiCaption: "Отсканируйте QR-код или введите данные вручную.",
    contactTitle: "Нужна помощь?",
    contactText: "Пишите или звоните — ответим во всех мессенджерах.",
  },
  en: {
    brand: "Privokzalnaya · Rostov",
    pageTitle: "Check-in",
    pageLead: "Self check-in after 2:00 PM, check-out before 12:00 PM. Enjoy your stay!",
    stepAddressTitle: "How to find us",
    stepAddressText:
      "5th entrance in the inner courtyard of the U-shaped section, 3/1 Privokzalnaya St.",
    stepIntercomTitle: "Intercom",
    stepFloorTitle: "Floor",
    stepFloorText: "6th floor",
    stepBoxTitle: "Key box code",
    stepAddressPhotoAlt: "Route map to the entrance in the Donskaya Sloboda courtyard",
    stepWifiTitle: "Wi‑Fi",
    stepWifiNetwork: "Network",
    stepWifiPasswordLabel: "password",
    stepWifiPhotoAlt: "QR code to connect to Wi‑Fi MTSRouter_1079",
    stepWifiCaption: "Scan the QR code or enter the details manually.",
    contactTitle: "Need help?",
    contactText: "Message or call — we reply on all messengers.",
  },
};

const PHONE = "79896377901";
const TELEGRAM = "antonbutov";

let lang = localStorage.getItem("lang") === "en" ? "en" : "ru";

function t(key) {
  return ENTER_STRINGS[lang][key];
}

function applyLang() {
  document.documentElement.lang = lang === "en" ? "en" : "ru";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key && ENTER_STRINGS[lang][key]) el.textContent = t(key);
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
    const key = el.getAttribute("data-i18n-alt");
    if (key && ENTER_STRINGS[lang][key]) el.alt = t(key);
  });
  document.querySelectorAll('button[name="lang"]').forEach((btn) => {
    btn.setAttribute("aria-pressed", btn.value === lang ? "true" : "false");
  });
}

function syncLinks() {
  document.querySelectorAll("[data-msg-phone]").forEach((el) => {
    el.href = `tel:+${PHONE}`;
  });
  document.querySelectorAll("[data-msg-telegram]").forEach((el) => {
    el.href = `https://t.me/${TELEGRAM}`;
  });
  document.querySelectorAll("[data-msg-whatsapp]").forEach((el) => {
    el.href = `https://wa.me/${PHONE}`;
  });
}

document.querySelectorAll('button[name="lang"]').forEach((btn) => {
  btn.addEventListener("click", () => {
    lang = btn.value;
    localStorage.setItem("lang", lang);
    applyLang();
  });
});

applyLang();
syncLinks();
