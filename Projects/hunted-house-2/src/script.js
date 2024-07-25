import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Timer } from 'three/addons/misc/Timer.js';
import GUI from 'lil-gui';

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
 * Textures
 */

const textureLoader = new THREE.TextureLoader();

// Floor

const floorAlpha = textureLoader.load('./floor/alpha.jpg');
const floorColor = textureLoader.load(
  './floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.jpg'
);
const floorARM = textureLoader.load(
  './floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.jpg'
);
const floorNormal = textureLoader.load(
  './floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.jpg'
);
const floorDisp = textureLoader.load(
  './floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.jpg'
);

floorColor.colorSpace = THREE.SRGBColorSpace;

floorColor.repeat.set(8, 8);
floorARM.repeat.set(8, 8);
floorNormal.repeat.set(8, 8);
floorDisp.repeat.set(8, 8);

floorColor.wrapS = THREE.RepeatWrapping;
floorColor.wrapT = THREE.RepeatWrapping;

floorARM.wrapS = THREE.RepeatWrapping;
floorARM.wrapT = THREE.RepeatWrapping;

floorNormal.wrapS = THREE.RepeatWrapping;
floorNormal.wrapT = THREE.RepeatWrapping;

floorDisp.wrapS = THREE.RepeatWrapping;
floorDisp.wrapT = THREE.RepeatWrapping;

// walls

const wallColor = textureLoader.load(
  './walls/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.jpg',
  () => {
    console.log('loaded');
  }
);
const wallARM = textureLoader.load(
  './walls/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.jpg',
  () => {
    console.log('loaded');
  }
);
const wallNormal = textureLoader.load(
  './walls/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.jpg',
  () => {
    console.log('loaded');
  }
);

wallColor.colorSpace = THREE.SRGBColorSpace;

// roof

const roofColor = textureLoader.load(
  './roof/roof_slates_02_1k/roof_slates_02_diff_1k.jpg'
);
const roofARM = textureLoader.load(
  './roof/roof_slates_02_1k/roof_slates_02_arm_1k.jpg'
);
const roofNormal = textureLoader.load(
  './roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.jpg'
);

roofColor.colorSpace = THREE.SRGBColorSpace;

roofColor.repeat.set(3, 1);
roofARM.repeat.set(3, 1);
roofNormal.repeat.set(3, 1);

roofColor.wrapS = THREE.RepeatWrapping;
roofARM.wrapS = THREE.RepeatWrapping;
roofNormal.wrapS = THREE.RepeatWrapping;

// bushes

const bushColor = textureLoader.load(
  './bushes/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.jpg',
  () => {
    console.log('loaded');
  }
);
const bushARM = textureLoader.load(
  './bushes/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.jpg',
  () => {
    console.log('loaded');
  }
);
const bushNormal = textureLoader.load(
  './bushes/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.jpg',
  () => {
    console.log('loaded');
  }
);

bushColor.colorSpace = THREE.SRGBColorSpace;

bushColor.repeat.set(2, 1);
bushARM.repeat.set(2, 1);
bushNormal.repeat.set(2, 1);

bushColor.wrapS = THREE.RepeatWrapping;
bushARM.wrapS = THREE.RepeatWrapping;
bushNormal.wrapS = THREE.RepeatWrapping;

// graves

// bushes

const gravesColor = textureLoader.load(
  './graves/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.jpg',
  () => {
    console.log('loaded');
  }
);
const gravesARM = textureLoader.load(
  './graves/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.jpg',
  () => {
    console.log('loaded');
  }
);
const gravesNormal = textureLoader.load(
  './graves/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.jpg',
  () => {
    console.log('loaded');
  }
);

gravesColor.colorSpace = THREE.SRGBColorSpace;

gravesColor.repeat.set(0.3, 0.4);
gravesARM.repeat.set(0.3, 0.4);
gravesNormal.repeat.set(0.3, 0.4);

// door texture

