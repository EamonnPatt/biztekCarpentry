/* =====================================================================
   QUOTE FORM DELIVERY
   ---------------------------------------------------------------------
   Requests are sent in the background, so visitors never leave the page
   or see an email app open. By default they go through FormSubmit
   (formsubmit.co) to CONTACT_EMAIL. The very first request triggers a
   one-time "confirm your form" email to that address; click the link in
   it and every request after that is delivered, photos attached.

   To use a different service (e.g. Formspree), paste its form URL into
   FORM_ENDPOINT instead.
   ===================================================================== */
const CONTACT_EMAIL = "anthony@biztekcarpentry.com";
const FORM_ENDPOINT = `https://formsubmit.co/${CONTACT_EMAIL}`;
const MAX_FILES = 10;
const MAX_IMAGE_PX = 1800; // photos are resized before upload so phone pictures send quickly

const CATEGORY_LABELS = {
  cabinetry: "Cabinetry & Built-Ins",
  kitchens: "Kitchens & Vanities",
  stairs: "Staircases & Railings",
  finish: "Finish Carpentry",
  commercial: "Commercial Millwork",
  outdoor: "Outdoor Structures"
};

const CATEGORY_SERVICE = {
  cabinetry: "Custom Cabinetry & Built-Ins",
  kitchens: "Kitchens & Vanities",
  stairs: "Staircases & Railings",
  finish: "Interior Finish Carpentry",
  commercial: "Commercial Millwork",
  outdoor: "Outdoor Structures"
};

const projects = window.PROJECTS || [];
const reviews = window.REVIEWS || [];
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function escapeHtml(str) {
  return String(str ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* ---------- Media: real photo over a wood-grain placeholder ---------- */
function media(src, tone, label, extraClass = "") {
  const el = document.createElement("div");
  el.className = `media ${extraClass}`.trim();
  el.style.setProperty("--tone", tone || "#7a5534");
  el.innerHTML = `<span class="media-label">${escapeHtml(label || "")}</span>`;
  if (src) {
    const img = new Image();
    img.alt = label || "";
    img.loading = "lazy";
    img.decoding = "async";
    img.onload = () => el.classList.add("has-img");
    img.onerror = () => img.remove();
    img.src = src;
    el.appendChild(img);
  }
  return el;
}

/* ---------- Header ---------- */
const header = $(".site-header");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const menuBtn = $(".menu-toggle");
const mobileMenu = $("#mobile-menu");
function setMenu(open) {
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  mobileMenu.hidden = !open;
  document.body.classList.toggle("menu-open", open);
}
menuBtn.addEventListener("click", () => setMenu(mobileMenu.hidden));
$$("#mobile-menu a").forEach(a => a.addEventListener("click", () => setMenu(false)));

/* ---------- Reveal on scroll ---------- */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

function observeReveals(root = document) {
  $$(".reveal:not(.is-visible)", root).forEach((el, i) => {
    el.style.setProperty("--d", `${(i % 6) * 70}ms`);
    revealObserver.observe(el);
  });
}

/* ---------- Hero tiles ---------- */
$$(".hero-tile").forEach(tile => {
  const p = projects[Number(tile.dataset.project)];
  if (!p) return;
  tile.appendChild(media(p.images[0]?.src, p.tone, ""));
});

/* ---------- Portfolio grid ---------- */
const grid = $("#project-grid");

function renderProjects(filter = "all") {
  grid.innerHTML = "";
  projects
    .map((p, index) => ({ p, index }))
    .filter(({ p }) => filter === "all" || p.category === filter)
    .forEach(({ p, index }, i) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "project-card reveal";
      if (filter === "all" && i % 5 === 0) card.classList.add("is-feature");
      card.setAttribute("aria-label", `View project: ${p.title}, ${p.location}`);
      card.appendChild(media(p.images[0]?.src, p.tone, p.images[0]?.caption));
      card.insertAdjacentHTML("beforeend", `
        <div class="project-meta">
          <span class="project-cat">${escapeHtml(CATEGORY_LABELS[p.category] || "")}</span>
          <h3>${escapeHtml(p.title)}</h3>
          <span class="project-loc">${escapeHtml(p.location)} · ${escapeHtml(p.year)}</span>
        </div>
        <span class="project-open" aria-hidden="true">View project <b>→</b></span>
        ${p.sample ? '<span class="sample-tag">Example</span>' : ""}
      `);
      card.addEventListener("click", () => openProject(index, card));
      grid.appendChild(card);
    });
  observeReveals(grid);
}

$$(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".filter").forEach(b => {
      b.classList.toggle("is-active", b === btn);
      b.setAttribute("aria-selected", String(b === btn));
    });
    renderProjects(btn.dataset.filter);
  });
});

