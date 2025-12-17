/**
 * SMASH KARTS 3D - Complete Game
 * Full implementation with multiple maps, weapons, AI, and professional UI
 */

// ═══════════════════════════════════════════════════════════
// MAP CONFIGURATIONS
// ═══════════════════════════════════════════════════════════

const MAP_CONFIGS = {
    smashIsland: {
        id: 'smashIsland',
        name: 'Smash Island',
        icon: '🏝️',
        description: 'Tropical beach paradise',
        colors: {
            sky: 0x87CEEB,
            water: 0x00CED1,
            sand: 0xF4D03F,
            grass: 0x7FFF00,
            track: 0xFF6B35
        },
        lighting: {
            ambient: 0xffffff,
            ambientIntensity: 0.4,
            sun: 0xFFF4E6,
            sunIntensity: 0.9,
            sunPosition: [50, 80, 30],
            hemisphere: [0x87CEEB, 0xF4D03F, 0.6]
        },
        props: ['palmTrees', 'rocks', 'umbrellas'],
        hazards: ['water'],
        size: 100
    },
    lavaPit: {
        id: 'lavaPit',
        name: 'Lava Pit',
        icon: '🌋',
        description: 'Dangerous volcanic arena',
        colors: {
            sky: 0x1a0a0a,
            lava: 0xFF4500,
            rock: 0x2C3E50,
            crystal: 0xFF6600,
            ash: 0x95A5A6
        },
        lighting: {
            ambient: 0xFF4500,
            ambientIntensity: 0.2,
            sun: 0xFF6600,
            sunIntensity: 0.5,
            sunPosition: [30, 60, 0],
            hemisphere: [0x1a0a0a, 0xFF4500, 0.4]
        },
        props: ['rocks', 'crystals', 'volcanicVents'],
        hazards: ['lava'],
        size: 90
    },
    skyDropzone: {
        id: 'skyDropzone',
        name: 'Sky Dropzone',
        icon: '🌌',
        description: 'Floating platforms in space',
        colors: {
            sky: 0x1A1A2E,
            platform: 0x7F8C8D,
            accent: 0x00D9FF,
            void: 0x0F3460
        },
        lighting: {
            ambient: 0x4A69BD,
            ambientIntensity: 0.3,
            sun: 0x00D9FF,
            sunIntensity: 0.6,
            sunPosition: [0, 100, 50],
            hemisphere: [0x1A1A2E, 0x4A69BD, 0.3]
        },
        props: ['barriers', 'holograms'],
        hazards: ['void'],
        size: 120
    },
    graveyard: {
        id: 'graveyard',
        name: 'The Graveyard',
        icon: '⚰️',
        description: 'Spooky haunted cemetery',
        colors: {
            sky: 0x1a1a2e,
            ground: 0x2C3E50,
            fog: 0x4A5568,
            tombstone: 0xECF0F1
        },
        lighting: {
            ambient: 0x4A5568,
            ambientIntensity: 0.15,
            sun: 0xC0C0FF,
            sunIntensity: 0.3,
            sunPosition: [-30, 50, -30],
            hemisphere: [0x1a1a2e, 0x2C3E50, 0.2]
        },
        props: ['tombstones', 'deadTrees', 'fences'],
        hazards: ['river'],
        size: 100
    },
    spaceStation: {
        id: 'spaceStation',
        name: 'Space Station',
        icon: '🚀',
        description: 'Futuristic orbital arena',
        colors: {
            sky: 0x000022,
            metal: 0x566573,
            accent: 0x9B59B6,
            glow: 0x00FFE6
        },
        lighting: {
            ambient: 0x9B59B6,
            ambientIntensity: 0.2,
            sun: 0x00FFE6,
            sunIntensity: 0.5,
            sunPosition: [-50, 100, 50],
            hemisphere: [0x000022, 0x4A148C, 0.2]
        },
        props: ['panels', 'antennas', 'crates'],
        hazards: ['void'],
        size: 100
    },
    neonMetropolis: {
        id: 'neonMetropolis',
        name: 'Neon Metropolis',
        icon: '🌃',
        description: 'Cyberpunk city in the sky',
        colors: {
            sky: 0x1A0F2E,         // Deep purple night
            ground: 0x1a1a2e,      // Dark asphalt
            glass: 0x87CEEB,       // Transparent blue
            neonPink: 0xFF1493,    // Hot pink
            neonCyan: 0x00FFFF,    // Cyan
            neonPurple: 0xA06CD5,  // Purple
            neonOrange: 0xFF6B35,  // Orange
            metal: 0x2C3E50,       // Dark metal
            gold: 0xFFD700         // Gold accents
        },
        lighting: {
            ambient: 0x4B0082,     // Indigo ambient
            ambientIntensity: 0.15,
            sun: 0xFF6B35,         // Sunset orange
            sunIntensity: 0.6,
            sunPosition: [100, 30, -50], // Low sunset angle
            hemisphere: [0xFF6B35, 0x1A0F2E, 0.4]
        },
        props: ['skyscrapers', 'holograms', 'neonSigns', 'hovercars'],
        hazards: ['void'],
        features: ['glassFloor', 'neonLights', 'holograms', 'sunset'],
        size: 120
    }
};

// ═══════════════════════════════════════════════════════════
// WEAPON DEFINITIONS - FULL ARSENAL
// ═══════════════════════════════════════════════════════════

const WEAPONS = {
    // OFFENSIVE WEAPONS
    rocket: {
        name: 'Homing Rocket',
        icon: '🚀',
        damage: 50,
        speed: 55,
        ammo: 3,
        cooldown: 700,
        color: 0xFF4500,
        type: 'projectile',
        homing: true,
        tier: 'S'
    },
    machinegun: {
        name: 'Machine Gun',
        icon: '🔫',
        damage: 12,
        speed: 120,
        ammo: 25,
        cooldown: 80,
        color: 0xFFD700,
        type: 'projectile',
        homing: false,
        tier: 'A'
    },
    shotgun: {
        name: 'Cannon',
        icon: '💥',
        damage: 35,
        speed: 90,
        ammo: 4,
        cooldown: 500,
        color: 0xFF6B35,
        type: 'projectile',
        knockback: 15,
        tier: 'B'
    },
    mine: {
        name: 'Land Mine',
        icon: '💣',
        damage: 60,
        speed: 0,
        ammo: 3,
        cooldown: 800,
        color: 0x333333,
        type: 'mine',
        tier: 'A'
    },
    grenade: {
        name: 'LOB-Grenuke',
        icon: '🧨',
        damage: 45,
        speed: 40,
        ammo: 2,
        cooldown: 1000,
        color: 0x32CD32,
        type: 'grenade',
        blastRadius: 12,
        tier: 'B'
    },
    electric: {
        name: 'Electric Shock',
        icon: '⚡',
        damage: 20,
        speed: 150,
        ammo: 5,
        cooldown: 300,
        color: 0x00BFFF,
        type: 'projectile',
        chain: true,
        stunDuration: 1.5,
        tier: 'A'
    },

    // SPECIAL POWER-UPS
    invincibility: {
        name: 'INVINCIBILITY',
        icon: '🌟',
        damage: 100,
        speed: 0,
        ammo: 1,
        cooldown: 0,
        color: 0xFFD700,
        type: 'powerup',
        duration: 6,
        tier: 'S'
    },
    shield: {
        name: 'Force Shield',
        icon: '🛡️',
        damage: 0,
        speed: 0,
        ammo: 1,
        cooldown: 0,
        color: 0x00CED1,
        type: 'powerup',
        duration: 10,
        hits: 3,
        tier: 'A'
    },
    speedboost: {
        name: 'TURBO BOOST',
        icon: '⚡',
        damage: 0,
        speed: 0,
        ammo: 1,
        cooldown: 0,
        color: 0x7FFF00,
        type: 'powerup',
        duration: 4,
        speedMultiplier: 1.8,
        tier: 'B'
    }
};

// ═══════════════════════════════════════════════════════════
// MAIN GAME CLASS
// ═══════════════════════════════════════════════════════════

class SmashKarts3D {
    constructor() {
        // Three.js
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.clock = null;

        // Game state
        this.state = 'menu'; // menu, playing, paused, gameover
        this.currentMap = null;
        this.gameTime = 180;
        this.round = 1;

        // Entities
        this.player = null;
        this.aiKarts = [];
        this.projectiles = [];
        this.itemBoxes = [];
        this.boostPads = [];
        this.mapObjects = [];

        // Player state
        this.playerSpeed = 0;
        this.playerRotation = 0;
        this.health = 100;
        this.kills = 0;
        this.weapon = null;
        this.keys = {};

        // Power-up states
        this.isInvincible = false;
        this.invincibleTimer = 0;
        this.hasShield = false;
        this.shieldHits = 0;
        this.speedBoostActive = false;
        this.speedBoostTimer = 0;
        this.baseSpeed = 35;

        // Visual effects
        this.playerAura = null;
        this.shieldMesh = null;
        this.trailParticles = [];

        // Initialize
        this.init();
    }

    async init() {
        console.log('🎮 SMASH KARTS 3D - Loading...');

        await this.showLoading();
        this.initThreeJS();
        this.setupControls();
        this.showMenu();

        this.clock = new THREE.Clock(false);
        this.animate();

        console.log('✅ Game ready!');
    }

    async showLoading() {
        const bar = document.getElementById('loading-bar');
        const text = document.getElementById('loading-text');

        const steps = ['Initializing...', 'Loading maps...', 'Preparing weapons...', 'Ready!'];
        for (let i = 0; i < steps.length; i++) {
            if (bar) bar.style.width = ((i + 1) / steps.length * 100) + '%';
            if (text) text.textContent = steps[i];
            await new Promise(r => setTimeout(r, 250));
        }
        await new Promise(r => setTimeout(r, 300));
    }

