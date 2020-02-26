/* eslint-disable no-unused-vars */
<template>
  <v-content>
    <h1 class="display-1" justify-start >Create Session Here</h1>
    <v-form> <!-- create the session -->
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
                    <v-autocomplete dense :items="activities" label="Activity" v-model="activity"></v-autocomplete>
                </v-col>
            </v-row>
            <v-row> <!--  Start Time & Duration -->
                <v-col>
                    <v-text-field label="Start date" placeholder="21/10" v-model="sessionTime.startDate"></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field label="Start time" placeholder="17:30" v-model="sessionTime.startTime"></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field label="Duration" type="number" v-model="sessionTime.duration"></v-text-field>
                </v-col>
        
            </v-row>
            <v-row> <!-- People & Price -->
                <v-col>
                    <v-text-field label="How many people" type="number" v-model="attendees"></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field label="Price" type="number" v-model="price"></v-text-field>
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
                <v-btn color="deep-orange" class="white--text" @click.prevent="logValues" depressed>
                    Create Session
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
    </v-form>
  </v-content>
</template>


<script>
// eslint-disable-next-line no-unused-vars
import firebase from 'firebase'
import db from '@/firebase/init'

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
            }
        }
    },
    methods: {
        setPlace(place) {
            this.selectedPlace = place;
            this.geoLocation.lat = place.geometry.location.lat()
            this.geoLocation.lng = place.geometry.location.lng()
            this.geoLocation.placeName = place.name
        },
        logValues(){
            console.log(`the session name is ${this.sessionTitle} described ${this.sessionDescription}. 
            We will do some ${this.activity}. The session will be held in ${this.geoLocation.placeName}.
            It has ${this.attendees} number of people` )
        },
        saveData(){
            db.collection('sessions').doc().set({
                sessionTitle:this.sessionTitle
            })
        }
    },
    computed: {
        interests(){
            return this.$store.state.interests
        },
        activities(){
            const activities = []
            this.$store.state.activityList.forEach(res =>{
                activities.push(res.activity)
            })
            return activities
        }
    }    
}

//  db.collection('sessions').doc().set({
//                         host_id: user_id,
//                         title:this.title,
//                         description:this.description,
//                         sessionStart:this.sessionStart,
//                         duration:this.duration,
//                         spots:this.spots,
//                         price:this.price,
//                         category:this.category,
//                         location:this.location,
//                         host_name,
//                         host_pic,
//                         timestamp
//                     }).then(()=> {
//                         this.$router.push({name:'Home'})
//                     })

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




