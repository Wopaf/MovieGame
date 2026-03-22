'use strict';

// ── FIREBASE ──────────────────────────────────────────────────────────────────
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyBsjr0peOj1jFPhAA080MWuUGlyYapjxn0",
    authDomain: "moviegame-1b838.firebaseapp.com",
    databaseURL: "https://moviegame-1b838-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "moviegame-1b838",
    storageBucket: "moviegame-1b838.firebasestorage.app",
    messagingSenderId: "448540908211",
    appId: "1:448540908211:web:894cb1e8c38d59c4a9eec6"
};
firebase.initializeApp(FIREBASE_CONFIG);
const db = firebase.database();
const bestScoreRef = db.ref('guitarHero/bestScore');
const validatedRef = db.ref('game/validated');

// ── SEUIL DE DÉFI ─────────────────────────────────────────────────────────────
// Dépasser ce score valide le défi Tenacious D (index 8 dans ACHIEVEMENTS)
const SCORE_UNLOCK_THRESHOLD = 300000;
const TENACIOUS_INDEX = 8;

// ── BOUTON ENREGISTRER ────────────────────────────────────────────────────────
const SHOW_RECORD_BTN = false;
// ──────────────────────────────────────────────────────────────────────────────
// ──────────────────────────────────────────────────────────────────────────────

let bestScore = 0;
const bestScoreEl = document.getElementById('best-score-display');

function updateBestScoreDisplay() {
    bestScoreEl.innerHTML =
        `<div class="score-target">Objectif <span>${SCORE_UNLOCK_THRESHOLD.toLocaleString('fr')}</span></div>` +
        `Meilleur score <span>${bestScore.toLocaleString('fr')}</span>`;
}
updateBestScoreDisplay();
bestScoreRef.on('value', snap => {
    bestScore = snap.val() || 0;
    updateBestScoreDisplay();
});

function unlockTenaciousChallenge() {
    validatedRef.once('value', snap => {
        const arr = snap.val() || [];
        if (!arr.includes(TENACIOUS_INDEX)) {
            arr.push(TENACIOUS_INDEX);
            validatedRef.set(arr);
        }
    });
}

function saveBestScore(s) {
    if (s > bestScore) {
        bestScoreRef.set(s);
        if (s >= SCORE_UNLOCK_THRESHOLD) unlockTenaciousChallenge();
    }
}

// ── CHART ──────────────────────────────────────────────────────────────────
// Master Exploder — Tenacious D — chart manuelle
// S=0 (gauche), D=1 (milieu), F=2 (droite)
// [time_secondes, lane, hold_secondes]
function s(time, lane, hold = 0) { return [time, lane, hold]; }

