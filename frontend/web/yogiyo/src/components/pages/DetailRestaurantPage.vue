<template>
  <v-content>
    <div class="category">
      <Category></Category>
    </div>
    <v-container>
    <v-row no-gutters>
      <v-col cols="12" md="8" class="pa-4 detail-restaurant">
        <v-card outlined class="mr-5 restaurant-info">
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

        <v-list class="mt-5 mr-8" style="padding: 0 0">
          <v-row class="ml-0">
            <v-col style="padding: 0;">
              <v-btn big outlined @click="clickMenu()" style="height: 48px"><span style="color: black">메뉴 <span style="font-size: 12px">{{numsOfMenus}}</span></span></v-btn>
            </v-col>
            <v-col style="padding: 0;">
              <v-btn big outlined @click="clickInfo()" style="height: 48px"><span style="color: black">정보</span></v-btn>
            </v-col>
          </v-row>
        </v-list>

        <v-list no-action class="mr-5" v-if="menu" style="padding: 0;">
          <v-list-group active-class="black--text" v-for="(label, index) in labels" :key="index">
            <template v-slot:activator>
              <v-list-item-title><v-icon color="yellow" class="mr-2" v-show="label === '인기메뉴'">mdi-trophy</v-icon>{{label}}</v-list-item-title>
            </template>
            <v-list-item v-for="(menu, index) in menuList[label]" :key="index">
              <v-list-item-content style="border-bottom: 0.5px solid rgba(0,0,0,.3)">
                <v-list-item-title><strong>{{menu.name}}</strong></v-list-item-title>
                <v-list-item-subtitle style="font-size: 13px">{{menu.description}}</v-list-item-subtitle>
                <v-list-item-title class="mt-1">{{menu.price}}원</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>

        <v-card v-if="info" outlined class="mr-5 restaurant-info">
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
      <v-col cols="6" md="4" class="pa-4 cart">
        <v-card outlined dark style="background-color: black;">
          <div class="my-0"><p class="mx-2 my-2">주문표</p></div>
        </v-card>
        <v-card outlined class="restaurant-info" style="min-height: 122px">
          <p class="text-center" style="padding: 100px 0">주문표에 담긴 메뉴가 없습니다.</p>
        </v-card>
        <v-card v-if="deliveryFee > 0" outlined class="restaurant-info">
          <p class="mr-3 mt-3 font14" style="text-align: right">배달요금 {{deliveryFee}}원 별도</p>
        </v-card>
        <v-card class="mt-4" outlined dark color="grey lighten-1">
          <p class="mt-3" style="text-align: center">주문하기</p>
        </v-card>

      </v-col>
    </v-row>
      </v-container>
  </v-content>
</template>

<script>
  import api from '../../api';
  import Category from "@/components/Category";

  export default {
    name: "DetailRestaurantPage",
    components: {
      Category
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
      }
    },
    mounted() {
      this.getRestaurant();
      this.getPaymentMethods();
      this.getThumbnailUrl();
      this.getDeliveryTime();
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
        this.deliveryFee = this.restaurantInformation.deliveryFee;
        this.minOrderAmount = this.restaurantInformation.minOrderAmount;
        this.paymentMethods = this.restaurantInformation.paymentMethods;
        this.numsOfMenus = this.restaurantData.data.numsOfMenus;
        this.labels = this.restaurantData.data.labels;
        this.menuList = this.restaurantData.data.menus;
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
      }
    },
    watch: {
      thumbnail() {
        this.getThumbnailUrl();
      },
      deliveryTime() {
        this.getDeliveryTime();
      },
      paymentMethods() {
        this.getPaymentMethods();
      }
    }
  }
</script>

<style scoped>
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
@media(max-width: 960px){
  .cart {
    display: none;
  }
}
@media(max-width: 1130px) {
  .category {
    display: none;
  }
}

</style>