import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// 顶点着色器
import vertexShader from "../shader/flyLight/vertex.glsl";
// 片元着色器
import fragmentShader from "../shader/flyLight/fragment.glsl";

import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
/**
 * @文件路径问题
 * hdr文件和glb文件会在编译时报错，所以直接放到dist文件夹中
 * 因为dist文件夹不会上传到git，所以异地拉取运行会报错
 * 只需将assets文件夹下的model和texture两个文件夹复制到dist/flyLight路径下即可
 */

// 场景
var scene = new THREE.Scene();

// 创建着色器材质
const shaderMaterial = new THREE.ShaderMaterial({
  transparent: true,
  // 顶点着色器
  vertexShader: vertexShader,
  // 片元着色器
  fragmentShader: fragmentShader,
  // 双面渲染
  side: THREE.DoubleSide,
  // 向着色器中传入变量
  uniforms: {},
});

//点光源
var point = new THREE.PointLight(0xffffff);
point.position.set(400, 200, 300);
scene.add(point);
//环境光
var ambient = new THREE.AmbientLight(0x444444);
scene.add(ambient);

// 相机
var camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(0, 0, 3);
camera.lookAt(scene.position);

// 辅助坐标
let axesHelper = new THREE.AxesHelper(25);
scene.add(axesHelper);

// 渲染器
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x0c0f0a, 1);
document.body.appendChild(renderer.domElement);

// 控制器
var controls = new OrbitControls(camera, renderer.domElement);

// 时钟
var clock = new THREE.Clock();

// 渲染函数
function render() {
  const elapsedTime = clock.getElapsedTime();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();
