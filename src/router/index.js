import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import CreateSession from '@/views/CreateSession'
import EditProfile from '@/views/EditProfile'
import SessionsList from '@/views/SessionsList'
import ProfilesList from '@/views/ProfilesList'
import SessionView from '@/views/SessionView'
import Signup from '@/components/Auth/Signup'
import ProfileView from '@/views/ProfileView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path:'/createsession',
    name:'CreateSession',
    component: CreateSession
  },
  {
    path:'/EditProfile',
    name: 'EditProfile',
    component: EditProfile
  },
  {
    path:'/ProfileView',
    name: 'ProfileView',
    component: ProfileView
  },
  {
    path:'/sessionslist',
    name: 'SessionsList',
    component: SessionsList
  },
  {
    path:'/ProfilesList',
    name: 'ProfilesList',
    component: ProfilesList
  },
  {
    path: '/sessionview',
    name: 'SessionView',
    component: SessionView
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
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
