<template>
  <v-container>
    <v-layout>
      <p class="info-text">회원정보 입력</p>
    </v-layout>
    <v-layout mt-2>
      <input
        type="text"
        class="Login"
        v-model="email"
        autocomplete="off"
        placeholder="(필수)이메일 주소 입력"
        required
      />
    </v-layout>
    <v-layout>
      <input
        type="password"
        class="Login"
        v-model="password"
        autocomplete="new-password"
        placeholder="(필수)비밀번호 입력"
        required
      />
    </v-layout>
    <v-layout>
      <input
        type="password"
        name="password"
        class="Login"
        autocomplete="off"
        placeholder="(필수)비밀번호 재확인"
        required
      />
    </v-layout>
    <v-layout>
      <input
        type="text"
        name="nickname"
        class="Login"
        autocomplete="off"
        v-model="username"
        placeholder="(선택)닉네임 입력"
        required
      />
    </v-layout>
    <v-layout>
      <p class="info-text">휴대폰 인증</p>
    </v-layout>
    <v-layout mt-2>
      <input
        type="text"
        name="phonenumber"
        class="Login"
        v-model="phone_num"
        placeholder="(필수)휴대폰 전화번호 입력(-제외)"
        required
      />
      <button @click="certification">인증</button>
    </v-layout>
    <v-layout>
      <input
        type="text"
        name="verification"
        class="Login"
        v-model="code"
        placeholder="인증번호 입력"
        required
      />
      <button @click="verification">확인</button>
    </v-layout>
    <v-layout>
      <p class="info-text">약관동의</p>
    </v-layout>
    <v-layout>
      <button @click="join" class="login-btn">회원가입완료</button>
    </v-layout>
  </v-container>
</template>

<script>
  import api from '@/api'
  export default {
    name: "join",
    data: () => ({
      email: '',
      password:'',
      username: '',
      phone_num:'',
      code:'',
    }),
    methods: {
        async join() {
          const data = {
             "email": this.email,
             "password": this.password,   // 특수문자, 숫자, 문자를 모두 포함한 8~15자리
             "phone_num": this.phone_num,
             "username": this.username // 없을 경우 이메일 @ 앞부분으로 대체
          }
          // Todo 회원가입 하자마자 로그인 (완료!)
          await api.join(data).then(async res => {
            // console.log(res.data.jwt)
              console.log(res)
            this.$session.start();
            this.$session.set('token', res.data.token);
            // console.log(res)
            this.getUser()
            return this.$router.push({name:'MainPage'});
          }).catch(e => {
            console.log(e);
          })
        },
        getUser() {
          let token = this.$session.get("token")
          // parseJwt
          let base64Url = token.split('.')[1];
          let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
            this.user = jsonPayload
             localStorage.setItem('currentUser', this.user)
             this.$store.state.currentUser = localStorage.getItem('currentUser')
          return JSON.parse(jsonPayload);
        },
        async certification() {
          const data = {
             "phone_num": this.phone_num,
          };
          await api.certificationPhoneNum(data).then(res => {
              // if(res.status == 'true') {
              // }

          })
        },
        async verification() {
            const data = {
                "code": this.code,
                "phone_num": this.phone_num
            }
            await api.verificationPhoneNum(data).then(res => {
                console.log(res)
            })
        }
    },
  }
</script>

<style scoped>
  .info-text {
    margin: 1% auto 0 auto;
    min-width: 480px;
    width: 800px;
    font-size: 14px;
    font-weight: 800;
    padding-left: 3px;
  }
</style>