const CHART = [
    // Intro
    s(8.30,0), s(8.58,1), s(9.00,2),
    s(9.47,0), s(9.84,0), s(10.17,1), s(10.55,2), s(10.99,0),
    s(11.43,0), s(11.80,0), s(12.26,0), s(12.60,1),
    s(13.05,0), s(13.45,0), s(13.81,0),
    s(14.26,1), s(14.62,2), s(14.98,1), s(15.04,2), s(15.10,1),
    s(15.44,0), s(15.68,2), s(15.85,1),
    // Longs holds intro
    s(16.25,0,3.16), s(19.35,1,3.24),
    // Couplet 1
    s(22.55,2,0.78), s(23.33,1,0.72), s(24.06,0,0.87), s(24.89,1,0.85),
    s(25.71,2), s(26.13,1), s(26.49,0), s(26.93,1),
    s(27.35,2), s(27.73,1), s(28.15,2),
    s(28.58,1,1.45), s(29.95,2,1.85),
    s(32.12,1,0.77),
    s(35.24,0), s(35.38,1), s(35.59,2), s(35.87,1), s(36.30,2),
    s(38.48,0), s(38.59,1), s(38.83,2), s(39.13,1,0.81),
    s(39.99,0), s(40.24,1), s(40.52,2), s(40.85,1),
    s(41.61,0), s(41.91,1), s(42.25,0), s(42.57,2), s(42.86,1),
    s(44.17,0), s(44.38,1), s(44.53,2,0.83), s(44.67,1),
    s(45.29,1,1.54),
    // Hold long S + série D
    s(48.21,0,6.53),
    s(49.79,1), s(50.18,1), s(50.58,1), s(51.01,1), s(51.42,1),
    s(51.84,1), s(52.26,1), s(52.62,1), s(53.01,1), s(53.39,1), s(53.73,1),
    s(54.22,1), s(54.60,1,1.07),
    // Refrain 1
    s(55.52,2), s(55.89,1), s(56.22,0), s(56.51,1), s(56.67,2), s(56.99,1,0.71),
    s(57.26,0), s(57.54,2), s(57.90,1,0.75),
    s(58.23,0), s(58.54,2), s(58.85,1), s(59.17,0), s(59.44,2), s(59.80,1),
    s(60.08,2), s(60.45,1), s(60.68,2,1.92),
    s(62.55,1), s(62.71,0), s(62.98,1), s(63.13,2), s(63.46,1), s(63.70,0), s(63.96,0),
    s(64.21,1), s(64.35,0,0.51), s(64.89,1,2.09),
    s(66.95,2), s(67.34,1,6.47),
    // Série S sur hold D
    s(68.63,0), s(69.02,0), s(69.41,0), s(69.84,0), s(70.22,0), s(70.61,0),
    s(71.04,0), s(71.43,0), s(71.84,0),
    s(72.12,2), s(72.34,0), s(72.57,2), s(72.68,0), s(72.82,2), s(72.99,0),
    s(73.02,2), s(73.25,0), s(73.27,2), s(73.41,2), s(73.45,0), s(73.64,2), s(73.65,0),
    s(73.77,2), s(73.87,1),
    // Pont
    s(74.22,1), s(74.45,0), s(74.64,2),
    s(75.00,1), s(75.28,0), s(75.51,1), s(75.56,2), s(75.79,1),
    s(76.03,0), s(76.29,1), s(76.49,0), s(76.65,1),
    s(76.85,0), s(77.14,1), s(77.43,2), s(77.74,1,0.54),
    s(78.19,0), s(78.60,1), s(78.86,0), s(78.94,1), s(79.17,0),
    s(79.45,2), s(79.76,1), s(80.18,0), s(80.56,1), s(80.93,2,0.80),
    s(81.69,1,1.00), s(82.25,0), s(82.57,2,0.77),
    s(83.27,1,0.77), s(83.80,0), s(84.19,1,0.67),
    s(84.85,0), s(85.01,1), s(85.27,0), s(85.60,2),
    s(86.57,1), s(86.70,2), s(87.07,1), s(87.43,0), s(87.61,1), s(87.74,2),
    s(88.09,1), s(88.92,2), s(89.08,1),
    // Hold long S + série D
    s(89.45,0,5.84),
    s(91.39,1), s(92.12,1), s(92.99,1), s(93.37,1), s(93.79,1),
    s(94.20,1), s(94.62,1), s(95.01,1),
    s(95.37,2), s(95.79,1), s(96.23,2), s(96.61,1),
    // Refrain 2
    s(97.02,0), s(97.22,1), s(97.38,2), s(97.81,1),
    s(98.04,0), s(98.23,1), s(98.39,2), s(98.70,1),
    s(99.06,2), s(99.39,2), s(99.57,2), s(99.76,2), s(100.02,2), s(100.15,0),
    s(100.30,1), s(100.52,2), s(100.86,1),
    s(101.13,0), s(101.32,2), s(101.50,1), s(101.77,0), s(101.83,2),
    s(102.02,1), s(102.19,0), s(102.23,2), s(102.43,1), s(102.57,0), s(102.61,2),
    s(102.82,1), s(103.26,0),
    s(103.48,1), s(103.65,0), s(103.70,1), s(103.90,0), s(103.99,1),
    s(104.12,0), s(104.23,1), s(104.36,0), s(104.57,2), s(104.77,1), s(104.82,2),
    s(104.90,1), s(105.11,0), s(105.36,1), s(105.74,0),
    s(105.94,1), s(106.11,0), s(106.14,1), s(106.30,0), s(106.44,1), s(106.61,0), s(106.76,1), s(106.98,0),
    s(107.12,2), s(107.37,1), s(107.58,0), s(107.81,1), s(107.99,2),
    s(108.29,1), s(108.59,2), s(108.82,2), s(108.99,2),
    // Interlude
    s(111.42,2), s(111.70,1), s(111.94,0),
    s(112.17,1), s(112.34,2), s(112.54,1), s(112.70,1),
    s(113.93,1), s(113.96,0), s(114.30,1), s(114.46,0), s(114.58,1), s(114.80,0), s(114.97,1), s(115.24,0),
    s(115.44,2), s(115.83,1), s(116.19,1), s(116.25,2,0.82),
    s(116.95,1), s(117.03,1), s(117.46,0), s(117.68,1),
    s(118.37,0), s(118.46,1), s(118.65,2), s(119.25,2,0.55),
    // Final
    s(120.22,0), s(120.47,1), s(120.78,0), s(121.33,2,0.57),
    s(121.87,1), s(122.19,0), s(122.60,1),
    s(124.04,0), s(124.19,1), s(124.53,2),
    s(125.05,2,3.12), s(126.62,1,1.57), s(128.16,0,1.59),
    s(129.86,1,0.53), s(130.33,2,0.66), s(130.96,1), s(131.35,2),
    s(132.99,2), s(133.79,1), s(134.62,0,2.98),
    s(137.82,0),
    s(140.21,0), s(140.38,1), s(140.43,2),
].sort((a, z) => a[0] - z[0]);

// ── CONFIG ──────────────────────────────────────────────────────────────────
const FALL_DURATION        = 1.6;
const HIT_WINDOW_PERFECT   = 0.10;
const HIT_WINDOW_GOOD      = 0.18;
const HOLD_GRACE           = 0.14;  // secondes de tolérance après relâchement
const HOLD_TICK_INTERVAL   = 0.2;   // secondes entre chaque gain de points pendant un hold
const LANE_COLORS          = ['#ff1a00', '#ff7700', '#9b30ff'];
const LANE_COLORS_DIM      = ['rgba(255,26,0,0.12)', 'rgba(255,119,0,0.12)', 'rgba(155,48,255,0.12)'];
const NOTE_W = 60, NOTE_H = 22, NOTE_R = 10;

// ── STATE ───────────────────────────────────────────────────────────────────
let notes        = [];
let score        = 0, combo = 0, maxCombo = 0, totalNotes = 0, hitNotes = 0;

// Multiplicateur : palier tous les 4 notes, max x5
function getMultiplier() { return Math.min(Math.ceil(combo / 4), 5); }
let running      = false;
let songDuration = 0;
const pressedLanes = [false, false, false];
const heldNotes    = [null, null, null]; // note en cours de maintien par lane
const particles    = [];
const hitFlashes   = [];   // flash sur hit réussi  [{lane, life}]
const hitTexts     = [];   // textes flottants canvas [{text, color, x, y, alpha, vy}]
let feedbackTimer  = null;

