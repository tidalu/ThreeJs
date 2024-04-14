import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

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
const matcapTexture = textureLoader.load('/textures/matcaps/11.png');
matcapTexture.colorSpace = THREE.SRGBColorSpace;
const heartTexture = textureLoader.load('/textures/matcaps/12.png');
heartTexture.colorSpace == THREE.SRGBColorSpace;

const coneTexture = textureLoader.load('/textures/matcaps/8.png');
coneTexture.colorSpace == THREE.SRGBColorSpace;

const donutTexture = textureLoader.load('/textures/matcaps/1.png');
donutTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * Font Loader
 */
const fontLoader = new FontLoader();
fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
  const textGeometry = new TextGeometry('Zebiniso', {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 12,
  });

  //   textGeometry.computeBoundingBox();
  //   textGeometry.translate(
  //     -(textGeometry.boundingBox.max.x - 0.02) * 0.5,
  //     -(textGeometry.boundingBox.max.y - 0.02) * 0.5,
  //     -(textGeometry.boundingBox.max.z - 0.03) * 0.5
  //   );

  textGeometry.center();

  const material = new THREE.MeshMatcapMaterial();
  material.matcap = matcapTexture;
  const text = new THREE.Mesh(textGeometry, material);
  text.scale.set(2, 2, 2);
  scene.add(text);
  const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: donutTexture });
  const donutGeometry = new THREE.TorusGeometry(-0.3, -0.2, 20, 45);

  function createHeartGeometry() {
    const x = 0,
      y = 0;
    const heartShape = new THREE.Shape();

    heartShape.moveTo(x + 0.5, y + 0.5);
    heartShape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
    heartShape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
    heartShape.bezierCurveTo(
      x - 0.6,
      y + 1.1,
      x - 0.3,
      y + 1.4,
      x + 0.5,
      y + 1.9
    );
    heartShape.bezierCurveTo(
      x + 1.2,
      y + 1.54,
      x + 1.6,
      y + 1.1,
      x + 1.6,
      y + 0.7
    );
    heartShape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1.0, y);
    heartShape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);
    const extrudeSettings = {
      steps: 2,
      depth: 0.25,
      bevelEnabled: false,
    };

    return new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
  }

  // Create an OctahedronGeometry
  const octahedronGeometry = new THREE.OctahedronGeometry(0.5);

  // Create a heart geometry
  const heartGeometry = createHeartGeometry();
  heartGeometry.scale(0.5, 0.5, 0.5);
  const hearMaterial = new THREE.MeshMatcapMaterial();
  hearMaterial.matcap = heartTexture;

  const coneMaterial = new THREE.MeshMatcapMaterial({ matcap: coneTexture });

  for (let i = 0; i < 200; i++) {
    const donut = new THREE.Mesh(donutGeometry, donutMaterial);

    const octahedronMesh = new THREE.Mesh(octahedronGeometry, coneMaterial);
    const heartMesh = new THREE.Mesh(heartGeometry, hearMaterial);

    donut.position.x = (Math.random() - 0.5) * 20;
    donut.position.y = (Math.random() - 0.5) * 20;
    donut.position.z = (Math.random() - 0.5) * 20;

    octahedronMesh.position.x = (Math.random() - 0.5) * 20;
    octahedronMesh.position.y = (Math.random() - 0.5) * 20;
    octahedronMesh.position.z = (Math.random() - 0.5) * 20;

    heartMesh.position.x = (Math.random() - 0.5) * 20;
    heartMesh.position.y = (Math.random() - 0.5) * 20;
    heartMesh.position.z = (Math.random() - 0.5) * 20;

    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.y = Math.random() * Math.PI;

    octahedronMesh.rotation.x = Math.random() * Math.PI;
    octahedronMesh.rotation.y = Math.random() * Math.PI;

    heartMesh.rotation.x = Math.random() * Math.PI;
    heartMesh.rotation.y = Math.random() * Math.PI;

    const scale = Math.random() * 1.2;

    donut.scale.set(scale, scale, scale);
    octahedronMesh.scale.set(scale, scale, scale);
    heartMesh.scale.set(scale, scale, scale);

    scene.add(donut);
    scene.add(octahedronMesh);
    scene.add(heartMesh);
  }
});

// axis helper

const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

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
renderer.setClearColor(0xffffff);

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
