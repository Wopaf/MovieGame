// ============================================================
//  CONFIGURATION FIREBASE — Remplacer par tes identifiants
// ============================================================
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyBsjr0peOj1jFPhAA080MWuUGlyYapjxn0",
    authDomain: "moviegame-1b838.firebaseapp.com",
    databaseURL: "https://moviegame-1b838-default-rtdb.firebaseio.com",
    projectId: "moviegame-1b838",
    storageBucket: "moviegame-1b838.firebasestorage.app",
    messagingSenderId: "448540908211",
    appId: "1:448540908211:web:894cb1e8c38d59c4a9eec6"
};


// ============================================================
//  PALIERS / OBJECTIFS — Modifier ici facilement
// ============================================================
const MILESTONES = [
    { count: 5,  reward: "Tu peux gratter la case numéro 13 ou 15" },
    { count: 10, reward: "Tu peux gratter la case numéro 13 ou 15" },
    { count: 15, reward: "Tu peux gratter la case numéro 17 ou 25" },
    { count: 20, reward: "Tu peux gratter la case numéro 17 ou 25" },
    { count: 25, reward: "Tu peux gratter la case numéro 36 ou 48" },
    { count: 30, reward: "Tu peux gratter la case numéro 36 ou 48" },
    { count: 35, reward: "Tu peux gratter la case numéro 51 ou 53" },
    { count: 40, reward: "Tu peux gratter la case numéro 51 ou 53" },
    { count: 50, reward: "Tu peux gratter la case numéro 54 ou 59" },
    { count: 65, reward: "Tu peux gratter la case numéro 70" },
];

