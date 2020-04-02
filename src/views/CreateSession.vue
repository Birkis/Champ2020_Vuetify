
<template>
  <v-container>
    <h1 class="display-1" justify-start >Create Your Session</h1>
    <v-form mx-5> <!-- create the session -->
         <v-container>
            <v-row> <!--  Title -->
                <v-col> 
                    <v-text-field label="Session Title" type="text" v-model="sessionTitle"></v-text-field>
                </v-col>
            </v-row>
            <v-row> <!--  Description -->
                <v-col>
                    <v-textarea label="Description" type="text" v-model="sessionDescription" rows="2" auto-grow></v-textarea>
                </v-col>
            </v-row>
            <v-row> <!--  Activity -->
                <v-col>
                    <v-autocomplete dense :items="categories" item-text="name" return-object label="Activity" v-model="activity"></v-autocomplete>
                </v-col>
            </v-row>
            <v-row> <!--  Start Time & Duration -->
                <v-col>
                    <v-text-field type="date" label="Start date" placeholder="21/10" v-model="sessionTime.startDate"></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field type="time" label="Start time" placeholder="17:30" v-model="sessionTime.startTime"></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field label="Duration" type="number" v-model="sessionTime.duration" suffix="Hours"></v-text-field>
                </v-col>
        
            </v-row>
            <v-row> <!-- People & Price -->
                <v-col>
                    <v-text-field label="How many people" type="number" v-model="attendees"></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field label="Price" type="number" v-model="price" suffix="NOK"></v-text-field>
                </v-col>
            </v-row>
            <v-row> <!-- Location -->
                <v-col>
                    <gmap-autocomplete class="gPlaces" @place_changed="setPlace"></gmap-autocomplete>
                </v-col>
            </v-row>
            <v-row> <!-- Tags -->
                <v-col>
                    <v-autocomplete  chips :items="interests" label="Add tags" v-model="interestValues" multiple outlined>
                        </v-autocomplete>
                </v-col>
            </v-row>
        </v-container>
    <v-container> <!-- Create Session Button-->
        <v-row>
            <v-col>
                <v-btn color="deep-orange" class="white--text" @click.prevent="saveData" depressed>
                    Create Session
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
    </v-form>
  </v-container>
</template>


<script>
/* eslint-disable no-unused-vars */
import firebase from 'firebase'
import db from '@/firebase/init'
import {mapState} from 'vuex'

export default {
    name:'CreateSession',
    data(){
        return{
            sessionTitle:null,
            sessionDescription:null,
            activity: null,
            sessionTime:{
                startDate:null,
                startTime:null,
                duration:null
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
            hostId:null,
            hostPicture:null,
            sessionPhoto:null,
        }
    },
    methods: {
        setPlace(place) {
            this.selectedPlace = place;
            this.geoLocation.lat = place.geometry.location.lat()
            this.geoLocation.lng = place.geometry.location.lng()
            this.geoLocation.placeName = place.name
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
                hostId:this.hostId,
                hostName:this.hostName,
                hostPicture:this.hostPicture,
                timeStamp:Date.now(),
                session_id:ID
            }).catch(error => {
                console.log(error)
            })
            this.$router.push('/')
            
        },
    },
    watch:{
    },
    computed: mapState(['interests', 'categories'])
   ,//end computed
    created(){
        let ref = firebase.auth().currentUser
        this.hostId = ref.uid
        this.hostName = ref.displayName
        this.hostPicture = ref.photoURL

    }//end created    
}




//KOPI AV SAVEDATA() I TILFELLE 

// saveData(){
//     db.collection('sessions').doc().set({
//         sessionTitle:this.sessionTitle,
//         sessionDescription:this.sessionDescription,
//         activity:this.activity,
//         sessionTime:{
//             startDate:this.sessionTime.startDate,
//             startTime:this.sessionTime.startTime,
//             duration:this.sessionTime.duration
//         },
//         attendees:this.attendees,
//         booked:[],  
//         price:this.price,
//         interestValues:this.interestValues,
//         geoLocation:{
//             lat:this.geoLocation.lat,
//             lng:this.geoLocation.lng,
//             placeName:this.geoLocation.placeName
//         },
//         hostId:this.hostId,
//         hostName:this.hostName,
//         hostPicture:this.hostPicture,
//         timeStamp:Date.now()
//     }).catch(error => {
//         console.log(error)
//     })
//     this.$router.push('/')




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




