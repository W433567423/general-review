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