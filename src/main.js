import { createApp } from 'vue'
import App from './App.vue'
import Element from 'element-plus';
import router from './router/index'
import axios from 'axios'
import VueAxios from 'vue-axios'
axios.defaults.baseURL = 'http://localhost:8166/';
//ElementUI改中文
import locale from "element-plus/lib/locale/lang/zh-cn"
import 'element-plus/theme-chalk/index.css'
createApp(App).use(Element,{locale}).use(router).use(VueAxios,axios).mount('#app')
