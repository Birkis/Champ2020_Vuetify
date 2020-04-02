<template>
    <v-container fluid v-if="session.session_id !== undefined">
        <v-row justify="center" > <!-- Headerbilde med tekst -->
            <v-col cols="12"> 
                <v-img height="500" gradient="to bottom, rgba(100,115,201,.1), rgba(25,32,72,.79)" class="align-end" :src="session.activity.photoURL">
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
                    <v-chip mx-5 outlined color="orange">{{session.activity.name}}</v-chip>
                </v-chip-group>
                <v-row no-gutters>
                    <v-col cols="5">
                        <v-card-subtitle>Spots available: {{session.booked.length}} of {{session.attendees}}</v-card-subtitle>
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
        <v-row justify="center" v-if="user" > <!-- Book Button -->
            <v-col cols="4">
                <v-btn class=""  @click.prevent="bookSession" :disabled="bookingDisabled">Book Now</v-btn>
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
    props:[],
    data(){
        return{
            id:this.$route.params.id,
            session:{booked: [],activity:{}},
            bookingDisabled:false,
            isBooked: false,
            isFull:false,
            user:null
        }
    },
    methods:{
        bookSession(){
            //Check if isBooked is true. 
                db.collection('sessions').doc(this.session.session_id).update({
                    booked: firebase.firestore.FieldValue.arrayUnion(
                        {
                            id:this.user.uid,
                            date:Date.now()   
                        })}
                )//end Firebase update of booking info
                this.bookingDisabled=true
        },//end book session
        checkBookingStatus(){
            let user = firebase.auth().currentUser
            function hasBooked(booked){
                    return booked.id === user.uid
                } 
            this.isBooked = this.session.booked.some(hasBooked)
            if (this.isBooked){
                this.bookingDisabled=true
            }
        },
        disableBooking(){
            if(this.isBooked)
            {this.bookingDisabled = true}
        }
    },
    computed:{
    },
    watch:{
        isBooked:{
            handler:'disableBooking'
        }
    },//end watch
    mounted(){   
    },//end mounted
    created(){    
        db.collection('sessions').doc(this.id).get().then( data => {
            Object.keys(data.data()).forEach( res => {
               this.session = data.data()
            })
        }).then(()=>{
            this.user = firebase.auth().currentUser
        }).then(() =>{
            let user = firebase.auth().currentUser
            function hasBooked(booked){
                    return booked.id === user.uid
                } 
            this.isBooked = this.session.booked.some(hasBooked)
        })
    },//end created
}
</script>


<style scoped>


</style>

// .then(() => {
//   this.data = whatever
//   dinFunksjon()
// })

// .then(()=>{
//             this.user = firebase.auth().currentUser
//             function hasBooked(booked){
//                     return booked.id === this.user.uid
//                 } 
//             this.isBooked = this.session.booked.some(hasBooked)
//             if (this.session.booked.length>=this.session.attendees){
//                     this.isFull = true
//             }else{
//                     this.isFull = false
//                     }
//             if(this.isBooked || this.isFull){
//                 this.bookingDisabled = true
//             }
//         }
            
//         )