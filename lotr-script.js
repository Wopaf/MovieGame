// ============================================================
//  LE SEIGNEUR DES ANNEAUX 1978 — Mini Jeu
// ============================================================

const LOTR_INDEX   = 40;
const TARGET_SCORE = 5000;

const LOTR_GAME = (() => {

    // ── Images personnage ───────────────────────────────────
    const imgBg    = new Image(); imgBg.src    = 'medias/lotr-brackground.png';
    const imgIdle  = new Image(); imgIdle.src  = 'medias/gandalf-idle.png';
    const imgWalk1 = new Image(); imgWalk1.src = 'medias/gandalf-walk1.png';
    const imgWalk2 = new Image(); imgWalk2.src = 'medias/gandalf-walk2.png';

    // ── Images ennemis ──────────────────────────────────────
    const imgMob1   = new Image(); imgMob1.src   = 'medias/mob-11.png';
    const imgMob2   = new Image(); imgMob2.src   = 'medias/mob-12.png';
    const imgTroll1  = new Image(); imgTroll1.src  = 'medias/troll-1.png';
    const imgTroll2  = new Image(); imgTroll2.src  = 'medias/troll-2.png';
    const imgShield  = new Image(); imgShield.src  = 'medias/bouclier.png';

    // ── État jeu ────────────────────────────────────────────
    let canvas, ctx, animId;
    let gameRunning = false;
    let lastTime    = 0;

    let   charSpeed     = 160;   // px/s (upgradable)
    const CHAR_H_RATIO  = 0.09;  // hauteur du perso = H * ratio
    const WALK_INTERVAL = 180;   // ms entre les frames de marche

    let charX = 0, charY = 0;
    let walkFrame = 0;
    let walkTimer = 0;

    // ── PV / Mana ────────────────────────────────────────────
    let hp   = 100, maxHp   = 100;
    let mana = 100, maxMana = 100;

    // ── Immunité ────────────────────────────────────────────
    let   iframesDuration  = 500;   // ms d'invincibilité (upgradable)
    let   iframesUntil     = 0;
    let   damageReduction  = 0;
    let   waveHeal         = 0;
    let   orbStunBonus     = 0;
    let   manaRegen        = 2;

    // ── Ennemis ─────────────────────────────────────────────
    const MOB_SPEED        = 90;    // px/s
    const MOB_H_RATIO      = 0.055; // hauteur du mob = H * ratio
    const MOB_ANIM_MS      = 220;   // ms entre les frames du mob
    let   mobSpawnDelay    = 2500;  // ms entre les spawns (diminue à chaque atout)
    const MOB_MAX_HP       = 20;    // PV max des mobs
    const MOB_DAMAGE       = 5;     // PV perdus par contact
    const MOB_SPAWN_MARGIN = 60;    // px hors écran pour le spawn

    const TROLL_MAX_HP  = 100;
    const TROLL_SPEED   = 60;
    const TROLL_H_RATIO = 0.085;
    const TROLL_SPAWN_MS = 20000;   // ms entre les spawns de troll

    let mobs        = [];
    let spawnTimer  = 0;
    let trollTimer  = 0;

    // ── Orbes ────────────────────────────────────────────────
    const ORB_ORBIT_RATIO = 0.10;  // rayon orbite = H * ratio
    const ORB_RADIUS      = 7;     // rayon visuel de l'orbe (px)
    let   orbSpeed        = 2.2;   // rad/s (upgradable)
    let   orbDamage       = 5;     // dégâts par contact (upgradable)
    const ORB_HIT_CD      = 700;   // ms entre deux hits sur le même mob

    let orbCount = 2;
    let orbAngle = 0;

    // ── Vague (sort classique) ───────────────────────────────
    const WAVE_DURATION         = 200;   // ms d'expansion
    let   waveDamage            = 5;  // (upgradable)
    const WAVE_MAX_RADIUS_RATIO = 0.32;  // rayon max = H * ratio
    const WAVE_KNOCKBACK        = 280;   // px/s initial

    let waves = [];  // [{ startTime, maxR, hitMobs: Set }]

    function spawnWave(H) {
        waves.push({ startTime: performance.now(), maxR: H * WAVE_MAX_RADIUS_RATIO, hitMobs: new Set() });
        if (waveHeal > 0) { hp = Math.min(maxHp, hp + waveHeal); updateHUD(); }
    }

    function updateWaves() {
        const now = performance.now();
        for (const w of waves) {
            const t = Math.min((now - w.startTime) / WAVE_DURATION, 1);
            const r = w.maxR * t;
            for (const mob of mobs) {
                if (w.hitMobs.has(mob)) continue;
                const dx = mob.x - charX;
                const dy = mob.y - charY;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                if (dist <= r) {
                    w.hitMobs.add(mob);
                    mob.hp -= waveDamage;
                    mob.flashUntil = now + 200;
                    mob.vx += (dx / dist) * WAVE_KNOCKBACK;
                    mob.vy += (dy / dist) * WAVE_KNOCKBACK;
                    spawnDmgNumber(mob.x, mob.y - 10, waveDamage);
                }
            }
        }
        waves = waves.filter(w => performance.now() - w.startTime < WAVE_DURATION);
    }

    function drawWaves() {
        const now = performance.now();
        for (const w of waves) {
            const t     = Math.min((now - w.startTime) / WAVE_DURATION, 1);
            const r     = w.maxR * t;
            const alpha = (1 - t) * 0.7;

            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = '#c8a0ff';
            ctx.lineWidth   = 3;
            ctx.shadowColor = '#9944ff';
            ctx.shadowBlur  = 12;
            ctx.beginPath();
            ctx.arc(charX, charY, r, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        }
    }

    // ── Laser ────────────────────────────────────────────────
    const LASER_RANGE    = 0.40;  // distance max = H * ratio
    let   laserDamage    = 2;     // (upgradable)
    const LASER_DURATION = 300;
    let   laserCooldown  = 500;   // ms entre deux tirs (upgradable)

    let laserShowUntil = 0;
    let laserCoolUntil = 0;
    let laserEndX      = 0;
    let laserEndY      = 0;

    function updateLaser(H) {
        const now   = performance.now();
        if (now < laserCoolUntil) return;

        const range = H * LASER_RANGE;
        let nearest = null;
        let nearDist = Infinity;

        for (const mob of mobs) {
            const dx = mob.x - charX;
            const dy = mob.y - charY;
            const d  = Math.sqrt(dx * dx + dy * dy);
            if (d < range && d < nearDist) { nearDist = d; nearest = mob; }
        }

        if (!nearest) return;

        laserCoolUntil = now + laserCooldown;
        laserShowUntil = now + LASER_DURATION;
        laserEndX      = nearest.x;
        laserEndY      = nearest.y;
        nearest.hp    -= laserDamage;
        spawnDmgNumber(nearest.x, nearest.y - 10, laserDamage);
    }

    function drawLaser() {
        const now = performance.now();
        if (now >= laserShowUntil) return;

        const t     = 1 - (now - (laserShowUntil - LASER_DURATION)) / LASER_DURATION;
        const alpha = Math.max(0, t);

        ctx.save();
        ctx.globalAlpha  = alpha * 0.85;
        ctx.strokeStyle  = '#88ddff';
        ctx.lineWidth    = 2;
        ctx.shadowColor  = '#44aaff';
        ctx.shadowBlur   = 10;
        ctx.beginPath();
        ctx.moveTo(charX, charY);
        ctx.lineTo(laserEndX, laserEndY);
        ctx.stroke();

        // Éclat au point d'impact
        ctx.globalAlpha = alpha * 0.6;
        ctx.fillStyle   = '#ffffff';
        ctx.beginPath();
        ctx.arc(laserEndX, laserEndY, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    // ── Chiffres de dégâts ───────────────────────────────────
    let dmgNumbers = [];  // [{ x, y, value, age, maxAge }]

    function spawnDmgNumber(x, y, value, color = '#f5d060') {
        dmgNumbers.push({ x, y: y - 10, value, color, age: 0, maxAge: 700 });
    }

    function updateDmgNumbers(dt) {
        for (const n of dmgNumbers) n.age += dt;
        dmgNumbers = dmgNumbers.filter(n => n.age < n.maxAge);
    }

    function drawDmgNumbers() {
        for (const n of dmgNumbers) {
            const t       = n.age / n.maxAge;           // 0 → 1
            const alpha   = t < 0.6 ? 1 : 1 - (t - 0.6) / 0.4;
            const offsetY = -28 * t;                    // monte de 28px

            ctx.save();
            ctx.globalAlpha  = alpha;
            ctx.font         = 'bold 13px "Cinzel", serif';
            ctx.textAlign    = 'center';
            ctx.textBaseline = 'middle';
            // Contour sombre
            ctx.strokeStyle = 'rgba(0,0,0,0.8)';
            ctx.lineWidth   = 3;
            ctx.strokeText(`-${n.value}`, n.x, n.y + offsetY);
            // Texte doré
            ctx.fillStyle = n.color;
            ctx.fillText(`-${n.value}`, n.x, n.y + offsetY);
            ctx.restore();
        }
    }

    function spawnAtEdge(W) {
        const side = Math.floor(Math.random() * 4);
        if (side === 0) return { x: Math.random() * W, y: -MOB_SPAWN_MARGIN };
        if (side === 1) return { x: W + MOB_SPAWN_MARGIN, y: Math.random() * W };
        if (side === 2) return { x: Math.random() * W, y: W + MOB_SPAWN_MARGIN };
        return { x: -MOB_SPAWN_MARGIN, y: Math.random() * W };
    }

    function spawnMob(W) {
        const { x, y } = spawnAtEdge(W);
        mobs.push({ x, y, vx: 0, vy: 0, animTimer: 0, frame: 0, flashUntil: 0, orbHitUntil: 0,
            hp: MOB_MAX_HP, displayHp: MOB_MAX_HP, maxHp: MOB_MAX_HP,
            speed: MOB_SPEED, hRatio: MOB_H_RATIO, isTroll: false });
    }

    function spawnTroll(W) {
        const { x, y } = spawnAtEdge(W);
        mobs.push({ x, y, vx: 0, vy: 0, animTimer: 0, frame: 0, flashUntil: 0, orbHitUntil: 0,
            hp: TROLL_MAX_HP, displayHp: TROLL_MAX_HP, maxHp: TROLL_MAX_HP,
            speed: TROLL_SPEED, hRatio: TROLL_H_RATIO, isTroll: true });
    }

    function updateOrbs(dt, H) {
        orbAngle += orbSpeed * dt / 1000;
        const now         = performance.now();
        const orbitRadius = H * ORB_ORBIT_RATIO;
        const hitDist     = orbitRadius * 0.35 + ORB_RADIUS;

        for (let i = 0; i < orbCount; i++) {
            const a    = orbAngle + (Math.PI * 2 * i / orbCount);
            const ox   = charX + Math.cos(a) * orbitRadius;
            const oy   = charY + Math.sin(a) * orbitRadius;

            for (const mob of mobs) {
                if (now < mob.orbHitUntil) continue;
                const dx = ox - mob.x;
                const dy = oy - mob.y;
                if (Math.sqrt(dx * dx + dy * dy) < hitDist) {
                    mob.orbHitUntil = now + ORB_HIT_CD;
                    mob.hp         -= orbDamage;
                    mob.flashUntil  = now + 200 + orbStunBonus;
                    spawnDmgNumber(ox, oy, orbDamage);
                }
            }
        }
    }

    function drawOrbs(H) {
        const orbitRadius = H * ORB_ORBIT_RATIO;
        for (let i = 0; i < orbCount; i++) {
            const a  = orbAngle + (Math.PI * 2 * i / orbCount);
            const ox = charX + Math.cos(a) * orbitRadius;
            const oy = charY + Math.sin(a) * orbitRadius;

            // Halo externe
            const glow = ctx.createRadialGradient(ox, oy, 0, ox, oy, ORB_RADIUS * 2.8);
            glow.addColorStop(0,   'rgba(200, 160, 255, 0.45)');
            glow.addColorStop(1,   'rgba(200, 160, 255, 0)');
            ctx.beginPath();
            ctx.arc(ox, oy, ORB_RADIUS * 2.8, 0, Math.PI * 2);
            ctx.fillStyle = glow;
            ctx.fill();

            // Orbe central
            const grad = ctx.createRadialGradient(ox - ORB_RADIUS * 0.3, oy - ORB_RADIUS * 0.3, 1, ox, oy, ORB_RADIUS);
            grad.addColorStop(0,   '#ffffff');
            grad.addColorStop(0.4, '#d4aaff');
            grad.addColorStop(1,   '#7733cc');
            ctx.beginPath();
            ctx.arc(ox, oy, ORB_RADIUS, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();
        }
    }

    function addOrb() {
        orbCount++;
    }

    // ── Atouts ───────────────────────────────────────────────
    let gameTimer     = 0;
    let nextUpgradeAt = 60000;

    const UPGRADE_POOLS = {
        magic: [
            { label: 'Dégâts du rayon +2',           apply: () => { laserDamage += 2; } },
            { label: 'Dégâts des orbes +3',           apply: () => { orbDamage += 3; } },
            { label: 'Nombre d\'orbes +1',            apply: () => { orbCount++; } },
            { label: 'Dégâts de la vague +2',         apply: () => { waveDamage += 2; } },
            { label: 'Mana max. +10',                 apply: () => { maxMana += 10; mana = Math.min(mana + 10, maxMana); updateHUD(); } },
            { label: 'Régénération mana +1 / sec',    apply: () => { manaRegen += 1; } },
        ],
        defense: [
            { label: 'Dommages subis −1',             apply: () => { damageReduction++; } },
            { label: 'Durée d\'immunité +0.2s',       apply: () => { iframesDuration += 200; } },
            { label: 'Vague : récupère +1 PV',        apply: () => { waveHeal++; } },
            { label: 'Orbes : bloquent l\'ennemi +0.2s', apply: () => { orbStunBonus += 200; } },
            { label: 'PV max. +5',                    apply: () => { maxHp += 5; hp = Math.min(hp + 5, maxHp); updateHUD(); } },
        ],
        speed: [
            { label: 'Vitesse de déplacement +20',    apply: () => { charSpeed += 20; } },
            { label: 'Vitesse des orbes +0.5 rad/s',  apply: () => { orbSpeed += 0.5; } },
            { label: 'Rechargement du rayon −0.1s',   apply: () => { laserCooldown = Math.max(100, laserCooldown - 100); } },
            { label: 'Rechargement de la vague −0.1s',apply: () => { SPELLS.s1.cooldown = Math.max(200, SPELLS.s1.cooldown - 100); } },
        ],
    };

    const CAT_META = {
        magic:   { label: 'Magie',   img: 'medias/magie.png' },
        defense: { label: 'Défense', img: 'medias/bouclier.png' },
        speed:   { label: 'Vitesse', img: 'medias/eclair.png' },
    };

    function pickRandom(arr, n) {
        const copy = [...arr];
        const out  = [];
        while (out.length < n && copy.length) {
            const i = Math.floor(Math.random() * copy.length);
            out.push(copy.splice(i, 1)[0]);
        }
        return out;
    }

    function showUpgradeOverlay() {
        gameRunning = false;
        cancelAnimationFrame(animId);
        const overlay = document.getElementById('lotr-upgrade');
        overlay.classList.remove('hidden');
        document.getElementById('lotr-upgrade-step1').classList.remove('hidden');
        document.getElementById('lotr-upgrade-step2').classList.add('hidden');
    }

    function resumeGame() {
        document.getElementById('lotr-upgrade').classList.add('hidden');
        mobSpawnDelay = Math.max(600, mobSpawnDelay - 200);
        lastTime    = 0;
        gameRunning = true;
        animId      = requestAnimationFrame(gameLoop);
    }

    function showUpgradeChoices(catKey) {
        document.getElementById('lotr-upgrade-step1').classList.add('hidden');
        const step2 = document.getElementById('lotr-upgrade-step2');
        step2.classList.remove('hidden');
        document.getElementById('lotr-upgrade-cat-name').textContent = CAT_META[catKey].label.toUpperCase();

        const pool    = UPGRADE_POOLS[catKey];
        const picks   = pickRandom(pool, Math.min(3, pool.length));
        const choices = document.getElementById('lotr-upgrade-choices');
        choices.innerHTML = '';
        const catImg = CAT_META[catKey].img;
        picks.forEach((pick, i) => {
            const btn = document.createElement('button');
            btn.className = 'lotr-upgrade-choice';
            btn.style.animationDelay = `${0.15 + i * 0.1}s`;
            const img = document.createElement('img');
            img.src = catImg;
            img.alt = '';
            img.className = 'lotr-upgrade-choice-icon';
            const label = document.createElement('span');
            label.textContent = pick.label;
            btn.appendChild(img);
            btn.appendChild(label);
            btn.addEventListener('click', () => { pick.apply(); resumeGame(); }, { once: true });
            choices.appendChild(btn);
        });
    }

    // Listeners catégories (branchés une seule fois)
    document.querySelectorAll('.lotr-upgrade-cat').forEach(btn => {
        btn.addEventListener('click', () => showUpgradeChoices(btn.dataset.cat));
    });

    function updateMobs(dt, charH) {
        const now = performance.now();

        const H = canvas.height;

        const charRef = imgIdle.naturalWidth ? imgIdle : imgWalk1;
        const charAR  = charRef.naturalHeight ? charRef.naturalWidth / charRef.naturalHeight : 1;
        const charW   = charH * charAR;

        for (const mob of mobs) {
            // Dimensions du mob
            const mobH      = H * mob.hRatio;
            const mobRef    = mob.isTroll ? (imgTroll1.naturalWidth ? imgTroll1 : imgTroll2)
                                          : (imgMob1.naturalWidth   ? imgMob1   : imgMob2);
            const mobAR     = mobRef.naturalHeight ? mobRef.naturalWidth / mobRef.naturalHeight : 1;
            const mobW      = mobH * mobAR;
            const sepRadius = mobW * 0.6;

            // Interpolation fluide de la barre de PV
            mob.displayHp += (mob.hp - mob.displayHp) * Math.min(1, dt * 0.012);

            // Knockback : applique et freine la vélocité
            if (mob.vx !== 0 || mob.vy !== 0) {
                mob.x  += mob.vx * dt / 1000;
                mob.y  += mob.vy * dt / 1000;
                const decay = Math.max(0, 1 - dt * 0.012);
                mob.vx *= decay;
                mob.vy *= decay;
                if (Math.abs(mob.vx) < 0.5) mob.vx = 0;
                if (Math.abs(mob.vy) < 0.5) mob.vy = 0;
            }

            // Mouvement vers le personnage (bloqué pendant le flash)
            if (now >= mob.flashUntil) {
                const dx   = charX - mob.x;
                const dy   = charY - mob.y;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                mob.x += (dx / dist) * mob.speed * dt / 1000;
                mob.y += (dy / dist) * mob.speed * dt / 1000;

                // Séparation mob-mob
                for (const other of mobs) {
                    if (other === mob) continue;
                    const sx = mob.x - other.x;
                    const sy = mob.y - other.y;
                    const sd = Math.sqrt(sx * sx + sy * sy) || 0.01;
                    if (sd < sepRadius) {
                        const push = (sepRadius - sd) / 2;
                        mob.x   += (sx / sd) * push;
                        mob.y   += (sy / sd) * push;
                        other.x -= (sx / sd) * push;
                        other.y -= (sy / sd) * push;
                    }
                }
            }

            // Animation frames
            mob.animTimer += dt;
            if (mob.animTimer >= MOB_ANIM_MS) {
                mob.animTimer -= MOB_ANIM_MS;
                mob.frame = 1 - mob.frame;
            }

            // Collision AABB
            const hx = (charW + mobW) * 0.15;
            const hy = (charH + mobH) * 0.15;
            if (Math.abs(charX - mob.x) < hx && Math.abs(charY - mob.y) < hy && now >= iframesUntil) {
                hp = Math.max(0, hp - Math.max(1, MOB_DAMAGE - damageReduction));
                iframesUntil = now + iframesDuration;
                mob.flashUntil = now + 180;
                spawnDmgNumber(charX, charY - charH * 0.5, MOB_DAMAGE, '#ff4444');
                updateHUD();
                if (hp <= 0) showGameOver(0);
            }
        }

        // Supprimer les mobs sans PV
        mobs = mobs.filter(m => m.hp > 0);
    }

    function drawMobs(H) {
        const now = performance.now();

        for (const mob of mobs) {
            const mobH     = H * mob.hRatio;
            const s0       = mob.isTroll ? imgTroll1 : imgMob1;
            const s1       = mob.isTroll ? imgTroll2 : imgMob2;
            const ref      = s0.naturalWidth ? s0 : s1;
            const mobW     = ref.naturalHeight ? mobH * (ref.naturalWidth / ref.naturalHeight) : mobH;
            const sprite   = mob.frame === 0 ? s0 : s1;
            const inFlash  = now < mob.flashUntil;
            const blinkShow = !inFlash || Math.floor(now / 40) % 2 === 0;

            if (!blinkShow) continue;

            // Ombre au sol
            ctx.save();
            ctx.globalAlpha = 0.2;
            ctx.fillStyle   = '#000';
            ctx.beginPath();
            ctx.ellipse(mob.x, mob.y + mobH * 0.35, mobW * 0.38, mobH * 0.07, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            ctx.drawImage(sprite, mob.x - mobW / 2, mob.y - mobH / 2, mobW, mobH);

            // Barre de PV
            const barW  = mobW * 0.9;
            const barH  = mob.isTroll ? 6 : 4;
            const barX  = mob.x - barW / 2;
            const barY  = mob.y - mobH / 2 - (mob.isTroll ? 11 : 8);
            const ratio = Math.max(0, mob.displayHp / mob.maxHp);

            ctx.fillStyle = 'rgba(0,0,0,0.55)';
            ctx.fillRect(barX - 1, barY - 1, barW + 2, barH + 2);
            ctx.fillStyle = '#330000';
            ctx.fillRect(barX, barY, barW, barH);
            ctx.fillStyle = '#cc2222';
            ctx.fillRect(barX, barY, barW * ratio, barH);
        }
    }

    // ── Sorts ────────────────────────────────────────────────
    const SPELLS = {
        s1: { cost: 10, cooldown: 1000, lastUsed: -Infinity },
        s2: { cost: 40, cooldown: 1000, lastUsed: -Infinity },
    };

    function spellReady(spell) {
        return performance.now() - spell.lastUsed >= spell.cooldown;
    }
    function castSpell(spell) {
        if (!spellReady(spell) || mana < spell.cost) return false;
        mana -= spell.cost;
        spell.lastUsed = performance.now();
        updateHUD();
        return true;
    }
    function updateHUD() {
        const hpFill   = document.getElementById('lotr-hp-fill');
        const manaFill = document.getElementById('lotr-mana-fill');
        if (hpFill)   hpFill.style.transform  = `scaleX(${hp   / maxHp})`;
        if (manaFill) manaFill.style.transform = `scaleX(${mana / maxMana})`;
        document.getElementById('lotr-hp-val').textContent   = Math.ceil(hp);
        document.getElementById('lotr-mana-val').textContent = Math.ceil(mana);
    }
    function updateSpellVisuals() {
        const list = [
            { spell: SPELLS.s1, cdId: 'lotr-spell1-cd', btnId: 'lotr-spell1-btn' },
            { spell: SPELLS.s2, cdId: 'lotr-spell2-cd', btnId: 'lotr-spell2-btn' },
        ];
        for (const { spell, cdId, btnId } of list) {
            const cdEl  = document.getElementById(cdId);
            const btnEl = document.getElementById(btnId);
            if (!cdEl || !btnEl) continue;
            const ratio = Math.min((performance.now() - spell.lastUsed) / spell.cooldown, 1);
            cdEl.style.transform = ratio >= 1 ? 'scaleY(0)' : `scaleY(${1 - ratio})`;
            btnEl.style.opacity  = (ratio >= 1 && mana >= spell.cost) ? '1' : '0.45';
        }
    }

    // ── Joystick ────────────────────────────────────────────
    let joyDirX = 0, joyDirY = 0;

    function initJoystick() {
        const base  = document.getElementById('lotr-joystick-base');
        const thumb = document.getElementById('lotr-joystick-thumb');
        if (!base || !thumb) return;

        const RADIUS = base.offsetWidth / 2;   // rayon de la base
        const DEAD   = 0.08;                   // zone morte
        let   startId = null;

        function getCenter() {
            const r = base.getBoundingClientRect();
            return { cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
        }

        function move(clientX, clientY) {
            const { cx, cy } = getCenter();
            let dx = clientX - cx;
            let dy = clientY - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const clamped = Math.min(dist, RADIUS);
            const angle   = Math.atan2(dy, dx);

            const tx = Math.cos(angle) * clamped;
            const ty = Math.sin(angle) * clamped;
            thumb.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px))`;

            const raw = clamped / RADIUS;
            const mag = raw < DEAD ? 0 : (raw - DEAD) / (1 - DEAD);
            joyDirX = mag * Math.cos(angle);
            joyDirY = mag * Math.sin(angle);
        }

        function reset() {
            thumb.style.transform = 'translate(-50%, -50%)';
            joyDirX = 0;
            joyDirY = 0;
            startId = null;
        }

        base.addEventListener('pointerdown', e => {
            e.preventDefault();
            if (startId !== null) return;
            startId = e.pointerId;
            base.setPointerCapture(e.pointerId);
            move(e.clientX, e.clientY);
        });
        base.addEventListener('pointermove', e => {
            if (e.pointerId !== startId) return;
            e.preventDefault();
            move(e.clientX, e.clientY);
        });
        base.addEventListener('pointerup',     e => { if (e.pointerId === startId) reset(); });
        base.addEventListener('pointercancel', e => { if (e.pointerId === startId) reset(); });
    }

    // ── Boucle de jeu ───────────────────────────────────────
    function gameLoop(ts) {
        if (!gameRunning) return;
        animId = requestAnimationFrame(gameLoop);

        const dt = lastTime ? Math.min(ts - lastTime, 50) : 16;
        lastTime = ts;

        const W = canvas.width;
        const H = canvas.height;

        // Taille du sprite
        const charH = H * CHAR_H_RATIO;
        const img0  = imgIdle.naturalWidth ? imgIdle : imgWalk1;
        const ratio = img0.naturalHeight ? img0.naturalWidth / img0.naturalHeight : 1;
        const charW = charH * ratio;

        // Timer atouts
        gameTimer += dt;
        if (gameTimer >= nextUpgradeAt) {
            nextUpgradeAt += 45000;
            showUpgradeOverlay();
            return;
        }

        // Regen mana
        mana = Math.min(maxMana, mana + manaRegen * dt / 1000);
        updateHUD();

        // Déplacement personnage
        const moving = Math.abs(joyDirX) > 0.01 || Math.abs(joyDirY) > 0.01;
        if (moving) {
            charX += joyDirX * charSpeed * dt / 1000;
            charY += joyDirY * charSpeed * dt / 1000;
            charX = Math.max(charW / 2, Math.min(W - charW / 2, charX));
            charY = Math.max(charH / 2, Math.min(H - charH / 2, charY));

            walkTimer += dt;
            if (walkTimer >= WALK_INTERVAL) {
                walkTimer -= WALK_INTERVAL;
                walkFrame = 1 - walkFrame;
            }
        } else {
            walkTimer = 0;
            walkFrame = 0;
        }

        // Spawn ennemis normaux
        spawnTimer += dt;
        if (spawnTimer >= mobSpawnDelay) {
            spawnTimer -= mobSpawnDelay;
            spawnMob(W);
        }

        // Spawn trolls
        trollTimer += dt;
        if (trollTimer >= TROLL_SPAWN_MS) {
            trollTimer -= TROLL_SPAWN_MS;
            spawnTroll(W);
        }

        // Mise à jour ennemis
        updateMobs(dt, charH);

        // ── Rendu ──
        if (imgBg.complete && imgBg.naturalWidth) {
            ctx.drawImage(imgBg, 0, 0, W, H);
        } else {
            ctx.fillStyle = '#1a1208';
            ctx.fillRect(0, 0, W, H);
        }

        // Ennemis (dessinés avant le perso pour passer derrière)
        drawMobs(H);

        // Flash d'immunité sur le personnage (clignotement)
        const now = performance.now();
        const inIframes = now < iframesUntil;
        const flashVisible = !inIframes || Math.floor(now / 80) % 2 === 0;

        if (flashVisible) {
            // Ombre au sol
            ctx.save();
            ctx.globalAlpha = 0.25;
            ctx.fillStyle   = '#000';
            ctx.beginPath();
            ctx.ellipse(charX, charY + charH * 0.42, charW * 0.38, charH * 0.07, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // Sprite Gandalf
            const sprite = moving
                ? (walkFrame === 0 ? imgWalk1 : imgWalk2)
                : imgIdle;

            ctx.save();
            if (inIframes) ctx.globalAlpha = 0.65;
            ctx.drawImage(sprite, charX - charW / 2, charY - charH / 2, charW, charH);
            ctx.restore();

        }

        // Icône bouclier (hors clignotement)
        if (inIframes) {
            const sz = charH * 0.28;
            ctx.save();
            ctx.globalAlpha = 0.9;
            ctx.drawImage(imgShield, charX - sz / 2, charY - sz / 2, sz, sz);
            ctx.restore();
        }

        // ── Vagues ──
        updateWaves();
        drawWaves();

        // ── Laser + Orbes + dégâts ──
        updateLaser(H);
        updateDmgNumbers(dt);
        updateOrbs(dt, H);
        drawLaser();
        drawOrbs(H);
        drawDmgNumbers();

        updateSpellVisuals();
    }

    // ── Démarrer la scène ───────────────────────────────────
    function startGame() {
        canvas = document.getElementById('lotr-canvas');
        ctx    = canvas.getContext('2d');
        const rect    = canvas.getBoundingClientRect();
        canvas.width  = rect.width  || 400;
        canvas.height = rect.height || 700;

        charX = canvas.width  / 2;
        charY = canvas.height / 2;
        walkFrame = 0;
        walkTimer = 0;
        lastTime  = 0;
        hp   = maxHp;
        mana = maxMana;
        iframesUntil = 0;
        mobs = [];
        spawnTimer = 0;
        trollTimer = 0;
        orbCount = 2;
        orbAngle = 0;
        dmgNumbers    = [];
        laserShowUntil = 0;
        laserCoolUntil = 0;
        waves          = [];
        gameTimer      = 0;
        nextUpgradeAt  = 5000;
        // Reset upgradable stats
        charSpeed = 160; iframesDuration = 500; damageReduction = 0;
        waveHeal = 0; orbStunBonus = 0; manaRegen = 2;
        orbDamage = 5; orbSpeed = 2.2; waveDamage = 5;
        laserDamage = 2; laserCooldown = 500;
        SPELLS.s1.cooldown = 1000; SPELLS.s2.cooldown = 1000;
        SPELLS.s1.lastUsed = -Infinity;
        SPELLS.s2.lastUsed = -Infinity;
        gameRunning = true;
        updateHUD();

        initJoystick();
        cancelAnimationFrame(animId);
        animId = requestAnimationFrame(gameLoop);
    }

    function stopGame() {
        gameRunning = false;
        cancelAnimationFrame(animId);
    }

    // ── Embers (écrans de menu / splash) ────────────────────
    function spawnEmbers(containerId, count = 35) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = '';
        const colors = ['#ff6600','#ff4400','#ff9900','#ffcc44','#c84200','#ff3300'];
        for (let i = 0; i < count; i++) {
            const el    = document.createElement('div');
            el.className = 'lotr-ember';
            const size  = 2 + Math.random() * 5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const dur   = 2.5 + Math.random() * 3.5;
            const del   = -(Math.random() * dur);
            const drift = (Math.random() - 0.5) * 100;
            el.style.cssText = [
                `left: ${Math.random() * 100}%`,
                `width: ${size}px`,
                `height: ${size}px`,
                `--c: ${color}`,
                `--dur: ${dur}s`,
                `--del: ${del}s`,
                `--drift: ${drift}px`,
            ].join(';');
            container.appendChild(el);
        }
    }

    // ── Menu ────────────────────────────────────────────────
    function showMenu() {
        stopGame();
        document.getElementById('lotr-game').classList.add('hidden');
        document.getElementById('lotr-gameover').classList.add('hidden');

        const menu  = document.getElementById('lotr-menu');
        const inner = document.getElementById('lotr-menu-inner');
        menu.classList.remove('hidden');
        inner.style.animation = 'none';
        void inner.offsetWidth;
        inner.style.animation = '';

        spawnEmbers('lotr-menu-embers', 22);

        document.getElementById('lotr-target').textContent = TARGET_SCORE.toLocaleString('fr-FR');
        if (typeof db !== 'undefined') {
            db.ref('game/lotrBestScore').once('value', snap => {
                const best = snap.val() || 0;
                document.getElementById('lotr-best').textContent =
                    best > 0 ? best.toLocaleString('fr-FR') : '—';
            });
        }
    }

    function showGame() {
        document.getElementById('lotr-menu').classList.add('hidden');
        document.getElementById('lotr-gameover').classList.add('hidden');
        document.getElementById('lotr-game').classList.remove('hidden');
        requestAnimationFrame(() => startGame());
    }

    // ── Splash → Menu ───────────────────────────────────────
    function leaveSplash() {
        const splash = document.getElementById('lotr-splash');
        splash.style.transition = 'opacity 0.9s ease';
        splash.style.opacity    = '0';
        setTimeout(() => {
            splash.classList.add('hidden');
            splash.style.opacity    = '';
            splash.style.transition = '';
            showMenu();
        }, 900);
    }

    // ── Game Over ───────────────────────────────────────────
    function showGameOver(score) {
        stopGame();
        document.getElementById('lotr-game').classList.add('hidden');
        const over  = document.getElementById('lotr-gameover');
        const inner = document.getElementById('lotr-go-inner');
        over.classList.remove('hidden');
        inner.style.animation = 'none';
        void inner.offsetWidth;
        inner.style.animation = '';

        spawnEmbers('lotr-go-embers', 18);
        document.getElementById('lotr-res-score').textContent = score || 0;

        setTimeout(() => {
            document.getElementById('lotr-res-best-row').classList.remove('hidden');
            if (typeof db !== 'undefined') {
                db.ref('game/lotrBestScore').once('value', snap => {
                    const prev = snap.val() || 0;
                    const best = Math.max(prev, score || 0);
                    if ((score || 0) > prev) db.ref('game/lotrBestScore').set(score);
                    document.getElementById('lotr-best-val').textContent = best.toLocaleString('fr-FR');
                });
            }
        }, 600);

        setTimeout(() => {
            if ((score || 0) >= TARGET_SCORE) {
                document.getElementById('lotr-res-challenge-row').classList.remove('hidden');
                const validated = getValidated();
                if (!validated.includes(LOTR_INDEX)) {
                    validated.push(LOTR_INDEX);
                    saveValidated(validated);
                }
            }
        }, 1200);

        setTimeout(() => {
            document.getElementById('lotr-go-btns').classList.remove('hidden');
        }, 1800);
    }

    // ── Open ────────────────────────────────────────────────
    function open() {
        const splash = document.getElementById('lotr-splash');
        splash.classList.remove('hidden');
        spawnEmbers('lotr-embers', 42);
        splash.addEventListener('click', leaveSplash, { once: true });
    }

    // ── Listeners boutons ───────────────────────────────────
    document.getElementById('lotr-spell1-btn').addEventListener('pointerdown', e => {
        e.preventDefault();
        if (castSpell(SPELLS.s1)) spawnWave(canvas.height);
    });
    document.getElementById('lotr-spell2-btn').addEventListener('pointerdown', e => {
        e.preventDefault();
        castSpell(SPELLS.s2);
    });

    document.getElementById('lotr-play-btn').addEventListener('click', showGame);

    document.getElementById('lotr-quit-btn').addEventListener('click', () => {
        stopGame();
        location.href = 'index.html';
    });

    const pauseOverlay = document.getElementById('lotr-pause');

    document.getElementById('lotr-pause-btn').addEventListener('click', () => {
        if (!gameRunning) return;
        gameRunning = false;
        cancelAnimationFrame(animId);
        pauseOverlay.classList.remove('hidden');
    });

    document.getElementById('lotr-resume-btn').addEventListener('click', () => {
        pauseOverlay.classList.add('hidden');
        lastTime    = 0;
        gameRunning = true;
        animId      = requestAnimationFrame(gameLoop);
    });

    document.getElementById('lotr-ingame-quit').addEventListener('click', () => {
        pauseOverlay.classList.add('hidden');
        stopGame();
        showMenu();
    });

    document.getElementById('lotr-retry-btn').addEventListener('click', showGame);

    document.getElementById('lotr-menu-back-btn').addEventListener('click', showMenu);

    // ── Stats ───────────────────────────────────────────────
    function updateStatsPanel() {
        const hpEl   = document.getElementById('lotr-stat-hp');
        const manaEl = document.getElementById('lotr-stat-mana');
        if (hpEl)   hpEl.textContent   = `${Math.ceil(hp)} / ${maxHp}`;
        if (manaEl) manaEl.textContent = `${Math.ceil(mana)} / ${maxMana}`;
    }

    document.getElementById('lotr-stats-btn').addEventListener('click', () => {
        const panel = document.getElementById('lotr-stats-panel');
        updateStatsPanel();
        panel.classList.toggle('hidden');
    });

    document.getElementById('lotr-stats-close').addEventListener('click', () => {
        document.getElementById('lotr-stats-panel').classList.add('hidden');
    });

    return { open, showMenu, showGame, showGameOver, addOrb };
})();