// ── ELEMENTS ─────────────────────────────────────────────────────────────────
const audio        = document.getElementById('audio');
const canvas       = document.getElementById('game-canvas');
const ctx          = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score-display');
const comboDisplay = document.getElementById('combo-display');
const comboNumber  = document.getElementById('combo-number');
const feedbackEl   = document.getElementById('feedback-display');
const progressFill = document.getElementById('progress-fill');
const screenStart  = document.getElementById('screen-start');
const screenGame   = document.getElementById('screen-game');
const screenResult = document.getElementById('screen-result');
const BTN_ELS      = [document.getElementById('btn-s'), document.getElementById('btn-d'), document.getElementById('btn-f')];
const menuAudio    = document.getElementById('menu-audio');

// ── RESIZE ───────────────────────────────────────────────────────────────────
const appEl = document.getElementById('app');

function updateScore(val) {
    score = val;
    scoreDisplay.textContent = score.toLocaleString('fr');
    scoreDisplay.classList.remove('score-pop');
    void scoreDisplay.offsetWidth; // reflow pour relancer l'animation
    scoreDisplay.classList.add('score-pop');
}
function resizeCanvas() { canvas.width = appEl.offsetWidth; canvas.height = appEl.offsetHeight; }
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// ── BACKGROUND IMAGE ──────────────────────────────────────────────────────────
const bgImage = new Image();
bgImage.src = 'medias/tenacious.png';

// ── GEOMETRY PERSPECTIVE ─────────────────────────────────────────────────────
// Point de fuite : centre haut de l'écran
// Zone de frappe : bas, large

function getHitY()    { return canvas.height * 0.84; }
function getVanishY() { return canvas.height * 0.12; }

const BOTTOM_W = 520;  // largeur totale à la zone de frappe
const HORIZON_W = 28;  // largeur totale à l'horizon

// t : 0 = horizon, 1 = zone de frappe
function perspT(y) {
    const vY = getVanishY(), hY = getHitY();
    return Math.max(0, (y - vY) / (hY - vY));
}

function totalWAtY(y) {
    const t = perspT(y);
    return HORIZON_W + (Math.min(BOTTOM_W, canvas.width * 0.92) - HORIZON_W) * t;
}

// Centre X d'une lane à une hauteur y
function pLaneX(lane, y) {
    const tw = totalWAtY(y);
    const startX = (canvas.width - tw) / 2;
    return startX + (tw / 3) * lane + tw / 6;
}

// Largeur d'une lane à une hauteur y
function pLaneW(y) { return totalWAtY(y) / 3; }

// Pour les hit targets et particules : x à la zone de frappe
function getLaneX(lane) { return pLaneX(lane, getHitY()); }

// ── INIT ─────────────────────────────────────────────────────────────────────
function initNotes() {
    notes = CHART.map(([time, lane, hold]) => ({ time, lane, hold: hold || 0, hit: false, missed: false, holdStart: null, holdDone: false, holdGraceEnd: null, holdLastTick: null }));
    totalNotes = notes.length;
    score = combo = maxCombo = hitNotes = 0;
    heldNotes.fill(null);
}

