<template>
  <v-content class="restaurant-category-menu">
    <div class="sms">
      <v-btn-toggle tile class="category-btn ml-auto">
        <v-btn color="white"><v-icon>mdi-magnify</v-icon></v-btn>
        <v-btn color="white" v-for="category in categoryList" :key="category.categoryIdx">
          <router-link :to="{name: 'RestaurantListPage', params: {categoryIdx: category.categoryIdx}}">{{ category.category }}</router-link></v-btn>
      </v-btn-toggle>
    </div>
  </v-content>
</template>

<script>
  export default {
    name: "Category",
    data() {
      return {
        categoryList: [
            {category: '전체보기', categoryIdx: 1},
            {category: '1인분 주문', categoryIdx: 2},
            {category: '프랜차이즈', categoryIdx: 3},
            {category: '치킨', categoryIdx: 4},
            {category: '피자/양식', categoryIdx: 5},
            {category: '중국집', categoryIdx: 6},
            {category: '한식', categoryIdx: 7},
            {category: '일식/돈까스', categoryIdx: 8},
            {category: '족발/보쌈', categoryIdx: 9},
            {category: '야식', categoryIdx: 10},
            {category: '분식', categoryIdx: 11},
            {category: '카페/디저트', categoryIdx: 12},
            {category: '편의점', categoryIdx: 13},
        ]
      }
    }
  }
</script>

<style scoped>
.sms {
  padding: 0;
  border-bottom: 1px solid gray;
  margin: auto;
  background-color: white;
  text-align: center;
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