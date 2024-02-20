<template>
  <div>
    <p style="text-align: center; margin-bottom: 1rem; font-weight: 600">
      APRI SU <a :href="`${googleMapsURL}`"> GOOGLE MAPS </a>
    </p>
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  name: 'RoutingCard',
  props: ['lat', 'lon'],
  data: () => ({
    currentLat: null,
    currentLon: null,
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
      this.setUpUrl()
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
  height: 500px;
  width: 1000px;
  margin: auto;
  /* position: relative;
  left: 0;
  right: 0;
  top: 0;
  bottom: 1000px;
  padding-bottom: 10px; */
}
/* #map {
  height: 100%;
} */
</style>
