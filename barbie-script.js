// ============================================================
//  MODAL AU BOULOT — Jeu Barbie à cheval
// ============================================================
const AU_BOULOT_INDEX = 27;
const TARGET_SCORE    = 100000; // Score à battre pour valider le défi

// ── Questions Pascal (éditable librement) ──
const PASCAL_QUESTIONS = [
    { question: "C'est qui qui fait du mal au français ?",
    answers: ["La gauche", "Les riches"], correct: 0, },

    { question: "Il y a bien trop de...",
    answers: ["de gens different", "d'obstacle"], correct: 0, },

    { question: "J'ai faim, on va manger quelques pars ?",
    answers: ["Allons au bistro", "Allons au Ritz"], correct: 1, },

    { question: "C'est quoi la vérité ?",
    answers: ["la vérité", "ma vérité"], correct: 1, },

    { question: "Danold Trumb il est ...",
    answers: ["Viril", "Grossier"], correct: 0, },

    { question: "Les Schtroumpfs sont ...",
    answers: ["Une richesse", "Un problème"], correct: 1, },

    { question: "La france c'est ...",
    answers: ["Paté et couscous", "Fromage et Paté"], correct: 1, },

    { question: "Mais oui enfin ! Mais oui !",
    answers: ["Hmm ...", "Mais oui Pascal !"], correct: 1, },

    { question: "Dans le Rap il y a trop de ...",
    answers: ["Wesh yoh la drogue", "Blanc"], correct: 0, },

    { question: "J'invite trop souvent Bardelini ?",
    answers: ["Oui trop !", "Mais non enfin !"], correct: 1, },

    { question: "Je respect toujours le plurisme non ?",
    answers: ["Oui Pascal !", "Pas toujours ..."], correct: 0, },

    { question: "Une fois j'ai embrassé ma soeur.",
    answers: ["Ok !", "C'est déguelasse !"], correct: 0, },

    { question: "Qui est votre chanteur préféré ?",
    answers: ["Manuel Ciao", "Michel Sardoche"], correct: 1, },
];

const TUTORIAL_STEPS = [
    {
        messages: [
            "Me voilà prête pour le grand championnat des championnes du cheval, allez Sarah, montre leur de quoi tu es capable !",
            "Allez, sautons les obstacles !"
        ],
        entities: [
            { type: 'obstacle', at: 1.0 },
            { type: 'obstacle', at: 2.2 },
            { type: 'obstacle', at: 3.4 },
        ]
    },
    {
        messages: [
            "C'est bien de vouloir être championne de cheval mais championne et pauvre c'est la loose ! Il faut à tout prix que je récupère les récompenses sur mon chemin !"
        ],
        entities: [
            { type: 'obstacle',    at: 0.8 },
            { type: 'collectible', at: 1.4 },
            { type: 'obstacle',    at: 2.0 },
            { type: 'collectible', at: 2.6 },
            { type: 'obstacle',    at: 3.2 },
            { type: 'collectible', at: 3.8 },
            { type: 'obstacle',    at: 4.4 },
            { type: 'obstacle',    at: 5.2 },
        ]
    },
    {
        messages: [
            "Super ! Maintenant pour être une grande championne de cheval il faut que je reste constamment la plus belle pour les magazines, à chaque fois que je croise une coiffeuse il faut que j'en profite pour remettre un peu de fond de teint !"
        ],
        entities: [
            { type: 'obstacle',  at: 0.8 },
            { type: 'coiffeuse', at: 1.6 },
            { type: 'obstacle',  at: 2.6 },
            { type: 'coiffeuse', at: 3.4 },
            { type: 'obstacle',  at: 4.4 },
            { type: 'coiffeuse', at: 5.2 },
            { type: 'obstacle',  at: 6.2 },
            { type: 'obstacle',  at: 7.2 },
        ]
    },
    {
        messages: [
            "INFO PRATIQUE : Score final = [Distance parcourue] × [Richesse] ÷ [Beauté]",
            "Continuons ! Je suis passionnée de cheval mais je ne peux oublier mes responsabilités, Pascal a régulièrement besoin de moi, même si je participe à cette compétition il faut que j'intervienne dans son émission et que je réponde juste à ses questions !"
        ],
        entities: [
            { type: 'obstacle', at: 0.8 },
            { type: 'obstacle', at: 1.8 },
            { type: 'pascal',   at: 2.8 },
            { type: 'obstacle', at: 4.0 },
        ]
    },
    {
        messages: [
            "Super ! Maintenant je vais pouvoir participer à cette compétition dans de bonnes conditions... Attendez...",
            "Oh non !",
            "Qu'est-ce que je vois là-bas ?! Des gauchistes ?! Il faut que j'évite les gauchistes à tout prix !",
            "Il faut à tout prix que j'évite les gauchistes, ils veulent taxer les riches, si je les croise ils me taxeront à hauteur de 25% !"
        ],
        entities: [
            { type: 'obstacle',  at: 0.8 },
            { type: 'obstacle',  at: 1.8 },
            { type: 'gauchiste', at: 2.8 },
            { type: 'obstacle',  at: 4.2 },
        ]
    },
    {
        messages: [
            "Vous vous rendez compte ?! ... 25% !",
            "C'est vraiment plus possible de vivre dans un pays de communistes comme ça !",
            "Bref ! Rien ne doit me détourner de mon objectif !",
            "Je suis fin prête pour devenir la grande championne du championnat du cheval ! OUI ! Hahaha !"
        ],
        entities: []
    },
];

