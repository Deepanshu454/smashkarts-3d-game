/**
 * SMASH KARTS 3D - Map Generator
 * Main orchestrator for generating themed maps
 */

class MapGenerator {
    constructor(sceneManager) {
        this.sceneManager = sceneManager;
        this.scene = sceneManager.scene;
        this.terrainBuilder = new TerrainBuilder(this.scene);
        this.propFactory = new PropFactory(this.scene);

        this.currentMap = null;
        this.spawnPoints = [];
        this.itemBoxPositions = [];
        this.boostPadPositions = [];
    }

    /**
     * Get all available maps
     */
    static getMaps() {
        return {
            smashIsland: {
                id: 'smashIsland',
                name: 'Smash Island',
                icon: '🏝️',
                description: 'Tropical beach paradise',
                type: 'island',
                radius: 100,
                colors: {
                    sky: 0x87CEEB,
                    water: 0x00CED1,
                    sand: 0xF4D03F,
                    grass: 0x7FFF00,
                    track: 0xFF6B35
                },
                lighting: 'tropical',
                props: ['palmTrees', 'rocks', 'itemBoxes', 'boostPads']
            },
            lavaPit: {
                id: 'lavaPit',
                name: 'Lava Pit',
                icon: '🌋',
                description: 'Dangerous volcanic arena',
                type: 'volcanic',
                radius: 90,
                colors: {
                    sky: 0x1a0a0a,
                    rock: 0x2C3E50,
                    lava: 0xFF4500,
                    crystal: 0xFF6600
                },
                lighting: 'volcanic',
                props: ['rocks', 'crystals', 'itemBoxes', 'boostPads']
            },
            skyDropzone: {
                id: 'skyDropzone',
                name: 'Sky Dropzone',
                icon: '🌌',
                description: 'Floating platforms in the sky',
                type: 'platforms',
                colors: {
                    sky: 0x1A1A2E,
                    platform: 0x7F8C8D,
                    platformAlt: 0xBDC3C7,
                    accent: 0x00D9FF
                },
                lighting: 'space',
                props: ['itemBoxes', 'boostPads']
            },
            graveyard: {
                id: 'graveyard',
                name: 'The Graveyard',
                icon: '⚰️',
                description: 'Spooky haunted cemetery',
                type: 'graveyard',
                size: 150,
                colors: {
                    sky: 0x1a1a2e,
                    ground: 0x2C3E50,
                    water: 0x1C1C1C,
                    tombstone: 0xECF0F1
                },
                lighting: 'graveyard',
                props: ['tombstones', 'deadTrees', 'itemBoxes']
            },
            spaceStation: {
                id: 'spaceStation',
                name: 'Space Station',
                icon: '🚀',
                description: 'Futuristic orbital arena',
                type: 'platforms',
                colors: {
                    sky: 0x000022,
                    platform: 0x566573,
                    platformAlt: 0x85929E,
                    accent: 0x9B59B6
                },
                lighting: 'space',
                props: ['crystals', 'itemBoxes', 'boostPads']
            }
        };
    }

    /**
     * Generate a map by ID
     */
    generate(mapId) {
        const maps = MapGenerator.getMaps();
        const config = maps[mapId];

        if (!config) {
            console.error(`[MapGenerator] Unknown map: ${mapId}`);
            return null;
        }

        console.log(`[MapGenerator] Generating map: ${config.name}`);

        // Clear existing
        this.clear();
        this.currentMap = config;

        // Set theme colors
        this.sceneManager.setTheme(config.colors.sky);

        // Generate terrain based on type
        switch (config.type) {
            case 'island':
                this.generateIsland(config);
                break;
            case 'volcanic':
                this.generateVolcanic(config);
                break;
            case 'platforms':
                this.generatePlatforms(config);
                break;
            case 'graveyard':
                this.generateGraveyard(config);
                break;
            default:
                this.generateIsland(config);
        }

        // Generate props
        this.generateProps(config);

        // Create skybox
        this.createSkybox(config);

        console.log(`[MapGenerator] Map generated with ${this.itemBoxPositions.length} item boxes`);

        return config;
    }

