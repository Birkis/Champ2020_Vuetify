<template>
  <v-app class="grey lighten-4">
      <v-content>
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
  created(){
  }
 
};
</script>

<style>

</style>
