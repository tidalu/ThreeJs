import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Fog
const fog = new THREE.Fog('#262837', 1, 20);

// Scene

const scene = new THREE.Scene();
scene.fog = fog;

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

// door texture
const doorColorTexture = textureLoader.load('/textures/door/color.jpg');
doorColorTexture.colorSpace = THREE.SRGBColorSpace;
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load(
  '/textures/door/ambientOcclusion.jpg'
);
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg');
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg');
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg');

// bricks texture
const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg');
bricksColorTexture.colorSpace = THREE.SRGBColorSpace;

const bricksAmbientOcclusionTexture = textureLoader.load(
  '/textures/bricks/ambientOcclusion.jpg'
);
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg');
const bricksRoughnessTexture = textureLoader.load(
  '/textures/bricks/roughness.jpg'
);

// grass texture
const grassColorTexture = textureLoader.load('/textures/grass/color.jpg');
grassColorTexture.colorSpace = THREE.SRGBColorSpace;
const grassAmbientOcclusionTexture = textureLoader.load(
  '/textures/grass/ambientOcclusion.jpg'
);
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg');
const grassRoughnessTexture = textureLoader.load(
  '/textures/grass/roughness.jpg'
);

grassColorTexture.repeat.set(8, 8);
grassAmbientOcclusionTexture.repeat.set(8, 8);
grassNormalTexture.repeat.set(8, 8);
grassRoughnessTexture.repeat.set(8, 8);

grassColorTexture.wrapS = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

grassColorTexture.wrapT = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

// grave texture

const graveTexture = textureLoader.load('/textures/matcaps/grave.png');
const graveSurafaceTexture = textureLoader.load('/textures/grave.png');

// roof texture
const roofColorTexture = textureLoader.load('/textures/roof/roof.jpg');

/**
 * House
 */

const house = new THREE.Group();
scene.add(house);

// walls

const walls = new THREE.Mesh(
  new THREE.BoxGeometry(6, 4, 6),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    side: THREE.DoubleSide,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
  })
);

walls.position.y = 2 + 0.01;
house.add(walls);

// Roof

const roof = new THREE.Mesh(
  new THREE.ConeGeometry(5, 3, 4),
  new THREE.MeshLambertMaterial({ map: roofColorTexture })
);

roofColorTexture.repeat.set(8, 2);
roofColorTexture.wrapS = THREE.RepeatWrapping;
roofColorTexture.wrapT = THREE.RepeatWrapping;

roof.position.y = 4 + 1.5;
roof.rotation.y = Math.PI * 0.25;

house.add(roof);

// door

const door = new THREE.Mesh(
  new THREE.PlaneGeometry(3.3, 3.3, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
  })
);

door.position.z = 3;
door.position.y = 1.5;

house.add(door);

// bushes

const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({
  map: grassColorTexture,
  aoMap: grassAmbientOcclusionTexture,
  normalMap: grassNormalTexture,
  roughnessMap: grassRoughnessTexture,
});

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.55, 0.55, 0.55);
bush1.position.set(1.3, 0.4, 3.5);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.3, 0.3, 0.3);
bush2.position.set(2, 0.25, 3 + 0.3);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-1.2, 0.25, 3 + 0.3);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.2, 0.2, 0.2);
bush4.position.set(-1.4, 0.15, 3.7);

house.add(bush1, bush2, bush3, bush4);

// graves
const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(1, 1.4, 0.4);
const graveMaterial = new THREE.MeshStandardMaterial({
  map: graveTexture,
});

const frontMaterial = new THREE.MeshStandardMaterial({
  map: graveSurafaceTexture,
});
const frontGeometry = new THREE.PlaneGeometry(1, 1.4);

for (let i = 0; i < 50; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 6 + Math.random() * 9;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  const rotationY = (Math.random() - 0.5) * 0.4;
  const rotationZ = (Math.random() - 0.5) * 0.4;

  const grave = new THREE.Mesh(graveGeometry, graveMaterial);

  grave.castShadow = true;
  grave.position.set(x, 0.61, z);
  grave.rotation.y = rotationY;
  grave.rotation.z = rotationZ;

  const front = new THREE.Mesh(frontGeometry, frontMaterial);
  const frontX = x;
  const frontY = 0.61;
  const frontZ = z + graveGeometry.parameters.depth / 2 + 0.01;

  const frontPosition = new THREE.Vector3(frontX, frontY, frontZ);
  front.position.copy(frontPosition);
  front.rotation.y = rotationY;
  front.rotation.z = rotationZ;

  graves.add(grave, front, roof);
}

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(30, 30),
  new THREE.MeshStandardMaterial({
    map: grassColorTexture,
    aoMap: grassAmbientOcclusionTexture,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture,
  })
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12);
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.26);
moonLight.position.set(4, 5, -2);
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001);
gui.add(moonLight.position, 'x').min(-5).max(5).step(0.001);
gui.add(moonLight.position, 'y').min(-5).max(5).step(0.001);
gui.add(moonLight.position, 'z').min(-5).max(5).step(0.001);
scene.add(moonLight);

// door light

const doorLight = new THREE.PointLight('#ff7d46', 2, 10);
doorLight.position.set(0, 3, 3.5);
doorLight.rotation.y = Math.PI * 0.5;
doorLight.decay = 0;

gui.add(doorLight, 'visible').name('switch Door Light');
house.add(doorLight);

/**
 * Ghosts
 */

const ghost1 = new THREE.PointLight('#ff00ff', 15, 15);
gui.add(ghost1, 'intensity').min(0).max(15).step(0.001);
gui.add(ghost1, 'distance').min(0).max(15).step(0.001);

scene.add(ghost1);
const ghost2 = new THREE.PointLight('#00ffff', 6, 3);
scene.add(ghost2);
const ghost3 = new THREE.PointLight('#ffff00', 6, 3);
scene.add(ghost3);
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
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setClearColor('#262837');
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

moonLight.castShadow = true;
doorLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

walls.castShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush4.castShadow = true;

floor.receiveShadow = true;

doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 7;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 7;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 7;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 7;

gui.close();
/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update Ghosts
  const ghost1Angle = elapsedTime * 0.5;
  ghost1.position.x = Math.cos(ghost1Angle) * 12;
  ghost1.position.z = Math.sin(ghost1Angle) * 12;
  ghost1.position.y = Math.sin(elapsedTime * 3);

  const ghost2Angle = -elapsedTime * 0.32;
  ghost2.position.x = Math.cos(ghost2Angle) * 8;
  ghost2.position.z = Math.sin(ghost2Angle) * 8;
  ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 0.25);

  const ghost3Angle = -elapsedTime * 0.2;
  ghost3.position.x =
    Math.cos(ghost3Angle) * (12 + Math.sin(elapsedTime * 0.032));
  ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5));
  ghost3.position.y = Math.sin(elapsedTime * 5) + Math.sin(elapsedTime * 0.2);

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
