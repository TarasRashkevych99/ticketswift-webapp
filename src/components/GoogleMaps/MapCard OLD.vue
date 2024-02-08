<template>
  <v-card class="mx-auto" width="30%" height="20%">
    <div id="map">{{ width }}</div>
  </v-card>
</template>

<script>
import { Loader } from 'google-maps'
const loader = new Loader('AIzaSyASWk5XWwesQZJJE86OzqVglv3cUZUeJ4k')

export default {
  name: 'MapCard',
  props: ['lat', 'lon'],
  data: () => ({}),
  computed: {},
  async mounted() {
    console.log('Map: ' + this.lat + ' ' + this.lon + ' ' + this.width + ' ' + this.height)
    const google = await loader.load()
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: Number(this.lat), lng: Number(this.lon) },
      zoom: 17,
      mapTypeControl: true
    })
    // eslint-disable-next-line no-unused-vars
    const marker = new google.maps.Marker({
      map: map,
      position: { lat: Number(this.lat), lng: Number(this.lon) }
    })
  },
  methods: {}
}
</script>

<style scoped>
#map {
  height: 100%;
}
</style>
