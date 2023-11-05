# CSS笔试题

## 防止高度坍塌

### 问题描述

子元素浮动脱离文档流，导致父元素高度坍塌，父元素页脚被子元素遮挡

### 解决方案(4种)

1. 父元素设置overflow:hidden属性

   原理：CSS中的overflow:hidden属性回强制要求父元素必须包裹住所有内部浮动的元素,以及所有元素的margin范围

   缺点：父元素中某些超出范围的子元素需要显示时会产生冲突

2. 父元素结尾最佳一个空的块级元素，并设置子元素clear:both属性(如<div style="clear:both"/>)

   缺点：增加了无用元素，影响性能，且影响选择器和查找元素

3. 父元素设置浮动，后续元素需要增加clear:both属性

   缺点：会产生新的浮动影响

4. 父元素末尾伪元素设置clear:both属性(推荐)

   `::after{content:'';clear:both;display:table;height:0}`

> height:0是为了避免某些浏览器会给table默认高度

## BFC(Block formatting context)

由块级元素产生的独立的渲染区域，外部内部互不影响，竖直排列

### BFC布局特点

1. 同一个BFC中的两个相邻块级元素垂直的margin会发生重叠/合并，水平方向不会
2. 计算BFC高度会将内部浮动元素的高度计算在内

### 形成BFC的条件

1. float属性的值不是none
2. position属性的值不是static或relative
3. display属性的值是inline-block、table-cell、flex、table-caption或inline-flex
4. overflow属性的值不是visible

> 利用BFC区域来解决高度坍塌、垂直方向margin合并、垂直方向margin溢出(5种)

## IFC(Inline formatting context)

由行内元素产生的独立的渲染区域，水平排列

## 左定宽，右自适应

### 解决方案（兼容性好）

> ### 还有flex、table方案

```css
.left{
  float:left;
  width:定宽;
}

.right{
    overflow:hidden;
}
```

## 弹性布局（flex布局）

```css
父元素{
    display:flex/inline-flex; //
    flex-direction: row/row-reverse/column/column-reverse;  // 主轴方向
    flex-wrap: nowrap/wrap;  // 是否换行
    flex-flow: flex-direction flex-wrap;  // 主轴和换行的简写
    justify-content: flex-start/flex-end/space-between/space-around;  // 主轴对齐方式
    align-items: flex-start/flex-end/center/baseline/stretch; // 交叉轴对齐方式(基线)
    ...
}
子元素{
    order: number; // 排列顺序
    flex-grow: number; //放大比例
    flex-shrink: 0/1; // 缩小比例
    aligh-self: flex-start/flex-end/center/baseline/stretch/auto; // 交叉轴对齐方式(基线)
}
```

## 居中

### 水平居中

#### 父元素固定宽度块级元素

> p元素嵌套h1元素会产生PHP (<p>1<h1>2</h1></p> => <p />1<h1>2</h1><p />)

### 垂直居中