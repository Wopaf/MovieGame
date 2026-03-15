// ============================================================
//  CONFIGURATION FIREBASE — Remplacer par tes identifiants
// ============================================================
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyBsjr0peOj1jFPhAA080MWuUGlyYapjxn0",
    authDomain: "moviegame-1b838.firebaseapp.com",
    databaseURL: "https://moviegame-1b838-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "moviegame-1b838",
    storageBucket: "moviegame-1b838.firebasestorage.app",
    messagingSenderId: "448540908211",
    appId: "1:448540908211:web:894cb1e8c38d59c4a9eec6"
};

// ============================================================
//  DEBUG MODE — Activé via easter egg, stocké en localStorage
// ============================================================
let DEBUG_MODE = localStorage.getItem('debugMode') === 'true';

const KEY_ICON   = `<img src="medias/key.png"   class="icon-key">`;
const JOKER_ICON = `<img src="medias/joker.png" class="icon-joker">`;

let _debugUIReady = false;
function initDebugUI() {
    if (_debugUIReady) return;
    _debugUIReady = true;

    document.getElementById("debug-menu-wrap").style.display = "";

    const debugBtn   = document.getElementById("debug-menu-btn");
    const debugPanel = document.getElementById("debug-panel");

    function closeDebugPanel() {
        debugPanel.classList.add("hidden");
        document.getElementById("debug-reset-confirm").classList.add("hidden");
        document.getElementById("debug-panel-main").classList.remove("hidden");
    }

    debugBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        debugPanel.classList.toggle("hidden");
        if (!debugPanel.classList.contains("hidden")) {
            document.getElementById("debug-reset-confirm").classList.add("hidden");
            document.getElementById("debug-panel-main").classList.remove("hidden");
        }
    });

    document.addEventListener("click", (e) => {
        if (!debugPanel.contains(e.target) && e.target !== debugBtn) closeDebugPanel();
    });

    const cellsToggleBtn = document.getElementById("debug-cells-toggle-btn");
    let debugCellsActive = false;
    cellsToggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        debugCellsActive = !debugCellsActive;
        document.body.classList.toggle("debug-cells-visible", debugCellsActive);
        cellsToggleBtn.classList.toggle("debug-btn-toggle-on", debugCellsActive);
        cellsToggleBtn.lastChild.textContent = debugCellsActive ? " Masquer boutons valider" : " Afficher boutons valider";
    });

    document.getElementById("debug-simulate-btn").addEventListener("click", () => {
        closeDebugPanel();
        showSecretRewardReveal();
    });

    document.getElementById("debug-reset-trigger-btn").addEventListener("click", () => {
        document.getElementById("debug-panel-main").classList.add("hidden");
        document.getElementById("debug-reset-confirm").classList.remove("hidden");
    });

    document.getElementById("debug-reset-cancel-btn").addEventListener("click", () => {
        document.getElementById("debug-reset-confirm").classList.add("hidden");
        document.getElementById("debug-panel-main").classList.remove("hidden");
    });

    document.getElementById("debug-reset-ok-btn").addEventListener("click", () => {
        closeDebugPanel();
        Promise.all([
            refUnlocked.set(null),
            refValidated.set(null),
            refTierlist.set(null),
            refRevealedMysteries.set(null),
            refClaimedMilestones.set(null),
            refJokers.set(0)
        ]).catch(err => {
            console.error("Firebase reset error:", err);
            showToast("Erreur reset : " + err.code);
        });
    });

    document.getElementById("debug-add-key-btn").addEventListener("click", () => {
        refClaimedMilestones.transaction(v => (v || 0) + 1);
        showToast("+1 clé ajoutée", "error", 1000);
    });

    document.getElementById("debug-add-joker-btn").addEventListener("click", () => {
        refJokers.transaction(v => (v || 0) + 1);
        showToast("+1 joker ajouté", "error", 1000);
    });

    document.getElementById("debug-tutorial-reset-btn").addEventListener("click", () => {
        refTutorialDone.set(null);
        showToast("Didacticiel réinitialisé !", "error", 1000);
    });

    document.getElementById("debug-show-fairy-btn").addEventListener("click", () => {
        closeDebugPanel();
        window._debugShowFairy?.();
    });

    document.getElementById("debug-perso-reset-btn").addEventListener("click", () => {
        localStorage.removeItem("persoCaught");
        localStorage.removeItem("persoDay");
        localStorage.removeItem("persoCount");
        showToast("Fée réinitialisée !", "error", 1000);
    });

    document.getElementById("debug-disable-btn").addEventListener("click", () => {
        closeDebugPanel();
        DEBUG_MODE = false;
        localStorage.removeItem('debugMode');
        document.getElementById("debug-menu-wrap").style.display = "none";
        document.body.classList.remove("debug-cells-visible");
        showToast("Mode debug désactivé", "error", 1000);
    });
}

function enableDebugMode() {
    DEBUG_MODE = true;
    localStorage.setItem('debugMode', 'true');
    initDebugUI();
    showToast("Mode debug activé 🐛", "error", 1000);
}


// ============================================================
//  PALIERS / OBJECTIFS — Modifier ici facilement
// ============================================================
const MILESTONES = [
    { label: "Initié",               objectif: "Valider 1 films",  count: 1,  keys: 1,             icon: 2 },
    { label: "Accro aux popcorns",   objectif: "Valider 3 films",  count: 3,  jokers: 1,           icon: 3 },
    { label: "Amateur éclairé",      objectif: "Valider 10 films", count: 10, keys: 1,             icon: 4 },
    { label: "Cinéphile du dimanche",objectif: "Valider 20 films", count: 20, keys: 2, jokers: 1,  icon: 5 },
    { label: "Passionné",            objectif: "Valider 24 films", count: 24, keys: 3,             icon: 6 },
    { label: "Critique en herbe",    objectif: "Valider 27 films", count: 27, keys: 3, jokers: 1,  icon: 7 },
    { label: "Fin Connaisseur",      objectif: "Valider 30 films", count: 30, keys: 3,             icon: 8 },
    { label: "Cinéphile",            objectif: "Valider 33 films", count: 33, keys: 3,             icon: 9 },
    { label: "Déglingo",             objectif: "Valider 36 films", count: 36, keys: 3, secretFilm: 38, icon: 10 },
    { label: "Collectionneur",       objectif: "Valider 39 films", count: 39, secretFilm: 51,      icon: 11 },
    { label: "???",                  objectif: "Valider 40 films", count: 40, rewards: ["?"],      icon: 12 },
];

// ============================================================
//  RÉCOMPENSE SPÉCIALE (palier "?") — Modifier le texte ici
//  Chaque entrée = une étape (page). Cliquer "Suivant" avance.
//  Chaque étape est un tableau de lignes affichées en fondu.
// ============================================================
const SECRET_REWARD_STEPS = [
    ["Félicitations !"],
    ["Tu as validé tous les films de la liste."],
    ["et terminé le jeu des films de Matthias !"],
    ["J'éspere que tu aura passé un bon moment à voir tous ses films"],
    ["Je voulais te dire merci"],
    ["Que soit volontaire et parfois même involontaire .."],
    ["Merci pour tous ce que tu as fait pour moi"],
    ["Merci !"],
    ["Désormais ce jeu prend fin"],
    ["Et comme pour toutes les surprises et autres inventions dérilantes que nous avons partagé"],
    ["Il deviendras souvenir .."],
    ["Souvenir distilé, dans un vaste océan qui méllee d'autres moment passé à te coté"],
];

// ============================================================
//  TIER LIST — Catégories (modifier ici les labels/couleurs)
// ============================================================
const TIERS = [
    { num: 1, rank: "S", label: "Le GOAT",                                                    color: "#FF5252", dark: true },
    { num: 2, rank: "A", label: "Du grand cinéma !",                                          color: "#FF8A33", dark: true },
    { num: 3, rank: "B", label: "Un très bon film",                                           color: "#FFCA28", dark: true },
    { num: 4, rank: "C", label: "Un bon film",                                                color: "#FFEE58", dark: true },
    { num: 5, rank: "D", label: "Mouai",                                                      color: "#A8E63D", dark: true },
    { num: 6, rank: "E", label: "C'est nul !",                                                color: "#29BCFF", dark: true },
    { num: 7, rank: "F", label: "J'ai passé un horrible moment",                              color: "#9C6FFF", dark: true },
    { num: 8, rank: "G", label: "Le pire film de la liste (sans doute le pire film tout court)", color: "#D460FF", dark: true },
];

// ============================================================
//  DONNÉES DES SUCCÈS — Modifier ici facilement
//  verrouille : true = film verrouillé (nécessite des points pour débloquer)
//  secret     : true = film secret (débloqué automatiquement par palier)
// ============================================================

// Couleurs associées aux genres — ajouter ici pour étendre la liste
const GENRES = {
    "Action":          "#ef5350",
    "Aventure":        "#ff9800",
    "Animation":       "#66bb6a",
    "Absurde":         "#d4e157",
    "Comédie":         "#ffee58",
    "Crime":           "#ef9a9a",
    "Documentaire":    "#90a4ae",
    "Drame":           "#ab47bc",
    "Espionnage":      "#26c6da",
    "Fantastique":     "#7e57c2",
    "Historique":      "#a1887f",
    "Horreur":         "#f44336",
    "Musical":         "#f48fb1",
    "Romance":         "#f06292",
    "Science-fiction": "#29b6f6",
    "Thriller":        "#42a5f5",
    "Zombie":          "#8bc34a",
};
const GENRE_DEFAULT_COLOR = "#90a4ae";

function buildGenreTags(genres) {
    const row = document.getElementById("info-genres-row");
    if (!genres || genres.length === 0) { row.classList.add("hidden"); return; }
    row.innerHTML = genres.map(g => {
        const color = GENRES[g] || GENRE_DEFAULT_COLOR;
        return `<span class="genre-tag" style="color:${color};border-color:${color}50;background:${color}35">${g}</span>`;
    }).join("");
    row.classList.remove("hidden");
}

