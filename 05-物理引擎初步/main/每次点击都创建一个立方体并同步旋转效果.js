import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import * as CANNON from "cannon-es";
import { Mesh, MeshBasicMaterial } from "three";

const gui = new dat.GUI();

// 场景
let scene = new THREE.Scene();

// 相机
// 通过将参数抽离的方式，避免被格式化
let arr = [45, window.innerWidth / window.innerHeight, 0.01, 4000];
let camera = new THREE.PerspectiveCamera(...arr);
camera.position.set(10, 15, 30);
camera.lookAt(scene.position);

const cubeMaterial = new THREE.MeshStandardMaterial();

// 创建地面
const floor = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(10, 10),
  new THREE.MeshStandardMaterial()
);
floor.receiveShadow = true; // 接收阴影
floor.position.set(0, -5, 0);
floor.rotation.x = Math.PI / -2;
scene.add(floor);

// 创建世界
const world = new CANNON.World();
world.gravity.set(0, -9.8, 0);

// 设置物理世界物体材质，无参数表示默认材质，也就是默认弹性、光滑度等
const cubeWorldMaterial = new CANNON.Material("cube");

function createCube() {
  // 创建球体
  const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1);
  const cube = new Mesh(cubeGeometry, cubeMaterial);
  cube.castShadow = true;
  scene.add(cube);

  // 创建物理小球形状
  const cubeShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
  // 创建物理世界的物体
  const cubeBody = new CANNON.Body({
    shape: cubeShape, // 关联形状
    position: new CANNON.Vec3(0, 0, 0), // 位置
    mass: 7, // 质量，与动能有关
    material: cubeWorldMaterial, // 物体材质，与弹性、摩擦力等有关
  });
  // 将物体添加至物理世界
  world.addBody(cubeBody);

  let ad1 = document.getElementById("audio1");

  // 给小球添加碰撞的监听
  cubeBody.addEventListener("collide", (e) => {
    // console.log("发生了碰撞：", e);
    // console.log("碰撞的强度为：", e.contact.getImpactVelocityAlongNormal());
    let impact = e.contact.getImpactVelocityAlongNormal();
    if (impact >= 1 && impact <= 10) {
      // 重置声音时间
      ad1.currentTime = 0;
      ad1.volume = impact / 10;
      ad1.play();
    }
  });

  cubeArr.push({ cube, cubeBody });
}

let cubeArr = [];
window.addEventListener("click", createCube);

// 物理世界创建地面
const floorShape = new CANNON.Plane();
const floorMaterial = new CANNON.Material("floor");
const floorBody = new CANNON.Body();
floorBody.material = floorMaterial;
// // 设置质量，为0表示物体不动
floorBody.mass = 0;
floorBody.addShape(floorShape);
// // 地面位置
floorBody.position.set(0, -5, 0);
// // 旋转地面
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
world.addBody(floorBody);

// 关联两种材质并设置摩擦力和弹力
const defaultContactMaterial = new CANNON.ContactMaterial(
  cubeWorldMaterial,
  floorMaterial,
  {
    friction: 0.1, // 摩擦力
    restitution: 0.7, // 弹性
  }
);

// 将材料的关联设置添加到物理世界
world.addContactMaterial(defaultContactMaterial);

// 设置世界碰撞的默认材料，如果没有设置材料，则都用这个
world.ContactMaterial = defaultContactMaterial;

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

  // 更新物理引擎世界的物体
  world.step(1 / 120, deltaTime);

  // 关联物理小球和渲染小球的位置信息
  cubeArr.forEach((item) => {
    item.cube.position.copy(item.cubeBody.position);
    item.cube.quaternion.copy(item.cubeBody.quaternion);
  });

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
