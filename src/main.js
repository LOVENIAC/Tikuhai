import Vue from 'vue'
import App from './App.vue'
import "./assets/js/el-components.js"
import './assets/css/reset.css'
import axios from 'axios'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
// axios.defaults.baseURL = ""
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
