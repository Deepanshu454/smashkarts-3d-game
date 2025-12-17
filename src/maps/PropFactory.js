/**
 * SMASH KARTS 3D - Prop Factory
 * Creates 3D props with instancing for performance
 */

class PropFactory {
    constructor(scene) {
        this.scene = scene;
        this.instances = new Map();
    }

    /**
     * Create palm trees (instanced)
     */
    createPalmTrees(positions, config = {}) {
        const {
            trunkHeight = 8,
            trunkRadius = 0.5,
            leafRadius = 4,
            leafColor = 0x228B22,
            trunkColor = 0x8B4513
        } = config;

        const group = new THREE.Group();

        positions.forEach(pos => {
            const tree = this.createSinglePalmTree(
                trunkHeight, trunkRadius, leafRadius, trunkColor, leafColor
            );
            tree.position.set(pos.x, pos.y || 0, pos.z);
            tree.rotation.y = Math.random() * Math.PI * 2;
            tree.scale.setScalar(0.8 + Math.random() * 0.4);
            group.add(tree);
        });

        this.scene.add(group);
        return group;
    }

    /**
     * Create single palm tree
     */
    createSinglePalmTree(height, radius, leafRadius, trunkCol, leafCol) {
        const tree = new THREE.Group();

        // Trunk (slightly curved cylinder)
        const trunkGeo = new THREE.CylinderGeometry(radius * 0.7, radius, height, 8);
        const trunkMat = new THREE.MeshStandardMaterial({
            color: trunkCol,
            flatShading: true,
            roughness: 0.9
        });
        const trunk = new THREE.Mesh(trunkGeo, trunkMat);
        trunk.position.y = height / 2;
        trunk.castShadow = true;
        tree.add(trunk);

        // Leaves (multiple cones)
        const leafGeo = new THREE.ConeGeometry(leafRadius, leafRadius * 0.5, 4);
        const leafMat = new THREE.MeshStandardMaterial({
            color: leafCol,
            flatShading: true,
            roughness: 0.8
        });

        for (let i = 0; i < 6; i++) {
            const leaf = new THREE.Mesh(leafGeo, leafMat);
            const angle = (i / 6) * Math.PI * 2;
            leaf.position.set(
                Math.cos(angle) * 2,
                height,
                Math.sin(angle) * 2
            );
            leaf.rotation.x = Math.PI / 3;
            leaf.rotation.z = -angle;
            leaf.castShadow = true;
            tree.add(leaf);
        }

        return tree;
    }

    /**
     * Create item boxes (rotating cubes with glow)
     */
    createItemBoxes(positions, config = {}) {
        const {
            size = 2,
            color = 0xFFD700,
            emissiveIntensity = 0.5
        } = config;

        const group = new THREE.Group();

        const geometry = new THREE.BoxGeometry(size, size, size);
        const material = new THREE.MeshStandardMaterial({
            color: color,
            emissive: color,
            emissiveIntensity: emissiveIntensity,
            metalness: 0.3,
            roughness: 0.4
        });

        positions.forEach((pos, i) => {
            const box = new THREE.Mesh(geometry, material);
            box.position.set(pos.x, (pos.y || 0) + size / 2 + 1, pos.z);
            box.castShadow = true;
            box.userData.isItemBox = true;
            box.userData.rotationOffset = i * 0.5;
            group.add(box);
        });

        this.scene.add(group);
        this.instances.set('itemBoxes', group);
        return group;
    }

    /**
     * Create boost pads (flat rectangles with glow)
     */
    createBoostPads(positions, config = {}) {
        const {
            width = 4,
            length = 8,
            color = 0xFFA500
        } = config;

        const group = new THREE.Group();

        const geometry = new THREE.PlaneGeometry(width, length);
        geometry.rotateX(-Math.PI / 2);

        const material = new THREE.MeshStandardMaterial({
            color: color,
            emissive: color,
            emissiveIntensity: 0.4,
            side: THREE.DoubleSide
        });

        positions.forEach(pos => {
            const pad = new THREE.Mesh(geometry, material);
            pad.position.set(pos.x, 0.05, pos.z);
            pad.rotation.y = pos.rotation || 0;
            pad.userData.isBoostPad = true;
            group.add(pad);
        });

        this.scene.add(group);
        return group;
    }

