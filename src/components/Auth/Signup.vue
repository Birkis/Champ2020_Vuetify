<template>
    <v-container fluid>
       <v-container> <!-- Register with email -->
          <v-form>
            <v-row>
               <v-col>
                   <v-card class="mx-auto px-4"
                            max-width="500px">
                       
                       <v-row justify="center">
                           <v-card-title class="">CREATE A USER</v-card-title>
                       </v-row>
                       <v-row>
                           <v-col>
                               <v-text-field label="Your Full Name" type="text" v-model="name"></v-text-field>
                           </v-col>
                       </v-row>
                       <v-row>
                            <v-col>
                                <v-text-field label="Your Email" type="email" v-model="email"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field label="Your password" type="password" v-model="password"></v-text-field>
                            </v-col>
                       </v-row>
                       <v-row justify="center">
                           <v-col cols="4">
                               <v-btn class="my-4" @click.prevent="signUpEmail(email,password)" dark>Register</v-btn>
                           </v-col>
                       </v-row>
                   </v-card>
               </v-col>
            </v-row>
          </v-form>


       </v-container>
       
       
       
       <v-container> <!-- Facebook Login -->
            <v-row justify="center">
            <v-col cols="12">
                <h1 class="display-1 text-center">Please Sign Up for Champ2020</h1>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="4">
                <v-btn class="primary" @click.prevent="signUpFacebook" depressed>Sign Up With Facebook</v-btn>
            </v-col>
        </v-row>
       </v-container>
    </v-container>
</template>

<script>
/* eslint-disable no-unused-vars */

import firebase from 'firebase'
import slugify from 'slugify'
import db from '@/firebase/init'


export default {
    name:'Signup',
    data(){
        return{
            email:null,
            password:null,
            name:null,
            feedback:null,
            user_id:null,
            profilePic:'https://bit.ly/2WQW5KW',
        }
    },
    methods:{
        signUpEmail(email,password){
            
            firebase.auth().createUserWithEmailAndPassword(email,password).then( res => {
                db.collection('users').doc(res.user.uid).set({
                    name:this.name,
                    email:res.user.email,
                    user_id:res.user.uid,
                    profilePic:this.profilePic
                })
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage) 
            });
            this.$router.push({name:'home'})

        },
        signUpFacebook(){
                const provider = new firebase.auth.FacebookAuthProvider();
                firebase.auth().signInWithPopup(provider).then(result =>{
                    const token = result.credential.accessToken;
                    const user = result.user;
                    // this.user_id = result.user.uid;
                    // Get user Objects and set auth values on the user  fortsette på .then()
                    db.collection('users').doc(user.uid).set({
                        name:user.displayName,
                        email:user.email,
                        user_id:user.uid,
                        profilePic:user.photoURL
                        }).then(()=> {
                            this.$router.push({name:'home'})
                    })
                }).catch(error =>{
                    let errorCode = error.code;
                })
            }//end signup Facebook
        }
    }
</script>


<style>
h2 {
    font-size: 2em;
}

.signup {
    max-width: 500px;
    margin-top: 50px;
}

.orange-button {
    margin-top: 20px;
}


</style>