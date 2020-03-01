<template>
  <v-container fluid>
      <v-row> <!-- headerbilde -->
          <v-col>
              <v-img class="align-end white--text" src="https://bit.ly/32DEtTK" height="300" gradient="to bottom, rgba(100,115,201,.33), rgba(25,32,72,.99)">
                <v-row align="center">
                    <v-avatar>
                  <img src="https://bit.ly/2x0hRkF" alt="profile picture">
              </v-avatar>
                    <h1 class="display-1">Michael Birkeland</h1>
                    <v-spacer></v-spacer>
                    <v-rating v-model="rating" dense></v-rating>
                    <v-icon color="teal">mdi-checkbox-marked-circle-outline</v-icon>
                </v-row>
              </v-img>
          </v-col>
      </v-row>
      <v-row> <!-- under bildet -->
         <v-col>
             <v-tabs background-color="teal accent-4" class="elevation-2" grow dark>
                 <v-tab>Profile</v-tab>
                    <v-tab-item>
                       <ProfileContent/>
                    </v-tab-item>
                 <v-tab>Sessions</v-tab>
                 <v-tab-item>
                    <SessionCard :sessions="sessions"/>
                 </v-tab-item>
                 <v-tab>Testimonials</v-tab>
                 <v-tab-item>
                     <p> Some more text</p>
                 </v-tab-item>
             </v-tabs>
         </v-col>
      </v-row>
  </v-container>
</template>

<script>
export default {
    name:'ProfileView',
    data(){
        return {
            rating:3,

        }
    },//end data
    computed:{
        sessions(){
        return this.$store.state.sessions
        },
    },//end computed
    components:{

    },//end components
    methods:{

    },//end methods
    created(){

    },//end created
}
</script>

<style>

</style>



