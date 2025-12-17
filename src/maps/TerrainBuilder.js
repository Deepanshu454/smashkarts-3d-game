/**
 * SMASH KARTS 3D - Terrain Builder
 * Procedural terrain generation with vertex colors
 */

class TerrainBuilder {
    constructor(scene) {
        this.scene = scene;
        this.terrainMesh = null;
    }

    /**
     * Build circular island terrain
     */
    buildIsland(config) {
        const {
            radius = 100,
            segments = 64,
            colors = {},
            elevation = {}
        } = config;

        // Create circular geometry
        const geometry = new THREE.CircleGeometry(radius, segments);
        geometry.rotateX(-Math.PI / 2); // Lay flat

        // Apply vertex colors based on zones
        const positions = geometry.attributes.position.array;
        const colors_attr = new Float32Array(positions.length);

        const centerX = 0, centerZ = 0;

        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const y = positions[i + 1];
            const z = positions[i + 2];

            // Calculate distance from center
            const dist = Math.sqrt(x * x + z * z);
            const normalizedDist = dist / radius;

            // Determine zone and color
            let color;
            let height = 0;

            if (normalizedDist > 0.85) {
                // Water edge
                color = new THREE.Color(colors.water || 0x00CED1);
                height = -2;
            } else if (normalizedDist > 0.75) {
                // Beach/sand
                color = new THREE.Color(colors.sand || 0xF4D03F);
                height = 0;
            } else if (normalizedDist > 0.4) {
                // Grass
                color = new THREE.Color(colors.grass || 0x7FFF00);
                height = 2 + Math.sin(x * 0.1) * Math.cos(z * 0.1) * 3;
            } else {
                // Track/center
                color = new THREE.Color(colors.track || 0xFF6B35);
                height = 1;
            }

            // Apply height
            positions[i + 1] = height;

            // Apply color
            colors_attr[i] = color.r;
            colors_attr[i + 1] = color.g;
            colors_attr[i + 2] = color.b;
        }

        geometry.setAttribute('color', new THREE.BufferAttribute(colors_attr, 3));
        geometry.computeVertexNormals();

        // Create material with vertex colors
        const material = new THREE.MeshStandardMaterial({
            vertexColors: true,
            flatShading: true,
            metalness: 0.1,
            roughness: 0.8
        });

        this.terrainMesh = new THREE.Mesh(geometry, material);
        this.terrainMesh.receiveShadow = true;
        this.scene.add(this.terrainMesh);

        return this.terrainMesh;
    }

    /**
     * Build platform-based terrain for Sky Arena
     */
    buildPlatforms(config) {
        const group = new THREE.Group();
        const { platforms = [], colors = {} } = config;

        platforms.forEach(platform => {
            const { x, y, z, width, depth, height = 2, type = 'normal' } = platform;

            const geometry = new THREE.BoxGeometry(width, height, depth);

            let color;
            switch (type) {
                case 'main':
                    color = colors.platform || 0x7F8C8D;
                    break;
                case 'secondary':
                    color = colors.platformAlt || 0xBDC3C7;
                    break;
                case 'bridge':
                    color = colors.bridge || 0x95A5A6;
                    break;
                default:
                    color = colors.platform || 0x7F8C8D;
            }

            const material = new THREE.MeshStandardMaterial({
                color: color,
                flatShading: true,
                metalness: 0.2,
                roughness: 0.7
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(x, y, z);
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            group.add(mesh);
        });

        this.scene.add(group);
        return group;
    }

    /**
     * Build circular arena with lava rivers
     */
    buildVolcanic(config) {
        const group = new THREE.Group();
        const { radius = 100, colors = {} } = config;

        // Main rock floor
        const floorGeo = new THREE.CircleGeometry(radius, 48);
        floorGeo.rotateX(-Math.PI / 2);

        const floorMat = new THREE.MeshStandardMaterial({
            color: colors.rock || 0x2C3E50,
            flatShading: true,
            roughness: 0.9
        });

        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.receiveShadow = true;
        group.add(floor);

        // Lava rivers (crossing pattern)
        const lavaGeo = new THREE.PlaneGeometry(radius * 0.15, radius * 2);
        const lavaMat = new THREE.MeshStandardMaterial({
            color: colors.lava || 0xFF4500,
            emissive: colors.lava || 0xFF4500,
            emissiveIntensity: 0.8,
            flatShading: true
        });
        lavaMat.userData.isLava = true;

        const lava1 = new THREE.Mesh(lavaGeo, lavaMat);
        lava1.rotation.x = -Math.PI / 2;
        lava1.position.y = 0.1;
        group.add(lava1);

        const lava2 = lava1.clone();
        lava2.rotation.z = Math.PI / 2;
        group.add(lava2);

        this.scene.add(group);
        return group;
    }

    /**
     * Build graveyard terrain with hills
     */
    buildGraveyard(config) {
        const group = new THREE.Group();
        const { size = 200, colors = {} } = config;

        // Ground with undulation
        const groundGeo = new THREE.PlaneGeometry(size, size, 32, 32);
        groundGeo.rotateX(-Math.PI / 2);

        // Add hills
        const positions = groundGeo.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const z = positions[i + 2];
            positions[i + 1] = Math.sin(x * 0.05) * Math.cos(z * 0.05) * 3;
        }
        groundGeo.computeVertexNormals();

        const groundMat = new THREE.MeshStandardMaterial({
            color: colors.ground || 0x2C3E50,
            flatShading: true,
            roughness: 1
        });

        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.receiveShadow = true;
        group.add(ground);

        // River (dark water)
        const riverGeo = new THREE.PlaneGeometry(size * 0.1, size * 1.2);
        const riverMat = new THREE.MeshStandardMaterial({
            color: colors.water || 0x1C1C1C,
            transparent: true,
            opacity: 0.9,
            roughness: 0.3
        });

        const river = new THREE.Mesh(riverGeo, riverMat);
        river.rotation.x = -Math.PI / 2;
        river.rotation.z = Math.PI / 6;
        river.position.y = 0.1;
        group.add(river);

        this.scene.add(group);
        return group;
    }

    /**
     * Create water plane with shader
     */
    createWater(size = 500, color = 0x00CED1) {
        const geometry = new THREE.PlaneGeometry(size, size);
        geometry.rotateX(-Math.PI / 2);

        const material = new THREE.MeshStandardMaterial({
            color: color,
            transparent: true,
            opacity: 0.8,
            roughness: 0.1,
            metalness: 0.3
        });

        const water = new THREE.Mesh(geometry, material);
        water.position.y = -3;
        water.receiveShadow = true;

        this.scene.add(water);
        return water;
    }

    /**
     * Dispose terrain
     */
    dispose() {
        if (this.terrainMesh) {
            this.scene.remove(this.terrainMesh);
            this.terrainMesh.geometry.dispose();
            this.terrainMesh.material.dispose();
            this.terrainMesh = null;
        }
    }
}

// Export
window.TerrainBuilder = TerrainBuilder;
