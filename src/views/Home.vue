<template>
  <v-content>
    <v-container >
       <h1> HOME</h1>
       <v-text-field label="session inpug" v-model="sessionTitle"></v-text-field>
       <v-btn @click.prevent="saveTitle">get data</v-btn>
    </v-container>

  </v-content>
</template>
<script>
// @ is an alias to /src
//import firebase from 'firebase'
import db from '@/firebase/init'

export default {
  name: 'home',
  components: {
  },
  data(){
    return {
      sessionTitle:null

    }

  },
  methods:{
    logginIt(){
      console.log(this.sessionTitle)
    },
    logIt(){
      db.collection('sessions').get().then(res => {
        res.forEach(res => {
          console.log(res.data())
        })
      })
    },
    saveTitle(){
      db.collection('sessions').doc('l0cI3tvamDLOa1guqjfU').set({sessionTitle:this.sessionTitle})
    }
  }
}
</script>