// ── DRAW ──────────────────────────────────────────────────────────────────────
function drawLanes() {
    const hitY   = getHitY();
    const vanY   = getVanishY();
    const cx0    = canvas.width / 2;

    // ── Sol en trapèze avec couleur de piste ──
    const bw = totalWAtY(hitY), hw = totalWAtY(vanY);
    ctx.beginPath();
    ctx.moveTo(cx0 - hw / 2, vanY);
    ctx.lineTo(cx0 + hw / 2, vanY);
    ctx.lineTo(cx0 + bw / 2, hitY);
    ctx.lineTo(cx0 - bw / 2, hitY);
    ctx.closePath();
    const roadGrad = ctx.createLinearGradient(0, vanY, 0, hitY);
    roadGrad.addColorStop(0, 'rgba(8,0,0,0.92)');
    roadGrad.addColorStop(0.6, 'rgba(15,2,0,0.95)');
    roadGrad.addColorStop(1, 'rgba(22,4,0,0.98)');
    ctx.fillStyle = roadGrad;
    ctx.fill();

    // ── Séparateurs de couloirs (convergents vers horizon) ──
    for (let i = 0; i <= 3; i++) {
        const xTop = cx0 - hw / 2 + (hw / 3) * i;
        const xBot = cx0 - bw / 2 + (bw / 3) * i;
        const isEdge = i === 0 || i === 3;

        // Couleur teintée par lane
        ctx.strokeStyle = isEdge ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.08)';
        ctx.lineWidth   = isEdge ? 2 : 1;
        ctx.beginPath();
        ctx.moveTo(xTop, vanY);
        ctx.lineTo(xBot, hitY);
        ctx.stroke();
    }

    // ── Lignes de grille horizontales (béats visuels) ──
    for (let step = 0; step < 12; step++) {
        const t  = (step / 12) * (step / 12); // perspective easing
        const y  = vanY + (hitY - vanY) * t;
        const tw = totalWAtY(y);
        ctx.strokeStyle = `rgba(255,255,255,${0.03 + t * 0.05})`;
        ctx.lineWidth   = 1;
        ctx.beginPath();
        ctx.moveTo(cx0 - tw / 2, y);
        ctx.lineTo(cx0 + tw / 2, y);
        ctx.stroke();
    }

    // ── Glow latéral des couloirs (teinte de chaque lane) ──
    for (let i = 0; i < 3; i++) {
        const xTop = cx0 - hw / 2 + (hw / 3) * i + hw / 6;
        const xBot = cx0 - bw / 2 + (bw / 3) * i + bw / 6;
        const lg = ctx.createLinearGradient(0, vanY, 0, hitY);
        lg.addColorStop(0, 'transparent');
        lg.addColorStop(1, LANE_COLORS[i] + '18');
        ctx.fillStyle = lg;
        const tw0 = totalWAtY(vanY) / 3, tw1 = totalWAtY(hitY) / 3;
        ctx.beginPath();
        ctx.moveTo(xTop - tw0 / 2, vanY);
        ctx.lineTo(xTop + tw0 / 2, vanY);
        ctx.lineTo(xBot + tw1 / 2, hitY);
        ctx.lineTo(xBot - tw1 / 2, hitY);
        ctx.closePath();
        ctx.fill();
    }

    // ── Ligne de frappe ──
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth   = 3;
    ctx.beginPath();
    ctx.moveTo(cx0 - bw / 2, hitY);
    ctx.lineTo(cx0 + bw / 2, hitY);
    ctx.stroke();

    // ── Point de fuite (glow) ──
    const vGrd = ctx.createRadialGradient(cx0, vanY, 0, cx0, vanY, 80);
    vGrd.addColorStop(0, 'rgba(255,80,0,0.4)');
    vGrd.addColorStop(1, 'transparent');
    ctx.fillStyle = vGrd;
    ctx.fillRect(cx0 - 80, vanY - 40, 160, 120);

    const now = performance.now();

    // ── Hit targets + effets ──
    for (let i = 0; i < 3; i++) {
        const cx      = getLaneX(i);
        const nw      = pLaneW(hitY) * 0.82;
        const nh      = Math.max(6, nw * 0.28);
        const nr      = nh * 0.4;
        const isHolding = heldNotes[i] !== null && pressedLanes[i];

        // Hold pulsant
        if (isHolding) {
            const pulse = 0.5 + 0.5 * Math.sin(now / 110);
            const grd = ctx.createRadialGradient(cx, hitY, 0, cx, hitY, nw * 0.9);
            grd.addColorStop(0,   LANE_COLORS[i] + '55');
            grd.addColorStop(0.6, LANE_COLORS[i] + '18');
            grd.addColorStop(1,   'transparent');
            ctx.fillStyle = grd;
            ctx.beginPath(); ctx.arc(cx, hitY, nw * 0.9, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = LANE_COLORS[i];
            ctx.lineWidth   = 2 + pulse * 2;
            ctx.globalAlpha = 0.6 + pulse * 0.4;
            rrect(cx - nw / 2 * (1 + pulse * 0.12), hitY - nh / 2 * (1 + pulse * 0.12),
                  nw * (1 + pulse * 0.12), nh * (1 + pulse * 0.12), nr);
            ctx.stroke();
            ctx.globalAlpha = 1;
        }

        // Flash
        for (let j = hitFlashes.length - 1; j >= 0; j--) {
            const f = hitFlashes[j];
            if (f.lane !== i) continue;
            f.life -= 0.05;
            if (f.life <= 0) { hitFlashes.splice(j, 1); continue; }
            const expand = (1 - f.life) * 1.6;
            ctx.globalAlpha = f.life * 0.9;
            ctx.strokeStyle = LANE_COLORS[i]; ctx.lineWidth = 3;
            rrect(cx - nw / 2 * (1 + expand), hitY - nh / 2 * (1 + expand),
                  nw * (1 + expand), nh * (1 + expand), nr);
            ctx.stroke();
            ctx.globalAlpha = 1;
        }

        // Cible (forme note)
        rrect(cx - nw / 2, hitY - nh / 2, nw, nh, nr);
        if (pressedLanes[i]) {
            ctx.fillStyle = LANE_COLORS[i] + '55'; ctx.fill();
            ctx.strokeStyle = LANE_COLORS[i]; ctx.lineWidth = 3;
        } else {
            ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.lineWidth = 2;
        }
        ctx.stroke();
    }
}

function rrect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}

function noteY(time, songTime) {
    const prog = (songTime - time + FALL_DURATION) / FALL_DURATION;
    // Léger easing quadratique pour effet d'accélération en perspective
    const t = Math.max(0, Math.min(1.05, prog));
    const eased = t * t;
    return getVanishY() + (getHitY() - getVanishY()) * eased;
}

