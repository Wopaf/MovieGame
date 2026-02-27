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
    { title: "Le Seigneur des anneaux La communauté de l'anneau", password: "X8q", 
    question: "Comment s'appelle l'auberge où les Hobbits doivent retrouver Gandalf à Brie ?", answer: "Le Poney Fringant", 
    realisateur: "Peter Jackson", description: "Un jeune Hobbit nommé Frodon hérite d'un anneau magique et doit entreprendre un périlleux voyage pour le détruire.", 
    turl: "https://www.youtube.com/watch?v=V75dMMIW2B4", mystery: false },

    { title: "Le Seigneur des anneaux Les deux tours", password: "v2M", 
    question: "Quel peuple de cavaliers est dirigé par le roi Théoden ?", answer: "Les Rohirrim", 
    realisateur: "Peter Jackson", description: "Frodon et Sam continuent vers le Mordor tandis que leurs amis défendent le Rohan contre les armées de Saroumane.", 
    turl: "https://www.youtube.com/watch?v=LbfMDwc4azU", mystery: false },

    { title: "Le Seigneur des anneaux Le retour du roi", password: "7pL",
    question: "Quelle est la dernière phrase d'Aragorn aux Hobbits lors de son couronnement ?", answer: "Vous ne vous inclinez devant personne",
    realisateur: "Peter Jackson", description: "L'affrontement final pour la Terre du Milieu commence alors que Frodon approche de la Montagne du Destin.",
    turl: "https://www.youtube.com/watch?v=r5X-hFf6Bwo", mystery: false },

    { title: "Interstelar", password: "4kZ",
    question: "Quel est le nom de la station spatiale que Cooper tente de rattraper en plein mouvement de rotation ?", answer: "Endurance",
    realisateur: "Christopher Nolan", description: "Des astronautes s'aventurent à travers un trou de ver pour trouver une nouvelle planète et sauver l'humanité.",
    turl: "https://www.youtube.com/watch?v=0rDczIsHJn4", mystery: false },

    { title: "Forest Gump", password: "1nS",
    question: "Quelle marque de chaussures Jenny offre-t-elle à Forrest avant qu'il ne commence à courir ?", answer: "Nike",
    realisateur: "Robert Zemeckis", description: "Le destin extraordinaire d'un homme simple qui traverse les événements marquants de l'histoire des États-Unis.",
    turl: "https://www.youtube.com/watch?v=bLvqoHBptjg", mystery: false },

    { title: "Her", password: "8bY",
    question: "Quel est le nom de l'ex-femme de Theodore avec qui il doit signer les papiers du divorce ?", answer: "Catherine",
    realisateur: "Spike Jonze", description: "Dans un futur proche, un homme solitaire tombe amoureux d'une intelligence artificielle avancée.",
    turl: "https://www.youtube.com/watch?v=fAs4qKLnRZI", mystery: false },

    { title: "Matrix 1", password: "5hW",
    question: "Comment s'appelle le vaisseau dirigé par Morpheus ?", answer: "Nebuchadnezzar",
    realisateur: "Lana et Lilly Wachowski", description: "Un hacker découvre que le monde tel qu'il le connaît n'est qu'une simulation virtuelle créée par des machines.",
    turl: "https://www.youtube.com/watch?v=vKQi3bBA1y8", mystery: false },

    { title: "Matrix 2", password: "3dR",
    question: "Selon l'Architecte, à quelle version de la Matrice Néo appartient-il ?", answer: "La sixième",
    realisateur: "Lana et Lilly Wachowski", description: "Néo doit faire face à de nouveaux défis pour protéger Sion tout en cherchant l'origine de la Matrice.",
    turl: "https://www.youtube.com/watch?v=zmYE3Qrf66Y", mystery: false },

    { title: "Matrix 3", password: "6uF",
    question: "Quelle est la condition finale imposée par Néo aux Machines pour arrêter Smith ?", answer: "La Paix",
    realisateur: "Lana et Lilly Wachowski", description: "La bataille finale entre l'humanité et les machines atteint son paroxysme tandis que Néo affronte l'agent Smith.",
    turl: "https://www.youtube.com/watch?v=hMbexEPAOQI", mystery: false },

    { title: "10 Cloverfield Lane", password: "9jN",
    question: "À quel jeu de société Howard, Emmett et Michelle jouent-ils dans le bunker ?", answer: "Le jeu de la vie",
    realisateur: "Dan Trachtenberg", description: "Une femme se réveille dans un bunker après un accident, son hôte affirmant que l'extérieur est contaminé.",
    turl: "https://www.youtube.com/watch?v=z-mFf4gytQI", mystery: false },

    { title: "Stargate", password: "2tX",
    question: "Comment s'appelle le minéral instable utilisé pour faire fonctionner la porte ?", answer: "Naquadah",
    realisateur: "Roland Emmerich", description: "Une équipe de militaires et un archéologue franchissent une porte stellaire menant à une autre planète.",
    turl: "https://www.youtube.com/watch?v=uK8n_V2EaH8", mystery: true },

    { title: "Scary Movie 3", password: "1pB",
    question: "Comment s'appelle la petite fille terrifiante qui sort du puits (parodie du Cercle) ?", answer: "Tabitha",
    realisateur: "David Zucker", description: "Une parodie déjantée des films d'horreur et de science-fiction les plus célèbres des années 2000.",
    turl: "https://www.youtube.com/watch?v=XvK_E6t5F4Y", mystery: true },

    { title: "Daaaaaalie", password: "4vC",
    question: "Quel objet insolite Dalí veut-il absolument filmer lors de l'interview ?", answer: "Une fontaine",
    realisateur: "Quentin Dupieux", description: "Une journaliste tente de réaliser une interview avec Salvador Dalí, qui se transforme en un voyage absurde.",
    turl: "https://www.youtube.com/watch?v=MLILb_JnFx4", mystery: false },

    { title: "Fumer fait tousser", password: "7mX",
    question: "Comment s'appelle le robot dépressif et suicidaire qui accompagne la Tabac Force ?", answer: "Norbert",
    realisateur: "Quentin Dupieux", description: "La 'Tabac Force' part en retraite pour renforcer sa cohésion d'équipe avant d'affronter un maléfique empereur.",
    turl: "https://www.youtube.com/watch?v=y2x9WfC9SjM", mystery: false },

    { title: "Abysse", password: "8rA",
    question: "Quel message Bud écrit-il sur son ardoise à sa femme alors qu'il manque d'oxygène au fond ?", answer: "Je t'aime",
    realisateur: "James Cameron", description: "Une équipe de forage sous-marin découvre des formes de vie mystérieuses au fond des abysses.",
    turl: "https://www.youtube.com/watch?v=9oR-B6S7oY0", mystery: false },

    { title: "Le Guide du Voyageur galactique", password: "5wK",
    question: "En quoi le moteur à improbabilité infinie transforme-t-il les deux missiles nucléaires ?", answer: "Un pétunia et une baleine",
    realisateur: "Garth Jennings", description: "Arthur Dent échappe à la destruction de la Terre et commence un voyage déjanté à travers la galaxie.",
    turl: "https://www.youtube.com/watch?v=asS9G_HIdjI", mystery: false },

    { title: "Oss 117 1", password: "3fS",
    question: "Quel est le nom de la princesse égyptienne dont Hubert tombe 'presque' amoureux ?", answer: "Al Tarouk",
    realisateur: "Michel Hazanavicius", description: "Hubert Bonisseur de La Bath enquête au Caire en 1955 dans cette parodie culte des films d'espionnage.",
    turl: "https://www.youtube.com/watch?v=yYvHq-O_i1c", mystery: false },

    { title: "Oss 117 2", password: "9pZ",
    question: "Comment s'appelle le nazi que recherche Hubert au Brésil ?", answer: "Von Zimmel",
    realisateur: "Michel Hazanavicius", description: "L'espion français se rend à Rio en 1967 pour mettre la main sur un microfilm compromettant.",
    turl: "https://www.youtube.com/watch?v=5VjI_jA_q7g", mystery: false },

    { title: "La cité de la peur", password: "2hK",
    question: "Quel est le nom de famille de l'ami de Simon Jérémi qui 'est content' ?", answer: "Odile",
    realisateur: "Alain Berbérian", description: "Un tueur en série terrorise le Festival de Cannes alors qu'une attachée de presse tente de promouvoir son film.",
    turl: "https://www.youtube.com/watch?v=680X_vH_Ias", mystery: false },

    { title: "L'amour Ouf", password: "6lD",
    question: "Sur quelle chanson de The Cure les deux protagonistes dansent-ils dans la cour d'école ?", answer: "A Forest",
    realisateur: "Gilles Lellouche", description: "Une histoire d'amour passionnelle entre deux adolescents que tout oppose, sur plusieurs décennies.",
    turl: "https://www.youtube.com/watch?v=C7mS-TbeI8M", mystery: false },

    { title: "Transcendance", password: "1xQ",
    question: "Dans quelle petite ville isolée Will Caster fait-il construire son immense centre de données souterrain ?", answer: "Brightwood",
    realisateur: "Wally Pfister", description: "La conscience d'un scientifique mourant est téléchargée dans un ordinateur, créant une intelligence omnipotente.",
    turl: "https://www.youtube.com/watch?v=VCTen3-B8GU", mystery: false },

    { title: "Jumper", password: "4uG",
    question: "Où se trouve la 'bibliothèque' secrète de Griffin, là où il garde ses preuves sur les Paladins ?", answer: "Dans le Colisée",
    realisateur: "Doug Liman", description: "Un jeune homme découvre qu'il a le pouvoir de se téléporter partout dans le monde.",
    turl: "https://www.youtube.com/watch?v=RcMH5sAYc5o", mystery: false },

    { title: "Il y a t'il un pilote dans l'avion", password: "8dV",
    question: "Quel est le problème de boisson récurrent de Ted Striker ?", answer: "Il s'arrose le visage",
    realisateur: "Zucker, Abrahams et Zucker", description: "Une parodie culte où un ancien pilote traumatisé doit prendre les commandes d'un avion en détresse.",
    turl: "https://www.youtube.com/watch?v=fP7m_01wJ34", mystery: false },

    { title: "Jumanji", password: "5jN",
    question: "Quel est le nom du chasseur qui poursuit Alan Parrish depuis 26 ans ?", answer: "Van Pelt",
    realisateur: "Joe Johnston", description: "Un jeu de société magique libère des dangers de la jungle dans le monde réel à chaque lancer de dés.",
    turl: "https://www.youtube.com/watch?v=9P6TZcCk0MM", mystery: false },

    { title: "Ready Player One", password: "7gM",
    question: "Quel est le nom de l'avatar de la rebelle dont Wade tombe amoureux ?", answer: "Art3mis",
    realisateur: "Steven Spielberg", description: "Dans un futur dystopique, les gens vivent dans l'OASIS, un monde virtuel cachant un immense trésor.",
    turl: "https://www.youtube.com/watch?v=cSp1dM2Vj48", mystery: false },

    { title: "Le Seigneur des anneaux l'animé de 1979", password: "3bK",
    question: "Quel personnage majeur des livres est totalement absent de cette version de Bakshi ?", answer: "Tom Bombadil",
    realisateur: "Ralph Bakshi", description: "Une adaptation expérimentale du premier tome de Tolkien utilisant la technique de la rotoscopie.",
    turl: "https://www.youtube.com/watch?v=6Yt-R70_R0Y", mystery: true },

    { title: "Chappee", password: "6tW",
    question: "Quel est le nom du robot massif et lourd piloté à distance par le personnage de Hugh Jackman ?", answer: "Moose",
    realisateur: "Neill Blomkamp", description: "Un robot de police est doté d'une conscience et doit apprendre à vivre dans un monde violent.",
    turl: "https://www.youtube.com/watch?v=lYpdtB4UKWE", mystery: false },

    { title: "Premier Contact", password: "9kF",
    question: "Comment les humains finissent-ils par appeler les deux extraterrestres avec qui ils communiquent ?", answer: "Abbott et Costello",
    realisateur: "Denis Villeneuve", description: "Une linguiste est chargée de communiquer avec des extraterrestres dont les vaisseaux se sont posés sur Terre.",
    turl: "https://www.youtube.com/watch?v=f8mYf5p_f7I", mystery: false },

    { title: "Borat", password: "1mR",
    question: "Quelle célébrité Borat essaie-t-il d'enlever avec un sac de mariage traditionnel ?", answer: "Pamela Anderson",
    realisateur: "Larry Charles", description: "Un journaliste kazakh parcourt les États-Unis dans un faux documentaire pour comprendre la culture américaine.",
    turl: "https://www.youtube.com/watch?v=P_98O_K05Yw", mystery: false },

    { title: "RRRrrrrr", password: "4vS",
    question: "Comment la tribu appelle-t-elle l'acte criminel inédit commis dans le film ?", answer: "Un criminu",
    realisateur: "Alain Chabat", description: "Il y a 35 000 ans, deux tribus s'affrontent pour obtenir le secret du shampooing.",
    turl: "https://www.youtube.com/watch?v=2rE_S49XqO4", mystery: false },

    { title: "La classe Américaine", password: "8rD",
    question: "Quelle est la dernière phrase (le dernier mot) prononcée par George Abitbol ?", answer: "Monde de merde",
    realisateur: "Michel Hazanavicius et Dominique Mézerette", description: "Un détournement culte de films de la Warner où les dialogues originaux sont remplacés par des répliques absurdes.",
    turl: "https://www.youtube.com/watch?v=jWkCq0Q38E8", mystery: false },

    { title: "Ill Manors", password: "2pT",
    question: "Quel est le prénom du bébé abandonné dans le sac que les dealers trouvent ?", answer: "Michelle",
    realisateur: "Ben Drew", description: "Une plongée violente dans les rues de Londres à travers les destins croisés de plusieurs personnages.",
    turl: "https://www.youtube.com/watch?v=MT44ch0FFEU", mystery: false },

    { title: "Into the Wild", password: "5kS",
    question: "Quel est le numéro écrit sur le côté du 'Magic Bus' où s'installe Christopher ?", answer: "142",
    realisateur: "Sean Penn", description: "Un jeune diplômé rejette la société de consommation et part vivre en solitaire dans la nature sauvage d'Alaska.",
    turl: "https://www.youtube.com/watch?v=2GWPOPSXGYI", mystery: false },

    { title: "Incassable", password: "3vH",
    question: "Quel est le nom de la galerie d'art spécialisée dans les comics tenue par Elijah Price ?", answer: "Limited Edition",
    realisateur: "M. Night Shyamalan", description: "Un homme découvre qu'il est invincible après avoir été le seul survivant d'un terrible accident de train.",
    turl: "https://www.youtube.com/watch?v=AC-LA9QVdmI", mystery: false },

    { title: "Bruce tous puissant", password: "9mC",
    question: "Quel est le nom du présentateur rival que Bruce humilie en direct en lui faisant dire des bêtises ?", answer: "Evan Baxter",
    realisateur: "Tom Shadyac", description: "Un journaliste insatisfait de sa vie reçoit tous les pouvoirs de Dieu pour voir s'il peut faire mieux.",
    turl: "https://www.youtube.com/watch?v=l5eK3q4JXZo", mystery: false },

    { title: "Looper", password: "1zL",
    question: "Quel est le surnom du futur chef de la pègre qui envoie les victimes dans le passé ?", answer: "Le Maître des Pluies",
    realisateur: "Rian Johnson", description: "Des tueurs à gages sont chargés d'éliminer des victimes envoyées du futur par un syndicat du crime.",
    turl: "https://www.youtube.com/watch?v=2iQuoxZ9dfc", mystery: false },

    { title: "True man Show", password: "4qR",
    question: "Comment s'appelle le créateur et réalisateur de l'émission qui surveille Truman depuis la lune ?", answer: "Christof",
    realisateur: "Peter Weir", description: "Un homme découvre que sa vie entière est en réalité une émission de télé-réalité diffusée 24h/24.",
    turl: "https://www.youtube.com/watch?v=dlnmQbPGuls", mystery: false },

    { title: "Le Cinquième élement", password: "6xM",
    question: "Quelle est la première phrase complète que Leeloo dit à Korben Dallas ?", answer: "Multipass",
    realisateur: "Luc Besson", description: "Au XXIIIe siècle, un chauffeur de taxi doit protéger une jeune femme qui est la seule clé du salut de l'humanité.",
    turl: "https://www.youtube.com/watch?v=1p_BvXpC8oA", mystery: false },

    { title: "Rec", password: "8fL",
    question: "Quel est le nom de la jeune fille 'possédée' à l'origine de l'infection dans le grenier ?", answer: "Tristana Medeiros",
    realisateur: "Jaume Balagueró et Paco Plaza", description: "Une équipe de télé filme une intervention de pompiers qui tourne au cauchemar infectieux dans un immeuble.",
    turl: "https://www.youtube.com/watch?v=ylUf4V00sN4", mystery: false },

    { title: "Mulan", password: "2nY",
    question: "Quel nom masculin Mulan choisit-elle pour s'enrôler dans l'armée ?", answer: "Ping",
    realisateur: "Barry Cook et Tony Bancroft", description: "Une jeune femme se déguise en homme pour prendre la place de son père dans l'armée impériale chinoise.",
    turl: "https://www.youtube.com/watch?v=M7S3P88eJ_s", mystery: false },

    { title: "Tarzan", password: "5vW",
    question: "Quel est le nom de l'explorateur qui veut capturer les gorilles pour les vendre ?", answer: "Clayton",
    realisateur: "Kevin Lima et Chris Buck", description: "Un homme élevé par des gorilles dans la jungle découvre la civilisation lors d'une expédition humaine.",
    turl: "https://www.youtube.com/watch?v=2Wv_2UIdYtY", mystery: false },

    { title: "Dune 1", password: "7mS",
    question: "Comment s'appelle le test de douleur infligé à Paul par la Révérende Mère ?", answer: "Le Gom Jabbar",
    realisateur: "Denis Villeneuve", description: "Un jeune noble doit protéger la ressource la plus précieuse de la galaxie sur la planète désertique Arrakis.",
    turl: "https://www.youtube.com/watch?v=fOvveuMeos0", mystery: false },

    { title: "Dune 2", password: "3hB",
    question: "Comment appelle-t-on le liquide bleu mortel que Paul doit boire pour devenir le Kwisatz Haderach ?", answer: "L'Eau de Vie",
    realisateur: "Denis Villeneuve", description: "Paul Atréides s'unit aux Fremen pour mener la révolte contre les conspirateurs qui ont détruit sa famille.",
    turl: "https://www.youtube.com/watch?v=WAY8-M268Xg", mystery: false },

    { title: "Blade Runner 2049", password: "1vR",
    question: "Quel est le nom de l'intelligence artificielle holographique qui partage la vie de K ?", answer: "Joi",
    realisateur: "Denis Villeneuve", description: "Un nouvel officier de police déterre un secret enfoui qui pourrait plonger la société dans le chaos.",
    turl: "https://www.youtube.com/watch?v=WarevDmt_Ug", mystery: false },

    { title: "Gladiator", password: "4bX",
    question: "Quel est le nom de l'ancien gladiateur qui a racheté Maximus et lui donne sa chance à Rome ?", answer: "Proximo",
    realisateur: "Ridley Scott", description: "Un général romain trahi devient gladiateur pour se venger de l'empereur qui a assassiné sa famille.",
    turl: "https://www.youtube.com/watch?v=owK1at_O7_0", mystery: false },

    { title: "Je suis une légende", password: "8nN",
    question: "Comment s'appelle le mannequin à qui Robert Neville parle tous les jours dans le magasin vidéo ?", answer: "Fred",
    realisateur: "Francis Lawrence", description: "Le dernier survivant d'un virus ayant transformé l'humanité en mutants tente de trouver un remède à New York.",
    turl: "https://www.youtube.com/watch?v=uYUbLTxJl-A", mystery: false },

    { title: "The Big Lebowski", password: "5tV",
    question: "Qu'est-ce qui a été volé au 'Duc' et qui, selon lui, 'donnait tout son style à la pièce' ?", answer: "Son tapis",
    realisateur: "Joel et Ethan Coen", description: "Un flemmard invétéré est pris pour un millionnaire et se retrouve mêlé à une affaire d'enlèvement.",
    turl: "https://www.youtube.com/watch?v=mY93vL79W4s", mystery: false },

    { title: "Tenacious D et le médiator du destin", password: "2fP",
    question: "De quelle partie du corps de Satan provient le médiator magique ?", answer: "Une dent",
    realisateur: "Liam Lynch", description: "Deux musiciens partent en quête d'un médiator aux pouvoirs surnaturels pour devenir le plus grand groupe de rock.",
    turl: "https://www.youtube.com/watch?v=TXxH7H0KQWI", mystery: false },

    { title: "Réalité", password: "7xL",
    question: "Que doit trouver le réalisateur Jason en 48h pour que son film soit produit ?", answer: "Le meilleur gémissement de l'histoire",
    realisateur: "Quentin Dupieux", description: "Un caméraman rêve de réaliser un film d'horreur, mais doit d'abord trouver le cri de douleur parfait.",
    turl: "https://www.youtube.com/watch?v=FRzONsDtDFM", mystery: false }
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

