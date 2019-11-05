<template>
  <v-content>
    <Search></Search>
    <v-container>
      <v-layout v-if="categories" row style="width: 90%; margin: auto">
        <v-flex xs6 sm4 md3 v-for="category in categories" :key="category.categoryIdx">
          <router-link :to="{name: 'RestaurantListPage', params: {categoryIdx: String(category.id), categoryName: category.name}}">
            <v-card outlined flat height="218px" style="margin: 2% 2%; z-index: 2; position: relative;">
            <p style="position: absolute; top: 7%; left: 7%; color: #333; font-size: 100%; font-weight: bold; z-index: 1">{{category.name}}</p>
            <v-img class="white--text align-end" width="216px" height="216px" style="margin-right: 0; position: absolute; bottom: 0; right: 0" :src="'http://13.124.8.90:3000' + category.imgUrl"/>
          </v-card></router-link>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  import api from '@/api'
  import Search from "@/components/Search";

  export default {
    name: "main",
    components: {
      Search
    },
    data: () => ({
      categories: []
    }),
    mounted() {
      this.getCategory()
    },
    methods: {
      async getCategory() {
        api.getCategory().then(res => {
          this.categories = res.data.categories;
          this.categories.pop()
        })
      }
    }
  }
</script>

<style scoped>

</style>