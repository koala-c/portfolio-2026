import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b0b0f);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Geometría central
const geometry = new THREE.IcosahedronGeometry(1.2, 1);
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 0.6,
  roughness: 0.3
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Luz
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(3, 3, 3);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

// Animación
function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.y += 0.003;
  mesh.rotation.x += 0.002;
  renderer.render(scene, camera);
}
animate();

// Responsive
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
