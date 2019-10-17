<template>
  <v-container>
    <v-layout mt-1>
      <img class="logo" src="../../../public/yogiyologo.png" style="min-width: 80px; height: 43px; margin: auto" alt="yogiyo">
    </v-layout>
    <v-layout mt-5>
      <input
        type="text"
        name="username"
        class="Login"
        placeholder="이메일 주소 입력(필수)"
        required
      />
    </v-layout>
    <v-layout>
      <input
        type="password"
        name="password"
        class="Login"
        placeholder="비밀번호 입력(필수)"
        required
      />
    </v-layout>
    <v-layout>
      <button class="login-btn">로그인</button>
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
  export default {
    name: "login",
    data: () => ({
    }),

  }
</script>

<style>
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
    color: red;
    font-weight: 700;
  }
</style>