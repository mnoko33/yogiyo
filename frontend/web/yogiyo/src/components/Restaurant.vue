<template>
  <v-content>
    <router-link class="router" :to="{name: 'DetailRestaurantPage', params: {restaurantId: id}}">
      <v-card outlined mx-auto class="restaurant-card">
        <div class="d-flex flex-no-wrap">
          <v-avatar tile size="70" style="margin-top: 18px">
            <v-img :src="thumbnail"></v-img>
          </v-avatar>
          <div class="ml-3 mt-7">
            <p style="font-size: 16px; margin-bottom: 0">{{ name }}</p>
            <span v-if="online" style="color: red; font-size: 13px">{{ online }}</span>
            <span style="font-size: 13px"> | {{ minOrderAmount }}원 이상 배달</span>
          </div>
        </div>
        <div style="float: right">
          <p style="font-size: 11px; color: #999999">{{ delivery }}분</p>
        </div>
      </v-card>
    </router-link>
  </v-content>
</template>

<script>
  export default {
    name: "Restaurant",
    props: {
      id: {type: String},
      name: {type: String},
      category: {type: String},
      thumbnailUrl: {type: String},
      address: {type: String},
      lng: {type: Number},
      lat: {type: Number},
      openTime: {type: String},
      deliveryTime: {type: Number},
      representativeMenus: {type: String},
      deliveryFee: {type: Number},
      minOrderAmount: {type: Number},
      paymentMethods: {type: String},
    },
    data() {
      return {
        creditCard: '',
        online: '',
        thumbnail: '',
        delivery: 0
      }
    },
    mounted(){
      this.getPaymentMethods();
      this.getThumbnailUrl();
      this.getDeliveryTime();
    },
    methods: {
      getPaymentMethods() {
        const isCreditCard = this.paymentMethods.indexOf('creditcard');
        const isOnline = this.paymentMethods.indexOf('online');
        if (isCreditCard >= 0)
          this.creditCard = '신용카드, 현금';
        if (isOnline >= 0)
          this.online = '요기서결제';
      },
      getThumbnailUrl() {
        if (this.thumbnailUrl === '') {
          this.thumbnail = require('../assets/categoryMenu.jpg');
        } else {
          this.thumbnail = this.thumbnailUrl;
        }
      },
      getDeliveryTime() {
        if (this.deliveryTime === null) {
          this.delivery = 30;
        } else {
          this.delivery = this.deliveryTime;
        }
      }
    },
    watch: {
      thumbnailUrl() {
        this.getThumbnailUrl();
      },
      deliveryTime() {
        this.getDeliveryTime();
      }
    }
  }
</script>

<style scoped>
.restaurant-card {
  position: relative;
  background: #fff;
  padding: 0 8px;
  margin-bottom: 10px;
  height: 108px;
}
.router {
  text-decoration: none;
  color: black;
}
.v-card:not(.v-sheet--tile) {
  border-radius: 0;
}
</style>