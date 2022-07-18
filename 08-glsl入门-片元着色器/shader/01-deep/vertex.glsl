// 高精度 highp     -2^16 —— 2^16
// 中经度 mediump   -2^10 —— 2^10
// 低经度 lowp      -2^8  —— 2^8
// 设置预估浮点数的经度(精度预设要放在最顶上)
precision lowp float;

// 传递给片元着色器的属性
varying vec2 vUv;

void main() {
    vUv = uv;
    vec4 modelPosition = modelMatrix * vec4(position, 1);
    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}