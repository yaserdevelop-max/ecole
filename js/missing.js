/* ============================================================
 * missing.js — Logique du jeu "Nombre Manquant"
 *
 * Le jeu affiche une opération avec un "?" à la place du
 * deuxième nombre. L'élève doit trouver le nombre manquant.
 *
 * Exemple : 8 + ? = 10  → réponse : 2
 *           12 - ? = 5   → réponse : 7
 *           3 * ? = 15   → réponse : 5
 *
 * Pour la soustraction, on génère (table + i) - table = i
 * afin que tous les nombres soient toujours positifs.
 *
 * Variables globales :
 *   - msScore          : score actuel
 *   - msIdx            : index de la question (1 à 10)
 *   - msAns            : bonne réponse (le nombre manquant)
 *   - msCanClick       : empêche les doubles clics
 *   - missingQuestions  : tableau des 10 questions
 *   - selectedOp       : opération choisie (+, -, *)
 * ============================================================ */

var msScore = 0, msIdx = 0, msAns = 0, msCanClick = true;
var missingQuestions = [];
var selectedOp = "+";

/* ===========================================================
 * selectOp(op) — Sélectionne l'opération pour le Nombre Manquant
 *
 * Le sélecteur est limité à #missing-setup pour ne pas
 * affecter les boutons des Calculs.
 *
 * @param {string} op — L'opération choisie ("+", "-", "*")
 * =========================================================== */
function selectOp(op) {
    selectedOp = op;

    /* Retirer la classe active de tous les boutons d'opération */
    document.querySelectorAll("#missing-setup .op-btn").forEach(function (b) {
        b.classList.remove("active-op");
    });

    /* Activer le bouton correspondant */
    var btnId = op === "+" ? "op-plus" : op === "-" ? "op-minus" : "op-mult";
    document.getElementById(btnId).classList.add("active-op");
}

/* ===========================================================
 * startMissing() — Lance une nouvelle partie
 *
 * Génère 10 questions où le nombre manquant est toujours
 * le deuxième opérande (b), affiché comme "?" :
 *   a OP ? = résultat
 * =========================================================== */
function startMissing() {
    msScore = 0;
    msIdx = 0;

    var table = parseInt(document.getElementById("missing-table").value) || 0;
    var op = selectedOp;

    /* Générer les 10 questions */
    missingQuestions = [];
    for (var i = 1; i <= 10; i++) {
        var a, b, result;

        if (op === "+") {
            /* Addition : table + i = résultat → manquant = i */
            a = table; b = i; result = table + i;
        } else if (op === "-") {
            /* Soustraction : (table+i) - table = i → toujours positif */
            a = table + i; b = table; result = i;
        } else {
            /* Multiplication : table × i = résultat → manquant = i */
            a = table; b = i; result = table * i;
        }

        /* Le nombre manquant est toujours b (le deuxième nombre) */
        missingQuestions.push({ a: a, op: op, result: result, answer: b });
    }

    /* Mélanger les questions */
    missingQuestions.sort(function () { return Math.random() - 0.5; });

    /* Afficher l'écran de jeu */
    document.getElementById("missing-setup").classList.add("hidden");
    document.getElementById("missing-game").classList.remove("hidden");

    newMissingQ();
}

/* ===========================================================
 * newMissingQ() — Affiche la question suivante
 *
 * Format affiché : "8 + ? = 10"
 * Le joueur doit trouver le "?" parmi 3 propositions.
 * =========================================================== */
function newMissingQ() {
    /* Vérifier si le jeu est terminé */
    if (msIdx >= 10) {
        showMissingEnd();
        return;
    }

    msIdx++;
    msCanClick = true;

    /* Mettre à jour la progression */
    document.getElementById("mq-idx").innerText = msIdx;
    document.getElementById("mq-score").innerText = msScore;
    document.getElementById("ms-progress").style.width = (msIdx * 10) + "%";
    document.getElementById("missing-fb").innerText = "";

    /* Récupérer la question */
    var q = missingQuestions[msIdx - 1];
    msAns = q.answer;

    /* Afficher : a OP ? = résultat */
    document.getElementById("missing-q").innerHTML =
        q.a + " " + q.op + " ? = " + q.result;

    /* Générer 3 propositions : 1 bonne + 2 fausses proches */
    var opts = new Set([msAns]);
    while (opts.size < 3) {
        var offset = Math.floor(Math.random() * 5) - 2;
        if (offset === 0) offset = Math.random() > 0.5 ? 1 : -1;
        var f = msAns + offset;
        if (f >= 0 && f !== msAns) opts.add(f);
    }

    /* Afficher les boutons */
    var grid = document.getElementById("missing-opts");
    grid.innerHTML = "";
    Array.from(opts).sort(function () { return Math.random() - 0.5; }).forEach(function (n) {
        var btn = document.createElement("button");
        btn.className = "btn-choice";
        btn.innerText = n;
        btn.onclick = function (e) { checkMissing(n, e.target); };
        grid.appendChild(btn);
    });
}

/* ===========================================================
 * checkMissing(n, btn) — Vérifie la réponse du joueur
 *
 * @param {number} n   — Le nombre choisi
 * @param {Element} btn — Le bouton cliqué
 * =========================================================== */
function checkMissing(n, btn) {
    if (!msCanClick) return;
    msCanClick = false;

    if (n === msAns) {
        /* Bonne réponse */
        msScore++;
        btn.classList.add("correct");
        var b = randomBravo();
        document.getElementById("missing-fb").innerText = b.text;
        speak(b.speech);
    } else {
        /* Mauvaise réponse */
        btn.classList.add("wrong");
        var d = randomDommage();
        document.getElementById("missing-fb").innerText = d;
        speak(d + " " + t("answerWas") + " " + msAns);

        /* Montrer la bonne réponse */
        Array.from(document.querySelectorAll("#missing-opts .btn-choice")).forEach(function (b) {
            if (parseInt(b.innerText) === msAns) b.classList.add("correct");
        });
    }

    /* Question suivante après 2 secondes */
    setTimeout(newMissingQ, 2000);
}

/* ===========================================================
 * showMissingEnd() — Affiche l'écran de fin
 * =========================================================== */
function showMissingEnd() {
    document.getElementById("missing-game").classList.add("hidden");
    document.getElementById("missing-end").classList.remove("hidden");
    document.getElementById("final-missing-score").innerText = msScore;

    var speech = t("endSpeech").replace("{score}", msScore);
    speak(speech);
}
