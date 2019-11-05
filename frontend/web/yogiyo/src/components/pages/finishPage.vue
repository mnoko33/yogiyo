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
    props: {
      finish: {type: Number, default: 0}
    },
    created() {
      if (this.finish === 0) {
        router.push({name: 'MainPage'})
      }
      this.finishOrder();
    },
    methods: {
      async finishOrder() {
        await api.approvalPayment();
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