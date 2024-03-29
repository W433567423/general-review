# HTML知识点

## HTML语义化标签

据内容的结构化（内容语义化），选择合适的标签（代码语义化）便于开发者阅读和写出更优 雅的代码的同时让浏览器的爬虫和机器很好地解析

- H5新增标签

| 标签         | 语义                                                 |
| ------------ | ---------------------------------------------------- |
| <article>    | 定义文档内的文章。                                   |
| <aside>      | 定义页面内容之外的内容。                             |
| <bdi>        | 定义与其他文本不同的文本方向。                       |
| <details>    | 定义用户可查看或隐藏的额外细节。                     |
| <dialog>     | 定义对话框或窗口。                                   |
| <figcaption> | 定义 <figure> 元素的标题。                           |
| <figure>     | 定义自包含内容，比如图示、图表、照片、代码清单等等。 |
| <footer>     | 定义文档或节的页脚。                                 |
| <header>     | 定义文档或节的页眉。                                 |
| <main>       | 定义文档的主内容。                                   |
| <mark>       | 定义重要或强调的内容。                               |
| <menuitem>   | 定义用户能够从弹出菜单调用的命令/菜单项目。          |
| <meter>      | 定义已知范围(尺度)内的标量测量。                     |
| <nav>        | 定义文档内的导航链接。                               |
| <progress>   | 定义任务进度。                                       |
| <rp>         | 定义在不支持 ruby注释的浏览器中显示什么。            |
| <rt>         | 定义关于字符的解释/发音(用于东亚字体).               |
| <ruby>       | 定义ruby注释(用于东亚字体)。                         |
| <section>    | 定义文档中的节。                                     |
| <summary>    | 定义<details>元素的可见标题。                        |
| <time>       | 定义日期/时间。                                      |
| <wbr>        | 定义可能的折行(line-break)。                         |

## HTML5新增内容

- 语义化标签
- 表单功能增强
- 音视频标签
- canvas+SVG
- 拖拽API
- 本地存储
- Web Worker
- 地理API

## innerHTML、nodeValue和textContent

- innerHTML 显示的是div内部文本+标签

- textContent 显示的是div内的文本内容,包括它的子节点的文本，相当于把标签都过滤掉了，显示所有包含节点的文本内容。

- nodeValue 还是一如既往的显示null， 因为当前打印的节点div,是元素节点。

  > tip: 标签就是元素，元素就是标签!

## 虚拟Dom

1. 虚拟DOM本质上是JavaScript对象,是对真实DOM的抽象
2. 状态变更时，记录新树和旧树的差异
3. 最后把差异更新到真正的dom

## window的其他子对象

- screen对象：此对象包含有关客户端显示屏幕的信息，常用于获取屏幕的分
  辨率和色彩；
- history对象：此对象包含用户（在浏览器窗口中）访问过的 URL；
- location对象：此对象包含有关当前 URL的信息，常用于获取和改变当前浏览的网址；
- navigator对象：此对象包含有关浏览器的信息，常用于获取客户端浏览器和操作系统信息；
- event对象：任何事件触发后将会产生一个 event对象，该对象记录事件发
  生时的鼠标位置、键盘按键状态和触发对象等信息。

## 浏览器渲染过程

1. DNS 查询
2. TCP 连接
3. HTTP 请求即响应
4. 服务器响应
5. 客户端渲染
   1. 处理 HTML 标记并构建 DOM 树。
   2. 处理 CSS 标记并构建 CSSOM 树。
   3. 将 DOM 与 CSSOM 合并成一个渲染树。
   4. 根据渲染树来布局，以计算每个节点的几何信息。
   5. 将各个节点绘制到屏幕上。

![image-20231118131444572](https://tutu-1313352375.cos.ap-nanjing.myqcloud.com/my/browserRendering.png)

## 重绘与重排(回流)

简单来说，就是当我们对 DOM 结构的修改引发 DOM 几何尺寸变化的时候，会发生 回流 的过程

> 重绘不一定导致回流，但回流一定发生了重绘。

优化思路

- 能重绘尽量不重排。
- 尽量避免重绘与重排。
- 使用 createDocumentFragment 进行批量的 DOM 操作。
- 对于 resize、scroll 等进行防抖/节流处理。
- GPU加速。

## Canvas与SVG

canvas优势

- 绘制出来的图形是位图，渲染性能好
- 大量图形高频率交互
- 适合游戏
- 可以到处jpg/png图片

svg优势

- 矢量图放大不失真
- 支持时间处理器
- 文字独立、可编辑、可搜索

## WebWorker与ServiceWorker

WebWorker可用于懒加载、无限列表等优化操作

ServiceWorker可用于数据mock、离线资源缓存等

# 网络与HTTP知识点

## OSI与TCP/IP

OSI七层参考模型(理论)，TCP/IP是基于该理论的实现

![image-20231118131444572](https://tutu-1313352375.cos.ap-nanjing.myqcloud.com/my/TCP_IP.png)

## TCP/UDP协议

TCP是一个面向连接的、可靠的、基于字节流的传输层协议。 而UDP是一个面向无连接的传输层协议

- **面向连接**。所谓的连接，指的是客户端和服务器的连接，在双方互相通信之前，TCP需要三次握手建立连接，而UDP没有相应建立连接的过程。
- **可靠性**。TCP花了非常多的功夫保证连接的可靠，这个可靠性体现在哪些方面呢？一个是有状态，另一个是可控制。TCP会精准记录哪些数据发送了，哪些数据被对方接收了，哪些没有被接收到，而且保证数据包按序到达，不允许半点差错。这是有状态。 当意识到丢包了或者网络环境不佳，TCP根据具体情况调整自己的行为，控制自己的发送速度或者重发。这是可控制。相应的，UDP就是无状态,不可控 的。
- **面向字节流**。UDP的数据传输是基于数据报的，这是因为仅仅只是继承了IP层的特性，而 TCP 为了 维护状态，将一个个IP包变成了字节流。

## HTTP协议

[思维导图](https://www.processon.com/view/link/5ec52841e0b34d5f261e14e0)

### Restful服务

特征

- 每⼀个URI代表⼀种资源(Resources)
- 客户端和服务器之间，传递这种资源的某种表现层
- 客户端通过HTTP动词，对服务器端资源进⾏操作，实现"表现层状态转化"

### HTTP缓存

http

## 跨域

浏览器遵循同源政策( scheme(协议) 、 host(主机) 和 port(端口) 都相同则为 同源 )。跨域请求的响应一般会被浏览器所拦截

解决方案

- jsonp(简单兼容性好，可用于解决主流浏览器的跨域数据访问的问题。**缺点是仅支持get方法具有局限性,不安全可能会遭受XSS攻击**)
- cors(**需要浏览器和后端同时支持**)
- postMessage(HTML5 XMLHttpRequest Level 2)
- websocket(HTML5的一个持久化的协议)
- 反向代理

脚手架配置proxy

```js
//vue cli|vite|webpack
proxy: {
    '/api': {
        target: 'https://wtututu.top/',//服务器域名
            changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
    }
}
```

## 缓存

- 用户自行清除缓存

- index.html页面加meta标签

  ```
  <meta http-equiv="pragram" content="no-cache">
  <meta http-equiv="cache-control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="expires" content="0">
  ```

- 后端nginx配置，让index.html不被缓存(vue默认打包后会自动将js、css等资源加上哈希值)

- 前端脚手架配置

- 引入第三方库解决
