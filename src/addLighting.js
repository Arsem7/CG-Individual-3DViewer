import * as THREE from 'three';

export function addLighting(scene) {
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(5, 10, 7.5);
  dirLight.castShadow = true;
  scene.add(dirLight);
  const backLight = new THREE.DirectionalLight(0xffe0f7, 0.3);
  backLight.position.set(-5, -5, -5);
  scene.add(backLight);
}