const ACHIEVEMENTS = [
    { title: "Le Seigneur des anneaux", sousTitre: "La communauté de l'anneau", img: "1.png", password: "X8q",
    question: "Trouve la réponse à ce rébus", rebus: "medias/r1.png", answer: "Le Poney Fringant",
    realisateur: "Peter Jackson", description: "Le jeune Frodon hérite d'un Anneau maléfique convoité par le Seigneur des Ténèbres. Une Communauté se forme pour l'accompagner vers le Mordor et le détruire.",
    turl: "https://www.youtube.com/watch?v=V75dMMIW2B4", genres: ["Fantastique", "Aventure", "Chef-d'œuvre"], imdb: "https://www.imdb.com/title/tt0120737/", rating: "8.8", verrouille: false },

    { title: "Le Seigneur des anneaux", sousTitre: "Les deux tours", img: "2.png", password: "v2M",
    question: "Comment se nomme cette forteresse", rebus: "medias/r2.png", answer: "Gouffre de Helm",
    realisateur: "Peter Jackson", description: "La Communauté brisée, Frodon et Sam poursuivent vers le Mordor guidés par Gollum. Leurs compagnons défendent le Rohan lors de la bataille du Gouffre de Helm.",
    turl: "https://www.youtube.com/watch?v=LbfMDwc4azU", genres: ["Fantastique", "Aventure", "Chef-d'œuvre"], imdb: "https://www.imdb.com/title/tt0167261/", rating: "8.7", verrouille: false },

    { title: "Le Seigneur des anneaux", sousTitre: "Le retour du roi", img: "3.png", password: "7pL",
    question: "Qui fut la dernière personne à détenir l'anneau unique ?", rebus: "medias/r3.png", answer: "Gollum",
    realisateur: "Peter Jackson", description: "La guerre pour la Terre du Milieu atteint son paroxysme. Frodon approche seul de la Montagne du Destin pendant qu'Aragorn mène les armées libres face à Sauron.",
    turl: "https://www.youtube.com/watch?v=r5X-hFf6Bwo", genres: ["Fantastique", "Aventure", "Chef-d'œuvre"], imdb: "https://www.imdb.com/title/tt0167260/", rating: "8.9", verrouille: false },

    { title: "Interstelar", img: "4.png", password: "4kZ", rebus: "medias/r4.png",
    question: "Quel est le nom de famille du scientifique à l'origine de la thérorie de la relativité ?", answer: "Einstein",
    realisateur: "Christopher Nolan", description: "La Terre est mourante. Un pilote de la NASA s'engage dans un voyage à travers un trou de ver pour trouver une planète habitable, au prix de tout ce qu'il aime.",
    turl: "https://www.youtube.com/watch?v=0rDczIsHJn4", genres: ["Science-fiction", "Drame"], imdb: "https://www.imdb.com/title/tt0816692/", rating: "8.7", verrouille: false },

    { title: "Le Cinquième élement", img: "38.png", password: "6xM", rebus: "medias/r10.png",
    question: "Trouve la réponse à ce rébus", answer: "Korben Dallas",
    realisateur: "Luc Besson", description: "Au XXIIIe siècle, une force du Mal menace la Terre tous les cinq mille ans. Korben Dallas, chauffeur de taxi, doit protéger Leeloo, le mystérieux Cinquième Élément.",
    turl: "https://www.youtube.com/watch?v=1p_BvXpC8oA", genres: ["Science-fiction", "Action", "Un grand film !"], imdb: "https://www.imdb.com/title/tt0119116/", rating: "7.6", verrouille: false },

    { title: "Forest Gump", img: "5.png", password: "1nS", rebus: "medias/r5.png",
    question: "Dans quel sport Forest Gump devient-il un professionnel ?", answer: "Ping Pong",
    realisateur: "Robert Zemeckis", description: "Forrest Gump, homme simple au grand cœur, traverse sans le vouloir les plus grands événements de l'Amérique des années 60 à 80, toujours guidé par son amour pour Jenny.",
    turl: "https://www.youtube.com/watch?v=bLvqoHBptjg", genres: ["Drame", "Comédie"], imdb: "https://www.imdb.com/title/tt0109830/", rating: "8.8", verrouille: false },

    { title: "Her", img: "6.png", password: "8bY", rebus: "medias/r6.png",
    question: "Quel est le nom du système d'exploitation qu'achete Théodore au début du film ?", answer: "OS ONE",
    realisateur: "Spike Jonze", description: "Theodore, un homme solitaire qui écrit des lettres d'amour pour les autres, tombe amoureux de Samantha, un système d'exploitation doté d'une intelligence artificielle.",
    turl: "https://www.youtube.com/watch?v=fAs4qKLnRZI", genres: ["Science-fiction", "Romance"], imdb: "https://www.imdb.com/title/tt1798709/", rating: "8.0", verrouille: false },

    { title: "Persepolis", img: "50.png", password: "4vC", rebus: "medias/r7.png",
    question: "Quelle fleur mettait la grand-mère de Marjane dans son soutien-gorge ?", answer: "Jasmin",
    realisateur: "Vincent Paronnaud et Marjane Satrapi", description: "La petite Marjane grandit à Téhéran tandis que la révolution islamique bascule l'Iran. Adulte, elle sera contrainte de fuir et trouver sa place entre deux cultures.",
    turl: "https://www.youtube.com/watch?v=MLILb_JnFx4", genres: ["Animation", "Drame", "Très beau film !"], imdb: "https://www.imdb.com/title/tt0808417/", rating: "7.9", verrouille: false },

    { title: "Tenacious D", sousTitre: "et le médiator du destin", img: "48.png", password: "2fP", rebus: "medias/r8.png",
    question: "Dans le morceau Master Exploder, complète les paroles suivantes: I do not need, He does not need , a ...", answer: "microphone",
    realisateur: "Liam Lynch", description: "JB et KG, duo rock déjanté, apprennent l'existence du Médiator du Destin, un artefact légendaire capable de les propulser au sommet du rock mondial. La quête commence.",
    turl: "https://www.youtube.com/watch?v=TXxH7H0KQWI", genres: ["Comédie", "Musical"], imdb: "https://www.imdb.com/title/tt0365830/", rating: "6.7", verrouille: false },

    { title: "Réalité", img: "49.png", password: "7xL", rebus: "medias/r9.png",
    question: "Dans le film que veut réaliser Jason, quels objets tue toute la population ?", answer: "Télévisions",
    realisateur: "Quentin Dupieux", description: "Jason rêve de réaliser un film d'horreur. Son producteur exige le meilleur gémissement jamais enregistré. La réalité et la fiction finissent par se confondre.",
    turl: "https://www.youtube.com/watch?v=FRzONsDtDFM", genres: ["Comédie", "Absurde"], imdb: "https://www.imdb.com/title/tt2392672/", rating: "6.2", verrouille: false },

    { title: "Fumer fait tousser", img: "14.png", password: "7mX", rebus: "medias/r11.png",
    question: "quel est le dernier morceau du corps qu'il reste au neveu du personnage joué par Blanche Gardin dans le film Fumer fait tousser", answer: "la bouche",
    realisateur: "Quentin Dupieux", description: "Les membres de la Tabac Force, super-héros anti-tabac, partent en retraite dans un chalet pour se ressouder. Une terrible menace plane sur la planète entière.",
    turl: "https://www.youtube.com/watch?v=y2x9WfC9SjM", genres: ["Comédie", "Absurde"], imdb: "https://www.imdb.com/title/tt15471560/", rating: "6.1", verrouille: false },

    { title: "Oss 117", sousTitre: "Le Caire, nid d'espions", img: "17.png", password: "3fS", rebus: "medias/r12.png",
    question: "Que ce passe t'il lorsque quelqu'un ou quelque chose meurt... ? ", answer: "Quelqu'un ou quelque chose naît ailleurs",
    realisateur: "Michel Hazanavicius", description: "En 1955, l'espion OSS 117 est envoyé au Caire pour élucider la disparition d'un agent. Dragueur, arrogant et inadapté, il sème joyeusement la pagaille.",
    turl: "https://www.youtube.com/watch?v=yYvHq-O_i1c", genres: ["Comédie", "Espionnage", "J'aime trop ce film"], imdb: "https://www.imdb.com/title/tt0464913/", rating: "7.4", verrouille: false },

    { title: "Oss 117", sousTitre: "Rio ne répond plus", img: "18.png", password: "9pZ", rebus: "medias/r13.png",
    question: "Comment appelez-vous un pays qui a comme dirigeant un militaire avec les pleins pouvoirs, une police secrète, une seule chaîne de télévision et que toute l'information est contrôlée par l'État ?", answer: "La France du general de gaulle",
    realisateur: "Michel Hazanavicius", description: "En 1967, OSS 117 est envoyé au Brésil pour récupérer un microfilm compromettant sur des anciens nazis, tout en semant le chaos comme à son habitude.",
    turl: "https://www.youtube.com/watch?v=5VjI_jA_q7g", genres: ["Comédie", "Espionnage", "Celui ci est tout aussi bien"], imdb: "https://www.imdb.com/title/tt1167660/", rating: "6.8", verrouille: false },

    { title: "La cité de la peur", img: "19.png", password: "2hK", rebus: "medias/r14.png",
    question: "Quel est le titre du film d'Odile Deray ?", answer: "Red is Dead",
    realisateur: "Alain Berbérian", description: "Un tueur en série assassine les projectionnistes au Festival de Cannes. Simon Jérémi, garde du corps raté des Nuls, est chargé de protéger la maladroite Odile Deray.",
    turl: "https://www.youtube.com/watch?v=680X_vH_Ias", genres: ["Comédie", "Horreur"], imdb: "https://www.imdb.com/title/tt0109440/", rating: "7.6", verrouille: false },

    { title: "Jumanji", img: "24.png", password: "5jN", rebus: "medias/r15.png",
    question: "Trouve la réponse à ce rébus", answer: "Alan Parrish",
    realisateur: "Joe Johnston", description: "En 1969, Alan est aspiré dans un jeu de société magique. Vingt-six ans plus tard, deux enfants reprennent la partie et libèrent des dangers de jungle dans leur ville.",
    turl: "https://www.youtube.com/watch?v=9P6TZcCk0MM", genres: ["Aventure", "Fantastique", "Un Classique !"], imdb: "https://www.imdb.com/title/tt0113497/", rating: "7.0", verrouille: false },

    { title: "Premier Contact", img: "28.png", password: "9kF", rebus: "medias/r16.png",
    question: "Il est bien ce film ?", answer: "Oui",
    realisateur: "Denis Villeneuve", description: "Douze vaisseaux extraterrestres se posent sur Terre. La linguiste Louise Banks tente de déchiffrer leur langage mystérieux avant que la panique mondiale ne déclenche la guerre.",
    turl: "https://www.youtube.com/watch?v=f8mYf5p_f7I", genres: ["Science-fiction", "Drame"], imdb: "https://www.imdb.com/title/tt2543164/", rating: "7.9", verrouille: false },

    { title: "La classe Américaine", img: "31.png", password: "8rD", rebus: "medias/r17.png",
    question: "Selon Orson Welles, ce flilm est un plagiat d'un autre flilm. Lequel?", answer: "Citizen Kane",
    realisateur: "Michel Hazanavicius et Dominique Mézerette", description: "George Abitbol, l'homme le plus classe du monde, part en quête de la classe perdue. Un détournement culte de films Warner où tout le monde est con sauf lui.",
    turl: "https://www.youtube.com/watch?v=jWkCq0Q38E8", genres: ["Comédie", "Absurde", "Je suis désolé"], imdb: "https://www.imdb.com/title/tt0321715/", rating: "7.9", verrouille: false },

    { title: "Blade Runner 2049", img: "44.png", password: "1vR", rebus: "medias/r18.png",
    question: "Comment appelle-t-on les androïdes biologiquement identiques aux humains, fabriqués par la corporation Tyrell ?", answer: "Les Réplicants",
    realisateur: "Denis Villeneuve", description: "En 2049, l'agent K, blade runner chargé de traquer les réplicants, découvre un secret vieux de trente ans qui pourrait bouleverser l'ordre entre humains et androïdes.",
    turl: "https://www.youtube.com/watch?v=WarevDmt_Ug", genres: ["Science-fiction", "Thriller", "Un grand film !"], imdb: "https://www.imdb.com/title/tt1856101/", rating: "8.0", verrouille: false },

    { title: "Gladiator", img: "45.png", password: "4bX", rebus: "medias/r19.png",
    question: "Qui est nazi et adore ce film ?", answer: "Bertrand",
    realisateur: "Ridley Scott", description: "Maximus, grand général de Rome trahi par Commode, est réduit en esclavage. Devenu gladiateur, il traverse l'Empire pour se venger de l'homme qui a assassiné sa famille.",
    turl: "https://www.youtube.com/watch?v=owK1at_O7_0", genres: ["Action", "Historique", "Un grand film !"], imdb: "https://www.imdb.com/title/tt0172495/", rating: "8.5", verrouille: false },

    { title: "Je suis une légende", img: "46.png", password: "8nN", rebus: "medias/r20.png",
    question: "Dans ce film, le personnage principal Robert Neville joué par Will Smith écoute régulièrement un morceau de Bob Marley, quel est le titre de ce morceau ?", answer: "Three Little Birds",
    realisateur: "Francis Lawrence", description: "Robert Neville survit seul à New York après qu'un virus a transformé l'humanité en créatures nocturnes sanguinaires. Militaire et chercheur, il tente de trouver un remède.",
    genres: ["Horreur", "Drame", "Un bon film !"],
    turl: "https://www.youtube.com/watch?v=uYUbLTxJl-A", imdb: "https://www.imdb.com/title/tt0480249/", rating: "7.2", verrouille: false },

    { title: "Into the Wild", img: "33.png", password: "5kS", rebus: "medias/r21.png",
    question: "Quel est le numéro écrit sur le côté du 'Magic Bus' où s'installe Christopher ?", answer: "142",
    realisateur: "Sean Penn", description: "Christopher McCandless, jeune diplômé idéaliste, abandonne tout — argent, famille, identité — pour partir seul à l'aventure vers les étendues sauvages de l'Alaska.",
    turl: "https://www.youtube.com/watch?v=2GWPOPSXGYI", genres: ["Drame", "Aventure", "Un grand film !"], imdb: "https://www.imdb.com/title/tt0758758/", rating: "8.1", verrouille: false },

    { title: "Incassable", img: "34.png", password: "3vH", rebus: "medias/r22.png",
    question: "Quel est le nom de la galerie d'art spécialisée dans les comics tenue par Elijah Price ?", answer: "Limited Edition",
    realisateur: "M. Night Shyamalan", description: "David Dunn, unique survivant indemne d'un accident de train ayant tué 131 personnes, est contacté par Elijah Price, un homme mystérieux qui lui révèle une vérité bouleversante.",
    turl: "https://www.youtube.com/watch?v=AC-LA9QVdmI", genres: ["Fantastique", "Thriller"], imdb: "https://www.imdb.com/title/tt0217869/", rating: "7.3", verrouille: true },

    { title: "Bugonia", img: "54.png", password: "1xQ", rebus: "medias/r23.png",
    question: "De quel espèce extraterrestre parle-t-on dans ce film ?", answer: "les Andromédiens",
    realisateur: "Yorgos Lanthimos", description: "Deux employés persuadés d'une invasion extraterrestre enlèvent une puissante PDG, convaincus qu'elle est une alien venue anéantir l'humanité. Absurde et glaçant.",
    genres: ["Thriller, Crime"],
    turl: "https://www.youtube.com/watch?v=nmxP6PU_GGo", imdb: "https://www.imdb.com/fr-ca/title/tt12300742/", rating: "7.4", verrouille: true },
    
    { title: "Transcendance", img: "21.png", password: "1xQ", rebus: "medias/r24.png",
    question: "Dans quelle petite ville isolée Will Caster fait-il construire son immense centre de données souterrain ?", answer: "Brightwood",
    realisateur: "Wally Pfister", description: "Will Caster, brillant chercheur en IA, se retrouve mourant après un attentat. Sa conscience est téléchargée dans un ordinateur, créant une entité omnisciente et omnipotente.",
    genres: ["Science-fiction", "Thriller", "Sous-coté"],
    turl: "https://www.youtube.com/watch?v=VCTen3-B8GU", imdb: "https://www.imdb.com/title/tt2209764/", rating: "6.2", verrouille: true },

    { title: "Jumper", img: "22.png", password: "4uG", rebus: "medias/r25.png",
    question: "Où se trouve la 'bibliothèque' secrète de Griffin, là où il garde ses preuves sur les Paladins ?", answer: "Dans le Colisée",
    realisateur: "Doug Liman", description: "David Rice peut se téléporter instantanément n'importe où. Cette liberté absolue prend fin quand les Paladins, une organisation secrète qui traque les Jumpers, se lance à ses trousses.",
    genres: ["Fantastique", "Action", "Tu va peut être pas aimer"],
    turl: "https://www.youtube.com/watch?v=RcMH5sAYc5o", imdb: "https://www.imdb.com/title/tt0489099/", rating: "6.0", verrouille: true },

    { title: "Chappee", img: "27.png", password: "6tW", rebus: "medias/r26.png",
    question: "Quel est le nom du robot massif et lourd piloté à distance par le personnage de Hugh Jackman ?", answer: "Moose",
    realisateur: "Neill Blomkamp", description: "À Johannesburg, Chappie est le premier robot à posséder une vraie conscience. Volé par des gangsters, il apprend la dureté du monde tout en cherchant à comprendre ce qu'il est.",
    genres: ["Science-fiction", "Action", "Divertissant", "à voir"],
    turl: "https://www.youtube.com/watch?v=lYpdtB4UKWE", imdb: "https://www.imdb.com/title/tt1823672/", rating: "6.8", verrouille: true },

    { title: "Au Boulot !", img: "51.png", password: "6tW", rebus: "medias/r27.png",
    question: "Dans ce film documentaire, cette grosse bourgeoise de Sarah Saldamann prend en photo la façade d'un commerce avec un air enjoué mais plein de mépris de classe (la connasse). Quel est le nom de ce commerce ?", answer: "Un PMU",
    realisateur: "Gilles Perret", description: "François Ruffin, député, propose à Sarah Saldmann de vivre un mois avec le SMIC et d'exercer des métiers précaires pour comprendre la réalité des travailleurs modestes.",
    genres: ["Documentaire", "Gauchiasse !"],
    turl: "https://www.youtube.com/watch?v=lYpdtB4UKWE", imdb: "https://www.imdb.com/title/tt33350039/", rating: "6.9", verrouille: true },

    { title: "Ill Manors", img: "32.png", password: "2pT", rebus: "medias/r33.png",
    question: "Quel est le prénom du bébé abandonné dans le sac que les dealers trouvent ?", answer: "Michelle",
    realisateur: "Ben Drew", description: "Dans les rues de Forest Gate, à l'est de Londres, plusieurs destins marginaux se croisent dans une spirale de violence, de trafics et de misère sociale, sans issue apparente.",
    genres: ["Drame", "Crime", "Film vraiment pas drôle"],
    turl: "https://www.youtube.com/watch?v=MT44ch0FFEU", imdb: "https://www.imdb.com/title/tt1760967/", rating: "6.6", verrouille: true },

    { title: "Looper", img: "36.png", password: "1zL", rebus: "medias/r34.png",
    question: "Quel est le surnom du futur chef de la pègre qui envoie les victimes dans le passé ?", answer: "Le Maître des Pluies",
    realisateur: "Rian Johnson", description: "En 2044, Joe est un Looper : il élimine des victimes envoyées du futur par un syndicat du crime. Sa vie bascule quand sa prochaine cible est sa propre version vieillie.",
    genres: ["Action", "Science-fiction", "Un bon film !"],
    turl: "https://www.youtube.com/watch?v=2iQuoxZ9dfc", imdb: "https://www.imdb.com/title/tt1276104/", rating: "7.4", verrouille: true },

    { title: "Tarzan", img: "41.png", password: "5vW", rebus: "medias/r35.png",
    question: "Quel est le nom de l'explorateur qui veut capturer les gorilles pour les vendre ?", answer: "Clayton",
    realisateur: "Kevin Lima et Chris Buck", description: "Orphelin recueilli et élevé par des gorilles, Tarzan découvre ses origines humaines à l'arrivée d'une expédition dans la jungle africaine. Il doit choisir son monde.",
    genres: ["Animation", "Aventure", "Une belle histoire", "Une belle bande original"],
    turl: "https://www.youtube.com/watch?v=2Wv_2UIdYtY", imdb: "https://www.imdb.com/title/tt0120855/", rating: "7.1", verrouille: true },

    { title: "Abysse", img: "15.png", password: "8rA", rebus: "medias/r36.png",
    question: "Quel message Bud écrit-il sur son ardoise à sa femme alors qu'il manque d'oxygène au fond ?", answer: "Je t'aime",
    realisateur: "James Cameron", description: "Une équipe de plongeurs est envoyée chercher un sous-marin nucléaire naufragé dans les abysses. Leur mission prend une dimension inattendue lors d'une rencontre avec une vie extraterrestre.",
    genres: ["Science-fiction", "Aventure", "Un bon film !"],
    turl: "https://www.youtube.com/watch?v=9oR-B6S7oY0", imdb: "https://www.imdb.com/title/tt0096754/", rating: "7.5", verrouille: true },

    { title: "L'amour Ouf", img: "20.png", password: "6lD", rebus: "medias/r37.png",
    question: "Sur quelle chanson de The Cure les deux protagonistes dansent-ils dans la cour d'école ?", answer: "A Forest",
    realisateur: "Gilles Lellouche", description: "Clotaire et Jackie se rencontrent adolescents dans les années 80. Leur amour passionnel résistera aux années, à la violence et à des chemins de vie radicalement différents.",
    genres: ["Drame", "Romance", "J'ai bien aimé mais je sais pas si c'est ta came"],
    turl: "https://www.youtube.com/watch?v=C7mS-TbeI8M", imdb: "https://www.imdb.com/title/tt27490099/", rating: "7.0", verrouille: true },

    { title: "Le Guide du Voyageur galactique", img: "16.png", password: "5wK", rebus: "medias/r38.png",
    question: "En quoi le moteur à improbabilité infinie transforme-t-il les deux missiles nucléaires ?", answer: "Un pétunia et une baleine",
    realisateur: "Garth Jennings", description: "Arthur Dent échappe de justesse à la démolition de la Terre pour une autoroute galactique. Il parcourt l'univers avec son ami Ford Prefect, un extraterrestre guide intergalactique.",
    genres: ["Science-fiction", "Comédie", "à voir absolument !"],
    turl: "https://www.youtube.com/watch?v=asS9G_HIdjI", imdb: "https://www.imdb.com/title/tt0371724/", rating: "6.8", verrouille: true },
    
    { title: "Kaamelott 2 part.1", img: "52.png", password: "6tW", rebus: "medias/r39.png",
    question: "", answer: "",
    realisateur: "Alexandre Astier", description: "Le roi Arthur revient d'exil pour reprendre Kaamelott des mains de Lancelot. Il rassemble ses chevaliers pour une reconquère contre Arthur ! Après la destruction de Kaamelott, son refus obstiné de tuer Lancelot précipite le Royaume de Logres à sa perte. Il réunit ses Chevaliers, novices téméraires et vétérans désabusés, autour de la Nouvelle Table Ronde et les envoie prouver leur valeur aux quatre coins du Monde, des Marais Orcaniens aux terres glacées du DRAGON_END_PLACEHOLDER",
    genres: ["Aventure", "Fantastique", "L'excelente suite d'un film moyen"],
    turl: "https://www.youtube.com/watch?v=lYpdtB4UKWE", imdb: "https://www.imdb.com/title/tt9844322/", rating: "7.2", verrouille: true },

    { title: "10 Cloverfield Lane", img: "10.png", password: "9jN", rebus: "medias/r40.png",
    question: "À quel jeu de société Howard, Emmett et Michelle jouent-ils dans le bunker ?", answer: "Le jeu de la vie",
    realisateur: "Dan Trachtenberg", description: "Une femme se réveille dans un bunker après un accident, son hôte affirmant que l'extérieur est contaminé.",
    genres: ["Thriller", "Science-fiction", "Un bon film !"],
    turl: "https://www.youtube.com/watch?v=z-mFf4gytQI", imdb: "https://www.imdb.com/title/tt1179933/", rating: "7.2", verrouille: true },

    { title: "Stargate", img: "11.png", password: "2tX", rebus: "medias/r41.png",
    question: "Comment s'appelle le minéral instable utilisé pour faire fonctionner la porte ?", answer: "Naquadah",
    realisateur: "Roland Emmerich", description: "Une équipe de militaires et un archéologue franchissent une porte stellaire menant à une autre planète.",
    genres: ["Science-fiction", "Aventure", "Un classique de la science-fiction"],
    turl: "https://www.youtube.com/watch?v=uK8n_V2EaH8", imdb: "https://www.imdb.com/title/tt0111282/", rating: "7.1", verrouille: true },

    { title: "Scary Movie 3", img: "12.png", password: "1pB", rebus: "medias/r42.png",
    question: "Comment s'appelle la petite fille terrifiante qui sort du puits (parodie du Cercle) ?", answer: "Tabitha",
    realisateur: "David Zucker", description: "Une parodie déjantée des films d'horreur et de science-fiction les plus célèbres des années 2000.",
    genres: ["Comédie", "Absurde", "Un classique de l'humour"],
    turl: "https://www.youtube.com/watch?v=XvK_E6t5F4Y", imdb: "https://www.imdb.com/title/tt0306047/", rating: "6.1", verrouille: true },

    { title: "Daaaaaalie", img: "13.png", password: "4vC", rebus: "medias/r43.png",
    question: "Quel objet insolite Dalí veut-il absolument filmer lors de l'interview ?", answer: "Une fontaine",
    realisateur: "Quentin Dupieux", description: "Une journaliste tente de réaliser une interview avec Salvador Dalí, qui se transforme en un voyage absurde.",
    genres: ["Comédie", "Absurde", "Pas mal non ?! C'est français"],
    turl: "https://www.youtube.com/watch?v=MLILb_JnFx4", imdb: "https://www.imdb.com/title/tt23476446/", rating: "6.5", verrouille: true },

    { title: "Stéphane", img: "53.png", password: "4vC", rebus: "medias/r43.png",
    question: "", answer: "",
    realisateur: "Timothée Hochet et Lucas Pastor", description: "Un jeune vidéaste au talent douteux fait la rencontre de Stéphane, un ancien cascadeur brut de décoffrage, qui sous couvert d'une grande sympathie se montre de plus en plus étrange. Ils s’engagent alors dans un projet périlleux : réaliser à eux seuls un grand film de guerre.",
    genres: ["Comédie", "Drame"],
    turl: "https://www.youtube.com/watch?v=wLzyOnYXdCU", imdb: "https://www.imdb.com/fr/title/tt22180542/", rating: "6.4", secret: true },

    { title: "Le Seigneur des anneaux l'animé de 1979", img: "26.png", password: "3bK", rebus: "medias/r44.png",
    question: "Quel personnage majeur des livres est totalement absent de cette version de Bakshi ?", answer: "Tom Bombadil",
    realisateur: "Ralph Bakshi", description: "Une adaptation expérimentale du premier tome de Tolkien utilisant la technique de la rotoscopie.",
    genres: ["Fantastique", "Animation"],
    turl: "https://www.youtube.com/watch?v=6Yt-R70_R0Y", imdb: "https://www.imdb.com/title/tt0077869/", rating: "6.2", secret: true },

];

