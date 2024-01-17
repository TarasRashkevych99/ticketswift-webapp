
<template>
    <v-card class="mx-auto" max-width="368">
        <v-card-item>
            <v-card-title>{{ weather }}</v-card-title>
        </v-card-item>

        <v-card-text class="py-0">
            <v-row align="center" no-gutters>
                <v-col class="text-h3" cols="8"> {{ temperature }} </v-col>

                <v-col cols="2" class="text-right">
                    <v-icon color="error" icon="mdi-weather-windy" size="88"></v-icon>
                </v-col>
            </v-row>
        </v-card-text>

        <div class="d-flex py-3 justify-space-between">
            <v-list-item density="compact" prepend-icon="mdi-weather-windy">
                <v-list-item-subtitle>123 km/h</v-list-item-subtitle>
            </v-list-item>

            <v-list-item density="compact" prepend-icon="mdi-weather-pouring">
                <v-list-item-subtitle>{{ precipitation }}</v-list-item-subtitle>
            </v-list-item>
        </div>

        <v-expand-transition>
            <div v-if="expand">
                <div class="py-2">
                    <v-slider v-model="time" :max="6" :step="1" :ticks="labels" class="mx-4" color="primary"
                        density="compact" hide-details show-ticks="always" thumb-size="10"></v-slider>
                </div>

                <v-list class="bg-transparent">
                    <v-list-item v-for="item in forecast" :key="item.day" :title="item.day" :append-icon="item.icon"
                        :subtitle="item.temp">
                    </v-list-item>
                </v-list>
            </div>
        </v-expand-transition>

        <v-divider></v-divider>

        <!-- <v-card-actions>
            <v-btn @click=getMeteo>
                {{ !expand ? ' Full Report' : 'Hide Report' }} </v-btn>
        </v-card-actions> -->
    </v-card>
</template>

<script>
import { getWeather } from '../forecast.service.js';
export default {
    name: 'Meteo',
    data: () => ({
        labels: {
            0: 'SU',
            1: 'MO',
            2: 'TU',
            3: 'WED',
            4: 'TH',
            5: 'FR',
            6: 'SA',
        },
        iconCode: {
            'Clear sky': ,
            1: 'Mainly clear',
            2: 'Partly cloudy',
            3: 'Overcast',
            45: 'Fog',
            51: 'Drizzle',
            56: 'Freezing Drizzle',
            61: 'Rain',
            66: 'Freezing Rain',
            71: 'Snow fall',
            77: 'Snow grains',
            80: 'Rain showers',
            95: 'Thunderstorm',
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
        this.getMeteo({ date: '2024-01-26', lat: 46.1228, lon: 12.2051 });
    },
    methods: {
        getMeteo: async function (params) {
            try {
                let res = await getWeather(params);
                console.log(res['max_temperature'] + "/" + res['min_temperature'] + "" + res.units.temperature);
                this.temperature = res['max_temperature'] + "/" + res['min_temperature'] + "" + res.units.temperature;
                this.precipitation = res.precipitation_probability + res.units.probability;
                this.weather = res.weather;

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