<template>
  <v-content>
    <Search></Search>
    <div style="position: sticky; z-index: 100">
      <Category :categoryIdx="categoryIdx"></Category>
    </div>
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
      <v-flex v-if="result === false" xs12 class="restaurant">
        <v-card outlined class="card-loader">
          <div class="mx-auto my-auto">
            <SpinnerLoader class="loader" :color="'#9e9d99'"/>
            <p class="mx-auto">레스토랑 리스트를 불러오는 중입니다.</p>
          </div>
        </v-card>
      </v-flex>
      <v-flex v-if="result === true && restaurantsNumber === 0" xs12 class="restaurant">
        <v-card outlined class="card-loader">
          <div class="mx-auto my-auto">
            <p class="mx-auto" style="margin-top: 10%">해당하는 음식점이 존재하지 않습니다.</p>
          </div>
        </v-card>
      </v-flex>
      <v-flex v-else xs12 sm6 class="restaurant" v-for="restaurant in restaurants" :key="restaurant.id">
        <Restaurant
                :id="String(restaurant.id)"
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
  import { SpinnerLoader } from 'vue-spinners-css';
  import router from "@/router";
  import Search from "@/components/Search";
  

  export default {
    name: "RestaurantListPage",
    props: {
      categoryIdx: {type: String},
      categoryName: {type: String}
    },
    components: {
      Category,
      Restaurant,
      SpinnerLoader,
      Search
    },
    data() {
      return {
        restaurantList: '',
        restaurants: [],
        restaurantsNumber: 0,
        isUser: '',
        result: false
      }
    },
    created() {
      if (this.$store.state.currentUser === null) {
        router.push({name: 'LoginPage'})
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
        this.result = true
      },
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
  position: relative;
  max-width: 1020px;
  margin: 0 auto;
  overflow: hidden;
}
.restaurant {
  padding-left: 10px;
  padding-right: 10px;
}
.loader {
  z-index: 100;
  margin: auto;
}
.v-card:not(.v-sheet--tile) {
  border-radius: 0;
  background-color: white;
  height: 500px;
  text-align: center;
  padding-top: 150px;
  margin-bottom: 12px;
}
</style>