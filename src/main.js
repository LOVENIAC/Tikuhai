import Vue from "vue";
import axios from "axios";
import App from "./App.vue";
import router from "./router";
import "./assets/css/reset.css";
import "./plugins/elements.js";
import "./assets/js/el-components.js";

axios.defaults.baseURL = "https://www.tikuhai.com";
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});
// axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
