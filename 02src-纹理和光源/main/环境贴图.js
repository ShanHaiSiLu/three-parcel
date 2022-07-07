import * as THREE from "three";
import { SphereBufferGeometry } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

const pxImg = require("../assets/textures/environmentMaps/1/px.jpg");
const nxImg = require("../assets/textures/environmentMaps/1/nx.jpg");
const pyImg = require("../assets/textures/environmentMaps/1/py.jpg");
const nyImg = require("../assets/textures/environmentMaps/1/ny.jpg");
const pzImg = require("../assets/textures/environmentMaps/1/pz.jpg");
const nzImg = require("../assets/textures/environmentMaps/1/nz.jpg");

// 设置cube纹理加载器
const cubeTxtrureLoader = new THREE.CubeTextureLoader();
const envMapTecture = cubeTxtrureLoader.load([
  pxImg,
  nxImg,
  pyImg,
  nyImg,
  pzImg,
  nzImg,
]);

// 添加球体
const sphereGeometry = new THREE.SphereBufferGeometry(1, 20, 20);
const material = new THREE.MeshStandardMaterial({
  metalness: 0.7, // 金属度
  roughness: 0.1, // 粗糙度
  envMap: envMapTecture,
});
const sphere = new THREE.Mesh(sphereGeometry, material);
scene.add(sphere);

// 渲染器
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 控制器
new OrbitControls(camera, renderer.domElement);

// 辅助坐标
let axesHelper = new THREE.AxesHelper(25);
scene.add(axesHelper);

// 渲染函数
function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
