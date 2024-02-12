<template>
  <v-container>
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" sm="5">
            <v-text-field
              v-model="address"
              label="Location"
              append-inner-icon="mdi-map-marker"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="1">
            <v-btn
              :disabled="!isMyCurrentLocationAvailable"
              :loading="isInitialLoading"
              block
              class="mt-2"
              @click="useMyCurrentLocation()"
              >My Location</v-btn
            >
          </v-col>
          <v-col cols="12" sm="4">
            <v-slider
              v-model="slider"
              class="align-center"
              :max="max"
              :min="min"
              :step="25"
              hide-details
            >
              <template #append>
                <v-text-field
                  v-model="slider"
                  :max="max"
                  hide-details
                  single-line
                  variant="outlined"
                  density="compact"
                  type="number"
                  style="width: 80px"
                ></v-text-field>
              </template>
            </v-slider>
          </v-col>
          <v-col cols="12" sm="2">
            <v-btn color="success" @click="getLatLng"> Filter </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'DateFilter',
  emits: ['update-locationFilter'],
  data: () => ({
    min: 0,
    max: 500,
    slider: 100,
    step: 1,
    address: '',
    filter: '',
    isMyCurrentLocationAvailable: false,
    isInitialLoading: true,
    handlerId: null
  }),
  mounted() {
    this.setMyCurrentLocationListener()
  },
  methods: {
    async getLatLng() {
      try {
        if (this.address) {
          const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
              address: this.address,
              key: 'AIzaSyASWk5XWwesQZJJE86OzqVglv3cUZUeJ4k'
            }
          })
          const location = response.data.results[0].geometry.location
          const latLng = `${location.lat},${location.lng}`

          console.log('Latitudine e longitudine:', latLng)
          console.log(this.address + ' range= ' + this.slider)

          this.filter = '&lat=' + location.lat + '&lon=' + location.lng + '&radius=' + this.slider
          console.log(this.filter)
          this.$emit('update-locationFilter', this.filter)
        } else {
          this.filter = ''
          this.$emit('update-locationFilter', this.filter)
        }
      } catch (error) {
        console.error('Location not found', error)
      }
    },
    useMyCurrentLocation() {
      const latitude = sessionStorage.getItem('latitude')
      const longitude = sessionStorage.getItem('longitude')

      this.filter = '&lat=' + latitude + '&lon=' + longitude + '&radius=' + this.slider
      console.log(this.filter)
      this.$emit('update-locationFilter', this.filter)
    },
    setMyCurrentLocationListener() {
      this.handlerId = window.setInterval(() => {
        if (sessionStorage.getItem('latitude') && sessionStorage.getItem('longitude')) {
          this.isMyCurrentLocationAvailable = true
          this.isInitialLoading = false
          clearInterval(this.handlerId)
        }
        if (sessionStorage.getItem('positionNotAvailable')) {
          this.isMyCurrentLocationAvailable = false
          this.isInitialLoading = false
          clearInterval(this.handlerId)
        }
      }, 300)
    }
  }
}
</script>

<style scoped></style>