// ============================================================
//  DONNÉES DES SUCCÈS — Modifier ici facilement
//  mystery : true = caché tant que le mot de passe n'est pas entré
// ============================================================
const ACHIEVEMENTS = [
    { title: "Le Seigneur des anneaux La communauté de l'anneau", password: "X8q", question: "Comment s'appelle l'auberge où les Hobbits doivent retrouver Gandalf à Brie ?", answer: "Le Poney Fringant", mystery: false },
    { title: "Le Seigneur des anneaux Les deux tours", password: "v2M", question: "Quel peuple de cavaliers est dirigé par le roi Théoden ?", answer: "Les Rohirrim", mystery: false },
    { title: "Le Seigneur des anneaux Le retour du roi", password: "7pL", question: "Quelle est la dernière phrase d'Aragorn aux Hobbits lors de son couronnement ?", answer: "Vous ne vous inclinez devant personne", mystery: false },
    { title: "Interstelar", password: "4kZ", question: "Quel est le nom de la station spatiale que Cooper tente de rattraper en plein mouvement de rotation ?", answer: "Endurance", mystery: false },
    { title: "Forest Gump", password: "1nS", question: "Quelle marque de chaussures Jenny offre-t-elle à Forrest avant qu'il ne commence à courir ?", answer: "Nike", mystery: false },
    { title: "Her", password: "8bY", question: "Quel est le nom de l'ex-femme de Theodore avec qui il doit signer les papiers du divorce ?", answer: "Catherine", mystery: false },
    { title: "Matrix 1", password: "5hW", question: "Comment s'appelle le vaisseau dirigé par Morpheus ?", answer: "Nebuchadnezzar", mystery: false },
    { title: "Matrix 2", password: "3dR", question: "Selon l'Architecte, à quelle version de la Matrice Néo appartient-il ?", answer: "La sixième", mystery: false },
    { title: "Matrix 3", password: "6uF", question: "Quelle est la condition finale imposée par Néo aux Machines pour arrêter Smith ?", answer: "La Paix", mystery: false },
    { title: "10 Cloverfield Lane", password: "9jN", question: "À quel jeu de société Howard, Emmett et Michelle jouent-ils dans le bunker ?", answer: "Le jeu de la vie", mystery: false },
    { title: "Stargate", password: "2tX", question: "Comment s'appelle le minéral instable utilisé pour faire fonctionner la porte ?", answer: "Naquadah", mystery: true },
    { title: "Scary Movie 3", password: "1pB", question: "Comment s'appelle la petite fille terrifiante qui sort du puits (parodie du Cercle) ?", answer: "Tabitha", mystery: true },
    { title: "Daaaaaalie", password: "4vC", question: "Quel objet insolite Dalí veut-il absolument filmer lors de l'interview ?", answer: "Une fontaine", mystery: false },
    { title: "Fumer fait tousser", password: "7mX", question: "Comment s'appelle le robot dépressif et suicidaire qui accompagne la Tabac Force ?", answer: "Norbert", mystery: false },
    { title: "Abysse", password: "8rA", question: "Quel message Bud écrit-il sur son ardoise à sa femme alors qu'il manque d'oxygène au fond ?", answer: "Je t'aime", mystery: false },
    { title: "Le Guide du Voyageur galactique", password: "5wK", question: "En quoi le moteur à improbabilité infinie transforme-t-il les deux missiles nucléaires ?", answer: "Un pétunia et une baleine", mystery: false },
    { title: "Oss 117 1", password: "3fS", question: "Quel est le nom de la princesse égyptienne dont Hubert tombe 'presque' amoureux ?", answer: "Al Tarouk", mystery: false },
    { title: "Oss 117 2", password: "9pZ", question: "Comment s'appelle le nazi que recherche Hubert au Brésil ?", answer: "Von Zimmel", mystery: false },
    { title: "La cité de la peur", password: "2hK", question: "Quel est le nom de famille de l'ami de Simon Jérémi qui 'est content' ?", answer: "Odile", mystery: false },
    { title: "L'amour Ouf", password: "6lD", question: "Sur quelle chanson de The Cure les deux protagonistes dansent-ils dans la cour d'école ?", answer: "A Forest", mystery: false },
    { title: "Transcendance", password: "1xQ", question: "Dans quelle petite ville isolée Will Caster fait-il construire son immense centre de données souterrain ?", answer: "Brightwood", mystery: false },
    { title: "Jumper", password: "4uG", question: "Où se trouve la 'bibliothèque' secrète de Griffin, là où il garde ses preuves sur les Paladins ?", answer: "Dans le Colisée", mystery: false },
    { title: "Il y a t'il un pilote dans l'avion", password: "8dV", question: "Quel est le problème de boisson récurrent de Ted Striker ?", answer: "Il s'arrose le visage", mystery: false },
    { title: "Jumanji", password: "5jN", question: "Quel est le nom du chasseur qui poursuit Alan Parrish depuis 26 ans ?", answer: "Van Pelt", mystery: false },
    { title: "Ready Player One", password: "7gM", question: "Quel est le nom de l'avatar de la rebelle dont Wade tombe amoureux ?", answer: "Art3mis", mystery: false },
    { title: "Le Seigneur des anneaux l'animé de 1979", password: "3bK", question: "Quel personnage majeur des livres est totalement absent de cette version de Bakshi ?", answer: "Tom Bombadil", mystery: true },
    { title: "Chappee", password: "6tW", question: "Quel est le nom du robot massif et lourd piloté à distance par le personnage de Hugh Jackman ?", answer: "Moose", mystery: false },
    { title: "Premier Contact", password: "9kF", question: "Comment les humains finissent-ils par appeler les deux extraterrestres avec qui ils communiquent ?", answer: "Abbott et Costello", mystery: false },
    { title: "Borat", password: "1mR", question: "Quelle célébrité Borat essaie-t-il d'enlever avec un sac de mariage traditionnel ?", answer: "Pamela Anderson", mystery: false },
    { title: "RRRrrrrr", password: "4vS", question: "Comment la tribu appelle-t-elle l'acte criminel inédit commis dans le film ?", answer: "Un criminu", mystery: false },
    { title: "La classe Américaine", password: "8rD", question: "Quelle est la dernière phrase (le dernier mot) prononcée par George Abitbol ?", answer: "Monde de merde", mystery: false },
    { title: "Ill Manors", password: "2pT", question: "Quel est le prénom du bébé abandonné dans le sac que les dealers trouvent ?", answer: "Michelle", mystery: false },
    { title: "Into the Wild", password: "5kS", question: "Quel est le numéro écrit sur le côté du 'Magic Bus' où s'installe Christopher ?", answer: "142", mystery: false },
    { title: "Incassable", password: "3vH", question: "Quel est le nom de la galerie d'art spécialisée dans les comics tenue par Elijah Price ?", answer: "Limited Edition", mystery: false },
    { title: "Bruce tous puissant", password: "9mC", question: "Quel est le nom du présentateur rival que Bruce humilie en direct en lui faisant dire des bêtises ?", answer: "Evan Baxter", mystery: false },
    { title: "Looper", password: "1zL", question: "Quel est le surnom du futur chef de la pègre qui envoie les victimes dans le passé ?", answer: "Le Maître des Pluies", mystery: false },
    { title: "True man Show", password: "4qR", question: "Comment s'appelle le créateur et réalisateur de l'émission qui surveille Truman depuis la lune ?", answer: "Christof", mystery: false },
    { title: "Le Cinquième élement", password: "6xM", question: "Quelle est la première phrase complète que Leeloo dit à Korben Dallas ?", answer: "Multipass", mystery: false },
    { title: "Rec", password: "8fL", question: "Quel est le nom de la jeune fille 'possédée' à l'origine de l'infection dans le grenier ?", answer: "Tristana Medeiros", mystery: false },
    { title: "Mulan", password: "2nY", question: "Quel nom masculin Mulan choisit-elle pour s'enrôler dans l'armée ?", answer: "Ping", mystery: false },
    { title: "Tarzan", password: "5vW", question: "Quel est le nom de l'explorateur qui veut capturer les gorilles pour les vendre ?", answer: "Clayton", mystery: false },
    { title: "Dune 1", password: "7mS", question: "Comment s'appelle le test de douleur infligé à Paul par la Révérende Mère ?", answer: "Le Gom Jabbar", mystery: false },
    { title: "Dune 2", password: "3hB", question: "Comment appelle-t-on le liquide bleu mortel que Paul doit boire pour devenir le Kwisatz Haderach ?", answer: "L'Eau de Vie", mystery: false },
    { title: "Blade Runner 2049", password: "1vR", question: "Quel est le nom de l'intelligence artificielle holographique qui partage la vie de K ?", answer: "Joi", mystery: false },
    { title: "Gladiator", password: "4bX", question: "Quel est le nom de l'ancien gladiateur qui a racheté Maximus et lui donne sa chance à Rome ?", answer: "Proximo", mystery: false },
    { title: "Je suis une légende", password: "8nN", question: "Comment s'appelle le mannequin à qui Robert Neville parle tous les jours dans le magasin vidéo ?", answer: "Fred", mystery: false },
    { title: "The Big Lebowski", password: "5tV", question: "Qu'est-ce qui a été volé au 'Duc' et qui, selon lui, 'donnait tout son style à la pièce' ?", answer: "Son tapis", mystery: false },
    { title: "Tenacious D et le médiator du destin", password: "2fP", question: "De quelle partie du corps de Satan provient le médiator magique ?", answer: "Une dent", mystery: false },
    { title: "Réalité", password: "7xL", question: "Que doit trouver le réalisateur Jason en 48h pour que son film soit produit ?", answer: "Le meilleur gémissement de l'histoire", mystery: false },
];

