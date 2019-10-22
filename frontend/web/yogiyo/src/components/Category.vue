<template>
  <v-content class="restaurant-category-menu">
    <div class="sms">
      <v-btn-toggle tile class="category-btn">
        <v-btn><v-icon>mdi-magnify</v-icon></v-btn>
        <v-btn v-for="(category, index) in categories" :key="index">{{ category }}</v-btn>
      </v-btn-toggle>
    </div>
  </v-content>
</template>

<script>
  export default {
    name: "Category",
    data() {
      return {
        categories: ['전체보기', '1인분 주문', '프렌차이즈', '치킨', '피자/양식', '중국집', '한식', '일식/돈까스', '족발/보쌈', '야식', '분식', '카페/디저트', '편의점']
      }
    }
  }
</script>

<style scoped>
.sms {
  padding: 0;
  border-bottom: 1px solid gray;
  margin: auto;
}
.category-btn {
  position: relative;
  color: #333;
  background-color: #fff !important;
}
@media (min-width: 992px) {
  .restaurant-category-menu {
    float: none;
    width: 100%;
  }
  .category-menu ul {
    border-top: 0;
  }
}
</style>