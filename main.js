import { sortInstancedMesh } from 'three/examples/jsm/utils/SceneUtils.js';
import './style.css' 
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);  
renderer.setSize(window.innerWidth, window.innerHeight);  
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347});

const torus = new THREE.Mesh(geometry, material);
const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;
scene.add(torus); 

const pointLight = new THREE.PointLight(0xffffff);
const lightHelper = new THREE.PointLightHelper(pointLight);
const light = new THREE.AmbientLight(0xffffff);
const gridHelper = new THREE.GridHelper(200, 50);
pointLight.position.set(5, 5, 5);
pointLight.intensity = 3000;
pointLight.distance = 2000;
scene.add(pointLight);
scene.add(light);
scene.add(lightHelper);
scene.add(gridHelper);

const jeffTexture = new THREE.TextureLoader().load('jeff.png');
const jeff = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: jeffTexture })
);
scene.add(jeff);

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load('moon.jpg') ,
  normalMap: new THREE.TextureLoader().load('normal.jpg')
  })
);
scene.add(moon);

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
} 

animate();





