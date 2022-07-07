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
camera.position.set(0, 15, 0);
camera.lookAt(scene.position);

// 环境光
const light = new THREE.AmbientLight(0x404040);
scene.add(light);

const particlesImg = require("../assets/textures/particles/1.png");

const textureLoader = new THREE.TextureLoader();
const particlesTexture = textureLoader.load(particlesImg);

// 设置星系旋臂参数
const params = {
  count: 100000, // 所有旋臂上顶点的数量的和（会被平均分配到各个旋臂，若不能整除则分配完为止）
  size: 0.2, // 顶点大小
  radius: 5, // 星系半径
  branch: 6, // 分支数/旋臂数
  color: "#ff6030", // 顶点颜色
  rotateScale: 0.4, // 旋臂的弯曲程度
  endColor: "#1b3984",
};

let geometry = null;
let material = null;

let startColor = new THREE.Color(params.color);
let endColor = new THREE.Color(params.endColor);

function generateGalaxy() {
  geometry = new THREE.BufferGeometry();
  let points = new Float32Array(params.count * 3);
  let colors = new Float32Array(params.count * 3);

  for (var i = 0; i < params.count; i++) {
    // 获取当前所处旋臂的角度（当前旋臂的旋转角度）
    let branchAngel = (i % params.branch) * ((Math.PI * 2) / params.branch);

    // 当前顶点到圆心的距离（当前顶点所在圆的半径）
    let _r = Math.random() * params.radius * Math.random() ** 3;
    // 离散参数，表示当前点分别向x/y/z偏移的分量。这里的几何意义实际上是点的坐标向中间的线趋近的过程。取[-1, 1]的范围是因为有些点的坐标处于负数范围（此句解释存疑）
    let rendomX = ((Math.random() * 2 - 1) ** 3 * (params.radius - _r)) / 5;
    let rendomY = ((Math.random() * 2 - 1) ** 3 * (params.radius - _r)) / 5;
    let rendomZ = ((Math.random() * 2 - 1) ** 3 * (params.radius - _r)) / 5;

    let _current = i * 3;

    points[_current] =
      Math.cos(branchAngel + _r * params.rotateScale) * _r + rendomX;
    points[_current + 1] = 0 + rendomY;
    points[_current + 2] =
      Math.sin(branchAngel + _r * params.rotateScale) * _r + rendomZ;

    // 生成混合色
    let mixColor = startColor.clone();
    mixColor.lerp(endColor, _r / params.radius);
    // console.log(mixColor)
    colors[_current] = mixColor.r;
    colors[_current + 1] = mixColor.g;
    colors[_current + 2] = mixColor.b;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(points, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  material = new THREE.PointsMaterial({
    // color: new THREE.Color(params.color),
    size: params.size,
    sizeAttenuation: true, // 关闭点大小随着相机深度衰减
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    map: particlesTexture,
    alphaMap: particlesTexture,
    transparent: true,
    vertexColors: true, // 优先使用顶点颜色
  });

  let pointMesh = new THREE.Points(geometry, material);
  scene.add(pointMesh);
  console.log(pointMesh);

  return pointMesh;
}

let galaxy = generateGalaxy();

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
// scene.add(axesHelper);

// 设置时钟
let clock = new THREE.Clock();

// 渲染函数
function render() {
  let time = clock.getElapsedTime();
  galaxy.rotation.y = time/3;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
