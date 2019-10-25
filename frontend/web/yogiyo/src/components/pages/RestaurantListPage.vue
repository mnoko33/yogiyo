<template>
  <v-content>
    <Category
      :categoryName="categoryName"
    ></Category>
    <v-layout row class="restaurant-list">
      <v-flex sm12>
         <p class="ml-5 mt-8" style="font-size: 13px">요기요 등록 음식점
           <v-tooltip bottom color="white">
            <template v-slot:activator="{ on }">
             <v-icon size="15" class="mb-1" v-on="on">mdi-help-circle-outline</v-icon>
            </template>
             <span style="color: black">요기요와 계약하여 등록된 음식점. 거리, <br>재주문율 등 기준에 따라 결정되었으며 <br>기준 외에 신규 및 할인음식점이 표시됩니다.</span>
           </v-tooltip>
        <span style="color: red"> {{restaurants.length}}곳</span>을 찾았습니다.</p>
      </v-flex>
      <v-flex xs12 sm6 class="restaurant" v-for="restaurant in restaurants" :key="restaurant.id">
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
      categoryName: {type: String}
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