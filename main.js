import Vue from "vue";
import App from "./src/App.vue";
import "./src/global.css";
import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";

Vue.config.productionTip = false;
Vue.component("v-select", vSelect);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
