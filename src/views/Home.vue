<template>
    <v-container fluid>
          <v-tabs background-color="teal accent-4" class="elevation-2" grow dark>
            <v-tab>Sessions</v-tab>
              <v-tab-item>
                <v-row justify="center">
                  <v-col cols="12">
                      <SessionCard :sessions="sessions"/>
                  </v-col>
                </v-row>
              </v-tab-item>
            <v-tab>Trainers</v-tab>
              <v-tab-item>
                <p> Trainers will show here</p>
              </v-tab-item>
          </v-tabs>
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
    //this.$store.dispatch('getCurrentUser')
  }
}
</script>
