/**
 * SMASH KARTS 3D - Particle Manager
 * Particle effects for dust, sparks, explosions
 */

class ParticleManager {
    constructor(scene) {
        this.scene = scene;
        this.particles = [];
        this.emitters = new Map();
    }

    /**
     * Create particle system
     */
    createSystem(config) {
        const {
            count = 100,
            size = 0.5,
            color = 0xffffff,
            velocity = { x: 0, y: 1, z: 0 },
            spread = 1,
            lifetime = 2,
            gravity = true
        } = config;

        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const velocities = new Float32Array(count * 3);
        const lifetimes = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = 0;
            positions[i * 3 + 1] = 0;
            positions[i * 3 + 2] = 0;

            velocities[i * 3] = velocity.x + (Math.random() - 0.5) * spread;
            velocities[i * 3 + 1] = velocity.y + (Math.random() - 0.5) * spread;
            velocities[i * 3 + 2] = velocity.z + (Math.random() - 0.5) * spread;

            lifetimes[i] = Math.random() * lifetime;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.userData = { velocities, lifetimes, lifetime, gravity };

        const material = new THREE.PointsMaterial({
            color: color,
            size: size,
            transparent: true,
            opacity: 0.8,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        const system = new THREE.Points(geometry, material);
        this.scene.add(system);
        this.particles.push(system);

        return system;
    }

    /**
     * Create burst effect (explosion, collect)
     */
    burst(x, y, z, config = {}) {
        const {
            count = 30,
            color = 0xFFD700,
            size = 0.3,
            speed = 5,
            lifetime = 1
        } = config;

        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const velocities = [];

        for (let i = 0; i < count; i++) {
            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            // Random spherical direction
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            velocities.push({
                x: Math.sin(phi) * Math.cos(theta) * speed,
                y: Math.sin(phi) * Math.sin(theta) * speed,
                z: Math.cos(phi) * speed
            });
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: color,
            size: size,
            transparent: true,
            opacity: 1,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        const burst = new THREE.Points(geometry, material);
        burst.userData = {
            velocities,
            lifetime,
            age: 0,
            burst: true
        };

        this.scene.add(burst);
        this.particles.push(burst);

        return burst;
    }

    /**
     * Create dust trail
     */
    createDustTrail(emitterId, color = 0xDEB887) {
        const trailPoints = [];
        this.emitters.set(emitterId, {
            type: 'dust',
            color,
            points: trailPoints,
            lastEmit: 0
        });
    }

    /**
     * Emit dust at position
     */
    emitDust(emitterId, x, y, z) {
        const emitter = this.emitters.get(emitterId);
        if (!emitter) return;

        const now = performance.now();
        if (now - emitter.lastEmit < 50) return; // Rate limit
        emitter.lastEmit = now;

        this.burst(x, y, z, {
            count: 5,
            color: emitter.color,
            size: 0.2,
            speed: 1,
            lifetime: 0.5
        });
    }

    /**
     * Update all particles
     */
    update(deltaTime) {
        const toRemove = [];

        this.particles.forEach((system, index) => {
            if (system.userData.burst) {
                // Update burst particles
                const positions = system.geometry.attributes.position.array;
                system.userData.age += deltaTime;

                const progress = system.userData.age / system.userData.lifetime;

                if (progress >= 1) {
                    toRemove.push(index);
                    return;
                }

                system.userData.velocities.forEach((vel, i) => {
                    positions[i * 3] += vel.x * deltaTime;
                    positions[i * 3 + 1] += vel.y * deltaTime - 5 * deltaTime; // Gravity
                    positions[i * 3 + 2] += vel.z * deltaTime;
                });

                system.geometry.attributes.position.needsUpdate = true;
                system.material.opacity = 1 - progress;
            }
        });

        // Remove dead particles (in reverse to preserve indices)
        toRemove.reverse().forEach(index => {
            const system = this.particles[index];
            this.scene.remove(system);
            system.geometry.dispose();
            system.material.dispose();
            this.particles.splice(index, 1);
        });
    }

    /**
     * Clear all particles
     */
    clear() {
        this.particles.forEach(system => {
            this.scene.remove(system);
            system.geometry.dispose();
            system.material.dispose();
        });
        this.particles = [];
        this.emitters.clear();
    }
}

// Export
window.ParticleManager = ParticleManager;
