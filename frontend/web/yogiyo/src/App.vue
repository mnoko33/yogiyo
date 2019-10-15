<template>
  <v-app id="app">
    <v-content>
      <router-view />
      <Footer></Footer>
    </v-content>
</v-app>

</template>

<script>
import Footer from './components/Footer'
export default {
  name: 'app',
  components: {
      Footer
  }
}
</script>

<style>
</style>
