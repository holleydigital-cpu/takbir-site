// Takbir — le petit script commun à toutes les pages du site.
// 1. Choisit la langue : ?lang=fr ou ?lang=en, sinon celle du navigateur.
// 2. Remplit l'adresse e-mail de support partout (à changer à un seul endroit).

// ⚠️ Adresse de support provisoire : la remplacer par l'adresse dédiée à Takbir.
const SUPPORT_EMAIL = "ainfares.yacine@gmail.com";

// Lien App Store (il marche une fois l'app publiée).
const APP_STORE_URL = "https://apps.apple.com/app/id6829789838";

(function chooseLanguage() {
  const asked = new URLSearchParams(location.search).get("lang");
  const lang = asked === "fr" || asked === "en"
    ? asked
    : (navigator.language || "en").toLowerCase().startsWith("fr") ? "fr" : "en";
  document.documentElement.lang = lang;
  document.documentElement.dataset.lang = lang;
})();

document.addEventListener("DOMContentLoaded", () => {
  const lang = document.documentElement.dataset.lang;
  const other = lang === "fr" ? "en" : "fr";

  // Titre de l'onglet dans la bonne langue
  const title = document.querySelector(`meta[name="title-${lang}"]`);
  if (title) document.title = title.content;

  // E-mail de support
  document.querySelectorAll("[data-email]").forEach((link) => {
    link.href = `mailto:${SUPPORT_EMAIL}`;
    link.textContent = SUPPORT_EMAIL;
  });

  // Bouton App Store
  document.querySelectorAll("[data-appstore]").forEach((link) => {
    link.href = APP_STORE_URL;
  });

  // Les liens internes gardent la langue choisie
  document.querySelectorAll("a[href$='.html']").forEach((link) => {
    link.href = `${link.getAttribute("href")}?lang=${lang}`;
  });

  // Bouton pour changer de langue
  const toggle = document.querySelector("[data-lang-toggle]");
  if (toggle) {
    toggle.textContent = other === "fr" ? "Français" : "English";
    toggle.href = `?lang=${other}`;
  }
});
