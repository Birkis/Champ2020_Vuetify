<template>
    <v-container fluid>
          <v-tabs background-color="teal accent-4" class="elevation-2" grow dark>
            <v-tab>Sessions</v-tab>
              <v-tab-item>
                <v-row justify="center">
                  <v-col cols="12">
                      <SessionCard :sessions="notExpiredSession" :currentUser="loggedInUser"/>
                  </v-col>
                </v-row>
              </v-tab-item>
            <v-tab>Trainers</v-tab>
              <v-tab-item>
                <ProfileCard :users="users"/>
              </v-tab-item>
          </v-tabs>
    </v-container>
</template>
<script>
/* eslint-disable no-unused-vars */

// @ is an alias to /src
import firebase from 'firebase'
import {mapState} from 'vuex'

export default {
  name: 'home',
  components: {
  },
  data(){
    return {
      loggedInUser:null
   
    }
  },
  computed:{
    notExpiredSession(){
      console.log(this.$store.getters.notExpired)
      return this.$store.getters.notExpired
    },
    ...mapState(['sessions', 'users','currentUser'])}, //ends computed
  
  methods:{
  }, // ends methods
  mounted(){
  },//Ends Mounted
  created(){
   

    //RESERVELØSNING DERSOM STATE FORTSETTER OG PRØVER Å KNULLE MEG I TOERN
   let loggedIn = firebase.auth().currentUser
    if (loggedIn){
      this.loggedInUser = loggedIn
    } 
  }
}
</script>
