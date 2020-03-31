<template>
  <div class="about">
    <h1>This is an about page</h1>

    <p>{{interests}}</p>


    <div v-for="(category, index) in categories" :key="index">
      <p>{{category.name}}</p>
      <img :src="category.photoURL" alt="" class="headerImg">

    </div>


  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import {mapState} from 'vuex'
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
  
  data(){
    return {
      url:'',
      //file:null
 
    }
  },

  computed: mapState(['sessions','interests','categories']),
  methods:{

    logThings(){
      console.log(this.file)
      },
  },

  watch:{
  },
created(){
    
    


    }
  }





/*

function hasBooked(booked){
                    return booked.id === user.uid
                } 
this.isBooked = this.session.booked.some(hasBooked)



       function findSession(session){
                    return session.session_id === this.dummyData
                } 
          this.dummySession = this.sessions.some(findSession)



*/


</script>


<style  scoped>

.headerImg{
  width: 100%;
  
}

</style>