// ============================================================
//  FIREBASE — Initialisation + Realtime Database
// ============================================================
firebase.initializeApp(FIREBASE_CONFIG);
const db = firebase.database();
const refUnlocked = db.ref("game/unlocked");
const refValidated = db.ref("game/validated");

// État local (cache synchronisé avec Firebase)
let cachedUnlocked = [];
let cachedValidated = [];

// Écoute temps réel : la grille se met à jour automatiquement
// pour tous les visiteurs dès qu'un succès change
refUnlocked.on("value", (snapshot) => {
    cachedUnlocked = snapshot.val() || [];
    buildGrid();
});

refValidated.on("value", (snapshot) => {
    cachedValidated = snapshot.val() || [];
    buildGrid();
});

function getUnlocked() { return [...cachedUnlocked]; }
function getValidated() { return [...cachedValidated]; }

function saveUnlocked(arr) {
    cachedUnlocked = arr;
    refUnlocked.set(arr);
}

function saveValidated(arr) {
    cachedValidated = arr;
    refValidated.set(arr);
}


// ============================================================
//  SONS — Modifier les fichiers dans le dossier sounds/
// ============================================================
const SOUNDS = {
    click:   new Audio("sounds/click.mp3"),
    close:   new Audio("sounds/close.mp3"),
    success: new Audio("sounds/success.mp3"),
    fail:    new Audio("sounds/fail.mp3"),
};

