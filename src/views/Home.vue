<template>
    <v-container>
            <SessionCard :sessions="sessions"/>
    </v-container>
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

    }

  },
  computed:{
    sessions(){
      return this.$store.state.sessions
    }

  }, //ends computed
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
  } // ends methods
}
</script>
