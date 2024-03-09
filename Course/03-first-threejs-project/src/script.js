import * as Three from 'three';

const canvas = document.querySelector('canvas.webgl');
// scene
const scene = new Three.Scene();

const geometry = new Three.BoxGeometry(1, 1, 1);
const material = new Three.MeshBasicMaterial({
  color: 0xff0000,
});
const mesh = new Three.Mesh(geometry, material);
scene.add(mesh);

// sizes
const sizes = {
  height: 600,
  width: 800,
};

// camera
const camera = new Three.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 1.5;
scene.add(camera);

// renderer
const renderer = new Three.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
