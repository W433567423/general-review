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

## Vue的生命周期

![vue生命周期图](https://tutu-1313352375.cos.ap-nanjing.myqcloud.com/my/vue_lifecycle.png)

概念：VUE的生命周期就是 Vue 组件实例从一开始创建到最后销毁的这么一个过程，一个完整的生命周期，包括从开始创建、初始化数据、编译模板、挂载Dom→渲染、更新→渲染、卸载等一系列过程

hooks：beforeCreate/created、beforeMount/mounted、beforeUpdate/updated、beforeDestroy/destroyed（beforeUnmount/Unmounted）

其他hooks：

​	![vue生命周期](https://tutu-1313352375.cos.ap-nanjing.myqcloud.com/my/vue_life_cycle.png)