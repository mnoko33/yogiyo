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
            :src="'http://70.12.247.65:3000' + category.imgUrl"
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
        categories: []
    }),
  mounted() {
        this.getCategory()
  },
  methods: {
        async getCategory() {
            api.getCategory().then(res => {
                this.categories = res.data.categories
                this.categories.pop()
            })
        }
  }
  }
</script>

<style scoped>

</style>