// ---- Notifications toast ----
function showToast(msg, type = "error") {
    const container = document.getElementById("toast-container");
    if (!container) return;
    const toast = document.createElement("div");
    toast.className = "toast toast-" + type;
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => {
        toast.classList.add("toast-fadeout");
        setTimeout(() => toast.remove(), 400);
    }, 5000);
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

// ---- Écoute temps réel ----
refUnlocked.on("value", (snapshot) => {
    cachedUnlocked = snapshot.val() || [];
    buildGrid();
}, (err) => {
    console.error("Firebase read error (unlocked):", err);
    showToast("Erreur Firebase (lecture) : " + err.code);
});

refValidated.on("value", (snapshot) => {
    cachedValidated = snapshot.val() || [];
    buildGrid();
}, (err) => {
    console.error("Firebase read error (validated):", err);
    showToast("Erreur Firebase (lecture) : " + err.code);
});

function getUnlocked() { return [...cachedUnlocked]; }
function getValidated() { return [...cachedValidated]; }

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
//  TRI
// ============================================================

let currentSort = "number";

function getSortedIndices() {
    const validated = getValidated();
    const unlocked  = getUnlocked();
    let indices = ACHIEVEMENTS.map((_, i) => i);

    if (currentSort === "alpha") {
        indices.sort((a, b) => {
            const ta = ACHIEVEMENTS[a].mystery ? "\uFFFF" : ACHIEVEMENTS[a].title;
            const tb = ACHIEVEMENTS[b].mystery ? "\uFFFF" : ACHIEVEMENTS[b].title;
            return ta.localeCompare(tb, "fr", { sensitivity: "base" });
        });
    } else if (currentSort === "validated") {
        const rank = i => validated.includes(i) ? 0 : unlocked.includes(i) ? 1 : 2;
        indices.sort((a, b) => rank(a) - rank(b));
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
    document.getElementById("sidebar-count").textContent = validated.length;
    document.getElementById("sidebar-total").textContent = total;

    const pct = total > 0 ? Math.round((validated.length / total) * 100) : 0;
    document.getElementById("progress-pct").textContent = pct + "%";
    document.getElementById("progress-bar").style.width = pct + "%";
    document.getElementById("sidebar-bar").style.width = pct + "%";
    document.getElementById("sidebar-pct").textContent = pct + "%";
    updateNextMilestone();
}

function updateNextMilestone() {
    const validated = getValidated();
    const count = validated.length;
    const next = MILESTONES.find(m => count < m.count);
    const el = document.getElementById("sidebar-next-milestone");
    if (!el) return;
    if (!next) {
        el.classList.add("all-done");
        document.getElementById("sidebar-next-count").textContent = "Tous les paliers atteints !";
        document.getElementById("sidebar-next-reward").textContent = "Félicitations, tu as tout accompli !";
        document.getElementById("sidebar-next-progress").textContent = count + " succès";
        return;
    }
    el.classList.remove("all-done");
    document.getElementById("sidebar-next-count").textContent = next.count + " succès requis";
    document.getElementById("sidebar-next-reward").textContent = next.reward;
    document.getElementById("sidebar-next-progress").textContent = count + " / " + next.count;
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

    getSortedIndices().forEach(i => {
        const ach = ACHIEVEMENTS[i];
        const isUnlocked = unlocked.includes(i);
        const isValidated = validated.includes(i);
        const isMystery = ach.mystery && !isUnlocked && !isValidated;

        const cell = document.createElement("div");
        cell.className = "cell";
        if (isValidated) cell.classList.add("validated");
        else if (isUnlocked) cell.classList.add("unlocked");
        if (isMystery) cell.classList.add("mystery");

        const displayTitle = isMystery ? "Film mystère" : ach.title;
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
            <div class="cell-background">
                <span class="cell-status-label cell-lock-label">Verrouillé</span>
                <span class="cell-lock-icon">${SVG_LOCKED}</span>
            </div>
            <div class="cell-background">
                <span class="cell-status-label cell-unlock-label">Déverrouillé</span>
                <span class="cell-unlocked-icon">${SVG_UNLOCKED}</span>
            </div>
            <div class="cell-background">
                <span class="cell-status-label cell-valid-label">Validé</span>
                <span class="cell-check-icon">&#10003;</span>
            </div>
            </div>
        `;

        cell.addEventListener("click", () => openModal(i));
        grid.appendChild(cell);
    });

    updateCounter();
    buildMilestones();
    firstBuildDone = true;
    if (splashDone && !gridAnimStarted) startGridIntroAnimation();
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
    modal.querySelector(".modal-title").textContent = isMystery ? "Film mystère" : ach.title;

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
    openInfoModal(index);
}

function openInfoModal(index) {
    playSound("click");
    currentIndex = index;
    const ach = ACHIEVEMENTS[index];
    const num = index + 1;
    const unlocked  = getUnlocked();
    const validated = getValidated();
    const isRevealed = unlocked.includes(index) || validated.includes(index);
    const isMystery  = ach.mystery && !isRevealed;

    // Fond + icône
    const imgSrc = `medias/${isMystery ? "Myst" : num}.png`;
    document.getElementById("info-bg").style.backgroundImage = `url(${imgSrc})`;
    const icon = document.getElementById("info-icon");
    icon.src = imgSrc;
    icon.alt = isMystery ? "Film mystère" : ach.title;

    // Badge + titre
    document.getElementById("info-num").textContent = num;
    document.getElementById("info-title").textContent = isMystery ? "Film mystère" : ach.title;

    // Réalisateur / description / bande annonce
    const dirRow    = document.getElementById("info-director-row");
    const descEl    = document.getElementById("info-desc");
    const trailerEl = document.getElementById("info-trailer");
    if (isMystery) {
        dirRow.style.display    = "none";
        descEl.style.display    = "none";
        trailerEl.style.display = "none";
    } else {
        dirRow.style.display    = "flex";
        descEl.style.display    = "block";
        trailerEl.style.display = "inline-flex";
        document.getElementById("info-director").textContent = ach.realisateur;
        descEl.textContent  = ach.description;
        trailerEl.href      = ach.turl;
    }

    // Bouton CTA selon l'état
    const cta = document.getElementById("info-cta");
    cta.className = "info-cta-btn";
    if (validated.includes(index)) {
        cta.classList.add("cta-done");
        cta.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg> Succès déjà validé`;
    } else if (unlocked.includes(index)) {
        cta.classList.add("cta-question");
        cta.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor"><path d="M560-360q17 0 29.5-12.5T602-402q0-17-12.5-29.5T560-444q-17 0-29.5 12.5T518-402q0 17 12.5 29.5T560-360Zm-30-128h60q0-29 6-42.5t28-35.5q30-30 40-48.5t10-43.5q0-45-31.5-73.5T560-760q-41 0-71.5 23T446-676l54 22q9-25 24.5-37.5T560-704q24 0 39 13.5t15 36.5q0 14-8 26.5T578-596q-33 29-40.5 45.5T530-488ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg> Répondre au défi`;
    } else {
        cta.classList.add("cta-lock");
        cta.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm240-200q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z"/></svg> Déverrouiller ce film`;
    }

    const modal = document.getElementById("modal-info");
    modal.classList.remove("hidden", "anim-out");
    modal.classList.add("anim-in");
    activeModal = modal;
}

function proceedFromInfo() {
    const index     = currentIndex;
    const unlocked  = getUnlocked();
    const validated = getValidated();

    document.getElementById("password-input").value = "";
    document.getElementById("answer-input").value   = "";
    document.getElementById("password-error").classList.add("hidden");
    document.getElementById("answer-error").classList.add("hidden");

    if (validated.includes(index)) {
        closeAnimatedModal(() => openAnimatedModal("modal-done", index));
    } else if (unlocked.includes(index)) {
        closeAnimatedModal(() => {
            document.getElementById("question-text").textContent = ACHIEVEMENTS[index].question;
            openAnimatedModal("modal-question", index, true);
            document.getElementById("question-bg").style.backgroundImage = `url(medias/${index + 1}.png)`;
            setTimeout(() => document.getElementById("answer-input").focus(), 100);
        });
    } else {
        closeAnimatedModal(() => {
            openAnimatedModal("modal-password", index);
            setTimeout(() => document.getElementById("password-input").focus(), 100);
        });
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

document.getElementById("info-cta").addEventListener("click", proceedFromInfo);

document.getElementById("sidebar-back").addEventListener("click", () => {
    document.getElementById("sidebar").classList.remove("open");
});

document.getElementById("sidebar-reset").addEventListener("click", () => {
    if (!confirm("Réinitialiser toutes les sauvegardes ? Cette action est irréversible.")) return;
    Promise.all([refUnlocked.set(null), refValidated.set(null)]).catch(err => {
        console.error("Firebase reset error:", err);
        showToast("Erreur reset : " + err.code);
    });
});

// Bouton "Objectifs" (mobile)
document.getElementById("open-progress").addEventListener("click", () => {
    playSound("click");
    document.getElementById("sidebar").classList.add("open");
});


// Zoom de la grille (2 à 4 colonnes)
let currentCols = window.innerWidth > 768 ? 4 : 2;

function setGridCols(n) {
    currentCols = n;
    const grid = document.getElementById("grid");
    grid.classList.remove("cols-2", "cols-3", "cols-4");
    grid.classList.add("cols-" + n);
    document.getElementById("zoom-label").textContent = n;
    document.getElementById("zoom-out").disabled = n <= 2;
    document.getElementById("zoom-in").disabled  = n >= 4;
    const tgl = document.getElementById("zoom-toggle-label");
    if (tgl) tgl.textContent = n;
}

setGridCols(currentCols);

document.getElementById("zoom-out").addEventListener("click", () => {
    if (currentCols > 2) setGridCols(currentCols - 1);
});
document.getElementById("zoom-in").addEventListener("click", () => {
    if (currentCols < 4) setGridCols(currentCols + 1);
});
document.getElementById("zoom-toggle").addEventListener("click", () => {
    setGridCols(currentCols === 2 ? 3 : 2);
});

// Boutons de tri
document.querySelectorAll(".sort-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        currentSort = btn.dataset.sort;
        document.querySelectorAll(".sort-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        buildGrid();
    });
});

// ============================================================
//  SPLASH SCREEN + INTRO ANIMATION
// ============================================================
let splashDone = false;
let firstBuildDone = false;
let gridAnimStarted = false;

function startGridIntroAnimation() {
    if (gridAnimStarted) return;
    gridAnimStarted = true;
    const cells = [...document.querySelectorAll("#grid .cell")];
    cells.forEach((cell, i) => {
        cell.style.setProperty("--cell-delay", (i * 0.1) + "s");
        cell.classList.add("cell-intro");
    });
    setTimeout(() => {
        cells.forEach(c => c.classList.remove("cell-intro"));
    }, 3000);
}

setTimeout(() => {
    startGridIntroAnimation();
}, 400);

setTimeout(() => {
    const splash = document.getElementById("splash");
    if (!splash) return;
    splash.classList.add("splash-fade");
    splash.addEventListener("transitionend", onSplashDone, { once: true });
    setTimeout(onSplashDone, 700); // fallback si transitionend ne se déclenche pas
}, 600);

// Init : afficher la grille immédiatement, Firebase la mettra à jour ensuite
buildGrid();

// Log erreurs Firebase dans la console
db.ref(".info/connected").on("value", (snap) => {
    console.log("Firebase connecté:", snap.val());
});
