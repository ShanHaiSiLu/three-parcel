// 高精度 highp     -2^16 —— 2^16
// 中经度 mediump   -2^10 —— 2^10
// 低经度 lowp      -2^8  —— 2^8
// 设置预估浮点数的经度(精度预设要放在最顶上)
precision lowp float;

// 声明来自几何体的变量
attribute vec3 position;
attribute vec2 uv;

// 声明全局变量
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

// 传递给片元着色器的属性
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1);
}