const doorColorTexture = textureLoader.load('./door/color.jpg');
const doorAlphaTexture = textureLoader.load('./door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load(
  './door/ambientOcclusion.jpg'
);
const doorHeightTexture = textureLoader.load('./door/height.jpg');
const doorNormalTexture = textureLoader.load('./door/normal.jpg');
const doorMetalnessTexture = textureLoader.load('./door/metalness.jpg');
const doorRoughnessTexture = textureLoader.load('./door/roughness.jpg');

doorColorTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * House container
 */
const house = new THREE.Group();

// walls

const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: wallColor,
    aoMap: wallARM,
    roughnessMap: wallARM,
    metalnessMap: wallARM,
    normalMap: wallNormal,
  })
);

walls.position.y = walls.geometry.parameters.height / 2;

house.add(walls);

// roof

const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1, 4),
  new THREE.MeshStandardMaterial({
    map: roofColor,
    aoMap: roofARM,
    roughnessMap: roofARM,
    metalnessMap: roofARM,
    normalMap: roofNormal,
  })
);
roof.position.y =
  walls.geometry.parameters.height + roof.geometry.parameters.height / 2;
roof.rotation.y = Math.PI * 0.25;
house.add(roof);

// door

const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.15,
    displacementBias: -0.04,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
  })
);

door.position.y = door.geometry.parameters.height / 2;
door.position.z = walls.geometry.parameters.depth / 2 + 0.01;

console.log(walls.geometry.parameters.depth);

house.add(door);

// bushes

const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial(
  new THREE.MeshStandardMaterial({
    color: '#ccffcc',
    map: bushColor,
    aoMap: bushARM,
    roughnessMap: bushARM,
    metalnessMap: bushARM,
    normalMap: bushNormal,
  })
);

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.position.set(0.8, 0.2, 2.2);
bush1.scale.setScalar(0.5);
bush1.rotation.x = -0.75;

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.position.set(1.4, 0.1, 2.1);
bush2.scale.setScalar(0.25);
bush2.rotation.x = -0.75;

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.position.set(-0.8, 0.1, 2.2);
bush3.scale.setScalar(0.4);
bush3.rotation.x = -0.75;

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.position.set(-1, 0.05, 2.6);
bush4.scale.setScalar(0.15);
bush4.rotation.x = -0.75;

house.add(bush1, bush2, bush3, bush4);

scene.add(house);

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 200, 200),
  new THREE.MeshStandardMaterial({
    // wireframe: true,
    alphaMap: floorAlpha,
    transparent: true,
    map: floorColor,
    aoMap: floorARM,
    roughnessMap: floorARM,
    metalnessMap: floorARM,
    normalMap: floorNormal,
    displacementMap: floorDisp,
    displacementScale: 0.3,
    displacementBias: -0.2,
  })
);

gui
  .add(floor.material, 'displacementScale')
  .min(0)
  .max(1)
  .step(0.001)
  .name('Displacement scale');
gui
  .add(floor.material, 'displacementBias')
  .min(-1)
  .max(1)
  .step(0.001)
  .name('Displacement Bias');

floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

// Graves
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({
  map: gravesColor,
  aoMap: gravesARM,
  roughnessMap: gravesARM,
  metalnessMap: gravesARM,
  normalMap: gravesNormal,
});

const graves = new THREE.Group();

scene.add(graves);

for (let i = 0; i < 30; i++) {
  // angle
  const angle = Math.random() * Math.PI * 2;
  const radius = 3 + Math.random() * 4;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  // mesh
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.position.x = x;
  grave.position.y = Math.random() * 0.4;
  grave.position.z = z;
  grave.rotation.x = (Math.random() - 0.5) * 0.4;
  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  grave.rotation.z = (Math.random() - 0.5) * 0.4;

  // add to grave group
  graves.add(grave);
}

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight('#ffffff', 1.5);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);

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
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = false;

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
const timer = new Timer();

const tick = () => {
  // Timer
  timer.update();
  const elapsedTime = timer.getElapsed();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
