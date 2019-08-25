import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome }
      ]
    },
    { path: '/login', name: 'login', component: Login }
  ]
})

export default router
