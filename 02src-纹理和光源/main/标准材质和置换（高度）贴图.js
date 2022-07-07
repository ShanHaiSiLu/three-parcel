import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
const colorImg = require("../assets/textures/door/color.jpg")
const alphaImg = require("../assets/textures/door/alpha.jpg")
const ambImg = require("../assets/textures/door/ambientOcclusion.jpg")
const heightImg = require("../assets/textures/door/height.jpg")

// 场景
let scene = new THREE.Scene();

// 相机
// 通过将参数抽离的方式，避免被格式化
let arr = [45, window.innerWidth / window.innerHeight, 1, 100000];
let camera = new THREE.PerspectiveCamera(...arr);
camera.position.set(-1, 1, 7);
camera.lookAt(scene.position);

// 环境光
const light = new THREE.AmbientLight(0x404040);
scene.add(light);
// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// 导入纹理
let textureLoader = new THREE.TextureLoader();
let doorColorTexture = textureLoader.load(colorImg);
// 透明纹理的使用
let doorAlphaTexture = textureLoader.load(alphaImg);
// AO环境贴图
let doorAoTexture = textureLoader.load(ambImg);
// 置换贴图/高度贴图
const doorHeightTexture = textureLoader.load(heightImg);

// 添加物体
let cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 200, 200, 200);
let material = new THREE.MeshStandardMaterial({
  color: "#ffff00",
  map: doorColorTexture,
  transparent: true,
  alphaMap: doorAlphaTexture,
  aoMap: doorAoTexture, // 设置AO贴图
  aoMapIntensity: 1.5, // AO贴图强度
  side: THREE.DoubleSide,
  displacementMap: doorHeightTexture,
  displacementScale: 0.1,
});
let cube = new THREE.Mesh(cubeGeometry, material);
scene.add(cube);
// 设置另一组uv
cubeGeometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2)
);

// 添加一个平面
let planeGeometry = new THREE.PlaneBufferGeometry(1, 1, 200, 200);
let plane = new THREE.Mesh(planeGeometry, material);
plane.position.set(1.5, 0, 0);
// 设置平面的另一组uv
planeGeometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2)
);
scene.add(plane);

// 渲染器
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
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
