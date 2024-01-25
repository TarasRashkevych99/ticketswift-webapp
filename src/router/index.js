import { createRouter, createWebHistory } from 'vue-router'
import EventDetails from '../components/EventDetails.vue'

const routes = [
    //{ path: '/', component: Home },
    {
        path: '/events/:eventId',
        name: 'event',
        component: EventDetails
    }
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory("/"),
    routes, // short for `routes: routes`
})

export default router