// Retourne le nom de fichier image d'un succès.
// Si le succès a un champ `img`, il est utilisé ; sinon, fallback sur l'index (ex: "3.png").
function achImg(i) {
    return `medias/${ACHIEVEMENTS[i].img || (i + 1) + ".png"}`;
}

// ============================================================
//  FIREBASE — Initialisation + Realtime Database
// ============================================================
firebase.initializeApp(FIREBASE_CONFIG);
const db = firebase.database();
const refUnlocked          = db.ref("game/unlocked");
const refValidated         = db.ref("game/validated");
const refTierlist          = db.ref("game/tierlist");
const refRevealedMysteries = db.ref("game/revealedMysteries");
const refClaimedMilestones = db.ref("game/claimedMilestones");
const refGameEnded         = db.ref("game/ended");
const refHeartClicks       = db.ref("game/heartClicks");
const refJokers            = db.ref("game/jokers");
const refTutorialDone      = db.ref("game/tutorialDone");
const refAccentColor       = db.ref("game/accentColor");

// État local (cache synchronisé avec Firebase)
let cachedUnlocked          = [];
let cachedValidated         = [];
let cachedTierlist          = {};
let cachedRevealedMysteries = [];
let cachedClaimedMilestones = 0;

// ---- Notifications toast ----
function showToast(msg, type = "error", duration = 5000) {
    const container = document.getElementById("toast-container");
    if (!container) return;
    const toast = document.createElement("div");
    toast.className = "toast toast-" + type;
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => {
        toast.classList.add("toast-fadeout");
        setTimeout(() => toast.remove(), 400);
    }, duration);
}

// ---- Indicateur de connexion Firebase ----
db.ref(".info/connected").on("value", (snap) => {
    const badge = document.getElementById("firebase-badge");
    if (!badge) return;
    if (snap.val() === true) {
        badge.classList.add("connected");
        badge.classList.remove("disconnected");
        badge.title = "Firebase : connecté";
    } else {
        badge.classList.add("disconnected");
        badge.classList.remove("connected");
        badge.title = "Firebase : déconnecté";
    }
});

// ---- Debounce buildGrid pour éviter les reconstructions en rafale ----
let _buildGridTimer = null;
function buildGridDebounced() {
    clearTimeout(_buildGridTimer);
    _buildGridTimer = setTimeout(buildGrid, 50);
}

// ---- Écoute temps réel ----
refUnlocked.on("value", (snapshot) => {
    cachedUnlocked = snapshot.val() || [];
    buildGridDebounced();
}, (err) => {
    console.error("Firebase read error (unlocked):", err);
    showToast("Erreur Firebase (lecture) : " + err.code);
});

refValidated.on("value", (snapshot) => {
    cachedValidated = snapshot.val() || [];
    buildGridDebounced();
    updateTierlistBadge();
}, (err) => {
    console.error("Firebase read error (validated):", err);
    showToast("Erreur Firebase (lecture) : " + err.code);
});

// Vérifie au démarrage si le jeu est terminé
refGameEnded.once("value", snap => {
    if (snap.val() === true) showGameOverDirect();
});

function getUnlocked() { return [...cachedUnlocked]; }
function getValidated() { return [...cachedValidated]; }
function getRevealedMysteries() { return [...cachedRevealedMysteries]; }
function getClaimedMilestones() { return cachedClaimedMilestones; }

function saveUnlocked(arr) {
    cachedUnlocked = arr;
    refUnlocked.set(arr.length ? arr : null).catch(err => {
        console.error("Firebase save error (unlocked):", err);
        showToast("Erreur sauvegarde : " + err.code);
    });
}

function saveValidated(arr) {
    cachedValidated = arr;
    refValidated.set(arr.length ? arr : null).catch(err => {
        console.error("Firebase save error (validated):", err);
        showToast("Erreur sauvegarde : " + err.code);
    });
}

function saveRevealedMysteries(arr) {
    cachedRevealedMysteries = arr;
    refRevealedMysteries.set(arr.length ? arr : null).catch(err => {
        console.error("Firebase save error (revealedMysteries):", err);
        showToast("Erreur sauvegarde : " + err.code);
    });
}

function saveClaimedMilestones(n) {
    cachedClaimedMilestones = n;
    refClaimedMilestones.set(n > 0 ? n : null).catch(err => {
        console.error("Firebase save error (claimedMilestones):", err);
        showToast("Erreur sauvegarde : " + err.code);
    });
}

function getAvailablePoints() {
    // Somme des clés gagnées sur les paliers réclamés (champ `keys`, défaut 1)
    const totalKeys = MILESTONES
        .slice(0, getClaimedMilestones())
        .reduce((sum, m) => sum + (m.keys ?? 1), 0);
    // Ne compter que les films verrouillés débloqués (pas les films secrets, gratuits)
    const revealedVerrouille = getRevealedMysteries().filter(i => ACHIEVEMENTS[i] && ACHIEVEMENTS[i].verrouille);
    return Math.max(0, totalKeys - revealedVerrouille.length);
}

// ============================================================
//  COULEUR ACCENT
// ============================================================
const ACCENT_COLORS = [
    { label: "Rouge",   value: "#e82929" },
    { label: "Orange",  value: "#ff8c00" },
    { label: "Jaune",   value: "#ffd500" },
    { label: "Vert",    value: "#50ab0b" },
    { label: "Teal",    value: "#07b497" },
    { label: "Bleu",    value: "#3590ea" },
    { label: "Violet",  value: "#9b59ff" },
    { label: "Rose",    value: "#fe4a98" },
];

function applyAccentColor(hex) {
    document.documentElement.style.setProperty("--color-accent", hex);
}

refAccentColor.on("value", snap => {
    const hex = snap.val();
    if (hex) applyAccentColor(hex);
    // Met à jour la swatch active si la modal est ouverte
    document.querySelectorAll(".accent-swatch").forEach(sw => {
        sw.classList.toggle("active", sw.dataset.color === (hex || ACCENT_COLORS[0].value));
    });
});

function initAccentColorModal() {
    const btn     = document.getElementById("accent-color-btn");
    const modal   = document.getElementById("modal-accent");
    const overlay = document.getElementById("accent-modal-overlay");
    const closeBtn = document.getElementById("accent-modal-close");
    const grid    = document.getElementById("accent-color-swatches");
    if (!btn || !modal || !grid) return;

    // Construire les swatches
    ACCENT_COLORS.forEach(({ label, value }) => {
        const sw = document.createElement("button");
        sw.className = "accent-swatch";
        sw.title = label;
        sw.dataset.color = value;
        sw.style.background = value;
        sw.addEventListener("click", () => {
            refAccentColor.set(value);
            modal.classList.add("hidden");
        });
        grid.appendChild(sw);
    });

    btn.addEventListener("click", () => modal.classList.remove("hidden"));
    overlay.addEventListener("click", () => modal.classList.add("hidden"));
    closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
}

function updateMysteryPointsIndicator() {
    const points = getAvailablePoints();
    const el = document.getElementById("mystery-points-indicator");
    if (!el) return;
    el.classList.remove("hidden");
    el.style.display = (currentView === 'tierlist' || currentView === 'rewards') ? 'none' : '';
    document.getElementById("mystery-points-text").innerHTML = `<span class="mpi-count">${points} ${KEY_ICON}</span>`;
}

function updateJokersIndicator(count) {
    const el = document.getElementById("jokers-indicator");
    if (!el) return;
    el.classList.remove("hidden");
    document.getElementById("jokers-text").innerHTML = `${count} ${JOKER_ICON}`;
}

function updateRewardsBadge(playNotif = false) {
    const validated = getValidated();
    const milestonesReached = MILESTONES.filter(m => validated.length >= m.count).length;
    const pending = milestonesReached - getClaimedMilestones();
    const badge = document.getElementById("rewards-badge");
    if (!badge) return;
    const wasHidden = badge.classList.contains("hidden");
    badge.textContent = pending > 0 ? pending : "";
    badge.classList.toggle("hidden", pending <= 0);
    if (playNotif && wasHidden && pending > 0) playSound("notif");
}

function updateTierlistBadge() {
    const badge = document.getElementById("tierlist-badge");
    if (!badge) return;
    const unplaced = getValidated().filter(i => !(i in cachedTierlist)).length;
    badge.textContent = unplaced > 0 ? unplaced : "";
    badge.classList.toggle("hidden", unplaced <= 0);
}

refTierlist.on("value", (snap) => {
    cachedTierlist = snap.val() || {};
    const modal = document.getElementById("modal-tierlist");
    if (modal && !modal.classList.contains("hidden")) buildTierlistUI();
    updateTierlistBadge();
}, (err) => {
    console.error("Firebase read error (tierlist):", err);
});

refRevealedMysteries.on("value", (snapshot) => {
    cachedRevealedMysteries = snapshot.val() || [];
    buildGridDebounced();
}, (err) => {
    console.error("Firebase read error (revealedMysteries):", err);
    showToast("Erreur Firebase (lecture) : " + err.code);
});

refClaimedMilestones.on("value", (snapshot) => {
    cachedClaimedMilestones = snapshot.val() || 0;
    buildMilestones();
    updateRewardsBadge();
    updateMysteryPointsIndicator();
}, (err) => {
    console.error("Firebase read error (claimedMilestones):", err);
});

refJokers.once("value").then(snapshot => {
    if (snapshot.val() === null) refJokers.set(0);
});

refJokers.on("value", (snapshot) => {
    cachedJokers = snapshot.val() || 0;
    updateJokersIndicator(cachedJokers);
    updateJokerUseBar();
}, (err) => {
    console.error("Firebase read error (jokers):", err);
});

