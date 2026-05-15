/* ============================================================
 * colors.js — Jeu "Les Couleurs"
 *
 * Une couleur est affichée sous forme de grand cercle coloré.
 * L'élève choisit son nom parmi 3 propositions.
 * 10 questions par partie, feedback vocal et visuel.
 * ============================================================ */

var colorsList = [
    { hex: "#E74C3C", name: { fr: "rouge",     en: "red",    de: "rot",     sv: "röd",    ar: "أحمر"    } },
    { hex: "#E67E22", name: { fr: "orange",    en: "orange", de: "orange",  sv: "orange", ar: "برتقالي" } },
    { hex: "#F1C40F", name: { fr: "jaune",     en: "yellow", de: "gelb",    sv: "gul",    ar: "أصفر"    } },
    { hex: "#27AE60", name: { fr: "vert",      en: "green",  de: "grün",    sv: "grön",   ar: "أخضر"    } },
    { hex: "#2980B9", name: { fr: "bleu",      en: "blue",   de: "blau",    sv: "blå",    ar: "أزرق"    } },
    { hex: "#8E44AD", name: { fr: "violet",    en: "purple", de: "lila",    sv: "lila",   ar: "بنفسجي"  } },
    { hex: "#E91E8C", name: { fr: "rose",      en: "pink",   de: "rosa",    sv: "rosa",   ar: "وردي"    } },
    { hex: "#795548", name: { fr: "marron",    en: "brown",  de: "braun",   sv: "brun",   ar: "بني"     } },
    { hex: "#2C3E50", name: { fr: "noir",      en: "black",  de: "schwarz", sv: "svart",  ar: "أسود"    } },
    { hex: "#ECF0F1", name: { fr: "blanc",     en: "white",  de: "weiß",    sv: "vit",    ar: "أبيض"    } },
    { hex: "#95A5A6", name: { fr: "gris",      en: "gray",   de: "grau",    sv: "grå",    ar: "رمادي"   } },
];

var cScore = 0, cIdx = 0, cColorAns = null, cCanClick = true;
var colorQuestions = [];

/* ===========================================================
 * startColors() — Lance une nouvelle partie
 * =========================================================== */
function startColors() {
    cScore = 0;
    cIdx = 0;

    /* Mélanger et prendre 10 couleurs (peut se répéter si < 10) */
    var pool = colorsList.slice().sort(function () { return Math.random() - 0.5; });
    colorQuestions = pool.slice(0, 10);

    document.getElementById("colors-setup").classList.add("hidden");
    document.getElementById("colors-game").classList.remove("hidden");

    newColorQ();
}

/* ===========================================================
 * newColorQ() — Affiche la question suivante
 * =========================================================== */
function newColorQ() {
    if (cIdx >= 10) {
        showColorsEnd();
        return;
    }

    cIdx++;
    cCanClick = true;

    document.getElementById("cq-idx").innerText = cIdx;
    document.getElementById("cq-score").innerText = cScore;
    document.getElementById("c-progress").style.width = (cIdx * 10) + "%";
    document.getElementById("color-fb").innerText = "";

    var q = colorQuestions[cIdx - 1];
    cColorAns = q;

    /* Afficher la couleur avec animation */
    var circle = document.getElementById("color-circle");
    circle.classList.remove("color-pop");
    void circle.offsetWidth; /* déclenche un reflow pour relancer l'animation */
    circle.style.backgroundColor = q.hex;
    circle.classList.add("color-pop");

    /* Générer 2 mauvaises réponses différentes de la bonne */
    var wrong = colorsList.filter(function (c) { return c !== q; });
    wrong.sort(function () { return Math.random() - 0.5; });
    var options = [q, wrong[0], wrong[1]].sort(function () { return Math.random() - 0.5; });

    var grid = document.getElementById("color-opts");
    grid.innerHTML = "";
    options.forEach(function (color) {
        var btn = document.createElement("button");
        btn.className = "btn-choice color-btn";
        var name = color.name[currentLang] || color.name.fr;
        btn.innerText = name.charAt(0).toUpperCase() + name.slice(1);
        btn.onclick = function (e) { checkColor(color, e.currentTarget); };
        grid.appendChild(btn);
    });
}

/* ===========================================================
 * checkColor(color, btn) — Vérifie la réponse choisie
 * =========================================================== */
function checkColor(color, btn) {
    if (!cCanClick) return;
    cCanClick = false;

    var lang = currentLang;
    var correctName = cColorAns.name[lang] || cColorAns.name.fr;
    correctName = correctName.charAt(0).toUpperCase() + correctName.slice(1);

    if (color === cColorAns) {
        cScore++;
        btn.classList.add("correct");
        var b = randomBravo();
        document.getElementById("color-fb").innerText = b.text + "  " + t("itWas") + " " + correctName + " !";
        speak(b.speech + ". " + t("itWas") + " " + correctName);
    } else {
        btn.classList.add("wrong");
        var d = randomDommage();
        document.getElementById("color-fb").innerText = d + "  " + t("answerWas") + " " + correctName + " !";
        speak(d + ". " + t("answerWas") + " " + correctName);

        /* Surligner la bonne réponse */
        Array.from(document.querySelectorAll("#color-opts .btn-choice")).forEach(function (b) {
            var btnName = b.innerText;
            if (btnName === correctName) b.classList.add("correct");
        });
    }

    setTimeout(newColorQ, 4000);
}

/* ===========================================================
 * showColorsEnd() — Affiche l'écran de fin de partie
 * =========================================================== */
function showColorsEnd() {
    document.getElementById("colors-game").classList.add("hidden");
    document.getElementById("colors-end").classList.remove("hidden");
    document.getElementById("final-colors-score").innerText = cScore;

    var speech = t("endSpeech").replace("{score}", cScore);
    speak(speech);
}
