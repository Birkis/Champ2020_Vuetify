
<template>
  <v-container>
    <h1 class="display-1">Create Your Session</h1>
    <v-autocomplete
        dense
        :items="currentUser.savedSessions"
        item-text="sessionTitle"
        return-object
        label="Use a Saved Session"
        v-model="savedSessions"
        class="my-7"
        >
    </v-autocomplete>
    <v-form mx-5 v-model="valid"> <!-- create the session -->
         <v-container>
            <v-row> <!--  Title -->
                <v-col> 
                    <v-text-field 
                    :rules=[rules.required]
                    label="Session Title" 
                    type="text" 
                    v-model="sessionTitle">
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row> <!--  Description -->
                <v-col>
                    <v-textarea 
                    :rules=[rules.required]
                    label="Description" 
                    type="text" 
                    v-model="sessionDescription" 
                    rows="2" 
                    auto-grow>
                    </v-textarea>
                </v-col>
            </v-row>
            <v-row> <!--  Activity -->
                <v-col>
                    <v-autocomplete 
                    dense
                    :rules=[rules.required] 
                    :items="categories" 
                    item-text="name" 
                    return-object 
                    label="Activity" 
                    v-model="activity">
                    </v-autocomplete>
                </v-col>
            </v-row>
            <v-row> <!-- People & Price -->
                <v-col>
                    <v-text-field 
                    :rules=[rules.required]
                    label="How many people" 
                    type="number"
                    min="1" 
                    v-model="attendees">
                    </v-text-field>
                </v-col>
                <v-col>
                    <v-text-field 
                    :rules=[rules.required,rules.maxPrice]
                    label="Price"
                    min="0" 
                    type="number" 
                    v-model="price" 
                    suffix="NOK">
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row> <!--  Start Time & Duration -->
                <v-col>
                    <v-text-field 
                    type="date" 
                    :min="currentDate" 
                    max="2021-01-01" 
                    label="Start date" 
                    :rules=[rules.required,dateCheck] 
                    v-model="sessionTime.startDate">
                    </v-text-field>
                </v-col>
                <v-col>
                    <v-text-field 
                    :rules=[rules.required]
                    type="time" 
                    label="Start time" 
                    v-model="sessionTime.startTime">
                    </v-text-field>
                </v-col>
                <v-col>
                    <v-text-field 
                    label="Duration" 
                    type="number" 
                    v-model="sessionTime.duration" 
                    suffix="Hours">
                    </v-text-field>
                </v-col>
        
            </v-row>
            <v-row> <!-- Location -->
                <v-col>
                    <gmap-autocomplete 
                    class="gPlaces" 
                    @place_changed="setPlace">
                    </gmap-autocomplete>
                </v-col>
            </v-row>
            <v-row> <!-- Tags -->
                <v-col>
                    <v-autocomplete  
                    chips 
                    :items="interests" 
                    label="Add tags" 
                    v-model="interestValues" 
                    multiple 
                    outlined>
                    </v-autocomplete>
                </v-col>
            </v-row>
        </v-container>
    <v-container> <!-- Create Session Button-->
        <v-row justify="center" >
            <v-col cols="4"  >
                <v-btn 
                    :disabled="!valid"
                    color="deep-orange" 
                    class="white--text"
                    @click.prevent="saveData" 
                    depressed>
                        Publish Session
                </v-btn>
            </v-col>
            <v-col cols="4">
                <v-btn 
                    color="teal" 
                    class="white--text" 
                    @click.prevent="savedSession" 
                    depressed>
                        Save Session
                </v-btn>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <p class="overline font-italic blue-grey--text mt-3 mx-7">
            **<span class="font-italic font-weight-bold">Save</span> a session to quickly create the same session again another time. 
            You can still <span class="font-italic font-weight-bold">publish</span> this session after saving it.
        </p>
    </v-container>
    </v-form>
  </v-container>
</template>


<script>
/* eslint-disable no-unused-vars */
import firebase from 'firebase'
import db from '@/firebase/init'
import {mapState} from 'vuex'
import moment from 'moment'


export default {
    name:'CreateSession',
    data(){
        return{
            valid:false,
            sessionTitle:null,
            sessionDescription:null,
            activity: null,
            sessionTime:{
                startDate:null,
                startTime:null,
                duration:null,
            },
            attendees:null,
            price:null,
            interestValues: null,
            selectedPlace: null,
            geoLocation: {
                lat:null,
                lng:null,
                placeName:null
            },
            hostName:null,
            host_id:null,
            hostPicture:null,
            sessionPhoto:null,
            currentDate:moment().format('YYYY-MM-DD'),
            rules:{
                required: value => !!value || 'Required.',
                maxPrice: value => value< 10000 || 'Max Price 10000',
                maxPeople: value => value<=100 || 'No more than 100 people',
            },
            savedSessions:{}
    }},//end data
    methods: {
        setPlace(place) {
            this.selectedPlace = place;
            this.geoLocation.lat = place.geometry.location.lat()
            this.geoLocation.lng = place.geometry.location.lng()
            this.geoLocation.placeName = place.name
        },
        dateCheck(){
            if(Date.parse(this.sessionTime.startDate)<Date.now()){
                console.log('failed validation')
                return false
            }else{
                console.log('Passed')
                return true
            }
        },
        saveData(){     
            let ID = Math.random().toString(16).substr(2,12)
            db.collection('sessions').doc(ID).set({
                sessionTitle:this.sessionTitle,
                sessionDescription:this.sessionDescription,
                activity:this.activity,
                sessionTime:{
                    startDate:this.sessionTime.startDate,
                    startTime:this.sessionTime.startTime,
                    duration:this.sessionTime.duration
                },
                attendees:this.attendees,
                booked:[],  
                price:this.price,
                interestValues:this.interestValues,
                geoLocation:{
                    lat:this.geoLocation.lat,
                    lng:this.geoLocation.lng,
                    placeName:this.geoLocation.placeName
                },
                host_id:this.currentUser.user_id,
                hostName:this.currentUser.name,
                hostPicture:this.currentUser.profilePic,
                timeStamp:Date.now(),
                session_id:ID
            }).catch(error => {
                console.log(error)
            })
            this.$router.push('/')
                
        },
        savedSession(){
            db.collection('users').doc(this.currentUser.user_id).update({
                savedSessions: firebase.firestore.FieldValue.arrayUnion({
                    sessionTitle:this.sessionTitle,
                    sessionDescription:this.sessionDescription,
                    activity:this.activity,
                    price:this.price,
                    attendees:this.attendees,
                    geoLocation:{
                        lat:this.geoLocation.lat,
                        lng:this.geoLocation.lng,
                        placeName:this.geoLocation.placeName
                    },
                })           
            }).catch(error => {
                console.log(error)
            }).then( ()=>{
                let payload = {
                        sessionTitle:this.sessionTitle,
                        sessionDescription:this.sessionDescription,
                        activity:this.activity,
                        price:this.price,
                        attendees:this.attendees,
                    }
                this.$store.dispatch('setSavedSession', payload)
                }         
            ) 
        },
    },
    watch:{
        savedSessions(x){
            this.sessionTitle = x.sessionTitle
            this.sessionDescription = x.sessionDescription
            this.attendees = x.attendees
            this.price = x.price
            this.activity = x.activity
        }
    },
    computed: mapState(['interests', 'categories','currentUser'])
   ,//end computed
    created(){
    }//end created    
}


</script>
<style scoped>

 .gPlaces{
     color:black;
     width: 100%;
     padding: 10px;
     border: 1px solid darkgrey;
     border-radius: 5px;
     font-weight: bold;
 }

</style>




