/* ============================================================
 * app.js — Fichier principal de l'application
 *
 * Contient :
 *   - Gestion de la langue (changement, application des traductions)
 *   - Synthèse vocale (TTS)
 *   - Fonctions de feedback (bravo / dommage aléatoires)
 *   - Navigation entre les onglets
 *   - Initialisation au chargement de la page
 * ============================================================ */

/* ---- Langue courante (français par défaut) ---- */
var currentLang = "fr";

/* ---- Voix TTS chargée pour la langue courante ---- */
var currentVoice = null;

/* ===========================================================
 * t(key) — Récupère une traduction pour la langue courante
 *
 * @param {string} key — La clé de traduction (ex: "mathTitle")
 * @returns {string} — Le texte traduit
 * =========================================================== */
function t(key) {
    return translations[currentLang][key] || translations["fr"][key] || key;
}

/* ---- Drapeaux et noms pour le menu de langue ---- */
var langFlags = { fr: "🇫🇷", de: "🇩🇪", sv: "🇸🇪", en: "🇬🇧", ar: "🇸🇦" };
var langNames = { fr: "Français", de: "Deutsch", sv: "Svenska", en: "English", ar: "العربية" };

/* ===========================================================
 * toggleLangMenu() — Ouvre ou ferme le menu déroulant de langue
 * =========================================================== */
function toggleLangMenu() {
    var dropdown = document.getElementById("lang-dropdown");
    var menu = document.getElementById("lang-menu");
    dropdown.classList.toggle("open");
    menu.classList.toggle("hidden");
}

/* ===========================================================
 * closeLangMenu() — Ferme le menu si on clique en dehors
 * =========================================================== */
document.addEventListener("click", function (e) {
    var dropdown = document.getElementById("lang-dropdown");
    if (dropdown && !dropdown.contains(e.target)) {
        dropdown.classList.remove("open");
        document.getElementById("lang-menu").classList.add("hidden");
    }
});

/* ===========================================================
 * changeLanguage(lang) — Change la langue de l'application
 *
 * 1. Met à jour la variable currentLang
 * 2. Recharge la voix TTS pour la nouvelle langue
 * 3. Applique les traductions sur tous les éléments HTML
 * 4. Met à jour le bouton du menu avec le drapeau et nom
 * 5. Gère la direction RTL pour l'arabe
 * 6. Ferme le menu déroulant
 *
 * @param {string} lang — Code langue ("fr", "en", "de", "sv", "ar")
 * =========================================================== */
function changeLanguage(lang) {
    currentLang = lang;

    /* Recharger la voix pour la nouvelle langue */
    loadVoice();

    /* Appliquer les traductions sur le HTML */
    applyTranslations();

    /* Mettre à jour le bouton avec le drapeau et nom de la langue */
    document.getElementById("lang-current-flag").innerText = langFlags[lang];
    document.getElementById("lang-current-name").innerText = langNames[lang];

    /* Fermer le menu déroulant */
    document.getElementById("lang-dropdown").classList.remove("open");
    document.getElementById("lang-menu").classList.add("hidden");

    /* Gestion RTL pour l'arabe */
    if (lang === "ar") {
        document.body.setAttribute("dir", "rtl");
    } else {
        document.body.removeAttribute("dir");
    }

    /* Re-rendre les listes personnalisées (pour mettre à jour les textes) */
    if (typeof renderCustomListButtons === "function") renderCustomListButtons();
    if (typeof renderSavedLists === "function") renderSavedLists();
}

/* ===========================================================
 * applyTranslations() — Met à jour le texte de chaque élément
 *                        qui possède un attribut data-i18n
 *
 * - data-i18n="key"             → change le innerText
 * - data-i18n-placeholder="key" → change le placeholder
 * =========================================================== */
function applyTranslations() {
    /* Textes normaux */
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
        var key = el.getAttribute("data-i18n");
        el.innerText = t(key);
    });

    /* Placeholders des inputs */
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
        var key = el.getAttribute("data-i18n-placeholder");
        el.placeholder = t(key);
    });
}

/* ===========================================================
 * SYNTHÈSE VOCALE (Text-to-Speech)
 * =========================================================== */

/* loadVoice() — Charge la meilleure voix disponible
 *               pour la langue courante */
function loadVoice() {
    var voices = window.speechSynthesis.getVoices();
    var code = langCodes[currentLang] || "fr-FR";
    var prefix = code.split("-")[0]; /* ex: "fr" depuis "fr-FR" */

    /* Chercher d'abord une voix exacte, sinon une voix partielle */
    currentVoice =
        voices.find(function (v) { return v.lang === code; }) ||
        voices.find(function (v) { return v.lang.startsWith(prefix); }) ||
        null;
}

