import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { Transformer } from "@parcel/plugin";
// const hdrImg = require("../assets/textures/hdr/002.hdr");
/**
 * @重要问题 这里的hdr文件的引入是通过相对路径直接引入的dist中的文件，但是因为dist文件夹不会被上传到git上，所以异地拉取运行会有找不到文件的情况出现
 * @解决方案 在运行项目后，会出现dist文件夹，将assets文件夹下的textures文件夹整体复制一份到dist文件夹下即可
 */
let hdrLoading =  new Transformer({
  async loadConfig({ config }) {
    let { contents, filePath } = await config.getConfig([
      "tool.config.json",
      "tool.config.js",
    ]);

    if (filePath.endsWith(".js")) {
      config.invalidateOnStartup();
    }

    return contents;
  },
});
console.log(hdrLoading)
// 加载hdr环境贴图
const rgbeLoader = new RGBELoader();
rgbeLoader.loadAsync("./textures/hdr/002.hdr").then((texture) => {
  // 修改纹理图的映射方式
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  scene.environment = texture;
});

const pxImg = require("../assets/textures/environmentMaps/1/px.jpg");
const nxImg = require("../assets/textures/environmentMaps/1/nx.jpg");
const pyImg = require("../assets/textures/environmentMaps/1/py.jpg");
const nyImg = require("../assets/textures/environmentMaps/1/ny.jpg");
const pzImg = require("../assets/textures/environmentMaps/1/pz.jpg");
const nzImg = require("../assets/textures/environmentMaps/1/nz.jpg");

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

// 设置cube纹理加载器
const cubeTxtrureLoader = new THREE.CubeTextureLoader();
const envMapTexture = cubeTxtrureLoader.load([
  pxImg,
  nxImg,
  pyImg,
  nyImg,
  pzImg,
  nzImg,
]);

// 添加球体
const sphereGeometry = new THREE.SphereBufferGeometry(1, 20, 20);
const material = new THREE.MeshStandardMaterial({
  metalness: 0.7, // 金属度
  roughness: 0.1, // 粗糙度
});
const sphere = new THREE.Mesh(sphereGeometry, material);
scene.add(sphere);

// 渲染器
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 控制器
new OrbitControls(camera, renderer.domElement);

// 辅助坐标
let axesHelper = new THREE.AxesHelper(25);
scene.add(axesHelper);

// 渲染函数
function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
