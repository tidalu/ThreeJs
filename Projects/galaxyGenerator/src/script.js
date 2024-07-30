import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';

/**
 * Base
 */
// Debug
const gui = new GUI({
  width: 300,
});

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * galaxy
 */

const parameters = {};

parameters.count = 100000;
parameters.size = 0.01;
parameters.radius = 5;
parameters.branches = 3;
parameters.spin = 1;

let material = null;
let geometry = null;
let points = null;

const generateGalaxy = (count, size, radius, branches, spin) => {
  if (points !== null) {
    geometry.dispose();
    material.dispose();
    scene.remove(points);
  }
  const positions = new Float32Array(count * 3);
  geometry = new THREE.BufferGeometry();

  for (let i = 0; i < count; i++) {
      
      
      const i3 = i * 3;
      const rad = Math.random() * radius;
      const spinAngle = rad * spin;
      const branchesAngle = (i % branches) / branches * Math.PI * 2;


    positions[i3] = Math.sin(branchesAngle + spinAngle) * rad; 
    positions[i3 + 1] =  (Math.random() - 0.5) * .1;
    positions[i3 + 2] = Math.cos(branchesAngle + spinAngle) * rad ;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  // material
  material = new THREE.PointsMaterial({
    size: size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  // points
  points = new THREE.Points(geometry, material);
  scene.add(points);
};

generateGalaxy(parameters.count, parameters.size, parameters.radius, parameters.branches, parameters.spin);

gui
  .add(parameters, 'count')
  .min(100)
  .max(1000000)
  .step(100)
  .onFinishChange(() => {
    generateGalaxy(parameters.count, parameters.size, parameters.radius, parameters.branches, parameters.spin);
  });

gui
  .add(parameters, 'size')
  .min(0.001)
  .max(0.1)
  .step(0.001)
  .onFinishChange(() => {
    generateGalaxy(parameters.count, parameters.size, parameters.radius, parameters.branches, parameters.spin);
  });

gui
  .add(parameters, 'radius')
  .min(0.01)
  .max(20)
  .step(0.1)
  .onFinishChange(() => {
    generateGalaxy(parameters.count, parameters.size, parameters.radius, parameters.branches, parameters.spin);
  });

gui
  .add(parameters, 'branches')
  .min(2)
  .max(20)
  .step(1)
  .onFinishChange(() => {
    generateGalaxy(parameters.count, parameters.size, parameters.radius, parameters.branches, parameters.spin);
  });

gui
  .add(parameters, 'spin')
  .min(-5)
  .max(5)
  .step(.001)
  .onFinishChange(() => {
    generateGalaxy(parameters.count, parameters.size, parameters.radius, parameters.branches, parameters.spin);
  });

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 3;
camera.position.y = 3;
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
