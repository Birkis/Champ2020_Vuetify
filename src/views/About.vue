<template>
  <div class="about">
    <h1>This is an about page</h1>

    <input type="file" @change="onFileSelected">
    <img :src="url" alt="">

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
      file:null
 
    }
  },

  computed: mapState(['sessions','interests']),
  methods:{

    logThings(){
      console.log(this.file)
      },
    onFileSelected(event){
      const file = event.target.files[0]
      const storageRef = firebase.storage().ref();
      const task = storageRef.child(file.name).put(file).then( snapshot=>{
          snapshot.ref.getDownloadURL().then(res =>{
            this.url = res
          })
      })
      
      
      
      //this.url = task.snapshot.ref.getDownloadURL()

      
    }
  },

  watch:{
    url(x){
      console.log(x)
    }
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

