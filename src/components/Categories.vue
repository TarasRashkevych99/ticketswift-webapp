<template>
  <v-container>
    <v-form>
      <v-container>
        <v-row>
          <v-item-group v-model="model" class="d-flex justify-sm-space-between px-6 pt-2 pb-6">
            <v-item v-for="n in 4" :key="n">
              <template #default="{ toggle }">
                <v-btn
                  :icon="iconMap[n]"
                  :active="model != null && model + 1 == n"
                  border
                  height="100"
                  variant="text"
                  width="100"
                  @click="toggle"
                ></v-btn>
              </template>
            </v-item>
          </v-item-group>
        </v-row>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'DateFilter',
  emits: ['update-genreFilter'],
  data: () => ({
    min: 0,
    max: 500,
    slider: 100,
    step: 1,
    address: '',
    filter: '',
    model: null,
    value: null,
    genreMap: {
      0: 'Sport',
      1: 'Music',
      2: 'Arts Theatre',
      3: 'Film'
    },
    iconMap: {
      1: 'mdi mdi-basketball',
      2: 'mdi mdi-music',
      3: 'mdi mdi-drama-masks',
      4: 'mdi mdi-video-vintage'
    }
  }),
  computed: {},
  watch: {
    model: function () {
      if (this.model != null) {
        console.log(this.model)
        console.log(this.genreMap[this.model])
        this.filter = '&genre=' + this.genreMap[this.model]
        this.$emit('update-genreFilter', this.filter)
      } else {
        console.log('Genre not selected')
        this.filter = ''
        this.$emit('update-genreFilter', this.filter)
      }
    }
  },
  methods: {
    // async getLatLng() {
    //     try {
    //         if (this.address) {
    //             const response = await axios.get(
    //                 'https://maps.googleapis.com/maps/api/geocode/json',
    //                 {
    //                     params: {
    //                         address: this.address,
    //                         key: 'AIzaSyASWk5XWwesQZJJE86OzqVglv3cUZUeJ4k'
    //                     }
    //                 }
    //             );
    //             const location = response.data.results[0].geometry.location;
    //             const latLng = `${location.lat},${location.lng}`;
    //             console.log('Latitudine e longitudine:', latLng);
    //             console.log(this.address + " range= " + this.slider);
    //             this.filter = "&lat=" + location.lat + "&lon=" + location.lng + "&radius=" + this.slider;
    //             console.log(this.filter)
    //             this.$emit('update-locationFilter', this.filter)
    //         } else {
    //             this.filter = '';
    //             this.$emit('update-locationFilter', this.filter)
    //         }
    //     } catch (error) {
    //         console.error('Location not found', error);
    //     }
    // }
  }
}
</script>

<style scoped></style>
