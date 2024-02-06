<template>
  <v-container align="center" justify="center">
    <v-card class="rounded-lg">
      <div id="map-link"></div>
      <div id="status"></div>
      <v-btn type="submit" block class="mt-2" @click="geoFindMe()">Geo</v-btn>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'GeolocationPage',
  data: () => ({
    res: null
  }),
  computed: {},
  mounted() {},
  methods: {
    geoFindMe() {
      const status = document.querySelector('#status')
      const mapLink = document.querySelector('#map-link')

      mapLink.href = ''
      mapLink.textContent = ''

      function success(position) {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        status.textContent = ''
        mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`
        mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`
      }

      function error() {
        status.textContent = 'Unable to retrieve your location'
      }

      if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser'
      } else {
        status.textContent = 'Locating…'
        navigator.geolocation.getCurrentPosition(success, error)
      }
    }
  }
}
</script>

<style scoped></style>
