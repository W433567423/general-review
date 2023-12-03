# Vue

## 组件通信

## 	![vue组件之间的通信](https://tutu-1313352375.cos.ap-nanjing.myqcloud.com/my/vue_cpns_communication.png)

- 父子组件
  - ref传值
  - 自定义事件/自定义属性
  - $parent/$attrs…（风险）
- 祖孙组件
  - provide/inject
- 其他
  - Vuex
  - Event Bus

## v-if和v-for优先级

vue2中v-if优先级低于v-for，vue3中反之

> vue官方文档中不推荐这俩api被同时使用在一个元素中

