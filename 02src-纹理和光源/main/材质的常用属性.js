import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
const door = require("../assets/textures/door/color.jpg")

// 场景
let scene = new THREE.Scene();

// 相机
// 通过将参数抽离的方式，避免被格式化
let arr = [45, window.innerWidth / window.innerHeight, 1, 100000];
let camera = new THREE.PerspectiveCamera(...arr);
camera.position.set(1, 1, 3);
camera.lookAt(scene.position);

// 导入纹理
let textureLoader = new THREE.TextureLoader();
let doorColorTexture = textureLoader.load(door);
/**
 * @纹理偏移
 */
// doorColorTexture.offset.set(0.5, 0.5)
/**
 * @纹理旋转
 */
// doorColorTexture.rotation = Math.PI/4;
/**
 * @修改纹理的旋转中心
 */
// doorColorTexture.center.set(0.5, 0.5)
/**
 * @纹理重复
 */
doorColorTexture.wrapS = THREE.RepeatWrapping;  // 无限重复
doorColorTexture.wrapT = THREE.MirroredRepeatWrapping;  // 镜像重复

// 添加物体
let cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshBasicMaterial({
  color: "#ffff00",
  map: doorColorTexture
});
let cube = new THREE.Mesh(cubeGeometry, material);
scene.add(cube);

// 渲染器
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xb9d3ff, 1);
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
