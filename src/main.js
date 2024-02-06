import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { createRouter, createWebHashHistory } from 'vue-router'

import TicketSwift from './components/TicketSwift.vue'
import LoginPage from './components/LoginPage.vue'

import usersApi from './api/users.service'

loadFonts()

const app = createApp(App)

app.config.globalProperties.apiService = {
  usersApi: usersApi
}

const routes = [
  { path: '/', name: 'TicketSwift', component: TicketSwift },
  { path: '/login', name: 'Login', component: LoginPage }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

router.beforeResolve(async (to) => {
  if (!(await usersApi.isUserAuthenticated()) && to.name !== 'Login') {
    return { name: 'Login' }
  }
})

app.use(router).use(vuetify).mount('#app')
