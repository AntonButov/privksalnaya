const GALLERY_STRINGS = {
  ru: {
    brand: "Привокзальная · Ростов",
    bookCta: "Забронировать",
    backHome: "← На главную",
    galleryPageTitle: "Фото квартиры",
    galleryPageHint:
      "Нажмите на фото, чтобы открыть увеличение. Колёсико мыши, кнопки +/− или жест pinch на телефоне.",
    lightboxTitle: "Просмотр фото",
    zoomReset: "Сброс",
    close: "Закрыть",
    photoAlt: (n) => `Фото квартиры ${n}`,
    counter: (cur, total) => `${cur} / ${total}`,
  },
  en: {
    brand: "Privokzalnaya · Rostov",
    bookCta: "Request a booking",
    backHome: "← Back to home",
    galleryPageTitle: "Apartment photos",
    galleryPageHint:
      "Tap a photo to open it. Use the mouse wheel, +/− buttons, or pinch on your phone to zoom.",
    lightboxTitle: "Photo viewer",
    zoomReset: "Reset",
    close: "Close",
    photoAlt: (n) => `Apartment photo ${n}`,
    counter: (cur, total) => `${cur} / ${total}`,
  },
};

let lang = localStorage.getItem("lang") === "en" ? "en" : "ru";

function gt(key, ...args) {
  const v = GALLERY_STRINGS[lang][key];
  return typeof v === "function" ? v(...args) : v;
}

function applyLang() {
  document.documentElement.lang = lang === "en" ? "en" : "ru";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key && GALLERY_STRINGS[lang][key]) el.textContent = gt(key);
  });
  document.querySelectorAll('button[name="lang"]').forEach((btn) => {
    btn.setAttribute("aria-pressed", btn.value === lang ? "true" : "false");
  });
}

function initLangToggle() {
  document.querySelectorAll('button[name="lang"]').forEach((btn) => {
    btn.addEventListener("click", () => {
      lang = btn.value;
      localStorage.setItem("lang", lang);
      applyLang();
      buildGrid();
      if (viewer.isOpen()) viewer.refreshLabels();
    });
  });
}

function buildGrid() {
  const host = document.getElementById("photo-grid");
  if (!host) return;
  host.innerHTML = IMAGES.map(
    (src, i) =>
      `<button type="button" class="photo-grid-item" data-index="${i}">
        <img src="${src}" alt="${gt("photoAlt", i + 1)}" loading="lazy" width="640" height="430" />
      </button>`
  ).join("");
  host.querySelectorAll(".photo-grid-item").forEach((btn) => {
    btn.addEventListener("click", () => viewer.open(Number(btn.dataset.index)));
  });
}

