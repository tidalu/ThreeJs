import * as THREE from 'three';
import gsap from 'gsap';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);

// clock
const clock = new THREE.Clock();

// animations

// with gsap
// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
// gsap.to(mesh.position, { duration: 1, delay: 2, y: 2 });
// gsap.to(mesh.position, { duration: 1, delay: 3, x: -2 });
// gsap.to(mesh.position, { duration: 1, delay: 4, y: -2 });
// gsap.to(mesh.position, { duration: 1, delay: 5, x: 2 });
// gsap.to(mesh.position, { duration: 1, delay: 6, y: 0 });
// gsap.to(mesh.position, { duration: 1, delay: 7, x: 0 });

// let time = Date.now();
const tick = () => {
  // first way with time  // time
  // const currentTime = Date.now();
  // const deltaTime = currentTime - time;
  // time = currentTime;
  // console.log(deltaTime);

  // update objects
  // mesh.rotation.x += 0.001 * deltaTime;
  // mesh.rotation.y += 0.001 * deltaTime;

  // second way with Clock

  const elapsedTime = clock.getElapsedTime();
  // console.log(elapsedTime);

  mesh.rotation.x = elapsedTime;
  mesh.rotation.y = elapsedTime;

  camera.position.y = Math.cos(elapsedTime);
  camera.position.x = Math.tan(elapsedTime);
  // camera.lookAt(mesh.position);
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
