import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

/**
 * Base
 */

const gui = new GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Light
 */

// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xffffff, 30);
// pointLight.position.set(2, 3, 4);
// scene.add(pointLight);

/**
 * Environment map
 */

const rgbeLoader = new RGBELoader();
rgbeLoader.load('./textures/environmentMap/2k.hdr', (envMap) => {
  envMap.mapping = THREE.EquirectangularReflectionMapping;

  scene.background = envMap;
  scene.environment = envMap;
});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/**
 * Texture Loader
 */

const loader = new THREE.TextureLoader();
const doorColor = loader.load('./textures/door/color.jpg');
doorColor.colorSpace = THREE.SRGBColorSpace;
const doorAlpha = loader.load('./textures/door/alpha.jpg');
const doorAmbientOcclusion = loader.load(
  './textures/door/ambientOcclusion.jpg'
);
const doorHeight = loader.load('./textures/door/height.jpg');
const doorNormal = loader.load('./textures/door/normal.jpg');
const doorMetallness = loader.load('./textures/door/metalness.jpg');
const doorRoughness = loader.load('./textures/door/roughness.jpg');

const matcap = loader.load('./textures/matcaps/8.png');
matcap.colorSpace = THREE.SRGBColorSpace;
const gradient = loader.load('./textures/gradients/5.jpg');

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
 * Meshes
 */
// const material = new THREE.MeshBasicMaterial({});
// material.color = new THREE.Color('cyan');

// material.wireframe = true;
// material.transparent = true;
// material.opacity = 0.8;
// material.alphaMap = doorAlpha;
// const material = new THREE.MeshNormalMaterial();
// material.side = THREE.DoubleSide;
// material.flatShading = true;

// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcap;

// const material = new THREE.MeshLambertMaterial();
// const material = new THREE.MeshDepthMaterial();
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 1000;
// material.specular = new THREE.Color(0x1188ff);

// const material = new THREE.MeshToonMaterial();
// gradient.minFilter = THREE.NearestFilter;
// gradient.magFilter = THREE.NearestFilter;
// gradient.generateMipmaps = false;
// material.gradientMap = gradient;

// const material = new THREE.MeshStandardMaterial();
// material.metalness = 1;
// material.roughness = 1;
// material.side = THREE.FrontSide;
// material.map = doorColor;
// const materialFolder = gui.addFolder('Material');
// materialFolder.add(material, 'metalness').min(0).max(1).step(0.0001);
// materialFolder.add(material, 'roughness').min(0).max(1).step(0.0001);
// materialFolder.add(material, 'side').options({
//   double: THREE.DoubleSide,
//   front: THREE.FrontSide,
//   back: THREE.BackSide,
// });
// materialFolder.add(material, 'map', {
//   doorColor,
//   doorAlpha,
//   doorAmbientOcclusion,
//   doorHeight,
//   doorNormal,
//   doorMetallness,
//   doorRoughness,
//   matcap,
//   gradient,
// });
// material.aoMap = doorAmbientOcclusion;
// material.aoMapIntensity = 1;
// material.metalnessMap = doorMetallness;
// material.roughness = doorRoughness;
// material.normalMap = doorNormal;
// material.normalScale.set(0.5, 0.5);
// material.transparent = true;
// material.alphaMap = doorAlpha;
// const aoFolder = materialFolder.addFolder('AOMap');
// aoFolder.add(material, 'aoMap', {
//   doorColor,
//   doorAlpha,
//   doorAmbientOcclusion,
//   doorHeight,
//   doorNormal,
//   doorMetallness,
//   doorRoughness,
//   matcap,
//   gradient,
// });
// aoFolder.add(material, 'aoMapIntensity', 0, 1, 0.001);
// material.displacementMap = doorHeight;
// material.displacementScale = 0;
// aoFolder.add(material, 'displacementScale', 0, 1, 0.001);

//// MeshPhysicalMaterial

const material = new THREE.MeshPhysicalMaterial();
material.metalness = 0;
material.roughness = 0;
// material.map = doorColor;
// material.aoMap = doorAmbientOcclusion;
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeight;
// material.displacementScale = 0.1;
// material.metalnessMap = doorMetallness;
// material.roughnessMap = doorRoughness;
// material.normalMap = doorNormal;
// material.normalScale.set(0.5, 0.5);
// material.transparent = true;
// material.alphaMap = doorAlpha;

// clearcoat
// material.clearcoat = 1;
// material.clearcoatRoughness = 0;

// gui.add(material, 'clearcoat').min(0).max(1).step(0.0001);
// gui.add(material, 'clearcoatRoughness').min(0).max(1).step(0.0001);

//sheen
// material.sheen = 1;
// material.sheenRoughness = 0.25;
// material.sheenColor.set(1, 1, 1);

// gui.add(material, 'sheen').min(0).max(1).step(0.0001);
// gui.add(material, 'sheenRoughness').min(0).max(1).step(0.0001);
// gui.addColor(material, 'sheenColor');

// iridescence
// material.iridescence = 1;
// material.iridescenceIOR = 1;
// material.iridescenceThicknessRange = [100, 800];
// gui.add(material, 'iridescence').min(0).max(1).step(0.0001);
// gui.add(material, 'iridescenceIOR').min(1).max(2.333).step(0.0001);
// gui.add(material.iridescenceThicknessRange, '0').min(1).max(1000).step(1);
// gui.add(material.iridescenceThicknessRange, '1').min(1).max(1000).step(1);

// transmission
material.transmission = 1;
material.ior = 2.417;
material.thickness = 0.5;
gui.add(material, 'transmission').min(0).max(1).step(0.0001);
gui.add(material, 'ior').min(0).max(10).step(0.0001);
gui.add(material, 'thickness').min(0).max(1).step(0.0001);

/**
 * mesh
 */
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  material
);

plane.position.x = -1.5;
torus.position.x = 1.5;
scene.add(torus, plane, sphere);

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

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = -0.15 * elapsedTime;
  plane.rotation.x = -0.15 * elapsedTime;
  torus.rotation.x = -0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
