import Vue from 'vue'
import VueRouter from 'vue-router'
import Movies from '../components/Movies.vue'

Vue.use(VueRouter)
//Routes to components
const routes = [
  {
    path: '/',
    name: 'Movies',
    component: Movies
  },
  {
    path: '/movie/:id',
    name: 'InfoMovie',
    props: true,
    component: InfoMovie
  },
]

const router = new VueRouter({
  routes
})

export default router
