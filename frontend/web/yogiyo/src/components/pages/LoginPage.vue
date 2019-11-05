<template>
  <v-content>
    <LoginPage v-if="!isUser"></LoginPage>
    <LogoutPage v-if="isUser"></LogoutPage>
  </v-content>
</template>

<script>
  import LoginPage from '../Login'
  import LogoutPage from '../Logout'
  export default {
    name: "login",
    components: {
      LoginPage,
      LogoutPage
    },
    data: () => ({
      isUser: false,
      currentUser: ''
    }),
    mounted() {
      this.getUser()
    },
    methods: {
      getUser() {
        this.currentUser = this.$store.state.currentUser
        return this.isUser = this.currentUser
      },
    }
  }
</script>

<style>

</style>