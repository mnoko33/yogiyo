<template>
  <v-footer padless color="white">
    <v-card flat tile class="lighten-1 white--text text-center">
      <v-divider></v-divider>

      <v-card-text class="py-2" style="width: 1000px; margin: auto;">
        <nav>
          <ul>
            <li v-for="(menu, index) in menus" :key="index"><a :href="menu.address" target="_blank" style="text-decoration: none; color: #818181; font-size: 12px">{{ menu.name }}</a></li>
             <v-btn class="mx-5" icon><img src="../assets/페이스북로고.png" style="width: 12px" alt=""><a href="https://www.facebook.com/Yogiyokorea/" target="_blank" style="text-decoration:none; color: #818181; font-size: 12px;">페이스북</a></v-btn>
              <v-btn class="mx-5" icon><img src="../assets/네이버블로그.png" style="width: 12px" alt=""><a href="http://blog.yogiyo.co.kr/" target="_blank" style="text-decoration:none; color: #818181; font-size: 12px">블로그</a></v-btn>
          </ul>
        </nav>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text class="pt-0" style="font-size: 12px; width: 60%; margin: auto;">
        <p>(유)딜리버리히어로 코리아</p>
        <p>서울시 서초구 서초대로38길 12 마제스타시티 타워2 17층|대표자 : 강신봉|사업자등록번호:211-88-68802 사업자정보확인통신판매업신고:제 2018-서울서초-2635호|개인정보담당자 : privacy@yogiyo.co.kr|제휴문의 : partnership@deliveryhero.co.kr|고객만족센터 : support@yogiyo.co.kr|호스트서비스사업자 : (주)심플렉스인터넷</p>
        <p>유한회사 딜리버리히어로 코리아는 통신판매중개자이며 통신판매의 당사자가 아닙니다. 따라서 상품/ 거래정보 및 거래와 관련하여 요기요에 등록된 판매자의 고의 또는 과실로 소비자에게 발생하는 손해에 대해 유한회사 딜리버리히어로 코리아는 책임을 지지 않습니다. 상품 및 거래에 관하여 보다 정확한 정보는 해당 판매자에게 직접 확인하여 주시기 바랍니다. Copyright YOGIYO. All Rights Reserved.</p>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    name: "Footer",
    data: () => ({
      windows: {
        width: 0,
        height: 0
      },
      menus: [
        {name: '이용약관', address: 'https://www.yogiyo.co.kr/mobile/#/policy/'},
        {name: '개인정보처리방침', address: 'https://www.yogiyo.co.kr/mobile/#/privacy/'},
        {name: '회원등급정책', address: 'https://www.yogiyo.co.kr/mobile/#/point_policy/'},
        {name: '회사소개', address: 'https://www.deliveryhero.co.kr/'},
        {name: '요기요사장님', address: 'https://owner.yogiyo.co.kr/owner/login/'},
        {name: '입점문의', address: 'https://owner.yogiyo.co.kr/owner/join/request/'},
        {name: '공지사항', address: 'https://www.yogiyo.co.kr/mobile/#/notice/'},
      ],
    }),
    created() {
      window.addEventListener('resize', this.handleResize)
      this.handleResize();
    },
    methods: {
      handleResize() {
        this.windows.width = window.innerWidth;
        this.windows.height = window.innerHeight;
      },
    }
  }
</script>

<style type="text/css">
 nav ul{padding-top:10px;}
 nav ul li {
   display:inline;
   border-left:1px solid #999;
   font:bold 12px Dotum;
   padding:0 25px;
 }
 nav ul li:first-child{border-left:none;}
 nav ul li:last-child{border-left:none;}
</style>
