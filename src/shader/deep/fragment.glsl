// 设置预估浮点数的经度(精度预设要放在最顶上)
precision lowp float;

// 获取外部传入的时间参数
uniform float uTime;

// 获取来自顶点着色器的属性
varying vec2 vUv;

// 定义常量
#define PI 3.1415926

// 随机数
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) *
        43758.5453123);
}

// 旋转函数
/**
 * @uv 要进行旋转的点的uv坐标
 * @rotation 旋转的角度（做动效时一般设置为变量）
 * @mid 旋转中心
 */
vec2 rotate(vec2 uv, float rotation, vec2 mid) {
    return vec2(cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x, cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y);
}

// 噪声函数
float noise(in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
        (c - a) * u.y * (1.0 - u.x) +
        (d - b) * u.x * u.y;
}

void main() {
    // 1.渐变
    float val = vUv.x/vUv.y;
    gl_FragColor = vec4(val, val, val, 1.0);
}