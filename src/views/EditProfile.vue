<template>
    <v-container fluid>
        <v-form>
            <v-row align="center" justify="start" > <!-- Heading -->
                <v-col cols="1">
                    <UploadProfilePic v-on:updateUrl="updateUrl($event)"/>
                </v-col>
                <v-col cols="2">
                    <v-avatar class=""> <img :src="loggedInUser.profilePic" alt=""> </v-avatar>
                </v-col>
               
                <v-col cols="7">
                <v-text-field class="display-1" v-model="loggedInUser.name">Edit your profile here</v-text-field>
                </v-col>
            </v-row>
         <!-- All Form Inputs -->
            <v-row> <!-- Edit Email -->
                <v-col cols="12" sm="6" m4="4">
                    <v-text-field label="Email" type="email" v-model="loggedInUser.email"></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field label="Post code" type="number" v-model="loggedInUser.postcode"></v-text-field>
                </v-col>
            </v-row>
            <v-row align="center"> <!-- Edit Personals -->
               <v-col name="gender"> <!-- set gender -->
                   <v-autocomplete dense :items="genders" label="Set Gender" v-model="genderValue">
                   </v-autocomplete>
               </v-col>
                <v-col> <!-- Date of Birth -->
                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="290px">
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                    v-model="date"
                                    label="Set Birthday"
                                    readonly
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                            ref="picker"
                            v-model="date"
                            :max="new Date().toISOString().substr(0, 10)"
                            min="1950-01-01"
                            @change="save"
                            ></v-date-picker>
                        </v-menu>
                </v-col>
            </v-row>
            <v-row> <!-- select interests -->
                <v-col>
                    <v-autocomplete dense chips :items="interests" label="Set interests" v-model="interestValues" multiple outlined>
                    </v-autocomplete>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6" m4="4"><v-text-field type="text" v-model="loggedInUser.motto" placeholder="Never surrender, never say die" label="My motto"></v-text-field></v-col>
                <v-col cols="12" sm="6" m4="4"><v-text-field type="text" v-model="loggedInUser.goal" placeholder="Be happy, or die trying" label="My goal"></v-text-field></v-col>
            </v-row>
            <v-row> <!-- For Trainers -->
                <v-col>
                    <v-switch label="I'm a personal trainer"> </v-switch>
                </v-col>
            </v-row>
            <v-row justify="center">  <!-- Submit button -->
                <v-col cols="3"> 
                    <v-btn color="deep-orange" class="white--text" depressed @click.prevent="updateUser">Update Info</v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                     <img :src="url" alt="">
                </v-col>
            </v-row>
         </v-form>
        
    </v-container>  
</template>


<script>
/* eslint-disable no-unused-vars */

import firebase from 'firebase'
import db from '@/firebase/init'
import UploadProfilePic from '@/components/UploadProfilePic'

export default {
    name:'EditProfile',
    components:{
        UploadProfilePic
    },
    data(){
        return{
            profilePic:null,
            genderValue:null,
            interestValues:null,
            date:null,
            menu:false,
            loggedInUser:{},
            url:'',
           
        }
    },
    computed:{
        interests(){
            return this.$store.state.interests
        },
        genders(){
            return this.$store.state.genderTypes
        }

    },
    watch: {
      model (val) {
        if (val.length > 5) {
          this.$nextTick(() => this.model.pop())
        }
      },
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
    },
    methods: {
      save (date) {
        this.$refs.menu.save(date)
      },
      updateUser(){
          let user = firebase.auth().currentUser
          db.collection('users').doc(user.uid).update({
              dob: this.date,
              gender: this.genderValue,
              interests: this.interestValues,
              postcode: this.loggedInUser.postcode,
              motto: this.loggedInUser.motto,
              goal: this.loggedInUser.goal,
              name: this.loggedInUser.name
          })
      },
      updateUrl(newUrl){
          this.url = newUrl
          let user = firebase.auth().currentUser
          db.collection('users').doc(user.uid).update({
              profilePic: newUrl
          })
      }
    },
    created(){
        let thisUser = firebase.auth().currentUser
        db.collection('users').doc(thisUser.uid).get().then( res => {
             this.loggedInUser=res.data()
             this.date = res.data().dob
             this.genderValue = res.data().gender
             this.interestValues = res.data().interests
             this.loggedInUser.postcode = res.data().postcode
             this.loggedInUser.motto = res.data().motto
             this.loggedInUser.goal = res.data().goal
             
        })        
    }
}
</script>
<style scoped>
</style>