function playSound(name) {
    const s = SOUNDS[name];
    if (!s) return;
    s.currentTime = 0;
    s.play().catch(() => {});
}




// ============================================================
//  UI
// ============================================================

function updateCounter() {
    const validated = getValidated();
    const total = ACHIEVEMENTS.length;
    document.getElementById("unlocked-count").textContent = validated.length;
    document.getElementById("total-count").textContent = total;
    document.getElementById("sidebar-count").textContent = validated.length;
    document.getElementById("sidebar-total").textContent = total;

    const pct = total > 0 ? Math.round((validated.length / total) * 100) : 0;
    document.getElementById("progress-pct").textContent = pct + "%";
    document.getElementById("progress-bar").style.width = pct + "%";
    document.getElementById("sidebar-bar").style.width = pct + "%";
}

function buildMilestones() {
    const container = document.getElementById("milestones");
    const validated = getValidated();
    container.innerHTML = "";
    
    MILESTONES.forEach((m, index) => {
        const reached = validated.length >= m.count;
        const div = document.createElement("div");
        div.className = "milestone" + (reached ? " reached" : "");
        
        // On utilise index + 1 pour correspondre à s1.png, s2.png, etc.
        div.innerHTML = `
            <img src="medias/s${index + 1}.png" class="milestone-icon" alt="Palier ${m.count}">
            <div class="milestone-content">
                <div class="milestone-header">
                    <span class="milestone-count">${m.count} succès</span>
                    <span class="milestone-check">&#10003;</span>
                </div>
                <p class="milestone-reward">${m.reward}</p>
            </div>
        `;
        container.appendChild(div);
    });
}

function buildGrid() {
    const grid = document.getElementById("grid");
    const unlocked = getUnlocked();
    const validated = getValidated();
    grid.innerHTML = "";

    ACHIEVEMENTS.forEach((ach, i) => {
        const isUnlocked = unlocked.includes(i);
        const isValidated = validated.includes(i);
        const isMystery = ach.mystery && !isUnlocked && !isValidated;

        const cell = document.createElement("div");
        cell.className = "cell";
        if (isValidated) cell.classList.add("validated");
        else if (isUnlocked) cell.classList.add("unlocked");
        if (isMystery) cell.classList.add("mystery");

        const displayTitle = isMystery ? "????" : ach.title;
        const imgSrc = `medias/${i + 1}.png`;

        const SVG_LOCKED = `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm296.5-143.5Q560-327 560-360t-23.5-56.5Q513-440 480-440t-56.5 23.5Q400-393 400-360t23.5 56.5Q447-280 480-280t56.5-23.5ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg>`;
        const SVG_UNLOCKED = `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M240-160h480v-400H240v400Zm296.5-143.5Q560-327 560-360t-23.5-56.5Q513-440 480-440t-56.5 23.5Q400-393 400-360t23.5 56.5Q447-280 480-280t56.5-23.5ZM240-160v-400 400Zm0 80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h280v-80q0-83 58.5-141.5T720-920q83 0 141.5 58.5T920-720h-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80h120q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Z"/></svg>`;

        cell.innerHTML = `
            <img class="cell-icon" src="${imgSrc}" alt="${displayTitle}" loading="lazy">
            <div class="cell-content">
                <div class="cell-info">
                    <span class="cell-title">${displayTitle}</span>
                    <span class="cell-number-tag">${i + 1}${isMystery ? "" : ""}</span>
                </div>
            </div>
            <div class="cell-status">
                <span class="cell-lock-icon">${SVG_LOCKED}</span>
                <span class="cell-unlocked-icon">${SVG_UNLOCKED}</span>
                <span class="cell-check-icon">&#10003;</span>
            </div>
        `;

        cell.addEventListener("click", () => openModal(i));
        grid.appendChild(cell);
    });

    updateCounter();
    buildMilestones();
}

// ===== MODALS =====

let currentIndex = null;
let activeModal = null;