function saveTierlist() {
    const data = Object.keys(cachedTierlist).length ? cachedTierlist : null;
    refTierlist.set(data).catch(err => {
        console.error("Firebase save error (tierlist):", err);
        showToast("Erreur sauvegarde tier list : " + err.code);
    });
}


// ============================================================
//  SONS — Modifier les fichiers dans le dossier sounds/
// ============================================================
const SOUNDS = {
    click:      new Audio("sounds/clic.mp3"),
    success:    new Audio("sounds/success.mp3"),
    fail:       new Audio("sounds/fail.mp3"),
    takeReward: new Audio("sounds/take-reward.mp3"),
    notif:      new Audio("sounds/notif.mp3"),
    unlock:     new Audio("sounds/unlock.mp3"),
    drop:       new Audio("sounds/drop1.wav"),
    drop2:      new Audio("sounds/drop2.wav"),
    closedrop1: new Audio("sounds/closedrop1.wav"),
    clic1:      new Audio("sounds/clic1.wav"),
};

function playSound(_name) {
    // Sons désactivés
}




// ============================================================
//  FILTRE
// ============================================================

let currentFilter = "all";

function getSortedIndices() {
    const validated = getValidated();
    const revealedMysteries = getRevealedMysteries();
    let indices = ACHIEVEMENTS.map((_, i) => i);

    if (currentFilter === "validated") {
        indices = indices.filter(i => validated.includes(i));
    } else if (currentFilter === "unvalidated") {
        // Non validés ET déverrouillés (ni verrouillé ni secret encore caché)
        indices = indices.filter(i => {
            if (validated.includes(i)) return false;
            const ach = ACHIEVEMENTS[i];
            const isStillLocked = (ach.verrouille || ach.secret) && !revealedMysteries.includes(i);
            return !isStillLocked;
        });
    } else if (currentFilter === "locked") {
        indices = indices.filter(i => ACHIEVEMENTS[i].verrouille && !validated.includes(i) && !revealedMysteries.includes(i));
    } else if (currentFilter === "secret") {
        indices = indices.filter(i => ACHIEVEMENTS[i].secret && !validated.includes(i) && !revealedMysteries.includes(i));
    } else if (currentFilter.startsWith("genre:")) {
        const genre = currentFilter.slice(6);
        indices = indices.filter(i => ACHIEVEMENTS[i].genres && ACHIEVEMENTS[i].genres.includes(genre));
    }

    return indices;
}

// ============================================================
//  UI
// ============================================================

function updateCounter() {
    const validated = getValidated();
    const total = ACHIEVEMENTS.length;
    document.getElementById("unlocked-count").textContent = validated.length;
    document.getElementById("total-count").textContent = total;

    const pct = total > 0 ? Math.round((validated.length / total) * 100) : 0;
    document.getElementById("progress-pct").textContent = pct + "%";
    document.getElementById("progress-bar").style.width = pct + "%";

    // Sidebar progress panel
    const spCount = document.getElementById("sp-count");
    const spTotal = document.getElementById("sp-total");
    const spPct   = document.getElementById("sp-pct");
    const spBar   = document.getElementById("sp-bar");
    if (spCount) spCount.textContent = validated.length;
    if (spTotal) spTotal.textContent = total;
    if (spPct)   spPct.textContent   = pct + "%";
    if (spBar)   spBar.style.width   = pct + "%";

    updateMysteryPointsIndicator();
    updateRewardsBadge(true);
}


function rewardBadgesHTML(m) {
    const badges = [];
    if (m.keys)               badges.push(`<span class="reward-badge reward-badge-key">${m.keys} ${KEY_ICON}</span>`);
    if (m.jokers)             badges.push(`<span class="reward-badge reward-badge-joker">${m.jokers} ${JOKER_ICON}</span>`);
    if (m.secretFilm !== undefined) badges.push(`<span class="reward-badge reward-badge-secret">Film secret</span>`);
    if (m.rewards && m.rewards.includes("?")) badges.push(`<span class="reward-badge">?</span>`);
    return badges.join("");
}

function updatePlayerTitle() {
    const el = document.getElementById("sidebar-title-value");
    const iconEl = document.getElementById("sidebar-title-icon");
    if (!el) return;
    const claimedCount = getClaimedMilestones();
    if (claimedCount > 0) {
        const last = MILESTONES[claimedCount - 1];
        el.textContent = last.label || `${last.count} succès`;
        if (iconEl) { iconEl.src = `medias/s${last.icon || claimedCount}.png`; iconEl.alt = last.label || ""; }
        document.getElementById("sidebar-title-wrap").classList.remove("no-title");
    } else {
        el.textContent = "Néophyte";
        if (iconEl) { iconEl.src = "medias/s1.png"; iconEl.alt = "Néophyte"; }
        document.getElementById("sidebar-title-wrap").classList.remove("no-title");
    }
}

function buildMilestones() {
    const container = document.getElementById("milestones");
    const validated = getValidated();
    const count = validated.length;
    const claimedCount = getClaimedMilestones();
    container.innerHTML = "";
    updatePlayerTitle();

    // Index du premier palier pas encore atteint → reçoit la barre de progression
    const nextIndex = MILESTONES.findIndex(m => count < m.count);

    // Seul le plus vieux palier claimable (index le plus bas) montre le bouton
    const firstClaimableIndex = MILESTONES.findIndex((m, i) => count >= m.count && i >= claimedCount);

    MILESTONES.forEach((m, index) => {
        const reached   = count >= m.count;
        const claimed   = index < claimedCount;
        const claimable = reached && !claimed;
        const isNext    = index === nextIndex;
        const showClaimBtn = claimable && index === firstClaimableIndex;

        // Barre de progression intégrée dans la carte du prochain palier
        const missing = m.count - count;
        const pct = Math.round((count / m.count) * 100);
        const missingLabel = missing + " film" + (missing > 1 ? "s" : "") + " restant" + (missing > 1 ? "s" : "");
        const progressHTML = isNext ? `
            <div class="mpi-bar-row">
                <div class="mpi-track"><div class="mpi-fill" data-pct="${pct}" style="width:0%"></div></div>
                <span class="mpi-label">${missingLabel}</span>
            </div>
        ` : "";

        const div = document.createElement("div");
        div.className = "milestone";
        if (reached)  div.classList.add("reached");
        if (claimed)  div.classList.add("claimed");
        if (claimable) div.classList.add("claimable");
        if (isNext)   div.classList.add("next");

        if (claimed) {
            div.innerHTML = `
                <div class="milestone-content">
                    <div class="milestone-main-row">
                        <img src="medias/s${m.icon || index + 1}.png" class="milestone-icon" alt="Palier ${m.count}">
                        <div class="milestone-body">
                            <span class="milestone-title">${m.label || `${m.count} succès`}</span>
                        </div>
                        <div class="milestone-status">
                            <span class="milestone-check">&#10003;</span>
                        </div>
                    </div>
                </div>
            `;
        } else {
            const headerClass = (isNext || claimable) ? "milestone-header-accent" : "milestone-header-muted";
            div.innerHTML = `
                <div class="milestone-header ${headerClass}">
                    <span class="milestone-title">${m.label || `${m.count} succès`}</span>
                    ${showClaimBtn ? `<button class="milestone-claim-btn"><img src="medias/gift.gif" class="milestone-claim-icon"> Récupérer la Récompense</button>` : ""}
                </div>
                <div class="milestone-content">
                    <div class="milestone-main-row">
                        <img src="medias/s${m.icon || index + 1}.png" class="milestone-icon" alt="Palier ${m.count}">
                        <div class="milestone-details">
                            ${m.objectif ? `
                            <div class="milestone-col">
                                <span class="milestone-col-label">Objectif</span>
                                <span class="milestone-col-value">${m.objectif}</span>
                            </div>` : ""}
                            <div class="milestone-col2">
                                <span class="milestone-col-label">Récompense</span>
                                <div class="milestone-reward-box">${rewardBadgesHTML(m)}</div>
                            </div>
                        </div>
                    </div>
                    ${progressHTML}
                </div>
            `;
        }

        if (showClaimBtn) {
            div.querySelector(".milestone-claim-btn").addEventListener("click", () => {
                playSound("takeReward");
                saveClaimedMilestones(getClaimedMilestones() + 1);

                const hasSecret = m.secretFilm !== undefined;
                if (hasSecret) {
                    const revealed = getRevealedMysteries();
                    if (!revealed.includes(m.secretFilm)) {
                        revealed.push(m.secretFilm);
                        saveRevealedMysteries(revealed);
                    }
                }

                if (m.jokers) {
                    refJokers.transaction(val => (val || 0) + m.jokers).catch(err => {
                        console.error("Firebase joker error:", err);
                    });
                }

                const hasSpecial = m.rewards && m.rewards.includes("?");
                // Chaîne d'animations : palier → clés → joker → film secret → spécial
                const onAfterJoker = hasSecret ? () => showPosterReveal(m.secretFilm) : hasSpecial ? () => showSecretRewardReveal() : null;
                const onAfterKeys  = m.jokers ? () => setTimeout(() => showJokerReveal(onAfterJoker, m.jokers), 120) : onAfterJoker;
                const startRewards = () => {
                    if (m.keys) {
                        setTimeout(() => showKeyReveal(m.keys, onAfterKeys), 120);
                    } else if (m.jokers) {
                        setTimeout(() => showJokerReveal(onAfterJoker, m.jokers), 120);
                    } else if (hasSecret) {
                        setTimeout(() => showPosterReveal(m.secretFilm), 300);
                    } else if (hasSpecial) {
                        setTimeout(() => showSecretRewardReveal(), 300);
                    }
                };
                setTimeout(() => showMilestoneReveal(m, index, startRewards), 300);
            });
        }

        container.appendChild(div);
    });

    // Anime les barres de progression après insertion dans le DOM
    requestAnimationFrame(() => {
        container.querySelectorAll(".mpi-fill[data-pct]").forEach(el => {
            el.style.width = el.dataset.pct + "%";
        });
    });
}

function updateFilterCounts() {
    const validated = getValidated();
    const revealedMysteries = getRevealedMysteries();
    const counts = { validated: 0, unvalidated: 0, locked: 0, secret: 0 };
    ACHIEVEMENTS.forEach((ach, i) => {
        if (validated.includes(i)) { counts.validated++; return; }
        const stillLocked = (ach.verrouille || ach.secret) && !revealedMysteries.includes(i);
        if (ach.verrouille && stillLocked) { counts.locked++; return; }
        if (ach.secret    && stillLocked) { counts.secret++;  return; }
        counts.unvalidated++;
    });
    ["validated","unvalidated","locked","secret"].forEach(k => {
        const el = document.getElementById(`fc-${k}`);
        if (el) el.textContent = counts[k];
    });
}

function buildGrid() {
    const grid = document.getElementById("grid");
    const validated = getValidated();
    const revealedMysteries = getRevealedMysteries();
    updateFilterCounts();
    grid.innerHTML = "";


    getSortedIndices().forEach(i => {
        const ach = ACHIEVEMENTS[i];
        const isValidated = validated.includes(i);
        const isMystery = ach.verrouille && !isValidated && !revealedMysteries.includes(i);
        const isSecret  = ach.secret     && !isValidated && !revealedMysteries.includes(i);
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.index = i;
        if (isValidated) cell.classList.add("validated");
        if (isMystery)   cell.classList.add("mystery");
        if (isSecret)    cell.classList.add("secret");

        const displayTitle = isMystery ? "Film verrouillé" : isSecret ? "Film secret" : ach.title;

        cell.innerHTML = `
            <img class="cell-icon${isMystery || isSecret ? " cell-icon-locked" : ""}" src="${achImg(i)}" alt="${displayTitle}" loading="lazy">
            ${isMystery ? `<div class="cell-lock-overlay"><img src="medias/lock.png" class="cell-overlay-icon"></div>` : ""}
            ${isSecret  ? `<div class="cell-lock-overlay cell-secret-overlay"><img src="medias/question.png" class="cell-overlay-icon"></div>` : ""}
            <div class="cell-content">
                <div class="cell-info">
                    <span class="cell-number-tag">${i + 1}</span>
                </div>
            </div>
            <div class="cell-status">
            <div class="cell-background">
                <span class="cell-status-label cell-lock-label">${isSecret ? "Secret" : "Verrouillé"}</span>
                <img src="medias/lock.png" class="cell-lock-icon cell-overlay-icon" style="width:16px;height:16px">
            </div>
            <div class="cell-background cell-background-valid">
                <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="currentColor"><path d="m438-452-58-57q-11-11-27.5-11T324-508q-11 11-11 28t11 28l86 86q12 12 28 12t28-12l170-170q12-12 11.5-28T636-592q-12-12-28.5-12.5T579-593L438-452ZM326-90l-58-98-110-24q-15-3-24-15.5t-7-27.5l11-113-75-86q-10-11-10-26t10-26l75-86-11-113q-2-15 7-27.5t24-15.5l110-24 58-98q8-13 22-17.5t28 1.5l104 44 104-44q14-6 28-1.5t22 17.5l58 98 110 24q15 3 24 15.5t7 27.5l-11 113 75 86q10 11 10 26t-10 26l-75 86 11 113q2 15-7 27.5T802-212l-110 24-58 98q-8 13-22 17.5T584-74l-104-44-104 44q-14 6-28 1.5T326-90Zm52-72 102-44 104 44 56-96 110-26-10-112 74-84-74-86 10-112-110-24-58-96-102 44-104-44-56 96-110 24 10 112-74 86 74 84-10 114 110 24 58 96Zm102-318Z"/></svg>
            </div>
            </div>
        `;

        cell.addEventListener("click", () => {
            openModal(i);
        });

        const dbgBtn = document.createElement("button");
        dbgBtn.className = "debug-toggle-btn " + (isValidated ? "dbg-lock" : "dbg-validate");
        dbgBtn.textContent = isValidated ? "Vérrouiller" : "Valider";
        dbgBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            const v = getValidated();
            if (v.includes(i)) {
                saveValidated(v.filter(x => x !== i));
            } else {
                v.push(i);
                saveValidated(v);
            }
        });
        cell.appendChild(dbgBtn);

        grid.appendChild(cell);
    });

    updateCounter();
    buildMilestones();
    updateNextChallengeBanner();
    updateGridHeading();
    firstBuildDone = true;
}

function updateGridHeading() {
    const heading = document.getElementById("grid-heading");
    const banner  = document.getElementById("next-challenge");
    const labels = {
        "all":         "Tous les films",
        "validated":   "Films validés",
        "unvalidated": "Films non validés",
        "locked":      "Films verrouillés",
        "secret":      "Films secrets",
    };
    if (currentFilter.startsWith("genre:")) {
        heading.textContent = currentFilter.slice(6);
    } else {
        heading.textContent = labels[currentFilter] ?? "Tous les films";
    }
    if (currentFilter !== "all") banner.classList.add("hidden");
}

function updateNextChallengeBanner() {
    const banner   = document.getElementById("next-challenge");
    const validated       = getValidated();
    const revealedMysteries = getRevealedMysteries();

    // Premier film disponible (non verrouillé, non secret, non validé)
    const nextIndex = getSortedIndices().find(i => {
        const ach = ACHIEVEMENTS[i];
        const isAvailable = (!ach.verrouille && !ach.secret) || revealedMysteries.includes(i);
        return isAvailable && !validated.includes(i);
    });

    if (nextIndex === undefined) {
        banner.classList.add("hidden");
        return;
    }

    const ach = ACHIEVEMENTS[nextIndex];
    banner.classList.remove("hidden");

    const imgSrc = achImg(nextIndex);
    document.getElementById("nc-poster").src = imgSrc;
    document.getElementById("nc-poster").alt = ach.title;
    document.getElementById("nc-bg").style.backgroundImage = `url(${imgSrc})`;
    document.getElementById("nc-title").textContent = ach.title;

    const ratingEl = document.getElementById("nc-rating");
    if (ach.rating) {
        document.getElementById("nc-rating-value").textContent = ach.rating;
        ratingEl.style.display = "flex";
    } else {
        ratingEl.style.display = "none";
    }

    document.getElementById("nc-poster").onclick       = () => openInfoModal(nextIndex);
    document.getElementById("nc-challenge-btn").onclick = () => openChallengeDirectly(nextIndex);
}

