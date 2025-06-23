import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { createTulip } from './createProduct.js';
import { addLighting } from './addLighting.js';
import { setupInteraction } from './interaction.js';
import { createSoil, createClouds, createBird, animateBird } from './environment.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // Sky Blue Background

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 4, 12); 

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true; // Enable shadows
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.target.set(0, 1, 0); // Make controls orbit around the flower's center
controls.autoRotate = false; // We will handle rotation manually

const tulip = createTulip();
scene.add(tulip);

const soil = createSoil();
scene.add(soil);

const clouds = createClouds();
scene.add(clouds);

const bird = createBird();
scene.add(bird);

// Add Lights
addLighting(scene);

// Pass only the tulip's parts to the interaction handler so we don't click the soil/clouds
setupInteraction(scene, camera, renderer, tulip.children);

// 5. ANIMATION
let autoRotate = true;
let lastInteractionTime = 0;

// Pause auto-rotation when the user starts interacting
controls.addEventListener('start', () => {
    autoRotate = false;
    lastInteractionTime = Date.now();
});

// The main animation loop that runs every frame
function animate(time) {
    requestAnimationFrame(animate);

    // Resume auto-rotation after 5 seconds of inactivity
    if (!autoRotate && (Date.now() - lastInteractionTime > 5000)) {
        autoRotate = true;
    }

    // Animate the bird on every frame
    animateBird(bird, time);
    
    // The OrbitControls handle the camera rotation and looking.
    // If auto-rotate is on, we tell the controls to do it.
    controls.autoRotate = autoRotate;
    
    // This is required for all control changes (damping, autoRotate) to work.
    controls.update();

    // Render the final scene
    renderer.render(scene, camera);
}

// Start the animation loop!
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});