import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

// 场景
var scene = new THREE.Scene();
// 模型
var geometry = new THREE.BoxGeometry(10, 10, 10);
var material = new THREE.MeshLambertMaterial({ color: 0x0000ff });
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//点光源
var point = new THREE.PointLight(0xffffff);
point.position.set(400, 200, 300);
scene.add(point);
//环境光
var ambient = new THREE.AmbientLight(0x444444);
scene.add(ambient);

// 相机
let _tmp_params = [45, window.innerWidth / window.innerHeight, 1, 100000];
var camera = new THREE.PerspectiveCamera(..._tmp_params);
camera.position.set(40, 70, 140);
camera.lookAt(scene.position);

// 渲染器
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xb9d3ff, 1);
document.body.appendChild(renderer.domElement);

// 控制器
var controls = new OrbitControls(camera, renderer.domElement);

// 辅助坐标
let axesHelper = new THREE.AxesHelper(25);
scene.add(axesHelper);

//时钟
let clock = new THREE.Clock();

// 渲染函数
function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();

// 双击屏幕暂停/继续旋转
window.addEventListener("dblclick", () => {
  const fullScreenElement = document.fullscreenElement;
  console.log(fullScreenElement);
  if (!fullScreenElement) {
    // 进入全屏
    renderer.domElement.requestFullscreen();
  } else {
    // 退出全屏
    document.exitFullscreen();
  }
});
