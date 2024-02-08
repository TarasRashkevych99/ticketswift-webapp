<template>
  <v-card class="mx-auto" width="30%" height="20%">
    <div id="map">{{ width }}</div>
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
    this.initMap()
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
  height: 100%;
}
</style>
