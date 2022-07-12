import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// 顶点着色器
import rawVertexShader from "../shader/05-raw/vertex.glsl";
// 片元着色器
import rawFragmentShader from "../shader/05-raw/fragment.glsl";

// 场景
var scene = new THREE.Scene();

// 模型
// var material = new THREE.MeshLambertMaterial({ color: 0x0000ff });
// 创建着色器材质
const rawShaderMaterial = new THREE.RawShaderMaterial({
  // 顶点着色器
  vertexShader: rawVertexShader,
  // 片元着色器
  fragmentShader: rawFragmentShader,
  // 双面渲染
  side: THREE.DoubleSide,
  // 向着色器中传入变量
  uniforms: {
    uTime: {
      value: 0,
    },
  },
});
var plane = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(1, 1, 64, 64),
  rawShaderMaterial
);
scene.add(plane);

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
camera.position.set(1, 1, 2);
camera.lookAt(scene.position);

// 辅助坐标
let axesHelper = new THREE.AxesHelper(25);
scene.add(axesHelper);

// 渲染器
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xb9d3ff, 1);
document.body.appendChild(renderer.domElement);

// 控制器
var controls = new OrbitControls(camera, renderer.domElement);

// 时钟
var clock = new THREE.Clock();

// 渲染函数
function render() {
  rawShaderMaterial.uniforms.uTime.value = clock.getElapsedTime();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();
