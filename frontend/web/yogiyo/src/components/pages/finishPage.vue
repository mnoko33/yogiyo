<template>
  <v-container class="center">
    <img src="../../assets/finish.png" alt="주문완료">
  </v-container>
</template>

<script>
  import router from '@/router'
  import api from '../../api'

  export default {
    name: "finishPage",
    mounted() {
      this.finishOrder();
    },
    methods: {
      async finishOrder() {
        await api.approvalPayment();
        localStorage.removeItem('temporary');
        this.$store.state.temporary = '';
        localStorage.setItem('cartLength', cartLength);
        localStorage.setItem('temporary', this.$store.state.currentUser);
        await api.getUserInfo();
      }
    }
  }
</script>

<style scoped>
.center {
  text-align: center;
}
img {
  width: 700px
}
</style>