    /**
     * Create rocks (irregular low-poly shapes)
     */
    createRocks(positions, config = {}) {
        const {
            sizeRange = [1, 3],
            color = 0x696969
        } = config;

        const group = new THREE.Group();

        positions.forEach(pos => {
            const size = sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]);
            const geometry = new THREE.DodecahedronGeometry(size, 0);

            // Randomize vertices for natural look
            const positions_attr = geometry.attributes.position.array;
            for (let i = 0; i < positions_attr.length; i++) {
                positions_attr[i] += (Math.random() - 0.5) * 0.3;
            }
            geometry.computeVertexNormals();

            const material = new THREE.MeshStandardMaterial({
                color: color,
                flatShading: true,
                roughness: 1
            });

            const rock = new THREE.Mesh(geometry, material);
            rock.position.set(pos.x, size * 0.3, pos.z);
            rock.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            rock.castShadow = true;
            rock.receiveShadow = true;
            group.add(rock);
        });

        this.scene.add(group);
        return group;
    }

    /**
     * Create tombstones for graveyard
     */
    createTombstones(positions, config = {}) {
        const { color = 0xECF0F1 } = config;
        const group = new THREE.Group();

        const shapes = [
            () => new THREE.BoxGeometry(1.5, 3, 0.5),
            () => {
                const shape = new THREE.Shape();
                shape.moveTo(-0.75, 0);
                shape.lineTo(-0.75, 2);
                shape.quadraticCurveTo(-0.75, 3, 0, 3);
                shape.quadraticCurveTo(0.75, 3, 0.75, 2);
                shape.lineTo(0.75, 0);
                shape.lineTo(-0.75, 0);
                return new THREE.ExtrudeGeometry(shape, { depth: 0.3, bevelEnabled: false });
            }
        ];

        positions.forEach(pos => {
            const shapeIndex = Math.floor(Math.random() * shapes.length);
            const geometry = shapes[shapeIndex]();

            const material = new THREE.MeshStandardMaterial({
                color: color,
                flatShading: true,
                roughness: 0.9
            });

            const tomb = new THREE.Mesh(geometry, material);
            tomb.position.set(pos.x, 0, pos.z);
            tomb.rotation.y = Math.random() * 0.2 - 0.1;
            tomb.castShadow = true;
            group.add(tomb);
        });

        this.scene.add(group);
        return group;
    }

    /**
     * Create dead trees
     */
    createDeadTrees(positions, config = {}) {
        const { color = 0x2C2C2C } = config;
        const group = new THREE.Group();

        positions.forEach(pos => {
            const tree = new THREE.Group();

            // Trunk
            const trunkGeo = new THREE.CylinderGeometry(0.3, 0.5, 6, 6);
            const trunkMat = new THREE.MeshStandardMaterial({
                color: color,
                flatShading: true,
                roughness: 1
            });
            const trunk = new THREE.Mesh(trunkGeo, trunkMat);
            trunk.position.y = 3;
            trunk.castShadow = true;
            tree.add(trunk);

            // Branches
            for (let i = 0; i < 4; i++) {
                const branchGeo = new THREE.CylinderGeometry(0.1, 0.2, 3, 4);
                const branch = new THREE.Mesh(branchGeo, trunkMat);
                const angle = (i / 4) * Math.PI * 2;
                branch.position.set(
                    Math.cos(angle) * 1,
                    4 + i * 0.5,
                    Math.sin(angle) * 1
                );
                branch.rotation.z = angle + Math.PI / 4;
                branch.rotation.x = Math.random() * 0.5;
                branch.castShadow = true;
                tree.add(branch);
            }

            tree.position.set(pos.x, 0, pos.z);
            group.add(tree);
        });

        this.scene.add(group);
        return group;
    }

    /**
     * Create crystals (for volcanic/space themes)
     */
    createCrystals(positions, config = {}) {
        const {
            color = 0xE040FB,
            emissive = true
        } = config;

        const group = new THREE.Group();

        positions.forEach(pos => {
            const height = 2 + Math.random() * 2;
            const geometry = new THREE.ConeGeometry(0.5, height, 4);

            const material = new THREE.MeshStandardMaterial({
                color: color,
                emissive: emissive ? color : 0x000000,
                emissiveIntensity: emissive ? 0.5 : 0,
                transparent: true,
                opacity: 0.9,
                flatShading: true
            });

            const crystal = new THREE.Mesh(geometry, material);
            crystal.position.set(pos.x, height / 2, pos.z);
            crystal.rotation.x = Math.random() * 0.3 - 0.15;
            crystal.rotation.z = Math.random() * 0.3 - 0.15;
            crystal.castShadow = true;
            group.add(crystal);
        });

        this.scene.add(group);
        return group;
    }

    /**
     * Update animated props
     */
    update(elapsed) {
        // Rotate item boxes
        const itemBoxes = this.instances.get('itemBoxes');
        if (itemBoxes) {
            itemBoxes.children.forEach(box => {
                box.rotation.y = elapsed * 2 + box.userData.rotationOffset;
                box.position.y = 2 + Math.sin(elapsed * 3 + box.userData.rotationOffset) * 0.3;
            });
        }
    }

    /**
     * Dispose all props
     */
    dispose() {
        this.instances.forEach(group => {
            group.traverse(obj => {
                if (obj.geometry) obj.geometry.dispose();
                if (obj.material) obj.material.dispose();
            });
            this.scene.remove(group);
        });
        this.instances.clear();
    }
}

// Export
window.PropFactory = PropFactory;
