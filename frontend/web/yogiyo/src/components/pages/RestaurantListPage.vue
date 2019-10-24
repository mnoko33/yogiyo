<template>
  <v-content>
    <Category></Category>
    <div style="font-size: 13px">
      <p style="margin-left: 15%; margin-top: 15px">요기요 등록 음식점 <v-icon size="15" class="mb-1">mdi-help-circle-outline</v-icon>
        <span style="color: red"> {{restaurants.length}}곳</span>을 찾았습니다.</p>
    </div>
    <v-layout row class="restaurant-list">
      <v-flex sm12 md6 class="restaurant" v-for="restaurant in restaurants" :key="restaurant.id">
        <Restaurant
               :id="restaurant.id"
               :name="restaurant.name"
               :category="restaurant.category"
               :thumbnailUrl="restaurant.thumbnailUrl"
               :address="restaurant.address"
               :lng="restaurant.lng"
               :lat="restaurant.lat"
               :openTime="restaurant.openTime"
               :deliveryTime="restaurant.deliveryTime"
               :representativeMenus="restaurant.representativeMenus"
               :deliveryFee="restaurant.deliveryFee"
               :minOrderAmount="restaurant.minOrderAmount"
               :paymentMethods="restaurant.paymentMethods"
       ></Restaurant>
      </v-flex>
    </v-layout>
  </v-content>
</template>

<script>
  import Category from "@/components/Category";
  import api from '../../api'
  import Restaurant from "@/components/Restaurant";

  export default {
    name: "RestaurantListPage",
    props: {
      categoryIdx: {type: String},
      category: {type: String}
    },
    components: {
      Category,
      Restaurant
    },
    data() {
      return {
        restaurantList: '',
        restaurants: [],
        restaurantsNumber: 0,
      }
    },
    mounted() {
     this.getRestaurantList();
    },
    methods: {
      async getRestaurantList() {
        this.restaurantList = await api.getCategoryList(this.categoryIdx);
        this.restaurants = this.restaurantList.data.restaurants;
        this.restaurantsNumber = this.restaurants.length;
      }
    },
    watch: {
      categoryIdx() {
        this.getRestaurantList(); 
      }
    }
  }
</script>

<style scoped>
.restaurant-list {
  max-width: 1020px;
  margin: 0 auto;
  overflow: hidden;
}
.restaurant {
  padding-left: 10px;
  padding-right: 10px;
}
</style>