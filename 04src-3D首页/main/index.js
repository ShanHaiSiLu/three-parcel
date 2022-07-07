import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
const gui = new dat.GUI();

// 场景
let scene = new THREE.Scene();

// 相机
// 通过将参数抽离的方式，避免被格式化
let arr = [45, window.innerWidth / window.innerHeight, 0.01, 4000];
let camera = new THREE.PerspectiveCamera(...arr);
camera.position.set(10, 15, 30);
camera.lookAt(scene.position);

// 环境光
const light = new THREE.AmbientLight(0x404040);
scene.add(light);

const raycaster = new THREE.Raycaster();
const vec = new THREE.Vector2();

const cubeGeometry = new THREE.BoxBufferGeometry(0.8, 0.8, 0.8);
const cubeMaterial = new THREE.MeshBasicMaterial({
  wireframe: true,
});
const redMaterial = new THREE.MeshBasicMaterial({ color: "red" });

let cubes = [];
for (var x = 0; x < 10; x++) {
  for (var y = 0; y < 10; y++) {
    for (var z = 0; z < 10; z++) {
      let mesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
      mesh.position.set(x, y, z);
      scene.add(mesh);
      cubes.push(mesh);
    }
  }
}

window.addEventListener("click", ({ clientX, clientY }) => {
  vec.x = (clientX / window.innerWidth) * 2 - 1;
  vec.y = -((clientY / window.innerHeight) * 2 - 1);

  // 发出射线
  raycaster.setFromCamera(vec, camera);
  // 获取碰撞到的物体
  let result = raycaster.intersectObjects(cubes);
  console.log(result);
  result.forEach((item) => (item.object.material = redMaterial));
});

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
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
