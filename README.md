## 项目说明
项目在运行时的入口文件是通过在`package.json`中的`scripts`命令中指定的，通过修改dev可以修改运行时的入口文件，修改build可以修改打包时的入口文件。
## 文件结构
针对不同的章节，封装了不同的`src`，也就是命名格式为`**src-**`的那些`src`平级文件夹，其中`src`前面的数字表示分节（与课堂的章节不一致），`-`后面的文字表示这一章节的主要内容。
## 项目性质
 - 网易课程[Three.js可视化企业实战WEBGL课](https://study.163.com/course/courseMain.htm?courseId=1212491801)的随堂代码
 - 个人的threejs学习笔记、学习历程
 - `parcel`打包工具的实战演练
 - 一些有意思的demo


 ## 运行方式
  - 安装依赖
 ```
npm install
 ```
 - 运行项目
 ```
npm run dev
 ```
## 存在的问题
 - `parcel`打包用具对于`hdr`格式的图片的原生不支持问题。
    - **问题：**`parcel`对于常见的文件格式内置了处理方式（加载、压缩），但是对于`hdr`格式的图片并没有内置处理方式，也没有配置格式白名单，导致通过`require`引入相关类型的文件的时候会直接报错导致项目无法运行。
    - **当前解决方案：** 目前采用的方案是将相关类型的文件直接放到打包后的`dist`文件夹下，然后通过相对路径进行引用。这样就规避了项目运行/打包时的文件处理。当前依然存在的问题是，`dist`直接放置资源文件的方式并不符合常见的静态资源处理方案。此问题有待解决。
    - **备选方案：** 也可以考虑配置一个额外的文件服务器，将静态资源文件全部放置到额外的文件服务器上，然后通过`http`方式进行加载。（此方案尚未进行尝试）