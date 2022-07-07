import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
const gui = new dat.GUI();

// 场景
let scene = new THREE.Scene();

// 相机
// 通过将参数抽离的方式，避免被格式化
let arr = [45, window.innerWidth / window.innerHeight, 0.01, 40];
let camera = new THREE.PerspectiveCamera(...arr);
camera.position.set(0, 0, 40);
camera.lookAt(scene.position);

// 环境光
const light = new THREE.AmbientLight(0x404040);
scene.add(light);

function createPoints(img, size = 0.5, is) {
  // 创建点材质
  const pointsMaterila = new THREE.PointsMaterial();
  // 设置点材质大小
  pointsMaterila.size = size;
  // pointsMaterila.color.set(0xffff00);

  // 创建缓冲几何体并赋予顶点位置信息和颜色信息
  const pointsBufferGeometry = new THREE.BufferGeometry();
  let count = 10000;

  const pointsPotitions = new Float32Array(count * 3);
  const pointsColors = new Float32Array(count * 3);

  for (var i = 0; i < count * 3; i++) {
    pointsPotitions[i] = (Math.random() - 0.5) * 60;
    pointsColors[i] = !!is ? 1 : Math.random();
  }
  pointsBufferGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(pointsPotitions, 3)
  );
  pointsBufferGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(pointsColors, 3)
  );
  console.log(pointsBufferGeometry);

  // 设置点材质纹理
  // 载入纹理
  const textureLoader = new THREE.TextureLoader();
  const pointsTexture = textureLoader.load(img);
  pointsMaterila.map = pointsTexture;
  pointsMaterila.alphaMap = pointsTexture;
  pointsMaterila.transparent = true;
  // 深度影响算法
  pointsMaterila.depthWrite = false;
  // 设置深度叠加算法
  pointsMaterila.blending = THREE.AdditiveBlending;
  // 应用顶点颜色
  pointsMaterila.vertexColors = true;
  // 创建点的集合
  const points = new THREE.Points(pointsBufferGeometry, pointsMaterila);
  scene.add(points);

  return points;
}

const _4Img = require(`../assets/textures/particles/4.png`);
const _xhImg = require(`../assets/textures/particles/xh.png`);
const _xh2Img = require(`../assets/textures/particles/xh2.png`);

let points1 = createPoints(_4Img, 2);
let points2 = createPoints(_xhImg, 0.5, true);
let points3 = createPoints(_xh2Img, 0.5);

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
  points1.rotation.x = time * 0.5;
  points2.rotation.x = time * 0.5;
  points2.rotation.y = time * 0.3;
  points3.rotation.x = time * 0.5;
  points3.rotation.z = time * 0.3;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
