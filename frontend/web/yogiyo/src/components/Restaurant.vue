<template>
  <v-card outlined mx-auto class="restaurant-card">
    <div class="d-flex flex-no-wrap">
      <v-avatar tile size="70" style="margin-top: 18px">
        <v-img :src="thumbnailUrl"></v-img>
      </v-avatar>
      <div class="ml-3 mt-7">
        <p style="font-size: 16px; margin-bottom: 0">{{ name }}</p>
        <span v-if="online" style="color: red; font-size: 13px">{{ online }}</span>
        <span style="font-size: 13px"> | {{ minOrderAmount }}원 이상 배달</span>
      </div>
    </div>
    <div style="float: right">
      <p style="font-size: 11px; color: #999999">{{ deliveryTime }}분</p>
    </div>
  </v-card>
</template>

<script>
  export default {
    name: "Restaurant",
    props: {
      id: {type: Number},
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
        online: ''
      }
    },
    mounted(){
      this.getPaymentMethods();
      if (this.thumbnailUrl === '')
        this.thumbnailUrl = require('../assets/categoryMenu.jpg');
      if (this.deliveryTime === null)
        this.deliveryTime = 30;
    },
    methods: {
      getPaymentMethods() {
        const isCreditCard = this.paymentMethods.indexOf('creditcard');
        const isOnline = this.paymentMethods.indexOf('online');
        if (isCreditCard >= 0)
          this.creditCard = '신용카드, 현금';
        if (isOnline >= 0)
          this.online = '요기서결제';
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
</style>