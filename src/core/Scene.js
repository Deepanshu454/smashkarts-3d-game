/**
 * SMASH KARTS 3D - Scene Manager
 * Core Three.js scene setup with optimized settings
 */

class SceneManager {
    constructor() {
        this.scene = null;
        this.clock = null;
        this.objects = new Map();
        this.updateCallbacks = [];

        this.init();
    }

    /**
     * Initialize the Three.js scene
     */
    init() {
        // Create scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87CEEB);

        // Enable fog for depth
        this.scene.fog = new THREE.Fog(0x87CEEB, 100, 500);

        // Clock for animations
        this.clock = new THREE.Clock();

        console.log('[SceneManager] Scene initialized');
    }

    /**
     * Set sky/fog colors based on theme
     */
    setTheme(skyColor, fogColor, fogNear = 100, fogFar = 500) {
        this.scene.background = new THREE.Color(skyColor);
        this.scene.fog = new THREE.Fog(fogColor || skyColor, fogNear, fogFar);
    }

    /**
     * Add object to scene with tracking
     */
    add(object, id = null) {
        this.scene.add(object);
        if (id) {
            this.objects.set(id, object);
        }
        return object;
    }

    /**
     * Remove object from scene
     */
    remove(idOrObject) {
        let object = idOrObject;

        if (typeof idOrObject === 'string') {
            object = this.objects.get(idOrObject);
            this.objects.delete(idOrObject);
        }

        if (object) {
            this.scene.remove(object);

            // Dispose geometry and materials
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach(m => m.dispose());
                } else {
                    object.material.dispose();
                }
            }
        }
    }

    /**
     * Get object by ID
     */
    get(id) {
        return this.objects.get(id);
    }

    /**
     * Clear all objects from scene
     */
    clear() {
        // Remove all tracked objects
        this.objects.forEach((obj, id) => {
            this.remove(id);
        });

        // Remove remaining children (except lights)
        const toRemove = [];
        this.scene.traverse(child => {
            if (child.isMesh || child.isGroup) {
                toRemove.push(child);
            }
        });

        toRemove.forEach(obj => {
            this.scene.remove(obj);
            if (obj.geometry) obj.geometry.dispose();
            if (obj.material) {
                if (Array.isArray(obj.material)) {
                    obj.material.forEach(m => m.dispose());
                } else {
                    obj.material.dispose();
                }
            }
        });

        this.objects.clear();
    }

    /**
     * Register update callback
     */
    onUpdate(callback) {
        this.updateCallbacks.push(callback);
    }

    /**
     * Get delta time
     */
    getDelta() {
        return this.clock.getDelta();
    }

    /**
     * Get elapsed time
     */
    getElapsed() {
        return this.clock.getElapsedTime();
    }

    /**
     * Update all registered callbacks
     */
    update() {
        const delta = this.getDelta();
        const elapsed = this.getElapsed();

        this.updateCallbacks.forEach(cb => cb(delta, elapsed));
    }

    /**
     * Create gradient skybox
     */
    createGradientSky(topColor, bottomColor) {
        const canvas = document.createElement('canvas');
        canvas.width = 2;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        const gradient = ctx.createLinearGradient(0, 0, 0, 512);
        gradient.addColorStop(0, topColor);
        gradient.addColorStop(1, bottomColor);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 2, 512);

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;

        const skyGeo = new THREE.SphereGeometry(400, 32, 32);
        const skyMat = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.BackSide
        });

        const sky = new THREE.Mesh(skyGeo, skyMat);
        this.add(sky, 'skybox');

        return sky;
    }
}

// Export
window.SceneManager = SceneManager;
