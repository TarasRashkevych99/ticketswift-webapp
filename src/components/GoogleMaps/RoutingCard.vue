<template>
  <v-card class="mx-auto" width="70%" height="35%" style="margin-top: 2rem; margin-bottom: 1rem">
    <div style="margin-bottom: 0.1rem">APRI SU <a :href="`${googleMapsURL}`"> GOOGLE MAPS </a></div>
    <div id="map"></div>
  </v-card>
</template>

<script>
export default {
  name: 'RoutingCard',
  props: ['lat', 'lon'],
  data: () => ({
    googleMapsURL: ''
  }),
  computed: {},
  async mounted() {
    console.log('Map: ' + this.lat + ' ' + this.lon + ' ')
    //Recupero posizione corrente
    this.initMap()
  },
  methods: {
    /* eslint-disable no-undef */
    initMap() {
      this.setUpUrl()
      const directionsService = new google.maps.DirectionsService()
      const directionsRenderer = new google.maps.DirectionsRenderer()
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: { lat: Number(this.lat), lng: Number(this.lon) }
      })

      directionsRenderer.setMap(map)
      this.calculateAndDisplayRoute(directionsService, directionsRenderer)
    },
    calculateAndDisplayRoute(directionsService, directionsRenderer) {
      directionsService
        .route({
          origin: {
            lat: 41.87,
            lng: -87.65
          },
          destination: {
            lat: Number(this.lat),
            lng: Number(this.lon)
          },
          travelMode: google.maps.TravelMode.DRIVING
        })
        .then((response) => {
          directionsRenderer.setDirections(response)
        })
        .catch((e) => window.alert('Directions request failed due to ' + e))
    },
    setUpUrl() {
      this.googleMapsURL =
        'https://www.google.com/maps/dir/?api=1&origin=' +
        sessionStorage.getItem('latitude') +
        ',' +
        sessionStorage.getItem('longitude') +
        '&destination=' +
        this.lat +
        ',' +
        this.lon +
        '&travelmode=driving'
    }
  }
}
</script>

<style scoped>
#map {
  height: 100%;
}
</style>
