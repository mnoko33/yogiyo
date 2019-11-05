<template>
  <v-content class="search">
   <div class="input-group">
     <v-layout style="position: relative; top: 125px">
       <v-flex style="margin-right: 2%;">
         <v-icon v-if="isUser" @click="getLocation" class="gps-btn">mdi-crosshairs-gps</v-icon>
         <router-link v-else style="text-decoration: none" :to="{name: 'LoginPage'}"><v-icon  class="gps-btn">mdi-crosshairs-gps</v-icon></router-link>
       </v-flex>
       <v-flex style="width: 310px;">
         <input
            type="text"
            v-model="address"
            id="location-search"
            class="address-input"
            @keyup.enter="setAddress"
          />
         <button @click="clearAddress" class="clear-btn">지우기</button>
       </v-flex>
       <v-flex>
         <v-btn v-if="isUser" @click="setAddress" color="#ff9514" style="width: 60px; border-radius: 0 4px 4px 0;" height="40"><span style="color:#ffffff; font-weight: bold">검색</span></v-btn>
         <v-btn v-else color="#ff9514" style="width: 60px; border-radius: 0 4px 4px 0;" height="40"><router-link style="text-decoration: none" :to="{name: 'LoginPage'}"><span style="color:#ffffff; font-weight: bold">검색</span></router-link></v-btn>
       </v-flex>
     </v-layout>
   </div>
  </v-content>
</template>

<script>
  import api from '@/api'
  import Swal from 'sweetalert2'
  import { mapState } from 'vuex';
  export default {
    name: "Search",
    data: () => ({
      latitude: 0,
      longitude: 0,
      address: '',
      originAddress: '',
      isUser: false,
    }),
    mounted() {
      this.isUser = this.$store.state.currentUser;
      this.getUserInfo();
    },
    created() {
    },
    watch: {
      currentUser() {
        this.isUser = this.$store.state.currentUser;
        this.getUserInfo();
      },
    },
    computed: {
      ... mapState(['currentUser']),
    },
    methods: {
      async getUserInfo() {
        if (this.isUser) {
          await api.getUserInfo().then(res => {
            this.address = res.data.user.address;
            this.originAddress = res.data.user.address;
          })
        }
        else{ this.address='' }
      },
      getLocation: function() {
        if (!navigator.geolocation) {
          this.errorMsg = "Geolocation is not supported by your browser";
          console.warn(this.errorMsg);
          return;
        }
        var options = {
          timeout: 60000
        };
        navigator.geolocation.getCurrentPosition(this.success, this.error, options);
      },
      success: function(position) {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.setAddress(this.latitude, this.longitude);
      },
      error: function(err) {
        this.errorMsg = "Unable to retrieve your location";
        console.warn(`ERROR(${err.code}): ${err.message}`);
        console.warn(this.errorMsg);
      },
      async setAddress(lat, lng) {
        if (this.address !== this.originAddress) {
          lng = '';
          lat = '';
        }
        else {
          this.address = ''
        }
        const data = {
          "lng": lng, // 위도
          "lat": lat, // 경도
          "address": this.address,
        };
        await api.setAddress(data).then(async res => {
          if (!res.data.address&&!res.data.lng&&!res.data.lat) {
            Swal.fire(
              '',
              res.data.message,
              'error'
            )
          }
          this.address = res.data.address;
          localStorage.setItem('address', this.address);
        }).catch(e => {
          console.log(e);
        })
      },
      clearAddress() {
        this.address = ''
      },
    }
  }
</script>

<style scoped>
  .search {
    height: 235px;
    padding: 125px 100px 70px 100px;
    background-image: url("../assets/mainsearch.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .input-group {
    max-width: 420px;
    margin: 0 auto;
    position: relative;
    display: table;
    border-collapse: separate;
  }
  .address-input {
    border-radius: 4px 0 0 4px;
    margin-left: 4px;
    min-width: calc(100% - 110px);
    height: 40px;
    font-size: 14px;
    padding-left: 5px;
    background: #fff;
    width: 86%;
  }
  .address-input:focus{
    outline: none;
  }
  .clear-btn {
    width: 40px;
    text-indent: -9999px;
    position: absolute;
    right: 64px;
    background: #fff url('../assets/sprite-icon.png') no-repeat -120px -239px;
    background-size: 400px;
    height: 40px;
    font-size: 1.6rem;
  }
  .clear-btn:focus {
    outline: none;
  }
  .gps-btn {
    background: #fff;
    color:#e30000;
    background-size: 400px;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    border: none;
  }
  .gps-btn::before {
    color:#e30000;
  }
</style>