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

hooks：beforeCreate/created（setup）、beforeMount/mounted、beforeUpdate/updated、beforeDestroy/destroyed（beforeUnmount/Unmounted）

其他hooks：

​	![vue生命周期](https://tutu-1313352375.cos.ap-nanjing.myqcloud.com/my/vue_life_cycle.png)

用途

- beforeCreate：通常⽤于插件开发中执⾏⼀些初始化任务 
- created：组件初始化完毕，可以访问各种数据，获取接⼝数据等 
- mounted：dom已创建，可⽤于获取访问数据和dom元素；访问⼦组件等。 
- beforeUpdate：此时 view 层还未更新，可⽤于获取更新前各种状态 
- updated：完成 view 层的更新，更新后，所有状态已是最新 
- beforeunmounted：实例被销毁前调⽤，可⽤于⼀些定时器或订阅的取消 
- unmounted：销毁⼀个实例。可清理它与其它实例的连接，解绑它的全部指令及事件监听器

## 双向绑定使用和原理

1. vue中双向绑定是⼀个指令v-model，可以绑定⼀个响应式数据到视图，同时视图中变化能改变该值。 
2. v-model是语法糖，默认情况下相当于:value和@input。使用v-model可以减少大量繁琐的事件处理代 码，提高开发效率。 
3. 通常在表单项上使用v-model ，还可以在自定义组件上使用，表示某个值的输入和输出控制。 
4. 通过<input v-model="xxx">的方式将xxx的值绑定到表单元素value上；对于checkbox，可以使用true-value和false-value指定特殊的值，对于radio可以使用value指定特殊的值；对于select可以通过options元素的value设置特殊的值；还可以结合.lazy,.number,.trim对v-mode的行为做进⼀步限定；v-model 在自定义组件上时⼜会有很大不同，vue3中它类似于sync修饰符，最终展开的结果是modelValue属性和 update:modelValue事件；vue3中我们甚至可以用参数形式指定多个不同的绑定，例如v-model:foo和vmodel:bar，非常强大！ 
5. v-model 是⼀个指令，它的神奇魔法实际上是vue的编译器完成的。我做过测试，包含 v-model 的模板，转 换为渲染函数之后，实际上还是是value属性的绑定以及input事件监听，事件回调函数中会做相应变量更新操 作。编译器根据表单元素的不同会展开不同的DOM属性和事件对，⽐如text类型的input和textarea会展开为 value和input事件；checkbox和radio类型的input会展开为checked和change事件；select⽤value作为属性，用change作为事件。

## Vue如何拓展一个组件

逻辑拓展：mixins，composition API，extends

内容拓展：slots