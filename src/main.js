import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import draggable from 'vuedraggable'
const app = createApp(App);

app.use(router);
app.use(ElementPlus)
// draggable是一个组件，不是插件，没有install方法，所以不能用use注册
// app.use(draggable)
// console.log(draggable);
app.component('draggable', draggable)

app.mount("#app");
