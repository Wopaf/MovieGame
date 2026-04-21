// ============================================================
//  LE SEIGNEUR DES ANNEAUX 1978 — Mini Jeu
// ============================================================

const LOTR_INDEX   = 40;
const TARGET_SCORE = 5000;

const LOTR_GAME = (() => {

    // ── Images personnage ───────────────────────────────────
    const imgBgs   = Array.from({length: 5}, (_, i) => { const img = new Image(); img.src = `medias/lotr-brackground-${i+1}.png`; return img; });
    const imgIdle  = new Image(); imgIdle.src  = 'medias/gandalf-idle.png';
    const imgWalk1 = new Image(); imgWalk1.src = 'medias/gandalf-walk1.png';
    const imgWalk2 = new Image(); imgWalk2.src = 'medias/gandalf-walk2.png';

    // ── Images ennemis ──────────────────────────────────────
    const imgMob1    = new Image(); imgMob1.src    = 'medias/mob-11.png';
    const imgMob2    = new Image(); imgMob2.src    = 'medias/mob-12.png';
    const imgTroll1  = new Image(); imgTroll1.src  = 'medias/troll-1.png';
    const imgTroll2  = new Image(); imgTroll2.src  = 'medias/troll-2.png';
    const imgShield  = new Image(); imgShield.src  = 'medias/bouclier.png';
    const imgMobDead   = new Image(); imgMobDead.src   = 'medias/mob-mort.png';
    const imgTrollDead = new Image(); imgTrollDead.src = 'medias/troll-mort.png';
    const imgBoss      = new Image(); imgBoss.src      = 'medias/nazgul.png';

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

    const BOSS_MAX_HP          = 250;
    const BOSS_SPEED           = 42;
    const BOSS_H_RATIO         = 0.12;
    const BOSS_DAMAGE          = 10;
    const BOSS_SPAWN_MS        = 90000;
    const BOSS_ORB_COUNT       = 3;
    const BOSS_ORB_ORBIT_RATIO = 0.14;
    const BOSS_ORB_RADIUS      = 10;
    const BOSS_ORB_DAMAGE      = 10;
    const BOSS_ORB_HIT_CD      = 800;
    const BOSS_ORB_SPEED       = 1.5;
    const BOSS_LASER_CHARGE_MS = 1200;
    const BOSS_LASER_FIRE_MS   = 2500;
    const BOSS_LASER_INTERVAL  = 5000;
    const BOSS_LASER_HALF_W    = 18;

    let mobs        = [];
    let spawnTimer  = 0;
    let trollTimer  = 0;
    let boss            = null;
    let bossSpawnTimer  = 0;
    let bossHasSpawned  = false;
    let upgradesFrozen  = false;
    let glyphs          = [];  // [{ x, y, age }]
    let activeBlessingKey = null;
    let esteHealUntil     = 0;
    let vardaUntil        = 0;
    let currentLevel      = 1;
    let mobHpMult         = 1;
    let bossStatMult      = 1;
    let waveExtraRays     = 0;
    let doubleNextUpgrade = false;
    let bossKillHeal      = 0;
    let shieldCharges     = 0;
    let waveRays              = [];  // [{ x, y, vx, vy, born, hitMobs }]
    let chosenSpecialUpgrades = [];  // labels des atouts spéciaux choisis
    let statsPaused           = false;

    // ── Orbes ────────────────────────────────────────────────
    const ORB_ORBIT_RATIO = 0.10;  // rayon orbite = H * ratio
    const ORB_RADIUS      = 6;     // rayon visuel de l'orbe (px)
    let   orbSpeed        = 2.5;   // rad/s (upgradable)
    let   orbDamage       = 8;     // dégâts par contact (upgradable)
    const ORB_HIT_CD      = 300;   // ms entre deux hits sur le même mob

    let orbCount = 2;
    let orbAngle = 0;

    // ── Vague (sort classique) ───────────────────────────────
    const WAVE_DURATION         = 250;   // ms d'expansion
    let   waveDamage            = 6;  // (upgradable)
    const WAVE_MAX_RADIUS_RATIO = 0.32;  // rayon max = H * ratio
    const WAVE_KNOCKBACK        = 280;   // px/s initial

    let waves = [];  // [{ startTime, maxR, hitMobs: Set }]

    const WAVE_RAY_SPEED    = 420;
    const WAVE_RAY_LIFETIME = 1100;
    const WAVE_RAY_RADIUS   = 7;

    function spawnWaveRays() {
        const now = performance.now();
        for (let i = 0; i < waveExtraRays; i++) {
            const a = (Math.PI * 2 * i / waveExtraRays);
            waveRays.push({ x: charX, y: charY, vx: Math.cos(a) * WAVE_RAY_SPEED, vy: Math.sin(a) * WAVE_RAY_SPEED, born: now, hitMobs: new Set() });
        }
    }

    function spawnWave(H) {
        waves.push({ startTime: performance.now(), maxR: H * WAVE_MAX_RADIUS_RATIO, hitMobs: new Set() });
        if (waveHeal > 0) { hp = Math.min(maxHp, hp + waveHeal); updateHUD(); }
        if (waveExtraRays > 0) spawnWaveRays();
    }

    function updateWaveRays(dt) {
        const now = performance.now();
        for (const r of waveRays) {
            r.x += r.vx * dt / 1000;
            r.y += r.vy * dt / 1000;
            for (const mob of mobs) {
                if (r.hitMobs.has(mob)) continue;
                if (Math.sqrt((r.x - mob.x) ** 2 + (r.y - mob.y) ** 2) < WAVE_RAY_RADIUS + 20) {
                    r.hitMobs.add(mob);
                    const dmg = Math.round(waveDamage * getDamageMult());
                    mob.hp -= dmg; mob.flashUntil = now + 200;
                    spawnDmgNumber(mob.x, mob.y - 10, dmg);
                    spawnImpact(mob.x, mob.y);
                }
            }
            if (boss && !r.hitMobs.has(boss)) {
                if (Math.sqrt((r.x - boss.x) ** 2 + (r.y - boss.y) ** 2) < WAVE_RAY_RADIUS + 30) {
                    r.hitMobs.add(boss);
                    const dmg = Math.round(waveDamage * getDamageMult());
                    boss.hp -= dmg; boss.flashUntil = now + 200;
                    spawnDmgNumber(boss.x, boss.y - 10, dmg);
                    spawnImpact(boss.x, boss.y);
                }
            }
        }
        waveRays = waveRays.filter(r => now - r.born < WAVE_RAY_LIFETIME);
    }

    function drawWaveRays() {
        const now = performance.now();
        for (const r of waveRays) {
            const t = (now - r.born) / WAVE_RAY_LIFETIME;
            ctx.save();
            ctx.globalAlpha = 1 - t;
            ctx.beginPath();
            ctx.arc(r.x, r.y, WAVE_RAY_RADIUS, 0, Math.PI * 2);
            ctx.fillStyle = '#88ddff';
            ctx.shadowColor = '#88ddff';
            ctx.shadowBlur = 14;
            ctx.fill();
            ctx.restore();
        }
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
                    const _wd = Math.round(waveDamage * getDamageMult());
                    mob.hp -= _wd;
                    mob.flashUntil = now + 200;
                    mob.vx += (dx / dist) * WAVE_KNOCKBACK;
                    mob.vy += (dy / dist) * WAVE_KNOCKBACK;
                    spawnDmgNumber(mob.x, mob.y - 10, _wd);
                    spawnImpact(mob.x, mob.y);
                }
            }
            if (boss && !w.hitMobs.has(boss)) {
                const dx   = boss.x - charX;
                const dy   = boss.y - charY;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                if (dist <= r) {
                    w.hitMobs.add(boss);
                    const _bwd = Math.round(waveDamage * getDamageMult());
                    boss.hp        -= _bwd;
                    boss.flashUntil = now + 200;
                    spawnDmgNumber(boss.x, boss.y - 10, _bwd);
                    spawnImpact(boss.x, boss.y);
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
    let   laserDamage    = 4;     // (upgradable)
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

        if (boss) {
            const dx = boss.x - charX;
            const dy = boss.y - charY;
            const d  = Math.sqrt(dx * dx + dy * dy);
            if (d < range && d < nearDist) { nearDist = d; nearest = boss; }
        }

        if (!nearest) return;

        laserCoolUntil = now + laserCooldown;
        laserShowUntil = now + LASER_DURATION;
        laserEndX      = nearest.x;
        laserEndY      = nearest.y;
        const _ld = Math.round(laserDamage * getDamageMult());
        nearest.hp    -= _ld;
        spawnDmgNumber(nearest.x, nearest.y - 10, _ld);
        spawnImpact(nearest.x, nearest.y);
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
    let dmgNumbers = [];

    function spawnDmgNumber(x, y, value, color = '#f5d060') {
        dmgNumbers.push({ x, y: y - 10, value, color, age: 0, maxAge: 700 });
    }

    // ── Cercles d'impact ─────────────────────────────────────
    let impactRings = [];  // [{ x, y, age, maxAge, maxR, color }]

    function spawnImpact(x, y) {
        impactRings.push({ x, y, age: 0, maxAge: 160, maxR: 22 });
    }

    function updateImpactRings(dt) {
        for (const r of impactRings) r.age += dt;
        impactRings = impactRings.filter(r => r.age < r.maxAge);
    }

    function drawImpactRings() {
        for (const r of impactRings) {
            const t     = r.age / r.maxAge;          // 0 → 1
            const radius = r.maxR * t;
            const alpha  = (1 - t) * 0.9;
            ctx.save();
            ctx.globalAlpha  = alpha;
            ctx.strokeStyle  = '#ffffff';
            ctx.lineWidth    = 2.5 * (1 - t * 0.6);
            ctx.beginPath();
            ctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        }
    }

    // ── Potions ──────────────────────────────────────────────
    const POTION_HEAL   = 5;
    const POTION_RADIUS = 14;
    const POTION_IMG    = (() => { const i = new Image(); i.src = 'medias/sante.png'; return i; })();
    let potions = [];  // [{ x, y }]

    function spawnPotion(x, y) {
        potions.push({ x, y });
    }

    function updatePotions() {
        potions = potions.filter(p => {
            const dx = charX - p.x, dy = charY - p.y;
            if (Math.sqrt(dx * dx + dy * dy) < POTION_RADIUS + 20) {
                hp = Math.min(maxHp, hp + POTION_HEAL);
                updateHUD();
                return false;
            }
            return true;
        });
    }

    function drawPotions() {
        const size = POTION_RADIUS * 2;
        for (const p of potions) {
            if (POTION_IMG.complete && POTION_IMG.naturalWidth) {
                ctx.drawImage(POTION_IMG, p.x - size / 2, p.y - size / 2, size, size);
            } else {
                ctx.save();
                ctx.fillStyle = '#ff4466';
                ctx.shadowColor = '#ff4466';
                ctx.shadowBlur = 10;
                ctx.beginPath();
                ctx.arc(p.x, p.y, POTION_RADIUS, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }
    }

    // ── Cadavres ─────────────────────────────────────────────
    // Apparaissent à la mort d'un mob, visible 5s puis fondu 2s
    const CORPSE_STAY   = 5000;
    const CORPSE_FADE   = 2000;
    let corpses = [];  // [{ x, y, isTroll, age, w, h }]

    function spawnCorpse(mob, H) {
        const mobH = H * mob.hRatio;
        const ref  = mob.isTroll ? imgTrollDead : imgMobDead;
        const ar   = ref.naturalHeight ? ref.naturalWidth / ref.naturalHeight : 1;
        corpses.push({ x: mob.x, y: mob.y, isTroll: mob.isTroll, age: 0, w: mobH * ar, h: mobH });
    }

    function updateCorpses(dt) {
        for (const c of corpses) c.age += dt;
        corpses = corpses.filter(c => c.age < CORPSE_STAY + CORPSE_FADE);
    }

    function drawCorpses() {
        for (const c of corpses) {
            let alpha = 1;
            if (c.age > CORPSE_STAY) {
                alpha = 1 - (c.age - CORPSE_STAY) / CORPSE_FADE;
            }
            const img = c.isTroll ? imgTrollDead : imgMobDead;
            ctx.save();
            ctx.globalAlpha = Math.max(0, alpha);
            ctx.drawImage(img, c.x - c.w / 2, c.y - c.h / 2, c.w, c.h);
            ctx.restore();
        }
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

    function spawnAtEdge(W, H) {
        const side = Math.floor(Math.random() * 4);
        if (side === 0) return { x: Math.random() * W, y: -MOB_SPAWN_MARGIN };
        if (side === 1) return { x: W + MOB_SPAWN_MARGIN, y: Math.random() * H };
        if (side === 2) return { x: Math.random() * W, y: H + MOB_SPAWN_MARGIN };
        return { x: -MOB_SPAWN_MARGIN, y: Math.random() * H };
    }

    function spawnMob(W, H) {
        const { x, y } = spawnAtEdge(W, H);
        const hp = Math.round(MOB_MAX_HP * mobHpMult);
        mobs.push({ x, y, vx: 0, vy: 0, animTimer: 0, frame: 0, flashUntil: 0, orbHitUntil: 0,
            hp, displayHp: hp, maxHp: hp,
            speed: MOB_SPEED, hRatio: MOB_H_RATIO, isTroll: false });
    }

    function spawnTroll(W, H) {
        const { x, y } = spawnAtEdge(W, H);
        const hp = Math.round(TROLL_MAX_HP * mobHpMult);
        mobs.push({ x, y, vx: 0, vy: 0, animTimer: 0, frame: 0, flashUntil: 0, orbHitUntil: 0,
            hp, displayHp: hp, maxHp: hp,
            speed: TROLL_SPEED, hRatio: TROLL_H_RATIO, isTroll: true });
    }

    // ── Boss ─────────────────────────────────────────────────
    function spawnBoss(W, H) {
        const { x, y } = spawnAtEdge(W, H);
        bossHasSpawned = true;
        const _bossHp    = Math.round(BOSS_MAX_HP * bossStatMult);
        const _orbCount  = currentLevel >= 4 ? 5 : 3;
        const _laserCount = currentLevel >= 5 ? 3 : 1;
        boss = {
            x, y,
            hp: _bossHp, displayHp: _bossHp, maxHp: _bossHp,
            statMult: bossStatMult,
            flashUntil: 0,
            orbAngle: 0,
            orbCount: _orbCount,
            orbHitCds: new Array(_orbCount).fill(0),
            laserCount: _laserCount,
            hitByPlayerOrbUntil: 0,
            state: 'chase',
            stateTimer: 0,
            nextLaserTimer: BOSS_LASER_INTERVAL / bossStatMult,
            laserAngle: 0,
            laserAngles: [0],
            laserHitDone: false,
        };
    }

    function isPlayerInBossLaser() {
        if (!boss) return false;
        return boss.laserAngles.some(a => {
            const dx = Math.cos(a), dy = Math.sin(a);
            const px = charX - boss.x, py = charY - boss.y;
            if (px * dx + py * dy < 0) return false;
            return Math.abs(px * dy - py * dx) < BOSS_LASER_HALF_W;
        });
    }

    function updateBoss(dt, H) {
        if (!boss) return;
        const now = performance.now();

        boss.displayHp += (boss.hp - boss.displayHp) * Math.min(1, dt * 0.012);
        boss.stateTimer += dt;

        const bossH = H * BOSS_H_RATIO;
        const ar    = imgBoss.naturalHeight ? imgBoss.naturalWidth / imgBoss.naturalHeight : 1;
        const bossW = bossH * ar;

        if (boss.state === 'chase') {
            const dx   = charX - boss.x;
            const dy   = charY - boss.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            boss.x += (dx / dist) * BOSS_SPEED * boss.statMult * dt / 1000;
            boss.y += (dy / dist) * BOSS_SPEED * boss.statMult * dt / 1000;

            boss.nextLaserTimer -= dt;
            if (boss.nextLaserTimer <= 0) {
                boss.state      = 'charge';
                boss.stateTimer = 0;
                boss.laserAngle = Math.atan2(charY - boss.y, charX - boss.x);
            }

            if (Math.abs(charX - boss.x) < bossW * 0.4 && Math.abs(charY - boss.y) < bossH * 0.4 && now >= iframesUntil) {
                iframesUntil = now + iframesDuration;
                if (shieldCharges > 0) { shieldCharges--; spawnDmgNumber(charX, charY - bossH * 0.5, '🛡', '#88ccff'); }
                else { hp = Math.max(0, hp - Math.max(1, Math.round(BOSS_DAMAGE * (1 - damageReduction / 100)))); spawnDmgNumber(charX, charY - bossH * 0.5, BOSS_DAMAGE, '#ff4444'); spawnImpact(charX, charY); updateHUD(); if (hp <= 0) showGameOver(0); }
            }
        } else if (boss.state === 'charge') {
            boss.laserAngle = Math.atan2(charY - boss.y, charX - boss.x);
            if (boss.stateTimer >= BOSS_LASER_CHARGE_MS) {
                boss.state        = 'fire';
                boss.stateTimer   = 0;
                boss.laserHitDone = false;
                const spread = 0.3;
                boss.laserAngles = Array.from({ length: boss.laserCount }, (_, i) =>
                    boss.laserAngle + (i - Math.floor(boss.laserCount / 2)) * spread
                );
            }
        } else if (boss.state === 'fire') {
            if (!boss.laserHitDone && boss.stateTimer >= 500) {
                boss.laserHitDone = true;
                if (isPlayerInBossLaser() && now >= iframesUntil) {
                    iframesUntil = now + iframesDuration;
                    if (shieldCharges > 0) { shieldCharges--; spawnDmgNumber(charX, charY - 30, '🛡', '#88ccff'); }
                    else { hp = Math.max(0, hp - Math.max(1, Math.round(BOSS_DAMAGE * (1 - damageReduction / 100)))); spawnDmgNumber(charX, charY - 30, BOSS_DAMAGE, '#ff8800'); spawnImpact(charX, charY); updateHUD(); if (hp <= 0) showGameOver(0); }
                }
            }
            if (boss.stateTimer >= BOSS_LASER_FIRE_MS * boss.statMult) {
                boss.state      = 'cooldown';
                boss.stateTimer = 0;
            }
        } else if (boss.state === 'cooldown') {
            if (boss.stateTimer >= 600) {
                boss.state          = 'chase';
                boss.stateTimer     = 0;
                boss.nextLaserTimer = BOSS_LASER_INTERVAL / boss.statMult;
            }
        }

        boss.orbAngle += BOSS_ORB_SPEED * boss.statMult * dt / 1000;
        const orbitR = H * BOSS_ORB_ORBIT_RATIO * boss.statMult;

        for (let i = 0; i < boss.orbCount; i++) {
            if (now < boss.orbHitCds[i]) continue;
            const a  = boss.orbAngle + (Math.PI * 2 * i / boss.orbCount);
            const ox = boss.x + Math.cos(a) * orbitR;
            const oy = boss.y + Math.sin(a) * orbitR;
            const dx = ox - charX;
            const dy = oy - charY;
            if (Math.sqrt(dx * dx + dy * dy) < orbitR * 0.25 + BOSS_ORB_RADIUS && now >= iframesUntil) {
                boss.orbHitCds[i] = now + BOSS_ORB_HIT_CD;
                iframesUntil = now + iframesDuration;
                if (shieldCharges > 0) { shieldCharges--; spawnDmgNumber(charX, charY - 20, '🛡', '#88ccff'); }
                else { hp = Math.max(0, hp - Math.max(1, Math.round(BOSS_ORB_DAMAGE * (1 - damageReduction / 100)))); spawnDmgNumber(charX, charY - 20, BOSS_ORB_DAMAGE, '#ff8800'); spawnImpact(ox, oy); updateHUD(); if (hp <= 0) showGameOver(0); }
            }
        }

        const playerOrbitR = H * ORB_ORBIT_RATIO;
        for (let i = 0; i < orbCount; i++) {
            if (now < boss.hitByPlayerOrbUntil) break;
            const a  = orbAngle + (Math.PI * 2 * i / orbCount);
            const ox = charX + Math.cos(a) * playerOrbitR;
            const oy = charY + Math.sin(a) * playerOrbitR;
            const dx = ox - boss.x;
            const dy = oy - boss.y;
            if (Math.sqrt(dx * dx + dy * dy) < playerOrbitR * 0.35 + ORB_RADIUS) {
                boss.hitByPlayerOrbUntil = now + ORB_HIT_CD;
                const _bod = Math.round(orbDamage * getDamageMult());
                boss.hp        -= _bod;
                boss.flashUntil = now + 200 + orbStunBonus;
                spawnDmgNumber(ox, oy, _bod);
                spawnImpact(ox, oy);
                break;
            }
        }

        if (boss.hp <= 0) {
            if (bossKillHeal > 0) { hp = Math.min(maxHp, hp + bossKillHeal); updateHUD(); }
            glyphs.push({ x: boss.x, y: boss.y, age: 0 });
            upgradesFrozen = true;
            boss = null;
        }
    }

    function drawBoss(H) {
        if (!boss) return;
        const now   = performance.now();
        const bossH = H * BOSS_H_RATIO;
        const ar    = imgBoss.naturalHeight ? imgBoss.naturalWidth / imgBoss.naturalHeight : 1;
        const bossW = bossH * ar;

        if (boss.state === 'charge' || boss.state === 'fire') {
            const len    = 2500;
            const angles = boss.state === 'fire' ? boss.laserAngles : [boss.laserAngle];
            ctx.save();
            ctx.lineCap = 'round';
            for (const a of angles) {
                const ex = boss.x + Math.cos(a) * len;
                const ey = boss.y + Math.sin(a) * len;
                if (boss.state === 'fire') {
                    const t     = boss.stateTimer / BOSS_LASER_FIRE_MS;
                    const alpha = Math.max(0, 1 - t);
                    ctx.globalAlpha = alpha * 0.35;
                    ctx.strokeStyle = '#cc0000';
                    ctx.lineWidth   = BOSS_LASER_HALF_W * 4;
                    ctx.shadowColor = '#cc0000';
                    ctx.shadowBlur  = 30;
                    ctx.beginPath(); ctx.moveTo(boss.x, boss.y); ctx.lineTo(ex, ey); ctx.stroke();
                    ctx.globalAlpha = alpha;
                    ctx.strokeStyle = '#ee0000';
                    ctx.lineWidth   = BOSS_LASER_HALF_W * 2;
                    ctx.shadowBlur  = 12;
                    ctx.beginPath(); ctx.moveTo(boss.x, boss.y); ctx.lineTo(ex, ey); ctx.stroke();
                    ctx.strokeStyle = '#ffaaaa';
                    ctx.lineWidth   = 3;
                    ctx.shadowBlur  = 4;
                    ctx.beginPath(); ctx.moveTo(boss.x, boss.y); ctx.lineTo(ex, ey); ctx.stroke();
                } else {
                    const t = boss.stateTimer / BOSS_LASER_CHARGE_MS;
                    ctx.globalAlpha    = t * 0.75;
                    ctx.strokeStyle    = '#cc0000';
                    ctx.lineWidth      = 2 + t * 8;
                    ctx.setLineDash([16, 10]);
                    ctx.lineDashOffset = -(now * 0.04 % 26);
                    ctx.shadowColor    = '#cc0000';
                    ctx.shadowBlur     = 10;
                    ctx.beginPath(); ctx.moveTo(boss.x, boss.y); ctx.lineTo(ex, ey); ctx.stroke();
                    ctx.setLineDash([]);
                }
            }
            ctx.restore();
        }

        const inFlash   = now < boss.flashUntil;
        const blinkShow = !inFlash || Math.floor(now / 40) % 2 === 0;

        if (blinkShow) {
            ctx.save();
            ctx.globalAlpha = 0.3;
            ctx.fillStyle   = '#000';
            ctx.beginPath();
            ctx.ellipse(boss.x, boss.y + bossH * 0.42, bossW * 0.42, bossH * 0.08, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            ctx.save();
            if (inFlash) ctx.globalAlpha = 0.55;
            ctx.drawImage(imgBoss, boss.x - bossW / 2, boss.y - bossH / 2, bossW, bossH);
            ctx.restore();

            const barW  = Math.max(bossW * 1.1, 80);
            const barH  = 10;
            const barX  = boss.x - barW / 2;
            const barY  = boss.y - bossH / 2 - 14;
            const ratio = Math.max(0, boss.displayHp / boss.maxHp);
            ctx.fillStyle = 'rgba(0,0,0,0.55)';
            ctx.fillRect(barX - 1, barY - 1, barW + 2, barH + 2);
            ctx.fillStyle = '#330000';
            ctx.fillRect(barX, barY, barW, barH);
            ctx.fillStyle = '#ff6600';
            ctx.fillRect(barX, barY, barW * ratio, barH);
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 13px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(Math.ceil(boss.displayHp), boss.x, barY + barH / 2);
        }

        const orbitR = H * BOSS_ORB_ORBIT_RATIO * boss.statMult;
        for (let i = 0; i < boss.orbCount; i++) {
            const a  = boss.orbAngle + (Math.PI * 2 * i / boss.orbCount);
            const ox = boss.x + Math.cos(a) * orbitR;
            const oy = boss.y + Math.sin(a) * orbitR;

            const glow = ctx.createRadialGradient(ox, oy, 0, ox, oy, BOSS_ORB_RADIUS * 3);
            glow.addColorStop(0, 'rgba(255,100,0,0.5)');
            glow.addColorStop(1, 'rgba(255,100,0,0)');
            ctx.beginPath();
            ctx.arc(ox, oy, BOSS_ORB_RADIUS * 3, 0, Math.PI * 2);
            ctx.fillStyle = glow;
            ctx.fill();

            const grad = ctx.createRadialGradient(ox - BOSS_ORB_RADIUS * 0.3, oy - BOSS_ORB_RADIUS * 0.3, 1, ox, oy, BOSS_ORB_RADIUS);
            grad.addColorStop(0,   '#ffffff');
            grad.addColorStop(0.4, '#ffaa44');
            grad.addColorStop(1,   '#cc3300');
            ctx.beginPath();
            ctx.arc(ox, oy, BOSS_ORB_RADIUS, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();
        }
    }

    function updateGlyphs(dt) {
        for (const g of glyphs) g.age += dt;
    }

    function drawGlyphs() {
        const now = performance.now();
        for (const g of glyphs) {
            const pulse = 0.75 + 0.25 * Math.sin(now * 0.003);
            ctx.save();

            // Halo externe large
            const glow = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, 70);
            glow.addColorStop(0,   `rgba(220,160,255,${0.7 * pulse})`);
            glow.addColorStop(0.35,`rgba(160,60,255,${0.45 * pulse})`);
            glow.addColorStop(1,    'rgba(80,0,180,0)');
            ctx.beginPath();
            ctx.arc(g.x, g.y, 70, 0, Math.PI * 2);
            ctx.fillStyle = glow;
            ctx.fill();

            // Cercles concentriques lumineux
            ctx.shadowColor = '#ee99ff';
            ctx.shadowBlur  = 18 * pulse;
            for (const r of [14, 26, 40]) {
                ctx.globalAlpha = 0.9 * pulse;
                ctx.strokeStyle = r === 26 ? '#f5d060' : '#bb55ff';
                ctx.lineWidth   = r === 26 ? 2.5 : 1.5;
                ctx.beginPath();
                ctx.arc(g.x, g.y, r, 0, Math.PI * 2);
                ctx.stroke();
            }

            // Branches de rune tournantes (6 traits)
            ctx.shadowColor = '#f5d060';
            ctx.shadowBlur  = 10 * pulse;
            ctx.globalAlpha = 0.95 * pulse;
            ctx.strokeStyle = '#f5d060';
            ctx.lineWidth   = 1.5;
            const rot = now * 0.0004;
            for (let i = 0; i < 6; i++) {
                const a  = rot + (Math.PI * 2 * i / 6);
                ctx.beginPath();
                ctx.moveTo(g.x + Math.cos(a) * 9,  g.y + Math.sin(a) * 9);
                ctx.lineTo(g.x + Math.cos(a) * 38, g.y + Math.sin(a) * 38);
                ctx.stroke();
            }

            // Centre très lumineux
            ctx.shadowColor = '#ffffff';
            ctx.shadowBlur  = 20 * pulse;
            ctx.globalAlpha = 1;
            const center = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, 10);
            center.addColorStop(0,   '#ffffff');
            center.addColorStop(0.3, '#ee99ff');
            center.addColorStop(1,   'rgba(180,60,255,0)');
            ctx.beginPath();
            ctx.arc(g.x, g.y, 10, 0, Math.PI * 2);
            ctx.fillStyle = center;
            ctx.fill();

            ctx.restore();
        }
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
                    const _od = Math.round(orbDamage * getDamageMult());
                    mob.hp         -= _od;
                    mob.flashUntil  = now + 200 + orbStunBonus;
                    spawnDmgNumber(ox, oy, _od);
                    spawnImpact(ox, oy);
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

    // ── Bénédictions des Valar ───────────────────────────────
    const VALAR_BLESSINGS = [
        {
            key: 'este',   name: 'Estë',   img: 'medias/rose.png',   color: '#ff88aa',
            desc: 'Restaure tout<br>votre mana',
            apply: () => { mana = maxMana; updateHUD(); }
        },
        {
            key: 'varda',  name: 'Varda',  img: 'medias/violet.png', color: '#bb55ff',
            desc: 'Dégâts +20%<br>pendant 10 secondes',
            apply: () => { vardaUntil = performance.now() + 10000; }
        },
        {
            key: 'ulmo',   name: 'Ulmo',   img: 'medias/bleu.png',   color: '#2288ff',
            desc: 'Tous les ennemis<br>reçoivent −20 PV',
            apply: () => {
                const H = canvas.height;
                for (const m of mobs) {
                    m.hp -= 20;
                    spawnDmgNumber(m.x, m.y - 10, 20, '#2288ff');
                    spawnImpact(m.x, m.y);
                }
                mobs = mobs.filter(m => m.hp > 0);
            }
        },
        {
            key: 'tulkas', name: 'Tulkas', img: 'medias/rouge.png',  color: '#cc2222',
            desc: '5 ennemis meurent<br>instantanément',
            apply: () => {
                const H = canvas.height;
                let count = 0;
                for (const m of [...mobs]) {
                    if (count >= 5) break;
                    spawnCorpse(m, H);
                    spawnDmgNumber(m.x, m.y - 10, m.hp, '#cc2222');
                    spawnImpact(m.x, m.y);
                    m.hp = 0;
                    count++;
                }
                mobs = mobs.filter(m => m.hp > 0);
            }
        },
        {
            key: 'aule',    name: 'Aulë',    img: 'medias/gris.png',  color: '#aaaaaa',
            desc: 'Immunité totale<br>pendant 15 secondes',
            apply: () => { iframesUntil = performance.now() + 15000; }
        },
        {
            key: 'yavanna', name: 'Yavanna', img: 'medias/vert.png',  color: '#44cc66',
            desc: '+1 PV / seconde<br>pendant 10 secondes',
            apply: () => { esteHealUntil = performance.now() + 5000; }
        },
    ];

    const SPECIAL_UPGRADES = [
        { label: 'Prochain atout ×2', img: 'medias/eclair.png',   apply: () => { doubleNextUpgrade = true; } },
        { label: '+10 PV Max.',        img: 'medias/bouclier.png', apply: () => { maxHp += 10; hp = Math.min(hp + 10, maxHp); updateHUD(); } },
        { label: '+10 Mana Max.',      img: 'medias/mana.png',     apply: () => { maxMana += 10; mana = Math.min(mana + 10, maxMana); updateHUD(); } },
    ];

    function getDamageMult() { return performance.now() < vardaUntil ? 1.2 : 1; }

    function updateSpell2Icon(blessing) {
        const btn  = document.getElementById('lotr-spell2-btn');
        const icon = btn.querySelector('.lotr-spell-icon');
        const cost = btn.querySelector('.lotr-spell-cost');
        icon.innerHTML = `<img src="${blessing.img}" style="width:28px;height:28px;object-fit:contain;image-rendering:pixelated;" alt="">`;
        cost.textContent = '30s';
        btn.style.borderColor = blessing.color + 'aa';
    }

    function resetSpell2Icon() {
        const btn  = document.getElementById('lotr-spell2-btn');
        const icon = btn.querySelector('.lotr-spell-icon');
        const cost = btn.querySelector('.lotr-spell-cost');
        icon.innerHTML = '⚡';
        cost.textContent = '—';
        btn.style.borderColor = '';
    }

    function startLevelTransition(blessing) {
        const overlay = document.getElementById('lotr-level-transition');
        currentLevel  = Math.min(currentLevel + 1, 5);
        mobHpMult     = Math.pow(1.2, currentLevel - 1);
        bossStatMult  = Math.pow(1.25, currentLevel - 1);
        mobSpawnDelay = Math.max(600, mobSpawnDelay - 400);
        document.getElementById('lotr-level-num').textContent = `NIVEAU ${currentLevel}`;

        overlay.classList.remove('hidden');
        void overlay.offsetWidth;
        overlay.classList.add('visible');

        setTimeout(() => {
            overlay.classList.remove('visible');
            setTimeout(() => {
                overlay.classList.add('hidden');

                if (blessing) {
                    activeBlessingKey = blessing.key;
                    SPELLS.s2.lastUsed = -Infinity;
                    updateSpell2Icon(blessing);
                    document.getElementById('lotr-spell2-btn').classList.remove('lotr-spell-btn--empty');
                }

                mobs           = [];
                spawnTimer     = mobSpawnDelay;
                trollTimer     = 0;
                boss           = null;
                bossHasSpawned = false;
                bossSpawnTimer = 0;
                upgradeIdx     = 0;
                upgradesFrozen = false;
                glyphs         = [];
                waveRays       = [];
                potions        = [];
                charX          = canvas.width  / 2;
                charY          = canvas.height / 2;
                lastTime       = 0;
                gameRunning    = true;
                animId         = requestAnimationFrame(gameLoop);
            }, 550);
        }, 1400);
    }

    function showBlessingOverlay() {
        gameRunning = false;
        cancelAnimationFrame(animId);
        const isFirstBoss = (currentLevel === 1);
        const picks = isFirstBoss ? pickRandom(VALAR_BLESSINGS, 3) : SPECIAL_UPGRADES;
        const overlay = document.getElementById('lotr-blessing');
        overlay.classList.toggle('lotr-blessing-overlay--special', !isFirstBoss);
        document.querySelector('#lotr-blessing .lotr-blessing-title').textContent =
            isFirstBoss ? '✦ BÉNÉDICTIONS DES VALAR ✦' : '✦ ATOUTS SPÉCIAUX ✦';
        document.querySelector('#lotr-blessing .lotr-blessing-sub').textContent =
            isFirstBoss ? 'Choisissez une bénédiction' : 'Choisissez un atout';
        const container = document.getElementById('lotr-blessing-choices');
        container.innerHTML = '';
        picks.forEach((b, i) => {
            const card = document.createElement('button');
            card.className = 'lotr-blessing-choice';
            card.style.animationDelay = `${0.15 + i * 0.12}s`;
            if (isFirstBoss) {
                card.style.borderColor = b.color;
                card.innerHTML = `
                    <img src="${b.img}" class="lotr-blessing-img" alt="">
                    <div class="lotr-blessing-name" style="color:${b.color}">Bénédiction<br>de ${b.name}</div>
                    <div class="lotr-blessing-desc">${b.desc}</div>
                `;
                card.addEventListener('click', () => {
                    document.getElementById('lotr-blessing').classList.add('hidden');
                    startLevelTransition(b);
                }, { once: true });
            } else {
                card.innerHTML = `
                    <img src="${b.img}" class="lotr-blessing-img" alt="">
                    <div class="lotr-blessing-name">${b.label}</div>
                `;
                card.addEventListener('click', () => {
                    document.getElementById('lotr-blessing').classList.add('hidden');
                    const shouldDouble = doubleNextUpgrade;
                    if (shouldDouble) doubleNextUpgrade = false;
                    b.apply();
                    if (shouldDouble) b.apply();
                    chosenSpecialUpgrades.push(shouldDouble ? `${b.label} ×2` : b.label);
                    startLevelTransition(null);
                }, { once: true });
            }
            container.appendChild(card);
        });
        document.getElementById('lotr-blessing').classList.remove('hidden');
    }

    // ── Atouts ───────────────────────────────────────────────
    const UPGRADE_TIMES = [25000, 50000, 75000];  // ms dans le niveau
    let upgradeIdx = 0;

    const UPGRADE_POOLS = {
        magic: [
            { label: 'Dégâts du rayon +2',           apply: () => { laserDamage += 2; } },
            { label: 'Dégâts des orbes +3',           apply: () => { orbDamage += 4; } },
            { label: 'Nombre d\'orbes +1',            apply: () => { orbCount++; } },
            { label: 'Dégâts de l\'impulsion +2',      apply: () => { waveDamage += 3; } },
            { label: 'Mana max. +10',                 apply: () => { maxMana += 10; mana = Math.min(mana + 10, maxMana); updateHUD(); } },
            { label: 'Régénération mana +1 / sec',    apply: () => { manaRegen += 1; } },
        ],
        defense: [
            { label: 'Résistance +5%',                 apply: () => { damageReduction = Math.min(50, damageReduction + 5); } },
            { label: 'Durée d\'immunité +0.2s',       apply: () => { iframesDuration += 200; } },
            { label: 'Impulsion : récupère +1 PV',     apply: () => { waveHeal++; } },
            { label: 'Orbes : bloquent l\'ennemi +0.2s', apply: () => { orbStunBonus += 200; } },
            { label: 'PV max. +5',                    apply: () => { maxHp += 5; hp = Math.min(hp + 5, maxHp); updateHUD(); } },
        ],
        speed: [
            { label: 'Vitesse de déplacement +10%',    apply: () => { charSpeed += 16; } },
            { label: 'Vitesse des orbes +0.5 rad/s',  apply: () => { orbSpeed += 0.5; } },
            { label: 'Rechargement du rayon −0.1s',   apply: () => { laserCooldown = Math.max(100, laserCooldown - 100); } },
            { label: 'Rechargement de l\'impulsion −0.1s', apply: () => { SPELLS.s1.cooldown = Math.max(200, SPELLS.s1.cooldown - 100); } },
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
            btn.addEventListener('click', () => { const sd = doubleNextUpgrade; if (sd) doubleNextUpgrade = false; pick.apply(); if (sd) pick.apply(); resumeGame(); }, { once: true });
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
                iframesUntil = now + iframesDuration;
                mob.flashUntil = now + 180;
                if (shieldCharges > 0) { shieldCharges--; spawnDmgNumber(charX, charY - charH * 0.5, '🛡', '#88ccff'); }
                else { hp = Math.max(0, hp - Math.max(1, Math.round(MOB_DAMAGE * (1 - damageReduction / 100)))); spawnDmgNumber(charX, charY - charH * 0.5, MOB_DAMAGE, '#ff4444'); spawnImpact(charX, charY); updateHUD(); if (hp <= 0) showGameOver(0); }
            }
        }

        // Cadavres + potions + suppression des mobs sans PV
        for (const m of mobs) { if (m.hp <= 0) { spawnCorpse(m, H); if (m.isTroll) spawnPotion(m.x, m.y); } }
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
            const barH  = mob.isTroll ? 10 : 7;
            const barX  = mob.x - barW / 2;
            const barY  = mob.y - mobH / 2 - (mob.isTroll ? 11 : 8);
            const ratio = Math.max(0, mob.displayHp / mob.maxHp);

            ctx.fillStyle = 'rgba(0,0,0,0.55)';
            ctx.fillRect(barX - 1, barY - 1, barW + 2, barH + 2);
            ctx.fillStyle = '#330000';
            ctx.fillRect(barX, barY, barW, barH);
            ctx.fillStyle = '#cc2222';
            ctx.fillRect(barX, barY, barW * ratio, barH);
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 11px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(Math.ceil(mob.displayHp), mob.x, barY + barH / 2);
        }
    }

    // ── Sorts ────────────────────────────────────────────────
    const SPELLS = {
        s1: { cost: 10, cooldown: 1000, lastUsed: -Infinity },
        s2: { cost: 0, cooldown: 30000, lastUsed: -Infinity },
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
    function updateProgressBar() {
        const fill = document.getElementById('lotr-lp-fill');
        if (!fill) return;
        const pct = bossHasSpawned ? 100 : Math.min(100, bossSpawnTimer / BOSS_SPAWN_MS * 100);
        fill.style.width = pct + '%';
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
        const DEAD   = 0.04;                   // zone morte
        const SENS   = 6.0;                    // sensibilité
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
            const mag = raw < DEAD ? 0 : Math.min(1, (raw - DEAD) / (1 - DEAD) * SENS);
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

        // Timer atouts (gelé après la mort du boss)
        if (!upgradesFrozen && !bossHasSpawned && upgradeIdx < UPGRADE_TIMES.length
            && bossSpawnTimer >= UPGRADE_TIMES[upgradeIdx]) {
            upgradeIdx++;
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

        // Spawn ennemis normaux (stoppé dès que le boss a spawné)
        if (!bossHasSpawned) {
            spawnTimer += dt;
            if (spawnTimer >= mobSpawnDelay) {
                spawnTimer -= mobSpawnDelay;
                spawnMob(W, H);
            }

            trollTimer += dt;
            if (trollTimer >= TROLL_SPAWN_MS) {
                trollTimer -= TROLL_SPAWN_MS;
                spawnTroll(W, H);
            }

            bossSpawnTimer += dt;
            if (bossSpawnTimer >= BOSS_SPAWN_MS) {
                bossSpawnTimer = 0;
                spawnBoss(W, H);
            }
        }

        // Regen Yavanna (Estë)
        if (performance.now() < esteHealUntil) {
            hp = Math.min(maxHp, hp + dt / 1000);
            updateHUD();
        }

        // Entrée dans la glyphe
        for (let gi = glyphs.length - 1; gi >= 0; gi--) {
            const g = glyphs[gi];
            const dx = charX - g.x;
            const dy = charY - g.y;
            if (Math.sqrt(dx * dx + dy * dy) < 40) {
                glyphs.splice(gi, 1);
                showBlessingOverlay();
                return;
            }
        }

        // Mise à jour ennemis
        updateMobs(dt, charH);
        updateBoss(dt, H);

        // ── Rendu ──
        const _bg = imgBgs[Math.min(currentLevel - 1, 4)];
        if (_bg.complete && _bg.naturalWidth) {
            ctx.drawImage(_bg, 0, 0, W, H);
        } else {
            ctx.fillStyle = '#1a1208';
            ctx.fillRect(0, 0, W, H);
        }

        // Cadavres (sous les mobs vivants)
        updateCorpses(dt);
        drawCorpses();
        updatePotions();
        drawPotions();

        // Ennemis (dessinés avant le perso pour passer derrière)
        updateGlyphs(dt);
        drawGlyphs();
        drawMobs(H);
        drawBoss(H);

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
        updateWaveRays(dt);
        drawWaveRays();

        // ── Laser + Orbes + dégâts ──
        updateLaser(H);
        updateDmgNumbers(dt);
        updateImpactRings(dt);
        updateOrbs(dt, H);
        drawLaser();
        drawOrbs(H);
        drawImpactRings();
        drawDmgNumbers();

        updateSpellVisuals();
        updateProgressBar();
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
        boss              = null;
        bossSpawnTimer    = 0;
        bossHasSpawned    = false;
        upgradesFrozen    = false;
        glyphs            = [];
        activeBlessingKey = null;
        esteHealUntil     = 0;
        vardaUntil        = 0;
        currentLevel      = 1;
        mobHpMult         = 1;
        bossStatMult      = 1;
        mobSpawnDelay  = 2500;
        orbCount = 2;
        orbAngle = 0;
        dmgNumbers    = [];
        impactRings   = [];
        corpses       = [];
        potions       = [];
        laserShowUntil = 0;
        laserCoolUntil = 0;
        waves          = [];
        upgradeIdx     = 0;
        // Reset upgradable stats
        charSpeed = 160; iframesDuration = 500; damageReduction = 0;
        waveHeal = 0; orbStunBonus = 0; manaRegen = 2;
        orbDamage = 5; orbSpeed = 2.2; waveDamage = 5;
        waveExtraRays = 0; doubleNextUpgrade = false; bossKillHeal = 0; shieldCharges = 0; waveRays = [];
        chosenSpecialUpgrades = [];
        laserDamage = 2; laserCooldown = 500;
        SPELLS.s1.cooldown = 500; SPELLS.s2.cooldown = 30000;
        SPELLS.s1.lastUsed = -Infinity;
        SPELLS.s2.lastUsed = -Infinity;
        resetSpell2Icon();
        document.getElementById('lotr-spell2-btn').classList.add('lotr-spell-btn--empty');
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
        splash.classList.add('hidden');
        showMenu();
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
        let gone = false;
        const go = () => {
            if (gone) return;
            gone = true;
            leaveSplash();
        };
        splash.addEventListener('touchstart', go, { passive: true });
        splash.addEventListener('click', go);
    }

    // ── Listeners boutons ───────────────────────────────────
    document.getElementById('lotr-spell1-btn').addEventListener('pointerdown', e => {
        e.preventDefault();
        if (castSpell(SPELLS.s1)) spawnWave(canvas.height);
    });
    document.getElementById('lotr-spell2-btn').addEventListener('pointerdown', e => {
        e.preventDefault();
        if (!activeBlessingKey) return;
        if (performance.now() - SPELLS.s2.lastUsed < SPELLS.s2.cooldown) return;
        SPELLS.s2.lastUsed = performance.now();
        const b = VALAR_BLESSINGS.find(v => v.key === activeBlessingKey);
        if (b) b.apply();
    });

    document.addEventListener('keydown', e => {
        if (!gameRunning) return;
        if (e.key === 'e' || e.key === 'E') {
            if (castSpell(SPELLS.s1)) spawnWave(canvas.height);
        } else if (e.key === 'r' || e.key === 'R') {
            if (!activeBlessingKey) return;
            if (performance.now() - SPELLS.s2.lastUsed < SPELLS.s2.cooldown) return;
            SPELLS.s2.lastUsed = performance.now();
            const b = VALAR_BLESSINGS.find(v => v.key === activeBlessingKey);
            if (b) b.apply();
        }
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
    function row(label, val) {
        return `<div class="lotr-stat-row"><span class="lotr-stat-label">${label}</span><span class="lotr-stat-val">${val}</span></div>`;
    }
    function catHeader(icon, name) {
        return `<div class="lotr-stat-cat"><img src="${icon}" class="lotr-stat-cat-icon" alt="">${name}</div>`;
    }

    function updateStatsPanel() {
        const inner = document.querySelector('#lotr-stats-panel .lotr-stats-inner');
        const s1cd  = (SPELLS.s1.cooldown / 1000).toFixed(1);
        const s2cd  = (SPELLS.s2.cooldown / 1000).toFixed(0);
        const blessing = VALAR_BLESSINGS.find(v => v.key === activeBlessingKey);

        let html = `<div class="lotr-stats-title">⚔ STATISTIQUES</div>
        <div class="lotr-divider" style="margin:6px 0 10px"><span class="lotr-divider-gem">◆</span></div>`;

        // Magie
        html += catHeader('medias/magie.png', 'MAGIE');
        html += row('❤ PV', `${Math.ceil(hp)} / ${maxHp}`);
        html += row('✦ Mana', `${Math.ceil(mana)} / ${maxMana}`);
        html += row('↺ Regen mana', `+${manaRegen}/s`);
        html += row('🔥 Impulsion', `${SPELLS.s1.cost}✦ — ${s1cd}s — ${waveDamage} dégâts`);
        if (waveExtraRays > 0) html += row('⟳ Rayons extra', `+${waveExtraRays}`);
        html += row('⚡ Ultime', blessing ? `0✦ — ${s2cd}s` : '—');
        html += row('🔴 Dégâts orbe', `${orbDamage}`);
        html += row('⭕ Orbes', `${orbCount}`);

        // Vitesse
        html += catHeader('medias/eclair.png', 'VITESSE');
        html += row('💨 Déplacement', `${charSpeed}`);
        html += row('↻ Vitesse orbes', `${orbSpeed.toFixed(1)}`);
        html += row('⚡ CD rayon', `${(laserCooldown/1000).toFixed(2)}s (0.1s min.)`);

        // Défense
        html += catHeader('medias/bouclier.png', 'DÉFENSE');
        html += row('🛡 Résistance', `${damageReduction}% / 50%`);
        html += row('⏱ Immunité', `${(iframesDuration/1000).toFixed(1)}s`);
        if (shieldCharges > 0) html += row('🔵 Bouclier', `${shieldCharges} charges`);
        if (bossKillHeal > 0)  html += row('💚 Soin / Nazgul', `+${bossKillHeal} PV`);

        // Bénédiction active
        if (blessing) {
            html += `<div class="lotr-stats-divider"></div>`;
            html += `<div class="lotr-stat-cat" style="color:#ffcc44">✦ BÉNÉDICTION ACTIVE</div>`;
            html += row(`${blessing.name}`, blessing.desc.replace(/<br>/g, ' '));
        }

        // Atouts spéciaux
        if (chosenSpecialUpgrades.length > 0) {
            html += `<div class="lotr-stats-divider"></div>`;
            html += `<div class="lotr-stat-cat" style="color:#88ddff">✦ ATOUTS SPÉCIAUX</div>`;
            chosenSpecialUpgrades.forEach(u => { html += `<div class="lotr-stat-upgrade">${u}</div>`; });
        }

        html += `<button id="lotr-stats-close" class="lotr-stats-close">✕ Fermer</button>`;
        inner.innerHTML = html;
        document.getElementById('lotr-stats-close').addEventListener('click', closeStatsPanel);
    }

    function closeStatsPanel() {
        document.getElementById('lotr-stats-panel').classList.add('hidden');
        if (statsPaused) {
            statsPaused = false;
            gameRunning = true;
            lastTime = 0;
            animId = requestAnimationFrame(gameLoop);
        }
    }

    document.getElementById('lotr-stats-btn').addEventListener('click', () => {
        const panel = document.getElementById('lotr-stats-panel');
        if (!panel.classList.contains('hidden')) { closeStatsPanel(); return; }
        if (gameRunning) { gameRunning = false; cancelAnimationFrame(animId); statsPaused = true; }
        updateStatsPanel();
        panel.classList.remove('hidden');
    });

    return { open, showMenu, showGame, showGameOver, addOrb };
})();
