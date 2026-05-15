/* ============================================================
 * math.js — Logique du jeu "Calculs"
 *
 * Le jeu pose 10 questions de calcul (addition, soustraction
 * ou multiplication) selon la table choisie par l'utilisateur.
 *
 * Pour la soustraction, on génère (table + i) - table = i
 * afin d'éviter les résultats négatifs.
 *
 * Variables globales :
 *   - mScore        : score actuel du joueur
 *   - mIdx          : index de la question en cours (1 à 10)
 *   - mAns          : bonne réponse de la question en cours
 *   - canClick      : empêche les doubles clics sur les réponses
 *   - mathQuestions  : tableau des 10 questions générées
 *   - selectedMathOp : opération choisie (+, -, *)
 * ============================================================ */

var mScore = 0, mIdx = 0, mAns = 0, canClick = true;
var mathQuestions = [];
var selectedMathOp = "+";

/* ===========================================================
 * selectMathOp(op) — Sélectionne l'opération pour les calculs
 *
 * Met à jour la variable et l'affichage du bouton actif.
 * Le sélecteur est limité à #math-setup pour ne pas affecter
 * les boutons du Nombre Manquant.
 *
 * @param {string} op — L'opération choisie ("+", "-", "*")
 * =========================================================== */
function selectMathOp(op) {
    selectedMathOp = op;

    /* Retirer la classe active de tous les boutons d'opération */
    document.querySelectorAll("#math-setup .op-btn").forEach(function (b) {
        b.classList.remove("active-op");
    });

    /* Activer le bouton correspondant */
    var btnId = op === "+" ? "math-op-plus" : op === "-" ? "math-op-minus" : "math-op-mult";
    document.getElementById(btnId).classList.add("active-op");
}

/* ===========================================================
 * startMath() — Lance une nouvelle partie de calcul
 *
 * Génère 10 questions basées sur la table et l'opération,
 * les mélange, puis affiche la première question.
 * =========================================================== */
function startMath() {
    mScore = 0;
    mIdx = 0;

    var table = parseInt(document.getElementById("math-table").value) || 0;
    var op = selectedMathOp;

    /* Générer les 10 questions */
    mathQuestions = [];
    for (var i = 1; i <= 10; i++) {
        var a, b, ans;

        if (op === "+") {
            /* Addition : table + i */
            a = table; b = i; ans = table + i;
        } else if (op === "-") {
            /* Soustraction : (table + i) - table = i → toujours positif */
            a = table + i; b = table; ans = i;
        } else {
            /* Multiplication : table × i */
            a = table; b = i; ans = table * i;
        }

        mathQuestions.push({ a: a, b: b, op: op, ans: ans });
    }

    /* Mélanger les questions aléatoirement */
    mathQuestions.sort(function () { return Math.random() - 0.5; });

    /* Afficher l'écran de jeu */
    document.getElementById("math-setup").classList.add("hidden");
    document.getElementById("math-game").classList.remove("hidden");

    newMathQ();
}

/* ===========================================================
 * newMathQ() — Affiche la question suivante
 *
 * Si les 10 questions sont passées, affiche l'écran de fin.
 * Sinon, affiche la question avec 3 choix (1 correct + 2 faux).
 * =========================================================== */
function newMathQ() {
    /* Vérifier si le jeu est terminé */
    if (mIdx >= 10) {
        showMathEnd();
        return;
    }

    mIdx++;
    canClick = true;

    /* Mettre à jour l'affichage de la progression */
    document.getElementById("q-idx").innerText = mIdx;
    document.getElementById("q-score").innerText = mScore;
    document.getElementById("m-progress").style.width = (mIdx * 10) + "%";
    document.getElementById("math-fb").innerText = "";

    /* Récupérer la question en cours */
    var q = mathQuestions[mIdx - 1];
    mAns = q.ans;

    /* Afficher l'opération : "2 + 3" ou "5 - 2" etc. */
    document.getElementById("math-q").innerText = q.a + " " + q.op + " " + q.b;

    /* Générer 3 propositions : 1 bonne + 2 fausses proches */
    var opts = new Set([mAns]);
    while (opts.size < 3) {
        var offset = Math.floor(Math.random() * 5) - 2;
        if (offset === 0) offset = Math.random() > 0.5 ? 1 : -1;
        var f = mAns + offset;
        if (f >= 0 && f !== mAns) opts.add(f);
    }

    /* Afficher les boutons de réponse dans un ordre aléatoire */
    var grid = document.getElementById("math-opts");
    grid.innerHTML = "";
    Array.from(opts).sort(function () { return Math.random() - 0.5; }).forEach(function (n) {
        var btn = document.createElement("button");
        btn.className = "btn-choice";
        btn.innerText = n;
        btn.onclick = function (e) { checkMath(n, e.target); };
        grid.appendChild(btn);
    });
}

/* ===========================================================
 * checkMath(n, btn) — Vérifie la réponse du joueur
 *
 * @param {number} n   — Le nombre choisi par le joueur
 * @param {Element} btn — Le bouton cliqué (pour le style)
 * =========================================================== */
function checkMath(n, btn) {
    if (!canClick) return;  /* Empêcher les doubles clics */
    canClick = false;

    if (n === mAns) {
        /* Bonne réponse → vert + message aléatoire */
        mScore++;
        btn.classList.add("correct");
        var b = randomBravo();
        document.getElementById("math-fb").innerText = b.text;
        speak(b.speech);
    } else {
        /* Mauvaise réponse → rouge + montrer la bonne réponse en vert */
        btn.classList.add("wrong");
        var d = randomDommage();
        document.getElementById("math-fb").innerText = d;
        speak(d + " " + t("answerWas") + " " + mAns);

        /* Surligner la bonne réponse */
        Array.from(document.querySelectorAll("#math-opts .btn-choice")).forEach(function (b) {
            if (parseInt(b.innerText) === mAns) b.classList.add("correct");
        });
    }

    /* Passer à la question suivante après 2 secondes */
    setTimeout(newMathQ, 4000);
}

/* ===========================================================
 * showMathEnd() — Affiche l'écran de fin de partie
 * =========================================================== */
function showMathEnd() {
    document.getElementById("math-game").classList.add("hidden");
    document.getElementById("math-end").classList.remove("hidden");
    document.getElementById("final-math-score").innerText = mScore;

    /* Annoncer le score à voix haute */
    var speech = t("endSpeech").replace("{score}", mScore);
    speak(speech);
}
