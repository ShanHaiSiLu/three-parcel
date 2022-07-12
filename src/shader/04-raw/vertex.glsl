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
varying float height;

void main() {
    vUv = uv;
    vec4 _posi = modelMatrix * vec4(position, 1);
    _posi.z += sin(_posi.x * 3.1415926 * 5.0) * 0.05 + cos(_posi.y * 3.1415926 * 5.0) * 0.05;
    height = _posi.z * 10.0 * 0.2 + 0.8;
    _posi.x = _posi.x * 1.0;
    gl_Position = projectionMatrix * viewMatrix * _posi;
}