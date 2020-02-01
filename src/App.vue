<template>
  <v-app class="">
      <v-content class="mx-4 mb-4 grey lighten-4" >
       <navbar/>
        <router-view></router-view>


      </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'


export default {
  name: 'App',
  components: {
    Navbar,
    
  },
  data(){
    return {

    }
  },
};
</script>
