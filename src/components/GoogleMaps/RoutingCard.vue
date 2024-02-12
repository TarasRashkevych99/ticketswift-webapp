<template>
  <div id="map"></div>
</template>

<script>
export default {
  name: 'RoutingCard',
  props: ['lat', 'lon'],
  data: () => ({
    currentLat: null,
    currentLon: null
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
            lat: Number(sessionStorage.getItem('latitude')),
            lng: Number(sessionStorage.getItem('longitude'))
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
    }
  }
}
</script>

<style scoped>
#map {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 100px;
  padding-bottom: 10px;
}
</style>
