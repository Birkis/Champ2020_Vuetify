<template>
    <v-container>
        <v-app-bar app flat>
                <v-icon medium @click.prevent="drawer=!drawer"> mdi-dots-vertical </v-icon>
                <router-link :to="{name:'home'}" class="link blue-grey--text text--darken-2">
                                    <v-toolbar-title class="display-1" ><span class="font-weight-light">CHAMP</span><span class="font-weight-bold" >2020</span></v-toolbar-title>
                </router-link>
                <v-spacer></v-spacer>
                <p>build: 0.6</p>
                <v-spacer></v-spacer>
                <v-toolbar-title> {{loggedInEmail}} </v-toolbar-title>
                <v-spacer></v-spacer>
                     
                <v-toolbar-title v-if="!loggedIn" class="mx-3"> <router-link :to="{ name: 'Login'}">Login</router-link> </v-toolbar-title>  
                <v-toolbar-title v-if="loggedIn" class="mx-3" @click.prevent="byeBye">Logout</v-toolbar-title>    

        </v-app-bar>    

        <v-navigation-drawer v-model="drawer" app class="deep-orange" >
                <v-list nav class="py-0">
                    <v-list-item v-for="link in links" :key="link.name" link :to="link.route" >
                        <v-list-item-icon>
                                <v-icon class="white--text">{{link.icon}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content> 
                                <v-list-item-title class="title white--text">{{link.name}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
                <v-list nav class="py-0" v-if="loggedIn" >
                    <v-list-item v-for="link in guardedLinks" :key="link.name" link :to="link.route" >
                        <v-list-item-icon>
                                <v-icon class="white--text">{{link.icon}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content> 
                                <v-list-item-title class="title white--text">{{link.name}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
        </v-navigation-drawer>    
       
    </v-container>
</template>


<script>
import firebase from 'firebase'

export default {
    data(){
        return{
            drawer:false,
            links:[
                {icon:'mdi-view-dashboard-outline', name:'Home', route:'/'},
                {icon:'mdi-format-list-text', name:'Sessions', route:'/sessionslist'},
                {icon:'mdi-account-search-outline', name:'View Profiles', route:'/viewprofiles'},          
            ],
            guardedLinks:[
                {icon:'mdi-account-edit-outline', name:'Edit Profile', route:'/editprofile'},
                {icon:'mdi-plus', name:'Create Session', route:'/createsession'},
            ],
            loggedIn:false,
            loggedInEmail:'',
        }
    },//end data
    methods:{
        byeBye(){
            // eslint-disable-next-line no-unused-vars
            firebase.auth().signOut().then(() =>{
                console.log('You were successfully logged out.')
                })
                .catch(err=> console.log(err))
            // this.$router.push({name: 'home'})
            this.$store.dispatch('resetCurrentUser')
        }
    },
    mounted(){
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.loggedIn=true;
                this.loggedInEmail = user.email

                //PRØVER Å SETTE VIA EN DISPATCH 
                let user_id = user.uid
                this.$store.dispatch('setCurrentUser', user_id)
            }else{
                this.loggedIn=false;
                this.loggedInEmail= '';
            }
        })
    },//end Mounted
    watch:{
        loggedIn(){
            console.log('User changed login status')
        }
    },// end watch
}
</script>

<style scoped>
.link{
    text-decoration: none;
}

</style>