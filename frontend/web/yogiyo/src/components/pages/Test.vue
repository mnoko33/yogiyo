<template>
  <v-container>
    <v-layout>
      <v-text-field v-model="email"></v-text-field>
      <v-btn @click="check">check</v-btn>
    </v-layout>
        <v-layout>
      <v-text-field v-model="password"></v-text-field>
    </v-layout>
        <v-layout>
      <v-text-field v-model="phone_num"></v-text-field>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
      name: "test",
    data: () => ({
      email: '',
      password:'',
      phone_num:'',
    }),
      methods: {
          check() {
              const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
              const passwordRegex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;  // 특수문자 / 문자 / 숫자 포함 형태의 8~15자리
              const phoneRegex = /^\d{11}$/;
              // if (!emailRegex.test(this.email)) {
            console.log('email regex :', emailRegex.test(this.email));
            console.log('password regex :', passwordRegex.test(this.password));
            console.log('phone_num regex :', phoneRegex.test(this.phone_num));
              // }
          }
      }
  }
</script>