import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

import { createRouter, createWebHistory } from 'vue-router'

import TicketSwift from './components/TicketSwift.vue'
import LoginPage from './components/LoginPage.vue'
import SignupPage from './components/SignupPage.vue'
import EventDatails from './components/EventDetails.vue'
import GeolocationPage from './components/GeolocationPage.vue'

import usersApi from './api/users.service'
import authenticationApi from './api/auth.service'
import forecastApi from './api/forecast.service'
import couponsApi from './api/coupons.service'

loadFonts()

const app = createApp(App)

app.config.globalProperties.apiService = {
  usersApi: usersApi,
  authenticationApi: authenticationApi,
  forecastApi: forecastApi,
  couponsApi: couponsApi
}

const routes = [
  { path: '/', name: 'TicketSwift', component: TicketSwift },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/signup', name: 'Signup', component: SignupPage },
  { path: '/events/:eventId', name: 'eventDetails', component: EventDatails },
  { path: '/geolocation', name: 'Geolocation', component: GeolocationPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

router.beforeResolve(async (to) => {
  if (!(await usersApi.isUserAuthenticated()) && to.name !== 'Login' && to.name !== 'Signup') {
    if (to.name === 'Signup') {
      return { name: 'Signup' }
    } else {
      return { name: 'Login' }
    }
  }
})

app.use(router).use(vuetify).mount('#app')
