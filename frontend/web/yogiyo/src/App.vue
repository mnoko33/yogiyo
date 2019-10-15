<template>
  <v-app id="app">
    <v-content>
      <Header></Header>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Header from './components/Header'

export default {
  name: 'app',
  components: {
    Header
  }
}
</script>

<style>

</style>