function drawNote(note, songTime) {
    if ((note.hit && !note.hold) || note.missed || note.holdDone) return;

    const hitY = getHitY();
    const col  = LANE_COLORS[note.lane];

    // ── Queue hold ──
    if (note.hold > 0) {
        const headY    = note.hit ? hitY : noteY(note.time, songTime);
        const tailEndY = noteY(note.time + note.hold, songTime);
        if (tailEndY > canvas.height) return;
        if (headY < getVanishY() && tailEndY < getVanishY()) return;

        const drawTop = Math.max(getVanishY(), tailEndY);
        const drawBot = Math.min(canvas.height, headY);

        const isActiveHold = note.hit && !note.holdDone && heldNotes[note.lane] === note;
        const pulse = isActiveHold ? 0.5 + 0.5 * Math.sin(performance.now() / 90) : 0;

        if (drawBot > drawTop) {
            // Queue en trapèze perspective : plus large en bas, plus étroite en haut
            const wTop = pLaneW(drawTop) * 0.3;
            const wBot = pLaneW(drawBot) * 0.3;
            const cxTop = pLaneX(note.lane, drawTop);
            const cxBot = pLaneX(note.lane, drawBot);

            // Glow latéral
            if (isActiveHold) {
                const glowW = wBot * (2 + pulse);
                const glow = ctx.createLinearGradient(cxBot - glowW, 0, cxBot + glowW, 0);
                glow.addColorStop(0, 'transparent');
                glow.addColorStop(0.5, col + Math.round(60 + pulse * 120).toString(16).padStart(2, '0'));
                glow.addColorStop(1, 'transparent');
                ctx.fillStyle = glow;
                ctx.beginPath();
                ctx.moveTo(cxTop - glowW, drawTop); ctx.lineTo(cxTop + glowW, drawTop);
                ctx.lineTo(cxBot + glowW, drawBot); ctx.lineTo(cxBot - glowW, drawBot);
                ctx.closePath(); ctx.fill();
            }

            // Corps trapèze
            const grad = ctx.createLinearGradient(0, drawTop, 0, drawBot);
            if (isActiveHold) {
                grad.addColorStop(0, '#ffffff'); grad.addColorStop(0.15, col + 'ff'); grad.addColorStop(1, col + 'ee');
            } else {
                grad.addColorStop(0, col + '77'); grad.addColorStop(1, col + 'bb');
            }
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.moveTo(cxTop - wTop, drawTop); ctx.lineTo(cxTop + wTop, drawTop);
            ctx.lineTo(cxBot + wBot, drawBot); ctx.lineTo(cxBot - wBot, drawBot);
            ctx.closePath(); ctx.fill();

            // Ligne centrale brillante
            ctx.strokeStyle = isActiveHold ? '#ffffff' : col + 'bb';
            ctx.lineWidth   = isActiveHold ? 2 + pulse * 2 : 1.5;
            ctx.globalAlpha = isActiveHold ? 0.9 : 0.6;
            ctx.beginPath(); ctx.moveTo(cxTop, drawTop); ctx.lineTo(cxBot, drawBot); ctx.stroke();
            ctx.globalAlpha = 1;
        }

        if (note.hit) return;
    }

    // ── Tête ──
    const y  = noteY(note.time, songTime);
    const vY = getVanishY();
    if (y < vY - 5 || y > canvas.height + 10) return;

    const cx = pLaneX(note.lane, y);
    const nw = pLaneW(y) * 0.82;   // largeur perspective
    const nh = Math.max(6, nw * 0.28); // hauteur proportionnelle

    // Glow
    const grd = ctx.createRadialGradient(cx, y, 0, cx, y, nw * 0.8);
    grd.addColorStop(0, col + '55'); grd.addColorStop(1, 'transparent');
    ctx.fillStyle = grd;
    ctx.fillRect(cx - nw, y - nh * 2, nw * 2, nh * 4);

    // Corps
    const r = Math.min(NOTE_R, nh * 0.5);
    rrect(cx - nw / 2, y - nh / 2, nw, nh, r);
    ctx.fillStyle = note.hold > 0 ? '#fff' : col; ctx.fill();

    // Bord couleur pour hold
    if (note.hold > 0) {
        ctx.strokeStyle = col; ctx.lineWidth = 2;
        rrect(cx - nw / 2, y - nh / 2, nw, nh, r); ctx.stroke();
    }

    // Reflet
    rrect(cx - nw / 2 + 3, y - nh / 2 + 2, nw - 6, nh * 0.4, 3);
    ctx.fillStyle = 'rgba(255,255,255,0.2)'; ctx.fill();
}

function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy; p.vy += 0.18; p.life -= p.decay;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        ctx.globalAlpha = p.life;
        ctx.fillStyle   = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1;
}

function spawnParticles(lane, perfect) {
    const cx = getLaneX(lane), cy = getHitY();
    for (let i = 0; i < (perfect ? 12 : 6); i++) {
        const a = Math.random() * Math.PI * 2;
        const s = 2 + Math.random() * (perfect ? 6 : 3);
        particles.push({ x: cx, y: cy, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 2,
            life: 1, decay: 0.04 + Math.random() * 0.04, size: 3 + Math.random() * 5, color: LANE_COLORS[lane] });
    }
}

// ── GAME LOOP ─────────────────────────────────────────────────────────────────
function gameLoop() {
    if (!running) return;
    const t = audio.currentTime;

    for (const n of notes) {
        // Miss : note non touchée dépassée
        if (!n.hit && !n.missed && t - n.time > HIT_WINDOW_GOOD + 0.05) {
            n.missed = true; combo = 0; updateComboDisplay(); showFeedback('MISS', '#e74c3c', n.lane);
        }
        // Hold en cours : vérifier si la queue est entièrement passée
        if (n.hit && n.hold > 0 && !n.holdDone) {
            if (t >= n.time + n.hold) {
                // Fin du hold réussie
                n.holdDone = true;
                if (heldNotes[n.lane] === n) heldNotes[n.lane] = null;
                const holdPts = 200 * getMultiplier();
                updateScore(score + holdPts);
                spawnScoreText(holdPts, n.lane);
                spawnParticles(n.lane, true);
                hitFlashes.push({ lane: n.lane, life: 1 });
                showFeedback('PERFECT!', '#ffcc00', n.lane);
            } else if (pressedLanes[n.lane] && heldNotes[n.lane] === n) {
                // Maintien actif : points toutes les HOLD_TICK_INTERVAL secondes
                n.holdGraceEnd = null;
                if (n.holdLastTick === null) n.holdLastTick = t;
                if (t - n.holdLastTick >= HOLD_TICK_INTERVAL) {
                    n.holdLastTick = t;
                    const tickPts = 30 * getMultiplier();
                    updateScore(score + tickPts);
                    spawnScoreText(tickPts, n.lane);
                    hitFlashes.push({ lane: n.lane, life: 0.5 });
                }
            } else if (!pressedLanes[n.lane]) {
                // Relâché : vérifier la fenêtre de grâce
                if (n.holdGraceEnd === null) n.holdGraceEnd = t + HOLD_GRACE;
                if (t > n.holdGraceEnd) {
                    n.holdDone = true;
                    if (heldNotes[n.lane] === n) heldNotes[n.lane] = null;
                    combo = 0; updateComboDisplay(); showFeedback('LÂCHÉ!', '#e74c3c', n.lane);
                }
            }
        }
    }

    if (songDuration > 0) progressFill.style.width = Math.min(100, (t / songDuration) * 100) + '%';

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (bgImage.complete && bgImage.naturalWidth) {
        ctx.globalAlpha = 0.35;
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
    }
    drawLanes();
    for (const n of notes) drawNote(n, t);
    updateParticles();
    drawHitTexts();

    if (audio.ended || (songDuration > 0 && t >= songDuration - 0.5)) { endGame(); return; }
    requestAnimationFrame(gameLoop);
}

