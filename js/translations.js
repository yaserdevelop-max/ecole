/* ============================================================
 * translations.js — Toutes les traductions de l'application
 *
 * Langues supportées :
 *   - fr : Français (par défaut)
 *   - en : Anglais
 *   - de : Allemand
 *   - sv : Suédois
 *   - ar : Arabe
 *
 * Chaque langue contient :
 *   - Les textes de l'interface (navigation, titres, boutons)
 *   - Les messages de feedback (bravo, dommage)
 *   - Les mots d'exemple pour la dictée
 * ============================================================ */

var translations = {

    /* ---- FRANÇAIS ---- */
    fr: {
        // Navigation
        navMath: "🔢 Calculs",
        navColors: "🎨 Couleurs",
        navMissing: "🧩 Nombre Manquant",
        navDictation: "✍️ Dictée",
        navWords: "📝 Mes Mots",

        // Calculs — écran de configuration
        mathTitle: "Tables de Calculs",
        chooseTable: "Choisis ta table :",
        chooseOp: "Choisis l'opération :",
        start: "COMMENCER",

        // Calculs — écran de jeu
        question: "Question",
        score: "Score",

        // Nombre Manquant — écran de configuration
        missingTitle: "🧩 Nombre Manquant",

        // Écran de fin (commun Calculs et Nombre Manquant)
        finished: "Fini ! 🏆",
        replay: "REJOUER",
        endSpeech: "C'est fini ! Tu as eu {score} sur dix.",

        // Dictée — écran de configuration
        dictTitle: "Dictée Détective",
        chooseExercise: "Choisis ton exercice :",
        exampleList: "Exemple : Animaux 🐱",

        // Dictée — écran de jeu
        word: "Mot",
        listenWrite: "Écoute bien et écris le mot.",
        nextWord: "MOT SUIVANT ➡️",
        imDone: "J'AI FINI !",
        correction: "Correction :",
        backToMenu: "RETOUR AU MENU",
        dictEndSpeech: "Travail terminé ! Voici la correction.",

        // Mes Mots — gestion des listes
        wordsTitle: "📝 Mes Listes de Mots",
        wordsDesc: "Crée et gère tes propres listes de mots !",
        newList: "➕ Nouvelle Liste",
        newListTitle: "Nouvelle Liste",
        editListTitle: "Modifier la liste",
        listNamePlaceholder: "Nom de la liste",
        addWordPlaceholder: "Ajouter un mot",
        add: "Ajouter",
        save: "💾 Sauvegarder",
        cancel: "Annuler",
        noWords: "Aucun mot ajouté. Tape un mot et clique sur \"Ajouter\" !",
        noLists: "Aucune liste enregistrée. Crée ta première liste !",
        wordsCount: "mots",
        confirmDelete: "Voulez-vous vraiment supprimer cette liste ?",
        alertName: "Donne un nom à ta liste !",
        alertWords: "Ajoute au moins un mot !",

        // Messages de feedback — bonne réponse (choisis au hasard)
        bravoList: [
            "Bravo !", "Excellent !", "Félicitations !", "Super !", "Génial !",
            "Magnifique !", "Parfait !", "Formidable !", "Très bien !", "Champion !"
        ],
        bravoEmojis: ["🌟", "🎉", "👏", "💪", "🏅", "⭐", "🥇", "✨", "🎊", "👍"],

        // Messages de feedback — mauvaise réponse (choisis au hasard)
        dommageList: [
            "Dommage !", "Presque !", "Pas tout à fait !",
            "Essaie encore !", "Courage !", "Ce n'est rien !", "La prochaine fois !"
        ],
        answerWas: "La réponse était",
        itWas: "C'était",

        // Couleurs — écran de jeu
        colorsTitle: "🎨 Les Couleurs",
        colorsDesc: "Connais-tu le nom des couleurs ?",

        // Mots d'exemple pour la dictée
        exampleWords: ["UN CHAT", "UN CHIEN", "UN LAPIN", "UNE VACHE"]
    },

    /* ---- ANGLAIS ---- */
    en: {
        navMath: "🔢 Calculations",
        navColors: "🎨 Colors",
        navMissing: "🧩 Missing Number",
        navDictation: "✍️ Dictation",
        navWords: "📝 My Words",

        mathTitle: "Calculation Tables",
        chooseTable: "Choose your table:",
        chooseOp: "Choose the operation:",
        start: "START",
        question: "Question",
        score: "Score",

        missingTitle: "🧩 Missing Number",

        finished: "Done! 🏆",
        replay: "PLAY AGAIN",
        endSpeech: "It's over! You got {score} out of ten.",

        dictTitle: "Detective Dictation",
        chooseExercise: "Choose your exercise:",
        exampleList: "Example: Animals 🐱",
        word: "Word",
        listenWrite: "Listen carefully and write the word.",
        nextWord: "NEXT WORD ➡️",
        imDone: "I'M DONE!",
        correction: "Correction:",
        backToMenu: "BACK TO MENU",
        dictEndSpeech: "Work done! Here is the correction.",

        wordsTitle: "📝 My Word Lists",
        wordsDesc: "Create and manage your own word lists!",
        newList: "➕ New List",
        newListTitle: "New List",
        editListTitle: "Edit list",
        listNamePlaceholder: "List name",
        addWordPlaceholder: "Add a word",
        add: "Add",
        save: "💾 Save",
        cancel: "Cancel",
        noWords: "No words added. Type a word and click \"Add\"!",
        noLists: "No saved lists. Create your first list!",
        wordsCount: "words",
        confirmDelete: "Do you really want to delete this list?",
        alertName: "Give your list a name!",
        alertWords: "Add at least one word!",

        bravoList: [
            "Bravo!", "Excellent!", "Congratulations!", "Super!", "Great!",
            "Magnificent!", "Perfect!", "Wonderful!", "Very good!", "Champion!"
        ],
        bravoEmojis: ["🌟", "🎉", "👏", "💪", "🏅", "⭐", "🥇", "✨", "🎊", "👍"],
        dommageList: [
            "Too bad!", "Almost!", "Not quite!",
            "Try again!", "Keep going!", "It's nothing!", "Next time!"
        ],
        answerWas: "The answer was",
        itWas: "It was",

        colorsTitle: "🎨 Colors",
        colorsDesc: "Do you know the names of the colors?",

        exampleWords: ["A CAT", "A DOG", "A RABBIT", "A COW"]
    },

    /* ---- ALLEMAND ---- */
    de: {
        navMath: "🔢 Rechnen",
        navColors: "🎨 Farben",
        navMissing: "🧩 Fehlende Zahl",
        navDictation: "✍️ Diktat",
        navWords: "📝 Meine Wörter",

        mathTitle: "Rechentabellen",
        chooseTable: "Wähle deine Tabelle:",
        chooseOp: "Wähle die Operation:",
        start: "STARTEN",
        question: "Frage",
        score: "Punkte",

        missingTitle: "🧩 Fehlende Zahl",

        finished: "Fertig! 🏆",
        replay: "NOCHMAL",
        endSpeech: "Fertig! Du hast {score} von zehn.",

        dictTitle: "Detektiv-Diktat",
        chooseExercise: "Wähle deine Übung:",
        exampleList: "Beispiel: Tiere 🐱",
        word: "Wort",
        listenWrite: "Höre gut zu und schreibe das Wort.",
        nextWord: "NÄCHSTES WORT ➡️",
        imDone: "FERTIG!",
        correction: "Korrektur:",
        backToMenu: "ZURÜCK ZUM MENÜ",
        dictEndSpeech: "Arbeit erledigt! Hier ist die Korrektur.",

        wordsTitle: "📝 Meine Wörterlisten",
        wordsDesc: "Erstelle und verwalte deine eigenen Wörterlisten!",
        newList: "➕ Neue Liste",
        newListTitle: "Neue Liste",
        editListTitle: "Liste bearbeiten",
        listNamePlaceholder: "Listenname",
        addWordPlaceholder: "Ein Wort hinzufügen",
        add: "Hinzufügen",
        save: "💾 Speichern",
        cancel: "Abbrechen",
        noWords: "Keine Wörter hinzugefügt. Tippe ein Wort und klicke auf \"Hinzufügen\"!",
        noLists: "Keine Listen gespeichert. Erstelle deine erste Liste!",
        wordsCount: "Wörter",
        confirmDelete: "Möchtest du diese Liste wirklich löschen?",
        alertName: "Gib deiner Liste einen Namen!",
        alertWords: "Füge mindestens ein Wort hinzu!",

        bravoList: [
            "Bravo!", "Ausgezeichnet!", "Glückwunsch!", "Super!", "Großartig!",
            "Wunderbar!", "Perfekt!", "Fantastisch!", "Sehr gut!", "Champion!"
        ],
        bravoEmojis: ["🌟", "🎉", "👏", "💪", "🏅", "⭐", "🥇", "✨", "🎊", "👍"],
        dommageList: [
            "Schade!", "Fast!", "Nicht ganz!",
            "Versuch es nochmal!", "Mut!", "Macht nichts!", "Nächstes Mal!"
        ],
        answerWas: "Die Antwort war",
        itWas: "Es war",

        colorsTitle: "🎨 Die Farben",
        colorsDesc: "Kennst du die Namen der Farben?",

        exampleWords: ["EINE KATZE", "EIN HUND", "EIN KANINCHEN", "EINE KUH"]
    },

    /* ---- SUÉDOIS ---- */
    sv: {
        navMath: "🔢 Beräkningar",
        navColors: "🎨 Färger",
        navMissing: "🧩 Saknat Nummer",
        navDictation: "✍️ Diktamen",
        navWords: "📝 Mina Ord",

        mathTitle: "Räknetabeller",
        chooseTable: "Välj din tabell:",
        chooseOp: "Välj operation:",
        start: "BÖRJA",
        question: "Fråga",
        score: "Poäng",

        missingTitle: "🧩 Saknat Nummer",

        finished: "Klart! 🏆",
        replay: "SPELA IGEN",
        endSpeech: "Det är klart! Du fick {score} av tio.",

        dictTitle: "Detektiv-Diktamen",
        chooseExercise: "Välj din övning:",
        exampleList: "Exempel: Djur 🐱",
        word: "Ord",
        listenWrite: "Lyssna noga och skriv ordet.",
        nextWord: "NÄSTA ORD ➡️",
        imDone: "JAG ÄR KLAR!",
        correction: "Rättning:",
        backToMenu: "TILLBAKA TILL MENYN",
        dictEndSpeech: "Arbetet klart! Här är rättningen.",

        wordsTitle: "📝 Mina Ordlistor",
        wordsDesc: "Skapa och hantera dina egna ordlistor!",
        newList: "➕ Ny Lista",
        newListTitle: "Ny Lista",
        editListTitle: "Redigera lista",
        listNamePlaceholder: "Listnamn",
        addWordPlaceholder: "Lägg till ett ord",
        add: "Lägg till",
        save: "💾 Spara",
        cancel: "Avbryt",
        noWords: "Inga ord tillagda. Skriv ett ord och klicka på \"Lägg till\"!",
        noLists: "Inga sparade listor. Skapa din första lista!",
        wordsCount: "ord",
        confirmDelete: "Vill du verkligen ta bort denna lista?",
        alertName: "Ge din lista ett namn!",
        alertWords: "Lägg till minst ett ord!",

        bravoList: [
            "Bravo!", "Utmärkt!", "Grattis!", "Super!", "Fantastiskt!",
            "Underbart!", "Perfekt!", "Strålande!", "Mycket bra!", "Mästare!"
        ],
        bravoEmojis: ["🌟", "🎉", "👏", "💪", "🏅", "⭐", "🥇", "✨", "🎊", "👍"],
        dommageList: [
            "Synd!", "Nästan!", "Inte riktigt!",
            "Försök igen!", "Mod!", "Det gör inget!", "Nästa gång!"
        ],
        answerWas: "Svaret var",
        itWas: "Det var",

        colorsTitle: "🎨 Färgerna",
        colorsDesc: "Kan du namnen på färgerna?",

        exampleWords: ["EN KATT", "EN HUND", "EN KANIN", "EN KO"]
    },

    /* ---- ARABE ---- */
    ar: {
        navMath: "🔢 حسابات",
        navColors: "🎨 الألوان",
        navMissing: "🧩 العدد المفقود",
        navDictation: "✍️ إملاء",
        navWords: "📝 كلماتي",

        mathTitle: "جداول الحساب",
        chooseTable: "اختر جدولك :",
        chooseOp: "اختر العملية :",
        start: "ابدأ",
        question: "سؤال",
        score: "النقاط",

        missingTitle: "🧩 العدد المفقود",

        finished: "! انتهى 🏆",
        replay: "العب مرة أخرى",
        endSpeech: "انتهى! حصلت على {score} من عشرة.",

        dictTitle: "إملاء المحقق",
        chooseExercise: "اختر تمرينك :",
        exampleList: "مثال : حيوانات 🐱",
        word: "كلمة",
        listenWrite: "استمع جيداً واكتب الكلمة.",
        nextWord: "➡️ الكلمة التالية",
        imDone: "! انتهيت",
        correction: "التصحيح :",
        backToMenu: "العودة للقائمة",
        dictEndSpeech: "انتهى العمل! إليك التصحيح.",

        wordsTitle: "📝 قوائم كلماتي",
        wordsDesc: "أنشئ وأدر قوائم كلماتك الخاصة!",
        newList: "➕ قائمة جديدة",
        newListTitle: "قائمة جديدة",
        editListTitle: "تعديل القائمة",
        listNamePlaceholder: "اسم القائمة",
        addWordPlaceholder: "أضف كلمة",
        add: "أضف",
        save: "💾 حفظ",
        cancel: "إلغاء",
        noWords: "لم تضف أي كلمة. اكتب كلمة وانقر على \"أضف\" !",
        noLists: "لا توجد قوائم محفوظة. أنشئ قائمتك الأولى!",
        wordsCount: "كلمات",
        confirmDelete: "هل تريد حقاً حذف هذه القائمة؟",
        alertName: "أعط قائمتك اسماً!",
        alertWords: "أضف كلمة واحدة على الأقل!",

        bravoList: [
            "أحسنت!", "ممتاز!", "مبروك!", "رائع!", "عظيم!",
            "بديع!", "مثالي!", "خارق!", "جيد جداً!", "بطل!"
        ],
        bravoEmojis: ["🌟", "🎉", "👏", "💪", "🏅", "⭐", "🥇", "✨", "🎊", "👍"],
        dommageList: [
            "للأسف!", "تقريباً!", "ليس تماماً!",
            "حاول مرة أخرى!", "شجاعة!", "لا بأس!", "المرة القادمة!"
        ],
        answerWas: "الجواب كان",
        itWas: "كانت",

        colorsTitle: "🎨 الألوان",
        colorsDesc: "هل تعرف أسماء الألوان؟",

        exampleWords: ["قِطَّة", "كَلْب", "أَرْنَب", "بَقَرَة"]
    }
};

/* ---- Codes de langue pour la synthèse vocale (TTS) ---- */
var langCodes = {
    fr: "fr-FR",
    en: "en-US",
    de: "de-DE",
    sv: "sv-SE",
    ar: "ar-SA"
};
