import Vue from 'vue'
import Vuetify from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css'


Vue.use(Vuetify, {
  iconfont: 'fa',
  theme: {
    primary: '#3f51b5',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c',
    main: '#f0001e',
  }
})

export default new Vuetify({
   icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
})
