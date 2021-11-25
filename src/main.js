import Vue from "vue";

import Vuelidate from "vuelidate";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./app.css";
import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faAlignCenter,
  faAngleLeft,
  faAngleRight,
  faHome,
  faBox,
  faLanguage,
  faWindowClose,
  faCheck,
  faCalculator
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add([
  faAlignCenter,
  faAngleLeft,
  faAngleRight,
  faHome,
  faBox,
  faLanguage,
  faWindowClose,
  faCheck,
  faCalculator
]);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;

Vue.use(Vuelidate);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
