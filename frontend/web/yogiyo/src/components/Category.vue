<template>
  <v-content>
    <div class="sms category-btn">
      <v-btn-toggle tile class="category ml-auto">
        <v-btn class="toggle-btn" depressed color="white"><v-icon>mdi-magnify</v-icon></v-btn>
        <router-link v-for="category in categoryList" :key="category.categoryIdx" class="router" :to="{name: 'RestaurantListPage', params: {categoryIdx: category.categoryIdx, categoryName: category.category}}">
          <v-btn class="toggle-btn" depressed outlined color="black"><span style="font-size: 12px">{{category.category}}</span></v-btn>
        </router-link>
      </v-btn-toggle>
    </div>

    <div class="category-select mx-3 mt-3">
      <v-btn outlined @click="clickSelectButton" style="width: 100%; border-radius: 0; border: 1px solid rgba(0,0,0,.12);">{{categoryName}}</v-btn>
    </div>

    <v-list v-if="selectBtn" class="mt-2 mx-3 select-btn-list" >
      <v-row>
        <v-col style="padding-top: 0; padding-bottom: 0">
          <router-link v-for="category in categoryList" :key="category.categoryIdx" class="router" :to="{name: 'RestaurantListPage', params: {categoryIdx: category.categoryIdx, categoryName: category.category}}">
            <v-btn outlined @click="clickSelectButton" class="select-btn"><v-img class="mr-2" :src="category.icon" style="max-width: 18px; max-height:18px"></v-img>{{category.category}}</v-btn></router-link>
        </v-col>
      </v-row>
    </v-list>
  </v-content>
</template>

<script>
  export default {
    name: "Category",
    props: {
      categoryIdx: {type: String}
    },
    data() {
      return {
        categoryList: [
            {category: '전체보기', categoryIdx: '1', icon: require('../assets/categoryIcon/1.jpg')},
            {category: '1인분 주문', categoryIdx: '2', icon: require('../assets/categoryIcon/2.jpg')},
            {category: '프랜차이즈', categoryIdx: '3', icon: require('../assets/categoryIcon/3.jpg')},
            {category: '치킨', categoryIdx: '4', icon: require('../assets/categoryIcon/4.jpg')},
            {category: '피자/양식', categoryIdx: '5', icon: require('../assets/categoryIcon/5.jpg')},
            {category: '중국집', categoryIdx: '6', icon: require('../assets/categoryIcon/6.jpg')},
            {category: '한식', categoryIdx: '7', icon: require('../assets/categoryIcon/7.jpg')},
            {category: '일식/돈까스', categoryIdx: '8', icon: require('../assets/categoryIcon/8.jpg')},
            {category: '족발/보쌈', categoryIdx: '9', icon: require('../assets/categoryIcon/9.jpg')},
            {category: '야식', categoryIdx: '10', icon: require('../assets/categoryIcon/10.jpg')},
            {category: '분식', categoryIdx: '11', icon: require('../assets/categoryIcon/11.jpg')},
            {category: '카페/디저트', categoryIdx: '12', icon: require('../assets/categoryIcon/12.jpg')},
            {category: '편의점', categoryIdx: '13', icon: require('../assets/categoryIcon/13.jpg')},
        ],
        categoryName: '',
        selectBtn: false
      }
    },
    mounted() {
      this.setCategoryName();
    },
    methods: {
      clickSelectButton() {
        this.selectBtn = !this.selectBtn;
      },
      setCategoryName() {
        this.categoryName = this.categoryList[this.categoryIdx - 1].category;
      }
    },
    watch: {
      categoryIdx() {
        this.setCategoryName();
      }
    }
  }
</script>

<style scoped>
.sms {
  padding: 0;
  box-shadow: 2px 2px 3px 0 rgba(0,0,0,0.25);
  background-color: white;
  text-align: center;
}
.category {
  color: #333;
  background-color: #fff !important;
}
.router {
  text-decoration: none;
  color: black;
}
.toggle-btn {
  padding: 0 11px !important;
  border-radius: 0;
}
.select-btn {
  width: 33.333%;
  background-color: white;
  border-radius: 0;
  border: 0.5px solid rgba(0,0,0,.12);
}
.category-select {
  color: #333;
  background-color: #fff !important;
  top: 0;
}
.select-btn-list {
  position: absolute;
  padding: 0 0;
  box-shadow: 2px 2px 3px 0 rgba(0,0,0,0.25);
  z-index: 9;
}
@media (min-width: 992px) {
  .category-menu ul {
    border-top: 0;
  }
}
@media (min-width: 1020px) {
  .category-select {
    display: none;
  }
  .select-btn {
    display: none;
  }
}
@media (max-width: 1020px) {
  .category-btn {
    display: none;
  }
}
</style>