// ===== MODALS =====

let currentIndex = null;
let activeModal = null;

function fillModal(modal, index, forceReveal) {
    const ach = ACHIEVEMENTS[index];
    const num = index + 1;
    const validated = getValidated();
    const revealed = forceReveal || validated.includes(index);
    const isLocked = (ach.verrouille || ach.secret) && !revealed;
    const lockLabel = ach.secret ? "Film secret" : "Film verrouillé";

    modal.querySelector(".modal-number").textContent = num;
    modal.querySelector(".modal-title").textContent = isLocked ? lockLabel : ach.title;

    const icon = modal.querySelector(".modal-icon");
    icon.src = achImg(index);
    icon.alt = isLocked ? lockLabel : ach.title;
    icon.classList.toggle("modal-icon-locked", isLocked);
}

function openAnimatedModal(modalId, index, forceReveal) {
    const modal = document.getElementById(modalId);
    fillModal(modal, index, forceReveal);
    modal.classList.remove("hidden", "anim-out");
    modal.classList.add("anim-in");
    activeModal = modal;
    updateJokerUseBar();
}




function setMenuVisible(_visible) {
    // Menu toujours visible
}

function closeAnimatedModal(callback) {
    if (!activeModal) { if (callback) callback(); return; }
    const modal = activeModal;
    modal.classList.remove("anim-in");
    modal.classList.add("anim-out");

    let done = false;
    function finish() {
        if (done) return;
        done = true;
        modal.classList.add("hidden");
        modal.classList.remove("anim-out");
        activeModal = null;
        modal.removeEventListener("animationend", handler);
        document.getElementById("joker-use-bar").classList.add("hidden");
        if (callback) callback();
        // Réafficher le menu si aucun nouveau modal n'a été ouvert par le callback
        if (!activeModal) setMenuVisible(true);
    }

    function handler(e) {
        if (e.target === modal.querySelector(".modal-content")) {
            finish();
        }
    }

    modal.addEventListener("animationend", handler);
    // Fallback si l'animation ne se déclenche pas
    setTimeout(finish, 400);
}


function openModal(index) {
    openInfoModal(index);
}

function openInfoModal(index, mysteryReveal = false) {
    playSound("click");
    setMenuVisible(false);
    currentIndex = index;
    const ach = ACHIEVEMENTS[index];
    const validated = getValidated();
    const revealedMysteries = getRevealedMysteries();
    const isValidated = validated.includes(index);
    const isRevealedMystery = revealedMysteries.includes(index);
    const isMystery = ach.verrouille && !isValidated && !isRevealedMystery;
    const isSecret  = ach.secret     && !isValidated && !isRevealedMystery;
    const isLocked  = isMystery || isSecret;

    // Fond
    const imgSrc = achImg(index);
    const infoBgEl = document.getElementById("info-bg");
    infoBgEl.style.backgroundImage = `url(${imgSrc})`;
    infoBgEl.style.filter = isLocked ? "blur(25px) brightness(0.35) saturate(0.6)" : "";
    document.getElementById("modal-info").style.setProperty("--modal-poster", `url(${imgSrc})`);
    document.getElementById("info-validated-badge").classList.toggle("hidden", !isValidated);

    // Titre + sous-titre
    const titleEl = document.getElementById("info-title");
    if (isMystery) {
        titleEl.innerHTML = `<img src="medias/lock.png" class="info-title-icon"> Film verrouillé`;
    } else if (isSecret) {
        titleEl.innerHTML = `<img src="medias/question.png" class="info-title-icon"> Film secret`;
    } else {
        titleEl.textContent = ach.title;
    }
    const sousTitreEl = document.getElementById("info-sous-titre");
    if (!isLocked && ach.sousTitre) {
        sousTitreEl.textContent = ach.sousTitre;
        sousTitreEl.classList.remove("hidden");
    } else {
        sousTitreEl.classList.add("hidden");
    }

    // Réalisateur / description / bande annonce / note
    const dirRow    = document.getElementById("info-director-row");
    const descEl    = document.getElementById("info-desc");
    const trailerEl   = document.getElementById("info-trailer");
    const imdbEl      = document.getElementById("info-imdb");
    const posterBtn   = document.getElementById("info-poster-btn");
    const ratingRow = document.getElementById("info-rating-row");
    // Genres + note (affichés pour tous les états)
    buildGenreTags(ach.genres);
    if (ach.rating) {
        document.getElementById("info-rating-value").textContent = ach.rating;
        ratingRow.classList.remove("hidden");
    } else {
        ratingRow.classList.add("hidden");
    }

    if (isSecret) {
        dirRow.style.display      = "none";
        trailerEl.style.display   = "none";
        imdbEl.style.display      = "none";
        posterBtn.style.display   = "none";
        descEl.style.display      = "block";
        descEl.textContent        = "Ce film se débloque en réclamant un palier de récompenses spécifique.";
        document.getElementById("info-desc-more").classList.add("hidden");
    } else if (isMystery) {
        dirRow.style.display      = "none";
        trailerEl.style.display   = "none";
        imdbEl.style.display      = "none";
        posterBtn.style.display   = "none";
        descEl.style.display      = "block";
        descEl.textContent        = "Récupère les récompenses des prochains paliers pour débloquer ce film.";
        document.getElementById("info-desc-more").classList.add("hidden");
    } else {
        dirRow.style.display      = "flex";
        descEl.style.display      = "block";
        trailerEl.style.display   = "flex";
        posterBtn.style.display   = "flex";
        document.getElementById("info-director").textContent = ach.realisateur;
        const MAX_DESC = 120;
        const descMoreBtn = document.getElementById("info-desc-more");
        if (ach.description && ach.description.length > MAX_DESC) {
            descEl.textContent = ach.description.slice(0, MAX_DESC).trimEnd() + "…";
            descMoreBtn.classList.remove("hidden");
            descMoreBtn.onclick = () => openDescModal(ach.title, ach.description);
        } else {
            descEl.textContent = ach.description;
            descMoreBtn.classList.add("hidden");
        }
        trailerEl.href            = ach.turl;
        posterBtn.onclick         = () => openPosterModal(achImg(currentIndex));
        if (ach.imdb) {
            imdbEl.href          = ach.imdb;
            imdbEl.style.display = "flex";
        } else {
            imdbEl.style.display = "none";
        }
    }

    // Bouton CTA selon l'état
    const cta = document.getElementById("info-cta");
    cta.className = "info-cta-btn";
    cta.style.display = "";

    if (isValidated) {
        cta.style.display = "none";
    } else if (isSecret) {
        // Film secret : on ne peut pas le débloquer manuellement
        cta.style.display = "none";
    } else if (isMystery) {
        const points = getAvailablePoints();
        if (points > 0) {
            cta.classList.add("cta-unlock");
            cta.innerHTML = `<img src="medias/delock.png" class="cta-icon"> Débloquer ce film`;
        } else {
            cta.style.display = "none";
        }
    } else {
        cta.classList.add("cta-question");
        cta.innerHTML = ` Accéder au défi`;
    }

    // Easter egg : 10 clics sur l'affiche de Tenacious D active le debug mode
    const infoBg = document.getElementById("info-bg");
    if (!DEBUG_MODE && ach.title && ach.title.includes("Tenacious")) {
        let eggClicks = 0;
        infoBg.onclick = () => {
            eggClicks++;
            if (eggClicks >= 5) {
                infoBg.onclick = null;
                enableDebugMode();
            }
        };
    } else {
        infoBg.onclick = null;
    }

    const modal = document.getElementById("modal-info");
    modal.classList.remove("hidden", "anim-out", "anim-in", "anim-mystery-reveal");
    modal.classList.add(mysteryReveal ? "anim-mystery-reveal" : "anim-in");
    activeModal = modal;
}

function showPosterReveal(index) {
    const ach = ACHIEVEMENTS[index];
    const screen = document.getElementById("poster-reveal-screen");
    const img    = document.getElementById("poster-reveal-img");
    const title  = document.getElementById("poster-reveal-title");

    img.src   = achImg(index);
    img.alt   = ach.title;
    title.textContent = ach.title;

    setMenuVisible(false);
    playSound("unlock");
    screen.classList.remove("hidden");
    // Force reflow then fade in
    requestAnimationFrame(() => {
        requestAnimationFrame(() => screen.classList.add("active"));
    });
}

// ============================================================
//  GAME OVER — Fin de jeu
// ============================================================

function showGameOverDirect() {
    // Affiche instantanément l'écran noir + cœur (si déjà terminé au chargement)
    const screen = document.getElementById("game-over-screen");
    const heart  = document.getElementById("game-over-heart");
    screen.classList.remove("hidden");
    screen.classList.add("active");
    heart.classList.add("visible");
    setMenuVisible(false);
}

function startGameOver() {
    // Sauvegarde en Firebase
    refGameEnded.set(true);

    const screen = document.getElementById("game-over-screen");
    const heart  = document.getElementById("game-over-heart");
    screen.classList.remove("hidden");
    setMenuVisible(false);

    // Lance l'assombrissement progressif (10 secondes)
    requestAnimationFrame(() => {
        requestAnimationFrame(() => screen.classList.add("darkening"));
    });

    // Cœur apparaît 3s après le noir total (10s + 3s = 13s)
    setTimeout(() => heart.classList.add("visible"), 13000);
}

document.getElementById("game-over-heart").addEventListener("click", () => {
    const heart = document.getElementById("game-over-heart");
    heart.classList.add("clicked");
    setTimeout(() => heart.classList.remove("clicked"), 300);

    refHeartClicks.transaction(current => (current || 0) + 1)
        .then(({ committed, snapshot }) => {
            if (committed && snapshot.val() >= 10) {
                refGameEnded.remove();
                refHeartClicks.remove();
                location.reload();
            }
        });
});

let secretRewardStep = 0;

function renderSecretRewardStep(step) {
    const linesEl = document.getElementById("secret-reward-lines");
    const btn     = document.getElementById("secret-reward-next");
    const label   = btn.querySelector(".secret-reward-btn-label");
    const isLast  = step >= SECRET_REWARD_STEPS.length - 1;

    linesEl.classList.add("fading");
    setTimeout(() => {
        linesEl.innerHTML = SECRET_REWARD_STEPS[step].map((line, i) =>
            `<p class="secret-reward-line" style="animation-delay:${i * 0.45}s">${line}</p>`
        ).join("");
        linesEl.classList.remove("fading");
        label.textContent = isLast ? "Terminer" : "Suivant";
    }, 280);
}

function showSuccessAnimation(_index) {
    const screen  = document.getElementById("success-screen");
    const titleEl = document.getElementById("success-title");

    titleEl.textContent = "Défi réussi !";

    screen.classList.remove("hidden");
    void screen.offsetWidth;
    screen.style.animation = "none";
    void screen.offsetWidth;
    screen.style.animation = "successScreenOut 3.5s ease forwards";

    setTimeout(() => {
        screen.classList.add("hidden");
        screen.style.animation = "";
    }, 3550);
}

function showSecretRewardReveal() {
    secretRewardStep = 0;
    const screen  = document.getElementById("secret-reward-screen");
    const linesEl = document.getElementById("secret-reward-lines");
    const btn     = document.getElementById("secret-reward-next");
    const label   = btn.querySelector(".secret-reward-btn-label");

    linesEl.innerHTML = SECRET_REWARD_STEPS[0].map((line, i) =>
        `<p class="secret-reward-line" style="animation-delay:${0.4 + i * 0.45}s">${line}</p>`
    ).join("");
    label.textContent = SECRET_REWARD_STEPS.length > 1 ? "Suivant" : "Terminer";

    setMenuVisible(false);
    playSound("unlock");
    screen.classList.remove("hidden");
    requestAnimationFrame(() => {
        requestAnimationFrame(() => screen.classList.add("active"));
    });
}

document.getElementById("secret-reward-next").addEventListener("click", () => {
    secretRewardStep++;
    if (secretRewardStep < SECRET_REWARD_STEPS.length) {
        renderSecretRewardStep(secretRewardStep);
    } else {
        // Dernière étape : lancer la fin de jeu
        startGameOver();
    }
});

document.getElementById("poster-reveal-next").addEventListener("click", () => {
    const screen = document.getElementById("poster-reveal-screen");
    screen.classList.remove("active");
    let done = false;
    const cleanup = () => {
        if (done) return;
        done = true;
        screen.classList.add("hidden");
        setMenuVisible(true);
    };
    screen.addEventListener("transitionend", function handler() {
        screen.removeEventListener("transitionend", handler);
        cleanup();
    });
    setTimeout(cleanup, 600);
});

let keyRevealCallback = null;

function showKeyReveal(keys, onNext) {
    keyRevealCallback = onNext || null;
    const screen = document.getElementById("key-reveal-screen");
    const badge  = screen.querySelector(".key-reveal-badge");
    const icon   = screen.querySelector(".key-reveal-icon");
    const count  = document.getElementById("key-reveal-count");

    badge.textContent = "Récompense débloquée !";
    icon.innerHTML = `<img src="medias/key.png" class="icon-key icon-key-reveal">`;
    count.textContent = `+${keys} Clé${keys > 1 ? "s" : ""}`;
    setMenuVisible(false);
    screen.classList.remove("hidden");
    requestAnimationFrame(() => {
        requestAnimationFrame(() => screen.classList.add("active"));
    });
}

function showJokerReveal(onNext, jokers = 1) {
    keyRevealCallback = onNext || null;
    const screen = document.getElementById("key-reveal-screen");
    const badge  = screen.querySelector(".key-reveal-badge");
    const icon   = screen.querySelector(".key-reveal-icon");
    const count  = document.getElementById("key-reveal-count");

    badge.textContent = "Joker obtenu !";
    icon.innerHTML    = `<img src="medias/joker.png" class="icon-joker icon-key-reveal">`;
    count.textContent = `+${jokers} Joker${jokers > 1 ? "s" : ""}`;
    setMenuVisible(false);
    screen.classList.remove("hidden");
    requestAnimationFrame(() => {
        requestAnimationFrame(() => screen.classList.add("active"));
    });
}

let milestoneUnlockCallback = null;

function showMilestoneReveal(m, milestoneIndex, onNext) {
    milestoneUnlockCallback = onNext || null;
    const screen = document.getElementById("milestone-unlock-screen");
    document.getElementById("milestone-unlock-img").src = `medias/s${m.icon || milestoneIndex + 1}.png`;
    document.getElementById("milestone-unlock-name").textContent = m.label || `${m.count} succès`;
    setMenuVisible(false);
    screen.classList.remove("hidden");
    requestAnimationFrame(() => {
        requestAnimationFrame(() => screen.classList.add("active"));
    });
}

document.getElementById("milestone-unlock-next").addEventListener("click", () => {
    const screen = document.getElementById("milestone-unlock-screen");
    screen.classList.remove("active");
    let done = false;
    const cleanup = () => {
        if (done) return;
        done = true;
        screen.classList.add("hidden");
        if (milestoneUnlockCallback) {
            const cb = milestoneUnlockCallback;
            milestoneUnlockCallback = null;
            cb();
        }
    };
    screen.addEventListener("transitionend", function handler() {
        screen.removeEventListener("transitionend", handler);
        cleanup();
    });
    setTimeout(cleanup, 500);
});

