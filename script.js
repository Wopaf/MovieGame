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
    { count: 1,  keys: 1, rewards: ["1 🗝️"] },
    { count: 5,  keys: 1, rewards: ["2 🗝️"] },
    { count: 10, keys: 2, rewards: ["2 🗝️"] },
    { count: 15, keys: 2, rewards: ["2 🗝️", "Film secret"], secretFilm: 38 },
    { count: 20, keys: 3, rewards: ["3 🗝️", "Film secret"], secretFilm: 39 },
    { count: 25, keys: 3, rewards: ["3 🗝️"] },
    { count: 30, keys: 3, rewards: ["3 🗝️"] },
    { count: 35, keys: 3, rewards: ["3 🗝️"] },
    { count: 40, keys: 3, rewards: ["3 🗝️"] },
    { count: 50, keys: 3, rewards: ["3 🗝️"] },
    { count: 65, keys: 3, rewards: ["Film secret"], secretFilm: 39 },
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
const ACHIEVEMENTS = [
    { title: "Le Seigneur des anneaux La communauté de l'anneau", img: "1.png", password: "X8q",
    question: "Comment s'appelle l'auberge où les Hobbits doivent retrouver Gandalf à Brie ?", answer: "Le Poney Fringant",
    realisateur: "Peter Jackson", description: "Un jeune Hobbit nommé Frodon hérite d'un anneau magique et doit entreprendre un périlleux voyage pour le détruire.",
    turl: "https://www.youtube.com/watch?v=V75dMMIW2B4", verrouille: false },

    { title: "Le Seigneur des anneaux Les deux tours", img: "2.png", password: "v2M",
    question: "Quel peuple de cavaliers est dirigé par le roi Théoden ?", answer: "Les Rohirrim",
    realisateur: "Peter Jackson", description: "Frodon et Sam continuent vers le Mordor tandis que leurs amis défendent le Rohan contre les armées de Saroumane.",
    turl: "https://www.youtube.com/watch?v=LbfMDwc4azU", verrouille: false },

    { title: "Le Seigneur des anneaux Le retour du roi", img: "3.png", password: "7pL",
    question: "Quelle est la dernière phrase d'Aragorn aux Hobbits lors de son couronnement ?", answer: "Vous ne vous inclinez devant personne",
    realisateur: "Peter Jackson", description: "L'affrontement final pour la Terre du Milieu commence alors que Frodon approche de la Montagne du Destin.",
    turl: "https://www.youtube.com/watch?v=r5X-hFf6Bwo", verrouille: false },

    { title: "Interstelar", img: "4.png", password: "4kZ",
    question: "Quel est le nom de la station spatiale que Cooper tente de rattraper en plein mouvement de rotation ?", answer: "Endurance",
    realisateur: "Christopher Nolan", description: "Des astronautes s'aventurent à travers un trou de ver pour trouver une nouvelle planète et sauver l'humanité.",
    turl: "https://www.youtube.com/watch?v=0rDczIsHJn4", verrouille: false },

    { title: "Forest Gump", img: "5.png", password: "1nS",
    question: "Quelle marque de chaussures Jenny offre-t-elle à Forrest avant qu'il ne commence à courir ?", answer: "Nike",
    realisateur: "Robert Zemeckis", description: "Le destin extraordinaire d'un homme simple qui traverse les événements marquants de l'histoire des États-Unis.",
    turl: "https://www.youtube.com/watch?v=bLvqoHBptjg", verrouille: false },

    { title: "Her", img: "6.png", password: "8bY",
    question: "Quel est le nom de l'ex-femme de Theodore avec qui il doit signer les papiers du divorce ?", answer: "Catherine",
    realisateur: "Spike Jonze", description: "Dans un futur proche, un homme solitaire tombe amoureux d'une intelligence artificielle avancée.",
    turl: "https://www.youtube.com/watch?v=fAs4qKLnRZI", verrouille: false },

    { title: "Matrix 1", img: "7.png", password: "5hW",
    question: "Comment s'appelle le vaisseau dirigé par Morpheus ?", answer: "Nebuchadnezzar",
    realisateur: "Lana et Lilly Wachowski", description: "Un hacker découvre que le monde tel qu'il le connaît n'est qu'une simulation virtuelle créée par des machines.",
    turl: "https://www.youtube.com/watch?v=vKQi3bBA1y8", verrouille: false },

    { title: "Matrix 2", img: "8.png", password: "3dR",
    question: "Selon l'Architecte, à quelle version de la Matrice Néo appartient-il ?", answer: "La sixième",
    realisateur: "Lana et Lilly Wachowski", description: "Néo doit faire face à de nouveaux défis pour protéger Sion tout en cherchant l'origine de la Matrice.",
    turl: "https://www.youtube.com/watch?v=zmYE3Qrf66Y", verrouille: false },

    { title: "Matrix 3", img: "9.png", password: "6uF",
    question: "Quelle est la condition finale imposée par Néo aux Machines pour arrêter Smith ?", answer: "La Paix",
    realisateur: "Lana et Lilly Wachowski", description: "La bataille finale entre l'humanité et les machines atteint son paroxysme tandis que Néo affronte l'agent Smith.",
    turl: "https://www.youtube.com/watch?v=hMbexEPAOQI", verrouille: false },

    { title: "Persepolis", img: "50.png", password: "4vC",
    question: "", answer: "",
    realisateur: "Vincent Paronnaud et Marjane Satrapi", description: "Une journaliste tente de réaliser une interview avec Salvador Dalí, qui se transforme en un voyage absurde.",
    turl: "https://www.youtube.com/watch?v=MLILb_JnFx4", verrouille: false },

    { title: "The Big Lebowski", img: "47.png", password: "5tV",
    question: "Qu'est-ce qui a été volé au 'Duc' et qui, selon lui, 'donnait tout son style à la pièce' ?", answer: "Son tapis",
    realisateur: "Joel et Ethan Coen", description: "Un flemmard invétéré est pris pour un millionnaire et se retrouve mêlé à une affaire d'enlèvement.",
    turl: "https://www.youtube.com/watch?v=mY93vL79W4s", verrouille: false },

    { title: "Tenacious D et le médiator du destin", img: "48.png", password: "2fP",
    question: "De quelle partie du corps de Satan provient le médiator magique ?", answer: "Une dent",
    realisateur: "Liam Lynch", description: "Deux musiciens partent en quête d'un médiator aux pouvoirs surnaturels pour devenir le plus grand groupe de rock.",
    turl: "https://www.youtube.com/watch?v=TXxH7H0KQWI", verrouille: false },

    { title: "Réalité", img: "49.png", password: "7xL",
    question: "Que doit trouver le réalisateur Jason en 48h pour que son film soit produit ?", answer: "Le meilleur gémissement de l'histoire",
    realisateur: "Quentin Dupieux", description: "Un caméraman rêve de réaliser un film d'horreur, mais doit d'abord trouver le cri de douleur parfait.",
    turl: "https://www.youtube.com/watch?v=FRzONsDtDFM", verrouille: false },

    { title: "Fumer fait tousser", img: "14.png", password: "7mX",
    question: "Comment s'appelle le robot dépressif et suicidaire qui accompagne la Tabac Force ?", answer: "Norbert",
    realisateur: "Quentin Dupieux", description: "La 'Tabac Force' part en retraite pour renforcer sa cohésion d'équipe avant d'affronter un maléfique empereur.",
    turl: "https://www.youtube.com/watch?v=y2x9WfC9SjM", verrouille: false },

    { title: "Oss 117 1", img: "17.png", password: "3fS",
    question: "Quel est le nom de la princesse égyptienne dont Hubert tombe 'presque' amoureux ?", answer: "Al Tarouk",
    realisateur: "Michel Hazanavicius", description: "Hubert Bonisseur de La Bath enquête au Caire en 1955 dans cette parodie culte des films d'espionnage.",
    turl: "https://www.youtube.com/watch?v=yYvHq-O_i1c", verrouille: false },

    { title: "Oss 117 2", img: "18.png", password: "9pZ",
    question: "Comment s'appelle le nazi que recherche Hubert au Brésil ?", answer: "Von Zimmel",
    realisateur: "Michel Hazanavicius", description: "L'espion français se rend à Rio en 1967 pour mettre la main sur un microfilm compromettant.",
    turl: "https://www.youtube.com/watch?v=5VjI_jA_q7g", verrouille: false },

    { title: "La cité de la peur", img: "19.png", password: "2hK",
    question: "Quel est le nom de famille de l'ami de Simon Jérémi qui 'est content' ?", answer: "Odile",
    realisateur: "Alain Berbérian", description: "Un tueur en série terrorise le Festival de Cannes alors qu'une attachée de presse tente de promouvoir son film.",
    turl: "https://www.youtube.com/watch?v=680X_vH_Ias", verrouille: false },

    { title: "Il y a t'il un pilote dans l'avion", img: "23.png", password: "8dV",
    question: "Quel est le problème de boisson récurrent de Ted Striker ?", answer: "Il s'arrose le visage",
    realisateur: "Zucker, Abrahams et Zucker", description: "Une parodie culte où un ancien pilote traumatisé doit prendre les commandes d'un avion en détresse.",
    turl: "https://www.youtube.com/watch?v=fP7m_01wJ34", verrouille: false },

    { title: "Jumanji", img: "24.png", password: "5jN",
    question: "Quel est le nom du chasseur qui poursuit Alan Parrish depuis 26 ans ?", answer: "Van Pelt",
    realisateur: "Joe Johnston", description: "Un jeu de société magique libère des dangers de la jungle dans le monde réel à chaque lancer de dés.",
    turl: "https://www.youtube.com/watch?v=9P6TZcCk0MM", verrouille: false },

    { title: "Ready Player One", img: "25.png", password: "7gM",
    question: "Quel est le nom de l'avatar de la rebelle dont Wade tombe amoureux ?", answer: "Art3mis",
    realisateur: "Steven Spielberg", description: "Dans un futur dystopique, les gens vivent dans l'OASIS, un monde virtuel cachant un immense trésor.",
    turl: "https://www.youtube.com/watch?v=cSp1dM2Vj48", verrouille: false },

    { title: "Premier Contact", img: "28.png", password: "9kF",
    question: "Comment les humains finissent-ils par appeler les deux extraterrestres avec qui ils communiquent ?", answer: "Abbott et Costello",
    realisateur: "Denis Villeneuve", description: "Une linguiste est chargée de communiquer avec des extraterrestres dont les vaisseaux se sont posés sur Terre.",
    turl: "https://www.youtube.com/watch?v=f8mYf5p_f7I", verrouille: false },

    { title: "Borat", img: "29.png", password: "1mR",
    question: "Quelle célébrité Borat essaie-t-il d'enlever avec un sac de mariage traditionnel ?", answer: "Pamela Anderson",
    realisateur: "Larry Charles", description: "Un journaliste kazakh parcourt les États-Unis dans un faux documentaire pour comprendre la culture américaine.",
    turl: "https://www.youtube.com/watch?v=P_98O_K05Yw", verrouille: false },

    { title: "RRRrrrrr", img: "30.png", password: "4vS",
    question: "Comment la tribu appelle-t-elle l'acte criminel inédit commis dans le film ?", answer: "Un criminu",
    realisateur: "Alain Chabat", description: "Il y a 35 000 ans, deux tribus s'affrontent pour obtenir le secret du shampooing.",
    turl: "https://www.youtube.com/watch?v=2rE_S49XqO4", verrouille: false },

    { title: "La classe Américaine", img: "31.png", password: "8rD",
    question: "Quelle est la dernière phrase (le dernier mot) prononcée par George Abitbol ?", answer: "Monde de merde",
    realisateur: "Michel Hazanavicius et Dominique Mézerette", description: "Un détournement culte de films de la Warner où les dialogues originaux sont remplacés par des répliques absurdes.",
    turl: "https://www.youtube.com/watch?v=jWkCq0Q38E8", verrouille: false },

    { title: "Dune 1", img: "42.png", password: "7mS",
    question: "Comment s'appelle le test de douleur infligé à Paul par la Révérende Mère ?", answer: "Le Gom Jabbar",
    realisateur: "Denis Villeneuve", description: "Un jeune noble doit protéger la ressource la plus précieuse de la galaxie sur la planète désertique Arrakis.",
    turl: "https://www.youtube.com/watch?v=fOvveuMeos0", verrouille: false },

    { title: "Dune 2", img: "43.png", password: "3hB",
    question: "Comment appelle-t-on le liquide bleu mortel que Paul doit boire pour devenir le Kwisatz Haderach ?", answer: "L'Eau de Vie",
    realisateur: "Denis Villeneuve", description: "Paul Atréides s'unit aux Fremen pour mener la révolte contre les conspirateurs qui ont détruit sa famille.",
    turl: "https://www.youtube.com/watch?v=WAY8-M268Xg", verrouille: false },

    { title: "Blade Runner 2049", img: "44.png", password: "1vR",
    question: "Quel est le nom de l'intelligence artificielle holographique qui partage la vie de K ?", answer: "Joi",
    realisateur: "Denis Villeneuve", description: "Un nouvel officier de police déterre un secret enfoui qui pourrait plonger la société dans le chaos.",
    turl: "https://www.youtube.com/watch?v=WarevDmt_Ug", verrouille: false },

    { title: "Gladiator", img: "45.png", password: "4bX",
    question: "Quel est le nom de l'ancien gladiateur qui a racheté Maximus et lui donne sa chance à Rome ?", answer: "Proximo",
    realisateur: "Ridley Scott", description: "Un général romain trahi devient gladiateur pour se venger de l'empereur qui a assassiné sa famille.",
    turl: "https://www.youtube.com/watch?v=owK1at_O7_0", verrouille: false },

    { title: "True man Show", img: "37.png", password: "4qR",
    question: "Comment s'appelle le créateur et réalisateur de l'émission qui surveille Truman depuis la lune ?", answer: "Christof",
    realisateur: "Peter Weir", description: "Un homme découvre que sa vie entière est en réalité une émission de télé-réalité diffusée 24h/24.",
    turl: "https://www.youtube.com/watch?v=dlnmQbPGuls", verrouille: false },

    { title: "Le Cinquième élement", img: "38.png", password: "6xM",
    question: "Quelle est la première phrase complète que Leeloo dit à Korben Dallas ?", answer: "Multipass",
    realisateur: "Luc Besson", description: "Au XXIIIe siècle, un chauffeur de taxi doit protéger une jeune femme qui est la seule clé du salut de l'humanité.",
    turl: "https://www.youtube.com/watch?v=1p_BvXpC8oA", verrouille: false },

    { title: "Rec", img: "39.png", password: "8fL",
    question: "Quel est le nom de la jeune fille 'possédée' à l'origine de l'infection dans le grenier ?", answer: "Tristana Medeiros",
    realisateur: "Jaume Balagueró et Paco Plaza", description: "Une équipe de télé filme une intervention de pompiers qui tourne au cauchemar infectieux dans un immeuble.",
    turl: "https://www.youtube.com/watch?v=ylUf4V00sN4", verrouille: false },

    { title: "Into the Wild", img: "33.png", password: "5kS",
    question: "Quel est le numéro écrit sur le côté du 'Magic Bus' où s'installe Christopher ?", answer: "142",
    realisateur: "Sean Penn", description: "Un jeune diplômé rejette la société de consommation et part vivre en solitaire dans la nature sauvage d'Alaska.",
    turl: "https://www.youtube.com/watch?v=2GWPOPSXGYI", verrouille: false },

    { title: "Incassable", img: "34.png", password: "3vH",
    question: "Quel est le nom de la galerie d'art spécialisée dans les comics tenue par Elijah Price ?", answer: "Limited Edition",
    realisateur: "M. Night Shyamalan", description: "Un homme découvre qu'il est invincible après avoir été le seul survivant d'un terrible accident de train.",
    turl: "https://www.youtube.com/watch?v=AC-LA9QVdmI", verrouille: false },

    { title: "Bruce tous puissant", img: "35.png", password: "9mC",
    question: "Quel est le nom du présentateur rival que Bruce humilie en direct en lui faisant dire des bêtises ?", answer: "Evan Baxter",
    realisateur: "Tom Shadyac", description: "Un journaliste insatisfait de sa vie reçoit tous les pouvoirs de Dieu pour voir s'il peut faire mieux.",
    turl: "https://www.youtube.com/watch?v=l5eK3q4JXZo", verrouille: false },

    { title: "Mulan", img: "40.png", password: "2nY",
    question: "Quel nom masculin Mulan choisit-elle pour s'enrôler dans l'armée ?", answer: "Ping",
    realisateur: "Barry Cook et Tony Bancroft", description: "Une jeune femme se déguise en homme pour prendre la place de son père dans l'armée impériale chinoise.",
    turl: "https://www.youtube.com/watch?v=M7S3P88eJ_s", verrouille: false },

    { title: "Transcendance", img: "21.png", password: "1xQ",
    question: "Dans quelle petite ville isolée Will Caster fait-il construire son immense centre de données souterrain ?", answer: "Brightwood",
    realisateur: "Wally Pfister", description: "La conscience d'un scientifique mourant est téléchargée dans un ordinateur, créant une intelligence omnipotente.",
    indice: "Science-fiction, Thriller",
    turl: "https://www.youtube.com/watch?v=VCTen3-B8GU", verrouille: true },

    { title: "Jumper", img: "22.png", password: "4uG",
    question: "Où se trouve la 'bibliothèque' secrète de Griffin, là où il garde ses preuves sur les Paladins ?", answer: "Dans le Colisée",
    realisateur: "Doug Liman", description: "Un jeune homme découvre qu'il a le pouvoir de se téléporter partout dans le monde.",
    indice: "Fantastique, Action",
    turl: "https://www.youtube.com/watch?v=RcMH5sAYc5o", verrouille: true },

    { title: "Chappee", img: "27.png", password: "6tW",
    question: "Quel est le nom du robot massif et lourd piloté à distance par le personnage de Hugh Jackman ?", answer: "Moose",
    realisateur: "Neill Blomkamp", description: "Un robot de police est doté d'une conscience et doit apprendre à vivre dans un monde violent.",
    indice: "Science-fiction, Action",
    turl: "https://www.youtube.com/watch?v=lYpdtB4UKWE", verrouille: true },

    { title: "Au Boulot !", img: "27.png", password: "6tW",
    question: "", answer: "",
    realisateur: "Gilles Perret", description: "Peut-on réinsérer les riches ? François Ruffin invite Sarah Saldmann à s'installer pendant un mois avec le SMIC.",
    indice: "Documentaire",
    turl: "https://www.youtube.com/watch?v=lYpdtB4UKWE", verrouille: true },

    { title: "Ill Manors", img: "32.png", password: "2pT",
    question: "Quel est le prénom du bébé abandonné dans le sac que les dealers trouvent ?", answer: "Michelle",
    realisateur: "Ben Drew", description: "Une plongée violente dans les rues de Londres à travers les destins croisés de plusieurs personnages.",
    indice: "Drame, Crime",
    turl: "https://www.youtube.com/watch?v=MT44ch0FFEU", verrouille: true },

    { title: "Looper", img: "36.png", password: "1zL",
    question: "Quel est le surnom du futur chef de la pègre qui envoie les victimes dans le passé ?", answer: "Le Maître des Pluies",
    realisateur: "Rian Johnson", description: "Des tueurs à gages sont chargés d'éliminer des victimes envoyées du futur par un syndicat du crime.",
    indice: "Action, Science-fiction",
    turl: "https://www.youtube.com/watch?v=2iQuoxZ9dfc", verrouille: true },

    { title: "Tarzan", img: "41.png", password: "5vW",
    question: "Quel est le nom de l'explorateur qui veut capturer les gorilles pour les vendre ?", answer: "Clayton",
    realisateur: "Kevin Lima et Chris Buck", description: "Un homme élevé par des gorilles dans la jungle découvre la civilisation lors d'une expédition humaine.",
    indice: "Animation, Aventure",
    turl: "https://www.youtube.com/watch?v=2Wv_2UIdYtY", verrouille: true },

    { title: "Abysse", img: "15.png", password: "8rA",
    question: "Quel message Bud écrit-il sur son ardoise à sa femme alors qu'il manque d'oxygène au fond ?", answer: "Je t'aime",
    realisateur: "James Cameron", description: "Une équipe de forage sous-marin découvre des formes de vie mystérieuses au fond des abysses.",
    indice: "Science-fiction, Aventure",
    turl: "https://www.youtube.com/watch?v=9oR-B6S7oY0", verrouille: true },

    { title: "L'amour Ouf", img: "20.png", password: "6lD",
    question: "Sur quelle chanson de The Cure les deux protagonistes dansent-ils dans la cour d'école ?", answer: "A Forest",
    realisateur: "Gilles Lellouche", description: "Une histoire d'amour passionnelle entre deux adolescents que tout oppose, sur plusieurs décennies.",
    indice: "Drame, Romance",
    turl: "https://www.youtube.com/watch?v=C7mS-TbeI8M", verrouille: true },

    { title: "Le Guide du Voyageur galactique", img: "16.png", password: "5wK",
    question: "En quoi le moteur à improbabilité infinie transforme-t-il les deux missiles nucléaires ?", answer: "Un pétunia et une baleine",
    realisateur: "Garth Jennings", description: "Arthur Dent échappe à la destruction de la Terre et commence un voyage déjanté à travers la galaxie.",
    indice: "Science-fiction, Comédie",
    turl: "https://www.youtube.com/watch?v=asS9G_HIdjI", verrouille: true },
    
    { title: "Kaamelott 2 part.1", img: "27.png", password: "6tW",
    question: "", answer: "",
    realisateur: "Alexandre Astier", description: "Les Dieux sont en colère contre Arthur ! Après la destruction de Kaamelott, son refus obstiné de tuer Lancelot précipite le Royaume de Logres à sa perte. Il réunit ses Chevaliers, novices téméraires et vétérans désabusés, autour de la Nouvelle Table Ronde et les envoie prouver leur valeur aux quatre coins du Monde, des Marais Orcaniens aux terres glacées du Dragon Opalescent.",
    indice: "Aventure, Fantastique, Comédie",
    turl: "https://www.youtube.com/watch?v=lYpdtB4UKWE", verrouille: true },

    { title: "Je suis une légende", img: "46.png", password: "8nN",
    question: "Comment s'appelle le mannequin à qui Robert Neville parle tous les jours dans le magasin vidéo ?", answer: "Fred",
    realisateur: "Francis Lawrence", description: "Le dernier survivant d'un virus ayant transformé l'humanité en mutants tente de trouver un remède à New York.",
    indice: "Zombie, Drame",
    turl: "https://www.youtube.com/watch?v=uYUbLTxJl-A", verrouille: true },

    { title: "10 Cloverfield Lane", img: "10.png", password: "9jN",
    question: "À quel jeu de société Howard, Emmett et Michelle jouent-ils dans le bunker ?", answer: "Le jeu de la vie",
    realisateur: "Dan Trachtenberg", description: "Une femme se réveille dans un bunker après un accident, son hôte affirmant que l'extérieur est contaminé.",
    indice: "Thriller, Science-fiction",
    turl: "https://www.youtube.com/watch?v=z-mFf4gytQI", verrouille: true },

    { title: "Stargate", img: "11.png", password: "2tX",
    question: "Comment s'appelle le minéral instable utilisé pour faire fonctionner la porte ?", answer: "Naquadah",
    realisateur: "Roland Emmerich", description: "Une équipe de militaires et un archéologue franchissent une porte stellaire menant à une autre planète.",
    indice: "Science-fiction, Aventure",
    turl: "https://www.youtube.com/watch?v=uK8n_V2EaH8", verrouille: true },

    { title: "Scary Movie 3", img: "12.png", password: "1pB",
    question: "Comment s'appelle la petite fille terrifiante qui sort du puits (parodie du Cercle) ?", answer: "Tabitha",
    realisateur: "David Zucker", description: "Une parodie déjantée des films d'horreur et de science-fiction les plus célèbres des années 2000.",
    indice: "Comédie, Absurde",
    turl: "https://www.youtube.com/watch?v=XvK_E6t5F4Y", verrouille: true },

    { title: "Daaaaaalie", img: "13.png", password: "4vC",
    question: "Quel objet insolite Dalí veut-il absolument filmer lors de l'interview ?", answer: "Une fontaine",
    realisateur: "Quentin Dupieux", description: "Une journaliste tente de réaliser une interview avec Salvador Dalí, qui se transforme en un voyage absurde.",
    indice: "Comédie, Absurde",
    turl: "https://www.youtube.com/watch?v=MLILb_JnFx4", verrouille: true },

    { title: "Le Seigneur des anneaux l'animé de 1979", img: "26.png", password: "3bK",
    question: "Quel personnage majeur des livres est totalement absent de cette version de Bakshi ?", answer: "Tom Bombadil",
    realisateur: "Ralph Bakshi", description: "Une adaptation expérimentale du premier tome de Tolkien utilisant la technique de la rotoscopie.",
    indice: "Fantastique, Animation",
    turl: "https://www.youtube.com/watch?v=6Yt-R70_R0Y", secret: true },

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

// État local (cache synchronisé avec Firebase)
let cachedUnlocked          = [];
let cachedValidated         = [];
let cachedTierlist          = {};
let cachedRevealedMysteries = [];
let cachedClaimedMilestones = 0;

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
    updateTierlistBadge();
}, (err) => {
    console.error("Firebase read error (validated):", err);
    showToast("Erreur Firebase (lecture) : " + err.code);
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

function updateMysteryPointsIndicator() {
    const points = getAvailablePoints();
    const el = document.getElementById("mystery-points-indicator");
    if (!el) return;
    if (points <= 0) {
        el.classList.add("hidden");
    } else {
        el.classList.remove("hidden");
        const text = points === 1 ? "1 clé(s) disponible" : `${points} films verrouillés à débloquer`;
        document.getElementById("mystery-points-text").textContent = text;
    }
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
    buildGrid();
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
};

function playSound(name) {
    const s = SOUNDS[name];
    if (!s) return;
    s.currentTime = 0;
    s.play().catch(() => {});
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
    updateMysteryPointsIndicator();
    updateRewardsBadge(true);
}


function rewardBadgesHTML(rewards) {
    return (rewards || []).map(r => {
        let cls = "reward-badge";
        if (/clé/i.test(r))     cls += " reward-badge-key";
        else if (/secret/i.test(r))  cls += " reward-badge-secret";
        else if (/myst/i.test(r))    cls += " reward-badge-mystery";
        return `<span class="${cls}">${r}</span>`;
    }).join("");
}

function buildMilestones() {
    const container = document.getElementById("milestones");
    const validated = getValidated();
    const count = validated.length;
    const claimedCount = getClaimedMilestones();
    container.innerHTML = "";

    // Index du premier palier pas encore atteint → reçoit la barre de progression
    const nextIndex = MILESTONES.findIndex(m => count < m.count);

    MILESTONES.forEach((m, index) => {
        const reached   = count >= m.count;
        const claimed   = index < claimedCount;
        const claimable = reached && !claimed;
        const isNext    = index === nextIndex;

        // Barre de progression intégrée dans la carte du prochain palier
        const missing = m.count - count;
        const pct = Math.round((count / m.count) * 100);
        const missingLabel = missing + " film" + (missing > 1 ? "s" : "") + " restant" + (missing > 1 ? "s" : "");
        const progressHTML = isNext ? `
            <div class="mpi-bar-row">
                <div class="mpi-track"><div class="mpi-fill" style="width:${pct}%"></div></div>
                <span class="mpi-label">${missingLabel}</span>
            </div>
        ` : "";

        const div = document.createElement("div");
        div.className = "milestone";
        if (reached)  div.classList.add("reached");
        if (claimed)  div.classList.add("claimed");
        if (claimable) div.classList.add("claimable");
        if (isNext)   div.classList.add("next");

        div.innerHTML = `
            <img src="medias/s${index + 1}.png" class="milestone-icon" alt="Palier ${m.count}">
            <div class="milestone-content">
                <div class="milestone-header">
                    <span class="milestone-count">${m.count} succès</span>
                    <span class="milestone-check">&#10003;</span>
                    ${claimable ? `<button class="milestone-claim-btn">Récupérer</button>` : ""}
                </div>
                <span class="milestone-reward-label">Récompense</span>
                <div class="milestone-reward-box">${rewardBadgesHTML(m.rewards)}</div>
                ${progressHTML}
            </div>
        `;

        if (claimable) {
            div.querySelector(".milestone-claim-btn").addEventListener("click", () => {
                playSound("takeReward");
                saveClaimedMilestones(getClaimedMilestones() + 1);

                if (m.secretFilm !== undefined) {
                    const revealed = getRevealedMysteries();
                    if (!revealed.includes(m.secretFilm)) {
                        revealed.push(m.secretFilm);
                        saveRevealedMysteries(revealed);
                    }
                    setTimeout(() => showPosterReveal(m.secretFilm), 500);
                }
            });
        }

        container.appendChild(div);
    });
}

function buildGrid() {
    const grid = document.getElementById("grid");
    const validated = getValidated();
    const revealedMysteries = getRevealedMysteries();
    grid.innerHTML = "";

    const SVG_LOCKED = `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm296.5-143.5Q560-327 560-360t-23.5-56.5Q513-440 480-440t-56.5 23.5Q400-393 400-360t23.5 56.5Q447-280 480-280t56.5-23.5ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg>`;

    getSortedIndices().forEach(i => {
        const ach = ACHIEVEMENTS[i];
        const isValidated = validated.includes(i);
        const isMystery = ach.verrouille && !isValidated && !revealedMysteries.includes(i);
        const isSecret  = ach.secret     && !isValidated && !revealedMysteries.includes(i);
        const cell = document.createElement("div");
        cell.className = "cell";
        if (isValidated) cell.classList.add("validated");
        if (isMystery)   cell.classList.add("mystery");
        if (isSecret)    cell.classList.add("secret");

        const displayTitle = isMystery ? "Film verrouillé" : isSecret ? "Film secret" : ach.title;
        const imgSrc = achImg(i);

        cell.innerHTML = `
            <img class="cell-icon" src="${imgSrc}" alt="${displayTitle}" loading="lazy">
            ${isMystery ? `<div class="cell-lock-overlay">${SVG_LOCKED}</div>` : ""}
            ${isSecret  ? `<div class="cell-lock-overlay cell-secret-overlay">?</div>` : ""}
            <div class="cell-content">
                <div class="cell-info">
                    <span class="cell-title">${displayTitle}</span>
                    <span class="cell-number-tag">${i + 1}</span>
                </div>
            </div>
            <div class="cell-status">
            <div class="cell-background">
                <span class="cell-status-label cell-lock-label">${isSecret ? "Secret" : "Verrouillé"}</span>
                <span class="cell-lock-icon">${SVG_LOCKED}</span>
            </div>
            <div class="cell-background">
                <span class="cell-status-label cell-valid-label">Validé</span>
                <span class="cell-check-icon">&#10003;</span>
            </div>
            </div>
        `;

        cell.addEventListener("click", () => openModal(i));

        // —— DEBUG : bouton test verrouiller / valider (à retirer avant publication) ——
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
        // —— FIN DEBUG ——

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
    const validated = getValidated();
    const revealed = forceReveal || validated.includes(index);
    const isLocked = (ach.verrouille || ach.secret) && !revealed;
    const lockLabel = ach.secret ? "Film secret" : "Film verrouillé";

    modal.querySelector(".modal-number").textContent = num;
    modal.querySelector(".modal-title").textContent = isLocked ? lockLabel : ach.title;

    const icon = modal.querySelector(".modal-icon");
    if (isLocked) {
        icon.src = "medias/Myst.png";
    } else {
        icon.src = achImg(index);
    }
    icon.alt = isLocked ? lockLabel : ach.title;
}

function openAnimatedModal(modalId, index, forceReveal) {
    const modal = document.getElementById(modalId);
    fillModal(modal, index, forceReveal);
    modal.classList.remove("hidden", "anim-out");
    modal.classList.add("anim-in");
    activeModal = modal;
}




function setMenuVisible(visible) {
    document.querySelector(".menu").classList.toggle("nav-hidden", !visible);
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
    const num = index + 1;
    const validated = getValidated();
    const revealedMysteries = getRevealedMysteries();
    const isValidated = validated.includes(index);
    const isRevealedMystery = revealedMysteries.includes(index);
    const isMystery = ach.verrouille && !isValidated && !isRevealedMystery;
    const isSecret  = ach.secret     && !isValidated && !isRevealedMystery;
    const isLocked  = isMystery || isSecret;

    // Fond + icône
    const imgSrc = isLocked ? "medias/Myst.png" : achImg(index);
    document.getElementById("info-bg").style.backgroundImage = `url(${imgSrc})`;
    const icon = document.getElementById("info-icon");
    icon.src = imgSrc;
    icon.alt = isMystery ? "Film verrouillé" : isSecret ? "Film secret" : ach.title;

    // Badge + titre
    document.getElementById("info-num").textContent = num;
    document.getElementById("info-title").textContent = isMystery ? "Film verrouillé" : isSecret ? "Film secret" : ach.title;

    // Réalisateur / description / bande annonce
    const dirRow    = document.getElementById("info-director-row");
    const descEl    = document.getElementById("info-desc");
    const trailerEl = document.getElementById("info-trailer");
    if (isSecret) {
        dirRow.style.display    = "none";
        trailerEl.style.display = "none";
        descEl.style.display    = "block";
        descEl.textContent      = "Ce film se débloque en réclamant un palier de récompenses spécifique.";
    } else if (isMystery) {
        dirRow.style.display    = "none";
        trailerEl.style.display = "none";
        descEl.style.display    = "block";
        descEl.textContent      = "Récupère les récompenses des prochains paliers pour débloquer ce film.";
    } else {
        dirRow.style.display    = "flex";
        descEl.style.display    = "block";
        trailerEl.style.display = "inline-flex";
        document.getElementById("info-director").textContent = ach.realisateur;
        descEl.textContent  = ach.description;
        trailerEl.href      = ach.turl;
    }

    // Indice (affiché uniquement pour les films verrouillés)
    const hintEl = document.getElementById("info-hint");
    if (isMystery && ach.indice) {
        hintEl.textContent = "Indice : " + ach.indice;
        hintEl.classList.remove("hidden");
    } else {
        hintEl.classList.add("hidden");
    }

    // Bouton CTA selon l'état
    const cta = document.getElementById("info-cta");
    cta.className = "info-cta-btn";
    cta.style.display = "";

    if (isValidated) {
        cta.classList.add("cta-done");
        cta.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg> Succès déjà validé`;
    } else if (isSecret) {
        // Film secret : on ne peut pas le débloquer manuellement
        cta.style.display = "none";
    } else if (isMystery) {
        const points = getAvailablePoints();
        if (points > 0) {
            cta.classList.add("cta-unlock");
            cta.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor"><path d="M280-400q-17 0-28.5-11.5T240-440q0-17 11.5-28.5T280-480q17 0 28.5 11.5T320-440q0 17-11.5 28.5T280-400Zm0 200q-117 0-198.5-81.5T0-480q0-117 81.5-198.5T280-760q109 0 190 70.5T562-520h278l80 80-120 120-80-80-80 80-80-80H562q-11 58-46.5 104T420-160q-33 22-70.5 31T280-120Zm0-80q83 0 141.5-58.5T480-400q0-83-58.5-141.5T280-600q-83 0-141.5 58.5T80-400q0 83 58.5 141.5T280-200Z"/></svg> Débloquer ce film (1 clé)`;
        } else {
            cta.style.display = "none";
        }
    } else {
        cta.classList.add("cta-question");
        cta.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor"><path d="M560-360q17 0 29.5-12.5T602-402q0-17-12.5-29.5T560-444q-17 0-29.5 12.5T518-402q0 17 12.5 29.5T560-360Zm-30-128h60q0-29 6-42.5t28-35.5q30-30 40-48.5t10-43.5q0-45-31.5-73.5T560-760q-41 0-71.5 23T446-676l54 22q9-25 24.5-37.5T560-704q24 0 39 13.5t15 36.5q0 14-8 26.5T578-596q-33 29-40.5 45.5T530-488ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg> Répondre au défi`;
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

document.getElementById("poster-reveal-next").addEventListener("click", () => {
    const screen = document.getElementById("poster-reveal-screen");
    screen.classList.remove("active");
    screen.addEventListener("transitionend", function handler() {
        screen.removeEventListener("transitionend", handler);
        screen.classList.add("hidden");
        setMenuVisible(true);
    });
});

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
            closeAnimatedModal(() => showPosterReveal(index));
        }, 650);
    } else {
        closeAnimatedModal(() => {
            document.getElementById("question-text").textContent = ACHIEVEMENTS[index].question;
            openAnimatedModal("modal-question", index, true);
            document.getElementById("question-bg").style.backgroundImage = `url(${achImg(index)})`;
            setTimeout(() => document.getElementById("answer-input").focus(), 100);
        });
    }
}

function closeModal() {
    closeAnimatedModal();
    currentIndex = null;
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

document.getElementById("sidebar-reset").addEventListener("click", () => {
    document.getElementById("sidebar-reset-confirm").classList.remove("hidden");
});

document.getElementById("sidebar-reset-cancel").addEventListener("click", () => {
    document.getElementById("sidebar-reset-confirm").classList.add("hidden");
});

document.getElementById("sidebar-reset-ok").addEventListener("click", () => {
    document.getElementById("sidebar-reset-confirm").classList.add("hidden");
    Promise.all([
        refUnlocked.set(null),
        refValidated.set(null),
        refTierlist.set(null),
        refRevealedMysteries.set(null),
        refClaimedMilestones.set(null)
    ]).catch(err => {
        console.error("Firebase reset error:", err);
        showToast("Erreur reset : " + err.code);
    });
});

// ============================================================
//  NAVIGATION — barre de menu bas
// ============================================================
let currentView = 'films';

function setView(view) {
    if (currentView === view) return;
    playSound("click");
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
}

document.querySelectorAll(".menu-btn[data-view]").forEach(btn => {
    btn.addEventListener("click", () => setView(btn.dataset.view));
});

// Zoom de la grille (2 à 4 colonnes)
let currentCols = window.innerWidth > 768 ? 4 : 2;
const refCols = db.ref("game/cols");

function setGridCols(n, persist = true) {
    currentCols = n;
    const grid = document.getElementById("grid");
    grid.classList.remove("cols-2", "cols-3", "cols-4");
    grid.classList.add("cols-" + n);
    document.getElementById("zoom-label").textContent = n;
    document.getElementById("zoom-out").disabled = n <= 2;
    document.getElementById("zoom-in").disabled  = n >= 4;
    const tgl = document.getElementById("zoom-toggle-label");
    if (tgl) tgl.textContent = n;
    if (persist) refCols.set(n);
}

// Lire la valeur sauvegardée, sinon utiliser la valeur par défaut
refCols.once("value", (snap) => {
    const saved = snap.val();
    setGridCols(saved ?? currentCols, false);
});

document.getElementById("zoom-out").addEventListener("click", () => {
    if (currentCols > 2) { setGridCols(currentCols - 1); triggerGridAnimation(); }
});
document.getElementById("zoom-in").addEventListener("click", () => {
    if (currentCols < 4) { setGridCols(currentCols + 1); triggerGridAnimation(); }
});
document.getElementById("zoom-toggle").addEventListener("click", () => {
    setGridCols(currentCols === 2 ? 3 : 2);
    triggerGridAnimation();
});

// Boutons de filtre
document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const f = btn.dataset.filter;
        if (currentFilter === f) {
            // Cliquer sur le filtre actif → désactiver (tout afficher)
            currentFilter = "all";
            btn.classList.remove("active");
        } else {
            currentFilter = f;
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
        }
        buildGrid();
        triggerGridAnimation();
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

function onSplashDone() {
    splashDone = true;
    const splash = document.getElementById("splash");
    if (splash) splash.remove();
    if (firstBuildDone && !gridAnimStarted) startGridIntroAnimation();
}

setTimeout(() => {
    const splash = document.getElementById("splash");
    if (!splash) return;
    splash.classList.add("splash-fade");
    splash.addEventListener("transitionend", onSplashDone, { once: true });
}, 600);
setTimeout(onSplashDone, 500); // fallback si transitionend ne se déclenche pas
;  
// Init : afficher la grille immédiatement, Firebase la mettra à jour ensuite
buildGrid();

// ===== SCROLL — Masquer la sort-bar au scroll bas, révéler au scroll haut =====
// Principe : on ne change d'état qu'après 30px de scroll vers le bas,
// ou 15px vers le haut. Cela absorbe l'inertie et empêche tout glitch.
const stickyControls = document.querySelector(".sticky-controls");
let sortHidden = false;
let lastDecisionY = window.scrollY;

window.addEventListener("scroll", () => {
    const y = window.scrollY;
    const diff = y - lastDecisionY;

    if (!sortHidden && diff > 30) {
        sortHidden = true;
        stickyControls.classList.add("sort-hidden");
        lastDecisionY = y;
    } else if (sortHidden && diff < -15) {
        sortHidden = false;
        stickyControls.classList.remove("sort-hidden");
        lastDecisionY = y;
    }
}, { passive: true });


// ============================================================
//  TIER LIST
// ============================================================
let tlDragIdx    = null;  // index du film en cours de drag
let tlSelectedIdx = null; // index sélectionné (mode tap mobile)

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
    });
    card.addEventListener("dragend", () => {
        tlDragIdx = null;
        card.classList.remove("tl-dragging");
        document.querySelectorAll(".tl-drag-over").forEach(el => el.classList.remove("tl-drag-over"));
    });

    // ---- Double-clic : retirer du tier ----
    card.addEventListener("dblclick", () => {
        if (idx in cachedTierlist) {
            delete cachedTierlist[idx];
            saveTierlist();
            buildTierlistUI();
        }
    });

    // ---- Tap mobile : sélectionner puis placer ----
    card.addEventListener("click", (e) => {
        if (!("ontouchstart" in window)) return;
        e.stopPropagation();
        if (tlSelectedIdx === idx) {
            tlSelectedIdx = null;
            card.classList.remove("tl-selected");
        } else {
            document.querySelectorAll(".tl-selected").forEach(c => c.classList.remove("tl-selected"));
            tlSelectedIdx = idx;
            card.classList.add("tl-selected");
        }
    });

    return card;
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
        if (tierNum === 0) delete cachedTierlist[tlDragIdx];
        else               cachedTierlist[tlDragIdx] = tierNum;
        saveTierlist();
        buildTierlistUI();
    });
    // Tap mobile : placer la carte sélectionnée
    el.addEventListener("click", () => {
        if (tlSelectedIdx === null) return;
        if (tierNum === 0) delete cachedTierlist[tlSelectedIdx];
        else               cachedTierlist[tlSelectedIdx] = tierNum;
        tlSelectedIdx = null;
        saveTierlist();
        buildTierlistUI();
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
    bank.innerHTML = "";
    const unplaced = ACHIEVEMENTS.map((_, i) => i).filter(i => validated.has(i) && !placed.has(i));

    if (unplaced.length === 0) {
        const empty = document.createElement("div");
        empty.className  = "tl-bank-empty";
        empty.textContent = "Tous les films sont classés !";
        bank.appendChild(empty);
    } else {
        unplaced.forEach(i => bank.appendChild(makeTlCard(i)));
    }
}

// Init (appelé une fois — les drop zones permanentes et listeners)
function initTierlist() {
    setupTlDropZone(document.getElementById("tl-bank"), 0);
}

initTierlist();
