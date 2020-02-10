<template>
  <v-content>
    <v-container primary >

      <v-layout row justify-space-around>
        <v-col cols="4"> 
          <v-flex  xs12 md6 lg12 class="deep-orange" my-1 pa-5>hello </v-flex>
          <v-flex xs12 md6 lg4 class="pink lighten-3" my-1 pa-5>hello </v-flex>
        </v-col>
        
        <v-flex xs12 md6 lg4 class="teal lighten-2" pa-5>hello </v-flex>
      </v-layout>   
       
    </v-container>

  </v-content>
</template>
<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
    
  },
  data(){
    return {

    }
  }
}
</script>
