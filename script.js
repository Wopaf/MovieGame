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
    { count: 5,  reward: "Indice gratuit pour un succès au choix" },
    { count: 10, reward: "Révélation du mot de passe d'un succès au choix" },
    { count: 15, reward: "Droit de passer une question" },
    { count: 20, reward: "Deux indices gratuits" },
    { count: 25, reward: "Révélation de deux mots de passe" },
    { count: 30, reward: "Un joker : valide un succès sans répondre" },
    { count: 40, reward: "Trois indices gratuits" },
    { count: 50, reward: "Deux jokers" },
    { count: 60, reward: "Titre de Cinéphile confirmé" },
    { count: 70, reward: "Titre de Maître du Cinéma — Jeu terminé !" },
];

// ============================================================
//  DONNÉES DES SUCCÈS — Modifier ici facilement
//  mystery : true = caché tant que le mot de passe n'est pas entré
// ============================================================
const ACHIEVEMENTS = [
    { title: "Les Dents de la mer", password: "a1b", question: "Quel film met en scène un requin géant ?", answer: "Les Dents de la mer", mystery: false },
    { title: "Iron Man", password: "c2d", question: "Qui joue Iron Man ?", answer: "Robert Downey Jr", mystery: false },
    { title: "L'Empire contre-attaque", password: "e3f", question: "Dans quel film entend-on « Je suis ton père » ?", answer: "L'Empire contre-attaque", mystery: true },
    { title: "Titanic", password: "g4h", question: "Quel est le nom du bateau dans Titanic ?", answer: "Titanic", mystery: false },
    { title: "Les Évadés", password: "i5j", question: "Quel film de 1994 se passe dans une prison ?", answer: "Les Évadés", mystery: true },
    { title: "Inception", password: "k6l", question: "Qui réalise Inception ?", answer: "Christopher Nolan", mystery: false },
    { title: "Le Roi Lion", password: "m7n", question: "Quel animal est Simba ?", answer: "Lion", mystery: false },
    { title: "Retour vers le futur", password: "o8p", question: "Dans quel film trouve-t-on la DeLorean ?", answer: "Retour vers le futur", mystery: true },
    { title: "The Dark Knight", password: "q9r", question: "Quel personnage dit « Pourquoi si sérieux ? » ?", answer: "Le Joker", mystery: false },
    { title: "Pulp Fiction", password: "s0t", question: "Qui est le réalisateur de Pulp Fiction ?", answer: "Quentin Tarantino", mystery: false },
    { title: "Jurassic Park", password: "u1v", question: "Quel film montre un parc de dinosaures ?", answer: "Jurassic Park", mystery: false },
    { title: "Forrest Gump", password: "w2x", question: "Quel est le prénom de Forrest dans Forrest Gump ?", answer: "Forrest", mystery: true },
    { title: "Superman", password: "y3z", question: "Quel super-héros vient de Krypton ?", answer: "Superman", mystery: false },
    { title: "Matrix", password: "b4c", question: "Dans Matrix, pilule rouge ou bleue ?", answer: "Rouge", mystery: false },
    { title: "Batman Begins", password: "d5e", question: "Quel est le vrai nom de Batman ?", answer: "Bruce Wayne", mystery: false },
    { title: "Vice-Versa", password: "f6g", question: "Quel film de Pixar parle d'émotions ?", answer: "Vice-Versa", mystery: false },
    { title: "Pirates des Caraïbes", password: "h7i", question: "Qui joue Jack Sparrow ?", answer: "Johnny Depp", mystery: true },
    { title: "Avatar", password: "j8k", question: "Quel film se passe sur la planète Pandora ?", answer: "Avatar", mystery: false },
    { title: "Le Seigneur des Anneaux", password: "l9m", question: "Combien d'anneaux dans Le Seigneur des Anneaux ?", answer: "1", mystery: false },
    { title: "Harry Potter", password: "n0o", question: "Quel est le nom de famille de Harry Potter ?", answer: "Potter", mystery: false },
    { title: "E.T.", password: "p1q", question: "Qui a réalisé E.T. ?", answer: "Steven Spielberg", mystery: true },
    { title: "Seul au monde", password: "r2s", question: "Quel film montre un naufragé sur une île avec un ballon ?", answer: "Seul au monde", mystery: false },
    { title: "Pinocchio", password: "t3u", question: "Quel personnage Disney a un nez qui s'allonge ?", answer: "Pinocchio", mystery: false },
    { title: "Terminator", password: "v4w", question: "Quel est le nom du robot dans Terminator ?", answer: "T-800", mystery: false },
    { title: "Shrek", password: "x5y", question: "Quel film parle d'un ogre vert ?", answer: "Shrek", mystery: false },
    { title: "Le Parrain", password: "z6a", question: "Qui joue le Parrain ?", answer: "Marlon Brando", mystery: true },
    { title: "Star Wars", password: "b7c", question: "Quel film contient le Faucon Millenium ?", answer: "Star Wars", mystery: false },
    { title: "Rocky", password: "d8e", question: "Quel est le sport principal dans Rocky ?", answer: "Boxe", mystery: false },
    { title: "Le Château ambulant", password: "f9g", question: "Quel film de Miyazaki montre un château volant ?", answer: "Le Château ambulant", mystery: true },
    { title: "Wolverine", password: "h0i", question: "Qui joue Wolverine ?", answer: "Hugh Jackman", mystery: false },
    { title: "Dunkerque", password: "j1k", question: "Quel film de 2017 se passe à Dunkerque ?", answer: "Dunkerque", mystery: false },
    { title: "Le Monde de Nemo", password: "l2m", question: "Quel animal est Nemo ?", answer: "Poisson-clown", mystery: false },
    { title: "Narnia", password: "n3o", question: "Quel est le nom du lion dans Narnia ?", answer: "Aslan", mystery: false },
    { title: "Indiana Jones", password: "p4q", question: "Quel film met en scène un archéologue avec un fouet ?", answer: "Indiana Jones", mystery: true },
    { title: "Le Grinch", password: "r5s", question: "Qui interprète le Grinch en 2000 ?", answer: "Jim Carrey", mystery: false },
    { title: "James Bond", password: "t6u", question: "Quel est le prénom de l'agent 007 ?", answer: "James", mystery: false },
    { title: "Toy Story", password: "v7w", question: "Quel film montre des jouets vivants ?", answer: "Toy Story", mystery: false },
    { title: "Ça", password: "x8y", question: "Quel réalisateur est connu pour ses films d'horreur et a fait Ça ?", answer: "Andy Muschietti", mystery: true },
    { title: "Amadeus", password: "z9a", question: "Quel film raconte la vie de Mozart ?", answer: "Amadeus", mystery: false },
    { title: "Alien", password: "b0c", question: "Quel est le nom du vaisseau dans Alien ?", answer: "Nostromo", mystery: false },
    { title: "Hunger Games", password: "d1e", question: "Qui joue Katniss dans Hunger Games ?", answer: "Jennifer Lawrence", mystery: false },
    { title: "Interstellar", password: "f2g", question: "Quel film de Nolan parle d'un trou noir ?", answer: "Interstellar", mystery: true },
    { title: "Il faut sauver le soldat Ryan", password: "h3i", question: "Quel est le surnom de Tom Hanks dans Il faut sauver le soldat Ryan ?", answer: "Capitaine Miller", mystery: false },
    { title: "Vaiana", password: "j4k", question: "Quel film Disney se passe en Polynésie ?", answer: "Vaiana", mystery: false },
    { title: "Scream", password: "l5m", question: "Quel personnage porte un masque blanc dans Scream ?", answer: "Ghostface", mystery: false },
    { title: "Parasite", password: "n6o", question: "Quel film de 2019 a gagné l'Oscar du meilleur film ?", answer: "Parasite", mystery: true },
    { title: "Matrix", password: "p7q", question: "Qui joue Neo dans Matrix ?", answer: "Keanu Reeves", mystery: false },
    { title: "Spider-Man", password: "r8s", question: "Quel est le vrai nom de Spider-Man (version Tobey) ?", answer: "Peter Parker", mystery: false },
    { title: "Ça", password: "t9u", question: "Quel film montre un clown tueur nommé Pennywise ?", answer: "Ça", mystery: false },
    { title: "Ratatouille", password: "v0w", question: "Quel studio a produit Ratatouille ?", answer: "Pixar", mystery: false },
    { title: "Star Wars", password: "x1y", question: "Quel est le nom du mentor de Luke Skywalker ?", answer: "Obi-Wan Kenobi", mystery: false },
    { title: "Speed", password: "z2a", question: "Quel film met en scène un bus qui ne doit pas ralentir ?", answer: "Speed", mystery: true },
    { title: "Le Roi Lion", password: "b3c", question: "Qui est le méchant principal dans Le Roi Lion ?", answer: "Scar", mystery: false },
    { title: "Inception", password: "d4e", question: "Quel film de 2010 parle de rêves dans des rêves ?", answer: "Inception", mystery: false },
    { title: "Terminator 2", password: "f5g", question: "Quel personnage dit « Hasta la vista, baby » ?", answer: "Terminator", mystery: false },
    { title: "The Social Network", password: "h6i", question: "Quel film raconte la création de Facebook ?", answer: "The Social Network", mystery: false },
    { title: "La Belle et la Bête", password: "j7k", question: "Quel est le nom de la princesse dans La Belle et la Bête ?", answer: "Belle", mystery: false },
    { title: "Dante's Peak", password: "l8m", question: "Quel film montre un volcan de lave et un couple ?", answer: "Dante's Peak", mystery: true },
    { title: "Kill Bill", password: "n9o", question: "Qui réalise Kill Bill ?", answer: "Quentin Tarantino", mystery: false },
    { title: "Edward aux mains d'argent", password: "p0q", question: "Quel personnage a des ciseaux à la place des mains ?", answer: "Edward", mystery: false },
    { title: "Shining", password: "r1s", question: "Quel film se passe dans un hôtel hanté appelé Overlook ?", answer: "Shining", mystery: true },
    { title: "Black Panther", password: "t2u", question: "Quel super-héros est aussi roi du Wakanda ?", answer: "Black Panther", mystery: false },
    { title: "Les Bronzés font du ski", password: "v3w", question: "Quel film français culte se passe au ski ?", answer: "Les Bronzés font du ski", mystery: false },
    { title: "Dumbo", password: "x4y", question: "Quel animal est Dumbo ?", answer: "Éléphant", mystery: false },
    { title: "Dirty Dancing", password: "z5a", question: "Quel film montre une compétition de danse avec Patrick Swayze ?", answer: "Dirty Dancing", mystery: false },
    { title: "Thor", password: "b6c", question: "Quel personnage Marvel a un marteau magique ?", answer: "Thor", mystery: false },
    { title: "Là-haut", password: "d7e", question: "Quel film d'animation parle d'une maison qui vole avec des ballons ?", answer: "Là-haut", mystery: true },
    { title: "Alice au pays des merveilles", password: "f8g", question: "Quel est le nom du chat dans Alice au pays des merveilles ?", answer: "Le Chat du Cheshire", mystery: false },
    { title: "Sixième Sens", password: "h9i", question: "Quel film de science-fiction montre un enfant qui voit des gens morts ?", answer: "Sixième Sens", mystery: false },
    { title: "Pirates des Caraïbes", password: "j0k", question: "Qui joue le capitaine Jack dans Pirates des Caraïbes ?", answer: "Johnny Depp", mystery: false },
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
    MILESTONES.forEach(m => {
        const reached = validated.length >= m.count;
        const div = document.createElement("div");
        div.className = "milestone" + (reached ? " reached" : "");
        div.innerHTML = `
            <div class="milestone-header">
                <span class="milestone-count">${m.count} succès</span>
                <span class="milestone-check">&#10003;</span>
            </div>
            <p class="milestone-reward">${m.reward}</p>
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
        const imgSrc = isMystery
            ? "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 54 54"><rect fill="%231b2838" width="54" height="54"/><text x="27" y="33" text-anchor="middle" fill="%2356707f" font-size="24" font-family="Arial">?</text></svg>')
            : `medias/${i + 1}.png`;

        cell.innerHTML = `
            <img class="cell-icon" src="${imgSrc}" alt="${displayTitle}" loading="lazy">
            <div class="cell-info">
                <span class="cell-title">${displayTitle}</span>
                <span class="cell-number-tag">Succès #${i + 1}${isMystery ? " — Mystère" : ""}</span>
            </div>
            <div class="cell-status">
                <span class="cell-lock-icon">&#128274;</span>
                <span class="cell-unlocked-icon">&#128275;</span>
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
        icon.src = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect fill="%231b2838" width="64" height="64"/><text x="32" y="40" text-anchor="middle" fill="%2356707f" font-size="30" font-family="Arial">?</text></svg>');
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

    function handler(e) {
        if (e.target === modal.querySelector(".modal-content")) {
            modal.classList.add("hidden");
            modal.classList.remove("anim-out");
            activeModal = null;
            modal.removeEventListener("animationend", handler);
            if (callback) callback();
        }
    }
    modal.addEventListener("animationend", handler);
}

function openModal(index) {
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
        setTimeout(() => document.getElementById("answer-input").focus(), 100);
    } else {
        openAnimatedModal("modal-password", index);
        setTimeout(() => document.getElementById("password-input").focus(), 100);
    }
}

function closeModal() {
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
        document.getElementById("password-error").classList.remove("hidden");
    }
}

// Réponse
document.getElementById("answer-submit").addEventListener("click", checkAnswer);
document.getElementById("answer-input").addEventListener("keydown", e => { if (e.key === "Enter") checkAnswer(); });

function checkAnswer() {
    const input = document.getElementById("answer-input").value.trim();
    if (input.toLowerCase() === ACHIEVEMENTS[currentIndex].answer.toLowerCase()) {
        const validated = getValidated();
        if (!validated.includes(currentIndex)) {
            validated.push(currentIndex);
            saveValidated(validated);
        }
        closeAnimatedModal(() => { currentIndex = null; activeModal = null; });
    } else {
        document.getElementById("answer-error").classList.remove("hidden");
    }
}

document.querySelectorAll(".modal-close-btn").forEach(btn => btn.addEventListener("click", closeModal));
document.querySelectorAll(".modal-overlay").forEach(o => o.addEventListener("click", closeModal));

document.getElementById("sidebar-toggle").addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("open");
});

// Init : afficher la grille immédiatement, Firebase la mettra à jour ensuite
buildGrid();

// Log erreurs Firebase dans la console
db.ref(".info/connected").on("value", (snap) => {
    console.log("Firebase connecté:", snap.val());
});

