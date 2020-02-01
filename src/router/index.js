import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import CreateSession from '@/views/CreateSession'
import EditProfile from '@/views/EditProfile'
import SessionsList from '@/views/SessionsList'
import ViewProfiles from '@/views/ViewProfiles'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },{
    path:'/createsession',
    name:'CreateSession',
    component: CreateSession
  },{
    path:'/EditProfile',
    name: 'EditProfile',
    component: EditProfile

  },{
    path:'/sessionslist',
    name: 'SessionsList',
    component: SessionsList
  },{
    path:'/viewprofiles',
    name: 'ViewProfiles',
    component: ViewProfiles
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
