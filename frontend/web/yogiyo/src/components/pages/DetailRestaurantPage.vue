<template>
  <v-content>
    <Search></Search>
    <router-view :key="$route.fullPath"></router-view>
    <div class="category">
      <Category></Category>
    </div>
    <div v-if="restaurantInformation === []" class="loader">
      <SpinnerLoader :color="'#9e9d99'"/>
    </div>
    <v-container class="scroll">
      <v-row no-gutters class="">
        <v-col cols="12" md="8" class="pa-4 detail-restaurant">
          <v-card outlined class="mr-1 restaurant-info">
            <div class="mx-2 my-2" >{{ name }}</div>
            <v-divider></v-divider>
            <div class="d-flex flex-no-wrap">
              <v-avatar class="mx-2 my-3" tile size="70">
                <v-img :src="thumbnail"></v-img>
              </v-avatar>
              <div class="mx-2 my-auto" style="font-size: 13px">
                <p class="mb-1"><span class="grey-font">최소주문금액 </span>{{ minOrderAmount }}원</p>
                <p class="mb-1"><span class="grey-font">결제 </span>
                  <span>{{creditCard}}</span><span style="color: red"> {{online}}</span></p>
                <p class="mb-1"><span class="grey-font">배달시간</span> {{deliveryTime}}분</p>
              </div>
            </div>
          </v-card>

          <v-list class="mt-5 mr-4" style="padding: 0 0">
            <v-row class="ml-0">
              <v-col style="padding: 0;">
                <v-btn big outlined v-if="menu === true" @click="clickMenu()" style="height: 58px; border-bottom: 5px solid #f0001e">
                  <span style="color: #f0001e; font-size: 16px">메뉴 <span style="font-size: 12px">{{numsOfMenus}}</span></span>
                </v-btn>
                <v-btn big outlined v-if="menu === false" @click="clickMenu()" style="height: 58px; border-bottom: 0">
                  <span style="color: black; font-size: 16px">메뉴 <span style="font-size: 12px">{{numsOfMenus}}</span></span>
                </v-btn>
              </v-col>
              <v-col style="padding: 0;">
                <v-btn big outlined v-if="info === false" @click="clickInfo()" style="height: 58px; border-bottom: 0">
                  <span style="color: black; font-size: 16px">정보</span></v-btn>
                <v-btn big outlined v-if="info === true" @click="clickInfo()" style="height: 58px; border-bottom: 5px solid #f0001e">
                  <span style="color: #f0001e; font-size: 16px">정보</span></v-btn>
              </v-col>
            </v-row>
          </v-list>

          <div v-if="menu">
            <v-list no-action v-if="numsOfMenus > 0" class="mr-1" style="padding: 0;">
              <v-list-group active-class="black--text" v-for="(label, index) in labels" :key="index" style="border: 0.3px solid rgba(0,0,0,.1)">
                <template v-slot:activator>
                  <v-list-item-title><v-icon color="yellow darken-2" class="mr-2" v-show="label === '인기메뉴'">mdi-trophy</v-icon>{{label}}</v-list-item-title>
                </template>
                <v-card outlined class="pa-0">
                  <v-list-item v-for="(menu, index) in menuList[label]" :key="index" style="border-top: 0.5px solid rgba(0,0,0,.3)">
                    <v-list-item-content @click="addToCart(menu.id)" style="cursor: pointer">
                      <v-list-item-title><strong>{{menu.name}}</strong></v-list-item-title>
                      <v-list-item-subtitle style="font-size: 13px">{{menu.description}}</v-list-item-subtitle>
                      <v-list-item-title class="mt-1">{{menu.price}}원</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-list-group>
            </v-list>
            <v-card v-else outlined class="mr-1 restaurant-info">
              <div style="margin: 33%">가게로 직접 문의해주세요.</div>
            </v-card>
          </div>

          <v-card v-if="info" outlined class="mr-1 restaurant-info">
            <div class="mx-4">
              <p class="mt-12"><v-icon class="mb-1" size="18">mdi-storefront</v-icon><strong> 업체정보</strong></p>
              <v-divider color="black"></v-divider>
              <p class="mt-3 font14"><span class="grey-font">영업시간</span> <span class="ml-12">{{openTime}}</span></p>

              <p class="mt-12"><v-icon class="mb-1" size="18">mdi-credit-card-outline</v-icon><strong> 결제정보</strong></p>
              <v-divider class="mt-1" color="black"></v-divider>
              <p class="mt-3 font14"><span class="grey-font">최소주문금액</span> <span class="ml-5">{{minOrderAmount}}원</span></p>
              <p class="mt-3 font14"><span class="grey-font">배달금액</span> <span class="ml-12">{{deliveryFee}}원</span></p>
              <p class="mt-3 font14"><span class="grey-font">결제수단</span> <span class="ml-12"><span v-if="creditCard">{{creditCard}} </span><span v-if="online">{{online}}</span></span></p>

              <p class="mt-12"><v-icon class="mb-1" size="18">mdi-card-text-outline</v-icon><strong> 사업자정보</strong></p>
              <v-divider color="black"></v-divider>
              <p class="mt-3 mb-12 font14"><span class="grey-font mr-4">상호명</span> <span class="ml-12">{{name}}</span></p>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="4" class="pa-4 cart sticky" style="z-index: 100">
          <v-card outlined dark style="background-color: black;">
            <div class="my-0"><p class="mx-2 my-2">주문표
              <v-icon v-if="carts.length > 0" color="white" @click="deleteAllCart" style="float: right">mdi-trash-can-outline</v-icon></p></div>
          </v-card>
          <div style="max-height:260px; overflow-y: auto;">
            <v-card v-if="carts.length < 1" outlined class="restaurant-info" style="min-height: 122px">
              <p class="text-center" style="padding: 100px 0">주문표에 담긴 메뉴가 없습니다.</p>
            </v-card>
            <v-card v-else outlined class="restaurant-info" style="" v-for="(cart, index) in carts" :key="index">
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="body-2 mb-1" style="font-size: 16px !important">{{ cart.name }}</v-list-item-title>
                  <span class="body-2 mb-1"><v-icon size="20" @click="deleteFromCart(cart.id)" style="border: 0.5px solid black;">mdi-close</v-icon>
                    <span class="ml-2">{{ cart.price }}원</span>
                    <span style="float: right">
                      <v-icon color="red" size="20" style="border: 0.5px solid red;" @click="countMinus(cart.id, cart.count)">mdi-minus</v-icon>
                      <span class="ml-3 mr-3">{{ cart.count }}</span><v-icon size="20" color="red" @click="countPlus(cart.id, cart.count)" style="border: 0.5px solid red;">mdi-plus</v-icon></span>
                    </span>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </div>
          <v-card v-if="deliveryFee !== '0'" outlined class="restaurant-info">
            <p class="mr-3 mt-3 font14" style="text-align: right">배달요금 {{deliveryFee}}원 별도</p>
          </v-card>
          <div>
            <v-card v-if="carts.length > 0" outlined class="restaurant-info" style="background-color: #f3f3f3">
              <p class="mr-3 mt-3 caption" style="text-align: right;">최소주문금액: {{ minOrderAmount }}원 이상</p>
            </v-card>
            <v-card v-if="carts.length > 0" outlined class="restaurant-info" style="background-color: #fef8ec">
              <p class="mr-3 mt-3 font-weight-bold" style="text-align: right; color: #f0001e;">합계: {{ totalPrice }}원</p>
            </v-card>
          </div>
          <v-card v-if="canOrder" @click="orderCart" class="mt-4" outlined dark color="red lighten-1">
            <p class="mt-3" style="text-align: center">주문하기</p>
          </v-card>
          <v-card v-else class="mt-4" outlined dark color="grey lighten-1">
            <p class="mt-3" style="text-align: center">주문하기</p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
  import { mapState } from 'vuex';
  import api from '../../api';
  import Category from "@/components/Category";
  import { SpinnerLoader } from 'vue-spinners-css';
  import Swal from 'sweetalert2'
  import router from '@/router';
  import Search from "@/components/Search";

  export default {
    name: "DetailRestaurantPage",
    components: {
      Category,
      SpinnerLoader,
      Search
    },
    props: {
      restaurantId: {type: String},
      categoryIdx: {type: String},
      category: {type: String}
    },
    data() {
      return {
        restaurantData: [],
        restaurantInformation: [],
        name: '',
        thumbnail: '',
        address: '',
        openTime: '',
        deliveryTime: 0,
        deliveryFee: 0,
        minOrderAmount: 0,
        paymentMethods: '',
        numsOfMenus: 0,
        menuList: [],
        creditCard: '',
        online: '',
        labels: [],
        menu: true,
        info: false,
        model: 1,
        carts: '',
        frontCart: {},
        resId: 0,
        totalPrice: 0,
        canOrder: false,
        finish: 0
      }
    },
    created() {
      if (this.$store.state.currentUser === null) {
        router.push({name: 'LoginPage'})
      }
    },
    mounted() {
      this.getRestaurant();
      this.getPaymentMethods();
      this.getThumbnailUrl();
      this.getDeliveryTime();
      this.getUserInfo();
    },
    computed: {
      ... mapState(['cartRestaurantId']),
    },
    methods: {
      async getRestaurant() {
        this.restaurantData = await api.getDetailRestaurant(this.restaurantId);
        this.restaurantInformation = this.restaurantData.data.restaurant;
        this.name = this.restaurantInformation.name;
        this.thumbnail = this.restaurantInformation.thumbnailUrl;
        this.address = this.restaurantInformation.address;
        this.openTime = this.restaurantInformation.openTime;
        this.deliveryTime = this.restaurantInformation.deliveryTime;
        this.deliveryFee = this.comma(this.restaurantInformation.deliveryFee);
        this.minOrderAmount = this.comma(this.restaurantInformation.minOrderAmount);
        this.paymentMethods = this.restaurantInformation.paymentMethods;
        this.numsOfMenus = this.restaurantData.data.numsOfMenus;
        this.labels = this.restaurantData.data.labels;
        this.menuList = this.restaurantData.data.menus;
        for (const menu in this.menuList) {
          for (const index in this.menuList[menu]) {
            this.menuList[menu][index].price = this.comma(this.menuList[menu][index].price);
          }
        }
      },
      getPaymentMethods() {
        const isCreditCard = this.paymentMethods.indexOf('creditcard');
        const isOnline = this.paymentMethods.indexOf('online');
        if (isCreditCard >= 0)
          this.creditCard = '신용카드 현금';
        if (isOnline >= 0)
          this.online = '요기서결제';
      },
      getThumbnailUrl() {
        if (this.thumbnail === '') {
          this.thumbnail = require('../../assets/categoryMenu.jpg');
        }
      },
      getDeliveryTime() {
        if (this.deliveryTime === null) {
          this.deliveryTime = 30;
        }
      },
      clickMenu() {
        this.menu = true;
        this.info = false;
      },
      clickInfo() {
        this.menu = false;
        this.info = true;
      },
      comma(num){
        var len, point, str;

        num = num + "";
        point = num.length % 3 ;
        len = num.length;

        str = num.substring(0, point);
        while (point < len) {
          if (str !== "") str += ",";
          str += num.substring(point, point + 3);
          point += 3;
        }
        return str;
      },
      uncomma(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
      },
      checkCanOrder() {
        if (this.carts.length > 0 && this.carts[0].restaurantId === Number(this.restaurantId)) {
            if (Number(this.uncomma(this.totalPrice)) >= Number(this.uncomma(this.minOrderAmount))) {
              this.canOrder = true;
            }
          } else {this.canOrder = false}
      },
      async getUserInfo() {
        await api.getUserInfo().then(res => {
          this.carts = res.data.cart;
          const cartLength = String(this.carts.length);
          localStorage.setItem('cartLength', cartLength);
          localStorage.setItem('temporary', this.$store.state.currentUser);
          this.$store.state.temporary = this.$store.state.currentUser;
          this.totalPrice = this.comma(res.data.totalPrice);
          this.checkCanOrder();
          for (const cart in this.carts) {
            this.frontCart[this.carts[cart].id] = Number(this.carts[cart].count);
            this.carts[cart].price = this.comma(this.carts[cart].price);
          }
          this.resId = this.restaurantId;
        })
      },
      async postCart(id, count) {
        if (id && count) {
          this.frontCart[id] = count;
        }
        let cartInfo = '';
        for (const cart in this.frontCart) {
          if (cart !== 'undefined') {
            cartInfo += String(cart) + "::" + String(this.frontCart[cart]) + "::";
          }
        }
        cartInfo = cartInfo.slice(0,-2);
        const data = {
          "menus" : cartInfo
        };
        await api.postCart(data, this.resId).then(res =>  {
          console.log(res.data.status);
          localStorage.removeItem('temporary');
          this.$store.state.temporary = '';
          this.getUserInfo();
        })
      },
      countPlus(id, count) {
        count = Number(count);
        count += 1;
        this.postCart(id, count)
      },
      countMinus(id, count) {
        count = Number(count);
        if (count > 1) {
          count -= 1;
          this.postCart(id, count)
        }
        else {
          Swal.fire({
              text:'주문 최소 수량은 1개 입니다.'
            }
          )
        }
      },
      addToCart(id) {
        if (this.carts.length > 0) {
          if (this.carts[0].restaurantId !== Number(this.restaurantId)) {
            Swal.fire({
              text: '다른 음식점에서 이미 담은 메뉴가 있습니다. 담긴 메뉴를 취소하고 새로운 음식점에서 메뉴를 담을까요?',
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: '확인',
              cancelButtonText: '취소'
            }).then(async (result) => {
              if (result.value) {
                this.carts = '';
                this.frontCart = {};

                await this.postCart();
                this.addToCart(id);
              }
            });
            return
          }
        }
        if (this.frontCart[id]) {
          const count = this.frontCart[id];
          this.postCart(id, count);
          Swal.fire({
            text: '이미 주문표에 있는 메뉴입니다.'
          })
        } else {
          const count = 1;
          this.frontCart[id] = count;
          this.postCart(id, count);
          Swal.fire({
            text: '주문표에 메뉴가 추가되었습니다.'
          })
        }
      },
      deleteFromCart(id) {
        delete this.frontCart[id];
        this.postCart()
      },
      deleteAllCart() {
        Swal.fire({
          text: '주문 메뉴를 모두 삭제하시겠습니까?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '확인',
          cancelButtonText: '취소'
        }).then(async (result) => {
          if (result.value) {
            this.carts = '';
            this.frontCart = {};
            this.postCart();
          }
        });
      },
      async orderCart() {
        const params = { restaurantId: this.restaurantId};
        await api.requestPayment(params).then(res => {
          window.location.href = res.data.next_redirect_pc_url;
          if (res.data.status) {
            this.getUserInfo();
          }
        })
      },
    },
    watch: {
      cartRestaurantId() {
        this.getDetailRestaurant()
      },
      thumbnail() {
        this.getThumbnailUrl();
      },
      deliveryTime() {
        this.getDeliveryTime();
      },
      paymentMethods() {
        this.getPaymentMethods();
      },
      canOrder() {
        this.checkCanOrder();
      }
    }
  }
</script>

<style scoped>
  .sticky {
    display: inline-block;
    position: sticky;
    top: 30px;
    width: 80px;
    height: 80px;
  }
  .detail-restaurant {
    padding-left: 10px;
    padding-right: 10px;
  }
  .restaurant-info {
    background-color: #fff;
    border: 1px solid #d9d9d9;
  }
  .grey-font {
    color: #999999;
  }
  .font14 {
    font-size: 14px;
  }
  .v-card:not(.v-sheet--tile) {
    border-radius: 0;
  }
  .v-list-group {
    border: 0.5px solid rgba(0,0,0,.12);
    background-color: #e3e2e1;
  }
  .v-list-item {
    background-color: white;
  }
  .v-btn {
    border-radius: 0;
    border: 1px solid #d9d9d9;
    width: 100%;
    background-color: white;
  }
  .loader {
    position: absolute;
    z-index: 900;
    margin: 45%;
  }
  @media(max-width: 1130px) {
    .category {
      display: none;
    }
  }
  @media (max-width: 950px) {
    .scroll {
      overflow-y: scroll;
      -ms-overflow-style: none;
    }
    ::-webkit-scrollbar {
      display:none;
    }
  }
</style>