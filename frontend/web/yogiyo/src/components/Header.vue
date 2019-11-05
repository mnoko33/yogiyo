<template>
  <v-flex class="navigation">
    <v-flex class="nav-top">
      <router-link :to="{name:'MainPage'}"><img class="logo" src="../../public/yogiyologo.png" style="" alt="yogiyo"></router-link>
      <v-flex class="cart">
        <router-link :to="{name: 'LoginPage'}">
          <button v-if="!isUser" type="button" class="btn-login">로그인 | 회원가입</button>
          <button v-else type="button" class="btn-login">로그아웃</button>
        </router-link>
        <button v-if="isUser" type="button" class="btn-cart" @click="goToDetail">주문표({{cart}})</button>
      </v-flex>
    </v-flex>
  </v-flex>
</template>

<script>
  import { mapState } from 'vuex';
  import api from '@/api';
  import router from "@/router";
  
  export default {
    name: "Header",
    data() {
      return {
        isUser: false,
        cart: 0,
        restaurantId: 0,
        cartLen: 0
      }
    },
    mounted() {
      this.isUser = this.$store.state.currentUser;
      this.cartLen = this.$store.state.cartLength;
      this.getUserInfo()
    },
    watch: {
      currentUser() {
        this.isUser = this.$store.state.currentUser;
        this.getUserInfo();
      },
      temporary() {
        this.getUserInfo();
      },
    },
    computed: {
      ... mapState(['currentUser']),
      ... mapState(['temporary']),
    },
    methods: {
      async getUserInfo() {
        if (this.isUser) {
          await api.getUserInfo().then(res => {
            this.cart = res.data.cart.length;
            if (this.cart) {
              this.restaurantId = res.data.cart[0].restaurantId;
            }
          })
        }
      },
      goToDetail() {
        this.getUserInfo();
        router.push({name: 'DetailRestaurantPage', params: {restaurantId: String(this.restaurantId)}})
      }
    }
  }
</script>

<style scoped>
  .navigation {
    background-color: #f0001e;
    height: 78px;
    margin-top: 0;
  }
  .nav-top {
    position: relative;
    max-width: 1020px;
    min-width: 320px;
    margin: 0 auto;
  }
  .logo {
    margin: 25px 10px;
    min-width: 80px;
    height: 30px;
  }
  .cart {
    margin-top: 5px;
    margin-right: 10px;
    float: right !important;
  }
  .btn-login {
    position: relative;
    top: 0;
    left: 0;
    margin: 15px 0 7px 0;
    max-height: 40px;
    padding: 7px 0;
    text-align: center;
    font-size: 18px;
    color: white;
    border-radius: 2px;
    background: #f0001e;
    border: 1px solid #ea7266;
  }
  .btn-cart {
    margin: 15px 10px 7px 5px;
    width: 130px;
    max-height: 40px;
    padding: 7px 0;
    font-size: 18px;
    border-radius: 2px;
    color: white;
    border-color: #ff8a00;
    background: #ff8a00;
  }
  @media (max-width: 769px){
    .navigation {
      height: 60px;
    }
    .btn-cart {
      display: none;
    }
    .btn-login {
      position: absolute;
      top: 21px;
      left: 88px;
      max-height: 18px;
      padding: 0 2px;
      font-size: 12px;
      margin: 0;
    }
    .logo {
      background-size: 72px;
      width: 72px;
      height: 30px;
      margin: 15px 10px;
    }
  }

</style>