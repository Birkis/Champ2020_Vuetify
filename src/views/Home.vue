<template>
    <v-container>
            <SessionCard :sessions="sessions"/>
    </v-container>
</template>
<script>
/* eslint-disable no-unused-vars */

// @ is an alias to /src
//import firebase from 'firebase'
import db from '@/firebase/init'

export default {
  name: 'home',
  components: {
  },
  data(){
    return {
   
    }
  },
  computed:{
    sessions(){
      return this.$store.state.sessions
    }
  }, //ends computed
  methods:{
  }, // ends methods
  mounted(){

  },//Ends Mounted
  created(){
    // dispatch en kommando til Store om å laste ned alle 
    this.$store.dispatch('getSessions')
  }
}
</script>