    initThreeJS() {
        const canvas = document.getElementById('game-canvas');

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87CEEB);
        this.scene.fog = new THREE.Fog(0x87CEEB, 100, 400);

        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 50, 80);

        // ═══ ULTRA HD RENDERER SETTINGS ═══
        this.renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            powerPreference: 'high-performance',
            stencil: false
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Ultra HD shadow settings
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.shadowMap.autoUpdate = true;

        // Enhanced tone mapping
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;

        // Output encoding for better colors
        this.renderer.outputEncoding = THREE.sRGBEncoding;

        // ═══ POST-PROCESSING COMPOSER ═══
        this.setupPostProcessing();

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);

            // Update composer size
            if (this.composer) {
                this.composer.setSize(window.innerWidth, window.innerHeight);
            }
        });
    }

    setupPostProcessing() {
        // Check if post-processing is available
        if (typeof THREE.EffectComposer === 'undefined') {
            console.warn('Post-processing not available');
            return;
        }

        try {
            // Create composer
            this.composer = new THREE.EffectComposer(this.renderer);

            // Render pass (base scene)
            const renderPass = new THREE.RenderPass(this.scene, this.camera);
            this.composer.addPass(renderPass);

            // ═══ UNREAL BLOOM (Glowing effects) ═══
            this.bloomPass = new THREE.UnrealBloomPass(
                new THREE.Vector2(window.innerWidth, window.innerHeight),
                1.5,  // strength
                0.4,  // radius  
                0.85  // threshold
            );
            this.composer.addPass(this.bloomPass);

            // Final pass to screen
            const copyPass = new THREE.ShaderPass(THREE.CopyShader);
            copyPass.renderToScreen = true;
            this.composer.addPass(copyPass);

            console.log('✨ Post-processing enabled');
        } catch (error) {
            console.warn('Post-processing setup failed:', error);
            this.composer = null;
        }
    }

    setupControls() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
            if (e.key === ' ' && this.state === 'playing') this.fireWeapon();
            if (e.key === 'Escape') this.togglePause();
        });
        document.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });
    }

    // ═══════════════════════════════════════════════════════
    // MENU SYSTEM
    // ═══════════════════════════════════════════════════════

    showMenu() {
        this.state = 'menu';

        document.getElementById('loading-screen').classList.add('hidden');
        document.getElementById('menu-screen').classList.remove('hidden');
        document.getElementById('game-container').classList.add('hidden');
        document.getElementById('settings-modal').classList.add('hidden');

        this.populateMapSelect();
        this.previewMap('smashIsland');
        this.setupMenuButtons();
    }

    setupMenuButtons() {
        // Play button
        document.getElementById('btn-play').onclick = () => this.startGame();

        // Settings button (menu)
        document.getElementById('btn-settings').onclick = () => this.openSettings();

        // Settings save/close
        document.getElementById('btn-save-settings').onclick = () => this.saveSettings();
        document.getElementById('btn-close-settings').onclick = () => this.closeSettings();

        // Pause button
        const pauseBtn = document.getElementById('btn-pause');
        if (pauseBtn) pauseBtn.onclick = () => this.togglePause();

        // Resume button
        const resumeBtn = document.getElementById('btn-resume');
        if (resumeBtn) resumeBtn.onclick = () => this.togglePause();

        // Pause settings
        const pauseSettingsBtn = document.getElementById('btn-pause-settings');
        if (pauseSettingsBtn) pauseSettingsBtn.onclick = () => this.openSettings();

        // Exit button
        const exitBtn = document.getElementById('btn-exit');
        if (exitBtn) exitBtn.onclick = () => this.exitToMenu();

        // Fire button
        const fireBtn = document.getElementById('fire-button');
        if (fireBtn) fireBtn.onclick = () => this.fireWeapon();

        // Settings sliders
        this.setupSettingsSliders();
    }

    setupSettingsSliders() {
        const volumeSlider = document.getElementById('setting-volume');
        const volumeValue = document.getElementById('volume-value');
        if (volumeSlider && volumeValue) {
            volumeSlider.oninput = () => volumeValue.textContent = volumeSlider.value + '%';
        }

        const musicSlider = document.getElementById('setting-music');
        const musicValue = document.getElementById('music-value');
        if (musicSlider && musicValue) {
            musicSlider.oninput = () => musicValue.textContent = musicSlider.value + '%';
        }

        const sensSlider = document.getElementById('setting-sensitivity');
        const sensValue = document.getElementById('sensitivity-value');
        if (sensSlider && sensValue) {
            sensSlider.oninput = () => sensValue.textContent = sensSlider.value;
        }
    }

    openSettings() {
        document.getElementById('settings-modal').classList.remove('hidden');
    }

    closeSettings() {
        document.getElementById('settings-modal').classList.add('hidden');
    }

    saveSettings() {
        // Get settings values
        const quality = document.getElementById('setting-quality').value;
        const shadows = document.getElementById('setting-shadows').value;

        // Apply quality settings
        if (quality === 'low') {
            this.renderer.setPixelRatio(1);
        } else if (quality === 'medium') {
            this.renderer.setPixelRatio(1.5);
        } else if (quality === 'high') {
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        } else {
            this.renderer.setPixelRatio(window.devicePixelRatio);
        }

        // Apply shadow settings
        if (shadows === 'off') {
            this.renderer.shadowMap.enabled = false;
        } else if (shadows === 'low') {
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.BasicShadowMap;
        } else {
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        }

        this.showNotification('⚙️ Settings saved!');
        this.closeSettings();
    }

    exitToMenu() {
        this.state = 'menu';
        document.getElementById('pause-menu').classList.add('hidden');
        document.getElementById('game-container').classList.add('hidden');
        document.getElementById('menu-screen').classList.remove('hidden');
        this.previewMap('smashIsland');
    }

    populateMapSelect() {
        const grid = document.getElementById('map-grid');
        if (!grid) return;

        grid.innerHTML = Object.values(MAP_CONFIGS).map((map, i) => `
            <div class="map-card ${i === 0 ? 'selected' : ''}" data-map="${map.id}">
                <div class="map-icon">${map.icon}</div>
                <div class="map-name">${map.name}</div>
            </div>
        `).join('');

        grid.querySelectorAll('.map-card').forEach(card => {
            card.onclick = () => {
                grid.querySelectorAll('.map-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                this.previewMap(card.dataset.map);
            };
        });
    }

    previewMap(mapId) {
        this.clearScene();
        this.currentMap = MAP_CONFIGS[mapId];
        this.buildMap(this.currentMap);

        // Slow camera orbit for preview
        this.previewMode = true;
    }

    // ═══════════════════════════════════════════════════════
    // MAP BUILDING
    // ═══════════════════════════════════════════════════════

    clearScene() {
        while (this.scene.children.length > 0) {
            const obj = this.scene.children[0];
            this.scene.remove(obj);
            if (obj.geometry) obj.geometry.dispose();
            if (obj.material) {
                if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
                else obj.material.dispose();
            }
        }
        this.mapObjects = [];
        this.itemBoxes = [];
        this.boostPads = [];
        this.aiKarts = [];
        this.projectiles = [];
    }

    buildMap(config) {
        const c = config.colors;
        const l = config.lighting;
        const size = config.size;

        // Sky and fog
        this.scene.background = new THREE.Color(c.sky);
        this.scene.fog = new THREE.Fog(c.sky, size, size * 4);

        // Lighting
        const ambient = new THREE.AmbientLight(l.ambient, l.ambientIntensity);
        this.scene.add(ambient);

        const hemi = new THREE.HemisphereLight(l.hemisphere[0], l.hemisphere[1], l.hemisphere[2]);
        this.scene.add(hemi);

        const sun = new THREE.DirectionalLight(l.sun, l.sunIntensity);
        sun.position.set(...l.sunPosition);
        sun.castShadow = true;
        sun.shadow.mapSize.width = 4096; // Higher quality shadows
        sun.shadow.mapSize.height = 4096;
        sun.shadow.camera.near = 0.5;
        sun.shadow.camera.far = 300;
        sun.shadow.camera.left = -size * 1.2;
        sun.shadow.camera.right = size * 1.2;
        sun.shadow.camera.top = size * 1.2;
        sun.shadow.camera.bottom = -size * 1.2;
        sun.shadow.bias = -0.0001; // Reduce shadow acne
        sun.shadow.normalBias = 0.02;
        this.scene.add(sun);

        // Build terrain based on map type
        switch (config.id) {
            case 'smashIsland':
                this.buildIslandTerrain(config);
                break;
            case 'lavaPit':
                this.buildVolcanicTerrain(config);
                break;
            case 'skyDropzone':
            case 'spaceStation':
                this.buildPlatformTerrain(config);
                break;
            case 'graveyard':
                this.buildGraveyardTerrain(config);
                break;
            case 'neonMetropolis':
                this.buildNeonMetropolisTerrain(config);
                break;
            default:
                this.buildIslandTerrain(config);
        }

        // Add item boxes
        this.addItemBoxes(config);

        // Add boost pads
        this.addBoostPads(config);
    }

    buildIslandTerrain(config) {
        const c = config.colors;
        const size = config.size;

        // Main grass island
        const groundGeo = new THREE.CircleGeometry(size, 64);
        groundGeo.rotateX(-Math.PI / 2);
        const groundMat = new THREE.MeshStandardMaterial({ color: c.grass, flatShading: true });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.receiveShadow = true;
        this.scene.add(ground);

        // Sand beach ring
        const sandGeo = new THREE.RingGeometry(size * 0.85, size, 64);
        sandGeo.rotateX(-Math.PI / 2);
        const sandMat = new THREE.MeshStandardMaterial({ color: c.sand, flatShading: true });
        const sand = new THREE.Mesh(sandGeo, sandMat);
        sand.position.y = 0.05;
        this.scene.add(sand);

        // Water
        const waterGeo = new THREE.RingGeometry(size, size * 2.5, 64);
        waterGeo.rotateX(-Math.PI / 2);
        const waterMat = new THREE.MeshStandardMaterial({
            color: c.water,
            transparent: true,
            opacity: 0.85,
            roughness: 0.2
        });
        const water = new THREE.Mesh(waterGeo, waterMat);
        water.position.y = -2;
        water.userData.hazard = 'water';
        this.scene.add(water);
        this.mapObjects.push(water);

        // Palm trees
        for (let i = 0; i < 15; i++) {
            const angle = (i / 15) * Math.PI * 2;
            const dist = size * 0.75 + Math.random() * 10;
            this.createPalmTree(Math.cos(angle) * dist, Math.sin(angle) * dist);
        }

        // Rocks
        for (let i = 0; i < 12; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * size * 0.7;
            this.createRock(Math.cos(angle) * dist, Math.sin(angle) * dist, 1 + Math.random() * 2);
        }

        // Center structure
        const structGeo = new THREE.CylinderGeometry(8, 10, 4, 8);
        const structMat = new THREE.MeshStandardMaterial({ color: c.track, flatShading: true });
        const struct = new THREE.Mesh(structGeo, structMat);
        struct.position.y = 2;
        struct.castShadow = true;
        this.scene.add(struct);
    }

    buildVolcanicTerrain(config) {
        const c = config.colors;
        const size = config.size;

        // Rocky ground
        const groundGeo = new THREE.CircleGeometry(size, 48);
        groundGeo.rotateX(-Math.PI / 2);
        const groundMat = new THREE.MeshStandardMaterial({ color: c.rock, flatShading: true, roughness: 1 });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.receiveShadow = true;
        this.scene.add(ground);

        // Lava rivers (cross pattern)
        const lavaGeo = new THREE.PlaneGeometry(size * 0.15, size * 2);
        const lavaMat = new THREE.MeshStandardMaterial({
            color: c.lava,
            emissive: c.lava,
            emissiveIntensity: 0.8,
            flatShading: true
        });

        const lava1 = new THREE.Mesh(lavaGeo, lavaMat);
        lava1.rotation.x = -Math.PI / 2;
        lava1.position.y = 0.1;
        lava1.userData.hazard = 'lava';
        this.scene.add(lava1);
        this.mapObjects.push(lava1);

        const lava2 = lava1.clone();
        lava2.rotation.z = Math.PI / 2;
        this.scene.add(lava2);
        this.mapObjects.push(lava2);

        // Point lights for lava glow
        const lavaLight1 = new THREE.PointLight(c.lava, 1.5, 50);
        lavaLight1.position.set(0, 5, 0);
        this.scene.add(lavaLight1);

        // Crystals
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const dist = size * 0.6;
            this.createCrystal(Math.cos(angle) * dist, Math.sin(angle) * dist, c.crystal);
        }

        // Rocks
        for (let i = 0; i < 15; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = size * 0.3 + Math.random() * size * 0.4;
            // Avoid lava rivers
            const x = Math.cos(angle) * dist;
            const z = Math.sin(angle) * dist;
            if (Math.abs(x) > 10 && Math.abs(z) > 10) {
                this.createRock(x, z, 1.5 + Math.random() * 2, 0x444444);
            }
        }
    }

    buildPlatformTerrain(config) {
        const c = config.colors;

        // Main platform
        const mainGeo = new THREE.BoxGeometry(60, 3, 60);
        const mainMat = new THREE.MeshStandardMaterial({ color: c.platform || c.metal, flatShading: true, metalness: 0.3 });
        const main = new THREE.Mesh(mainGeo, mainMat);
        main.position.y = -1.5;
        main.receiveShadow = true;
        main.castShadow = true;
        this.scene.add(main);

        // Corner platforms
        const corners = [
            [45, 5, 45], [-45, 5, 45], [45, 5, -45], [-45, 5, -45]
        ];
        corners.forEach(pos => {
            const platGeo = new THREE.BoxGeometry(25, 2, 25);
            const plat = new THREE.Mesh(platGeo, mainMat);
            plat.position.set(...pos);
            plat.receiveShadow = true;
            plat.castShadow = true;
            this.scene.add(plat);
        });

        // Bridges
        const bridgeGeo = new THREE.BoxGeometry(8, 1, 25);
        const bridgeMat = new THREE.MeshStandardMaterial({ color: 0x85929E, flatShading: true, metalness: 0.2 });

        [[30, 2.5, 0], [-30, 2.5, 0], [0, 2.5, 30], [0, 2.5, -30]].forEach(pos => {
            const bridge = new THREE.Mesh(bridgeGeo, bridgeMat);
            bridge.position.set(...pos);
            if (pos[0] === 0) bridge.rotation.y = Math.PI / 2;
            bridge.receiveShadow = true;
            this.scene.add(bridge);
        });

        // Void below (hazard marker)
        const voidPlane = new THREE.Mesh(
            new THREE.PlaneGeometry(300, 300),
            new THREE.MeshBasicMaterial({ color: c.void || 0x0F3460, transparent: true, opacity: 0.5 })
        );
        voidPlane.rotation.x = -Math.PI / 2;
        voidPlane.position.y = -50;
        voidPlane.userData.hazard = 'void';
        this.scene.add(voidPlane);

        // Glowing barriers
        if (config.id === 'skyDropzone') {
            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2;
                const barrier = new THREE.Mesh(
                    new THREE.BoxGeometry(1, 8, 10),
                    new THREE.MeshStandardMaterial({ color: c.accent, emissive: c.accent, emissiveIntensity: 0.5, transparent: true, opacity: 0.7 })
                );
                barrier.position.set(Math.cos(angle) * 55, 4, Math.sin(angle) * 55);
                barrier.lookAt(0, 4, 0);
                this.scene.add(barrier);
            }
        }

        // Stars for space station
        if (config.id === 'spaceStation') {
            this.addStarfield();
        }
    }

    buildGraveyardTerrain(config) {
        const c = config.colors;
        const size = config.size;

        // Dark ground with hills
        const groundGeo = new THREE.PlaneGeometry(size * 2, size * 2, 32, 32);
        const positions = groundGeo.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            positions[i + 2] = Math.sin(positions[i] * 0.05) * Math.cos(positions[i + 1] * 0.05) * 3;
        }
        groundGeo.rotateX(-Math.PI / 2);
        groundGeo.computeVertexNormals();

        const groundMat = new THREE.MeshStandardMaterial({ color: c.ground, flatShading: true, roughness: 1 });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.receiveShadow = true;
        this.scene.add(ground);

        // Dark river
        const riverGeo = new THREE.PlaneGeometry(size * 0.12, size * 1.5);
        const riverMat = new THREE.MeshStandardMaterial({ color: 0x1C1C1C, transparent: true, opacity: 0.9, roughness: 0.2 });
        const river = new THREE.Mesh(riverGeo, riverMat);
        river.rotation.x = -Math.PI / 2;
        river.rotation.z = Math.PI / 6;
        river.position.y = 0.1;
        river.userData.hazard = 'river';
        this.scene.add(river);
        this.mapObjects.push(river);

        // Tombstones
        for (let i = 0; i < 35; i++) {
            const x = (Math.random() - 0.5) * size * 1.5;
            const z = (Math.random() - 0.5) * size * 1.5;
            // Avoid river
            if (Math.abs(x + z * 0.3) > 15) {
                this.createTombstone(x, z, c.tombstone);
            }
        }

        // Dead trees
        for (let i = 0; i < 12; i++) {
            const x = (Math.random() - 0.5) * size * 1.8;
            const z = (Math.random() - 0.5) * size * 1.8;
            this.createDeadTree(x, z);
        }

        // Fog effect
        this.scene.fog = new THREE.FogExp2(c.fog, 0.015);
    }

    buildNeonMetropolisTerrain(config) {
        const c = config.colors;
        const size = config.size;

        // ═══ GLASS FLOOR - Central Arena ═══
        const glassGeo = new THREE.CircleGeometry(size * 0.6, 64);
        glassGeo.rotateX(-Math.PI / 2);
        const glassMat = new THREE.MeshStandardMaterial({
            color: c.glass,
            transparent: true,
            opacity: 0.3,
            metalness: 0.9,
            roughness: 0.1,
            side: THREE.DoubleSide
        });
        const glassFloor = new THREE.Mesh(glassGeo, glassMat);
        glassFloor.position.y = 0.1;
        glassFloor.receiveShadow = true;
        this.scene.add(glassFloor);

        // Dark ground underneath
        const groundGeo = new THREE.CircleGeometry(size, 64);
        groundGeo.rotateX(-Math.PI / 2);
        const groundMat = new THREE.MeshStandardMaterial({
            color: c.ground,
            metalness: 0.3,
            roughness: 0.8
        });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.position.y = -0.1;
        ground.receiveShadow = true;
        this.scene.add(ground);

        // Grid lines on ground
        for (let i = -size; i <= size; i += 10) {
            const lineGeo = new THREE.BoxGeometry(0.1, 0.05, size * 2);
            const lineMat = new THREE.MeshBasicMaterial({
                color: c.neonCyan,
                transparent: true,
                opacity: 0.3
            });
            const lineX = new THREE.Mesh(lineGeo, lineMat);
            lineX.position.set(i, 0.01, 0);
            this.scene.add(lineX);

            const lineZ = lineX.clone();
            lineZ.rotation.y = Math.PI / 2;
            lineZ.position.set(0, 0.01, i);
            this.scene.add(lineZ);
        }

        // ═══ SKYSCRAPERS - Background buildings ═══
        const buildingColors = [c.metal, 0x1a1a2e, 0x2C3E50, 0x1e2a38];
        const neonColors = [c.neonPink, c.neonCyan, c.neonPurple, c.neonOrange];

        for (let i = 0; i < 25; i++) {
            const angle = (i / 25) * Math.PI * 2;
            const dist = size * 0.8 + Math.random() * size * 0.5;
            const x = Math.cos(angle) * dist;
            const z = Math.sin(angle) * dist;
            const height = 30 + Math.random() * 80;
            const width = 8 + Math.random() * 15;
            const depth = 8 + Math.random() * 15;

            this.createSkyscraper(x, z, width, height, depth,
                buildingColors[Math.floor(Math.random() * buildingColors.length)],
                neonColors[Math.floor(Math.random() * neonColors.length)]
            );
        }

        // ═══ NEON LIGHT PILLARS - Arena decoration ═══
        const pillarCount = 12;
        for (let i = 0; i < pillarCount; i++) {
            const angle = (i / pillarCount) * Math.PI * 2;
            const x = Math.cos(angle) * size * 0.5;
            const z = Math.sin(angle) * size * 0.5;
            const color = neonColors[i % neonColors.length];
            this.createNeonPillar(x, z, color);
        }

        // ═══ HOLOGRAPHIC BILLBOARDS ═══
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2 + Math.PI / 8;
            const x = Math.cos(angle) * size * 0.65;
            const z = Math.sin(angle) * size * 0.65;
            this.createHolographicBillboard(x, z, angle);
        }

        // ═══ FLOATING PLATFORMS ═══
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const dist = size * 0.35;
            const x = Math.cos(angle) * dist;
            const z = Math.sin(angle) * dist;
            this.createFloatingPlatform(x, 5 + Math.random() * 5, z);
        }

        // ═══ SUNSET GRADIENT - Enhanced sky ═══
        // Create gradient dome
        const skyGeo = new THREE.SphereGeometry(size * 2.5, 32, 32);
        const skyMat = new THREE.ShaderMaterial({
            uniforms: {
                topColor: { value: new THREE.Color(0x1A0F2E) },
                bottomColor: { value: new THREE.Color(0xFF6B35) },
                offset: { value: 0.4 },
                exponent: { value: 0.6 }
            },
            vertexShader: `
                varying vec3 vWorldPosition;
                void main() {
                    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                    vWorldPosition = worldPosition.xyz;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 topColor;
                uniform vec3 bottomColor;
                uniform float offset;
                uniform float exponent;
                varying vec3 vWorldPosition;
                void main() {
                    float h = normalize(vWorldPosition).y + offset;
                    gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(h, exponent), 0.0)), 1.0);
                }
            `,
            side: THREE.BackSide
        });
        const sky = new THREE.Mesh(skyGeo, skyMat);
        this.scene.add(sky);

        // ═══ VOLUMETRIC FOG LOOK ═══
        this.scene.fog = new THREE.FogExp2(0x1A0F2E, 0.008);

        // ═══ ADDITIONAL NEON LIGHTS (Point lights) ═══
        const lightPositions = [
            [0, 15, 0, c.neonCyan, 1.5],
            [size * 0.4, 8, 0, c.neonPink, 1],
            [-size * 0.4, 8, 0, c.neonPurple, 1],
            [0, 8, size * 0.4, c.neonOrange, 1],
            [0, 8, -size * 0.4, c.neonCyan, 1]
        ];

        lightPositions.forEach(([x, y, z, color, intensity]) => {
            const light = new THREE.PointLight(color, intensity, 60);
            light.position.set(x, y, z);
            this.scene.add(light);
        });
    }

    createSkyscraper(x, z, width, height, depth, buildingColor, neonColor) {
        const group = new THREE.Group();

        // Main building body
        const buildingGeo = new THREE.BoxGeometry(width, height, depth);
        const buildingMat = new THREE.MeshStandardMaterial({
            color: buildingColor,
            metalness: 0.5,
            roughness: 0.6,
            flatShading: true
        });
        const building = new THREE.Mesh(buildingGeo, buildingMat);
        building.position.y = height / 2;
        building.castShadow = true;
        group.add(building);

        // Windows (emissive strips)
        const windowRows = Math.floor(height / 4);
        for (let row = 0; row < windowRows; row++) {
            const windowGeo = new THREE.BoxGeometry(width + 0.2, 0.8, depth + 0.2);
            const windowMat = new THREE.MeshBasicMaterial({
                color: Math.random() > 0.3 ? 0xFFE4B5 : 0x1a1a2e,
                transparent: true,
                opacity: 0.8
            });
            const windowStrip = new THREE.Mesh(windowGeo, windowMat);
            windowStrip.position.y = 3 + row * 4;
            group.add(windowStrip);
        }

        // Neon accent on top
        const neonGeo = new THREE.BoxGeometry(width + 2, 0.5, depth + 2);
        const neonMat = new THREE.MeshBasicMaterial({
            color: neonColor,
            transparent: true,
            opacity: 0.9
        });
        const neonTop = new THREE.Mesh(neonGeo, neonMat);
        neonTop.position.y = height + 0.3;
        group.add(neonTop);

        // Antenna
        if (Math.random() > 0.5) {
            const antennaGeo = new THREE.CylinderGeometry(0.2, 0.2, 10, 8);
            const antennaMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
            const antenna = new THREE.Mesh(antennaGeo, antennaMat);
            antenna.position.y = height + 5;
            group.add(antenna);

            // Blinking light
            const blinkLight = new THREE.Mesh(
                new THREE.SphereGeometry(0.4, 8, 8),
                new THREE.MeshBasicMaterial({ color: 0xFF0000 })
            );
            blinkLight.position.y = height + 10;
            group.add(blinkLight);
        }

        group.position.set(x, 0, z);
        this.scene.add(group);
        this.mapObjects.push(group);
    }

    createNeonPillar(x, z, color) {
        const group = new THREE.Group();

        // Pillar base
        const baseGeo = new THREE.CylinderGeometry(1.5, 2, 1, 8);
        const baseMat = new THREE.MeshStandardMaterial({ color: 0x1a1a2e, metalness: 0.8 });
        const base = new THREE.Mesh(baseGeo, baseMat);
        base.position.y = 0.5;
        group.add(base);

        // Neon tube
        const tubeGeo = new THREE.CylinderGeometry(0.3, 0.3, 12, 16);
        const tubeMat = new THREE.MeshBasicMaterial({ color });
        const tube = new THREE.Mesh(tubeGeo, tubeMat);
        tube.position.y = 7;
        group.add(tube);

        // Glow sphere at top
        const glowGeo = new THREE.SphereGeometry(0.8, 16, 16);
        const glowMat = new THREE.MeshBasicMaterial({
            color,
            transparent: true,
            opacity: 0.9
        });
        const glow = new THREE.Mesh(glowGeo, glowMat);
        glow.position.y = 13;
        group.add(glow);

        // Point light
        const light = new THREE.PointLight(color, 0.8, 25);
        light.position.y = 10;
        group.add(light);

        group.position.set(x, 0, z);
        this.scene.add(group);
        this.mapObjects.push(group);
    }

    createHolographicBillboard(x, z, angle) {
        const group = new THREE.Group();

        // Support pole
        const poleGeo = new THREE.CylinderGeometry(0.3, 0.5, 15, 8);
        const poleMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.8 });
        const pole = new THREE.Mesh(poleGeo, poleMat);
        pole.position.y = 7.5;
        group.add(pole);

        // Holographic screen
        const screenGeo = new THREE.PlaneGeometry(12, 8);
        const screenMat = new THREE.MeshBasicMaterial({
            color: 0x00FFFF,
            transparent: true,
            opacity: 0.4,
            side: THREE.DoubleSide
        });
        const screen = new THREE.Mesh(screenGeo, screenMat);
        screen.position.y = 18;
        screen.rotation.y = -angle + Math.PI;
        group.add(screen);

        // Glitch lines effect
        for (let i = 0; i < 3; i++) {
            const lineGeo = new THREE.PlaneGeometry(12, 0.3);
            const lineMat = new THREE.MeshBasicMaterial({
                color: 0xFF1493,
                transparent: true,
                opacity: 0.6,
                side: THREE.DoubleSide
            });
            const line = new THREE.Mesh(lineGeo, lineMat);
            line.position.y = 16 + i * 2;
            line.rotation.y = -angle + Math.PI;
            group.add(line);
        }

        group.position.set(x, 0, z);
        this.scene.add(group);
        this.mapObjects.push(group);
    }

    createFloatingPlatform(x, y, z) {
        const group = new THREE.Group();

        // Main platform
        const platGeo = new THREE.CylinderGeometry(6, 5, 1, 16);
        const platMat = new THREE.MeshStandardMaterial({
            color: 0x2C3E50,
            metalness: 0.7,
            roughness: 0.3
        });
        const platform = new THREE.Mesh(platGeo, platMat);
        platform.receiveShadow = true;
        group.add(platform);

        // Neon ring
        const ringGeo = new THREE.TorusGeometry(5.5, 0.2, 8, 32);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0x00FFFF });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = 0.1;
        group.add(ring);

        // Under-glow
        const underLight = new THREE.PointLight(0x00FFFF, 0.5, 15);
        underLight.position.y = -1;
        group.add(underLight);

        group.position.set(x, y, z);
        this.scene.add(group);
        this.mapObjects.push(group);
    }

    // ═══════════════════════════════════════════════════════
    // PROP CREATION
    // ═══════════════════════════════════════════════════════

    createPalmTree(x, z) {
        const group = new THREE.Group();

        const trunkGeo = new THREE.CylinderGeometry(0.4, 0.6, 8, 8);
        const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8B4513, flatShading: true });
        const trunk = new THREE.Mesh(trunkGeo, trunkMat);
        trunk.position.y = 4;
        trunk.castShadow = true;
        group.add(trunk);

        for (let i = 0; i < 6; i++) {
            const leafGeo = new THREE.ConeGeometry(2.5, 1.5, 4);
            const leafMat = new THREE.MeshStandardMaterial({ color: 0x228B22, flatShading: true });
            const leaf = new THREE.Mesh(leafGeo, leafMat);
            const angle = (i / 6) * Math.PI * 2;
            leaf.position.set(Math.cos(angle) * 2, 8.5, Math.sin(angle) * 2);
            leaf.rotation.x = Math.PI / 3;
            leaf.rotation.z = -angle;
            leaf.castShadow = true;
            group.add(leaf);
        }

        group.position.set(x, 0, z);
        this.scene.add(group);
        this.mapObjects.push(group);
    }

    createRock(x, z, size, color = 0x696969) {
        const rockGeo = new THREE.DodecahedronGeometry(size, 0);
        const positions = rockGeo.attributes.position.array;
        for (let i = 0; i < positions.length; i++) {
            positions[i] += (Math.random() - 0.5) * 0.3;
        }
        rockGeo.computeVertexNormals();

        const rockMat = new THREE.MeshStandardMaterial({ color, flatShading: true, roughness: 1 });
        const rock = new THREE.Mesh(rockGeo, rockMat);
        rock.position.set(x, size * 0.4, z);
        rock.rotation.set(Math.random(), Math.random(), Math.random());
        rock.castShadow = true;
        rock.userData.obstacle = true;
        this.scene.add(rock);
        this.mapObjects.push(rock);
    }

    createCrystal(x, z, color) {
        const height = 3 + Math.random() * 2;
        const crystalGeo = new THREE.ConeGeometry(0.8, height, 4);
        const crystalMat = new THREE.MeshStandardMaterial({
            color,
            emissive: color,
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0.9,
            flatShading: true
        });
        const crystal = new THREE.Mesh(crystalGeo, crystalMat);
        crystal.position.set(x, height / 2, z);
        crystal.rotation.x = (Math.random() - 0.5) * 0.3;
        crystal.rotation.z = (Math.random() - 0.5) * 0.3;
        crystal.castShadow = true;
        this.scene.add(crystal);
        this.mapObjects.push(crystal);
    }

    createTombstone(x, z, color) {
        const types = [
            () => new THREE.BoxGeometry(1.5, 2.5, 0.4),
            () => {
                const geo = new THREE.BoxGeometry(1.2, 3, 0.4);
                return geo;
            }
        ];

        const geo = types[Math.floor(Math.random() * types.length)]();
        const mat = new THREE.MeshStandardMaterial({ color, flatShading: true, roughness: 0.9 });
        const tomb = new THREE.Mesh(geo, mat);
        tomb.position.set(x, 1.25, z);
        tomb.rotation.y = (Math.random() - 0.5) * 0.3;
        tomb.castShadow = true;
        tomb.userData.obstacle = true;
        this.scene.add(tomb);
        this.mapObjects.push(tomb);
    }

    createDeadTree(x, z) {
        const group = new THREE.Group();

        const trunkGeo = new THREE.CylinderGeometry(0.3, 0.5, 7, 6);
        const trunkMat = new THREE.MeshStandardMaterial({ color: 0x2C2C2C, flatShading: true, roughness: 1 });
        const trunk = new THREE.Mesh(trunkGeo, trunkMat);
        trunk.position.y = 3.5;
        trunk.castShadow = true;
        group.add(trunk);

        for (let i = 0; i < 4; i++) {
            const branchGeo = new THREE.CylinderGeometry(0.1, 0.15, 2.5, 4);
            const branch = new THREE.Mesh(branchGeo, trunkMat);
            const angle = (i / 4) * Math.PI * 2;
            branch.position.set(Math.cos(angle) * 0.5, 5 + i * 0.5, Math.sin(angle) * 0.5);
            branch.rotation.z = angle + Math.PI / 4;
            branch.castShadow = true;
            group.add(branch);
        }

        group.position.set(x, 0, z);
        this.scene.add(group);
        this.mapObjects.push(group);
    }

    addStarfield() {
        const starGeo = new THREE.BufferGeometry();
        const positions = [];
        for (let i = 0; i < 500; i++) {
            const r = 200 + Math.random() * 300;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            positions.push(
                r * Math.sin(phi) * Math.cos(theta),
                r * Math.cos(phi),
                r * Math.sin(phi) * Math.sin(theta)
            );
        }
        starGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

        const starMat = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 1.5 });
        const stars = new THREE.Points(starGeo, starMat);
        this.scene.add(stars);
    }

    // ═══════════════════════════════════════════════════════
    // ITEM BOXES & BOOST PADS
    // ═══════════════════════════════════════════════════════

    addItemBoxes(config) {
        const count = 12;
        const size = config.size * 0.5;

        const boxGeo = new THREE.BoxGeometry(2.5, 2.5, 2.5);
        const boxMat = new THREE.MeshStandardMaterial({
            color: 0xFFD700,
            emissive: 0xFFD700,
            emissiveIntensity: 0.4,
            flatShading: true
        });

        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const dist = size * 0.6 + Math.random() * size * 0.3;

            const box = new THREE.Mesh(boxGeo, boxMat);
            box.position.set(Math.cos(angle) * dist, 2.5, Math.sin(angle) * dist);
            box.castShadow = true;
            box.userData = { type: 'itemBox', offset: i, active: true };

            this.scene.add(box);
            this.itemBoxes.push(box);
        }
    }

    addBoostPads(config) {
        const count = 10;
        const size = config.size * 0.6;

        const padGeo = new THREE.PlaneGeometry(3, 6);
        padGeo.rotateX(-Math.PI / 2);
        const padMat = new THREE.MeshStandardMaterial({
            color: 0xFFA500,
            emissive: 0xFFA500,
            emissiveIntensity: 0.3,
            flatShading: true
        });

        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2 + 0.3;
            const dist = size * 0.5;

            const pad = new THREE.Mesh(padGeo, padMat);
            pad.position.set(Math.cos(angle) * dist, 0.05, Math.sin(angle) * dist);
            pad.rotation.y = angle + Math.PI / 2;
            pad.userData = { type: 'boostPad' };

            this.scene.add(pad);
            this.boostPads.push(pad);
        }
    }

    // ═══════════════════════════════════════════════════════
    // PLAYER & AI
    // ═══════════════════════════════════════════════════════

    createPlayer() {
        const kart = this.createKart(0xFF6B35);
        kart.position.set(0, 0, 30);
        this.scene.add(kart);
        this.player = kart;
        this.playerRotation = 0;
        this.playerSpeed = 0;
        this.health = 100;
    }

    createAIKarts(count = 7) {
        const colors = [0x3498DB, 0xE74C3C, 0x9B59B6, 0x1ABC9C, 0xF39C12, 0x2ECC71, 0xE91E63];

        for (let i = 0; i < count; i++) {
            const kart = this.createKart(colors[i % colors.length]);
            const angle = ((i + 1) / (count + 1)) * Math.PI * 2;
            const dist = 40 + Math.random() * 20;
            kart.position.set(Math.cos(angle) * dist, 0, Math.sin(angle) * dist);
            kart.rotation.y = angle + Math.PI;
            kart.userData = {
                ai: true,
                health: 100,
                speed: 0,
                targetAngle: angle,
                name: `Bot ${i + 1}`,
                kills: 0
            };
            this.scene.add(kart);
            this.aiKarts.push(kart);
        }
    }

    createKart(color) {
        const kart = new THREE.Group();

        // === CHASSIS - Main body ===
        const chassisGeo = new THREE.BoxGeometry(3.2, 0.6, 5);
        const chassisMat = new THREE.MeshStandardMaterial({
            color,
            flatShading: true,
            metalness: 0.3,
            roughness: 0.6
        });
        const chassis = new THREE.Mesh(chassisGeo, chassisMat);
        chassis.position.y = 0.5;
        chassis.castShadow = true;
        chassis.receiveShadow = true;
        kart.add(chassis);

        // === FRONT HOOD - Angled ===
        const hoodGeo = new THREE.BoxGeometry(2.8, 0.5, 1.8);
        const hood = new THREE.Mesh(hoodGeo, chassisMat);
        hood.position.set(0, 0.9, 1.8);
        hood.rotation.x = -0.15;
        hood.castShadow = true;
        kart.add(hood);

        // === COCKPIT ===
        const cockpitGeo = new THREE.BoxGeometry(2.4, 0.9, 2);
        const cockpitMat = new THREE.MeshStandardMaterial({
            color: 0x333333,
            flatShading: true,
            metalness: 0.5,
            roughness: 0.3
        });
        const cockpit = new THREE.Mesh(cockpitGeo, cockpitMat);
        cockpit.position.set(0, 1.1, -0.3);
        cockpit.castShadow = true;
        kart.add(cockpit);

        // === WINDSHIELD ===
        const windshieldGeo = new THREE.BoxGeometry(2.2, 0.6, 0.1);
        const windshieldMat = new THREE.MeshStandardMaterial({
            color: 0x87CEEB,
            transparent: true,
            opacity: 0.6,
            metalness: 0.8,
            roughness: 0.1
        });
        const windshield = new THREE.Mesh(windshieldGeo, windshieldMat);
        windshield.position.set(0, 1.5, 0.6);
        windshield.rotation.x = -0.4;
        kart.add(windshield);

        // === SPOILER ===
        const spoilerWingGeo = new THREE.BoxGeometry(3.5, 0.15, 0.8);
        const spoilerMat = new THREE.MeshStandardMaterial({ color, flatShading: true, metalness: 0.4 });
        const spoilerWing = new THREE.Mesh(spoilerWingGeo, spoilerMat);
        spoilerWing.position.set(0, 1.6, -2.2);
        spoilerWing.castShadow = true;
        kart.add(spoilerWing);

        // Spoiler supports
        const supportGeo = new THREE.BoxGeometry(0.15, 0.8, 0.15);
        [-1.2, 1.2].forEach(x => {
            const support = new THREE.Mesh(supportGeo, spoilerMat);
            support.position.set(x, 1.2, -2.2);
            support.castShadow = true;
            kart.add(support);
        });

        // === DRIVER ===
        // Body
        const bodyGeo = new THREE.CylinderGeometry(0.35, 0.4, 0.8, 8);
        const bodyMat = new THREE.MeshStandardMaterial({ color: 0x2C3E50, flatShading: true });
        const driverBody = new THREE.Mesh(bodyGeo, bodyMat);
        driverBody.position.set(0, 1.5, -0.3);
        driverBody.castShadow = true;
        kart.add(driverBody);

        // Helmet
        const helmetGeo = new THREE.SphereGeometry(0.4, 12, 12);
        const helmetMat = new THREE.MeshStandardMaterial({
            color,
            flatShading: true,
            metalness: 0.5,
            roughness: 0.3
        });
        const helmet = new THREE.Mesh(helmetGeo, helmetMat);
        helmet.position.set(0, 2.1, -0.3);
        helmet.castShadow = true;
        kart.add(helmet);

        // Visor
        const visorGeo = new THREE.BoxGeometry(0.7, 0.2, 0.1);
        const visorMat = new THREE.MeshStandardMaterial({
            color: 0x1a1a1a,
            metalness: 0.8,
            roughness: 0.1
        });
        const visor = new THREE.Mesh(visorGeo, visorMat);
        visor.position.set(0, 2.15, 0.1);
        kart.add(visor);

        // === EXHAUST PIPES ===
        const exhaustGeo = new THREE.CylinderGeometry(0.15, 0.2, 0.6, 8);
        const exhaustMat = new THREE.MeshStandardMaterial({
            color: 0x444444,
            metalness: 0.8,
            roughness: 0.2
        });
        [-0.8, 0.8].forEach(x => {
            const exhaust = new THREE.Mesh(exhaustGeo, exhaustMat);
            exhaust.position.set(x, 0.7, -2.6);
            exhaust.rotation.x = Math.PI / 2;
            exhaust.castShadow = true;
            kart.add(exhaust);
        });

        // === FRONT BUMPER ===
        const bumperGeo = new THREE.BoxGeometry(3.4, 0.4, 0.3);
        const bumperMat = new THREE.MeshStandardMaterial({ color: 0x222222, flatShading: true });
        const frontBumper = new THREE.Mesh(bumperGeo, bumperMat);
        frontBumper.position.set(0, 0.4, 2.6);
        frontBumper.castShadow = true;
        kart.add(frontBumper);

        // === SIDE SKIRTS ===
        const skirtGeo = new THREE.BoxGeometry(0.2, 0.3, 4.5);
        [-1.7, 1.7].forEach(x => {
            const skirt = new THREE.Mesh(skirtGeo, bumperMat);
            skirt.position.set(x, 0.35, 0);
            skirt.castShadow = true;
            kart.add(skirt);
        });

        // === WHEELS - Detailed ===
        const wheelGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.45, 16);
        wheelGeo.rotateZ(Math.PI / 2);
        const wheelMat = new THREE.MeshStandardMaterial({
            color: 0x1a1a1a,
            flatShading: true,
            roughness: 0.9
        });

        const wheelPositions = [
            [-1.6, 0.55, 1.6],  // Front left
            [1.6, 0.55, 1.6],   // Front right
            [-1.6, 0.55, -1.6], // Rear left
            [1.6, 0.55, -1.6]   // Rear right
        ];

        wheelPositions.forEach(pos => {
            // Wheel
            const wheel = new THREE.Mesh(wheelGeo, wheelMat);
            wheel.position.set(...pos);
            wheel.castShadow = true;
            kart.add(wheel);

            // Wheel hub (colored accent)
            const hubGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.5, 8);
            hubGeo.rotateZ(Math.PI / 2);
            const hubMat = new THREE.MeshStandardMaterial({
                color,
                metalness: 0.7,
                roughness: 0.2,
                flatShading: true
            });
            const hub = new THREE.Mesh(hubGeo, hubMat);
            hub.position.set(pos[0] * 1.05, pos[1], pos[2]);
            kart.add(hub);
        });

        // === HEADLIGHTS ===
        const lightGeo = new THREE.SphereGeometry(0.2, 8, 8);
        const lightMat = new THREE.MeshStandardMaterial({
            color: 0xFFFFAA,
            emissive: 0xFFFFAA,
            emissiveIntensity: 0.5
        });
        [-0.9, 0.9].forEach(x => {
            const light = new THREE.Mesh(lightGeo, lightMat);
            light.position.set(x, 0.7, 2.5);
            kart.add(light);
        });

        // === TAIL LIGHTS ===
        const tailLightGeo = new THREE.BoxGeometry(0.4, 0.2, 0.1);
        const tailLightMat = new THREE.MeshStandardMaterial({
            color: 0xFF0000,
            emissive: 0xFF0000,
            emissiveIntensity: 0.4
        });
        [-1.0, 1.0].forEach(x => {
            const tailLight = new THREE.Mesh(tailLightGeo, tailLightMat);
            tailLight.position.set(x, 0.7, -2.55);
            kart.add(tailLight);
        });

        return kart;
    }

    // ═══════════════════════════════════════════════════════
    // GAME START & UPDATE
    // ═══════════════════════════════════════════════════════

    startGame() {
        this.state = 'playing';
        this.gameTime = 180;
        this.kills = 0;
        this.health = 100;
        this.weapon = null;

        document.getElementById('menu-screen').classList.add('hidden');
        document.getElementById('game-container').classList.remove('hidden');

        this.clearScene();
        this.buildMap(this.currentMap);
        this.createPlayer();
        this.createAIKarts(7);

        this.previewMode = false;
        this.clock.start();

        this.showNotification('🏁 GO!', 'success');
    }

    updatePlayer(delta) {
        if (!this.player || this.state !== 'playing') return;

        const accel = 45;
        const maxSpeed = 35;
        const friction = 0.93;
        const turnSpeed = 2.2;

        let accelerating = false;
        let turning = 0;

        if (this.keys['w'] || this.keys['arrowup']) { this.playerSpeed += accel * delta; accelerating = true; }
        if (this.keys['s'] || this.keys['arrowdown']) { this.playerSpeed -= accel * 0.5 * delta; accelerating = true; }
        if (this.keys['a'] || this.keys['arrowleft']) turning = 1;
        if (this.keys['d'] || this.keys['arrowright']) turning = -1;

        this.playerSpeed = Math.max(-maxSpeed * 0.4, Math.min(maxSpeed, this.playerSpeed));
        if (!accelerating) this.playerSpeed *= friction;

        if (Math.abs(this.playerSpeed) > 0.5) {
            this.playerRotation += turning * turnSpeed * delta * Math.sign(this.playerSpeed);
        }

        this.player.position.x += Math.sin(this.playerRotation) * this.playerSpeed * delta;
        this.player.position.z += Math.cos(this.playerRotation) * this.playerSpeed * delta;
        this.player.rotation.y = this.playerRotation;

        // Boundary
        const size = this.currentMap.size;
        const dist = Math.sqrt(this.player.position.x ** 2 + this.player.position.z ** 2);
        if (dist > size * 0.95) {
            const angle = Math.atan2(this.player.position.x, this.player.position.z);
            this.player.position.x = Math.sin(angle) * size * 0.95;
            this.player.position.z = Math.cos(angle) * size * 0.95;
            this.playerSpeed *= -0.3;
        }

        // Check hazards
        this.checkHazards();

        // Check item box pickup
        this.checkItemPickup();

        // Check boost pads
        this.checkBoostPads();
    }

    updateAI(delta) {
        this.aiKarts.forEach(ai => {
            if (ai.userData.health <= 0) return;

            // Simple AI: drive in circles and occasionally chase player
            ai.userData.speed = 15 + Math.random() * 5;
            ai.userData.targetAngle += delta * 0.3;

            ai.rotation.y = ai.userData.targetAngle;
            ai.position.x += Math.sin(ai.rotation.y) * ai.userData.speed * delta;
            ai.position.z += Math.cos(ai.rotation.y) * ai.userData.speed * delta;

            // Keep in bounds
            const size = this.currentMap.size * 0.8;
            const dist = Math.sqrt(ai.position.x ** 2 + ai.position.z ** 2);
            if (dist > size) {
                ai.userData.targetAngle += Math.PI;
            }
        });
    }

    updateCamera() {
        if (this.previewMode) {
            const elapsed = this.clock.getElapsedTime();
            this.camera.position.x = Math.sin(elapsed * 0.15) * 100;
            this.camera.position.z = Math.cos(elapsed * 0.15) * 100;
            this.camera.position.y = 60 + Math.sin(elapsed * 0.2) * 10;
            this.camera.lookAt(0, 0, 0);
        } else if (this.player) {
            const targetX = this.player.position.x - Math.sin(this.playerRotation) * 18;
            const targetZ = this.player.position.z - Math.cos(this.playerRotation) * 18;
            const targetY = 10;

            this.camera.position.x += (targetX - this.camera.position.x) * 0.08;
            this.camera.position.z += (targetZ - this.camera.position.z) * 0.08;
            this.camera.position.y += (targetY - this.camera.position.y) * 0.08;

            this.camera.lookAt(this.player.position.x, 2, this.player.position.z);
        }
    }

    checkHazards() {
        // Check if player is in hazard zone
        if (this.currentMap.id === 'lavaPit') {
            const px = this.player.position.x;
            const pz = this.player.position.z;
            if (Math.abs(px) < 8 || Math.abs(pz) < 8) {
                this.takeDamage(30);
                this.respawnPlayer();
            }
        }
    }

    checkItemPickup() {
        this.itemBoxes.forEach(box => {
            if (!box.userData.active) return;

            const dx = this.player.position.x - box.position.x;
            const dz = this.player.position.z - box.position.z;
            if (Math.sqrt(dx * dx + dz * dz) < 3) {
                box.userData.active = false;
                box.visible = false;

                // Give random weapon
                const weaponTypes = Object.keys(WEAPONS);
                const weaponType = weaponTypes[Math.floor(Math.random() * weaponTypes.length)];
                this.weapon = { ...WEAPONS[weaponType], type: weaponType };

                this.showNotification(`${this.weapon.icon} ${this.weapon.name}!`);
                this.updateWeaponUI();

                // Respawn after 6 seconds
                setTimeout(() => {
                    box.userData.active = true;
                    box.visible = true;
                }, 6000);
            }
        });
    }

    checkBoostPads() {
        this.boostPads.forEach(pad => {
            const dx = this.player.position.x - pad.position.x;
            const dz = this.player.position.z - pad.position.z;
            if (Math.sqrt(dx * dx + dz * dz) < 4) {
                this.playerSpeed = Math.min(50, this.playerSpeed + 25);
                this.showNotification('⚡ BOOST!', 'boost');
            }
        });
    }

    fireWeapon() {
        if (!this.weapon || this.weapon.ammo <= 0) return;

        this.weapon.ammo--;
        this.updateWeaponUI();

        const weaponType = this.weapon.type || 'projectile';

        // POWER-UPS - Activate immediately
        if (weaponType === 'powerup') {
            this.activatePowerUp();
            return;
        }

        // MINE - Drop behind
        if (weaponType === 'mine') {
            const mine = new THREE.Group();

            // Mine body
            const mineBody = new THREE.Mesh(
                new THREE.SphereGeometry(0.7, 12, 12),
                new THREE.MeshStandardMaterial({
                    color: 0x1a1a1a,
                    metalness: 0.8,
                    roughness: 0.3
                })
            );
            mine.add(mineBody);

            // Spikes
            for (let i = 0; i < 8; i++) {
                const spike = new THREE.Mesh(
                    new THREE.ConeGeometry(0.15, 0.4, 6),
                    new THREE.MeshStandardMaterial({ color: 0xFF4500 })
                );
                const angle = (i / 8) * Math.PI * 2;
                spike.position.set(Math.cos(angle) * 0.6, 0, Math.sin(angle) * 0.6);
                spike.rotation.z = -Math.PI / 2 + angle;
                mine.add(spike);
            }

            // Blinking light
            const light = new THREE.Mesh(
                new THREE.SphereGeometry(0.15, 8, 8),
                new THREE.MeshBasicMaterial({ color: 0xFF0000 })
            );
            light.position.y = 0.6;
            mine.add(light);

            mine.position.copy(this.player.position);
            mine.position.x -= Math.sin(this.playerRotation) * 4;
            mine.position.z -= Math.cos(this.playerRotation) * 4;
            mine.position.y = 0.5;
            mine.userData = {
                type: 'mine',
                damage: this.weapon.damage,
                timer: 15,
                light: light
            };
            this.scene.add(mine);
            this.projectiles.push(mine);
            this.showNotification('💣 Mine dropped!');
        }

        // GRENADE - Lobbed arc
        else if (weaponType === 'grenade') {
            const grenade = new THREE.Mesh(
                new THREE.SphereGeometry(0.5, 12, 12),
                new THREE.MeshStandardMaterial({
                    color: 0x32CD32,
                    emissive: 0x32CD32,
                    emissiveIntensity: 0.3
                })
            );
            grenade.position.copy(this.player.position);
            grenade.position.y = 2;
            grenade.userData = {
                type: 'grenade',
                damage: this.weapon.damage,
                blastRadius: this.weapon.blastRadius || 10,
                velocity: new THREE.Vector3(
                    Math.sin(this.playerRotation) * 25,
                    15, // Arc upward
                    Math.cos(this.playerRotation) * 25
                ),
                life: 2.5
            };
            this.scene.add(grenade);
            this.projectiles.push(grenade);
        }

        // REGULAR PROJECTILE
        else {
            const projSize = this.weapon.homing ? 0.5 : 0.35;
            const proj = new THREE.Mesh(
                new THREE.SphereGeometry(projSize, 10, 10),
                new THREE.MeshStandardMaterial({
                    color: this.weapon.color,
                    emissive: this.weapon.color,
                    emissiveIntensity: 0.8
                })
            );

            // Add trail effect for rockets
            if (this.weapon.homing) {
                const trail = new THREE.Mesh(
                    new THREE.ConeGeometry(0.2, 1.5, 8),
                    new THREE.MeshBasicMaterial({
                        color: 0xFF6600,
                        transparent: true,
                        opacity: 0.7
                    })
                );
                trail.rotation.x = Math.PI / 2;
                trail.position.z = -0.8;
                proj.add(trail);
            }

            proj.position.copy(this.player.position);
            proj.position.y = 1.5;
            proj.position.x += Math.sin(this.playerRotation) * 2;
            proj.position.z += Math.cos(this.playerRotation) * 2;

            proj.userData = {
                type: 'projectile',
                damage: this.weapon.damage,
                velocity: new THREE.Vector3(
                    Math.sin(this.playerRotation) * this.weapon.speed,
                    0,
                    Math.cos(this.playerRotation) * this.weapon.speed
                ),
                life: 4,
                homing: this.weapon.homing || false,
                chain: this.weapon.chain || false,
                knockback: this.weapon.knockback || 0,
                stunDuration: this.weapon.stunDuration || 0
            };
            this.scene.add(proj);
            this.projectiles.push(proj);
        }

        if (this.weapon.ammo <= 0) {
            this.weapon = null;
            this.updateWeaponUI();
        }
    }

    activatePowerUp() {
        const powerUp = this.weapon;

        if (powerUp.name === 'INVINCIBILITY') {
            this.isInvincible = true;
            this.invincibleTimer = powerUp.duration;
            this.createInvincibilityAura();
            this.showNotification('🌟 INVINCIBLE! 🌟', 'power');
        }
        else if (powerUp.name === 'Force Shield') {
            this.hasShield = true;
            this.shieldHits = powerUp.hits;
            this.createShieldEffect();
            this.showNotification('🛡️ Shield Active!', 'power');
        }
        else if (powerUp.name === 'TURBO BOOST') {
            this.speedBoostActive = true;
            this.speedBoostTimer = powerUp.duration;
            this.baseSpeed = 35 * powerUp.speedMultiplier;
            this.showNotification('⚡ TURBO BOOST! ⚡', 'boost');
        }

        this.weapon = null;
        this.updateWeaponUI();
    }

    createInvincibilityAura() {
        if (this.playerAura) {
            this.player.remove(this.playerAura);
        }

        const aura = new THREE.Mesh(
            new THREE.SphereGeometry(4, 16, 16),
            new THREE.MeshBasicMaterial({
                color: 0xFFD700,
                transparent: true,
                opacity: 0.4,
                side: THREE.DoubleSide
            })
        );
        aura.position.y = 1;
        this.player.add(aura);
        this.playerAura = aura;
    }

    createShieldEffect() {
        if (this.shieldMesh) {
            this.player.remove(this.shieldMesh);
        }

        const shield = new THREE.Mesh(
            new THREE.SphereGeometry(3.5, 24, 24),
            new THREE.MeshBasicMaterial({
                color: 0x00CED1,
                transparent: true,
                opacity: 0.3,
                wireframe: true
            })
        );
        shield.position.y = 1;
        this.player.add(shield);
        this.shieldMesh = shield;
    }

    updateProjectiles(delta) {
        const toRemove = [];

        this.projectiles.forEach((proj, idx) => {
            // GRENADE - Apply gravity arc
            if (proj.userData.type === 'grenade') {
                proj.position.x += proj.userData.velocity.x * delta;
                proj.position.y += proj.userData.velocity.y * delta;
                proj.position.z += proj.userData.velocity.z * delta;

                // Apply gravity
                proj.userData.velocity.y -= 30 * delta;
                proj.userData.life -= delta;

                // Explode on ground hit or timeout
                if (proj.position.y <= 0.5 || proj.userData.life <= 0) {
                    this.createExplosion(proj.position.x, 1, proj.position.z);

                    // Area damage
                    this.aiKarts.forEach(ai => {
                        if (ai.userData.health <= 0) return;
                        const dx = proj.position.x - ai.position.x;
                        const dz = proj.position.z - ai.position.z;
                        const dist = Math.sqrt(dx * dx + dz * dz);
                        if (dist < proj.userData.blastRadius) {
                            const damage = proj.userData.damage * (1 - dist / proj.userData.blastRadius);
                            ai.userData.health -= damage;
                            if (ai.userData.health <= 0) {
                                this.kills++;
                                ai.visible = false;
                                this.showNotification(`🔥 BOOM! ${ai.userData.name}!`, 'kill');
                                setTimeout(() => {
                                    ai.userData.health = 100;
                                    ai.visible = true;
                                    const angle = Math.random() * Math.PI * 2;
                                    ai.position.set(Math.cos(angle) * 50, 0, Math.sin(angle) * 50);
                                }, 3000);
                            }
                        }
                    });
                    toRemove.push(idx);
                    return;
                }
            }

            // MINE - Check if AI/player runs over it
            else if (proj.userData.type === 'mine') {
                proj.userData.timer -= delta;

                // Blink light
                if (proj.userData.light) {
                    proj.userData.light.visible = Math.sin(Date.now() * 0.01) > 0;
                }

                if (proj.userData.timer <= 0) {
                    toRemove.push(idx);
                    return;
                }

                // Check AI collision
                this.aiKarts.forEach(ai => {
                    if (ai.userData.health <= 0) return;
                    const dx = proj.position.x - ai.position.x;
                    const dz = proj.position.z - ai.position.z;
                    if (Math.sqrt(dx * dx + dz * dz) < 3) {
                        ai.userData.health -= proj.userData.damage;
                        this.createExplosion(proj.position.x, 1, proj.position.z);
                        toRemove.push(idx);

                        if (ai.userData.health <= 0) {
                            this.kills++;
                            ai.visible = false;
                            this.showNotification(`💣 ${ai.userData.name} hit mine!`, 'kill');
                            setTimeout(() => {
                                ai.userData.health = 100;
                                ai.visible = true;
                                const angle = Math.random() * Math.PI * 2;
                                ai.position.set(Math.cos(angle) * 50, 0, Math.sin(angle) * 50);
                            }, 3000);
                        }
                    }
                });
            }

            // PROJECTILE - Standard + homing
            else if (proj.userData.type === 'projectile') {
                // Homing logic
                if (proj.userData.homing) {
                    let closest = null;
                    let closestDist = 80;

                    this.aiKarts.forEach(ai => {
                        if (ai.userData.health <= 0 || !ai.visible) return;
                        const dx = ai.position.x - proj.position.x;
                        const dz = ai.position.z - proj.position.z;
                        const dist = Math.sqrt(dx * dx + dz * dz);
                        if (dist < closestDist) {
                            closestDist = dist;
                            closest = ai;
                        }
                    });

                    if (closest) {
                        const dx = closest.position.x - proj.position.x;
                        const dz = closest.position.z - proj.position.z;
                        const targetAngle = Math.atan2(dx, dz);
                        const currentAngle = Math.atan2(proj.userData.velocity.x, proj.userData.velocity.z);

                        // Smooth turn toward target
                        let angleDiff = targetAngle - currentAngle;
                        if (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
                        if (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

                        const newAngle = currentAngle + angleDiff * 3 * delta;
                        const speed = Math.sqrt(proj.userData.velocity.x ** 2 + proj.userData.velocity.z ** 2);
                        proj.userData.velocity.x = Math.sin(newAngle) * speed;
                        proj.userData.velocity.z = Math.cos(newAngle) * speed;

                        proj.rotation.y = newAngle;
                    }
                }

                proj.position.x += proj.userData.velocity.x * delta;
                proj.position.z += proj.userData.velocity.z * delta;
                proj.userData.life -= delta;

                if (proj.userData.life <= 0) {
                    toRemove.push(idx);
                    return;
                }

                // Check hit AI
                this.aiKarts.forEach(ai => {
                    if (ai.userData.health <= 0 || !ai.visible) return;
                    const dx = proj.position.x - ai.position.x;
                    const dz = proj.position.z - ai.position.z;
                    const distance = Math.sqrt(dx * dx + dz * dz);

                    if (distance < 4.5) {
                        ai.userData.health -= proj.userData.damage;
                        toRemove.push(idx);
                        this.createExplosion(proj.position.x, 1.5, proj.position.z);
                        this.showNotification(`💥 Hit! -${proj.userData.damage} HP`, 'damage');

                        if (ai.userData.health <= 0) {
                            this.kills++;
                            ai.visible = false;
                            this.showNotification(`🔥 You SMASHED ${ai.userData.name}!`, 'kill');
                            setTimeout(() => {
                                ai.userData.health = 100;
                                ai.visible = true;
                                const angle = Math.random() * Math.PI * 2;
                                ai.position.set(Math.cos(angle) * 50, 0, Math.sin(angle) * 50);
                            }, 3000);
                        }
                    }
                });
            }
        });

        toRemove.reverse().forEach(idx => {
            this.scene.remove(this.projectiles[idx]);
            this.projectiles.splice(idx, 1);
        });
    }

    updatePowerUps(delta) {
        // Invincibility timer
        if (this.isInvincible) {
            this.invincibleTimer -= delta;

            // Pulse aura
            if (this.playerAura) {
                this.playerAura.scale.setScalar(1 + Math.sin(Date.now() * 0.01) * 0.2);
                this.playerAura.material.opacity = 0.3 + Math.sin(Date.now() * 0.015) * 0.2;
            }

            // Kill on contact
            this.aiKarts.forEach(ai => {
                if (ai.userData.health <= 0 || !ai.visible) return;
                const dx = this.player.position.x - ai.position.x;
                const dz = this.player.position.z - ai.position.z;
                if (Math.sqrt(dx * dx + dz * dz) < 5) {
                    ai.userData.health = 0;
                    ai.visible = false;
                    this.kills++;
                    this.createExplosion(ai.position.x, 1, ai.position.z);
                    this.showNotification(`🌟 CRUSHED ${ai.userData.name}!`, 'kill');
                    setTimeout(() => {
                        ai.userData.health = 100;
                        ai.visible = true;
                        const angle = Math.random() * Math.PI * 2;
                        ai.position.set(Math.cos(angle) * 50, 0, Math.sin(angle) * 50);
                    }, 3000);
                }
            });

            if (this.invincibleTimer <= 0) {
                this.isInvincible = false;
                if (this.playerAura) {
                    this.player.remove(this.playerAura);
                    this.playerAura = null;
                }
                this.showNotification('Invincibility ended');
            }
        }

        // Speed boost timer
        if (this.speedBoostActive) {
            this.speedBoostTimer -= delta;
            if (this.speedBoostTimer <= 0) {
                this.speedBoostActive = false;
                this.baseSpeed = 35;
                this.showNotification('Boost ended');
            }
        }

        // Shield pulse
        if (this.hasShield && this.shieldMesh) {
            this.shieldMesh.rotation.y += delta * 2;
        }
    }

    takeDamage(amount) {
        // Invincible - no damage
        if (this.isInvincible) return;

        // Shield absorbs hit
        if (this.hasShield && this.shieldHits > 0) {
            this.shieldHits--;
            this.showNotification('🛡️ Shield absorbed hit!');
            if (this.shieldHits <= 0) {
                this.hasShield = false;
                if (this.shieldMesh) {
                    this.player.remove(this.shieldMesh);
                    this.shieldMesh = null;
                }
                this.showNotification('Shield broken!', 'danger');
            }
            return;
        }

        this.health = Math.max(0, this.health - amount);
        if (this.health <= 0) {
            this.respawnPlayer();
        }
    }

    respawnPlayer() {
        this.health = 100;
        const angle = Math.random() * Math.PI * 2;
        this.player.position.set(Math.cos(angle) * 30, 0, Math.sin(angle) * 30);
        this.playerSpeed = 0;

        // Clear power-ups on death
        this.isInvincible = false;
        this.hasShield = false;
        this.speedBoostActive = false;
        this.baseSpeed = 35;
        if (this.playerAura) { this.player.remove(this.playerAura); this.playerAura = null; }
        if (this.shieldMesh) { this.player.remove(this.shieldMesh); this.shieldMesh = null; }

        this.showNotification('💀 Respawned!', 'danger');
    }

    togglePause() {
        const pauseMenu = document.getElementById('pause-menu');

        if (this.state === 'playing') {
            this.state = 'paused';
            if (pauseMenu) pauseMenu.classList.remove('hidden');
        } else if (this.state === 'paused') {
            this.state = 'playing';
            if (pauseMenu) pauseMenu.classList.add('hidden');
        }
    }

    // Create explosion visual effect
    createExplosion(x, y, z) {
        const particleCount = 15;
        const particles = [];

        for (let i = 0; i < particleCount; i++) {
            const geo = new THREE.SphereGeometry(0.3, 6, 6);
            const mat = new THREE.MeshBasicMaterial({
                color: Math.random() > 0.5 ? 0xFF4500 : 0xFFD700
            });
            const particle = new THREE.Mesh(geo, mat);
            particle.position.set(x, y, z);

            const angle = (i / particleCount) * Math.PI * 2;
            const speed = 10 + Math.random() * 10;
            particle.userData = {
                vx: Math.cos(angle) * speed,
                vy: 3 + Math.random() * 5,
                vz: Math.sin(angle) * speed,
                life: 0.8
            };

            this.scene.add(particle);
            particles.push(particle);
        }

        // Animate and remove
        const animateExplosion = () => {
            let allDead = true;
            particles.forEach(p => {
                if (p.userData.life > 0) {
                    allDead = false;
                    p.userData.life -= 0.02;
                    p.position.x += p.userData.vx * 0.016;
                    p.position.y += p.userData.vy * 0.016;
                    p.position.z += p.userData.vz * 0.016;
                    p.userData.vy -= 15 * 0.016; // Gravity
                    p.scale.setScalar(p.userData.life);
                }
            });

            if (!allDead) {
                requestAnimationFrame(animateExplosion);
            } else {
                particles.forEach(p => {
                    this.scene.remove(p);
                    p.geometry.dispose();
                    p.material.dispose();
                });
            }
        };
        animateExplosion();
    }

    // Car-to-car collision detection
    checkCarCollisions() {
        if (!this.player) return;

        const playerRadius = 2.5;
        const aiRadius = 2.5;

        this.aiKarts.forEach(ai => {
            if (ai.userData.health <= 0 || !ai.visible) return;

            const dx = this.player.position.x - ai.position.x;
            const dz = this.player.position.z - ai.position.z;
            const distance = Math.sqrt(dx * dx + dz * dz);
            const minDist = playerRadius + aiRadius;

            if (distance < minDist && distance > 0) {
                // Collision! Push apart
                const overlap = minDist - distance;
                const nx = dx / distance;
                const nz = dz / distance;

                // Push player back
                this.player.position.x += nx * overlap * 0.6;
                this.player.position.z += nz * overlap * 0.6;

                // Push AI back
                ai.position.x -= nx * overlap * 0.4;
                ai.position.z -= nz * overlap * 0.4;

                // Bounce effect
                this.playerSpeed *= -0.3;

                // Small damage on collision
                if (Math.abs(this.playerSpeed) > 15) {
                    this.takeDamage(5);
                    ai.userData.health -= 5;
                }
            }
        });

        // AI-to-AI collisions
        for (let i = 0; i < this.aiKarts.length; i++) {
            for (let j = i + 1; j < this.aiKarts.length; j++) {
                const ai1 = this.aiKarts[i];
                const ai2 = this.aiKarts[j];

                if (ai1.userData.health <= 0 || ai2.userData.health <= 0) continue;

                const dx = ai1.position.x - ai2.position.x;
                const dz = ai1.position.z - ai2.position.z;
                const distance = Math.sqrt(dx * dx + dz * dz);

                if (distance < 5 && distance > 0) {
                    const nx = dx / distance;
                    const nz = dz / distance;
                    const overlap = 5 - distance;

                    ai1.position.x += nx * overlap * 0.5;
                    ai1.position.z += nz * overlap * 0.5;
                    ai2.position.x -= nx * overlap * 0.5;
                    ai2.position.z -= nz * overlap * 0.5;
                }
            }
        }
    }

    // ═══════════════════════════════════════════════════════
    // UI UPDATES
    // ═══════════════════════════════════════════════════════

    updateHUD() {
        // Timer
        const timerEl = document.getElementById('timer-text');
        if (timerEl) {
            const mins = Math.floor(this.gameTime / 60);
            const secs = Math.floor(this.gameTime % 60);
            timerEl.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
            timerEl.style.color = this.gameTime < 30 ? '#FF4757' : '#fff';
        }

        // Health
        const healthFill = document.getElementById('health-fill');
        const healthText = document.getElementById('health-text');
        if (healthFill) {
            healthFill.style.width = this.health + '%';
            healthFill.style.background = this.health < 30 ? '#FF4757' : '#7FFF00';
        }
        if (healthText) healthText.textContent = this.health + '%';

        // Rank
        const rankEl = document.getElementById('rank-pos');
        const aliveAI = this.aiKarts.filter(ai => ai.userData.health > 0).length;
        const rank = aliveAI + 1 - this.kills;
        const rankPos = Math.max(1, Math.min(12, 12 - this.kills));
        if (rankEl) {
            const suffix = ['st', 'nd', 'rd'][rankPos - 1] || 'th';
            rankEl.textContent = rankPos + suffix;
        }

        // Leaderboard
        const leaderboard = document.getElementById('leaderboard-list');
        if (leaderboard) {
            const players = [
                { name: 'You', kills: this.kills, isPlayer: true },
                ...this.aiKarts.map(ai => ({ name: ai.userData.name, kills: ai.userData.kills || 0 }))
            ].sort((a, b) => b.kills - a.kills).slice(0, 5);

            leaderboard.innerHTML = players.map((p, i) => `
                <div style="display:flex;justify-content:space-between;padding:3px 6px;background:${p.isPlayer ? 'rgba(74,158,255,0.3)' : 'transparent'};border-radius:4px;margin:2px 0;font-size:0.8rem;">
                    <span>${i + 1}. ${p.name}</span>
                    <span style="color:#7FFF00">${p.kills}</span>
                </div>
            `).join('');
        }
    }

    updateWeaponUI() {
        const iconEl = document.getElementById('weapon-icon');
        const nameEl = document.getElementById('weapon-name');
        const ammoEl = document.getElementById('weapon-ammo');
        const fireBtn = document.getElementById('fire-button');

        if (this.weapon) {
            if (iconEl) iconEl.textContent = this.weapon.icon;
            if (nameEl) nameEl.textContent = this.weapon.name;
            if (ammoEl) ammoEl.textContent = `${this.weapon.ammo} / ${this.weapon.ammo}`;
            // Show fire button when weapon available
            if (fireBtn) fireBtn.classList.remove('hidden');
        } else {
            if (iconEl) iconEl.textContent = '❓';
            if (nameEl) nameEl.textContent = 'No Weapon';
            if (ammoEl) ammoEl.textContent = '--';
            // Hide fire button when no weapon
            if (fireBtn) fireBtn.classList.add('hidden');
        }
    }

    showNotification(text, type = 'default') {
        const notif = document.createElement('div');
        notif.className = 'game-notification';
        notif.style.cssText = `
            position: fixed;
            top: 35%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: 'Orbitron', sans-serif;
            font-size: 1.8rem;
            font-weight: bold;
            color: ${type === 'kill' ? '#FF4757' : type === 'boost' ? '#FFA500' : type === 'danger' ? '#FF4757' : '#7FFF00'};
            text-shadow: 0 0 20px rgba(0,0,0,0.9), 0 0 40px currentColor;
            z-index: 1000;
            pointer-events: none;
            animation: notifAnim 1.5s forwards;
        `;
        notif.textContent = text;
        document.body.appendChild(notif);
        setTimeout(() => notif.remove(), 1500);
    }

    // ═══════════════════════════════════════════════════════
    // ANIMATION LOOP
    // ═══════════════════════════════════════════════════════

    animate() {
        requestAnimationFrame(() => this.animate());

        const delta = Math.min(this.clock.getDelta(), 0.1);
        const elapsed = this.clock.getElapsedTime();

        if (this.state === 'playing') {
            this.gameTime -= delta;
            if (this.gameTime <= 0) {
                this.gameTime = 0;
                this.state = 'gameover';
                this.showNotification('🏁 TIME UP!');
            }

            this.updatePlayer(delta);
            this.updateAI(delta);
            this.checkCarCollisions();
            this.updateProjectiles(delta);
            this.updatePowerUps(delta); // Power-up timers and effects
        }

        this.updateCamera();

        // Animate item boxes
        this.itemBoxes.forEach(box => {
            if (box.userData.active) {
                box.rotation.y = elapsed * 2 + box.userData.offset;
                box.position.y = 2.5 + Math.sin(elapsed * 3 + box.userData.offset) * 0.3;
            }
        });

        // Update HUD
        if (this.state === 'playing') {
            this.updateHUD();
        }

        // FPS
        const fps = document.getElementById('fps-counter');
        if (fps) fps.textContent = Math.round(1 / Math.max(delta, 0.001)) + ' FPS';

        // ═══ RENDER WITH POST-PROCESSING ═══
        if (this.composer) {
            this.composer.render();
        } else {
            this.renderer.render(this.scene, this.camera);
        }
    }
}

// Add notification animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes notifAnim {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
        20% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
        80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -60%) scale(1); }
    }
`;
document.head.appendChild(style);

// Start game
document.addEventListener('DOMContentLoaded', () => {
    window.game = new SmashKarts3D();
});
