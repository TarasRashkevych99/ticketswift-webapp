<template>
  <v-card class="mx-auto" max-width="420" width="100%" height="100%">
    <v-card-item>
      <v-card-title>{{ weather }}</v-card-title>
    </v-card-item>

    <v-card-text class="py-0">
      <v-row align="center" no-gutters>
        <v-col class="temperature" cols="8"> {{ temperature }} </v-col>

        <v-col cols="2" class="text-right">
          <v-icon :color="iconColor[weather]" :icon="iconCode[weather]" size="88"></v-icon>
        </v-col>
      </v-row>
    </v-card-text>

    <div class="d-flex py-3 justify-space-between">
      <v-list-item v-if="wind !== ''" density="compact" prepend-icon="mdi-weather-windy">
        <v-list-item-subtitle>{{ wind }} km/h</v-list-item-subtitle>
      </v-list-item>

      <v-list-item v-if="precipitation !== ''" density="compact" prepend-icon="mdi-weather-pouring">
        <v-list-item-subtitle>{{ precipitation }}%</v-list-item-subtitle>
      </v-list-item>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'MeteoPage',
  props: ['message', 'lat', 'lon'],
  data: () => ({
    iconCode: {
      'Clear sky': 'mdi-weather-sunny',
      'Mainly clear': 'mdi-weather-sunny',
      'Partly cloudy': 'mdi-weather-cloudy',
      Overcast: 'mdi-weather-cloudy',
      Fog: 'mdi-weather-fog',
      Drizzle: 'mdi-weather-rainy',
      'Freezing Drizzle': 'mdi-weather-snowy-rainy',
      Rain: 'mdi-weather-rainy',
      'Freezing Rain': 'mdi-weather-snowy-rainy',
      'Snow fall': 'mdi-weather-snowy-heavy',
      'Snow grains': 'mdi-weather-snowy-heavy',
      'Rain showers': 'mdi-weather-pouring',
      Thunderstorm: 'mdi-weather-lightning'
    },
    iconColor: {
      'Clear sky': 'yellow',
      'Mainly clear': 'yellow',
      'Partly cloudy': 'grey',
      Overcast: 'grey',
      Fog: 'grey',
      Drizzle: 'blue',
      'Freezing Drizzle': '#B7E9F7',
      Rain: 'blue',
      'Freezing Rain': '#B7E9F7',
      'Snow fall': '#B7E9F7',
      'Snow grains': '#B7E9F7',
      'Rain showers': 'blue',
      Thunderstorm: 'grey'
    },
    expand: false,
    time: 0,
    temperature: '',
    precipitation: '',
    weather: '',
    wind: ''
  }),
  async mounted() {
    console.log('Meteo: ' + this.lat + ' ' + this.lon + ' ' + this.message)
    this.getMeteo({ date: this.message, lat: this.lat, lon: this.lon })
  },
  methods: {
    getMeteo: async function (params) {
      try {
        let res = await this.apiService.forecastApi.getWeather(params)
        console.log(params)
        console.log(
          res['max_temperature'] + '/' + res['min_temperature'] + '' + res.units.temperature
        )
        if (res['min_temperature'] && res['max_temperature'] && res.weather) {
          this.temperature =
            res['min_temperature'] + '/' + res['max_temperature'] + '' + res.units.temperature
          this.weather = res.weather
          this.wind = res.wind_speed ?? ''
          this.precipitation = res.precipitation_probability ?? ''
          console.log(this.precipitation)
        } else {
          this.temperature = 'Not Available'
          this.weather = ''
        }
      } catch (err) {
        console.log(err)
        this.temperature = 'Not Available'
        this.weather = ''
        this.precipitation = ''
        this.wind = ''
      }
    }
  }
}
</script>

<style>
.temperature {
  font-size: 2.7rem;
}
</style>