/* Charger les voix dès qu'elles sont disponibles */
window.speechSynthesis.onvoiceschanged = loadVoice;
loadVoice();

/* speak(text, rate) — Prononce un texte avec la voix courante
 *
 * @param {string} text — Le texte à prononcer
 * @param {number} rate — Vitesse de parole (défaut: 1)
 *
 * Technique : on ajoute une micro-pause "..." avant le texte
 * pour que le navigateur ne coupe pas la première lettre.
 * On attend aussi que cancel() soit terminé avant de parler. */
function speak(text, rate) {
    window.speechSynthesis.cancel();
    setTimeout(function () {
        /* La virgule crée une petite pause silencieuse
           qui protège la première lettre du vrai texte */
        var msg = new SpeechSynthesisUtterance(", " + text);
        msg.lang = langCodes[currentLang] || "fr-FR";
        if (currentVoice) msg.voice = currentVoice;
        msg.rate = rate || 1;
        window.speechSynthesis.speak(msg);
        /* Fix Chrome : relancer si le navigateur met en pause */
        window.speechSynthesis.resume();
    }, 300);
}

/* ===========================================================
 * FEEDBACK — Messages aléatoires pour bonne/mauvaise réponse
 * =========================================================== */

/* randomBravo() — Retourne un objet { text, speech } aléatoire
 *                 pour une bonne réponse */
function randomBravo() {
    var list = t("bravoList");
    var emojis = t("bravoEmojis");
    var i = Math.floor(Math.random() * list.length);
    return {
        text: emojis[i] + " " + list[i],  /* Affiché à l'écran */
        speech: list[i]                     /* Prononcé par TTS */
    };
}

/* randomDommage() — Retourne un texte aléatoire
 *                   pour une mauvaise réponse */
function randomDommage() {
    var list = t("dommageList");
    return list[Math.floor(Math.random() * list.length)];
}

/* ===========================================================
 * NAVIGATION — Gestion des onglets de l'application
 *
 * goTo(view) — Affiche la vue demandée et masque les autres
 *
 * @param {string} view — "math", "missing", "dictation", "words"
 * =========================================================== */
function goTo(view) {
    /* Masquer toutes les vues */
    document.querySelectorAll(".container").forEach(function (c) {
        c.classList.add("hidden");
    });

    /* Retirer la classe active de tous les boutons de navigation */
    document.querySelectorAll("nav button").forEach(function (b) {
        b.classList.remove("active");
    });

    /* Afficher la vue demandée et réinitialiser son état */
    if (view === "math") {
        document.getElementById("view-math").classList.remove("hidden");
        document.getElementById("math-setup").classList.remove("hidden");
        document.getElementById("math-game").classList.add("hidden");
        document.getElementById("math-end").classList.add("hidden");
        document.getElementById("nav-math").classList.add("active");

    } else if (view === "colors") {
        document.getElementById("view-colors").classList.remove("hidden");
        document.getElementById("colors-setup").classList.remove("hidden");
        document.getElementById("colors-game").classList.add("hidden");
        document.getElementById("colors-end").classList.add("hidden");
        document.getElementById("nav-colors").classList.add("active");

    } else if (view === "missing") {
        document.getElementById("view-missing").classList.remove("hidden");
        document.getElementById("missing-setup").classList.remove("hidden");
        document.getElementById("missing-game").classList.add("hidden");
        document.getElementById("missing-end").classList.add("hidden");
        document.getElementById("nav-missing").classList.add("active");

    } else if (view === "dictation") {
        document.getElementById("view-dictation").classList.remove("hidden");
        document.getElementById("dict-setup").classList.remove("hidden");
        document.getElementById("dict-game").classList.add("hidden");
        document.getElementById("nav-dictation").classList.add("active");

    } else if (view === "words") {
        document.getElementById("view-words").classList.remove("hidden");
        document.getElementById("words-setup").classList.remove("hidden");
        document.getElementById("words-editor").classList.add("hidden");
        document.getElementById("nav-words").classList.add("active");
        loadCustomLists();
    }
}

/* ===========================================================
 * INITIALISATION — Lancée au chargement de la page
 * =========================================================== */
window.onload = function () {
    /* Charger les listes personnalisées depuis localStorage */
    loadCustomLists();

    /* Appliquer les traductions initiales (français) */
    applyTranslations();
};

/* Touche Entrée pour ajouter un mot dans l'éditeur de listes */
document.addEventListener("keypress", function (e) {
    if (e.target.id === "new-word" && e.key === "Enter") {
        addWordToList();
    }
});
