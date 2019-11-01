import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueSession from 'vue-session'
import * as VueSpinnersCss from "vue-spinners-css";
import store from './store'
// import Swal from 'sweetalert2'
import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'



Vue.use(VueSpinnersCss);
Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  Swal,
  render: h => h(App),
}).$mount('#app');

Vue.use(VueSession);