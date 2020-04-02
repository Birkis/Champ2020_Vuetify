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
  methods:{
  },
  created(){
    this.$store.dispatch('getSessions')
    this.$store.dispatch('getUsers')
    this.$store.dispatch('getCategories')
  }
 
};
</script>

<style>

</style>