renderProjects();

/* ---------- Project modal ---------- */
const modal = $("#project-modal");
const stage = $("#modal-stage");
const thumbs = $("#modal-thumbs");
const modalBody = $("#modal-body");
let lastFocus = null;

function compareSlider(p) {
  const wrap = document.createElement("div");
  wrap.className = "compare";
  wrap.style.setProperty("--pos", "50%");
  const after = media(p.after, p.tone, "After", "compare-after");
  const before = media(p.before, p.tone, "Before", "compare-before");
  wrap.append(after, before);
  wrap.insertAdjacentHTML("beforeend", `
    <span class="compare-handle" aria-hidden="true"><i></i></span>
    <span class="compare-tag compare-tag-b">Before</span>
    <span class="compare-tag compare-tag-a">After</span>
    <input type="range" min="0" max="100" value="50" aria-label="Drag to compare before and after">
  `);
  const range = $("input", wrap);
  range.addEventListener("input", () => wrap.style.setProperty("--pos", `${range.value}%`));
  return wrap;
}

function showSlide(p, slide) {
  stage.innerHTML = "";
  if (slide === "compare") {
    stage.appendChild(compareSlider(p));
  } else {
    const img = p.images[slide];
    stage.appendChild(media(img.src, p.tone, img.caption, "media-large"));
    if (img.caption) stage.insertAdjacentHTML("beforeend", `<p class="stage-caption">${escapeHtml(img.caption)}</p>`);
  }
  $$(".thumb", thumbs).forEach(t => t.classList.toggle("is-active", t.dataset.slide === String(slide)));
}

function openProject(index, trigger) {
  const p = projects[index];
  lastFocus = trigger || document.activeElement;
  thumbs.innerHTML = "";

  const slides = p.images.map((img, i) => ({ key: String(i), src: img.src, label: img.caption }));
  if (p.before && p.after) slides.push({ key: "compare", src: p.after, label: "Before / After" });

  slides.forEach(s => {
    const t = document.createElement("button");
    t.type = "button";
    t.className = "thumb";
    t.dataset.slide = s.key;
    t.setAttribute("aria-label", `Show ${s.label}`);
    t.appendChild(media(s.src, p.tone, ""));
    if (s.key === "compare") t.insertAdjacentHTML("beforeend", `<span class="thumb-tag">Before / After</span>`);
    t.addEventListener("click", () => showSlide(p, s.key === "compare" ? "compare" : Number(s.key)));
    thumbs.appendChild(t);
  });

  const list = items => `<ul>${items.map(i => `<li>${escapeHtml(i)}</li>`).join("")}</ul>`;
  modalBody.innerHTML = `
    <span class="project-cat">${escapeHtml(CATEGORY_LABELS[p.category] || "")}</span>
    <h2 id="modal-title">${escapeHtml(p.title)}</h2>
    <p class="modal-loc">${escapeHtml(p.location)} · ${escapeHtml(p.year)}${p.sample ? ' <span class="sample-tag inline">Example project</span>' : ""}</p>

    <div class="spec-cards">
      <div><span>Cost range</span><strong>${escapeHtml(p.cost)}</strong></div>
      <div><span>Timeline</span><strong>${escapeHtml(p.timeline)}</strong></div>
    </div>

    <h4>What the client needed</h4>
    <p>${escapeHtml(p.need)}</p>
    <h4>Materials</h4>
    ${list(p.materials)}
    <h4>Craftsmanship details</h4>
    ${list(p.details)}
    ${p.notes ? `<h4>Installation notes</h4><p>${escapeHtml(p.notes)}</p>` : ""}

    <a href="#quote" class="btn btn-primary modal-cta" data-service="${escapeHtml(CATEGORY_SERVICE[p.category] || "")}">Start a similar project <span aria-hidden="true">→</span></a>
  `;
  $(".modal-cta", modalBody).addEventListener("click", e => {
    preselectService(e.currentTarget.dataset.service);
    closeProject(false);
  });

  showSlide(p, 0);
  modal.hidden = false;
  document.body.classList.add("modal-open");
  requestAnimationFrame(() => modal.classList.add("is-open"));
  $(".modal-close", modal).focus();
}

