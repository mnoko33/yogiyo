<template>
  <v-container>
    <v-layout>
      <span class="username">{{currentUser}}</span>
    </v-layout>
    <v-layout>
      <span class="login-status">님으로 로그인 되어 있습니다.</span>
    </v-layout>
    <v-layout>
      <button class="login-btn" @click="logout">로그아웃</button>
    </v-layout>
  </v-container>
</template>

<script>

  export default {
    name: "logout",
    data: () => ({
      currentUser: ''
    }),
    mounted() {
      this.getUser()
    },
    methods: {
      getUser () {
        const User = JSON.parse(this.$store.state.currentUser);
        if (User.username) {
          this.currentUser = User.username
        } else {this.currentUser = User}
      },
      logout () {
        this.$session.start();
        this.$session.destroy();
        this.$store.state.currentUser = '';
        this.$store.state.token = '';
        this.$store.state.temporary = '';
        localStorage.removeItem('currentUser');
        localStorage.removeItem('temporary');
        localStorage.removeItem('token');
        localStorage.removeItem('cartLength');
        return this.$router.push({name:'MainPage'});
      }
    }
  }
</script>

<style>
  .username {
    margin: 5% auto 8px auto;
    font-size: 16px;
    color: #ff8a00;
    line-height: 1.4;
    font-weight: 600;
  }
  .login-status {
    margin: 0 auto 3% auto;
    text-align: center;
    font-size: 16px;
    color: #666;
    line-height: 1.4;
    font-weight: 500;
  }
</style>