// ── HIT ───────────────────────────────────────────────────────────────────────
function tryHit(lane) {
    const t = audio.currentTime;
    let best = null, bestDiff = Infinity;
    for (const n of notes) {
        if (n.hit || n.missed || n.lane !== lane) continue;
        const d = Math.abs(t - n.time);
        if (d < bestDiff) { bestDiff = d; best = n; }
    }
    if (!best || bestDiff > HIT_WINDOW_GOOD) {
        showFeedback('MISS', '#e74c3c', lane); combo = 0; updateComboDisplay(); return;
    }
    best.hit = true; combo++; hitNotes++;
    if (combo > maxCombo) maxCombo = combo;
    const perfect = bestDiff <= HIT_WINDOW_PERFECT;
    const hitPts = (perfect ? 300 : 100) * getMultiplier();
    updateScore(score + hitPts);
    spawnScoreText(hitPts, lane);
    spawnParticles(lane, perfect);
    hitFlashes.push({ lane, life: 1 });
    updateComboDisplay();

    if (best.hold > 0) {
        heldNotes[lane] = best;
        showFeedback('PERFECT!', '#ffcc00', lane);
    } else {
        showFeedback(perfect ? 'PERFECT!' : 'GOOD', perfect ? '#ffcc00' : '#ff7700', lane);
    }
}

function tryRelease(lane) {
    const n = heldNotes[lane];
    if (!n || n.holdDone) return;
    // Lancer la fenêtre de grâce (le game loop gère l'échec si expirée)
    if (n.holdGraceEnd === null) n.holdGraceEnd = audio.currentTime + HOLD_GRACE;
}

function updateComboDisplay() {
    if (combo >= 2) { comboDisplay.classList.remove('combo-hidden'); comboNumber.textContent = 'x' + getMultiplier(); }
    else              comboDisplay.classList.add('combo-hidden');
}

function showFeedback(text, color, lane) {
    if (lane !== undefined) {
        hitTexts.push({ text, color, x: pLaneX(lane, getHitY()), y: getHitY() - 60, alpha: 1, vy: -1.8, size: 15 });
    }
}

function spawnScoreText(pts, lane) {
    hitTexts.push({ text: '+' + pts, color: '#ff2200', x: pLaneX(lane, getHitY()), y: getHitY() - 90, alpha: 1, vy: -2.2, size: 18 });
}

function drawHitTexts() {
    for (let i = hitTexts.length - 1; i >= 0; i--) {
        const h = hitTexts[i];
        h.y   += h.vy;
        h.alpha -= 0.022;
        if (h.alpha <= 0) { hitTexts.splice(i, 1); continue; }
        ctx.globalAlpha = h.alpha;
        ctx.fillStyle   = h.color;
        ctx.font        = `bold ${h.size || 15}px "Arial Black", Arial, sans-serif`;
        ctx.textAlign   = 'center';
        ctx.fillText(h.text, h.x, h.y);
    }
    ctx.globalAlpha = 1;
    ctx.textAlign   = 'left';
}

// ── INPUT ─────────────────────────────────────────────────────────────────────
const KEY_MAP = { s: 0, d: 1, f: 2 };
document.addEventListener('keydown', e => {
    if (!running) return;
    const lane = KEY_MAP[e.key.toLowerCase()];
    if (lane === undefined || e.repeat) return;
    pressedLanes[lane] = true; BTN_ELS[lane].classList.add('pressed'); tryHit(lane);
});
document.addEventListener('keyup', e => {
    const lane = KEY_MAP[e.key.toLowerCase()];
    if (lane === undefined) return;
    pressedLanes[lane] = false; BTN_ELS[lane].classList.remove('pressed');
    tryRelease(lane);
});
BTN_ELS.forEach((btn, lane) => {
    btn.addEventListener('pointerdown', e => { e.preventDefault(); if (!running) return; pressedLanes[lane] = true; btn.classList.add('pressed'); tryHit(lane); }, { passive: false });
    btn.addEventListener('pointerup',    e => { e.preventDefault(); pressedLanes[lane] = false; btn.classList.remove('pressed'); tryRelease(lane); }, { passive: false });
    btn.addEventListener('pointercancel',() => { pressedLanes[lane] = false; btn.classList.remove('pressed'); tryRelease(lane); });
    btn.addEventListener('pointerleave', () => { pressedLanes[lane] = false; btn.classList.remove('pressed'); tryRelease(lane); });
});

