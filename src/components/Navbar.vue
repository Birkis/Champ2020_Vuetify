<template>
    <v-container>
        <v-app-bar app flat>
                <v-icon medium @click.prevent="drawer=!drawer"> mdi-dots-vertical </v-icon>
                <router-link :to="{name:'home'}" class="link blue-grey--text text--darken-2">
                                    <v-toolbar-title class="display-1" ><span class="font-weight-light">CHAMP</span><span class="font-weight-bold" >2020</span></v-toolbar-title>
                </router-link>
                <v-spacer></v-spacer>
                <p class="overline" >Beta</p>
                <v-spacer></v-spacer>
                     
                <v-toolbar-title v-if="!loggedIn" class="mx-3"> <router-link :to="{ name: 'Login'}">Login</router-link> </v-toolbar-title>  
                <v-btn color="blue ligthen" text v-if="loggedIn" class="mx-3" @click.prevent="byeBye">Logout</v-btn>    

        </v-app-bar>    

        <v-navigation-drawer v-model="drawer" app class="deep-orange" >  
                <v-row justify="end" class="mt-7">
                    <v-col cols="8">
                        <v-avatar
                            size="100"
                            color="red"
                            class="mb-7"
                            >
                            <img :src="currentUser.profilePic" alt="alt">
                        </v-avatar>
                        <p class="title white--text">{{currentUser.name}}</p>
                    </v-col>
                </v-row>

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
                <v-divider inset></v-divider>
                
        </v-navigation-drawer>    
       
    </v-container>
</template>


<script>
import firebase from 'firebase'
import {mapState} from 'vuex'

export default {
    data(){
        return{
            drawer:false,
            links:[
                {icon:'mdi-view-dashboard-outline', name:'Home', route:'/'},          
            ],
            guardedLinks:[
                {icon:'mdi-account-edit-outline', name:'My Account', route:'/editprofile'},
                {icon:'mdi-plus', name:'Create Session', route:'/createsession'},
            ],
            loggedIn:false,
            loggedInEmail:'',
            user_id:''
            
        }
    },//end data
    computed:mapState(['currentUser']),
    methods:{
        byeBye(){
            // eslint-disable-next-line no-unused-vars
            firebase.auth().signOut().then(() =>{
                console.log('You were successfully logged out.')
                })
                .catch(err=> console.log(err))
            this.$store.dispatch('resetCurrentUser')
            this.$router.push({name: 'home'})
        }
    },
    mounted(){
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.loggedIn=true;
                this.loggedInEmail = user.email
                this.user_id = user.uid

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