    /**
     * Generate tropical island map
     */
    generateIsland(config) {
        const radius = config.radius || 100;

        // Create water
        this.terrainBuilder.createWater(radius * 5, config.colors.water);

        // Create island terrain
        this.terrainBuilder.buildIsland({
            radius: radius,
            colors: config.colors
        });

        // Generate spawn points in a circle
        this.spawnPoints = [];
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            const dist = radius * 0.6;
            this.spawnPoints.push({
                x: Math.cos(angle) * dist,
                y: 1,
                z: Math.sin(angle) * dist
            });
        }

        // Item box positions
        this.itemBoxPositions = [];
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2 + 0.2;
            const dist = radius * 0.5;
            this.itemBoxPositions.push({
                x: Math.cos(angle) * dist,
                y: 0,
                z: Math.sin(angle) * dist
            });
        }

        // Boost pad positions
        this.boostPadPositions = [];
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const dist = radius * 0.7;
            this.boostPadPositions.push({
                x: Math.cos(angle) * dist,
                z: Math.sin(angle) * dist,
                rotation: angle + Math.PI / 2
            });
        }
    }

    /**
     * Generate volcanic map
     */
    generateVolcanic(config) {
        this.terrainBuilder.buildVolcanic({
            radius: config.radius,
            colors: config.colors
        });

        // Spawn points avoiding lava
        this.spawnPoints = [];
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            const dist = config.radius * 0.6;
            const offset = (i % 2 === 0) ? 0.3 : -0.3;
            this.spawnPoints.push({
                x: Math.cos(angle + offset) * dist,
                y: 0.5,
                z: Math.sin(angle + offset) * dist
            });
        }

        this.itemBoxPositions = this.spawnPoints.slice(0, 8).map(p => ({
            x: p.x * 0.7,
            y: 0,
            z: p.z * 0.7
        }));
    }

    /**
     * Generate platform map
     */
    generatePlatforms(config) {
        const platforms = [
            // Main platform
            { x: 0, y: 0, z: 0, width: 60, depth: 60, height: 2, type: 'main' },
            // Corner platforms
            { x: 50, y: 5, z: 50, width: 25, depth: 25, height: 2, type: 'secondary' },
            { x: -50, y: 5, z: 50, width: 25, depth: 25, height: 2, type: 'secondary' },
            { x: 50, y: 5, z: -50, width: 25, depth: 25, height: 2, type: 'secondary' },
            { x: -50, y: 5, z: -50, width: 25, depth: 25, height: 2, type: 'secondary' },
            // Bridges
            { x: 35, y: 2.5, z: 0, width: 10, depth: 30, height: 1, type: 'bridge' },
            { x: -35, y: 2.5, z: 0, width: 10, depth: 30, height: 1, type: 'bridge' },
            { x: 0, y: 2.5, z: 35, width: 30, depth: 10, height: 1, type: 'bridge' },
            { x: 0, y: 2.5, z: -35, width: 30, depth: 10, height: 1, type: 'bridge' }
        ];

        this.terrainBuilder.buildPlatforms({
            platforms: platforms,
            colors: config.colors
        });

        // Spawn points on platforms
        this.spawnPoints = [
            { x: 0, y: 3, z: 0 },
            { x: 20, y: 3, z: 20 },
            { x: -20, y: 3, z: 20 },
            { x: 20, y: 3, z: -20 },
            { x: -20, y: 3, z: -20 },
            { x: 50, y: 8, z: 50 },
            { x: -50, y: 8, z: 50 },
            { x: 50, y: 8, z: -50 },
            { x: -50, y: 8, z: -50 }
        ];

        this.itemBoxPositions = this.spawnPoints.map(p => ({
            x: p.x,
            y: p.y,
            z: p.z
        }));
    }

    /**
     * Generate graveyard map
     */
    generateGraveyard(config) {
        this.terrainBuilder.buildGraveyard({
            size: config.size,
            colors: config.colors
        });

        // Spawn points
        this.spawnPoints = [];
        for (let i = 0; i < 12; i++) {
            this.spawnPoints.push({
                x: (Math.random() - 0.5) * config.size * 0.8,
                y: 0.5,
                z: (Math.random() - 0.5) * config.size * 0.8
            });
        }

        this.itemBoxPositions = this.spawnPoints.slice(0, 8);
    }

    /**
     * Generate props based on config
     */
    generateProps(config) {
        const props = config.props || [];

        // Palm trees
        if (props.includes('palmTrees')) {
            const treePositions = [];
            for (let i = 0; i < 12; i++) {
                const angle = (i / 12) * Math.PI * 2;
                const dist = (config.radius || 100) * 0.8;
                treePositions.push({
                    x: Math.cos(angle) * dist + (Math.random() - 0.5) * 10,
                    z: Math.sin(angle) * dist + (Math.random() - 0.5) * 10
                });
            }
            this.propFactory.createPalmTrees(treePositions, {
                leafColor: 0x32CD32,
                trunkColor: 0x8B4513
            });
        }

        // Rocks
        if (props.includes('rocks')) {
            const rockPositions = [];
            for (let i = 0; i < 15; i++) {
                rockPositions.push({
                    x: (Math.random() - 0.5) * (config.radius || 100) * 1.5,
                    z: (Math.random() - 0.5) * (config.radius || 100) * 1.5
                });
            }
            this.propFactory.createRocks(rockPositions, {
                color: config.colors.rock || 0x696969
            });
        }

        // Tombstones
        if (props.includes('tombstones')) {
            const tombPositions = [];
            for (let i = 0; i < 30; i++) {
                tombPositions.push({
                    x: (Math.random() - 0.5) * (config.size || 150) * 0.8,
                    z: (Math.random() - 0.5) * (config.size || 150) * 0.8
                });
            }
            this.propFactory.createTombstones(tombPositions, {
                color: config.colors.tombstone || 0xECF0F1
            });
        }

        // Dead trees
        if (props.includes('deadTrees')) {
            const treePositions = [];
            for (let i = 0; i < 10; i++) {
                treePositions.push({
                    x: (Math.random() - 0.5) * (config.size || 150),
                    z: (Math.random() - 0.5) * (config.size || 150)
                });
            }
            this.propFactory.createDeadTrees(treePositions);
        }

        // Crystals
        if (props.includes('crystals')) {
            const crystalPositions = [];
            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2;
                const dist = (config.radius || 80) * 0.7;
                crystalPositions.push({
                    x: Math.cos(angle) * dist,
                    z: Math.sin(angle) * dist
                });
            }
            this.propFactory.createCrystals(crystalPositions, {
                color: config.colors.crystal || 0xE040FB
            });
        }

        // Item boxes
        if (props.includes('itemBoxes') && this.itemBoxPositions.length > 0) {
            this.propFactory.createItemBoxes(this.itemBoxPositions);
        }

        // Boost pads
        if (props.includes('boostPads') && this.boostPadPositions.length > 0) {
            this.propFactory.createBoostPads(this.boostPadPositions);
        }
    }

    /**
     * Create gradient skybox
     */
    createSkybox(config) {
        const topColor = config.colors.sky || 0x87CEEB;
        const bottomColor = this.lightenColor(topColor, 0.3);
        this.sceneManager.createGradientSky(
            '#' + topColor.toString(16).padStart(6, '0'),
            '#' + bottomColor.toString(16).padStart(6, '0')
        );
    }

    /**
     * Lighten a color
     */
    lightenColor(color, amount) {
        const r = Math.min(255, ((color >> 16) & 255) + Math.floor(255 * amount));
        const g = Math.min(255, ((color >> 8) & 255) + Math.floor(255 * amount));
        const b = Math.min(255, (color & 255) + Math.floor(255 * amount));
        return (r << 16) | (g << 8) | b;
    }

    /**
     * Update animated elements
     */
    update(elapsed) {
        this.propFactory.update(elapsed);
    }

    /**
     * Get random spawn point
     */
    getSpawnPoint() {
        if (this.spawnPoints.length === 0) return { x: 0, y: 1, z: 0 };
        return this.spawnPoints[Math.floor(Math.random() * this.spawnPoints.length)];
    }

    /**
     * Clear current map
     */
    clear() {
        this.terrainBuilder.dispose();
        this.propFactory.dispose();
        this.sceneManager.clear();
        this.spawnPoints = [];
        this.itemBoxPositions = [];
        this.boostPadPositions = [];
        this.currentMap = null;
    }
}

// Export
window.MapGenerator = MapGenerator;
