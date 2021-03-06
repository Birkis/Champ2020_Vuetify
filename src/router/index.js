/* eslint-disable no-unused-vars */
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
import Login from '@/components/Auth/Login'
import AddInterests from '@/views/AddInterests'
import EditSession from '@/views/EditSession'
import Chat from '@/views/Chat'
import db from '@/firebase/init'
import MyMessages from '@/views/MyMessages'
import Search from '@/views/Search'


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
    path:'/ProfileView/:id',
    name: 'ProfileView',
    component: ProfileView,
    //props:true
  },
  {
    path:'/SessionView/:id',
    name: 'SessionView',
    component: SessionView,
    props:true,
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
    path:'/login',
    name:'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/add-interests',
    name: 'AddInterests',
    component: AddInterests
  },
  {
    path: '/edit-session',
    name: 'EditSession',
    component: EditSession
  },
  {
    path:'/mymessages',
    name: 'MyMessages',
    component: MyMessages
  },
  {
    path: '/chat/:token',
    name: 'Chat',
    component: Chat,
    props: true,
    beforeEnter: (to, from, next) =>{
      console.log(to)
      next()
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
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
