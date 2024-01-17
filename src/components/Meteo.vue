
<template>
    <v-card class="mx-auto" max-width="368">
        <v-card-item>
            <v-card-title>{{ weather }}</v-card-title>
        </v-card-item>

        <v-card-text class="py-0">
            <v-row align="center" no-gutters>
                <v-col class="text-h3" cols="8"> {{ temperature }} </v-col>

                <v-col cols="2" class="text-right">
                    <v-icon color="blue" :icon="iconCode[weather]" size="88"></v-icon>
                </v-col>
            </v-row>
        </v-card-text>

        <div class="d-flex py-3 justify-space-between">
            <!--<v-list-item density="compact" prepend-icon="mdi-weather-windy">
                <v-list-item-subtitle>123 km/h</v-list-item-subtitle>
            </v-list-item>-->

            <v-list-item density="compact" prepend-icon="mdi-weather-pouring">
                <v-list-item-subtitle>{{ precipitation }}</v-list-item-subtitle>
            </v-list-item>
        </div>

    </v-card>
</template>

<script>
import { getWeather } from '../forecast.service.js';
export default {
    name: 'Meteo',
    data: () => ({
        iconCode: {
            'Clear sky': 'mdi-weather-sunny',
            'Mainly clear': 'mdi-weather-sunny',
            'Partly cloudy': 'mdi-weather-cloudy',
            'Overcast' : 'mdi-weather-cloudy',
            'Fog': 'mdi-weather-fog',
            'Drizzle': 'mdi-weather-rainy',
            'Freezing Drizzle': 'mdi-weather-snowy-rainy',
            'Rain': 'mdi-weather-rainy',
            'Freezing Rain': 'mdi-weather-snowy-rainy',
            'Snow fall': 'mdi-weather-snowy-heavy',
            'Snow grains': 'mdi-weather-snowy-heavy',
            'Rain showers': 'mdi-weather-pouring',
            'Thunderstorm': 'mdi-weather-lightning',
        },
        expand: false,
        time: 0,
        temperature: '',
        precipitation: '',
        weather: '',
        imageList: [
            { id: 1, url: '../resources/images/meteo/thunderstorm.png' },
            //{ id: 2, url: 'image2.jpg' },
            // ... more images
        ],
    }),
    async mounted() {
        this.getMeteo({ date: '2024-01-19', lat: 46.1228, lon: 12.2051 });
    },
    methods: {
        getMeteo: async function (params) {
            try {
                let res = await getWeather(params);
                console.log(res['max_temperature'] + "/" + res['min_temperature'] + "" + res.units.temperature);
                this.temperature = res['max_temperature'] + "/" + res['min_temperature'] + "" + res.units.temperature;
                this.precipitation = res.precipitation_probability + res.units.probability;
                this.weather = res.weather;
                //console.log(this.iconCode[this.weather]);
                //console.log(res);
            }
            catch (err) {
                console.log(err)
            }
        },
        iconMap: function (value) {

        }
    }
}
</script>