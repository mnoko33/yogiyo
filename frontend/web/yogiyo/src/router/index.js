import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '../components/pages/MainPage'
import LoginPage from "../components/pages/LoginPage";
import JoinPage from "../components/pages/JoinPage";
import RestaurantListPage from "@/components/pages/RestaurantListPage";


Vue.use(VueRouter);

 const router = new VueRouter({
   mode: 'history',
   routes: [
     {
       path: '/',
       component: MainPage,
       name: 'MainPage'
     },
     {
       path:'/login',
       component: LoginPage,
       name: 'LoginPage'
     },
     {
       path:'/join',
       component: JoinPage,
       name: 'JoinPage'
     },
     {
       path:'/restaurant/:restID',
       component: RestaurantListPage,
       name: 'RestaurantListPage'
     }

   ]
 });
 
 export default router