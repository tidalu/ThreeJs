import * as THREE from 'three';

const canvas = document.querySelector('canvas.webgl');

const scene = new THREE.Scene();

const group = new THREE.Group()
scene.add(group)

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1,1 ), 
  new THREE.MeshBasicMaterial({
    color: 'purple', 
    wireframe: true
  })
)

cube1.position.x = -2
const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1,1 ), 
  new THREE.MeshBasicMaterial({
    color: 'blue', 
    wireframe: true
  })
)
const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1,1 ), 
  new THREE.MeshBasicMaterial({
    color: 'green', 
    wireframe: true
  })
) 
cube3.position.x = 2

group.add(cube1)
group.add(cube2)
group.add(cube3)

group.scale.set(0.7, 0.7, 0.7)


const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

const sizes = {
  width: 800,
  height: 600,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

camera.position.z = 3;
scene.add(camera);
// camera.lookAt(object.position)

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera)
function animate() {
  requestAnimationFrame(animate);
  cube1.rotation.x += 0.01;
  cube1.rotation.y += 0.01;
  cube2.rotation.x += 0.01;
  cube2.rotation.y += 0.01;
  cube3.rotation.x += 0.01;
  cube3.rotation.y += 0.01;
  group.rotation.x += 0.01;
  group.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
