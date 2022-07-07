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

const colorImg = require("../assets/textures/door/color.jpg");
const alphaImg = require("../assets/textures/door/alpha.jpg");

// 导入纹理
let textureLoader = new THREE.TextureLoader();
let doorColorTexture = textureLoader.load(colorImg);
// 透明纹理的使用
let doorAlphaTexture = textureLoader.load(alphaImg);

// 添加物体
let cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshBasicMaterial({
  color: "#ffff00",
  map: doorColorTexture,
  alphaMap: doorAlphaTexture,
  transparent: true,
  side: THREE.DoubleSide    // 双面渲染
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
