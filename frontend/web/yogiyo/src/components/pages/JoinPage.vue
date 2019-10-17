<template>
  <v-container>
    <v-layout>
      <p class="info-text">회원정보 입력</p>
    </v-layout>
    <v-layout mt-2>
      <input
        type="text"
        name="username"
        class="Login"
        placeholder="(필수)이메일 주소 입력"
        required
      />
    </v-layout>
    <v-layout>
      <input
        type="password"
        name="password"
        class="Login"
        placeholder="(필수)비밀번호 입력"
        required
      />
    </v-layout>
    <v-layout>
      <input
        type="password"
        name="password"
        class="Login"
        placeholder="(필수)비밀번호 재확인"
        required
      />
    </v-layout>
    <v-layout>
      <input
        type="password"
        name="nickname"
        class="Login"
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
        placeholder="(필수)휴대폰 전화번호 입력(-제외)"
        required
      />
    </v-layout>
    <v-layout>
      <input
        type="text"
        name="verification"
        class="Login"
        placeholder="인증번호 입력"
        required
      />
    </v-layout>
    <v-layout>
      <p class="info-text">약관동의</p>
    </v-layout>
    <v-layout>
      <button class="login-btn">회원가입완료</button>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: "join",
    data: () => ({
    }),

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