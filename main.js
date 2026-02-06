import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

const canvas = document.querySelector('#webgl');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b0b0f);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Geometría
const geometry = new THREE.IcosahedronGeometry(1.2, 1);
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 0.6,
  roughness: 0.3
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Luces
scene.add(new THREE.PointLight(0xffffff, 1, 10).position.set(3,3,3));
scene.add(new THREE.AmbientLight(0xffffff, 0.4));

// Render loop
function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.y += 0.003;
  mesh.rotation.x += 0.002;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});
