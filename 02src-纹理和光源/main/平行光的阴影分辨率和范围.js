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

// 环境光
const light = new THREE.AmbientLight(0x404040);
scene.add(light);
// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 10, 10);
// 设置光源开启阴影投射
directionalLight.castShadow = true;
scene.add(directionalLight);


// 设置阴影贴图模糊度
// directionalLight.shadow.radius = 20;
// 设置阴影贴图分辨率
let k = 12;
directionalLight.shadow.mapSize.set(2**k, 2**k)

// 修改平行光投影相机的属性
directionalLight.shadow.camera.near = 15;
directionalLight.shadow.camera.far = 500;
directionalLight.shadow.camera.top = 5;
directionalLight.shadow.camera.bottom = -5;
directionalLight.shadow.camera.left = -5;
directionalLight.shadow.camera.right = 5;

gui
  .add(directionalLight.shadow.camera, "near")
  .min(15)
  .max(18.5)
  .step(0.1)
  .onChange(() => {
    directionalLight.shadow.camera.updateProjectionMatrix();
  });

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
const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(10, 10), material);
plane.rotation.x = -Math.PI / 2;
plane.position.set(0, -1, 0);
// 开启接收阴影
plane.receiveShadow = true;
scene.add(plane);

// 渲染器
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// 设置渲染器开启阴影计算
renderer.shadowMap.enabled = true;
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
