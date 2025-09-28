import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Tasks from '../components/Tasks.vue'
import Units from '../components/Units.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: Tasks
  },
  {
    path: '/units',
    name: 'Units',
    component: Units
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
