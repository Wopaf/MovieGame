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

let bestScore = 0;
const bestScoreEl = document.getElementById('best-score-display');

bestScoreRef.on('value', snap => {
    bestScore = snap.val() || 0;
    bestScoreEl.innerHTML = bestScore > 0
        ? `Meilleur score <span>${bestScore.toLocaleString('fr')}</span>`
        : `Meilleur score <span>—</span>`;
});

function saveBestScore(s) {
    if (s > bestScore) bestScoreRef.set(s);
}

// ── CHART ──────────────────────────────────────────────────────────────────
// Master Exploder — Tenacious D — chart manuelle
// S=0 (gauche), D=1 (milieu), F=2 (droite)
// [time_secondes, lane, hold_secondes]
function s(time, lane, hold = 0) { return [time, lane, hold]; }

const CHART = [
    // Intro — série S
    s(6.75,0), s(7.17,0), s(7.58,0), s(7.98,0), s(8.38,0), s(8.79,0),
    s(9.21,0), s(9.61,0), s(10.03,0), s(10.46,0), s(10.82,0), s(11.18,0), s(11.51,0),
    // Changement de couloirs
    s(11.79,1), s(12.03,2),
    s(12.59,0), s(12.81,1), s(13.10,2),
    s(13.66,2), s(13.96,2), s(14.40,2), s(14.79,2), s(15.17,2), s(15.55,2), s(15.94,2),
    // Longs holds
    s(16.42,1,3.24), s(19.64,0,2.50), s(21.94,1,1.47),
    s(23.43,2,0.84), s(24.25,1,0.91), s(25.12,0,0.84),
    s(25.99,1), s(26.35,2), s(26.80,1),
    s(27.22,0,0.56), s(27.72,1,0.52), s(28.16,2,0.77), s(28.89,1,3.32),
    // Couplet
    s(32.32,0),
    s(35.53,0), s(35.72,1), s(36.30,2),
    s(37.23,0), s(37.61,1), s(38.01,2),
    s(38.82,0), s(39.10,1), s(39.40,2),
    s(40.25,2), s(40.47,1), s(40.80,0),
    s(41.84,0), s(42.28,1), s(42.71,2),
    s(44.28,2), s(44.58,1),
    s(44.97,1,3.12), s(48.31,0,6.10),
    s(54.47,1),
    // Refrain
    s(56.33,0), s(56.61,1), s(56.83,2),
    s(57.21,0), s(57.43,1), s(57.65,2),
    s(58.04,0), s(58.18,1), s(58.42,2),
    s(58.78,0), s(58.90,1), s(59.14,2),
    s(59.51,2,3.06),
    s(62.63,1), s(63.07,0), s(63.37,2), s(63.78,1),
    s(64.22,0,2.87),
    s(67.14,1), s(67.50,2,6.52),
    s(69.18,0), s(69.70,0), s(70.30,0), s(70.77,0),
    s(71.39,0), s(71.98,0), s(72.40,0), s(72.93,0), s(73.55,0), s(73.98,0),
    // Pont
    s(75.57,1), s(76.05,2), s(76.45,1), s(76.79,1), s(77.20,0),
    s(78.77,0), s(79.15,1), s(79.59,1), s(79.98,0), s(80.48,0), s(80.78,1),
    s(81.18,2,0.77),
    s(83.60,0), s(83.97,1), s(84.39,0),
    s(86.56,2), s(87.07,1), s(87.51,0), s(87.87,2,0.52),
    s(89.11,1), s(89.43,0), s(89.81,0),
    s(90.27,0,1.39), s(91.62,1,1.41), s(92.99,2,1.88),
    // Solo
    s(96.82,1), s(97.22,0), s(97.63,1), s(98.01,2),
    s(98.47,1), s(98.85,1), s(99.26,1),
    s(99.62,0), s(100.04,1), s(100.47,2), s(100.89,1), s(101.29,1), s(101.61,1),
    s(101.95,0), s(102.38,1), s(102.84,2),
    s(103.24,2), s(103.63,2), s(103.99,1), s(104.44,0), s(104.80,1),
    s(105.24,2), s(105.50,2), s(105.80,2), s(106.00,2),
    s(106.77,1), s(107.17,0), s(107.64,0), s(108.04,0), s(108.44,0),
    s(108.72,1), s(109.15,2), s(109.61,1), s(110.05,1), s(110.46,1), s(110.80,0),
    s(111.22,1), s(111.64,1), s(112.03,2), s(112.43,2), s(112.80,2),
    s(113.20,1), s(113.56,0), s(114.00,1), s(114.44,1), s(114.83,1),
    s(115.53,0), s(115.69,1), s(116.10,2), s(116.44,1,0.58),
    // Final
    s(118.33,0), s(118.52,1), s(118.65,2), s(119.10,1), s(119.40,0,0.68),
    s(121.56,0), s(122.26,1), s(122.66,2),
    s(124.29,2), s(124.70,1),
    s(124.98,0,1.79), s(126.76,1,1.61), s(128.35,2,1.42),
    s(129.92,2,0.69), s(130.52,1,1.17), s(131.57,2,1.43),
    s(133.14,1,0.85), s(134.01,0,0.72), s(134.79,1,3.18),
    s(138.08,1),
    s(140.35,0), s(140.51,1), s(140.68,2),
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

// Fondu d'ouverture + lancement musique menu
window.addEventListener('load', () => {
    requestAnimationFrame(() => {
        fadeOverlay.classList.remove('visible');
        menuAudio.play().catch(() => {
            const tryPlay = () => { menuAudio.play().catch(() => {}); };
            document.addEventListener('pointerdown', tryPlay, { once: true });
            document.addEventListener('keydown',     tryPlay, { once: true });
        });
    });
});

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
    screenStart.classList.remove('hidden');
});
document.getElementById('btn-quit').addEventListener('click', () => {
    window.location.href = 'index.html';
});
document.getElementById('btn-record').addEventListener('click', startRecord);
document.getElementById('btn-download').addEventListener('click', downloadRecord);
document.getElementById('btn-back-start').addEventListener('click', () => {
    document.getElementById('screen-record-done').classList.add('hidden');
    screenStart.classList.remove('hidden');
});

function startGame() {
    menuAudio.pause(); menuAudio.currentTime = 0;
    screenStart.classList.add('hidden'); screenResult.classList.add('hidden');
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
    setTimeout(() => { audio.play().catch(() => {}); }, 1000);
}

function endGame() {
    running = false; audio.pause();
    saveBestScore(score);
    menuAudio.currentTime = 0; menuAudio.play().catch(() => {});
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
