/**
 * SMASH KARTS 3D - Camera Controller
 * Third-person follow camera with smooth interpolation
 */

class CameraController {
    constructor(canvas) {
        this.camera = null;
        this.controls = null;
        this.target = null;

        // Camera settings
        this.fov = 60;
        this.near = 0.1;
        this.far = 1000;

        // Follow settings
        this.followDistance = 15;
        this.followHeight = 10;
        this.followSmoothing = 0.1;
        this.lookAheadDistance = 5;

        // Current values for interpolation
        this.currentPosition = new THREE.Vector3();
        this.currentLookAt = new THREE.Vector3();

        this.init(canvas);
    }

    /**
     * Initialize camera
     */
    init(canvas) {
        const aspect = canvas.clientWidth / canvas.clientHeight;

        this.camera = new THREE.PerspectiveCamera(
            this.fov,
            aspect,
            this.near,
            this.far
        );

        // Default position
        this.camera.position.set(0, 50, 50);
        this.camera.lookAt(0, 0, 0);

        // Orbit controls for menu/spectator mode
        if (THREE.OrbitControls) {
            this.controls = new THREE.OrbitControls(this.camera, canvas);
            this.controls.enableDamping = true;
            this.controls.dampingFactor = 0.05;
            this.controls.maxPolarAngle = Math.PI / 2.2;
            this.controls.minDistance = 10;
            this.controls.maxDistance = 200;
            this.controls.target.set(0, 0, 0);
        }

        console.log('[CameraController] Camera initialized');
    }

    /**
     * Update aspect ratio on resize
     */
    resize(width, height) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }

    /**
     * Set follow target (player kart)
     */
    setTarget(target) {
        this.target = target;

        // Disable orbit controls when following
        if (this.controls) {
            this.controls.enabled = !target;
        }
    }

    /**
     * Update camera position
     */
    update(deltaTime) {
        if (this.target) {
            this.updateFollow(deltaTime);
        } else if (this.controls) {
            this.controls.update();
        }
    }

    /**
     * Follow target smoothly
     */
    updateFollow(deltaTime) {
        if (!this.target) return;

        // Get target position and rotation
        const targetPos = this.target.position || this.target;
        const targetRot = this.target.rotation?.y || 0;

        // Calculate ideal camera position (behind and above target)
        const idealOffset = new THREE.Vector3(
            -Math.sin(targetRot) * this.followDistance,
            this.followHeight,
            -Math.cos(targetRot) * this.followDistance
        );

        const idealPosition = new THREE.Vector3().copy(targetPos).add(idealOffset);

        // Calculate look-ahead point
        const lookAhead = new THREE.Vector3(
            Math.sin(targetRot) * this.lookAheadDistance,
            2,
            Math.cos(targetRot) * this.lookAheadDistance
        );

        const idealLookAt = new THREE.Vector3().copy(targetPos).add(lookAhead);

        // Smooth interpolation
        this.currentPosition.lerp(idealPosition, this.followSmoothing);
        this.currentLookAt.lerp(idealLookAt, this.followSmoothing * 1.5);

        // Apply to camera
        this.camera.position.copy(this.currentPosition);
        this.camera.lookAt(this.currentLookAt);
    }

    /**
     * Set camera to overview position
     */
    setOverview(centerX = 0, centerY = 0, height = 80) {
        this.camera.position.set(centerX, height, centerY + 50);
        this.camera.lookAt(centerX, 0, centerY);

        if (this.controls) {
            this.controls.target.set(centerX, 0, centerY);
        }
    }

    /**
     * Shake camera (for explosions)
     */
    shake(intensity = 1, duration = 0.3) {
        const originalPos = this.camera.position.clone();
        const startTime = performance.now();

        const shakeUpdate = () => {
            const elapsed = (performance.now() - startTime) / 1000;
            if (elapsed < duration) {
                const decay = 1 - (elapsed / duration);
                this.camera.position.x = originalPos.x + (Math.random() - 0.5) * intensity * decay;
                this.camera.position.y = originalPos.y + (Math.random() - 0.5) * intensity * 0.5 * decay;
                requestAnimationFrame(shakeUpdate);
            } else {
                this.camera.position.copy(originalPos);
            }
        };

        shakeUpdate();
    }

    /**
     * Get camera for rendering
     */
    getCamera() {
        return this.camera;
    }
}

// Export
window.CameraController = CameraController;
