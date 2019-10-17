<template>
  <v-app id="app">
    <v-content>
      <Header></Header>
      <!--<Search></Search>-->
      <router-view />
      <Footer></Footer>
    </v-content>
</v-app>

</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
import Search from './components/Search'

export default {
  name: 'app',
  components: {
    Header,
    Footer,
    Search
  }
}

</script>

<style>
</style>
