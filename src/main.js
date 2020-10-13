import Vue from 'vue'
import App from './App.vue'
//自己
import ElementUI from 'element-ui'  //引入element-ui
import 'element-ui/lib/theme-chalk/index.css'//引入样式
import axios from 'axios'//请求插件
import router from "@/router/router";//路由

Vue.config.productionTip = false
//在全局中使用
Vue.use(ElementUI)
//全局引入
Vue.prototype.axios =axios;
//请求2000毫秒超时
axios.defaults.timeout = 2000;
//请求带token
axios.interceptors.request.use(
    config=>{
      if (sessionStorage.getItem("token")){
        config.headers.token=sessionStorage.getItem("token")
      }
      return config
    }

)


new Vue({
    router,
  render: h => h(App),
}).$mount('#app')
