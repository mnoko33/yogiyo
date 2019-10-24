<template>
  <v-content class="search">
   <div class="input-group">
     <v-layout style="position: relative; top: 125px">
       <v-flex style="margin-right: 2%;">
         <v-icon @click="getLocation" class="gps-btn">mdi-crosshairs-gps</v-icon>
       </v-flex>
       <v-flex style="width: 310px;">
         <!--<v-text-field textarea clearable rows="2" outlined background-color="#ffffff" color="#ffffff" style="padding: 0 0"></v-text-field>-->
         <input
            type="text"
            v-model="address"
            id="location-search"
            class="address-input"
          />
         <button class="clear-btn">지우기</button>
       </v-flex>
       <v-flex>
         <v-btn color="#ff9514" style="width: 60px; border-radius: 0 4px 4px 0;" height="40"><span style="color:#ffffff; font-weight: bold">검색</span></v-btn>
       </v-flex>
     </v-layout>
   </div>
  </v-content>
</template>

<script>
  import api from '@/api'
  export default {
    name: "Search",
    data: () => ({
        latitude: 0,
        longitude: 0,
        address: '',
    }),
    mounted() {
      this.address = this.$store.state.address
    },
    methods: {
      getLocation: function() {
        if (!navigator.geolocation) {
          this.errorMsg = "Geolocation is not supported by your browser";
          console.warn(this.errorMsg);
          return;
        }
        // console.log('Getting current position..');
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
        const data = {
          "lng": lng, // 위도
          "lat": lat, // 경도
        };
        await api.setAddress(data).then(async res => {
          this.address = res.data.address;
          localStorage.setItem('address', this.address);
        }).catch(e => {
          console.log(e);
        })
      }
    }
  }
</script>

<style scoped>
.search {
  height: 235px;
  padding: 125px 100px 70px 100px;
  background-image: url("../assets/mainsearch.jpg");
  /*background-color: black;*/
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

</style>