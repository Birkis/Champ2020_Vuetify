<template>
  <div class="about">
    <h1>This is an about page</h1>

    <p>{{dummySession}}</p>
   


  </div>
</template>

<script>
import {mapState} from 'vuex'
import db from '@/firebase/init'

export default {
  
  data(){
    return {
      dummyData:'HKbPyBYjpDoJPIoMWaH6',
      dummySession: []
    }
  },

  computed: mapState(['sessions','interests']),

  watch:{
    dummySession(){
      console.log(this.dummySession[0].dob)
    }


  },
created(){


  let ref = db.collection('users')

  ref.onSnapshot( snap => {
    snap.forEach( res => console.log(res.data()))
  })


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

