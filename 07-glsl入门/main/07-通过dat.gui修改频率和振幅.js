import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// 顶点着色器
import rawVertexShader from "../shader/07-raw/vertex.glsl";
// 片元着色器
import rawFragmentShader from "../shader/07-raw/fragment.glsl";

import * as dat from "dat.gui";

const gui = new dat.GUI();

const texture = require("../assets/texture/ca.jpeg")
// 场景
var scene = new THREE.Scene();

const glslParams = {
  zf: 0.01,
  pl: 5
}

gui.add(glslParams, "pl").min(1).max(10).step(1).onChange(val => rawShaderMaterial.uniforms.pl.value = val)
gui.add(glslParams, "zf").min(0.001).max(0.1).step(0.001).onChange(val => rawShaderMaterial.uniforms.zf.value = val)


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
    // 时间参数
    uTime: {
      value: 0.0,
    },
    // 材质图像（片元着色器使用）
    uTexture: {
      value: new THREE.TextureLoader().load(texture)
    },
    // 振幅
    zf: {
      value: glslParams.zf
    },
    // 频率
    pl: {
      value: glslParams.pl
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
