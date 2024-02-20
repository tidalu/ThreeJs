import * as THREE from 'three';

const canvas = document.querySelector('canvas.webgl');
// Sceene
const scene = new THREE.Scene();

// Object
const myGeometry = new THREE.BoxGeometry(1, 1, 1); // width , height and depth,
const material = new THREE.MeshBasicMaterial({
  color: 'green',
});
const mesh = new THREE.Mesh(myGeometry, material);

scene.add(mesh);

// camera
// Lets start with the PerspectiveCamera class, Two essential paramters: field of view and aspect ratio
let sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);