const BARBIE_GAME = (() => {
    // ── Constantes ──
    const MAX_LIVES        = 5;
    const FLOOR_RATIO      = 0.72;    // hauteur du sol (fraction de H)
    const BARBIE_W_RATIO   = 0.28;    // largeur de Barbie (fraction de W)
    const BARBIE_X_RATIO   = 0.10;    // position X de Barbie (fraction de W)
    const BARBIE_Y_OFFSET  = -0.09;    // décalage vertical de Barbie ET des obstacles (fraction de H, positif = vers le bas)
const COLL_Y_OFFSET    = -0.10;    // décalage hauteur collectibles depuis le pic du saut (positif = vers le bas)
    const DIALOGUES = [
        "Oh mince alors !",
        "Je suis vraiment cloche !",
        "Rien ne peut me détourner de mes objectifs",
        "Houlala j'ai failli me faire super mal !",
        "Je risque de perdre tout héritage !",
        "Aïe !",
        "Flûte !",
    ];
    let bubbleTimeout = null;
    let pops   = []; // { x, y, text, color, img, age, maxAge }
    let sparks = []; // { x, y, size, vx, vy, age, maxAge }

    function spawnSparks(W, H) {
        const count = 8 + Math.floor(Math.random() * 6);
        for (let i = 0; i < count; i++) {
            const size = 18 + Math.random() * 22;
            sparks.push({
                x: Math.random() * W,
                y: Math.random() * H * 0.85,
                size,
                vx: (Math.random() - 0.5) * 2,
                vy: -1 - Math.random() * 2,
                age: 0,
                maxAge: 500 + Math.random() * 300,
            });
        }
    }

    function showBubble(text) {
        const el = document.getElementById('auboulot-bubble');
        if (!el) return;
        el.textContent = text || DIALOGUES[Math.floor(Math.random() * DIALOGUES.length)];
        el.classList.remove('auboulot-bubble-hidden');
        if (bubbleTimeout) clearTimeout(bubbleTimeout);
        bubbleTimeout = setTimeout(() => el.classList.add('auboulot-bubble-hidden'), 2000);
    }
    const IDLE_INTERVAL    = 180;     // ms entre les frames idle
    const BASE_JUMP_DURATION = 800; // durée du saut de base en ms
    const JUMP_HEIGHT      = 0.10;   // hauteur max du saut (fraction de H)
    const BASE_SPEED       = 0.03;   // vitesse initiale (fraction de largeur / tick)
    const SPEED_INCREMENT  = 0.0003; // accélération (ancienne mécanique, remplacée)
    const SPEED_TIER       = 100;    // tous les N points → +10% vitesse

    // ── Images ──
    const imgBg       = new Image(); imgBg.src       = 'medias/barbie_background.png';
    const imgLoop     = new Image(); imgLoop.src     = 'medias/barbie_background_loop.png';
    const imgIdle1    = new Image(); imgIdle1.src    = 'medias/barbie_idle1.png';
    const imgIdle2    = new Image(); imgIdle2.src    = 'medias/barbie_idle2.png';
    const imgJump     = new Image(); imgJump.src     = 'medias/barbie_jump.png';
    const imgObs      = new Image(); imgObs.src      = 'medias/barbie_obstacle.png';
    const imgLiasse   = new Image(); imgLiasse.src   = 'medias/liasse.png';
    const imgMontre   = new Image(); imgMontre.src   = 'medias/montre.png';
    const imgCollier  = new Image(); imgCollier.src  = 'medias/collier.png';
    const imgFondTeint  = new Image(); imgFondTeint.src  = 'medias/fonddeteint.png';
    const imgCoiffeuse  = new Image(); imgCoiffeuse.src  = 'medias/coiffeuse.png';
    const imgSpark      = new Image(); imgSpark.src      = 'medias/spark.png';
    const imgPascal     = new Image(); imgPascal.src     = 'medias/barbie_pascal.png';
    const imgGauchiste  = new Image(); imgGauchiste.src  = 'medias/barbie_gauchistes.png';
    const imgGauchiste2 = new Image(); imgGauchiste2.src = 'medias/barbie_gauchistes2.png';

    // ── Sons ──
    const sndSoundtrack = new Audio('sounds/barbie_soundtrack.mp3');
    sndSoundtrack.loop   = true;
    sndSoundtrack.volume = 0.25;
    const sndCoin    = new Audio('sounds/barbie_coin.mp3');
    sndCoin.volume   = 0.7;
    const sndBeauty  = new Audio('sounds/barbie_beauty.mp3');
    sndBeauty.volume = 0.7;
    const sndImpact  = new Audio('sounds/barbie_impact.mp3');
    sndImpact.volume = 0.8;

    // ── Types de collectibles (rarity = probabilité de tirage) ──
    const COLL_TYPES = [
        { id: 'liasse',  img: () => imgLiasse,  richesse: 50,  rarity: 0.60 },
        { id: 'montre',  img: () => imgMontre,  richesse: 200, rarity: 0.28 },
        { id: 'collier', img: () => imgCollier, richesse: 500, rarity: 0.12 },
    ];
    const COIFFEUSE_INTERVAL  = 6.4;  // espacement régulier (fraction de W)
    const COIFFEUSE_PROXIMITY = 0.28; // distance de déclenchement du bouton (fraction de W)

    // ── État ──
    let canvas, ctx;
    let animId       = null;
    let lives        = MAX_LIVES;
    let score        = 0;
    let distanceTimer = 0;
    let speed        = BASE_SPEED;
    let lastTime     = 0;
    let idleFrame    = 0;
    let idleTimer    = 0;
    let loopX        = 0;          // position X du sol défilant
    let isJumping    = false;
    let jumpStartTime = 0;
    let barbieY      = 0;        // Y relatif (0 = sur le sol, négatif = en l'air)
    let obstacles    = [];
    let nextObsDist  = 0;
    let collectibles     = [];
    let nextCollDist     = 0;
    let coiffeuses       = [];
    let nextCoiffeuseDist = 0;
    let coiffeuseNear    = null;
    let pascals          = [];
    let nextPascalScore  = 110;
    let gauchistes       = [];
    let nextGauchisteDist = 0;  // premier pascal à score 110
    let pascalWrongCount = 0;    // nb de mauvaises réponses
    let pascalQuestion   = null; // question active { q, timerLeft, answered }
    let pascalTimerId    = null;
    let richesse     = 0;
    let beaute       = 100;
    let beauteTimer  = 0;    // ms accumulées pour la perte de beauté
    let jumpDuration = BASE_JUMP_DURATION;
    let lastScoreTier = 0;   // dernier palier de 100 pts traité
    let invincible   = false;
    let invincibleTimer = 0;
    let gameRunning  = false;
    let gamePaused   = false;
    let tutorialActive     = false;
    let tutorialStep       = 0;
    let tutorialMsgIdx     = 0;
    let tutorialSpawnList  = [];
    let tutorialSeqRunning = false;

    function floorY(h) { return h * FLOOR_RATIO; }

    function spawnObstacle(w) {
        // Taille de l'obstacle calculée relativement à Barbie (même échelle d'asset)
        const barbieCanvasW = w * BARBIE_W_RATIO;
        const scale = barbieCanvasW / (imgIdle1.naturalWidth || 1);
        const ow = imgObs.naturalWidth  * scale;
        const oh = imgObs.naturalHeight * scale;
        obstacles.push({ x: w, w: ow, h: oh });
        // Délai aléatoire avant le prochain obstacle : entre 1.2s et 2.8s de distance en pixels
        const gap = w * (0.5 + Math.random() * 0.9);
        nextObsDist = gap;
    }

    function resetState() {
        obstacles         = [];
        collectibles      = [];
        coiffeuses        = [];
        pascals           = [];
        sparks            = [];
        pops              = [];
        coiffeuseNear     = null;
        nextPascalScore   = 110;
        pascalWrongCount  = 0;
        hidePascalQuestion();
        const jobEl = document.getElementById('auboulot-job');
        if (jobEl) { jobEl.textContent = 'Job : Chroniqueuse'; jobEl.classList.remove('auboulot-job--chomage'); }
        score         = 0;
        distanceTimer = 0;
        beauteTimer   = 0;
        lastScoreTier = 0;
        richesse      = 0;
        beaute        = 100;
        lives         = MAX_LIVES;
        speed         = BASE_SPEED;
        jumpDuration  = BASE_JUMP_DURATION;
        loopX         = 0;
        isJumping     = false;
        jumpStartTime = 0;
        barbieY       = 0;
        idleFrame     = 0;
        idleTimer     = 0;
        invincible    = false;
        invincibleTimer = 0;
        gameRunning   = true;
        lastTime      = 0;
        if (canvas) {
            nextObsDist        = canvas.width * (0.6 + Math.random() * 0.6);
            nextCollDist       = canvas.width * (0.8 + Math.random() * 1.2);
            nextCoiffeuseDist  = canvas.width * 0.9;
            nextGauchisteDist  = canvas.width * (6 + Math.random() * 4);
        }
        gauchistes = [];
        updateHUD();
    }

    function updateHUD() {
        const el = document.getElementById('auboulot-lives');
        if (el) el.innerHTML = Array.from({ length: MAX_LIVES }, (_, i) =>
            `<img src="medias/${i < lives ? 'c-plein' : 'c-vide'}.png" class="auboulot-heart-icon">`).join('');
        const sc = document.getElementById('auboulot-score');
        if (sc) sc.textContent = score;
        const ri = document.getElementById('auboulot-richesse');
        if (ri) ri.textContent = richesse;
        const be = document.getElementById('auboulot-beaute');
        if (be) be.textContent = beaute;
        const fill = document.getElementById('auboulot-beaute-fill');
        if (fill) fill.style.transform = `scaleX(${beaute / 100})`;
    }

    function spawnCollectible(w, H) {
        // Tirage pondéré par rareté
        const rand = Math.random();
        let cumul = 0;
        let chosen = COLL_TYPES[0];
        for (const t of COLL_TYPES) {
            cumul += t.rarity;
            if (rand < cumul) { chosen = t; break; }
        }
        const scale = (w * BARBIE_W_RATIO * 0.22) / (chosen.img().naturalWidth || 50);
        const cw = (chosen.img().naturalWidth  || 50) * scale;
        const ch = (chosen.img().naturalHeight || 50) * scale;
        // Placé à la hauteur de saut max de Barbie + offset réglable
        const peakY = floorY(H) - H * JUMP_HEIGHT + H * BARBIE_Y_OFFSET + H * COLL_Y_OFFSET;
        const cy = peakY - ch * 0.5;
        collectibles.push({ x: w, w: cw, h: ch, y: cy, type: chosen });
        nextCollDist = w * (1.0 + Math.random() * 1.5);
    }

    function spawnCoiffeuse(w, H) {
        const scale = (w * BARBIE_W_RATIO * 0.9) / (imgCoiffeuse.naturalWidth || 100);
        const cw = imgCoiffeuse.naturalWidth  * scale;
        const ch = imgCoiffeuse.naturalHeight * scale;
        const cy = floorY(H) - ch + H * BARBIE_Y_OFFSET - 50;
        coiffeuses.push({ x: w, w: cw, h: ch, y: cy, used: false });
        nextCoiffeuseDist = w * COIFFEUSE_INTERVAL;
    }

    // ── Gauchistes ──
    function spawnGauchiste(w, H) {
        const scale = (w * BARBIE_W_RATIO * 1.03) / (imgGauchiste.naturalWidth || 100);
        const gw = imgGauchiste.naturalWidth  * scale;
        const gh = imgGauchiste.naturalHeight * scale;
        const gy = floorY(H) - gh + H * BARBIE_Y_OFFSET;
        gauchistes.push({ x: w, w: gw, h: gh, y: gy });
        nextGauchisteDist = w * (4.8 + Math.random() * 5.6);
    }

    // ── Tutoriel ──
    function startTutorial() {
        tutorialActive     = true;
        tutorialStep       = 0;
        tutorialMsgIdx     = 0;
        tutorialSeqRunning = false;
        tutorialSpawnList  = [];
        document.getElementById('auboulot-menu').classList.add('hidden');
        document.getElementById('auboulot-gameover').classList.add('hidden');
        document.getElementById('auboulot-game').classList.remove('hidden');
        setBgPulse(false);
        canvas = document.getElementById('auboulot-canvas');
        ctx    = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        canvas.width  = rect.width  || canvas.offsetWidth  || 400;
        canvas.height = rect.height || canvas.offsetHeight || 600;
        resetState();
        lives = 99;
        gamePaused = true;
        cancelAnimationFrame(animId);
        animId = requestAnimationFrame(gameLoop);
        showTutorialMsg();
    }

    function showTutorialMsg() {
        const msg = TUTORIAL_STEPS[tutorialStep].messages[tutorialMsgIdx];
        document.getElementById('auboulot-tuto-text').textContent = msg;
        document.getElementById('auboulot-tuto-box').classList.remove('hidden');
        gamePaused = true;
    }

    function advanceTutorialMsg() {
        const step = TUTORIAL_STEPS[tutorialStep];
        tutorialMsgIdx++;
        if (tutorialMsgIdx < step.messages.length) {
            showTutorialMsg();
        } else {
            document.getElementById('auboulot-tuto-box').classList.add('hidden');
            if (step.entities && step.entities.length > 0) {
                const W = canvas.width;
                tutorialSpawnList  = step.entities.map(e => ({ type: e.type, dist: e.at * W }));
                tutorialSeqRunning = true;
                gamePaused         = false;
            } else {
                endTutorial();
            }
        }
    }

    function checkTutorialSeqDone() {
        if (!tutorialSeqRunning) return;
        if (tutorialSpawnList.length === 0 &&
            obstacles.length    === 0 &&
            collectibles.length === 0 &&
            coiffeuses.length   === 0 &&
            pascals.length      === 0 &&
            gauchistes.length   === 0) {
            tutorialSeqRunning = false;
            tutorialStep++;
            tutorialMsgIdx = 0;
            if (tutorialStep >= TUTORIAL_STEPS.length) {
                endTutorial();
            } else {
                showTutorialMsg();
            }
        }
    }

    function spawnTutorialEntity(type, W, H) {
        switch (type) {
            case 'obstacle':    spawnObstacle(W);       break;
            case 'collectible': spawnCollectible(W, H); break;
            case 'coiffeuse':   spawnCoiffeuse(W, H);   break;
            case 'pascal':      spawnPascal(W, H);      break;
            case 'gauchiste':   spawnGauchiste(W, H);   break;
        }
    }

    function endTutorial() {
        tutorialActive     = false;
        tutorialSeqRunning = false;
        gameRunning        = false;
        cancelAnimationFrame(animId);
        document.getElementById('auboulot-game').classList.add('hidden');
        document.getElementById('auboulot-tuto-box').classList.add('hidden');
        setBgPulse(true);
        showMenuWithAnim();
    }

    // ── Pascal ──
    function spawnPascal(w, H) {
        const scale = (w * BARBIE_W_RATIO * 0.9) / (imgPascal.naturalWidth || 100);
        const cw = imgPascal.naturalWidth  * scale;
        const ch = imgPascal.naturalHeight * scale;
        const cy = floorY(H) - ch + H * BARBIE_Y_OFFSET - 50;
        pascals.push({ x: w, w: cw, h: ch, y: cy, triggered: false });
    }

    function showPascalQuestion() {
        if (!PASCAL_QUESTIONS.length) return;
        const q = PASCAL_QUESTIONS[Math.floor(Math.random() * PASCAL_QUESTIONS.length)];
        const DURATION = 5000;
        pascalQuestion = { q, answered: false };
        const overlay = document.getElementById('auboulot-pascal-overlay');
        document.getElementById('auboulot-pascal-question').textContent = q.question;
        document.getElementById('auboulot-pascal-ans1').textContent = q.answers[0];
        document.getElementById('auboulot-pascal-ans2').textContent = q.answers[1];
        document.getElementById('auboulot-pascal-ans1').className = 'auboulot-btn auboulot-pascal-ans-btn';
        document.getElementById('auboulot-pascal-ans2').className = 'auboulot-btn auboulot-pascal-ans-btn';
        document.getElementById('auboulot-pascal-timer-fill').style.transform = 'scaleX(1)';
        // Reflow pour relancer les animations CSS
        overlay.classList.remove('hidden');
        const panel = overlay.querySelector('.auboulot-pascal-panel');
        const img   = overlay.querySelector('.auboulot-pascal-img');
        if (panel) { panel.style.animation = 'none'; void panel.offsetWidth; panel.style.animation = ''; }
        if (img)   { img.style.animation   = 'none'; void img.offsetWidth;   img.style.animation   = ''; }
        gamePaused = true;
        obstacles = [];
        gauchistes = [];
        // Timer indépendant de la boucle de jeu
        const start = performance.now();
        const fill = document.getElementById('auboulot-pascal-timer-fill');
        function tickTimer() {
            if (!pascalQuestion || pascalQuestion.answered) return;
            const elapsed = performance.now() - start;
            const ratio = Math.max(0, 1 - elapsed / DURATION);
            if (fill) fill.style.transform = `scaleX(${ratio})`;
            if (elapsed >= DURATION) {
                pascalQuestion.answered = true;
                pascalWrongCount++;
                if (pascalWrongCount >= 1) {
                    const jobEl = document.getElementById('auboulot-job');
                    if (jobEl) { jobEl.textContent = 'Job : Chômeuse'; jobEl.classList.add('auboulot-job--chomage'); }
                    setTimeout(() => { if (gameRunning) showBubble('Oh non Pascal m\'a viré !'); }, 1400);
                }
                pascalTimerId = setTimeout(hidePascalQuestion, 800);
            } else {
                requestAnimationFrame(tickTimer);
            }
        }
        requestAnimationFrame(tickTimer);
    }

    function hidePascalQuestion() {
        pascalQuestion = null;
        if (pascalTimerId) { clearTimeout(pascalTimerId); pascalTimerId = null; }
        const overlay = document.getElementById('auboulot-pascal-overlay');
        if (overlay) overlay.classList.add('hidden');
        gamePaused = false;
        lastTime = 0; // évite un grand dt après la pause
    }

    function handlePascalAnswer(answerIndex) {
        if (!pascalQuestion || pascalQuestion.answered) return;
        pascalQuestion.answered = true;
        const correct = answerIndex === pascalQuestion.q.correct;
        const btn1 = document.getElementById('auboulot-pascal-ans1');
        const btn2 = document.getElementById('auboulot-pascal-ans2');
        btn1.classList.add(pascalQuestion.q.correct === 0 ? 'correct' : 'wrong');
        btn2.classList.add(pascalQuestion.q.correct === 1 ? 'correct' : 'wrong');
        if (correct) {
            richesse += 1000;
            updateHUD();
            const canvas = document.getElementById('auboulot-canvas');
            pops.push({ x: (canvas ? canvas.width : 400) * 0.5, y: (canvas ? canvas.height : 600) * 0.3,
                text: '+1000', color: '#ffd700', img: imgLiasse, size: 28, age: 0, maxAge: 900 });
        } else {
            pascalWrongCount++;
            if (pascalWrongCount >= 1) {
                const jobEl = document.getElementById('auboulot-job');
                if (jobEl) { jobEl.textContent = 'Job : Chômeuse'; jobEl.classList.add('auboulot-job--chomage'); }
                setTimeout(() => { if (gameRunning) showBubble('Oh non Pascal m\'a viré !'); }, 1400);
            }
        }
        pascalTimerId = setTimeout(hidePascalQuestion, 1200);
    }

    function jump() {
        if (!gameRunning || isJumping) return;
        isJumping     = true;
        jumpStartTime = performance.now();
        playSound && playSound('click');
    }

    function gameLoop(ts) {
        if (!gameRunning) return;
        animId = requestAnimationFrame(gameLoop);
        if (gamePaused) return;
        const dt = lastTime ? Math.min(ts - lastTime, 50) : 16;
        lastTime = ts;

        const W = canvas.width, H = canvas.height;
        const floor = floorY(H);
        const bW    = W * BARBIE_W_RATIO;
        const bH    = bW * (imgIdle1.naturalHeight / (imgIdle1.naturalWidth || 1));
        const bX    = W * BARBIE_X_RATIO;

        // ── Physique barbie ──
        if (isJumping) {
            const elapsed = performance.now() - jumpStartTime;
            if (elapsed >= jumpDuration) {
                isJumping = false;
                barbieY   = 0;
            } else {
                const t = elapsed / jumpDuration;
                barbieY = -Math.sin(Math.PI * t) * H * JUMP_HEIGHT;
            }
        }

        // ── Score distance (toutes les 300ms) ──
        distanceTimer += dt;
        if (distanceTimer >= 300) {
            distanceTimer -= 300;
            score++;
            updateHUD();
            // Accélération tous les SPEED_TIER points (désactivée en tutoriel)
            if (!tutorialActive) {
                const tier = Math.floor(score / SPEED_TIER);
                if (tier > lastScoreTier) {
                    lastScoreTier = tier;
                    speed        *= 1.10;
                    jumpDuration *= 0.90;
                }
            }
        }

        // ── Perte de beauté (1 par seconde) ──
        beauteTimer += dt;
        if (beauteTimer >= 1000) {
            beauteTimer -= 1000;
            beaute = Math.max(0, beaute - 1);
            updateHUD();
        }

        // ── Animation idle ──
        idleTimer += dt;
        if (idleTimer >= IDLE_INTERVAL) { idleTimer = 0; idleFrame = 1 - idleFrame; }

        // ── Invincibilité ──
        if (invincible) {
            invincibleTimer -= dt;
            if (invincibleTimer <= 0) invincible = false;
        }

        const spd = speed * W * dt * 0.016;

        if (tutorialActive) {
            // ── Tutoriel : spawn contrôlé ──
            for (let i = tutorialSpawnList.length - 1; i >= 0; i--) {
                tutorialSpawnList[i].dist -= spd;
                if (tutorialSpawnList[i].dist <= 0) {
                    spawnTutorialEntity(tutorialSpawnList[i].type, W, H);
                    tutorialSpawnList.splice(i, 1);
                }
            }
        } else {
            // ── Obstacles ──
            nextObsDist -= spd;
            if (nextObsDist <= 0) {
                if (gauchistes.some(g => g.x > W * 0.4)) { nextObsDist = W * 0.2; }
                else {
                    spawnObstacle(W);
                    if (nextGauchisteDist < W * 0.3) nextGauchisteDist = W * 0.3;
                }
            }
            // ── Collectibles ──
            nextCollDist -= spd;
            if (nextCollDist <= 0) spawnCollectible(W, H);
            // ── Coiffeuses ──
            nextCoiffeuseDist -= spd;
            if (nextCoiffeuseDist <= 0) spawnCoiffeuse(W, H);
            // ── Pascal — spawn sur seuils de score ──
            if (pascalWrongCount < 1 && score >= nextPascalScore && !pascalQuestion) {
                spawnPascal(W, H);
                nextPascalScore += 100;
            }
        }

        for (let i = obstacles.length - 1; i >= 0; i--) {
            obstacles[i].x -= spd;
            if (obstacles[i].x + obstacles[i].w < 0) {
                obstacles.splice(i, 1);
                if (!tutorialActive) speed += SPEED_INCREMENT;
            }
        }

        const barbieCX = bX + bW * 0.5;
        const barbieCY = floor + barbieY - bH * 0.5 + H * BARBIE_Y_OFFSET;

        // Coiffeuses — proximité
        let newNear = null;
        for (let i = coiffeuses.length - 1; i >= 0; i--) {
            coiffeuses[i].x -= spd;
            const cf = coiffeuses[i];
            if (cf.x + cf.w < 0) { coiffeuses.splice(i, 1); continue; }
            if (!cf.used && Math.abs(barbieCX - (cf.x + cf.w * 0.5)) < W * COIFFEUSE_PROXIMITY) {
                newNear = cf;
            }
        }
        if (newNear !== coiffeuseNear) {
            coiffeuseNear = newNear;
            const btn = document.getElementById('auboulot-makeup-btn');
            if (btn) {
                btn.disabled = !newNear;
                btn.classList.toggle('auboulot-btn-makeup-disabled', !newNear);
            }
        }
        for (let i = collectibles.length - 1; i >= 0; i--) {
            collectibles[i].x -= spd;
            const c = collectibles[i];
            if (c.x + c.w < 0) { collectibles.splice(i, 1); continue; }
            // Détection de collecte (distance centre à centre)
            const cx = c.x + c.w * 0.5;
            const cy = c.y + c.h * 0.5;
            if (Math.abs(barbieCX - cx) < (bW * 0.4 + c.w * 0.4) &&
                Math.abs(barbieCY - cy) < (bH * 0.4 + c.h * 0.4)) {
                collectibles.splice(i, 1);
                if (c.type.richesse) { richesse += c.type.richesse; }
                if (c.type.beaute)   { beaute = 100; }
                sndCoin.currentTime = 0; sndCoin.play().catch(() => {});
                updateHUD();
                const popText  = c.type.richesse ? `+${c.type.richesse}` : `+${c.type.beaute}`;
                const popColor = '#ff6ec7';
                const popImg   = c.type.richesse ? imgLiasse : imgFondTeint;
                const popSize = c.type.richesse ? 22 : 13;
                pops.push({ x: cx, y: cy, text: popText, color: popColor, img: popImg, size: popSize, age: 0, maxAge: 1400 });
            }
        }

        // ── Collision obstacles ──
        if (!invincible) {
            const barbieBottom = floor + barbieY - bH * 0.22 + H * BARBIE_Y_OFFSET;
            const barbieTop    = barbieBottom - bH * 0.27;
            const barbieLeft   = bX + bW * 0.42;
            const barbieRight  = bX + bW * 0.58;
            for (const obs of obstacles) {
                const obsBottom = floor + H * BARBIE_Y_OFFSET;
                const obsTop    = obsBottom - obs.h * 0.75;
                const obsLeft   = obs.x + obs.w * 0.15;
                const obsRight  = obs.x + obs.w * 0.85;
                if (barbieRight > obsLeft && barbieLeft < obsRight &&
                    barbieBottom > obsTop  && barbieTop  < obsBottom) {
                    lives--;
                    updateHUD();
                    invincible      = true;
                    invincibleTimer = 1200;
                    sndImpact.currentTime = 0; sndImpact.play().catch(() => {});
                    showBubble();
                    if (lives <= 0) { triggerGameOver(); return; }
                }
            }
        }

        // ── Gauchistes (spawn aléatoire uniquement hors tutoriel) ──
        if (!tutorialActive) {
            nextGauchisteDist -= spd;
            if (nextGauchisteDist <= 0) {
                if (obstacles.some(o => o.x > W * 0.4)) { nextGauchisteDist = W * 0.2; }
                else {
                    spawnGauchiste(W, H);
                    if (nextObsDist < W * 0.3) nextObsDist = W * 0.3;
                }
            }
        }

        for (let i = gauchistes.length - 1; i >= 0; i--) {
            gauchistes[i].x -= spd;
            if (gauchistes[i].x + gauchistes[i].w < 0) { gauchistes.splice(i, 1); continue; }
        }

        if (!invincible) {
            const barbieBottom = floor + barbieY - bH * 0.22 + H * BARBIE_Y_OFFSET;
            const barbieTop    = barbieBottom - bH * 0.27;
            const barbieLeft   = bX + bW * 0.42;
            const barbieRight  = bX + bW * 0.58;
            for (let i = gauchistes.length - 1; i >= 0; i--) {
                const g = gauchistes[i];
                if (g.hit) continue;
                const gBottom = g.y + g.h * 0.80;
                const gTop    = g.y + g.h * 0.20;
                const gLeft   = g.x + g.w * 0.20;
                const gRight  = g.x + g.w * 0.80;
                if (barbieRight > gLeft && barbieLeft < gRight &&
                    barbieBottom > gTop  && barbieTop  < gBottom) {
                    g.hit = true;
                    const loss = Math.ceil(richesse * 0.25);
                    richesse = Math.max(0, richesse - loss);
                    updateHUD();
                    invincible      = true;
                    invincibleTimer = 1200;
                    sndImpact.currentTime = 0; sndImpact.play().catch(() => {});
                    showBubble('Aïe ! Les gauchistes !');
                    const popX = bX + bW * 0.5;
                    const popY = floor + barbieY - bH * 0.5 + H * BARBIE_Y_OFFSET;
                    pops.push({ x: popX, y: popY, text: `-${loss}`, color: '#e53935', img: imgLiasse, size: 22, age: 0, maxAge: 1400 });
                }
            }
        }

        if (tutorialActive) checkTutorialSeqDone();

        // ── Pascals — mouvement + déclenchement question ──
        for (let i = pascals.length - 1; i >= 0; i--) {
            pascals[i].x -= spd;
            const p = pascals[i];
            if (p.x + p.w < 0) { pascals.splice(i, 1); continue; }
            // Déclenche la question quand Pascal passe derrière Barbie
            if (!p.triggered && p.x + p.w < barbieCX) {
                p.triggered = true;
                showBubble('Coucou Pascal !');
                if (pascalWrongCount < 1) {
                    setTimeout(() => { if (gameRunning) showPascalQuestion(); }, 800);
                }
            }
        }


        // ── Défilement du sol ──
        loopX -= spd;
        const loopW    = imgLoop.naturalWidth ? imgLoop.naturalWidth * (H / imgLoop.naturalHeight) : W;
        const loopStep = loopW * 0.80;
        if (loopX <= -loopStep) loopX += loopStep;

        // ── Dessin ──
        ctx.clearRect(0, 0, W, H);

        for (let i = 0; i < 4; i++) {
            ctx.drawImage(imgLoop, loopX + i * loopStep, 0, loopW, H);
        }

        // Coiffeuses (derrière Barbie)
        for (const cf of coiffeuses) {
            ctx.drawImage(imgCoiffeuse, cf.x, cf.y, cf.w, cf.h);
        }

        // Pascals
        for (const p of pascals) {
            ctx.drawImage(imgPascal, p.x, p.y, p.w, p.h);
        }

        // Collectibles
        for (const c of collectibles) {
            ctx.drawImage(c.type.img(), c.x, c.y, c.w, c.h);
        }

        // Pops
        for (let i = pops.length - 1; i >= 0; i--) {
            const p = pops[i];
            p.age += dt;
            if (p.age >= p.maxAge) { pops.splice(i, 1); continue; }
            const t       = p.age / p.maxAge;
            const opacity = 1 - t;
            const scale   = 1 + t * 0.6;
            const yOff    = -40 * t;
            ctx.save();
            ctx.globalAlpha = opacity;
            const fontSize = Math.round((p.size || 13) * scale);
            ctx.font = `bold ${fontSize}px 'Press Start 2P', monospace`;
            ctx.fillStyle = p.color;
            ctx.strokeStyle = 'rgba(0,0,0,0.6)';
            ctx.lineWidth = 3;
            ctx.textAlign = 'left';
            const iconSize = fontSize * 1.4;
            const textW    = ctx.measureText(p.text).width;
            const totalW   = iconSize + 4 + textW;
            const drawX    = p.x - totalW * 0.5;
            const drawY    = p.y + yOff;
            // Icône
            ctx.drawImage(p.img, drawX, drawY - iconSize * 0.85, iconSize, iconSize);
            // Texte
            ctx.strokeText(p.text, drawX + iconSize + 4, drawY);
            ctx.fillText(p.text,   drawX + iconSize + 4, drawY);
            ctx.restore();
        }

        // Sparks
        for (let i = sparks.length - 1; i >= 0; i--) {
            const s = sparks[i];
            s.age += dt;
            if (s.age >= s.maxAge) { sparks.splice(i, 1); continue; }
            s.x += s.vx;
            s.y += s.vy;
            const t = s.age / s.maxAge;
            ctx.save();
            ctx.globalAlpha = 1 - t;
            ctx.drawImage(imgSpark, s.x - s.size * 0.5, s.y - s.size * 0.5, s.size, s.size);
            ctx.restore();
        }

        // Obstacles
        for (const obs of obstacles) {
            ctx.drawImage(imgObs, obs.x, floor - obs.h + H * BARBIE_Y_OFFSET, obs.w, obs.h);
        }

        // Gauchistes
        for (const g of gauchistes) {
            ctx.drawImage(idleFrame === 0 ? imgGauchiste : imgGauchiste2, g.x, g.y, g.w, g.h);
        }

        // Barbie
        const showBarbie = !invincible || Math.floor(invincibleTimer / 120) % 2 === 0;
        if (showBarbie) {
            const sprite = isJumping ? imgJump : (idleFrame === 0 ? imgIdle1 : imgIdle2);
            ctx.drawImage(sprite, bX, floor + barbieY - bH + H * BARBIE_Y_OFFSET, bW, bH);
        }

    }

    function triggerGameOver() {
        if (tutorialActive) { lives = 3; invincible = true; invincibleTimer = 2000; return; }
        gameRunning = false;
        cancelAnimationFrame(animId);
        hidePascalQuestion();
        showGameOver();
    }

    function animateCount(elId, from, to, duration, onDone) {
        const el = document.getElementById(elId);
        const start = performance.now();
        function tick(ts) {
            const t = Math.min((ts - start) / duration, 1);
            el.textContent = Math.floor(from + (to - from) * t);
            if (t < 1) requestAnimationFrame(tick);
            else if (onDone) onDone();
        }
        requestAnimationFrame(tick);
    }

    function showRow(id, delay, cb) {
        setTimeout(() => {
            const el = document.getElementById(id);
            el.classList.remove('auboulot-res-hidden');
            if (cb) cb();
        }, delay);
    }

    function showGameOver() {
        document.getElementById('auboulot-game').classList.add('hidden');
        setBgPulse(true);
        const over = document.getElementById('auboulot-gameover');
        // reset visibility de toutes les lignes
        ['auboulot-res-rich-row','auboulot-res-beau-row','auboulot-res-total-row',
         'auboulot-res-best-row','auboulot-res-target-row','auboulot-res-challenge-row',
         'auboulot-over-btns'].forEach(id =>
            document.getElementById(id).classList.add('auboulot-res-hidden'));
        over.classList.remove('hidden');

        document.getElementById('auboulot-res-score').textContent   = score;
        document.getElementById('auboulot-res-richval').textContent  = richesse;
        document.getElementById('auboulot-res-beauval').textContent  = Math.max(beaute, 1);

        const afterRich  = score * Math.max(richesse, 1);
        const finalScore = Math.floor(afterRich / Math.max(beaute, 1));

        // Phase 1 : obstacles (déjà visible)
        // Phase 2 : × richesse
        showRow('auboulot-res-rich-row', 1000);
        // Phase 3 : ÷ beauté
        showRow('auboulot-res-beau-row', 2000);
        // Phase 4 : total animé
        showRow('auboulot-res-total-row', 3000, () => {
            animateCount('auboulot-res-totalval', 0, finalScore, 1400, () => {
                // Meilleur score
                db.ref('game/barbieBestScore').once('value', snap => {
                    const prev = snap.val() || 0;
                    const best = Math.max(prev, finalScore);
                    if (finalScore > prev) db.ref('game/barbieBestScore').set(finalScore);
                    document.getElementById('auboulot-best-val').textContent = best;
                    showRow('auboulot-res-best-row', 0);
                    // Score à battre
                    document.getElementById('auboulot-target-val').textContent = TARGET_SCORE.toLocaleString('fr-FR');
                    showRow('auboulot-res-target-row', 400);
                    // Défi validé si score atteint
                    if (finalScore >= TARGET_SCORE) {
                        showRow('auboulot-res-challenge-row', 800);
                        const validated = getValidated();
                        if (!validated.includes(AU_BOULOT_INDEX)) {
                            validated.push(AU_BOULOT_INDEX);
                            saveValidated(validated);
                        }
                    }
                    showRow('auboulot-over-btns', finalScore >= TARGET_SCORE ? 1400 : 800);
                });
            });
        });
    }

    function startGame() {
        canvas = document.getElementById('auboulot-canvas');
        ctx    = canvas.getContext('2d');
        // Ajuste la résolution du canvas à l'affichage réel
        const rect = canvas.getBoundingClientRect();
        canvas.width  = rect.width  || canvas.offsetWidth  || 400;
        canvas.height = rect.height || canvas.offsetHeight || 600;
        resetState();
        cancelAnimationFrame(animId);
        animId = requestAnimationFrame(gameLoop);
    }

    function showMenuWithAnim() {
        const menu = document.getElementById('auboulot-menu');
        const logo = menu.querySelector('.auboulot-menu-logo');
        menu.classList.remove('hidden');
        menu.classList.remove('auboulot-menu--entering');
        logo.classList.remove('auboulot-logo-loop');
        void menu.offsetWidth;
        menu.classList.add('auboulot-menu--entering');
        // Retire la classe d'entrée sur la fin de l'animation du menu uniquement
        menu.addEventListener('animationend', (e) => {
            if (e.target === menu) menu.classList.remove('auboulot-menu--entering');
        }, { once: true });
        // Lance la boucle après la fin du bounce initial (delay 0.25s + durée 0.9s)
        setTimeout(() => logo.classList.add('auboulot-logo-loop'), 1200);
    }

    function openModal() {
        const modal = document.getElementById('modal-auboulot');
        modal.classList.remove('hidden');
        document.getElementById('auboulot-game').classList.add('hidden');
        document.getElementById('auboulot-gameover').classList.add('hidden');
        showMenuWithAnim();
        setBgPulse(true);
        // Affiche meilleur score + cible dans le menu
        document.getElementById('auboulot-menu-target').textContent = TARGET_SCORE.toLocaleString('fr-FR');
        db.ref('game/barbieBestScore').once('value', snap => {
            const best = snap.val() || 0;
            document.getElementById('auboulot-menu-best').textContent = best > 0 ? best.toLocaleString('fr-FR') : '—';
        });
    }

    function closeModal() {
        gameRunning = false;
        cancelAnimationFrame(animId);
        sndSoundtrack.pause();
        sndSoundtrack.currentTime = 0;
        document.getElementById('modal-auboulot').classList.add('hidden');
        buildGrid();
        setMenuVisible(true);
    }

    // ── Listeners boutons ──
    document.getElementById('auboulot-makeup-btn').addEventListener('click', () => {
        if (!coiffeuseNear || coiffeuseNear.used) return;
        coiffeuseNear.used = true;
        beaute = Math.min(100, beaute + 20);
        updateHUD();
        spawnSparks(canvas ? canvas.width : 400, canvas ? canvas.height : 600);
        sndBeauty.currentTime = 0; sndBeauty.play().catch(() => {});
        const btn = document.getElementById('auboulot-makeup-btn');
        btn.disabled = true;
        btn.classList.add('auboulot-btn-makeup-disabled');
        coiffeuseNear = null;
    });

    function setBgPulse(active) {
        document.querySelectorAll('.auboulot-menu-bg').forEach(el => {
            el.classList.toggle('auboulot-bg--paused', !active);
        });
    }

    document.getElementById('barbie-splash-btn').addEventListener('click', () => {
        document.getElementById('barbie-splash').classList.add('hidden');
        sndSoundtrack.currentTime = 0;
        sndSoundtrack.play().catch(() => {});
    });

    document.getElementById('auboulot-tuto-btn').addEventListener('click', () => {
        if (sndSoundtrack.paused) { sndSoundtrack.currentTime = 0; sndSoundtrack.play().catch(() => {}); }
        startTutorial();
    });

    document.getElementById('auboulot-tuto-next').addEventListener('click', () => {
        advanceTutorialMsg();
    });

    document.getElementById('auboulot-play-btn').addEventListener('click', () => {
        document.getElementById('auboulot-menu').classList.add('hidden');
        document.getElementById('auboulot-gameover').classList.add('hidden');
        document.getElementById('auboulot-game').classList.remove('hidden');
        setBgPulse(false);
        if (sndSoundtrack.paused) { sndSoundtrack.currentTime = 0; sndSoundtrack.play().catch(() => {}); }
        requestAnimationFrame(() => startGame());
    });

    document.getElementById('auboulot-pascal-ans1').addEventListener('click', () => handlePascalAnswer(0));
    document.getElementById('auboulot-pascal-ans2').addEventListener('click', () => handlePascalAnswer(1));

    document.getElementById('auboulot-quit-btn').addEventListener('click', closeModal);
    document.getElementById('auboulot-ingame-quit').addEventListener('click', () => {
        gameRunning = false;
        cancelAnimationFrame(animId);
        sndSoundtrack.pause();
        sndSoundtrack.currentTime = 0;
        location.href = 'index.html';
    });
    document.getElementById('auboulot-menu-btn').addEventListener('click', () => {
        document.getElementById('auboulot-gameover').classList.add('hidden');
        setBgPulse(true);
        showMenuWithAnim();
    });
    document.getElementById('auboulot-retry-btn').addEventListener('click', () => {
        document.getElementById('auboulot-gameover').classList.add('hidden');
        document.getElementById('auboulot-game').classList.remove('hidden');
        setBgPulse(false);
        if (sndSoundtrack.paused) { sndSoundtrack.currentTime = 0; sndSoundtrack.play().catch(() => {}); }
        requestAnimationFrame(() => startGame());
    });

    // Bouton + espace + touche haut pour sauter
    document.getElementById('auboulot-jump-btn').addEventListener('pointerdown', e => {
        e.preventDefault();
        jump();
    });
    document.addEventListener('keydown', e => {
        if ((e.code === 'Space' || e.code === 'ArrowUp') &&
            !document.getElementById('modal-auboulot').classList.contains('hidden')) {
            e.preventDefault();
            jump();
        }
    });

    return { open: openModal, startTutorial };
})();
