import * as THREE from 'three';

export function createTulip() {
  const tulip = new THREE.Group();
  tulip.name = 'Tulip';

  const stemMaterial = new THREE.MeshStandardMaterial({ color: 0x3fa34d });
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 2.5, 16), stemMaterial);
  stem.position.y = 1.1;
  stem.name = 'Stem';
  tulip.add(stem);

  const leafMaterial = new THREE.MeshStandardMaterial({ color: 0x3fa34d, roughness: 0.7 });
  const leaf1 = new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 8, 0, Math.PI), leafMaterial);
  leaf1.scale.set(1, 0.25, 0.7);
  leaf1.position.set(0.35, 0.5, 0);
  leaf1.rotation.z = Math.PI / 3;
  leaf1.name = 'Leaf';
  tulip.add(leaf1);
  const leaf2 = leaf1.clone();
  leaf2.position.set(-0.35, 0.7, 0.1);
  leaf2.rotation.z = -Math.PI / 2.2;
  leaf2.name = 'Leaf';
  tulip.add(leaf2);

  const petalMaterial = new THREE.MeshPhysicalMaterial({ color: 0xf7a1d7, roughness: 0.35, clearcoat: 0.5, transmission: 0.4, thickness: 0.2 });
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2;
    const petal = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.9, 24, 1, true), petalMaterial);
    petal.position.set(Math.sin(angle) * 0.28, 2.2, Math.cos(angle) * 0.28);
    petal.rotation.x = Math.PI / 2.1;
    petal.rotation.y = angle;
    petal.name = 'Petal';
    tulip.add(petal);
  }

  const center = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 16), new THREE.MeshStandardMaterial({ color: 0xffe066 }));
  center.position.y = 2.2;
  center.name = 'Flower Center';
  tulip.add(center);

  tulip.position.y = -1.2;
  return tulip;
}