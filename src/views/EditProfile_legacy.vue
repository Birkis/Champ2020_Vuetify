<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <v-alert v-model="alert" type="success" dense dismissible>
                        <p >{{message}}</p>   
                </v-alert>
            </v-col>
        </v-row>
        <v-form>
            <v-row align="center" justify="start" > <!-- Heading -->
                <v-col cols="2">
                    <UploadProfilePic class="addnewimage" v-on:updateUrl="updateUrl($event)"/>
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
                   <v-autocomplete dense :items="genderTypes" label="Set Gender" v-model="genderValue">
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
            <v-row> <!-- Bio -->
                <v-col>
                    <v-textarea
                        name="bio"
                        v-model="bio"
                        label="Bio"
                        id="bio"
                        auto-grow
                        filled
                        rows="1"
                        placeholder="In my younger and more vulnerable years my father gave me some advice that I’ve been turning over in my mind ever since."
                    ></v-textarea>
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
            <v-row> <!-- Toggle For Trainers -->
                <v-col>
                    <v-switch 
                        v-model="isTrainer" 
                        inset 
                        label="I'm a personal trainer"> 
                    </v-switch>
                </v-col>
            </v-row>
            <v-row> <!-- Tabs for Education, Experience and Reviews -->
                <v-tabs v-if="isTrainer" background-color="teal accent-4" class="elevation-2" grow dark>
                    <v-tab>Education</v-tab>
                        <v-tab-item>
                            <v-expansion-panels v-if="education">
                                <v-expansion-panel expand focusable v-for="(item, index) in education" :key="index">
                                    <v-row align="center" no-gutters >
                                        <v-col cols="1" class="mx-auto" >
                                            <v-icon class="ml-3 red--text" @click.prevent="delEduItem(index)" >mdi-close-circle-outline</v-icon>
                                        </v-col>
                                        <v-col cols="10">
                                            <v-expansion-panel-header class="display-1 pl-0">
                                                {{item.school}}  
                                            </v-expansion-panel-header>
                                        </v-col>
                                    </v-row>    
                                    <v-expansion-panel-content class="ml-6">
                    
                                        <h2 class="subtitle-1 font-weight-bold"><span class="font-weight-light">Degree in:</span> {{item.degree}}</h2>
                                        <h2 class="subtitle-1 font-weight-bold"><span class="font-weight-light">Graduated: </span>{{item.completed}}</h2>                                 
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-expansion-panels>
                            <AddEducation v-on:addEducation="addEducation($event)"/>
                        </v-tab-item>
                    <v-tab>Experience</v-tab>
                        <v-tab-item>
                            <p>Some item</p>
                        </v-tab-item>
                    <v-tab>Reviews</v-tab>
                        <v-tab-item>
                            <p>Some item</p>
                        </v-tab-item>
                </v-tabs>
            </v-row>
            <v-row justify="center">  <!-- Submit button -->
                <v-col cols="3"> 
                    <v-btn color="deep-orange" class="white--text" depressed @click.prevent="updateUser">Update Info</v-btn>
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
import AddEducation from '@/components/AddEducation'
import {mapState} from 'vuex'

export default {
    name:'EditProfile',
    components:{
        UploadProfilePic,
        AddEducation
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
            message:'',
            alert:false,
            isTrainer:false,
            education:[],
            bio:''

        }
    },
    computed: mapState(['interests','genderTypes']),
    watch: {
      model (val) {
        if (val.length > 5) {
          this.$nextTick(() => this.model.pop())
        }
      },
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
      message(x){
          console.log('this is what message sees' + x)
      }
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
              name: this.loggedInUser.name,
              isTrainer: this.isTrainer,
              education: this.education,
              bio: this.bio
          }).then(() => {
              this.$store.dispatch('setCurrentUser', user.uid)
              this.message='Profile has been updated'
              this.alert = true
          })
      },
      updateUrl(newUrl){
          let user = firebase.auth().currentUser
          db.collection('users').doc(user.uid).update({
              profilePic: newUrl
          })
      },
      addEducation(eduItem){
        if(this.education === undefined){
            this.education=[]
            this.education.push(eduItem)
        } else {
            this.education.push(eduItem)
        }  
      },
      delEduItem(index){

          this.education.splice(index,1)
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
             this.isTrainer = res.data().isTrainer,
             this.education = res.data().education,
             this.bio = res.data().bio
             
        })        
    }
}
</script>
<style scoped>

.addnewimage{
    position: absolute;
    top:65px;
    left: 35px;
    z-index: 3;
}
</style>