function fillModal(modal, index, forceReveal) {
    const ach = ACHIEVEMENTS[index];
    const num = index + 1;
    const unlocked = getUnlocked();
    const validated = getValidated();
    const revealed = forceReveal || unlocked.includes(index) || validated.includes(index);
    const isMystery = ach.mystery && !revealed;

    modal.querySelector(".modal-number").textContent = num;
    modal.querySelector(".modal-title").textContent = isMystery ? "????" : ach.title;

    const icon = modal.querySelector(".modal-icon");
    if (isMystery) {
        icon.src = "medias/Myst.png";
    } else {
        icon.src = `medias/${num}.png`;
    }
    icon.alt = isMystery ? "Mystère" : ach.title;
}

function openAnimatedModal(modalId, index, forceReveal) {
    const modal = document.getElementById(modalId);
    fillModal(modal, index, forceReveal);
    modal.classList.remove("hidden", "anim-out");
    modal.classList.add("anim-in");
    activeModal = modal;
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
        if (callback) callback();
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
    playSound("click");
    currentIndex = index;
    const unlocked = getUnlocked();
    const validated = getValidated();

    document.getElementById("password-input").value = "";
    document.getElementById("answer-input").value = "";
    document.getElementById("password-error").classList.add("hidden");
    document.getElementById("answer-error").classList.add("hidden");

    if (validated.includes(index)) {
        openAnimatedModal("modal-done", index);
    } else if (unlocked.includes(index)) {
    document.getElementById("question-text").textContent = ACHIEVEMENTS[index].question;
    openAnimatedModal("modal-question", index);
    document.getElementById("question-bg").style.backgroundImage = `url(medias/${index + 1}.png)`;
    setTimeout(() => document.getElementById("answer-input").focus(), 100);
    } else {
        openAnimatedModal("modal-password", index);
        setTimeout(() => document.getElementById("password-input").focus(), 100);
    }
}

function closeModal() {
    playSound("close");
    closeAnimatedModal();
    currentIndex = null;
}

function transitionToQuestion() {
    const ach = ACHIEVEMENTS[currentIndex];
    document.getElementById("question-text").textContent = ach.question;

    const unlocked = getUnlocked();
    if (!unlocked.includes(currentIndex)) {
        unlocked.push(currentIndex);
        saveUnlocked(unlocked);
    }

    closeAnimatedModal(() => {
    openAnimatedModal("modal-question", currentIndex, true);
    document.getElementById("question-bg").style.backgroundImage = `url(medias/${currentIndex + 1}.png)`;
    setTimeout(() => document.getElementById("answer-input").focus(), 100);
    });

}


// Mot de passe
document.getElementById("password-submit").addEventListener("click", checkPassword);
document.getElementById("password-input").addEventListener("keydown", e => { if (e.key === "Enter") checkPassword(); });

function checkPassword() {
    const input = document.getElementById("password-input").value;
    if (input.toLowerCase() === ACHIEVEMENTS[currentIndex].password.toLowerCase()) {
        document.getElementById("password-error").classList.add("hidden");
        transitionToQuestion();
    } else {
        playSound("fail");
        document.getElementById("password-error").classList.remove("hidden");
    }
}



// Tolérance : accepte une réponse si elle est à 2 caractères près
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

function checkAnswer() {
    const input = document.getElementById("answer-input").value.trim();
    const modalEl = document.getElementById("modal-question").querySelector(".modal-content");

    if (isCloseEnough(input, ACHIEVEMENTS[currentIndex].answer, 2)) {
    playSound("success");

        const validated = getValidated();
        if (!validated.includes(currentIndex)) {
            validated.push(currentIndex);
            saveValidated(validated);
        }

        // Animation succès puis fermeture
        modalEl.classList.add("modal-success-flash");
        setTimeout(() => {
            modalEl.classList.remove("modal-success-flash");
            closeAnimatedModal(() => { currentIndex = null; activeModal = null; buildGrid(); });
        }, 800);

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

document.getElementById("sidebar-back").addEventListener("click", () => {
    document.getElementById("sidebar").classList.remove("open");
});

// Bouton "Objectifs" (mobile)
document.getElementById("open-progress").addEventListener("click", () => {
    playSound("click");
    document.getElementById("sidebar").classList.add("open");
});


// Init : afficher la grille immédiatement, Firebase la mettra à jour ensuite
buildGrid();

// Log erreurs Firebase dans la console
db.ref(".info/connected").on("value", (snap) => {
    console.log("Firebase connecté:", snap.val());
});