document.getElementById("key-reveal-next").addEventListener("click", () => {
    const screen = document.getElementById("key-reveal-screen");
    screen.classList.remove("active");
    let done = false;
    const cleanup = () => {
        if (done) return;
        done = true;
        screen.classList.add("hidden");
        if (keyRevealCallback) {
            const cb = keyRevealCallback;
            keyRevealCallback = null;
            cb();
        } else {
            setMenuVisible(true);
        }
    };
    screen.addEventListener("transitionend", function handler() {
        screen.removeEventListener("transitionend", handler);
        cleanup();
    });
    setTimeout(cleanup, 600);
});

function showChallengeIntro(index, callback) {
    const ach   = ACHIEVEMENTS[index];
    const intro = document.getElementById("challenge-intro");
    document.getElementById("challenge-intro-num").textContent = `Défi #${index + 1}`;
    document.getElementById("challenge-intro-title").textContent = ach.title;
    const subEl = document.getElementById("challenge-intro-subtitle");
    if (ach.sousTitre) {
        subEl.textContent = ach.sousTitre;
        subEl.classList.remove("hidden");
    } else {
        subEl.classList.add("hidden");
    }

    intro.classList.remove("hidden", "intro-out");

    setTimeout(() => {
        intro.classList.add("intro-out");
        intro.addEventListener("animationend", () => {
            intro.classList.add("hidden");
            intro.classList.remove("intro-out");
            callback();
        }, { once: true });
    }, 2000);
}

function typewriterEffect(el, text, speed, callback) {
    el.textContent = "";
    let i = 0;
    function next() {
        if (i < text.length) {
            el.textContent += text[i++];
            setTimeout(next, speed);
        } else if (callback) {
            callback();
        }
    }
    next();
}

function startQuestionSequence() {
    const questionEl  = document.getElementById("question-text");
    const rebusEl     = document.getElementById("question-rebus");
    const inputGroup  = document.querySelector("#modal-question .input-group");

    // Tout masquer au départ
    inputGroup.classList.add("q-pending");
    if (!rebusEl.classList.contains("hidden")) rebusEl.classList.add("q-pending");

    // Laisser l'animation d'ouverture du modal se terminer
    setTimeout(() => {
        const afterQuestion = () => {
            if (!rebusEl.classList.contains("hidden")) {
                rebusEl.classList.remove("q-pending");
                rebusEl.classList.add("q-reveal");
                rebusEl.addEventListener("animationend", () => {
                    rebusEl.classList.remove("q-reveal");
                    revealInput(inputGroup);
                }, { once: true });
            } else {
                revealInput(inputGroup);
            }
        };

        if (!questionEl.classList.contains("hidden")) {
            const text = questionEl.dataset.qtext || "";
            typewriterEffect(questionEl, text, 28, afterQuestion);
        } else {
            afterQuestion();
        }
    }, 400);
}

function revealInput(inputGroup) {
    inputGroup.classList.remove("q-pending");
    inputGroup.classList.add("q-reveal");
    inputGroup.addEventListener("animationend", () => {
        inputGroup.classList.remove("q-reveal");
        document.getElementById("answer-input").focus();
    }, { once: true });
}

function openChallengeDirectly(index) {
    currentIndex = index;
    setMenuVisible(false);
    document.getElementById("answer-input").value = "";
    document.getElementById("answer-error").classList.add("hidden");

    const ach = ACHIEVEMENTS[index];
    showChallengeIntro(index, () => {
        const questionEl = document.getElementById("question-text");
        const rebusEl    = document.getElementById("question-rebus");
        if (ach.rebus) {
            rebusEl.src = ach.rebus;
            rebusEl.classList.remove("hidden");
        } else {
            rebusEl.classList.add("hidden");
        }
        if (ach.question) {
            questionEl.dataset.qtext = ach.question;
            questionEl.textContent = "";
            questionEl.classList.remove("hidden");
        } else {
            questionEl.dataset.qtext = "";
            questionEl.classList.add("hidden");
        }
        const qSubEl = document.getElementById("q-subtitle");
        if (ach.sousTitre) { qSubEl.textContent = ach.sousTitre; qSubEl.classList.remove("hidden"); }
        else { qSubEl.classList.add("hidden"); }
        const qImgSrc = achImg(index);
        document.getElementById("modal-question").style.setProperty("--modal-poster", `url(${qImgSrc})`);
        openAnimatedModal("modal-question", index, true);
        startQuestionSequence();
    });
}

function proceedFromInfo() {
    const index     = currentIndex;
    const validated = getValidated();
    const cta       = document.getElementById("info-cta");

    document.getElementById("answer-input").value = "";
    document.getElementById("answer-error").classList.add("hidden");

    if (validated.includes(index)) {
        closeAnimatedModal(() => openAnimatedModal("modal-done", index));
    } else if (cta.classList.contains("cta-unlock")) {
        // Phase 1 : flash doré sur le modal actuel
        const modalContent = document.getElementById("modal-info").querySelector(".modal-content");
        modalContent.classList.add("modal-mystery-unlock");

        // Sauvegarder le déverrouillage
        const revealedMysteries = getRevealedMysteries();
        if (!revealedMysteries.includes(index)) {
            revealedMysteries.push(index);
            saveRevealedMysteries(revealedMysteries);
        }

        // Phase 2 : après le flash, fermer et afficher l'écran de révélation de l'affiche
        setTimeout(() => {
            modalContent.classList.remove("modal-mystery-unlock");
            closeAnimatedModal(() => showPosterReveal(index));
        }, 650);
    } else {
        closeAnimatedModal(() => {
            const ach = ACHIEVEMENTS[index];
            showChallengeIntro(index, () => {
                const questionEl = document.getElementById("question-text");
                const rebusEl    = document.getElementById("question-rebus");
                if (ach.rebus) {
                    rebusEl.src = ach.rebus;
                    rebusEl.classList.remove("hidden");
                } else {
                    rebusEl.classList.add("hidden");
                }
                if (ach.question) {
                    questionEl.dataset.qtext = ach.question;
                    questionEl.textContent = "";
                    questionEl.classList.remove("hidden");
                } else {
                    questionEl.dataset.qtext = "";
                    questionEl.classList.add("hidden");
                }
                const qSubEl = document.getElementById("q-subtitle");
                if (ach.sousTitre) { qSubEl.textContent = ach.sousTitre; qSubEl.classList.remove("hidden"); }
                else { qSubEl.classList.add("hidden"); }
                const qImgSrc = achImg(index);
                document.getElementById("modal-question").style.setProperty("--modal-poster", `url(${qImgSrc})`);
                openAnimatedModal("modal-question", index, true);
                startQuestionSequence();
            });
        });
    }
}

function closeModal() {
    closeAnimatedModal();
    currentIndex = null;
}

// Tolérance : accepte une réponse si elle est à 4 caractères près
function isCloseEnough(input, expected, tolerance) {
    const a = input.toLowerCase();
    const b = expected.toLowerCase();
    if (a === b) return true;

    const len1 = a.length, len2 = b.length;
    const dp = Array.from({ length: len1 + 1 }, () => Array(len2 + 1).fill(0));
    for (let i = 0; i <= len1; i++) dp[i][0] = i;
    for (let j = 0; j <= len2; j++) dp[0][j] = j;
    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            dp[i][j] = Math.min(
                dp[i - 1][j] + 1,
                dp[i][j - 1] + 1,
                dp[i - 1][j - 1] + (a[i - 1] !== b[j - 1] ? 1 : 0)
            );
        }
    }
    return dp[len1][len2] <= tolerance;
}




// Réponse
document.getElementById("answer-submit").addEventListener("click", checkAnswer);
document.getElementById("answer-input").addEventListener("keydown", e => { if (e.key === "Enter") checkAnswer(); });

let cachedJokers = 0;

function updateJokerUseBar() {
    const bar = document.getElementById("joker-use-bar");
    if (!bar) return;
    const questionVisible = !document.getElementById("modal-question").classList.contains("hidden");
    bar.classList.toggle("hidden", !(questionVisible && cachedJokers > 0));
}

document.getElementById("joker-use-btn").addEventListener("click", () => {
    if (cachedJokers <= 0 || currentIndex === null) return;
    refJokers.transaction(val => Math.max(0, (val || 0) - 1)).catch(err => {
        console.error("Firebase joker error:", err);
    });
    playSound("success");
    const validated = getValidated();
    if (!validated.includes(currentIndex)) {
        validated.push(currentIndex);
        saveValidated(validated);
    }
    const idxForAnim = currentIndex;
    document.getElementById("joker-use-bar").classList.add("hidden");
    closeAnimatedModal(() => { currentIndex = null; activeModal = null; buildGrid(); });
    showSuccessAnimation(idxForAnim);
});

function checkAnswer() {
    const input = document.getElementById("answer-input").value.trim();
    const modalEl = document.getElementById("modal-question").querySelector(".modal-content");

    if (isCloseEnough(input, ACHIEVEMENTS[currentIndex].answer, 4)) {
    playSound("success");

        const validated = getValidated();
        if (!validated.includes(currentIndex)) {
            validated.push(currentIndex);
            saveValidated(validated);
        }

        // Animation succès plein écran
        const idxForAnim = currentIndex;
        closeAnimatedModal(() => { currentIndex = null; activeModal = null; buildGrid(); });
        showSuccessAnimation(idxForAnim);

    } else {
    playSound("fail");
        // Animation échec
        modalEl.classList.remove("modal-fail-flash");
        void modalEl.offsetWidth; // force reflow pour relancer l'animation
        modalEl.classList.add("modal-fail-flash");
        document.getElementById("answer-error").classList.remove("hidden");

        setTimeout(() => modalEl.classList.remove("modal-fail-flash"), 500);
    }
}


document.querySelectorAll(".modal-close-btn").forEach(btn => btn.addEventListener("click", closeModal));
document.querySelectorAll(".modal-overlay").forEach(o => o.addEventListener("click", closeModal));

document.getElementById("info-cta").addEventListener("click", proceedFromInfo);

if (DEBUG_MODE) initDebugUI();

// ============================================================
//  NAVIGATION — barre de menu bas
// ============================================================
let currentView = 'films';

function setView(view) {
    if (currentView === view) return;
    playSound("drop");
    const prev = currentView;
    currentView = view;

    document.querySelectorAll(".menu-btn[data-view]").forEach(btn => {
        btn.classList.toggle("nav-active", btn.dataset.view === view);
    });

    // Fermer la vue précédente
    if (prev === 'tierlist') {
        closeTierlist();
    } else if (prev === 'rewards') {
        document.getElementById("sidebar").classList.remove("open");
    }

    // Ouvrir la nouvelle vue
    if (view === 'tierlist') {
        openTierlist();
    } else if (view === 'rewards') {
        document.getElementById("sidebar").classList.add("open");
    }

    // Cacher l'indicateur de clés si tierlist ou récompenses
    const indicator = document.getElementById("mystery-points-indicator");
    if (indicator && !indicator.classList.contains("hidden")) {
        indicator.style.display = (view === 'tierlist' || view === 'rewards') ? 'none' : '';
    }

    // Barre de filtres visible uniquement sur la vue films
    document.getElementById("filter-group").classList.toggle("view-hidden", view !== 'films');

    updateMenuIndicator(view);
}

function updateMenuIndicator(view, instant = false) {
    const bar = document.getElementById("menu-indicator");
    const btn = document.querySelector(`.menu-btn[data-view="${view}"]`);
    const group = document.querySelector(".menu-btn-group");
    if (!bar || !btn || !group) return;

    const groupRect = group.getBoundingClientRect();
    const btnRect   = btn.getBoundingClientRect();
    const newLeft   = btnRect.left - groupRect.left;
    const newWidth  = btnRect.width;

    if (instant || bar.style.left === "") {
        bar.style.transition = "none";
        bar.style.left      = newLeft  + "px";
        bar.style.width     = newWidth + "px";
        bar.style.transform = "translateY(-50%) scaleY(1)";
        return;
    }

    const curLeft  = parseFloat(bar.style.left)  || newLeft;
    const curWidth = parseFloat(bar.style.width) || newWidth;
    const goingRight = newLeft > curLeft;

    // Phase 1 — étirement + écrasement vertical
    const stretchLeft  = goingRight ? curLeft : newLeft;
    const stretchWidth = goingRight
        ? (newLeft + newWidth) - curLeft
        : (curLeft + curWidth) - newLeft;

    bar.style.transition = "left 0.1s ease, width 0.1s ease, transform 0.1s ease";
    bar.style.left      = stretchLeft  + "px";
    bar.style.width     = stretchWidth + "px";
    bar.style.transform = "translateY(-50%) scaleY(0.6)";

    // Phase 2 — snap avec rebond + retour hauteur
    setTimeout(() => {
        bar.style.transition =
            "left 0.26s cubic-bezier(0.34, 1.5, 0.64, 1), " +
            "width 0.26s cubic-bezier(0.34, 1.5, 0.64, 1), " +
            "transform 0.26s cubic-bezier(0.34, 1.6, 0.64, 1)";
        bar.style.left      = newLeft  + "px";
        bar.style.width     = newWidth + "px";
        bar.style.transform = "translateY(-50%) scaleY(1)";
    }, 100);
}

document.querySelectorAll(".menu-btn[data-view]").forEach(btn => {
    btn.addEventListener("click", () => setView(btn.dataset.view));
});

// Grille fixe à 3 colonnes
document.getElementById("grid").classList.add("cols-3");

// Infobulles badges clés / jokers
(function initBadgeTooltips() {
    function makeTooltipToggle(badgeId, tooltipId) {
        const badge   = document.getElementById(badgeId);
        const tooltip = document.getElementById(tooltipId);
        if (!badge || !tooltip) return;

        function openTooltip() {
            tooltip.classList.remove("hidden", "closing");
        }

        function closeTooltip() {
            tooltip.classList.add("closing");
            tooltip.addEventListener("animationend", () => {
                tooltip.classList.add("hidden");
                tooltip.classList.remove("closing");
            }, { once: true });
        }

        badge.addEventListener("click", (e) => {
            e.stopPropagation();
            if (tooltip.classList.contains("hidden")) {
                // Close the other tooltip first
                document.querySelectorAll(".badge-tooltip").forEach(t => {
                    if (t !== tooltip && !t.classList.contains("hidden")) {
                        t.classList.add("closing");
                        t.addEventListener("animationend", () => {
                            t.classList.add("hidden");
                            t.classList.remove("closing");
                        }, { once: true });
                    }
                });
                openTooltip();
            } else {
                closeTooltip();
            }
        });

        document.addEventListener("click", (e) => {
            if (!tooltip.classList.contains("hidden") && !tooltip.contains(e.target) && e.target !== badge) {
                closeTooltip();
            }
        });
    }

    makeTooltipToggle("mystery-points-indicator", "keys-tooltip");
    makeTooltipToggle("jokers-indicator",          "jokers-tooltip");
})();

// Bouton toggle filtre
(function initFilterToggle() {
    const toggleBtn = document.getElementById("filter-toggle-btn");
    const menu      = document.getElementById("filter-menu");

    function openMenu() {
        menu.classList.remove("hidden", "closing");
        toggleBtn.classList.add("active");
    }

    function closeMenu() {
        menu.classList.add("closing");
        toggleBtn.classList.remove("active");
        menu.addEventListener("animationend", () => {
            menu.classList.add("hidden");
            menu.classList.remove("closing");
        }, { once: true });
    }

    toggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (menu.classList.contains("hidden")) {
            playSound("drop2");
            openMenu();
        } else {
            playSound("closedrop1");
            closeMenu();
        }
    });

    document.addEventListener("click", (e) => {
        if (!menu.classList.contains("hidden") && !menu.contains(e.target)) {
            playSound("closedrop1");
            closeMenu();
        }
    });
})();

