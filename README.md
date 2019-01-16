# 替换项目中依赖模块为 soda-m-common 中通用组件

## 配置方法：

``` json
{
  "presets": ["env", "stage-2"],
  "plugins": [["global-variable", {
      "whiteList": [
          "vue",
          "vuex",
          "element-ui"
      ],
      "namespace": "SodaApp" // optional
  }]]
}
```
### 全局函数引用：
可以按`import`方式引入，模块名为babel配置的命名空间
```js
import { registerBiz } from 'SodaApp'
```
如果没有命名空间，直接从全局获取
```js
cosnt { registerModule } = window.SodaApp
```
### 转换规则
如果在`whiteList`中存在最后转换为：
```js
import store from "store"

// 默认引用
import Vue from "vue";
// 转换为：
const Vue = window.SodaApp.vue;

// 导出重命名
import * as element from 'element-ui'
// 转换为：
// 注意element-ui会默认做camelCase转换，如果单词长度小于等于2，认为是缩写，全部转为大写
const element = window.SodaApp.elementUI;

// 含解构的方法转换
import { Button, Form } from 'element-ui'
// 转换为：
const Button = window.SodaApp.elementUI.Button;
const Form = window.SodaApp.elementUI.Form;

// 含命名与解构的方法转换
import Vuex, { mapGetters, mapActions } from "vuex";
// 转换为：
const Vuex = window.SodaApp.vuex;
const mapGetters = window.SodaApp.vuex.mapGetters;
const mapActions = window.SodaApp.vuex.mapActions;

// 方法引用转换
import { registerBiz } from 'SodaApp'
// 转换为：
const registerBiz = window.SodaApp.registerBiz;
```
