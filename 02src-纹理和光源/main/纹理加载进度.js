import * as THREE from "three";
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

const loadingEvent = {
  onLoad() {
    console.log(
      `%c#纹理图片加载完成`,
      "font-size:13px; background:pink; color:#bf2c9f;"
    );
  },
  onProgress(e, num, total) {
    console.log(
      `%c纹理图片【 ${e} 】加载完成，当前是第【${num}】张图片，总共有【${total}】张图片，加载进度为：${(
        (num / total) *
        100
      ).toFixed(2)}% `,
      "font-size:13px; background:skyblue; color:#bf2c9f;"
    );
  },
  onError(e) {
    console.log(e);
    console.log(
      `%c#纹理图片加载错误 `,
      "font-size:13px; background:red; color:#bf2c9f;"
    );
  },
};

// 设置加载管理器
const loadingManager = new THREE.LoadingManager(
  loadingEvent.onLoad,
  loadingEvent.onProgress,
  loadingEvent.onError
);

const colorImg = require("../assets/textures/door/color.jpg");
const alphaImg = require("../assets/textures/door/alpha.jpg");
const ambImg = require("../assets/textures/door/ambientOcclusion.jpg");
const heightImg = require("../assets/textures/door/height.jpg");
const roughtnessImg = require("../assets/textures/door/roughness.jpg");
const matetnessImg = require("../assets/textures/door/metalness.jpg");
const normalImg = require("../assets/textures/door/normal.jpg");

// 导入纹理
let textureLoader = new THREE.TextureLoader(loadingManager);
let doorColorTexture = textureLoader.load(colorImg);
// 透明纹理的使用
let doorAlphaTexture = textureLoader.load(alphaImg);
// AO环境贴图
let doorAoTexture = textureLoader.load(ambImg);
// 置换贴图/高度贴图
let doorHeightTexture = textureLoader.load(heightImg);
// 粗糙度贴图
let roughnessTexture = textureLoader.load(roughtnessImg);
// 金属度贴图
let metalnessTexture = textureLoader.load(matetnessImg);
// 法线贴图
let normalTexture = textureLoader.load(normalImg);

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
  displacementMap: doorHeightTexture, // 置换贴图/高度贴图
  displacementScale: 0.1, // 置换贴图影响度，默认为1
  roughness: 1, // 粗糙度，0表示镜面反射
  roughnessMap: roughnessTexture, // 粗糙度贴图
  metalness: 1, // 金属度
  metalnessMap: metalnessTexture, // 金属度贴图
  normalMap: normalTexture,
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
