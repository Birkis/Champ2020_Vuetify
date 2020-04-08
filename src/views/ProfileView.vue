<template>
  <v-container fluid>
      <v-row> <!-- headerbilde -->
          <v-col>
              <v-img class="align-end white--text" src="https://bit.ly/32DEtTK" height="300" gradient="to bottom, rgba(100,115,201,.33), rgba(25,32,72,.99)">
                <v-row align="center">
                    <v-col cols="1" class="mx-5"> <!-- AVATAR   -->
                        <v-avatar>
                            <img :src="user.profilePic" alt="profile picture">
                        </v-avatar>
                    </v-col>
                    <v-col cols="6">
                        <h1 class="display-1">{{user.name}}</h1>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="4">
                        <v-rating v-model="user.hostRating" dense></v-rating>
                        <v-icon color="teal">mdi-checkbox-marked-circle-outline</v-icon>
                    </v-col>
                </v-row>
              </v-img>
          </v-col>
      </v-row>
      <v-row> <!-- under bildet -->
         <v-col>
             <v-tabs background-color="teal accent-4" class="elevation-2" grow dark>
                 <v-tab>Profile</v-tab>
                    <v-tab-item>
                       <ProfileContent :user="user"/>
                    </v-tab-item>
                 <v-tab>Sessions</v-tab>
                 <v-tab-item>
                    <SessionCard :sessions="mySessions"/>
                 </v-tab-item>
                 <v-tab disabled>Testimonials</v-tab>
                 <v-tab-item>
                     <p> Some more text</p>
                 </v-tab-item>
             </v-tabs>
         </v-col>
      </v-row>
  </v-container>
</template>

<script>
import db from '@/firebase/init'

export default {
    name:'ProfileView',
    props:[],
    data(){
        return {
            id:this.$route.params.id,
            user:{}

        }
    },//end data
    computed:{
        sessions(){
        return this.$store.state.sessions
        },
        mySessions(){
            let mySessions = this.$store.state.sessions.filter( session => {
                return session.host_id == this.user.user_id
                }) 
            return mySessions
        }
    },//end computed
    components:{

    },//end components
    methods:{

    },//end methods
    created(){
        db.collection('users').doc(this.id).get().then( res =>{
            this.user = res.data()
        })
    },//end created
    mounted(){
        
    },
}
</script>

<style>

</style>



