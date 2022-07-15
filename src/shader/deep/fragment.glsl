// 设置预估浮点数的经度(精度预设要放在最顶上)
precision lowp float;

// 获取外部传入的时间参数
uniform float uTime;

// 获取来自顶点着色器的属性
varying vec2 vUv;

// 定义常量
#define PI  3.1415926

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
    // float val = vUv.y;
    // gl_FragColor = vec4(val, val, val, 1.0);

    // 2.反向渐变
    // float val = 1.0 - vUv.y;
    // gl_FragColor = vec4(val, val, val, 1.0);

    // 3.部分渐变
    // float val = 1.0 - vUv.y * 10.0;
    // gl_FragColor = vec4(val, val, val, 1.0);

    // 4.重复的部分渐变（通过取模达成效果）
    // float val = mod(vUv.y * 10.0, 1.0);
    // gl_FragColor = vec4(val, val, val, 1.0);

    // 5.通过取模和三角函数达成波浪光线效果
    // float pl = 3.1415926 * 7.0; // 频率，波动的次数（波峰和波谷的数量和）
    // float zf = 2.0;   // 振幅
    // float val = mod(mod(vUv.y * 10.0, 1.0) + zf * sin(vUv.x * pl), 1.0);
    // gl_FragColor = vec4(val, val, val, 1.0);

    // 7.通过step实现黑白分界
    // float val = step(vUv.y, 0.5);
    // gl_FragColor = vec4(val, val, val, 1.0);

    // 6.通过step实现斑马纹
    // float val = step(mod(vUv.y * 10.0, 1.0), 0.5);
    // gl_FragColor = vec4(val, val, val, 1.0);

    // 7.累加获得棋盘效果
    // float val = step(0.5, mod(vUv.y * 10.0, 1.0));
    // val += step(0.5, mod(vUv.x * 10.0, 1.0));
    // gl_FragColor = vec4(val, val, val, 1.0);

    // 8.相乘得（与相加类似，但是颜色相反；可以通过修改step的参数大小修改黑白比例）
    // float val = step(0.2, mod(vUv.y * 10.0, 1.0));
    // val *= step(0.2, mod(vUv.x * 10.0, 1.0));
    // gl_FragColor = vec4(val, val, val, 1.0);

    // 9.相减
    // float val = step(0.2, mod(vUv.y * 10.0, 1.0));
    // val -= step(0.2, mod(vUv.x * 10.0, 1.0));
    // gl_FragColor = vec4(val, val, val, 1.0);

    // 10.相除
    // float val = step(0.2, mod(vUv.y * 10.0, 1.0));
    // val /= step(0.2, mod(vUv.x * 10.0, 1.0));
    // gl_FragColor = vec4(val, val, val, 1.0);

    // 11.方块图形
    // float strength = step(0.2, mod(vUv.x * 10.0, 1.0));
    // strength *= step(0.2, mod(vUv.y * 10.0, 1.0));
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 12.短方块（x.y交换可以切换横纵效果）
    // float strength = step(0.2, mod(vUv.x * 10.0, 1.0));
    // strength *= step(0.8, mod(vUv.y * 10.0, 1.0));
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 12.短方块相加得T型图
    // float barX = step(0.2, mod(vUv.x * 10.0, 1.0)) * step(0.8, mod(vUv.y * 10.0, 1.0));
    // float barY = step(0.2, mod(vUv.y * 10.0, 1.0)) * step(0.8, mod(vUv.x * 10.0, 1.0));
    // float strength = barX + barY;
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 13.通过短方块相加透明和vuv坐标展示彩色短方块
    // float barX = step(0.2, mod(vUv.x * 10.0, 1.0)) * step(0.8, mod(vUv.y * 10.0, 1.0));
    // float barY = step(0.2, mod(vUv.y * 10.0, 1.0)) * step(0.8, mod(vUv.x * 10.0, 1.0));
    // float strength = barX + barY;
    // gl_FragColor = vec4(vUv, 0.0, strength);

    // 14.联动时间参数获得动效
    // float barX = step(0.2, mod((vUv.x + uTime) * 3.0, 1.0)) * step(0.8, mod((vUv.y + uTime) * 10.0, 1.0));
    // float barY = step(0.2, mod(vUv.y * 10.0, 1.0)) * step(0.8, mod(vUv.x * 10.0, 1.0));
    // float strength = barX + barY;
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 15.绝对值实现镜像效果
    // float strength = abs(vUv.x - 0.5);
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 16.镜像效果实现十字
    // float strength = abs(vUv.x - 0.5) + abs(vUv.y - 0.5);
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 17.最小值实现十字架
    // float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 18. 最大最小值搭配step
    // float strength = step(min(abs(vUv.x - 0.5), abs(vUv.y - 0.5)), 0.1);
    // gl_FragColor = vec4(strength, strength, strength, 1.0);
    // 18-2
    // float strength = 1.0 - step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 19. 利用取整实现条纹渐变
    // float strength = floor(vUv.x*10.0) / 10.0;
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 20. 纵横条纹实现格子
    // float strength = (floor(vUv.x*10.0) / 10.0 + floor(vUv.y*10.0) / 10.0) / 2.0;
    // float strength = (floor(vUv.x * 10.0) / 10.0 * floor(vUv.y * 10.0) / 10.0) * 2.0;
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 21. 随机数效果
    // float strength = random(vUv);
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 22. 随机数 + 格子
    // float strength = ceil(vUv.x * 10.0) / 10.0 * ceil(vUv.y * 10.0) / 10.0;
    // strength = random(vec2(strength, strength));
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 23. 通过length渲染颜色
    // float strength = length(vUv);
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 24. 通过向量将的距离渲染
    // float strength = 1.0 - distance(vUv, vec2(0.5, 0.5));
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 25. 相除实现光球
    // float strength = 0.15 / (distance(vUv, vec2(0.5, 0.5)) * 10.0);
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // 26. 设置vuv水平或者垂直变量
    // float strength = 1.0 - distance(vec2(vUv.x, (vUv.y - 0.3) * 3.0), vec2(0.5, 0.5));
    // gl_FragColor = vec4(strength, strength, strength, strength);

    // 27. 十字交叉
    // float strength = 0.15 / distance(vec2(vUv.x, (vUv.y - 0.5) * 5.0 + 0.5), vec2(0.5, 0.5));
    // strength *= 0.15 / distance(vec2(vUv.y, (vUv.x - 0.5) * 5.0 + 0.5), vec2(0.5, 0.5));
    // gl_FragColor = vec4(strength, strength, strength, strength);

    // 28. 十字旋转
    // vec2 rotateUV = rotate(vUv, PI / 180.0 * uTime * 30.0, vec2(0.5));
    // float strength = 0.15 / distance(vec2(rotateUV.x, (rotateUV.y - 0.5) * 5.0 + 0.5), vec2(0.5, 0.5));
    // strength += 0.15 / distance(vec2(rotateUV.y, (rotateUV.x - 0.5) * 5.0 + 0.5), vec2(0.5, 0.5));
    // gl_FragColor = vec4(strength, strength, strength, strength);

    // 29. 圆形
    // float strength = step(0.35, distance(vUv, vec2(0.5)));
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // 30. 圆环
    // float strength = step(0.35, distance(vUv, vec2(0.5))) * (1.0 - step(0.4, distance(vUv, vec2(0.5))));
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // 31. 使用距离函数的圆环
    // float strength = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25));
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // 32. 圆环联动三角函数
    // vec2 angleUV = vec2(vUv.x, vUv.y + sin(vUv.x * 30.0) * 0.1 );
    // float strength = step(0.39, distance(angleUV, vec2(0.5))) * (1.0 - step(0.4, distance(angleUV, vec2(0.5))));
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // 33. 距离函数圆环双次联动三角函数
    // vec2 angleUV = vec2(vUv.x + sin(vUv.y * 80.0) * 0.1, vUv.y + sin(vUv.x * 80.0) * 0.1);
    // float strength = 1.0 - step(0.01, abs(distance(angleUV, vec2(0.5)) - 0.25));
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // 34. 圆环中加入时间参数
    // vec2 angleUV = vec2(vUv.x + sin((vUv.y + uTime * 0.2) * 80.0) * 0.1, vUv.y + sin((vUv.x + uTime * 0.1) * 40.0) * 0.1);
    // float strength = 1.0 - step(0.01, abs(distance(angleUV, vec2(0.5)) - 0.25));
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // 35. 根据反正切函数获取角度并根据角度显示视图
    // float angle = atan(vUv.x, vUv.y);
    // float strength = angle;
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // 36. 根据角度实现螺旋渐变
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // float strength = (angle + PI) / (2.0 * PI);
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // 37. 实现雷达扫射
    // float alaph = 1.0 - step(0.35, distance(vUv, vec2(0.5)));
    // vec2 rotateUV = rotate(vUv, uTime * 3.0, vec2(0.5));
    // float angle = atan(rotateUV.x - 0.5, rotateUV.y - 0.5);
    // float strength = (angle + PI) / (2.0 * PI);
    // gl_FragColor = vec4(strength, strength, strength, alaph);

    // 38. 万花筒
    float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    float strength = (angle + PI) / (2.0 * PI);
    gl_FragColor = vec4(strength, strength, strength, 1);

}