# 替换项目中依赖模块为全局依赖中通用组件

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
      "namespace": "Webapp" // optional
  }]]
}
```
### 全局函数引用：
可以按`import`方式引入，模块名为babel配置的命名空间
```js
import { registerBiz } from 'Webapp'
```
如果没有命名空间，直接从全局获取
```js
cosnt { registerModule } = window.Webapp
```
### 转换规则
如果在`whiteList`中存在最后转换为：
```js
import store from "store"

// 默认引用
import Vue from "vue";
// 转换为：
const Vue = window.Webapp.vue;

// 导出重命名
import * as element from 'element-ui'
// 转换为：
// 注意element-ui会默认做camelCase转换，如果单词长度小于等于2，认为是缩写，全部转为大写
const element = window.Webapp.elementUI;

// 含解构的方法转换
import { Button, Form } from 'element-ui'
// 转换为：
const Button = window.Webapp.elementUI.Button;
const Form = window.Webapp.elementUI.Form;

// 含命名与解构的方法转换
import Vuex, { mapGetters, mapActions } from "vuex";
// 转换为：
const Vuex = window.Webapp.vuex;
const mapGetters = window.Webapp.vuex.mapGetters;
const mapActions = window.Webapp.vuex.mapActions;

// 方法引用转换
import { registerBiz } from 'Webapp'
// 转换为：
const registerBiz = window.Webapp.registerBiz;
```
