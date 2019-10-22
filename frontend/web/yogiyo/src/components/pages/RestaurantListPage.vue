<template>
  <v-flex>
    <Category></Category>
    <p>{{ restaurantList }}</p>
  </v-flex>
</template>

<script>
  import Category from "@/components/Category";
  import api from '../../api'

  export default {
    name: "RestaurantListPage",
    props: {
      restID: {type: Number}
    },
    components: {
      Category
    },
    data() {
      return {
        restaurantList: ''
      }
    },
    mounted() {
     this.getRestaurantList();
    },
    methods: {
      async getRestaurantList() {
        this.restaurantList = await api.getCategoryList(this.restID);
      }
    }
  }
</script>

<style scoped>

</style>