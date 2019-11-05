<template>
  <v-app id="app">
    <v-content>
      <Header></Header>
      <router-view :key="$route.fullPath"/>
      <Footer></Footer>
    </v-content>
</v-app>

</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'app',
  components: {
    Header,
    Footer,
  }
}

</script>

<style>
</style>
