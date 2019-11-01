import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '../components/pages/MainPage'
import LoginPage from "../components/pages/LoginPage";
import JoinPage from "../components/pages/JoinPage";
import RestaurantListPage from "@/components/pages/RestaurantListPage";
import DetailRestaurantPage from "@/components/pages/DetailRestaurantPage";
import Page404 from '../components/pages/404Page'
import finishPage from "@/components/pages/finishPage";

Vue.use(VueRouter);

 const router = new VueRouter({
   mode: 'history',
   routes: [
     {
       path: '/',
       component: MainPage,
       name: 'MainPage',
       props: true
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
       path:'/restaurant/:categoryIdx',
       component: RestaurantListPage,
       name: 'RestaurantListPage',
       props: true
     },
     {
       path: '/restaurant/detail/:restaurantId',
       component: DetailRestaurantPage,
       name: 'DetailRestaurantPage',
       props: true
     },
     {
       path: '/finish',
       component: finishPage,
       name: 'finishPage',
       // props: true,
     },
     {
       path:'*',
       component: Page404,
       name: 'Page404',
     },
   ]
 });
 
 export default router