// Génération dynamique des filtres par genre
(function initGenreFilters() {
    const container = document.getElementById("genre-filter-list");
    const knownGenres = new Set(Object.keys(GENRES));
    const genreCount = {};
    ACHIEVEMENTS.forEach(a => (a.genres || []).forEach(g => {
        if (knownGenres.has(g)) genreCount[g] = (genreCount[g] || 0) + 1;
    }));
    Object.keys(genreCount).sort().forEach(genre => {
        const btn = document.createElement("button");
        btn.className = "filter-btn filter-btn-genre-item";
        btn.dataset.filter = `genre:${genre}`;
        btn.innerHTML = `<span>${genre}</span><span class="filter-genre-count">${genreCount[genre]}</span>`;
        container.appendChild(btn);
    });

    document.getElementById("filter-genre-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        const main = document.getElementById("filter-page-main");
        const genres = document.getElementById("filter-page-genres");
        main.classList.add("slide-out");
        main.addEventListener("animationend", () => {
            main.classList.add("hidden");
            main.classList.remove("slide-out");
            genres.classList.remove("hidden");
            genres.classList.add("slide-in");
            genres.addEventListener("animationend", () => genres.classList.remove("slide-in"), { once: true });
        }, { once: true });
    });
    document.getElementById("filter-back-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        const main = document.getElementById("filter-page-main");
        const genres = document.getElementById("filter-page-genres");
        genres.classList.add("slide-out");
        genres.addEventListener("animationend", () => {
            genres.classList.add("hidden");
            genres.classList.remove("slide-out");
            main.classList.remove("hidden");
            main.classList.add("slide-in");
            main.addEventListener("animationend", () => main.classList.remove("slide-in"), { once: true });
        }, { once: true });
    });
})();

// Boutons de filtre
document.getElementById("filter-menu").addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    const f = btn.dataset.filter;
    if (!f) return;
    playSound("clic1");
    if (currentFilter === f) {
        currentFilter = "all";
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    } else {
        currentFilter = f;
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
    }
    document.getElementById("filter-menu").classList.add("hidden");
    document.getElementById("filter-toggle-btn").classList.remove("active");
    buildGrid();
    triggerGridAnimation();
    window.scrollTo({ top: 0, behavior: "smooth" });
});

function hideFilterIndicator() {}
function updateFilterIndicator() {}

// ============================================================
//  SPLASH SCREEN + INTRO ANIMATION
// ============================================================
let splashDone = false;
let splashCanDismiss = false;
let firstBuildDone = false;
let gridAnimStarted = false;

function startGridIntroAnimation() {
    if (gridAnimStarted) return;
    gridAnimStarted = true;
    const cells = [...document.querySelectorAll("#grid .cell")];
    cells.forEach((cell, i) => {
        cell.style.setProperty("--cell-delay", (i * 0.05) + "s");
        cell.classList.add("cell-intro");
    });
    setTimeout(() => {
        cells.forEach(c => c.classList.remove("cell-intro"));
    }, 3000);
}

function triggerGridAnimation() {
    gridAnimStarted = false;
    startGridIntroAnimation();
}

// ============================================================
//  MODAL AFFICHE PLEIN ÉCRAN
// ============================================================
function openDescModal(title, description) {
    document.getElementById("modal-desc-title").textContent = title;
    document.getElementById("modal-desc-body").textContent = description;
    document.getElementById("modal-desc").classList.remove("hidden");
    requestAnimationFrame(() => document.getElementById("modal-desc").classList.add("visible"));
}

function closeDescModal() {
    const modal = document.getElementById("modal-desc");
    modal.classList.remove("visible");
    modal.addEventListener("transitionend", () => modal.classList.add("hidden"), { once: true });
}

document.getElementById("modal-desc-close").addEventListener("click", closeDescModal);
document.getElementById("modal-desc-overlay").addEventListener("click", closeDescModal);

function openPosterModal(src) {
    const modal = document.getElementById("modal-poster");
    const img   = document.getElementById("modal-poster-img");
    img.src = src;
    modal.classList.remove("hidden");
    requestAnimationFrame(() => modal.classList.add("visible"));
}

