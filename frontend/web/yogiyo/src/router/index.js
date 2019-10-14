import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '../components/pages/MainPage'


Vue.use(VueRouter);

 const router = new VueRouter({
   mode: 'history',
   routes: [
     {
       path: '/main',
       component: MainPage,
       name: 'MainPage'
     }
   ]
 });
 
 export default router