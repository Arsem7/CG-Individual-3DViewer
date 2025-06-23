import * as THREE from 'three';

export function setupInteraction(scene, camera, renderer, objects) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const infoPanel = document.getElementById('info-panel');
  let INTERSECTED;

  renderer.domElement.addEventListener('pointermove', onPointerMove);
  renderer.domElement.addEventListener('click', onPointerClick);

  function onPointerMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(objects);

    if (INTERSECTED) {
      INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
      INTERSECTED.scale.set(1, 1, 1);
      infoPanel.style.display = 'none';
      INTERSECTED = null;
    }

    if (intersects.length > 0) {
      INTERSECTED = intersects[0].object;
      INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
      INTERSECTED.material.emissive.setHex(0xffb3e6);
      INTERSECTED.scale.set(1.05, 1.05, 1.05);

      infoPanel.textContent = INTERSECTED.name;
      infoPanel.style.display = 'block';
      infoPanel.style.left = `${event.clientX + 15}px`;
      infoPanel.style.top = `${event.clientY}px`;
    }
  }
  
  function onPointerClick() {
    if (INTERSECTED) {
      INTERSECTED.material.emissive.setHex(0xff69b4);
      setTimeout(() => INTERSECTED.material.emissive.setHex(0xffb3e6), 350);
    }
  }
}