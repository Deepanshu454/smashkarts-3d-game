/**
 * SMASH KARTS 3D - Water Shader
 * Animated water with waves and reflections
 */

class WaterShader {
    constructor(scene) {
        this.scene = scene;
        this.waterMesh = null;
        this.time = 0;
    }

    /**
     * Create animated water plane
     */
    create(size = 500, color = 0x00CED1, depth = -3) {
        const geometry = new THREE.PlaneGeometry(size, size, 64, 64);
        geometry.rotateX(-Math.PI / 2);

        // Custom shader material for animation
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color: { value: new THREE.Color(color) },
                waveHeight: { value: 1.5 },
                waveSpeed: { value: 0.5 }
            },
            vertexShader: `
                uniform float time;
                uniform float waveHeight;
                uniform float waveSpeed;
                varying vec2 vUv;
                varying float vHeight;
                
                void main() {
                    vUv = uv;
                    vec3 pos = position;
                    
                    // Wave animation
                    float wave1 = sin(pos.x * 0.05 + time * waveSpeed) * waveHeight;
                    float wave2 = cos(pos.z * 0.05 + time * waveSpeed * 0.7) * waveHeight * 0.7;
                    pos.y += wave1 + wave2;
                    vHeight = pos.y;
                    
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 color;
                uniform float time;
                varying vec2 vUv;
                varying float vHeight;
                
                void main() {
                    // Base color with depth variation
                    vec3 baseColor = color;
                    vec3 deepColor = color * 0.5;
                    
                    float mixFactor = vHeight * 0.2 + 0.5;
                    vec3 finalColor = mix(deepColor, baseColor, clamp(mixFactor, 0.0, 1.0));
                    
                    // Shimmer effect
                    float shimmer = sin(vUv.x * 50.0 + time * 2.0) * 0.1 + 
                                    cos(vUv.y * 50.0 + time * 1.5) * 0.1;
                    finalColor += vec3(shimmer);
                    
                    // Foam at edges (based on height)
                    float foam = smoothstep(1.0, 1.5, abs(vHeight)) * 0.3;
                    finalColor += vec3(foam);
                    
                    gl_FragColor = vec4(finalColor, 0.85);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide
        });

        this.waterMesh = new THREE.Mesh(geometry, material);
        this.waterMesh.position.y = depth;
        this.waterMesh.receiveShadow = true;

        this.scene.add(this.waterMesh);
        return this.waterMesh;
    }

    /**
     * Create simple water (no shader, for performance)
     */
    createSimple(size = 500, color = 0x00CED1, depth = -3) {
        const geometry = new THREE.PlaneGeometry(size, size);
        geometry.rotateX(-Math.PI / 2);

        const material = new THREE.MeshStandardMaterial({
            color: color,
            transparent: true,
            opacity: 0.8,
            roughness: 0.1,
            metalness: 0.3
        });

        this.waterMesh = new THREE.Mesh(geometry, material);
        this.waterMesh.position.y = depth;
        this.waterMesh.receiveShadow = true;

        this.scene.add(this.waterMesh);
        return this.waterMesh;
    }

    /**
     * Update water animation
     */
    update(deltaTime) {
        if (!this.waterMesh) return;

        this.time += deltaTime;

        if (this.waterMesh.material.uniforms) {
            this.waterMesh.material.uniforms.time.value = this.time;
        }
    }

    /**
     * Dispose water
     */
    dispose() {
        if (this.waterMesh) {
            this.scene.remove(this.waterMesh);
            this.waterMesh.geometry.dispose();
            this.waterMesh.material.dispose();
            this.waterMesh = null;
        }
    }
}

// Export
window.WaterShader = WaterShader;
