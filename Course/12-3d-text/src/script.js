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

const MatcapsTextures = {
  Texture_44: '/textures/matcaps/44.png',
  Texture_43: '/textures/matcaps/43.png',
  Texture_42: '/textures/matcaps/42.png',
  Texture_41: '/textures/matcaps/41.png',
  Texture_40: '/textures/matcaps/40.png',
  Texture_39: '/textures/matcaps/39.png',
  Texture_38: '/textures/matcaps/38.png',
  Texture_37: '/textures/matcaps/37.png',
  Texture_36: '/textures/matcaps/36.png',
  Texture_35: '/textures/matcaps/35.png',
  Texture_34: '/textures/matcaps/34.png',
  Texture_33: '/textures/matcaps/33.png',
  Texture_32: '/textures/matcaps/32.png',
  Texture_31: '/textures/matcaps/31.png',
  Texture_30: '/textures/matcaps/30.png',
  Texture_29: '/textures/matcaps/29.png',
  Texture_28: '/textures/matcaps/28.png',
  Texture_27: '/textures/matcaps/27.png',
  Texture_26: '/textures/matcaps/26.png',
  Texture_25: '/textures/matcaps/25.png',
  Texture_24: '/textures/matcaps/24.png',
  Texture_23: '/textures/matcaps/23.png',
  Texture_22: '/textures/matcaps/22.png',
  Texture_21: '/textures/matcaps/21.png',
  Texture_20: '/textures/matcaps/20.png',
  Texture_19: '/textures/matcaps/19.png',
  Texture_18: '/textures/matcaps/18.png',
  Texture_17: '/textures/matcaps/17.png',
  Texture_16: '/textures/matcaps/16.png',
  Texture_15: '/textures/matcaps/15.png',
  Texture_14: '/textures/matcaps/14.png',
  Texture_13: '/textures/matcaps/13.png',
  Texture_12: '/textures/matcaps/12.png',
  Texture_11: '/textures/matcaps/11.png',
  Texture_10: '/textures/matcaps/10.png',
  Texture_9: '/textures/matcaps/9.png',
  Texture_8: '/textures/matcaps/8.png',
  Texture_7: '/textures/matcaps/7.png',
  Texture_6: '/textures/matcaps/6.png',
  Texture_5: '/textures/matcaps/5.png',
  Texture_4: '/textures/matcaps/4.png',
  Texture_3: '/textures/matcaps/3.png',
  Texture_2: '/textures/matcaps/2.png',
  Texture_1: '/textures/matcaps/1.png',
};

const options = {
  matcap: 'Texture_11',
};

/**
 * Font Loader
 */

// let textMesh;
let text;
const fontLoader = new FontLoader();
fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
  const textGeometry = new TextGeometry('Ulugbek', {
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

  const material = new THREE.MeshMatcapMaterial();
  material.matcap = matcapTexture;
  // textMesh = new THREE.Mesh(textGeometry, material);
  // textMesh.scale.set(2, 2, 2);
  // scene.add(textMesh);

  //   textGeometry.computeBoundingBox();
  //   textGeometry.translate(
  //     -(textGeometry.boundingBox.max.x - 0.02) * 0.5,
  //     -(textGeometry.boundingBox.max.y - 0.02) * 0.5,
  //     -(textGeometry.boundingBox.max.z - 0.03) * 0.5
  //   );

  gui
    .add({ text: 'Ulugbek' }, 'text')
    .name('Name/Ismingiz:')
    .onChange((input) => {
      text.geometry.dispose();
      const newTextGeometry = new TextGeometry(input, {
        font: font,
        size: 0.5,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 24,
      });
      newTextGeometry.center();
      text.geometry = newTextGeometry;
    });

  textGeometry.center();

  const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: donutTexture });
  const donutGeometry = new THREE.TorusGeometry(-0.3, -0.2, 20, 45);

  material.matcap = matcapTexture;
  text = new THREE.Mesh(textGeometry, material);
  text.scale.set(2, 2, 2);
  scene.add(text);

  gui
    .add(options, 'matcap', MatcapsTextures)
    .name('material/tanlang:')
    .onChange(() => {
      material.matcap = textureLoader.load(options.matcap);
    });

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
  let Elements = {
    showElements: true,
    count: 50,
  };

  gui
    .add(Elements, 'showElements')
    .name('Elements/elementlar :')
    .onChange(() => {
      scene.traverse((child) => {
        if (
          child instanceof THREE.Mesh &&
          !isTextGeometry(child) &&
          child !== text
        ) {
          child.visible = Elements.showElements;
        }
      });
    });
  for (let i = 0; i < Elements.count; i++) {
    if (Elements.showElements) {
      const donut = new THREE.Mesh(donutGeometry, donutMaterial);

      const octahedronMesh = new THREE.Mesh(octahedronGeometry, coneMaterial);
      const heartMesh = new THREE.Mesh(heartGeometry, hearMaterial);

      donut.position.x = (Math.random() - 0.5) * 10;
      donut.position.y = (Math.random() - 0.5) * 10;
      donut.position.z = (Math.random() - 0.5) * 10;

      octahedronMesh.position.x = (Math.random() - 0.5) * 10;
      octahedronMesh.position.y = (Math.random() - 0.5) * 10;
      octahedronMesh.position.z = (Math.random() - 0.5) * 10;

      heartMesh.position.x = (Math.random() - 0.5) * 10;
      heartMesh.position.y = (Math.random() - 0.5) * 10;
      heartMesh.position.z = (Math.random() - 0.5) * 10;

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
  antialias: false,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000, 0);

/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // meshesh rotate
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh && !isTextGeometry(child)) {
      child.rotation.x += 0.015;
      child.rotation.y += 0.015;
    }
  });

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

let backgroundColor = {
  color: '#ffffff',
};

gui
  .addColor(backgroundColor, 'color')
  .name('orqa fon/ background :')
  .onChange(updateBackgroundColor);

function updateBackgroundColor(color) {
  scene.background = new THREE.Color(color);
}

updateBackgroundColor(backgroundColor.color);

function isTextGeometry(child) {
  return child.geometry instanceof TextGeometry;
}

tick();
