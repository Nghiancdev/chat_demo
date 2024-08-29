import Vue from "vue";
import App from "./App.vue";
import { initializeSocket, getAuthCode } from "ikigroup-chat";

const userString = getAuthCode();

if (userString) {
  initializeSocket(userString);
}
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
