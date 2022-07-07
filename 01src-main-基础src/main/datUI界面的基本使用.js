import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import * as dat from "dat.gui";

const gui = new dat.GUI();

// 场景
var scene = new THREE.Scene();

// 模型
var geometry = new THREE.BoxGeometry(10, 10, 10);
var material = new THREE.MeshLambertMaterial({ color: 0x0000ff });
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

gui
  .add(mesh.position, "x")
  .min(-10)
  .max(10)
  .step(0.01)
  .name("移动X轴")
  .onChange((value) => console.log("值被修改为：", value))
  .onFinishChange((val) =>
    console.log(
      `%c  完全停了，值是：${val} `,
      "font-size:13px; background:pink; color:#bf2c9f;"
    )
  );
// 设置颜色
const params = {
  color: "#0000ff",
  fn: () => {
    gsap.to(mesh.position, { x: 15, duration: 1, yoyo: true, repeat: -1 });
  },
};
gui.addColor(params, "color").onChange((color) => {
  console.log(
    `%c  ${color} `,
    "font-size:13px; background:pink; color:#bf2c9f;"
  );
  console.log(mesh.material.color);
  mesh.material.color.set(color);
});
// 设置选项框
gui.add(mesh, "visible").name("可见性");

// 设置文件夹
let folder = gui.addFolder("立方体属性");
folder.add(mesh.material, "wireframe").name("线框模式渲染")
// 设置按钮触发事件
folder.add(params, "fn").name("立方体运动");

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
  100000
);
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
