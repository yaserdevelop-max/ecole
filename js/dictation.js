/* ============================================================
 * dictation.js — Logique du jeu "Dictée Détective"
 *
 * L'application prononce des mots que l'élève doit écrire.
 * Les mots proviennent soit de la liste d'exemple (animaux,
 * adaptée à la langue courante), soit d'une liste personnalisée
 * créée par l'utilisateur.
 *
 * La vitesse de parole est plus lente (0.7) pour permettre
 * à l'élève de bien entendre chaque mot.
 *
 * Variables globales :
 *   - dW : tableau des mots de l'exercice en cours
 *   - dI : index du mot en cours (commence à 0)
 * ============================================================ */

var dW = [];
var dI = 0;

/* ===========================================================
 * startDict(key) — Démarre un exercice de dictée
 *
 * @param {string} key — "EXEMPLE" pour la liste d'exemple,
 *                        ou "CUSTOM:id" pour une liste perso
 * =========================================================== */
function startDict(key) {
    if (key === "EXEMPLE") {
        /* Utiliser les mots d'exemple de la langue courante */
        dW = t("exampleWords");
    } else if (key.indexOf("CUSTOM:") === 0) {
        /* Trouver la liste personnalisée par son ID */
        var listId = parseInt(key.replace("CUSTOM:", ""));
        var customList = customWordLists.find(function (l) {
            return l.id === listId;
        });
        if (customList) {
            dW = customList.words;
        }
    }

    /* Réinitialiser l'index au premier mot */
    dI = 0;

    /* Afficher l'écran de jeu */
    document.getElementById("dict-setup").classList.add("hidden");
    document.getElementById("dict-game").classList.remove("hidden");
    document.getElementById("dict-res").classList.add("hidden");
    document.getElementById("btn-next-d").classList.remove("hidden");
    document.getElementById("btn-fini-d").classList.remove("hidden");

    /* Mettre à jour le compteur et prononcer le premier mot */
    updateDictUI();
    sayWord();
}

/* ===========================================================
 * updateDictUI() — Met à jour le compteur "Mot X / Y"
 * =========================================================== */
function updateDictUI() {
    document.getElementById("d-idx-display").innerText = dI + 1;
    document.getElementById("d-total").innerText = dW.length;
}

/* ===========================================================
 * sayWord() — Prononce le mot en cours à vitesse lente (0.7)
 * =========================================================== */
function sayWord() {
    speak(dW[dI], 0.6);
}

/* ===========================================================
 * nextWord() — Passe au mot suivant ou termine l'exercice
 * =========================================================== */
function nextWord() {
    if (dI < dW.length - 1) {
        dI++;
        updateDictUI();
        sayWord();
    } else {
        /* Dernier mot atteint → terminer */
        finishDict();
    }
}

/* ===========================================================
 * finishDict() — Affiche la correction avec tous les mots
 * =========================================================== */
function finishDict() {
    /* Masquer les boutons de jeu */
    document.getElementById("btn-next-d").classList.add("hidden");
    document.getElementById("btn-fini-d").classList.add("hidden");

    /* Afficher la zone de correction avec la liste des mots */
    document.getElementById("dict-res").classList.remove("hidden");
    document.getElementById("dict-list").innerText = dW.join("  -  ");

    /* Annoncer la fin de l'exercice */
    speak(t("dictEndSpeech"), 0.6);
}
