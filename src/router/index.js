import Vue from 'vue'
import VueRouter from 'vue-router'
import SimplexeHome from '../views/SimplexeHome.vue'
import ResultView from '../views/ResultView.vue';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'SimplexeHome',
    component: SimplexeHome
  },
  {
    path: '/result/:id',
    name: 'Result',
    component: ResultView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
