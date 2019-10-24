<template>
  <v-container>
    <v-layout v-if="categories" row style="width: 90%; margin: auto">
      <v-flex xs6 sm4 md3 v-for="category in categories" :key="category.categoryIdx">
        <router-link :to="{name: 'RestaurantListPage', params: {categoryIdx: category.id+1}}"><v-card
            outlined
            flat
            height="218px"
            style="margin: 2% 2%; z-index: 2; position: relative;"
        >
          <p style="position: absolute; top: 7%; left: 7%; color: #333; font-size: 100%; font-weight: bold; z-index: 1">{{category.name}}</p>
          <v-img
            class="white--text align-end"
            width="216px"
            height="216px"
            style="margin-right: 0; position: absolute; bottom: 0; right: 0"
            :src="category.imgUrl"
          />
        </v-card></router-link>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import api from '@/api'
  export default {
    name: "main",
    data: () => ({
<<<<<<< HEAD
        categoryList: [
            {background: require("../../assets/menulist/category-01.png" ), category: '전체보기', categoryIdx: '1'},
            {background: require("../../assets/menulist/category-onedish.png"), category: '1인분 주문', categoryIdx: '2'},
            {background: require("../../assets/menulist/category-10.png"), category: '프랜차이즈', categoryIdx: '3'},
            {background: require("../../assets/menulist/category-02.png"), category: '치킨', categoryIdx: '4'},
            {background: require("../../assets/menulist/category-03.png"), category: '피자/양식', categoryIdx: '5'},
            {background: require("../../assets/menulist/category-04.png"), category: '중국집', categoryIdx: '6'},
            {background: require("../../assets/menulist/category-05.png"), category: '한식', categoryIdx: '7'},
            {background: require("../../assets/menulist/category-06.png"), category: '일식/돈까스', categoryIdx: '8'},
            {background: require("../../assets/menulist/category-07.png"), category: '족발/보쌈', categoryIdx: '9'},
            {background: require("../../assets/menulist/category-08.png"), category: '야식', categoryIdx: '10'},
            {background: require("../../assets/menulist/category-09.png"), category: '분식', categoryIdx: '11'},
            {background: require("../../assets/menulist/category-11.png"), category: '카페/디저트', categoryIdx: '12'},
            {background: require("../../assets/menulist/category-convenience-store.png"), category: '편의점', categoryIdx: '13'},
        ]
=======
        categories: []
>>>>>>> feature/phone
    }),
  mounted() {
        this.getCategory()
  },
  methods: {
        async getCategory() {
            const apiurl = 'http://70.12.247.65:3000';
            api.getCategory().then(res => {
                this.categories = res.data.categories
                this.categories.pop()
                for (var i in this.categories) {
                    this.categories[i].imgUrl = apiurl+ this.categories[i].imgUrl
                }
            })
        }
  }
  }
</script>

<style scoped>

</style>