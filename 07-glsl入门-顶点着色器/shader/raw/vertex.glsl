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

// 接收来自three的参数
uniform float uTime;
uniform float zf;
uniform float pl;

// 传递给片元着色器的属性
varying vec2 vUv;
varying float height;

// 声明一个常量振幅，这里的π用float数字表述，另一个常数表示实际的振幅
float xZf = 3.1415926 * pl;
float yZf = 3.1415926 * pl;

void main() {
    vUv = uv;
    vec4 _posi = modelMatrix * vec4(position, 1);
    _posi.z += sin((uTime + _posi.x) * xZf) * zf + cos((uTime + _posi.y) * yZf) * zf;
    height = _posi.z * 10.0 * 0.2 + 0.8;
    _posi.x = _posi.x * 1.0;
    gl_Position = projectionMatrix * viewMatrix * _posi;
}