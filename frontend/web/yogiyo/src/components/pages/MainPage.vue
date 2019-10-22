<template>
  <v-container style="overflow: scroll;">
    <v-layout row style="width: 90%; margin: auto">
      <v-flex xs6 sm4 md3 v-for="(category,  index) in categoryList" :key="index">
        <router-link :to="{name: 'RestaurantListPage', params: {restID: index}}"><v-card
            outlined
            flat
            height="218px"
            style="margin: 2% 2%; z-index: 2; position: relative;"
        >
          <p style="position: absolute; top: 7%; left: 7%; color: #333; font-size: 100%; font-weight: bold; z-index: 1">{{category.category}}</p>
          <v-img
            class="white--text align-end"
            width="216px"
            height="216px"
            style="margin-right: 0; position: absolute; bottom: 0; right: 0"
            :src="category.background"
          />
        </v-card></router-link>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: "main",
    data: () => ({
        categoryList: [
            {background: require("../../assets/menulist/category-01.png" ), category: '전체보기'},
            {background: require("../../assets/menulist/category-onedish.png"), category: '1인분 주문'},
            {background: require("../../assets/menulist/category-10.png"), category: '프랜차이즈'},
            {background: require("../../assets/menulist/category-02.png"), category: '치킨'},
            {background: require("../../assets/menulist/category-03.png"), category: '피자/양식'},
            {background: require("../../assets/menulist/category-04.png"), category: '중국집'},
            {background: require("../../assets/menulist/category-05.png"), category: '한식'},
            {background: require("../../assets/menulist/category-06.png"), category: '일식/돈까스'},
            {background: require("../../assets/menulist/category-07.png"), category: '족발/보쌈'},
            {background: require("../../assets/menulist/category-08.png"), category: '야식'},
            {background: require("../../assets/menulist/category-09.png"), category: '분식'},
            {background: require("../../assets/menulist/category-11.png"), category: '카페/디저트'},
            {background: require("../../assets/menulist/category-convenience-store.png"), category: '편의점'},
        ]
    }),

  }
</script>

<style scoped>

</style>