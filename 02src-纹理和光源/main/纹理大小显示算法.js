import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// 场景
let scene = new THREE.Scene();

// 相机
// 通过将参数抽离的方式，避免被格式化
let arr = [45, window.innerWidth / window.innerHeight, 1, 100000];
let camera = new THREE.PerspectiveCamera(...arr);
camera.position.set(1, 1, 3);
camera.lookAt(scene.position);

const minecraftImg = require("../assets/textures/minecraft.png");

// 导入纹理
let textureLoader = new THREE.TextureLoader();
let texture = textureLoader.load(minecraftImg);
texture.minFilter = THREE.NearestFilter; // 一个纹素小于一个实际像素的处理方案
texture.magFilter = THREE.NearestFilter; // 一个纹素大于一个实际像素的处理方案
console.log(texture, THREE.NearestFilter);

// 添加物体
let cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshBasicMaterial({
  color: "#ffff00",
  map: texture,
});
let cube = new THREE.Mesh(cubeGeometry, material);
scene.add(cube);

// 渲染器
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xb9d3ff, 1);
document.body.appendChild(renderer.domElement);

// 控制器
let controls = new OrbitControls(camera, renderer.domElement);

// 辅助坐标
let axesHelper = new THREE.AxesHelper(25);
scene.add(axesHelper);

// 渲染函数
function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
