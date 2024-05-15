import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';

// Only three types of lights support shadows in Three.js: DirectionalLight, SpotLight, and PointLight.
// AmbientLight and HemisphereLight do not support shadows.
// The DirectionalLight is the most common light for casting shadows.
// The SpotLight is used for spotlights, such as a flashlight or a car headlight.
// The PointLight is used for omnidirectional lights, such as a light bulb or a candle.

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Texture Loade
 */

const textureLoader = new THREE.TextureLoader();
const bakedShadow = textureLoader.load('/textures/bakedShadow.jpg', () => {
  console.log('loaded');
});
const simpleShadow = textureLoader.load('/textures/simpleShadow.jpg', () => {
  console.log('loaded');
});
bakedShadow.colorSpace = THREE.SRGBColorSpace;

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
gui.add(ambientLight, 'intensity').min(0).max(3).step(0.001);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(2, 2, -1);
gui.add(directionalLight, 'intensity').min(0).max(3).step(0.001);
gui.add(directionalLight.position, 'x').min(-5).max(5).step(0.001);
gui.add(directionalLight.position, 'y').min(-5).max(5).step(0.001);
gui.add(directionalLight.position, 'z').min(-5).max(5).step(0.001);

directionalLight.castShadow = true;

directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;

directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.bottom = -2.5;
directionalLight.shadow.camera.left = -3;
directionalLight.shadow.camera.right = 3;

directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 9;

directionalLight.shadow.radius = 10;

const directionalLightCameraHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
scene.add(directionalLight, directionalLightCameraHelper);

/**
 *
 * spotLight
 */
const spotlight = new THREE.SpotLight(0xffffff, 3.6, 20, 0.73);
spotlight.castShadow = true;
spotlight.position.set(0, 2, 2);
scene.add(spotlight);

scene.add(spotlight.target);

spotlight.shadow.mapSize.width = 1024;
spotlight.shadow.mapSize.height = 1024;
spotlight.shadow.camera.fov = 30;

spotlight.shadow.camera.near = 1;
spotlight.shadow.camera.far = 6;

gui.add(spotlight, 'intensity').min(0).max(10).step(0.001);
gui.add(spotlight.position, 'x').min(-5).max(5).step(0.001);
gui.add(spotlight.position, 'y').min(-5).max(5).step(0.001);
gui.add(spotlight.position, 'z').min(-5).max(5).step(0.001);
gui.add(spotlight, 'distance').min(0).max(20).step(0.001);
gui
  .add(spotlight, 'angle')
  .min(0)
  .max(Math.PI * 0.5)
  .step(0.001);
gui.add(spotlight, 'penumbra').min(0).max(1).step(0.001);

const spotLightCameraHelper = new THREE.CameraHelper(spotlight.shadow.camera);
scene.add(spotLightCameraHelper);

/**
 * POintlight
 */

const pointlight = new THREE.PointLight(0xffffff, 2.7);

pointlight.castShadow = true;

pointlight.position.set(-1, 1, 0);
gui.add(pointlight, 'intensity').min(0).max(10).step(0.001);
gui.add(pointlight.position, 'x').min(-5).max(5).step(0.001);
gui.add(pointlight.position, 'y').min(-5).max(5).step(0.001);
gui.add(pointlight.position, 'z').min(-5).max(5).step(0.001);
pointlight.shadow.mapSize.width = 1024;
pointlight.shadow.mapSize.height = 1024;

pointlight.shadow.camera.near = 0.1;
pointlight.shadow.camera.far = 3;
scene.add(pointlight);

const pointLightHelper = new THREE.CameraHelper(pointlight.shadow.camera);

scene.add(pointLightHelper);
// axis helper
const axisHelper = new THREE.AxesHelper(2);
scene.add(axisHelper);

/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.7;
gui.add(material, 'metalness').min(0).max(1).step(0.001);
gui.add(material, 'roughness').min(0).max(1).step(0.001);

/**
 * Objects
 */
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
const spotlightTarget = new THREE.Object3D();
spotlightTarget.position.set(
  sphere.position.x,
  sphere.position.y,
  sphere.position.z
);
scene.add(spotlightTarget);
spotlight.target = spotlightTarget;

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(5, 5),
  // new THREE.MeshBasicMaterial({ map: bakedShadow }) // we can set baked shadow as a texture here
  material
);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.5;
sphere.castShadow = true;
plane.receiveShadow = true;

scene.add(sphere, plane);

const sphereShadow = new THREE.Mesh(
  new THREE.PlaneGeometry(1.5, 1.5),
  new THREE.MeshBasicMaterial({
    alphaMap: simpleShadow,
    color: 0x000000,
    transparent: true,
    side: THREE.DoubleSide,
  })
);

sphereShadow.rotation.x = -Math.PI * 0.5;
sphereShadow.position.y = plane.position.y + 0.001;

scene.add(sphereShadow);
console.log(sphereShadow);

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
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
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

renderer.shadowMap.enabled = false;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Update helpers
scene.traverse((child) => {
  if (child instanceof THREE.CameraHelper) {
    child.visible = false;
  }
});

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // update sphere
  sphere.position.x = Math.cos(elapsedTime) * 1.5;
  sphere.position.y = Math.abs(Math.sin(elapsedTime * 3));
  sphere.position.z = Math.sin(elapsedTime) * 1.5;

  // update shadow

  sphereShadow.position.x = sphere.position.x;
  sphereShadow.position.z = sphere.position.z;
  sphereShadow.material.opacity = (1 - sphere.position.y) * 0.5;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