(function initPosterModal() {
    const modal    = document.getElementById("modal-poster");
    const closeBtn = document.querySelector(".modal-poster-close");
    const img      = document.getElementById("modal-poster-img");

    // Fermeture
    const close = () => {
        modal.classList.remove("visible");
        modal.addEventListener("transitionend", () => modal.classList.add("hidden"), { once: true });
    };
    closeBtn.addEventListener("click", close);
    modal.addEventListener("click", (e) => { if (e.target === modal) close(); });

    // Effet 3D
    const MAX_TILT = 22;
    let isDragging = false;

    const resetTransform = () => {
        img.classList.remove("grabbing");
        img.style.transform = "scale(1)";
        img.style.boxShadow = "0 24px 80px rgba(0,0,0,0.8)";
    };

    img.addEventListener("mousedown", (e) => {
        if (e.button !== 0) return;
        isDragging = true;
        img.classList.add("grabbing");
        e.preventDefault();
    });

    window.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const rect   = img.getBoundingClientRect();
        const cx     = rect.left + rect.width  / 2;
        const cy     = rect.top  + rect.height / 2;
        const dx     = (e.clientX - cx) / (rect.width  / 2);
        const dy     = (e.clientY - cy) / (rect.height / 2);
        const rotY   =  dx * MAX_TILT;
        const rotX   = -dy * MAX_TILT;
        const depth  = Math.sqrt(dx * dx + dy * dy) * 8;
        img.style.transform  = `scale(1.03) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        img.style.boxShadow  = `${-rotY * 0.8}px ${rotX * 0.8 + depth + 20}px ${60 + depth * 3}px rgba(0,0,0,0.9)`;
        img.style.transition = "box-shadow 0.05s ease";
    });

    window.addEventListener("mouseup", () => {
        if (!isDragging) return;
        isDragging = false;
        img.style.transition = "transform 0.5s cubic-bezier(0.34, 1.3, 0.64, 1), box-shadow 0.4s ease";
        resetTransform();
    });
})();

// ============================================================
//  DIDACTICIEL
// ============================================================
const TUTORIAL_PHASE2_STEPS = [
    { text: "Ici tu retrouveras tous les films disponibles et tu pourras accéder à tous les défis !", view: "films" },
    { text: "Ici tu retrouveras les récompenses et succès\nà débloquer lors de ta progression.", view: "rewards" },
    { text: "Et ici tu pourras classer tes films\ndans une tierlist ! Trop bien !", view: "tierlist" },
];
const TUTORIAL_PHASE2_FINAL = [
    { text: "Voilà, tu sais maintenant deux trois trucs sur cette application.", img: "medias/mage.gif"  },
    { text: "Mais tu n'a pas encore tous découvert.", img: "medias/mage.gif" },
    { text: "Maintenant je te laisse la explorer le reste plus en détail !",  img: "medias/mage.gif"  },
    { text: "Amuse-toi bien !",  img: "medias/mage.gif"  },
];

let tutorialPhase2Step = 0;
let tutorialFinalStep  = 0;

function showTutorialGuideStep(index) {
    const step   = TUTORIAL_PHASE2_STEPS[index];
    const guide  = document.getElementById("tutorial-guide");
    const textEl = document.getElementById("tutorial-guide-text");
    const btn    = document.getElementById("tutorial-guide-next");

    btn.textContent = "Suivant";

    if (guide.classList.contains("hidden")) {
        // Première apparition
        textEl.textContent = step.text;
        guide.classList.remove("hidden", "tuto-guide-out");
        setView(step.view);
    } else {
        // Transition : out → changer → in
        guide.classList.add("tuto-guide-out");
        setTimeout(() => {
            textEl.textContent = step.text;
            setView(step.view);
            guide.classList.remove("tuto-guide-out");
        }, 280);
    }
}

function startTutorialPhase2() {
    tutorialPhase2Step = 0;
    showTutorialGuideStep(0);

    document.getElementById("tutorial-guide-next").addEventListener("click", function onGuideNext() {
        tutorialPhase2Step++;
        if (tutorialPhase2Step < TUTORIAL_PHASE2_STEPS.length) {
            showTutorialGuideStep(tutorialPhase2Step);
        } else {
            // Masquer la barre et afficher l'écran final
            document.getElementById("tutorial-guide-next").removeEventListener("click", onGuideNext);
            const guide = document.getElementById("tutorial-guide");
            guide.classList.add("tuto-guide-out");
            setTimeout(() => {
                guide.classList.add("hidden");
                guide.classList.remove("tuto-guide-out");
                showTutorialFinal();
            }, 280);
        }
    });
}

function showTutorialFinal() {
    tutorialFinalStep = 0;
    const overlay = document.getElementById("tutorial-final");
    const textEl  = document.getElementById("tutorial-final-text");
    const imgEl   = document.getElementById("tutorial-final-img");
    const btn     = document.getElementById("tutorial-final-next");
    const box     = overlay.querySelector(".tutorial-box");

    overlay.classList.remove("hidden");
    overlay.style.opacity = "0";
    overlay.offsetWidth;
    overlay.style.transition = "opacity 0.6s ease";
    overlay.style.opacity = "1";

    const showFinalStep = (first = false) => {
        const step   = TUTORIAL_PHASE2_FINAL[tutorialFinalStep];
        const isLast = tutorialFinalStep >= TUTORIAL_PHASE2_FINAL.length - 1;
        btn.textContent = isLast ? "Terminer !" : "Suivant";
        applyTutorialImg(imgEl, step.img);

        if (first) {
            box.style.transition = "none";
            box.style.opacity    = "0";
            box.style.transform  = "translateY(20px)";
            box.offsetWidth;
            box.style.transition = "opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
            box.style.opacity    = "1";
            box.style.transform  = "translateY(0)";
            setTimeout(() => typewrite(textEl, step.text), 200);
        } else {
            box.style.transition = "opacity 0.18s ease, transform 0.18s ease";
            box.style.opacity    = "0";
            box.style.transform  = "translateY(-10px)";
            setTimeout(() => {
                textEl.textContent = "";
                box.style.transition = "none";
                box.style.transform  = "translateY(14px)";
                box.offsetWidth;
                box.style.transition = "opacity 0.3s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)";
                box.style.opacity    = "1";
                box.style.transform  = "translateY(0)";
                setTimeout(() => typewrite(textEl, step.text), 150);
            }, 200);
        }
    };

    showFinalStep(true);

    btn.addEventListener("click", function onFinalNext() {
        tutorialFinalStep++;
        if (tutorialFinalStep < TUTORIAL_PHASE2_FINAL.length) {
            showFinalStep();
        } else {
            btn.removeEventListener("click", onFinalNext);
            refTutorialDone.set(2).then(() => location.reload());
        }
    });
}
const TUTORIAL_STEPS = [
    { text: "Bienvenue !\n mon nom est Gimijimotolototolopov", img: "medias/mage.gif" },
    { text: "C'est un long prénom", img: "medias/mage.gif" },
    { text: "Comme c'est la première fois que tu utilises cette application je vais te guider !", img: "medias/mage.gif" },
    { text: "Pour commencer \nj'ai besoin de connaitre ton prénom", img: "medias/mage.gif" },
    { text: "Entrez votre prénom", fakeInput: true, img: "medias/idcard.png" },
    { text: "Matthias !\n Wow quel beau prénom !", img: "medias/mage.gif" },
    { text: "Ça tombe super bien\n car tu es sur le point de découvrir un jeu fantastique ..", img: "medias/mage.gif" },
    { text: "Le jeu des films de Matthias !", img: "medias/mage.gif" },
    { text: "Allez, je vais te montrer \ncomment ça marche !", last: true, img: "medias/mage.gif" },
];

let tutorialStep = 0;

let _typewriterTimer = null;
function typewrite(el, text, speed = 10) {
    if (_typewriterTimer) clearInterval(_typewriterTimer);
    el.textContent = "";
    let i = 0;
    _typewriterTimer = setInterval(() => {
        el.textContent += text[i++];
        if (i >= text.length) clearInterval(_typewriterTimer);
    }, speed);
}

function applyTutorialImg(imgEl, src) {
    const show = () => {
        imgEl.src = src;
        imgEl.classList.remove("hidden");
        imgEl.style.transition = "opacity 0.2s ease";
        imgEl.style.opacity = "1";
    };

    if (!src) {
        imgEl.style.transition = "opacity 0.2s ease";
        imgEl.style.opacity = "0";
        setTimeout(() => {
            imgEl.classList.add("hidden");
            imgEl.src = "";
        }, 200);
    } else if (imgEl.classList.contains("hidden") || !imgEl.src) {
        imgEl.style.opacity = "0";
        show();
    } else {
        // image déjà visible → fondu sortant puis entrant
        imgEl.style.transition = "opacity 0.2s ease";
        imgEl.style.opacity = "0";
        setTimeout(() => show(), 200);
    }
}

function showTutorialStep(index) {
    const step      = TUTORIAL_STEPS[index];
    const box       = document.querySelector("#tutorial-overlay .tutorial-box");
    const textEl    = document.getElementById("tutorial-text");
    const imgEl     = document.getElementById("tutorial-img");
    const fakeInput = document.getElementById("tutorial-fake-input");
    const nextBtn   = document.getElementById("tutorial-next-btn");

    const isFirst = index === 0;

    if (isFirst) {
        // Premier affichage : slide in depuis le bas
        box.style.transition = "none";
        box.style.opacity    = "0";
        box.style.transform  = "translateY(20px)";
        box.offsetWidth;
        box.style.transition = "opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
        box.style.opacity    = "1";
        box.style.transform  = "translateY(0)";
        applyTutorialImg(imgEl, step.img);
        setTimeout(() => typewrite(textEl, step.text), 200);
        fakeInput.classList.toggle("hidden", !step.fakeInput);
        nextBtn.classList.toggle("hidden", !!step.fakeInput);
        if (!step.fakeInput) nextBtn.textContent = step.last ? "C'est parti !" : "Suivant";
    } else {
        // Slide out vers le haut + fade, puis slide in depuis le bas
        box.style.transition = "opacity 0.18s ease, transform 0.18s ease";
        box.style.opacity    = "0";
        box.style.transform  = "translateY(-10px)";

        setTimeout(() => {
            textEl.textContent = "";
            applyTutorialImg(imgEl, step.img);
            fakeInput.classList.toggle("hidden", !step.fakeInput);
            nextBtn.classList.toggle("hidden", !!step.fakeInput);
            if (!step.fakeInput) nextBtn.textContent = step.last ? "C'est parti !" : "Suivant";

            box.style.transition = "none";
            box.style.transform  = "translateY(14px)";
            box.offsetWidth;
            box.style.transition = "opacity 0.3s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)";
            box.style.opacity    = "1";
            box.style.transform  = "translateY(0)";
            setTimeout(() => typewrite(textEl, step.text), 150);
        }, 200);
    }
}

function advanceTutorial() {
    tutorialStep++;
    if (tutorialStep >= TUTORIAL_STEPS.length) {
        refTutorialDone.set(1).then(() => location.reload());
        return;
    }
    showTutorialStep(tutorialStep);
}

function showQrIntro(onDone) {
    const screen  = document.getElementById("qr-intro-screen");
    const img     = document.getElementById("qr-intro-img");
    const barWrap = screen.querySelector(".qr-intro-bar-wrap");
    const bar     = document.getElementById("qr-intro-bar");

    screen.classList.remove("hidden");

    // Image apparaît en fondu après 200ms
    setTimeout(() => {
        img.classList.add("visible");
    }, 200);

    // Barre apparaît puis démarre sa progression
    setTimeout(() => {
        barWrap.classList.add("visible");
        requestAnimationFrame(() => requestAnimationFrame(() => {
            bar.style.width = "100%";
        }));
    }, 600);

    // Après 5s + 600ms : fondu sortant du contenu sur 3s, fond reste
    setTimeout(() => {
        img.style.transition = "opacity 3s ease";
        img.style.opacity = "0";
        barWrap.style.transition = "opacity 3s ease";
        barWrap.style.opacity = "0";
        setTimeout(() => {
            screen.classList.add("hidden");
            onDone();
        }, 3000);
    }, 5600);
}

function startTutorial() {
    const overlay = document.getElementById("tutorial-overlay");
    overlay.classList.remove("hidden", "tuto-out");
    tutorialStep = 0;
    showTutorialStep(0);

    document.getElementById("tutorial-fake-input").addEventListener("click", advanceTutorial);
    document.getElementById("tutorial-next-btn").addEventListener("click", advanceTutorial);
}


function onSplashDone(afterCallback) {
    if (splashDone) return;
    if (!splashCanDismiss) {
        setTimeout(() => onSplashDone(afterCallback), 100);
        return;
    }
    splashDone = true;
    const splash = document.getElementById("splash");
    if (splash) splash.remove();
    document.body.classList.remove("splash-active");
    if (!gridAnimStarted && !tutorialActive) startGridIntroAnimation();
    if (afterCallback) afterCallback();
}

// Orchestration du splash — tourne en arrière-plan, le tutoriel passe en premier
let tutorialActive = false;

(function initApp() {
    // 1. Vérifier Firebase pour le tutoriel dès que possible
    refTutorialDone.once("value").then(snap => {
        const phase = snap.val() || 0;

        if (phase === 0) {
            // Phase 1 : intro — QR code d'abord
            tutorialActive = true;
            const splash = document.getElementById("splash");
            if (splash) splash.style.display = "none";
            document.body.classList.remove("splash-active");
            splashCanDismiss = true;
            splashDone = true;
            showQrIntro(startTutorial);

        } else if (phase === 1) {
            // Phase 2 : visite guidée — lancer après le splash normal
            initSplash(() => startTutorialPhase2());

        } else {
            // Tutoriel terminé → flux normal
            initSplash();
        }
    }).catch(() => initSplash());

    function initSplash(afterCallback) {
        const splash = document.getElementById("splash");
        if (!splash) { splashCanDismiss = true; onSplashDone(afterCallback); return; }
        setTimeout(() => {
            splash.classList.add("splash-fade");
            splashCanDismiss = true;
            splash.addEventListener("transitionend", () => onSplashDone(afterCallback), { once: true });
            setTimeout(() => onSplashDone(afterCallback), 600);
        }, 800);
    }
})();

// bfcache : si la page est restaurée depuis le cache du navigateur, supprimer le splash
window.addEventListener("pageshow", (e) => {
    if (e.persisted) {
        splashCanDismiss = true;
        const splash = document.getElementById("splash");
        if (splash) splash.remove();
    }
});

// Pause des animations infinies quand l'onglet est en arrière-plan
document.addEventListener("visibilitychange", () => {
    document.body.classList.toggle("tab-hidden", document.hidden);
});

// Init : afficher la grille immédiatement, Firebase la mettra à jour ensuite
buildGrid();

// Init modal couleur accent
initAccentColorModal();

// Init indicateur de menu
requestAnimationFrame(() => updateMenuIndicator(currentView));

// Init visibilité barre de filtres
document.getElementById("filter-group").classList.toggle("view-hidden", currentView !== "films");

// ===== SCROLL — Masquer la sort-bar au scroll bas, révéler au scroll haut =====
// Principe : on ne change d'état qu'après 30px de scroll vers le bas,
// ou 15px vers le haut. Cela absorbe l'inertie et empêche tout glitch.
const stickyControls = document.querySelector(".sticky-controls");
let sortHidden = false;
let lastDecisionY = window.scrollY;



// ============================================================
//  TIER LIST
// ============================================================
let tlDragIdx    = null;  // index du film en cours de drag
let tlSelectedIdx = null; // index sélectionné (mode tap mobile)

function tlBankSetVisible(visible) {
    const bankArea = document.querySelector(".tl-bank-area");
    if (!bankArea) return;
    if (visible) {
        bankArea.classList.remove("hidden", "leaving");
        void bankArea.offsetWidth; // reflow
        bankArea.classList.add("entering");
        bankArea.addEventListener("animationend", () => bankArea.classList.remove("entering"), { once: true });
    } else {
        bankArea.classList.remove("entering");
        bankArea.classList.add("leaving");
        bankArea.addEventListener("animationend", () => {
            bankArea.classList.remove("leaving");
            bankArea.classList.add("hidden");
        }, { once: true });
    }
}

function openTierlist() {
    const modal = document.getElementById("modal-tierlist");
    modal.classList.remove("hidden");
    modal.offsetHeight; // force reflow pour déclencher la transition
    modal.classList.add("tl-open");
    buildTierlistUI();
}
function closeTierlist() {
    const modal = document.getElementById("modal-tierlist");
    modal.classList.remove("tl-open");
    modal.addEventListener("transitionend", () => {
        modal.classList.add("hidden");
    }, { once: true });
    tlSelectedIdx = null;
}

// Crée une carte film draggable
function makeTlCard(idx) {
    const ach  = ACHIEVEMENTS[idx];
    const card = document.createElement("div");
    card.className   = "tl-card";
    card.draggable   = true;
    card.dataset.idx = idx;
    card.innerHTML   = `<img src="${achImg(idx)}" alt="${ach.title}" loading="lazy"><span class="tl-card-name">${ach.title}</span>`;

    // ---- Drag & Drop (desktop) ----
    card.addEventListener("dragstart", (e) => {
        tlDragIdx = idx;
        card.classList.add("tl-dragging");
        e.dataTransfer.effectAllowed = "move";
        const ba = document.querySelector(".tl-bank-area");
        if (ba && ba.classList.contains("hidden")) tlBankSetVisible(true);
    });
    card.addEventListener("dragend", () => {
        tlDragIdx = null;
        card.classList.remove("tl-dragging");
        document.querySelectorAll(".tl-drag-over").forEach(el => el.classList.remove("tl-drag-over"));
        if (document.getElementById("tl-bank").children.length === 0) {
            tlBankSetVisible(false);
        }
    });

    // ---- Double-clic : retirer du tier ----
    card.addEventListener("dblclick", () => {
        if (idx in cachedTierlist) placeTlFilm(idx, 0);
    });

    // ---- Tap mobile : sélectionner puis placer ----
    card.addEventListener("click", (e) => {
        if (!("ontouchstart" in window)) return;
        e.stopPropagation();
        if (tlSelectedIdx === idx) {
            tlSelectedIdx = null;
            card.classList.remove("tl-selected");
            document.querySelectorAll(".tl-row-drop").forEach(z => z.classList.remove("tl-drop-ready"));
        } else {
            document.querySelectorAll(".tl-selected").forEach(c => c.classList.remove("tl-selected"));
            tlSelectedIdx = idx;
            card.classList.add("tl-selected");
            document.querySelectorAll(".tl-row-drop").forEach(z => z.classList.add("tl-drop-ready"));
        }
    });

    return card;
}

// LOTR : tout film dont le titre contient "Seigneur" doit être au moins en A (num 2)
const LOTR_MIN_TIER = 2;
function isLotrFilm(idx) {
    return ACHIEVEMENTS[idx]?.title?.toLowerCase().includes("seigneur") ?? false;
}
function placeTlFilm(idx, requestedTier) {
    const effectiveTier = (isLotrFilm(idx) && requestedTier > LOTR_MIN_TIER) ? LOTR_MIN_TIER : requestedTier;
    if (effectiveTier === 0) delete cachedTierlist[idx];
    else cachedTierlist[idx] = effectiveTier;
    saveTierlist();
    buildTierlistUI();
    if (effectiveTier !== requestedTier) {
        // Animer la carte qui a été redirigée vers A
        const card = document.querySelector(`.tl-card[data-idx="${idx}"]`);
        if (card) {
            card.classList.add("lotr-redirect");
            card.addEventListener("animationend", () => card.classList.remove("lotr-redirect"), { once: true });
        }
    }
}

// Attache les événements drag/drop et tap sur une zone de dépôt
function setupTlDropZone(el, tierNum) {
    el.addEventListener("dragover", (e) => {
        if (tlDragIdx === null) return;
        e.preventDefault();
        el.classList.add("tl-drag-over");
    });
    el.addEventListener("dragleave", (e) => {
        if (!el.contains(e.relatedTarget)) el.classList.remove("tl-drag-over");
    });
    el.addEventListener("drop", (e) => {
        e.preventDefault();
        el.classList.remove("tl-drag-over");
        if (tlDragIdx === null) return;
        placeTlFilm(tlDragIdx, tierNum);
    });
    // Tap mobile : placer la carte sélectionnée
    el.addEventListener("click", () => {
        if (tlSelectedIdx === null) return;
        const idx = tlSelectedIdx;
        tlSelectedIdx = null;
        document.querySelectorAll(".tl-row-drop").forEach(z => z.classList.remove("tl-drop-ready"));
        placeTlFilm(idx, tierNum);
    });
}

// (Re)construit l'UI complète de la tier list
function buildTierlistUI() {
    const validated  = new Set(getValidated());
    const placed     = new Set(Object.keys(cachedTierlist).map(Number));

    // — Tier rows —
    const rowsEl = document.getElementById("tl-rows");
    rowsEl.innerHTML = "";
    TIERS.forEach(tier => {
        const row   = document.createElement("div");
        row.className = "tl-row";

        const label = document.createElement("div");
        label.className = "tl-row-label " + (tier.dark ? "tl-dark" : "tl-light");
        label.style.setProperty("--tc", tier.color);
        label.innerHTML = `<span class="tl-tier-num">${tier.rank}</span><span class="tl-tier-name">${tier.label}</span>`;

        const drop = document.createElement("div");
        drop.className   = "tl-row-drop";
        drop.dataset.tier = tier.num;
        setupTlDropZone(drop, tier.num);

        Object.entries(cachedTierlist).forEach(([i, t]) => {
            if (t === tier.num && validated.has(Number(i))) drop.appendChild(makeTlCard(Number(i)));
        });

        row.appendChild(label);
        row.appendChild(drop);
        rowsEl.appendChild(row);
    });

    // — Banque de films —
    const bank     = document.getElementById("tl-bank");
    const bankArea = bank.closest(".tl-bank-area");
    bank.innerHTML = "";
    const unplaced = ACHIEVEMENTS.map((_, i) => i).filter(i => validated.has(i) && !placed.has(i));

    const wasHidden = bankArea.classList.contains("hidden");
    const shouldShow = unplaced.length > 0;
    if (shouldShow && wasHidden) tlBankSetVisible(true);
    else if (!shouldShow && !wasHidden) tlBankSetVisible(false);
    else if (!shouldShow) bankArea.classList.add("hidden");

    unplaced.forEach(i => bank.appendChild(makeTlCard(i)));
}

// Init (appelé une fois — les drop zones permanentes et listeners)
function initTierlist() {
    setupTlDropZone(document.getElementById("tl-bank"), 0);
}

initTierlist();

// ============================================================
//  FÉE SURPRISE
// ============================================================
(function initPerso() {
    const wrap = document.getElementById("perso-wrap");
    let hideTimer = null;
    let showTimer = null;
    let activeSide = "left";
    let popCount = 0;
    const MAX_POPS = 3;

    // --- Helpers localStorage ---
    function todayStr() {
        const d = new Date();
        return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    }
    function getPopsToday() {
        if (localStorage.getItem("persoDay") !== todayStr()) return 0;
        return parseInt(localStorage.getItem("persoCount") || "0", 10);
    }
    function savePop() {
        localStorage.setItem("persoDay", todayStr());
        localStorage.setItem("persoCount", String(getPopsToday() + 1));
    }

    // --- Fenêtre horaire 22h00-23h30 ---
    function msUntilWindow() {
        const now  = new Date();
        const mins = now.getHours() * 60 + now.getMinutes();
        if (mins >= 22 * 60) return 0;
        const target = new Date(now);
        target.setHours(22, 0, 0, 0);
        return target - now;
    }
    function inWindow() {
        const mins = new Date().getHours() * 60 + new Date().getMinutes();
        return mins >= 22 * 60 && mins < 23 * 60 + 30; // 22h00 – 23h30
    }

    // --- Transforms ---
    function sideRotate(side) {
        return side === "left" ? "rotate(30deg)" : "scaleX(-1) rotate(30deg)";
    }
    function applyTransform(slideIn) {
        const peek   = activeSide === "left" ? "-38%" : "38%";
        const hidden = activeSide === "left" ? "-100%" : "100%";
        const slide  = slideIn ? peek : hidden;
        wrap.style.transform = `translateX(${slide}) ${sideRotate(activeSide)}`;
    }

    // --- Cycle ---
    function show(force = false) {
        if (!force && (!inWindow() || popCount >= MAX_POPS)) return;

        const side = Math.random() < 0.5 ? "left" : "right";
        const yPct = 8 + Math.random() * 74;
        activeSide = side;

        wrap.style.top        = yPct + "vh";
        wrap.style.left       = side === "left"  ? "0" : "auto";
        wrap.style.right      = side === "right" ? "0" : "auto";
        wrap.style.transition = "none";
        applyTransform(false);

        wrap.classList.remove("perso-hidden");
        wrap.offsetWidth;
        wrap.style.transition = "transform 0.45s cubic-bezier(0.34, 1.4, 0.64, 1), opacity 0.3s ease";
        wrap.style.opacity    = "1";
        applyTransform(true);

        popCount++;
        savePop();

        hideTimer = setTimeout(slideOut, 3000);
    }

    function slideOut() {
        wrap.style.transition = "transform 0.3s ease, opacity 0.3s ease";
        applyTransform(false);
        wrap.style.opacity = "0";

        if (popCount < MAX_POPS && inWindow()) {
            showTimer = setTimeout(show, 1300 + Math.random() * 3000);
        } else {
            setTimeout(() => wrap.classList.add("perso-hidden"), 400);
        }
    }

    function catchPerso() {
        clearTimeout(hideTimer);
        clearTimeout(showTimer);

        wrap.style.transition = "transform 0.2s ease, opacity 0.2s ease";
        wrap.style.transform  = `${sideRotate(activeSide)} scale(0.3)`;
        wrap.style.opacity    = "0";
        setTimeout(() => wrap.classList.add("perso-hidden"), 220);

        // Marquer comme attrapé définitivement
        localStorage.setItem("persoCaught", "true");

        // Récompense Joker
        refJokers.transaction(val => (val || 0) + 1).catch(err => {
            console.error("Firebase joker error:", err);
        });
        showJokerReveal();
        // Pas de reprise — le pop a déjà été compté dans show()
    }

    wrap.addEventListener("click", catchPerso);

    // --- Démarrage ---
    if (localStorage.getItem("persoCaught") === "true") return; // attrapé une fois, fini pour toujours
    popCount = getPopsToday();
    if (popCount >= MAX_POPS) return; // quota épuisé pour aujourd'hui

    const delay = msUntilWindow();
    if (delay > 0) {
        // Pas encore 22h — planifier pour l'ouverture de la fenêtre
        showTimer = setTimeout(() => {
            popCount = getPopsToday(); // re-vérifier au moment de démarrer
            if (popCount < MAX_POPS) showTimer = setTimeout(show, 3000 + Math.random() * 4000);
        }, delay);
    } else {
        // Déjà dans la fenêtre — démarrage aléatoire rapide
        showTimer = setTimeout(show, 3000 + Math.random() * 4000);
    }

    // Exposé pour le debug
    window._debugShowFairy = () => show(true);
})();
