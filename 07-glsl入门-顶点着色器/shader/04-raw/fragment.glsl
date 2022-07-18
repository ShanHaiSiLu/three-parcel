// 设置预估浮点数的经度(精度预设要放在最顶上)
precision lowp float;
varying float height;


// 获取来自顶点着色器的属性
varying vec2 vUv;


void main() {
    gl_FragColor = vec4(0.0, 0.0, height, 1.0);
}