function closeProject(restoreFocus = true) {
  modal.classList.remove("is-open");
  document.body.classList.remove("modal-open");
  setTimeout(() => { modal.hidden = true; stage.innerHTML = ""; }, 250);
  if (restoreFocus && lastFocus) lastFocus.focus();
}

$$("[data-close]", modal).forEach(el => el.addEventListener("click", () => closeProject()));
document.addEventListener("keydown", e => {
  if (modal.hidden) return;
  if (e.key === "Escape") closeProject();
  if (e.key === "Tab") {
    const focusables = $$("button, a[href], input", modal).filter(el => el.offsetParent !== null);
    const first = focusables[0], last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

/* ---------- Reviews (only shown when real reviews exist) ---------- */
if (reviews.length) {
  const section = $("#reviews");
  const rg = $("#review-grid");
  rg.innerHTML = reviews.map(r => `
    <figure class="review reveal">
      <div class="stars" aria-label="${Number(r.rating) || 5} out of 5 stars">${"★".repeat(Number(r.rating) || 5)}</div>
      <blockquote>“${escapeHtml(r.text)}”</blockquote>
      <figcaption><strong>${escapeHtml(r.name)}</strong><span>${escapeHtml([r.project, r.location].filter(Boolean).join(" · "))}${r.source ? ` · via ${escapeHtml(r.source)}` : ""}</span></figcaption>
    </figure>
  `).join("");
  section.hidden = false;
}

/* ---------- Quote form ---------- */
const form = $("#quote-form");
const steps = $$(".form-step", form);
const stepLabels = $$(".step-labels li", form);
const progressBar = $(".progress-bar", form);
let currentStep = 0;
let files = [];

function preselectService(service) {
  if (!service) return;
  const radio = $$('input[name="service"]', form).find(r => r.value === service);
  if (radio) radio.checked = true;
  goToStep(0);
}

$$("[data-service]").forEach(link => {
  if (link.classList.contains("modal-cta")) return;
  link.addEventListener("click", () => preselectService(link.dataset.service));
});

function goToStep(n) {
  currentStep = n;
  steps.forEach((s, i) => s.classList.toggle("is-active", i === n));
  stepLabels.forEach((l, i) => {
    l.classList.toggle("is-current", i === n);
    l.classList.toggle("is-done", i < n);
  });
  progressBar.style.width = `${((n + 1) / steps.length) * 100}%`;
}
goToStep(0);

function validateStep(step) {
  const error = $(".form-error", step);
  error.textContent = "";
  $$(".is-invalid", step).forEach(el => el.classList.remove("is-invalid"));

  const missing = [];
  const radios = $$('input[type="radio"][required]', step);
  radios.forEach(r => {
    if (!$$(`input[name="${r.name}"]`, step).some(x => x.checked)) missing.push("the type of project");
  });
  $$("input[required]:not([type=radio]), select[required], textarea[required]", step).forEach(field => {
    if (!field.value.trim() || !field.checkValidity()) {
      field.closest(".field")?.classList.add("is-invalid");
      missing.push(field.closest(".field")?.querySelector("span")?.textContent.toLowerCase() || field.name);
    }
  });

  if (missing.length) {
    error.textContent = `Please add ${[...new Set(missing)].join(", ")}.`;
    return false;
  }
  return true;
}

$$("[data-next]", form).forEach(btn => btn.addEventListener("click", () => {
  if (validateStep(steps[currentStep])) {
    goToStep(currentStep + 1);
    $("legend", steps[currentStep]).scrollIntoView({ behavior: "smooth", block: "center" });
  }
}));
$$("[data-prev]", form).forEach(btn => btn.addEventListener("click", () => goToStep(currentStep - 1)));

/* File uploads with previews */
const dropzone = $("#dropzone");
const fileInput = $("#photos");
const previews = $("#previews");

function renderPreviews() {
  previews.innerHTML = "";
  files.forEach((file, i) => {
    const li = document.createElement("li");
    if (file.type.startsWith("image/")) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      img.alt = file.name;
      img.onload = () => URL.revokeObjectURL(img.src);
      li.appendChild(img);
    } else {
      li.innerHTML = `<span class="file-ext">${escapeHtml(file.name.split(".").pop().toUpperCase())}</span>`;
    }
    const rm = document.createElement("button");
    rm.type = "button";
    rm.className = "preview-remove";
    rm.setAttribute("aria-label", `Remove ${file.name}`);
    rm.textContent = "×";
    rm.addEventListener("click", () => { files.splice(i, 1); renderPreviews(); });
    li.appendChild(rm);
    previews.appendChild(li);
  });
  dropzone.classList.toggle("has-files", files.length > 0);
}

function addFiles(list) {
  files = [...files, ...[...list].filter(f => f.type.startsWith("image/") || f.type === "application/pdf")].slice(0, MAX_FILES);
  renderPreviews();
}

fileInput.addEventListener("change", () => { addFiles(fileInput.files); fileInput.value = ""; });
["dragenter", "dragover"].forEach(ev => dropzone.addEventListener(ev, e => { e.preventDefault(); dropzone.classList.add("is-drag"); }));
["dragleave", "drop"].forEach(ev => dropzone.addEventListener(ev, e => { e.preventDefault(); dropzone.classList.remove("is-drag"); }));
dropzone.addEventListener("drop", e => addFiles(e.dataTransfer.files));

function showSuccess(message) {
  steps.forEach(s => s.classList.remove("is-active"));
  $(".step-labels", form).hidden = true;
  progressBar.style.width = "100%";
  const success = $(".form-success", form);
  if (message) $(".form-success-msg", success).innerHTML = message;
  success.hidden = false;
  success.scrollIntoView({ behavior: "smooth", block: "center" });
}

form.addEventListener("submit", async e => {
  e.preventDefault();
  const step = steps[currentStep];
  if (!validateStep(step)) return;

  const data = new FormData(form);
  if (data.get("_gotcha")) return;
  data.delete("photos");
  data.delete("_gotcha");

  const submit = $('button[type="submit"]', form);
  submit.disabled = true;
  submit.textContent = "Sending…";

  try {
    const uploads = await Promise.all(files.map(shrinkImage));
    uploads.forEach(f => data.append("attachment", f, f.name));
    data.append("_subject", `Quote request: ${data.get("service")} (${data.get("location")})`);

    if (FORM_ENDPOINT.includes("formsubmit.co")) {
      // FormSubmit's standard endpoint accepts attachments; captcha off so it
      // never shows a challenge page. no-cors: the request is delivered but the
      // reply is unreadable, so only network failures can be detected here.
      data.append("_captcha", "false");
      data.append("_template", "table");
      await fetch(FORM_ENDPOINT, { method: "POST", body: data, mode: "no-cors" });
    } else {
      const res = await fetch(FORM_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(res.statusText);
    }
    showSuccess();
  } catch {
    $(".form-error", step).innerHTML = `Something went wrong sending your request. Please call <a href="tel:+12899436770">289-943-6770</a> or email <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.`;
    submit.disabled = false;
    submit.innerHTML = 'Send Request <span aria-hidden="true">→</span>';
  }
});

/* Downscale large photos to a JPEG so uploads stay small; PDFs and
   anything that can't be decoded are sent untouched. */
function shrinkImage(file) {
  if (!file.type.startsWith("image/") || file.type === "image/gif") return Promise.resolve(file);
  return new Promise(resolve => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, MAX_IMAGE_PX / Math.max(img.naturalWidth, img.naturalHeight));
      if (scale === 1 && file.size < 1.5e6) return resolve(file);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.naturalWidth * scale);
      canvas.height = Math.round(img.naturalHeight * scale);
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(blob => {
        if (!blob) return resolve(file);
        resolve(new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" }));
      }, "image/jpeg", 0.82);
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(file); };
    img.src = url;
  });
}

/* ---------- Misc ---------- */
$("#year").textContent = new Date().getFullYear();
observeReveals();
