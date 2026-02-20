import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import {GUI} from 'three/addons/libs/lil-gui.module.min.js';

const gui = new GUI();

// WebGL 렌더러 생성 및 화면에 추가
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// FPS 표시용 Stats 추가
const stats = new Stats();
document.body.appendChild(stats.dom);

// 3D 씬과 카메라 설정
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// 마우스로 시점 조작 가능한 OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

// 방향성 조명 (태양광) - 그림자와 입체감 표현
const sun = new THREE.DirectionalLight();
sun.position.set(1, 2, 3);
scene.add(sun);

// 환경광 - 전체적으로 밝게, 그림자 부분도 어둡지 않게
const ambient = new THREE.AmbientLight();
scene.add(ambient);

// 큐브 생성 (기하체 + 재질)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 카메라 위치 설정 (z축으로 5만큼 뒤로)
camera.position.z = 5;
controls.update();

function animate() {
  controls.update();
  stats.update();
  renderer.render(scene, camera);
}

// 창 크기 변경 시 카메라 비율과 렌더러 크기 동기화 (반응형)
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const folder = gui.addFolder('큐브');
folder.add(cube.position, 'x', -2, 2, 0.1).name('위치 X');
folder.add(cube.position, 'y', -2, 2, 0.1).name('위치 Y');
folder.add(cube.position, 'z', -2, 2, 0.1).name('위치 Z');
folder.addColor(material, 'color');