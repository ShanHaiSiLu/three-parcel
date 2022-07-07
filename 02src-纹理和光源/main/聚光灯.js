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
camera.position.set(-1, 1, 7);
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
// 聚光灯
const spotLight = new THREE.SpotLight(0xffffff, 2);
spotLight.position.set(5, 5, 5);
// 设置光源开启阴影投射
spotLight.castShadow = true;
scene.add(spotLight);

// 设置阴影贴图模糊度
spotLight.shadow.radius = 20;
// 设置阴影贴图分辨率
let k = 12;
spotLight.shadow.mapSize.set(2 ** k, 2 ** k);

// 设置聚光灯的指向目标
spotLight.target = sphere;
// 设置聚光灯的角度
spotLight.angle = Math.PI / 6;
// 设置聚光灯的衰减，0表示不衰减
spotLight.distance = 0;
// 光影的衰减效果，0表示不衰减
spotLight.penumbra = 0;
// 沿着光照距离的衰减量，使用这个需要开启渲染器的【物理渲染模式(renderer.physicallyCorrectLights)】
spotLight.decay = 0;

// 修改聚光灯透视相机的属性

gui.add(sphere.position, "x").min(-5).max(5).step(0.1);
gui
  .add(spotLight, "angle")
  .min(0)
  .max(Math.PI / 2)
  .step(Math.PI / 180);
gui.add(spotLight, "distance").min(0).max(15).step(0.01);
gui.add(spotLight, "penumbra").min(0).max(1).step(0.01);
gui.add(spotLight, "decay").min(0).max(5).step(0.01);

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

// 渲染函数
function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
