<template>
    <v-container>
        <v-row>
            <h1 class="display-1">Please Sign Up for Champ2020</h1>
        </v-row>
        <v-row >
            <v-col justify="center" cols="12">
                <v-btn class="primary" @click.prevent="signUpFacebook" depressed>Sign Up With Facebook</v-btn>
            </v-col>
        </v-row>
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
            profilePic:'http://someurl.com/picture.jpg'
        }
    },
    methods:{
        signUpFacebook(){
                const provider = new firebase.auth.FacebookAuthProvider();
                firebase.auth().signInWithPopup(provider).then(result =>{
                    const token = result.credential.accessToken;
                    const user = result.user;
                    // this.user_id = result.user.uid;
                    // Get user Objects and set auth values on the user  fortsette på .then()
                    db.collection('users').doc(result.user.uid).set({
                        name:result.user.displayName,
                        email:result.user.email,
                        user_id:result.user.uid,
                        profilePic:result.user.photoURL
                    }).then(()=> {
                        this.$router.push({name:'home'})
                    })
                }).catch(error =>{
                    let errorCode = error.code;
                })
            }
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