const viewer = (() => {
  const MIN_SCALE = 1;
  const MAX_SCALE = 4;
  const lb = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  const stage = document.getElementById("lightbox-stage");
  const counterEl = document.getElementById("lightbox-counter");
  const zoomLevelEl = document.getElementById("zoom-level");

  let index = 0;
  let scale = 1;
  let tx = 0;
  let ty = 0;
  let open = false;

  let dragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let dragTx = 0;
  let dragTy = 0;

  let pinchStartDist = 0;
  let pinchStartScale = 1;
  let activePointers = new Map();

  function clampPan() {
    if (scale <= 1) {
      tx = 0;
      ty = 0;
      return;
    }
    const rect = stage.getBoundingClientRect();
    const maxX = (rect.width * (scale - 1)) / 2;
    const maxY = (rect.height * (scale - 1)) / 2;
    tx = Math.min(maxX, Math.max(-maxX, tx));
    ty = Math.min(maxY, Math.max(-maxY, ty));
  }

  function applyTransform() {
    clampPan();
    img.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
    zoomLevelEl.textContent = `${Math.round(scale * 100)}%`;
  }

  function resetTransform() {
    scale = 1;
    tx = 0;
    ty = 0;
    applyTransform();
  }

  function setScale(next, anchorX, anchorY) {
    const prev = scale;
    scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, next));
    if (anchorX != null && anchorY != null && prev !== scale) {
      const rect = stage.getBoundingClientRect();
      const cx = anchorX - rect.left - rect.width / 2;
      const cy = anchorY - rect.top - rect.height / 2;
      const ratio = scale / prev - 1;
      tx -= cx * ratio;
      ty -= cy * ratio;
    }
    if (scale <= 1) {
      tx = 0;
      ty = 0;
    }
    applyTransform();
  }

  function updateCounter() {
    counterEl.textContent = gt("counter", index + 1, IMAGES.length);
    img.alt = gt("photoAlt", index + 1);
  }

  function showImage(i) {
    index = (i + IMAGES.length) % IMAGES.length;
    img.src = IMAGES[index];
    resetTransform();
    updateCounter();
  }

  function openAt(i) {
    index = i;
    img.src = IMAGES[index];
    resetTransform();
    updateCounter();
    lb.hidden = false;
    open = true;
    document.body.classList.add("lightbox-open");
  }

  function closeViewer() {
    lb.hidden = true;
    open = false;
    document.body.classList.remove("lightbox-open");
    resetTransform();
  }

  function pointerDistance() {
    const pts = [...activePointers.values()];
    if (pts.length < 2) return 0;
    const dx = pts[1].x - pts[0].x;
    const dy = pts[1].y - pts[0].y;
    return Math.hypot(dx, dy);
  }

  stage.addEventListener(
    "wheel",
    (e) => {
      if (!open) return;
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.12 : 0.12;
      setScale(scale + delta, e.clientX, e.clientY);
    },
    { passive: false }
  );

  stage.addEventListener("dblclick", (e) => {
    if (!open) return;
    if (scale > 1) resetTransform();
    else setScale(2, e.clientX, e.clientY);
  });

  stage.addEventListener("pointerdown", (e) => {
    if (!open) return;
    stage.setPointerCapture(e.pointerId);
    activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (activePointers.size === 2) {
      pinchStartDist = pointerDistance();
      pinchStartScale = scale;
      dragging = false;
      return;
    }
    if (scale <= 1) return;
    dragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    dragTx = tx;
    dragTy = ty;
  });

  stage.addEventListener("pointermove", (e) => {
    if (!open || !activePointers.has(e.pointerId)) return;
    activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (activePointers.size >= 2 && pinchStartDist > 0) {
      const dist = pointerDistance();
      setScale(pinchStartScale * (dist / pinchStartDist));
      return;
    }
    if (!dragging || scale <= 1) return;
    tx = dragTx + (e.clientX - dragStartX);
    ty = dragTy + (e.clientY - dragStartY);
    applyTransform();
  });

  function endPointer(e) {
    activePointers.delete(e.pointerId);
    if (activePointers.size < 2) {
      pinchStartDist = 0;
      dragging = false;
    }
  }

  stage.addEventListener("pointerup", endPointer);
  stage.addEventListener("pointercancel", endPointer);

  document.getElementById("zoom-in")?.addEventListener("click", () => {
    const rect = stage.getBoundingClientRect();
    setScale(scale + 0.25, rect.left + rect.width / 2, rect.top + rect.height / 2);
  });
  document.getElementById("zoom-out")?.addEventListener("click", () => {
    const rect = stage.getBoundingClientRect();
    setScale(scale - 0.25, rect.left + rect.width / 2, rect.top + rect.height / 2);
  });
  document.getElementById("zoom-reset")?.addEventListener("click", resetTransform);
  document.getElementById("lightbox-close")?.addEventListener("click", closeViewer);
  document.querySelectorAll("[data-lightbox-close]").forEach((el) => {
    el.addEventListener("click", closeViewer);
  });
  document.getElementById("lightbox-prev")?.addEventListener("click", () => showImage(index - 1));
  document.getElementById("lightbox-next")?.addEventListener("click", () => showImage(index + 1));

  document.addEventListener("keydown", (e) => {
    if (!open) return;
    if (e.key === "Escape") closeViewer();
    if (e.key === "ArrowLeft") showImage(index - 1);
    if (e.key === "ArrowRight") showImage(index + 1);
    if (e.key === "+" || e.key === "=") setScale(scale + 0.2);
    if (e.key === "-") setScale(scale - 0.2);
  });

  const params = new URLSearchParams(location.search);
  const start = Number(params.get("photo"));
  if (Number.isFinite(start) && start >= 1 && start <= IMAGES.length) {
    openAt(start - 1);
  }

  return {
    open: openAt,
    close: closeViewer,
    isOpen: () => open,
    refreshLabels: updateCounter,
  };
})();

document.addEventListener("DOMContentLoaded", () => {
  applyLang();
  initLangToggle();
  buildGrid();
});
