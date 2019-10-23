<template>
  <v-container style="overflow: scroll;">
    <v-layout row style="width: 90%; margin: auto">
      <v-btn @click="hello">time</v-btn>
      <v-btn @click="test">input</v-btn>
      <v-flex xs6 sm4 md3 v-for="category in categoryList" :key="category.categoryIdx">
        <router-link :to="{name: 'RestaurantListPage', params: {categoryIdx: category.categoryIdx}}"><v-card
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
  import Swal from 'sweetalert2'
  import api from '@/api'
  export default {
    name: "main",
    data: () => ({
        categoryList: [
            {background: require("../../assets/menulist/category-01.png" ), category: '전체보기', categoryIdx: 1},
            {background: require("../../assets/menulist/category-onedish.png"), category: '1인분 주문', categoryIdx: 2},
            {background: require("../../assets/menulist/category-10.png"), category: '프랜차이즈', categoryIdx: 3},
            {background: require("../../assets/menulist/category-02.png"), category: '치킨', categoryIdx: 4},
            {background: require("../../assets/menulist/category-03.png"), category: '피자/양식', categoryIdx: 5},
            {background: require("../../assets/menulist/category-04.png"), category: '중국집', categoryIdx: 6},
            {background: require("../../assets/menulist/category-05.png"), category: '한식', categoryIdx: 7},
            {background: require("../../assets/menulist/category-06.png"), category: '일식/돈까스', categoryIdx: 8},
            {background: require("../../assets/menulist/category-07.png"), category: '족발/보쌈', categoryIdx: 9},
            {background: require("../../assets/menulist/category-08.png"), category: '야식', categoryIdx: 10},
            {background: require("../../assets/menulist/category-09.png"), category: '분식', categoryIdx: 11},
            {background: require("../../assets/menulist/category-11.png"), category: '카페/디저트', categoryIdx: 12},
            {background: require("../../assets/menulist/category-convenience-store.png"), category: '편의점', categoryIdx: 13},
        ]
    }),
  methods: {
        hello() {
            let timerInterval
              Swal.fire({
                title: '인증번호를 입력해주세요',
                html: '<b>5분 00초</b> 안에 인증을 완료해주세요',
                input: 'text',
                showCancelButton: true,
                timer: 1000*60*5 + 1000,
                onBeforeOpen: () => {
                  timerInterval = setInterval(() => {
                      let second = String(Math.floor((Swal.getTimerLeft()/1000) % 60));
                    Swal.getContent().querySelector('b')
                      .textContent = `${Math.floor((Swal.getTimerLeft()/1000/60) << 0)}분 ${(second).length < 2 ? '0'+second : second}초`
                  },1000)
                },
                onClose: () => {
                  clearInterval(timerInterval)
                }
              }).then((result) => {
                if (
                  /* Read more about handling dismissals below */
                  result.dismiss === Swal.DismissReason.timer
                ) {
                  Swal.fire({
                  text: '인증시간이 만료되었습니다',
                })
                }
              })
        },
      test() {
            Swal.fire({
              title: '인증번호를 입력해주세요',
              input: 'text',
              showCancelButton: true,
              confirmButtonText: '인증하기',
              showLoaderOnConfirm: true,
              preConfirm: async (code) => {
                  let data = {
                      "code": code,
                      "phone_num": '01050242683'
                  };
                return await api.verificationPhoneNum(data)
                  .then(async res => {
                      await Swal.fire({
                        text: res.data.message,
                })
                      console.log(res)
                  })
                  .catch(error => {
                    Swal.showValidationMessage(
                      `Request failed: ${error}`
                    )
                  })
              },
              allowOutsideClick: () => !Swal.isLoading()
            })
            //     .then((result) => {
            //   if (result.value) {
            //     Swal.fire({
            //       title: `${result.value.login}'s avatar`,
            //       imageUrl: result.value.avatar_url
            //     })
            //   }
            // })
      }
  }
  }
</script>

<style scoped>

</style>