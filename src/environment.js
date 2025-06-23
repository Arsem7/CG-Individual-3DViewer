import * as THREE from 'three';

//Creates a brown disc to represent the soil at the base of the flower.
export function createSoil() {
    const soilGeometry = new THREE.CylinderGeometry(1.5, 1.5, 0.2, 32);
    const soilMaterial = new THREE.MeshStandardMaterial({ color: 0x966919, roughness: 0.9 });
    const soil = new THREE.Mesh(soilGeometry, soilMaterial);
    soil.position.y = -1.3; // Position it right under the flower stem base
    soil.name = 'Soil';
    soil.receiveShadow = true; // Allow it to receive shadows
    return soil;
}

// Creates a group of fluffy white clouds.
 
export function createClouds() {
    const cloudGroup = new THREE.Group();
    
    // An inner function to create a single cloud from several spheres
    function createCloud(x, y, z) {
        const cloud = new THREE.Group();
        // Use a basic material for clouds as they don't need to react to light in a complex way
        const cloudMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        
        const s1 = new THREE.Mesh(new THREE.SphereGeometry(0.8), cloudMaterial);
        const s2 = new THREE.Mesh(new THREE.SphereGeometry(0.5), cloudMaterial);
        s2.position.set(0.6, 0.2, 0.1);
        const s3 = new THREE.Mesh(new THREE.SphereGeometry(0.6), cloudMaterial);
        s3.position.set(-0.5, 0.3, -0.2);
        const s4 = new THREE.Mesh(new THREE.SphereGeometry(0.4), cloudMaterial);
        s4.position.set(0.2, -0.2, 0);

        cloud.add(s1, s2, s3, s4);
        cloud.position.set(x, y, z);
        return cloud;
    }

    cloudGroup.add(createCloud(-5, 6, -8));
    cloudGroup.add(createCloud(6, 7, -10));
    cloudGroup.add(createCloud(8, 5, 2));

    return cloudGroup;
}

// Creates a simple bird model with animatable wings.
 
export function createBird() {
    const bird = new THREE.Group();
    bird.name = 'Bird';

    const body = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 1), new THREE.MeshBasicMaterial({ color: 0x222222 }));
    bird.add(body);

    const wingMaterial = new THREE.MeshBasicMaterial({ color: 0x444444 });
    const leftWing = new THREE.Mesh(new THREE.BoxGeometry(1, 0.1, 0.5), wingMaterial);
    leftWing.position.x = -0.75;
    leftWing.name = 'leftWing'; // Name for animation
    bird.add(leftWing);

    const rightWing = leftWing.clone();
    rightWing.position.x = 0.75;
    rightWing.name = 'rightWing'; // Name for animation
    bird.add(rightWing);

    return bird;
}

/**
 * Animates the bird's flight path in a circle and flaps its wings.
 * @param {THREE.Group} bird The bird object to animate.
 * @param {number} time The current time from the animation loop.
 */
export function animateBird(bird, time) {
    // Animate flight path in a big circle high in the sky
    const radius = 12;
    const speed = 0.0002;
    const angle = time * speed;
    bird.position.x = Math.cos(angle) * radius;
    bird.position.y = 8; // Fly at a constant height
    bird.position.z = Math.sin(angle) * radius;
    bird.rotation.y = -angle + Math.PI / 2; // Bird "looks" in the direction it's flying

    // Animate wing flapping using a sine wave
    const flapSpeed = 0.02;
    const flapAngle = Math.sin(time * flapSpeed) * 0.5;
    
    const leftWing = bird.getObjectByName('leftWing');
    const rightWing = bird.getObjectByName('rightWing');

    if (leftWing && rightWing) {
        leftWing.rotation.z = flapAngle;
        rightWing.rotation.z = -flapAngle;
    }
}