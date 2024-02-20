<template>
  <v-card class="mx-auto" width="70%" height="35%" style="margin-top: 2rem; margin-bottom: 1rem">
    <div id="map"></div>
  </v-card>
</template>

<script>
export default {
  name: 'MapCard',
  props: ['lat', 'lon'],
  data: () => ({}),
  computed: {},
  async mounted() {
    console.log('Map: ' + this.lat + ' ' + this.lon + ' ' + this.width + ' ' + this.height)
    await this.initMap()
  },
  methods: {
    /* eslint-disable no-undef */
    async initMap() {
      const { Map } = await google.maps.importLibrary('maps')
      let map = new Map(document.getElementById('map'), {
        center: { lat: Number(this.lat), lng: Number(this.lon) },
        zoom: 17,
        mapTypeControl: true
      })
      // eslint-disable-next-line no-unused-vars
      const marker = new google.maps.Marker({
        map: map,
        position: { lat: Number(this.lat), lng: Number(this.lon) }
      })
    }
  }
}
</script>

<style scoped>
#map {
  height: 500px;
  width: 1000px;
  margin: auto;
}
</style>