// Fondu d'ouverture
window.addEventListener('load', () => {
    requestAnimationFrame(() => {
        fadeOverlay.classList.remove('visible');
    });
});

// ── FLAMMES MENU ─────────────────────────────────────────────────────────────
const flameCanvas = document.getElementById('flame-canvas');
const flameCtx    = flameCanvas.getContext('2d');
const flameParticles = [];

function resizeFlameCanvas() {
    flameCanvas.width  = appEl.offsetWidth;
    flameCanvas.height = appEl.offsetHeight;
}
window.addEventListener('resize', resizeFlameCanvas);
resizeFlameCanvas();

function spawnFlameParticle(side) {
    const w = flameCanvas.width;
    const h = flameCanvas.height;
    const zoneW = w * 0.18;
    const x = side === 'left'
        ? Math.random() * zoneW
        : w - Math.random() * zoneW;
    flameParticles.push({
        x,
        y: h + Math.random() * 30,
        vx: (Math.random() - 0.5) * 0.8 + (side === 'left' ? 0.3 : -0.3),
        vy: -(1.5 + Math.random() * 2.5),
        life: 1,
        decay: 0.008 + Math.random() * 0.010,
        size: 18 + Math.random() * 28,
    });
}

function drawFlames() {
    const w = flameCanvas.width;
    const h = flameCanvas.height;
    flameCtx.clearRect(0, 0, w, h);

    // Spawn
    for (let i = 0; i < 3; i++) spawnFlameParticle('left');
    for (let i = 0; i < 3; i++) spawnFlameParticle('right');

    // Update & draw
    for (let i = flameParticles.length - 1; i >= 0; i--) {
        const p = flameParticles[i];
        p.x   += p.vx;
        p.y   += p.vy;
        p.life -= p.decay;
        p.vx  += (Math.random() - 0.5) * 0.25;
        if (p.life <= 0) { flameParticles.splice(i, 1); continue; }

        // Couleur : blanc/jaune → orange → rouge → transparent
        const t = 1 - p.life;
        let r, g, b;
        if (t < 0.2) {
            r = 255; g = Math.round(255 - t / 0.2 * 155); b = Math.round(200 - t / 0.2 * 200);
        } else if (t < 0.5) {
            r = 255; g = Math.round(100 - (t - 0.2) / 0.3 * 100); b = 0;
        } else {
            r = Math.round(255 - (t - 0.5) / 0.5 * 120); g = 0; b = 0;
        }

        const alpha = p.life * 0.55;
        const grad  = flameCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        grad.addColorStop(0,   `rgba(${r},${g},${b},${alpha})`);
        grad.addColorStop(0.4, `rgba(${r},${Math.round(g * 0.6)},0,${alpha * 0.6})`);
        grad.addColorStop(1,   `rgba(${r},0,0,0)`);

        flameCtx.beginPath();
        flameCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        flameCtx.fillStyle = grad;
        flameCtx.fill();
    }

    if (!screenStart.classList.contains('hidden')) {
        requestAnimationFrame(drawFlames);
    }
}
drawFlames();

// ── START / END ───────────────────────────────────────────────────────────────
const fadeOverlay = document.getElementById('fade-overlay');

function fadeTransition(callback) {
    fadeOverlay.classList.add('visible');
    fadeOverlay.addEventListener('transitionend', function handler() {
        fadeOverlay.removeEventListener('transitionend', handler);
        callback();
        requestAnimationFrame(() => {
            fadeOverlay.classList.remove('visible');
        });
    }, { once: true });
}

document.getElementById('btn-start').addEventListener('click', () => fadeTransition(startGame));
document.getElementById('btn-retry').addEventListener('click', () => fadeTransition(startGame));
document.getElementById('btn-back-menu').addEventListener('click', () => {
    screenResult.classList.add('hidden');
    screenStart.classList.remove('hidden'); screenStart.classList.add('active');
    drawFlames();
});
document.getElementById('btn-quit').addEventListener('click', () => {
    window.location.href = 'index.html';
});
const btnRecord = document.getElementById('btn-record');
if (!SHOW_RECORD_BTN) btnRecord.style.display = 'none';
btnRecord.addEventListener('click', startRecord);
document.getElementById('btn-download').addEventListener('click', downloadRecord);
document.getElementById('btn-back-start').addEventListener('click', () => {
    document.getElementById('screen-record-done').classList.add('hidden');
    screenStart.classList.remove('hidden'); screenStart.classList.add('active');
});

function startGame() {
    screenStart.classList.add('hidden'); screenStart.classList.remove('active'); screenResult.classList.add('hidden');
    screenGame.classList.remove('hidden');
    initNotes(); pressedLanes.fill(false); heldNotes.fill(null); particles.length = 0; hitFlashes.length = 0; hitTexts.length = 0;
    BTN_ELS.forEach(b => b.classList.remove('pressed'));
    scoreDisplay.textContent = '0';
    comboDisplay.classList.add('combo-hidden');
    feedbackEl.textContent = ''; progressFill.style.width = '0%';
    audio.currentTime = 0;
    if (audio.duration) songDuration = audio.duration;
    audio.addEventListener('loadedmetadata', () => { songDuration = audio.duration; }, { once: true });
    running = true;
    requestAnimationFrame(gameLoop);

    audio.play().catch(() => {});

    const countdownEl = document.getElementById('countdown-display');
    ['3', '2', '1'].forEach((val, i) => {
        setTimeout(() => {
            countdownEl.textContent = val;
            countdownEl.classList.remove('countdown-hidden');
            countdownEl.style.animation = 'none';
            void countdownEl.offsetWidth;
            countdownEl.style.animation = '';
        }, 1000 + i * 1000);
    });
    setTimeout(() => countdownEl.classList.add('countdown-hidden'), 4000);
}

