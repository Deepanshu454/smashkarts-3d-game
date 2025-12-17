/**
 * SMASH KARTS 3D - Lighting System
 * Dynamic lighting with shadows and theme support
 */

class LightingSystem {
    constructor(scene) {
        this.scene = scene;
        this.lights = {};

        // Default lighting preset
        this.preset = null;

        this.init();
    }

    /**
     * Initialize default lighting
     */
    init() {
        // Ambient light for base illumination
        this.lights.ambient = new THREE.AmbientLight(0xffffff, 0.3);
        this.scene.add(this.lights.ambient);

        // Hemisphere light for sky/ground color
        this.lights.hemisphere = new THREE.HemisphereLight(
            0x87CEEB, // Sky color
            0xF4D03F, // Ground color
            0.6
        );
        this.scene.add(this.lights.hemisphere);

        // Directional light (sun) with shadows
        this.lights.sun = new THREE.DirectionalLight(0xffffff, 0.8);
        this.lights.sun.position.set(50, 80, 30);
        this.lights.sun.castShadow = true;

        // Shadow configuration
        this.lights.sun.shadow.mapSize.width = 2048;
        this.lights.sun.shadow.mapSize.height = 2048;
        this.lights.sun.shadow.camera.near = 0.5;
        this.lights.sun.shadow.camera.far = 300;
        this.lights.sun.shadow.camera.left = -100;
        this.lights.sun.shadow.camera.right = 100;
        this.lights.sun.shadow.camera.top = 100;
        this.lights.sun.shadow.camera.bottom = -100;
        this.lights.sun.shadow.bias = -0.0001;
        this.lights.sun.shadow.normalBias = 0.02;

        this.scene.add(this.lights.sun);

        // Point lights array for effects
        this.pointLights = [];

        console.log('[LightingSystem] Lighting initialized with shadows');
    }

    /**
     * Apply theme-specific lighting
     */
    applyTheme(themeConfig) {
        const theme = themeConfig || {};
        this.preset = theme.name || 'default';

        // Update hemisphere light
        if (theme.skyColor) {
            this.lights.hemisphere.color.set(theme.skyColor);
        }
        if (theme.groundColor) {
            this.lights.hemisphere.groundColor.set(theme.groundColor);
        }
        if (theme.hemisphereIntensity !== undefined) {
            this.lights.hemisphere.intensity = theme.hemisphereIntensity;
        }

        // Update ambient
        if (theme.ambientIntensity !== undefined) {
            this.lights.ambient.intensity = theme.ambientIntensity;
        }
        if (theme.ambientColor) {
            this.lights.ambient.color.set(theme.ambientColor);
        }

        // Update sun/directional
        if (theme.sunColor) {
            this.lights.sun.color.set(theme.sunColor);
        }
        if (theme.sunIntensity !== undefined) {
            this.lights.sun.intensity = theme.sunIntensity;
        }
        if (theme.sunPosition) {
            this.lights.sun.position.set(
                theme.sunPosition.x,
                theme.sunPosition.y,
                theme.sunPosition.z
            );
        }

        // Toggle shadows
        if (theme.shadows !== undefined) {
            this.lights.sun.castShadow = theme.shadows;
        }

        console.log(`[LightingSystem] Applied theme: ${this.preset}`);
    }

    /**
     * Add point light (for lava, neon, etc.)
     */
    addPointLight(x, y, z, color, intensity = 1, distance = 20) {
        const light = new THREE.PointLight(color, intensity, distance);
        light.position.set(x, y, z);
        this.scene.add(light);
        this.pointLights.push(light);
        return light;
    }

    /**
     * Remove all point lights
     */
    clearPointLights() {
        this.pointLights.forEach(light => {
            this.scene.remove(light);
            light.dispose && light.dispose();
        });
        this.pointLights = [];
    }

    /**
     * Get preset configurations
     */
    static getPresets() {
        return {
            tropical: {
                name: 'tropical',
                skyColor: 0x87CEEB,
                groundColor: 0xF4D03F,
                hemisphereIntensity: 0.7,
                ambientIntensity: 0.3,
                sunColor: 0xFFF4E6,
                sunIntensity: 0.9,
                sunPosition: { x: 50, y: 80, z: 30 },
                shadows: true
            },
            volcanic: {
                name: 'volcanic',
                skyColor: 0x1a0a0a,
                groundColor: 0xFF4500,
                hemisphereIntensity: 0.3,
                ambientIntensity: 0.1,
                ambientColor: 0xFF4500,
                sunColor: 0xFF6600,
                sunIntensity: 0.4,
                sunPosition: { x: 30, y: 60, z: 0 },
                shadows: true
            },
            space: {
                name: 'space',
                skyColor: 0x000022,
                groundColor: 0x4A148C,
                hemisphereIntensity: 0.2,
                ambientIntensity: 0.1,
                ambientColor: 0x4A148C,
                sunColor: 0x00BCD4,
                sunIntensity: 0.5,
                sunPosition: { x: -50, y: 100, z: 50 },
                shadows: false
            },
            graveyard: {
                name: 'graveyard',
                skyColor: 0x1a1a2e,
                groundColor: 0x2C3E50,
                hemisphereIntensity: 0.2,
                ambientIntensity: 0.1,
                ambientColor: 0x4A5568,
                sunColor: 0xC0C0FF,
                sunIntensity: 0.3,
                sunPosition: { x: -30, y: 50, z: -30 },
                shadows: true
            },
            candy: {
                name: 'candy',
                skyColor: 0xFFE4E1,
                groundColor: 0xFFB6C1,
                hemisphereIntensity: 0.8,
                ambientIntensity: 0.4,
                sunColor: 0xFFFFFF,
                sunIntensity: 0.8,
                sunPosition: { x: 40, y: 70, z: 40 },
                shadows: true
            }
        };
    }

    /**
     * Animate lights (for effects)
     */
    update(deltaTime, elapsed) {
        // Animate point lights (e.g., lava flicker)
        this.pointLights.forEach((light, i) => {
            if (light.userData.flicker) {
                light.intensity = light.userData.baseIntensity *
                    (0.8 + Math.sin(elapsed * 5 + i) * 0.2);
            }
        });
    }
}

// Export
window.LightingSystem = LightingSystem;
