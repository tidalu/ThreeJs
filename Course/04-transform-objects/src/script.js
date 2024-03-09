import * as THREE from 'three';

const canvas = document.querySelector('canvas.webgl');

const scene = new THREE.Scene();

const object = new THREE.Mesh(
  new THREE.BoxGeometry(2, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
object.position.x = 0.7;
object.position.y = -0.6;

object.position.set(0.7, -0.9, 0);

object.scale.x = 2;
object.scale.y = 0.5;
object.scale.z = 0.5;
scene.add(object);

const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

const sizes = {
  width: 800,
  height: 600,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

camera.position.z = 3;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
