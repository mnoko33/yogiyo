import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueSession from 'vue-session'
import * as VueSpinnersCss from "vue-spinners-css";
import store from './store'


Vue.use(VueSpinnersCss)
Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app');

Vue.use(VueSession)