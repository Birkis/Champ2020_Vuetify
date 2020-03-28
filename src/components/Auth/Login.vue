<template>
  <v-container fluid>
    <v-row justify="center"> <!-- login with email -->
        <v-col cols="8">    
                <v-card class="pa-3"> 
                    <v-card-title primary-title>
                        Login With Email
                    </v-card-title>
                    <v-text-field
                        name="email"
                        label="email"
                        id="email"
                        type="email"
                        v-model="email"
                    ></v-text-field>
                    <v-text-field
                        name="password"
                        label="password"
                        id="password"
                        type="password"
                        v-model="password"
                    ></v-text-field>
                    <v-card-actions> 
                        <v-btn  outlined large color="primary" @click.prevent="loginEmail(email,password)">Log in</v-btn>
                    </v-card-actions>
                </v-card>
        </v-col>
    </v-row>
    <v-spacer></v-spacer>
    <v-row justify="center"> <!-- or -->
        <v-col cols="2">
               <h1 class="display-1">or</h1>
        </v-col>
    </v-row>
    <v-spacer></v-spacer>
    <v-row justify="center"> <!-- Facebook -->
        <v-col cols="8">
            <v-card class="pa-3">
                <v-card-actions>
                 <v-btn depressed  color="primary" @click.prevent="signUpFacebook">Login with Facebook</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
    <v-row justify="center"> <!-- register new account -->
        <v-col cols="4">
            <router-link to="/signup"><p>register a new account</p></router-link>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from 'firebase'
//import db from '@/firebase/init'

export default {
    name:'Login',
    data(){
        return{
            email:'',
            password:'',
            dialog:false,

        }
    }, //end data
    created(){

    },//end created
    mounted(){

    },//end mounted
    methods:{
        loginEmail(email,password){
            firebase.auth().signInWithEmailAndPassword(email,password).then( res => {
                console.log(res)
                this.email = ''
                this.password = ''
                this.$router.push({name:'home'})
            })
        }, //end signup Email
        signUpFacebook(){
                const provider = new firebase.auth.FacebookAuthProvider();
                firebase.auth().signInWithPopup(provider).catch(error =>{
                    console.log(error.code)
                })
                this.$router.push({name:'home'})
            }
    },//end methods
    computed:{

    },//end computed

}
</script>

<style>

</style>