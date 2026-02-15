/* ============================================================
 * words.js — Gestion des listes de mots personnalisées
 *
 * L'utilisateur peut créer, modifier et supprimer ses propres
 * listes de mots. Ces listes sont sauvegardées dans le
 * localStorage du navigateur (persistance entre les sessions).
 *
 * Les listes personnalisées apparaissent aussi dans la dictée
 * pour pouvoir s'entraîner dessus.
 *
 * Variables globales :
 *   - customWordLists    : tableau de toutes les listes sauvées
 *   - currentEditingList : référence à la liste en cours d'édition
 *   - tempWords          : mots temporaires pendant l'édition
 * ============================================================ */

var customWordLists = [];
var currentEditingList = null;
var tempWords = [];

/* ===========================================================
 * loadCustomLists() — Charge les listes depuis le localStorage
 *
 * Appelée au démarrage et à chaque retour sur l'onglet "Mes Mots"
 * =========================================================== */
function loadCustomLists() {
    var stored = localStorage.getItem("customWordLists");
    if (stored) {
        customWordLists = JSON.parse(stored);
    }
    renderCustomListButtons();
    renderSavedLists();
}

/* ===========================================================
 * saveCustomListsToStorage() — Sauvegarde dans le localStorage
 *                                et rafraîchit l'affichage
 * =========================================================== */
function saveCustomListsToStorage() {
    localStorage.setItem("customWordLists", JSON.stringify(customWordLists));
    renderCustomListButtons();
    renderSavedLists();
}

/* ===========================================================
 * renderCustomListButtons() — Affiche les listes perso
 *                               dans l'écran de dictée
 *
 * Chaque liste apparaît comme un bouton cliquable pour
 * lancer un exercice de dictée avec ces mots.
 * =========================================================== */
function renderCustomListButtons() {
    var container = document.getElementById("custom-lists-buttons");
    var divider = document.getElementById("custom-lists-divider");

    if (customWordLists.length === 0) {
        container.innerHTML = "";
        divider.classList.add("hidden");
        return;
    }

    /* Afficher le séparateur et les boutons */
    divider.classList.remove("hidden");
    container.innerHTML = customWordLists.map(function (list) {
        return '<button class="btn-choice" style="width:100%; font-size:1.2rem; margin: 5px 0;" ' +
            "onclick=\"startDict('CUSTOM:" + list.id + "')\">" +
            "📝 " + list.name + "</button>";
    }).join("");
}

/* ===========================================================
 * renderSavedLists() — Affiche les listes dans "Mes Mots"
 *                       avec boutons modifier / supprimer
 * =========================================================== */
function renderSavedLists() {
    var container = document.getElementById("saved-lists");

    /* Message si aucune liste n'existe */
    if (customWordLists.length === 0) {
        container.innerHTML = '<p style="color: #7F8C8D; font-style: italic;">' + t("noLists") + "</p>";
        return;
    }

    /* Générer une carte pour chaque liste */
    container.innerHTML = customWordLists.map(function (list) {
        return '<div style="background: #f8f8f8; border-radius: 15px; padding: 15px; margin: 10px 0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">' +
            '<div style="flex: 1;">' +
            '<strong style="font-size: 1.3rem;">' + list.name + "</strong>" +
            '<br><span style="color: #7F8C8D; font-size: 0.9rem;">' + list.words.length + " " + t("wordsCount") + "</span>" +
            "</div>" +
            '<div style="display: flex; gap: 8px;">' +
            '<button class="btn-choice" style="padding: 8px 15px; font-size: 1rem; background: var(--secondary); color: white; border: none;" onclick="editList(' + list.id + ')">✏️</button>' +
            '<button class="btn-choice" style="padding: 8px 15px; font-size: 1rem; background: #E74C3C; color: white; border: none;" onclick="deleteList(' + list.id + ')">🗑️</button>' +
            "</div></div>";
    }).join("");
}

/* ===========================================================
 * showCreateList() — Ouvre l'éditeur pour créer une nouvelle liste
 * =========================================================== */
