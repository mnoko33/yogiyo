<template>
  <v-container>
    <v-layout mt-1>
      <img class="logoimg" src="../../public/yogiyologo.png" alt="yogiyo">
    </v-layout>
    <v-layout mt-5>
      <input
        type="text"
        v-model="email"
        class="Login"
        placeholder="이메일 주소 입력(필수)"
        required
      />
    </v-layout>
    <v-layout>
      <input
        type="password"
        v-model="password"
        class="Login"
        placeholder="비밀번호 입력(필수)"
        required
      />
    </v-layout>
    <v-layout>
      <button class="login-btn" @click="login()">로그인</button>
    </v-layout>
    <v-layout>
      <div class="welcome">
        <span>요기요가 처음이신가요? </span>
        <router-link :to="{name: 'JoinPage'}" class="link">
          <span class="join-button"> 이메일 회원 가입</span>
        </router-link>
       </div>
    </v-layout>
  </v-container>
</template>

<script>
import api from '@/api'
import Swal from 'sweetalert2'

  export default {
    name: "login",
    data: () => ({
      user: '',
      email:'',
      password:'',
    }),
    methods: {
      async login() {
        const params = {
          email : this.email,
          password: this.password
        };
        if (params) {
          await api.login(params).then(async res => {
            if (res.data.status === true) {
              this.$session.start();
              this.$session.set('token', res.data.jwt);
              this.getUser();
              return this.$router.push({name:'MainPage'});
            } else {
              Swal.fire({
                text: res.data.message
              });
            }
          }).catch(e => {
            console.log(e);
          })
        }
      },
     async getUser() {
      let token = this.$session.get("token");
      // parseJwt
      let base64Url = token.split('.')[1];
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
        this.user = jsonPayload;
         localStorage.setItem('currentUser', this.user);
         localStorage.setItem('temporary', this.user);
         localStorage.setItem('token', token);
         this.$store.state.currentUser = localStorage.getItem('currentUser');
         this.$store.state.temporary = localStorage.getItem('temporary');
         this.$store.state.token = localStorage.getItem('token');
      return JSON.parse(jsonPayload);
    },

    }

  }
</script>

<style>
  .logoimg {
    min-width: 80px;
    height: 43px;
    margin: auto;
  }
  .Login {
    box-sizing: border-box;
    background-color: #fff;
    margin: auto;
    min-width: 480px;
    width: 800px;
    border: 1px solid #d9d9d9;
    height: 44px;
    padding: 10px 15px;
    font-size: 14px;
    font-weight: 500;
  }
  .login-btn {
    margin: 3% auto 0 auto;
    background-color: #f0001e;
    color: #ffffff;
    font-size: 15px;
    font-weight: bold;
    min-width: 480px;
    width: 800px;
    height: 40px;
  }
  .welcome {
    margin: 3% auto 0 auto;
    font-size: 14px;
    padding-left: 3px;
    color: #999;
    word-spacing: 1px;
    font-weight: 600;
  }
  .link {
    text-decoration: none;
  }
  .join-button{
    color: #f0001e;
    font-weight: 700;
  }
</style>