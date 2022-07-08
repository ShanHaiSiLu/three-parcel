// 获取canvas元素
let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 获取canvas的WEBGL绘图上下文
let gl = canvas.getContext("webgl");

// 第一次创建webgl上下文时，需要设置视口大小
gl.viewport(0, 0, canvas.width, canvas.height);

// 创建顶点着色器
let vertexShader = gl.createShader(gl.VERTEX_SHADER);
// 创建顶点着色器源码，需要编写glsl代码
gl.shaderSource(
  vertexShader,
  `
    attribute vec4 a_Position;
    void main() {
      gl_Position = a_Position;
    }
`
);
// 编译顶点着色器
gl.compileShader(vertexShader);

// 创建片元着色器
let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
// 创建片元着色器源码，需要编写glsl代码
gl.shaderSource(
  fragmentShader,
  `
    void main() {
      gl_FragColor = vec4(${Math.random()}, ${Math.random()}, ${Math.random()}, 1.0);
    }
 `
);
// 编译片元着色器
gl.compileShader(fragmentShader);

// 创建程序来连接顶点着色器和片元着色器
let program = gl.createProgram();
// 链接顶点着色器和片元着色器
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);

// 链接程序
gl.linkProgram(program);
// 使用程序进行渲染
gl.useProgram(program);

// 创建顶点缓冲区对象
let vertexBuffer = gl.createBuffer();
// 绑定顶点缓冲区对象
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
// 向顶点缓冲区对象中写入数据
let vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
// 将缓冲区数据传入
// gl.STATIC_DRAW表示数据不会改变
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

// 获取顶点着色器中的a_Position变量
let a_Position = gl.getAttribLocation(program, "a_Position");
// 将顶点缓冲区对象分配给a_Position变量，告诉webgl如何解析顶点数据
gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

// 启动顶点着色器中的a_Position变量
gl.enableVertexAttribArray(a_Position)

// 绘制三角形
gl.drawArrays(gl.TRIANGLES, 0, 3)
