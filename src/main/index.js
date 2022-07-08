import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// 场景
let scene = new THREE.Scene();

// 相机
// 通过将参数抽离的方式，避免被格式化
let arr = [45, window.innerWidth / window.innerHeight, 0.01, 4000];
let camera = new THREE.PerspectiveCamera(...arr);
camera.position.set(10, 15, 30);
camera.lookAt(scene.position);

const cubeMaterial = new THREE.MeshStandardMaterial();

// 添加光
// 环境光
const ambLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambLight);
// 平行光
const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
dirLight.castShadow = true;
scene.add(dirLight);

// 渲染器
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// 设置渲染器开启阴影计算
renderer.shadowMap.enabled = true;
// 开启渲染器的物理渲染模式（用于计算衰减量）
renderer.physicallyCorrectLights = true;
document.body.appendChild(renderer.domElement);

// 控制器
new OrbitControls(camera, renderer.domElement);

// 辅助坐标
let axesHelper = new THREE.AxesHelper(25);
scene.add(axesHelper);

// 设置时钟
let clock = new THREE.Clock();

// 渲染函数
function render() {
  // let time = clock.getElapsedTime();
  // 获取两帧知之间的时间差
  let deltaTime = clock.getDelta();

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
