<template>
    <v-container fluid>
        <v-row justify="center" > <!-- Headerbilde med tekst -->
            <v-col cols="12"> 
                <v-img height="500" gradient="to bottom, rgba(100,115,201,.1), rgba(25,32,72,.79)" class="align-end" src="https://images.complex.com/complex/image/upload/c_fill,dpr_auto,q_90,w_920/fl_lossy,pg_1/NBA-Off-Season-Training_Lead_1_g2ylen.jpg">
                    <v-row align="center" justify="start">  <!-- Avatar + Title -->
                        <v-col cols="1"> <!-- avatar -->
                            <v-avatar class="ma-2 white--text headline" color="success" left>MB</v-avatar>
                        </v-col>
                        <v-col cols="6"> <!-- session title -->
                            <h1 class="display-1 white--text">{{session.sessionTitle}}</h1>
                        </v-col>
                    </v-row>
                </v-img>
            </v-col>   
        </v-row>
        <v-row justify="center">
            <v-col cols="8">
                <p class="subtitle-1 grey--text">{{session.sessionDescription}}</p>    
            </v-col>
        <v-row justify="center">
            <v-col cols="8">
                <v-chip-group class="ma-3">
                    <v-chip mx-5 v-for="x in 3" :key="x" outlined color="orange">{{session.activity}}</v-chip>
                </v-chip-group>
                <v-row no-gutters>
                    <v-col cols="5">
                        <v-card-subtitle>Spots available: 1 of {{session.attendees.available}}</v-card-subtitle>
                        <v-card-subtitle>{{session.geoLocation.placeName}}</v-card-subtitle>
                    </v-col>
                    <v-col cols="4"> 
                        <v-card-text>{{session.sessionTime.startDate}} kl. {{session.sessionTime.startTime}}</v-card-text>
                        <v-card-subtitle>Duration: {{session.sessionTime.duration}} hours</v-card-subtitle>
                    </v-col>
                    <v-col cols="3">
                        <v-card-subtitle>Price: {{session.price}}Kr.</v-card-subtitle>
                    </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row justify="center">
                    <v-col cols="8">
                        <GmapMap
                            :center="{lat:session.geoLocation.lat, lng:session.geoLocation.lng}"
                            :zoom="17"
                            map-type-id="roadmap"
                            style="width: 500px; height: 350px"
                            :options="{
                                zoomControl: false,
                                mapTypeControl: false,
                                scaleControl: false,
                                streetViewControl: false,
                                rotateControl: false,
                                fullscreenControl: true,
                                disableDefaultUi: false
                                }"
                        ></GmapMap>
                    </v-col>
                </v-row>                         
            </v-col>
        </v-row>
            
        </v-row>
        <v-row justify="center" > <!-- Book Button -->
            <v-col cols="4">
                <v-btn class="deep-orange" dark depressed @click.prevent="bookSession">Book Now</v-btn>
            </v-col>
        </v-row>
        
    </v-container>
</template>



<script>
// eslint-disable-next-line no-unused-vars
/* eslint-disable no-unused-vars */
import * as firebase from 'firebase';
import db from '@/firebase/init'


export default {
    name: 'SessionView',
    data(){
        return{
            id:this.$route.params.id,
            session:{},
        }
    },
    methods:{
        checkingStuff(){
            let user = firebase.auth().currentUser
            console.log(['somethig','something else'].includes(user.uid))
        },
        bookSession(){
            let user = firebase.auth().currentUser
            db.collection('sessions').doc(this.session.session_id).update({
                    booked: firebase.firestore.FieldValue.arrayUnion(
                        {
                            id:user.uid,
                            date:Date.now()   
                        })}
            )//end Firebase update
            db.collection('sessions').doc(this.sessions.session_id).get().then( res => {
                console.log(res.attendees.booked.length)
                })//end length check
            },//end book session
        checkBookings(){       
        },//end check bookings
    },
    computed:{
        currentSessions(){
            return this.$store.state.sessions
        }

    },
    mounted(){    
       db.collection('sessions').doc(this.id).get().then( data =>
       this.session = data.data()
       )  
    },//end mounted
    created(){
        console.log(this.id)

    },

  
}
</script>


<style scoped>


</style>