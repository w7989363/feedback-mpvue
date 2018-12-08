import Vue from 'vue'
import App from './App'
import store from './store'

// 挂载$store,否则map函数不生效
Vue.prototype.$store = store;
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