function endGame() {
    running = false; audio.pause();
    saveBestScore(score);
    screenGame.classList.add('hidden'); screenResult.classList.remove('hidden');
    const pct = totalNotes > 0 ? Math.round((hitNotes / totalNotes) * 100) : 0;
    document.getElementById('res-score').textContent = score.toLocaleString('fr');
    document.getElementById('res-combo').textContent = maxCombo;
    document.getElementById('res-pct').textContent   = pct + '%';
    document.getElementById('result-grade').textContent =
        pct >= 95 ? 'S' : pct >= 85 ? 'A' : pct >= 70 ? 'B' : pct >= 50 ? 'C' : 'D';
}

// ── RECORD MODE ───────────────────────────────────────────────────────────────
const LANE_NAMES = ['S', 'D', 'F'];
let recRunning   = false;
let recNotes     = [];          // [{lane, start, end|null}]
let recActive    = [null, null, null]; // appuis en cours par lane
let recTimerRAF  = null;

const screenRecord     = document.getElementById('screen-record');
const screenRecordDone = document.getElementById('screen-record-done');
const recTimeEl        = document.getElementById('rec-time');
const recCanvas        = document.getElementById('record-canvas');
const recBtns = [
    document.getElementById('rec-btn-s'),
    document.getElementById('rec-btn-d'),
    document.getElementById('rec-btn-f'),
];

function formatTC(t) {
    const m  = Math.floor(t / 60);
    const s  = Math.floor(t % 60).toString().padStart(2, '0');
    const cs = Math.floor((t % 1) * 100).toString().padStart(2, '0');
    return `${m}:${s}.${cs}`;
}

function recLoop() {
    if (!recRunning) return;
    recTimeEl.textContent = formatTC(audio.currentTime);
    if (audio.ended || (songDuration > 0 && audio.currentTime >= songDuration - 0.3)) {
        endRecord(); return;
    }
    recTimerRAF = requestAnimationFrame(recLoop);
}

function startRecord() {
    recNotes = []; recActive = [null, null, null];
    screenStart.classList.add('hidden');
    screenRecord.classList.remove('hidden');
    recCanvas.width  = window.innerWidth;
    recCanvas.height = window.innerHeight;
    // Fond minimal sur le canvas record
    const rc = recCanvas.getContext('2d');
    rc.fillStyle = '#0a0a0f'; rc.fillRect(0, 0, recCanvas.width, recCanvas.height);
    audio.currentTime = 0;
    audio.play().catch(() => {});
    if (audio.duration) songDuration = audio.duration;
    audio.addEventListener('loadedmetadata', () => { songDuration = audio.duration; }, { once: true });
    recRunning = true;
    recTimerRAF = requestAnimationFrame(recLoop);
}

function endRecord() {
    recRunning = false; audio.pause();
    // Clore les notes encore maintenues
    const t = audio.currentTime;
    for (let i = 0; i < 3; i++) {
        if (recActive[i] !== null) { recActive[i].end = t; recActive[i] = null; }
        recBtns[i].classList.remove('rec-pressed');
    }
    screenRecord.classList.add('hidden');
    screenRecordDone.classList.remove('hidden');
    document.getElementById('rec-note-count').textContent =
        recNotes.length + ' NOTE' + (recNotes.length > 1 ? 'S' : '') + ' ENREGISTRÉE' + (recNotes.length > 1 ? 'S' : '');
}

function recPress(lane) {
    if (!recRunning) return;
    const entry = { lane, start: audio.currentTime, end: null };
    recNotes.push(entry);
    recActive[lane] = entry;
    recBtns[lane].classList.add('rec-pressed');
}

function recRelease(lane) {
    if (recActive[lane]) {
        recActive[lane].end = audio.currentTime;
        recActive[lane] = null;
    }
    recBtns[lane].classList.remove('rec-pressed');
}

// Clavier
document.addEventListener('keydown', e => {
    if (!recRunning) return;
    const lane = KEY_MAP[e.key.toLowerCase()];
    if (lane === undefined || e.repeat) return;
    recPress(lane);
});
document.addEventListener('keyup', e => {
    if (!recRunning) return;
    const lane = KEY_MAP[e.key.toLowerCase()];
    if (lane === undefined) return;
    recRelease(lane);
});

// Boutons tactiles
recBtns.forEach((btn, lane) => {
    btn.addEventListener('pointerdown', e => { e.preventDefault(); recPress(lane); });
    btn.addEventListener('pointerup',    () => recRelease(lane));
    btn.addEventListener('pointerleave', () => recRelease(lane));
});

function downloadRecord() {
    const HOLD_THRESHOLD = 0.12; // en dessous → tap simple
    // Trier par ordre chronologique
    const sorted = [...recNotes].sort((a, b) => a.start - b.start);

    const lines = sorted.map(n => {
        const isHold = n.end !== null && (n.end - n.start) >= HOLD_THRESHOLD;
        const name   = LANE_NAMES[n.lane];
        if (isHold) {
            return `${name} ${formatTC(n.start)} -> ${formatTC(n.end)}`;
        } else {
            return `${name} ${formatTC(n.start)}`;
        }
    });

    const content = lines.join(' / \n');
    const blob    = new Blob([content], { type: 'text/plain' });
    const url     = URL.createObjectURL(blob);
    const a       = document.createElement('a');
    a.href        = url;
    a.download    = 'masterexploder_chart.txt';
    a.click();
    URL.revokeObjectURL(url);
}
