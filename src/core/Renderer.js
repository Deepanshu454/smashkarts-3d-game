/**
 * SMASH KARTS 3D - Renderer
 * WebGL renderer with post-processing and quality settings
 */

class RendererManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.renderer = null;
        this.composer = null;

        // Quality settings
        this.quality = 'high'; // low, medium, high
        this.antialias = true;
        this.enableBloom = true;

        // Performance monitoring
        this.frameCount = 0;
        this.lastFPSUpdate = 0;
        this.currentFPS = 60;
        this.fpsElement = null;

        this.init();
    }

    /**
     * Initialize WebGL renderer
     */
    init() {
        // Create renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: this.antialias,
            powerPreference: 'high-performance'
        });

        // Configure renderer
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Enable shadows
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Tone mapping for better colors
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.0;

        // Output encoding
        this.renderer.outputEncoding = THREE.sRGBEncoding;

        // FPS counter element
        this.fpsElement = document.getElementById('fps-counter');

        console.log('[RendererManager] Renderer initialized');
        console.log(`  - Pixel ratio: ${this.renderer.getPixelRatio()}`);
        console.log(`  - Max texture size: ${this.renderer.capabilities.maxTextureSize}`);
    }

    /**
     * Setup post-processing
     */
    setupPostProcessing(scene, camera) {
        if (!THREE.EffectComposer) {
            console.warn('[RendererManager] Post-processing not available');
            return;
        }

        this.composer = new THREE.EffectComposer(this.renderer);

        // Render pass
        const renderPass = new THREE.RenderPass(scene, camera);
        this.composer.addPass(renderPass);

        // Bloom pass
        if (this.enableBloom && THREE.UnrealBloomPass) {
            const bloomPass = new THREE.UnrealBloomPass(
                new THREE.Vector2(window.innerWidth, window.innerHeight),
                0.5,  // Strength
                0.4,  // Radius
                0.85  // Threshold
            );
            this.composer.addPass(bloomPass);
        }

        console.log('[RendererManager] Post-processing configured');
    }

    /**
     * Render scene
     */
    render(scene, camera) {
        if (this.composer) {
            this.composer.render();
        } else {
            this.renderer.render(scene, camera);
        }

        this.updateFPS();
    }

    /**
     * Update FPS counter
     */
    updateFPS() {
        this.frameCount++;
        const now = performance.now();

        if (now - this.lastFPSUpdate >= 500) {
            this.currentFPS = Math.round((this.frameCount * 1000) / (now - this.lastFPSUpdate));
            this.frameCount = 0;
            this.lastFPSUpdate = now;

            if (this.fpsElement) {
                this.fpsElement.textContent = `${this.currentFPS} FPS`;

                // Color based on performance
                if (this.currentFPS >= 55) {
                    this.fpsElement.style.color = '#7FFF00';
                } else if (this.currentFPS >= 30) {
                    this.fpsElement.style.color = '#FFD700';
                } else {
                    this.fpsElement.style.color = '#FF4757';
                }
            }
        }
    }

    /**
     * Handle window resize
     */
    resize() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.renderer.setSize(width, height);

        if (this.composer) {
            this.composer.setSize(width, height);
        }
    }

    /**
     * Set quality level
     */
    setQuality(level) {
        this.quality = level;

        switch (level) {
            case 'low':
                this.renderer.setPixelRatio(1);
                this.renderer.shadowMap.enabled = false;
                this.enableBloom = false;
                break;

            case 'medium':
                this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
                this.renderer.shadowMap.enabled = true;
                this.renderer.shadowMap.type = THREE.BasicShadowMap;
                this.enableBloom = false;
                break;

            case 'high':
            default:
                this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                this.renderer.shadowMap.enabled = true;
                this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
                this.enableBloom = true;
                break;
        }

        console.log(`[RendererManager] Quality set to: ${level}`);
    }

    /**
     * Get render info for debugging
     */
    getInfo() {
        const info = this.renderer.info;
        return {
            fps: this.currentFPS,
            drawCalls: info.render.calls,
            triangles: info.render.triangles,
            geometries: info.memory.geometries,
            textures: info.memory.textures,
            programs: info.programs?.length || 0
        };
    }

    /**
     * Log performance metrics
     */
    logPerformance() {
        const info = this.getInfo();
        console.log('=== Performance Metrics ===');
        console.log(`FPS: ${info.fps}`);
        console.log(`Draw Calls: ${info.drawCalls} (target: <50)`);
        console.log(`Triangles: ${info.triangles} (target: <50k)`);
        console.log(`Geometries: ${info.geometries}`);
        console.log(`Textures: ${info.textures}`);
        console.log('===========================');
    }

    /**
     * Dispose renderer
     */
    dispose() {
        if (this.composer) {
            this.composer.dispose();
        }
        this.renderer.dispose();
    }
}

// Export
window.RendererManager = RendererManager;
