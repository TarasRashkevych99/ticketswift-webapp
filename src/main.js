import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { createRouter, createWebHistory } from 'vue-router'

import TicketSwift from './components/TicketSwift.vue'
import LoginPage from './components/LoginPage.vue'
import SignupPage from './components/SignupPage.vue'

import usersApi from './api/users.service'
import authenticationApi from './api/auth.service'

loadFonts()

const app = createApp(App)

app.config.globalProperties.apiService = {
  usersApi: usersApi,
  authenticationApi: authenticationApi
}

const routes = [
  { path: '/', name: 'TicketSwift', component: TicketSwift },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/signup', name: 'Signup', component: SignupPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

router.beforeResolve(async (to) => {
  if (!(await usersApi.isUserAuthenticated()) && to.name !== 'Login' && to.name !== 'Signup') {
    if (to.name === 'Login') {
      return { name: 'Login' }
    } else {
      return { name: 'Signup' }
    }
  }
})

app.use(router).use(vuetify).mount('#app')