function showCreateList() {
    currentEditingList = null;
    tempWords = [];
    document.getElementById("editor-title").innerText = t("newListTitle");
    document.getElementById("list-name").value = "";
    document.getElementById("new-word").value = "";
    document.getElementById("words-setup").classList.add("hidden");
    document.getElementById("words-editor").classList.remove("hidden");
    renderTempWords();
}

/* ===========================================================
 * editList(id) — Ouvre l'éditeur pour modifier une liste existante
 *
 * @param {number} id — L'identifiant de la liste à modifier
 * =========================================================== */
function editList(id) {
    var list = customWordLists.find(function (l) { return l.id === id; });
    if (list) {
        currentEditingList = list;
        tempWords = list.words.slice(); /* Copie des mots existants */
        document.getElementById("editor-title").innerText = t("editListTitle");
        document.getElementById("list-name").value = list.name;
        document.getElementById("new-word").value = "";
        document.getElementById("words-setup").classList.add("hidden");
        document.getElementById("words-editor").classList.remove("hidden");
        renderTempWords();
    }
}

/* ===========================================================
 * deleteList(id) — Supprime une liste après confirmation
 *
 * @param {number} id — L'identifiant de la liste à supprimer
 * =========================================================== */
function deleteList(id) {
    if (confirm(t("confirmDelete"))) {
        customWordLists = customWordLists.filter(function (l) {
            return l.id !== id;
        });
        saveCustomListsToStorage();
    }
}

/* ===========================================================
 * addWordToList() — Ajoute un mot à la liste temporaire
 *
 * Le mot est converti en MAJUSCULES automatiquement.
 * =========================================================== */
function addWordToList() {
    var input = document.getElementById("new-word");
    var word = input.value.trim().toUpperCase();

    if (word) {
        tempWords.push(word);
        input.value = "";
        renderTempWords();
        input.focus();
    }
}

/* ===========================================================
 * removeTempWord(index) — Retire un mot de la liste temporaire
 *
 * @param {number} index — Position du mot à retirer
 * =========================================================== */
function removeTempWord(index) {
    tempWords.splice(index, 1);
    renderTempWords();
}

/* ===========================================================
 * renderTempWords() — Affiche les mots temporaires dans l'éditeur
 * =========================================================== */
function renderTempWords() {
    var container = document.getElementById("words-list");

    /* Message si aucun mot */
    if (tempWords.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #7F8C8D; font-style: italic;">' + t("noWords") + "</p>";
        return;
    }

    /* Afficher chaque mot avec un bouton de suppression */
    container.innerHTML = tempWords.map(function (word, index) {
        return '<div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #f0f0f0; border-radius: 10px; margin: 5px 0;">' +
            '<span style="font-size: 1.4rem; font-weight: bold;">' + word + "</span>" +
            '<button onclick="removeTempWord(' + index + ')" style="background: #E74C3C; color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer;">✕</button>' +
            "</div>";
    }).join("");
}

/* ===========================================================
 * saveCustomList() — Sauvegarde la liste (nouvelle ou modifiée)
 *
 * Vérifie que le nom et les mots ne sont pas vides.
 * Si c'est une modification, met à jour la liste existante.
 * Si c'est une création, ajoute une nouvelle liste avec un ID unique.
 * =========================================================== */
function saveCustomList() {
    var name = document.getElementById("list-name").value.trim();

    /* Vérifications */
    if (!name) {
        alert(t("alertName"));
        return;
    }
    if (tempWords.length === 0) {
        alert(t("alertWords"));
        return;
    }

    if (currentEditingList) {
        /* Mode édition → mettre à jour */
        currentEditingList.name = name;
        currentEditingList.words = tempWords.slice();
    } else {
        /* Mode création → ajouter */
        var newId = Date.now(); /* ID unique basé sur le timestamp */
        customWordLists.push({
            id: newId,
            name: name,
            words: tempWords.slice()
        });
    }

    saveCustomListsToStorage();
    goTo("words");
}
