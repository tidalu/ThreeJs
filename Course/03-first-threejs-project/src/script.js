import * as Three from 'three';

const canvas = document.querySelector('canvas.webgl');

// scene
const scene = new Three.Scene();

// object

const geometry = new Three.BoxGeometry(2, 2, 2);
const material = new Three.MeshBasicMaterial({
  color: 'blue',
  wireframe: true,
});
const mesh = new Three.Mesh(geometry, material);

scene.add(mesh);

// camera
let sizes = {
  width: 1000,
  height: 800,
};

const camera = new Three.PerspectiveCamera(35, sizes.width / sizes.height);
camera.position.z = 5;
scene.add(camera);

// renderer
const renderer = new Three.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
