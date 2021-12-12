import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./assets/css/tailwind.css";

import { initFirestore } from './helper/firebase'
import { toRupiah, formatMoney } from './helper/currency'

Vue.prototype.$firestore = initFirestore()
Vue.prototype.$userId = localStorage.getItem('clientId')
Vue.prototype.$rupiah = toRupiah

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
