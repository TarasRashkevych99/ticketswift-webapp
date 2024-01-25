<!-- EventDetail.vue -->

<template>
    <div>
        <v-img :width="300" aspect-ratio="16/9" cover src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img>
        <h1>Dettagli dell'evento {{ $route.params.eventId }}</h1>

        <h3>Name: {{ this.event?.name }}</h3>
        <!-- <MeteoCard :message="event"></MeteoCard> -->
        <MeteoCard :message="'2024-01-26'"></MeteoCard>
        <!-- Altri dettagli dell'evento possono essere aggiunti qui -->
    </div>
</template>


<script>
import axios from 'axios'
import MeteoCard from './Meteo.vue'

export default {
    name: 'TicketSwift',
    data: () => ({
        res: null,
        event: null
    }),
    components: {
        MeteoCard
    },
    computed: {},
    async mounted() {
        this.load();
    },
    methods: {
        load: async function () {
            console.log("Loading... " + this.$route.params.eventId);
            this.event = await axios
                .get(`http://localhost:5000/api/events/${this.$route.params.eventId}`, {
                    withCredentials: true
                })
                .catch((err) => {
                    console.log(err)
                })
            this.event = this.event.data?.[0];
            console.log(this.event);
        }
    }
}
</script>