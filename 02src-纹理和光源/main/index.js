import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
const gui = new dat.GUI();

// 场景
let scene = new THREE.Scene();

// 相机
// 通过将参数抽离的方式，避免被格式化
let arr = [45, window.innerWidth / window.innerHeight, 1, 100000];
let camera = new THREE.PerspectiveCamera(...arr);
camera.position.set(0, 15, 20);
camera.lookAt(scene.position);

// 添加球体
const sphereGeometry = new THREE.SphereBufferGeometry(1, 20, 20);
const material = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
});
const sphere = new THREE.Mesh(sphereGeometry, material);
// 开启阴影投射
sphere.castShadow = true;
scene.add(sphere);

// 添加平面
const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(50, 50), material);
plane.rotation.x = -Math.PI / 2;
plane.position.set(0, -1, 0);
// 开启接收阴影
plane.receiveShadow = true;
scene.add(plane);

// 环境光
const light = new THREE.AmbientLight(0x404040);
scene.add(light);
// 点光源
const pointLight = new THREE.PointLight(0xff0000, 5);
// 设置光源开启阴影投射
pointLight.castShadow = true;
// 设置点光源的实体球
let pointBall = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.1, 20, 20),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
pointBall.position.set(5, 5, 5);
pointBall.add(pointLight);
scene.add(pointBall);

// 设置阴影贴图模糊度
pointLight.shadow.radius = 20;
// 设置阴影贴图分辨率
let k = 12;
pointLight.shadow.mapSize.set(2 ** k, 2 ** k);

gui.add(pointBall.position, "x").min(-5).max(5).step(0.1);
gui.add(pointLight, "distance").min(0).max(15).step(0.01);
gui.add(pointLight, "decay").min(0).max(5).step(0.01);

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
  let time = clock.getElapsedTime();
  pointBall.position.x = Math.sin(time) * 3;
  pointBall.position.z = Math.cos(time) * 3;
  pointBall.position.y = Math.sin(time*3);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
