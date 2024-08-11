import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/**
 *
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// load models
let model = null;
const gltfLoader = new GLTFLoader();
gltfLoader.load('/models/Duck/glTF-Binary/Duck.glb', (gltf) => {
  model = gltf.scene;
  scene.add(gltf.scene);
});

/**
 * Objects
 */
const object1 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: '#ff0000' })
);
object1.position.x = -2;

const object2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: '#ff0000' })
);

const object3 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: '#ff0000' })
);
object3.position.x = 2;

scene.add(object1, object2, object3);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2.1);
directionalLight.position.set(2, 2, 2);
scene.add(directionalLight);

/**
 * Raycaster
 */

object1.updateMatrixWorld();
object2.updateMatrixWorld();
object3.updateMatrixWorld();

const raycaster = new THREE.Raycaster();

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

// Mouse
const mouse = new THREE.Vector2();
window.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -(event.clientY / sizes.height) * 2 + 1;
});

window.addEventListener('click', (event) => {
  if (currentIntersect) {
    switch (currentIntersect.object) {
      case object1:
        console.log('click on object1');
        break;
      case object2:
        console.log('click on object2');
        break;
      case object3:
        console.log('click on object3');
        break;
    }
  }
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
let currentIntersect = null;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5;
  object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5;
  object3.position.y = Math.sin(elapsedTime * 1.4) * 1.5;

  //   const rayOrigin = new THREE.Vector3(-3, 0, 0);
  //   const rayDirection = new THREE.Vector3(10, 0, 0);
  //   rayDirection.normalize();
  //   raycaster.set(rayOrigin, rayDirection);
  const objectToTest = [object1, object2, object3];
  const intersect = raycaster.intersectObject(object2);
  const intersects = raycaster.intersectObjects(objectToTest);

  for (let obj of objectToTest) {
    obj.material.color = new THREE.Color('#ff0000');
  }
  for (const intersect of intersects) {
    intersect.object.material.color = new THREE.Color('#0000ff');
  }

  if (intersects.length) {
    if (currentIntersect === null) {
      console.log('mouse enter');
    }
    currentIntersect = intersects[0];
  } else {
    if (currentIntersect !== null) {
      console.log('mouse leave');
    }
    currentIntersect = null;
  }
  if (model) {
    const modelIntersect = raycaster.intersectObject(model, true);
    if (modelIntersect.length) {
      model.scale.set(1.2, 1.2, 1.2);
    } else {
      model.scale.set(1, 1, 1);
    }
  }
  raycaster.setFromCamera(mouse, camera);

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
