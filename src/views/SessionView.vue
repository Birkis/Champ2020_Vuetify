<template>
    <v-container fluid v-if="currentSession">

        <v-row justify="center" > <!-- Headerbilde med tekst -->
            <v-col cols="12"> 
                <v-img height="500" 
                        gradient="to bottom, rgba(100,115,201,.1), rgba(25,32,72,.85)" 
                        class="align-end" 
                        :src="currentSession.activity.photoURL">
                    <v-row align="center" justify="start">  <!-- Avatar + Title -->
                        <v-col cols="2" md="1"> <!-- avatar -->
                            <v-avatar 
                                class="ma-2 white--text headline" 
                                color="success"
                                :src="currentSession.hostPicture"
                                size="62" 
                                left>
                                <img :src="currentSession.hostPicture" alt="">
                            </v-avatar>
                        </v-col>
                        <v-col cols="10" md="8"> <!-- session title -->
                            <h1 class="display-1 white--text">{{currentSession.sessionTitle}}</h1>
                            <p class="white--text">With {{currentSession.hostName}}</p>
                        </v-col>
                    </v-row>
                </v-img>
            </v-col>   
        </v-row>
        <v-container>        
            <v-row justify="center" no-gutters> <!-- Diverse info -->
                <v-col cols="12">
                    <p class="subtitle-1 grey--text">{{currentSession.sessionDescription}}</p>
                </v-col>
            </v-row>
            <v-row justify="center" no-gutters> <!-- Time and Duration -->
                <v-col cols="12" sm="6" md="3"  >
                    <p> <v-icon>mdi-calendar</v-icon> {{currentSession.sessionTime.startDate}} - {{currentSession.sessionTime.startTime}}</p>
                </v-col>
                <v-col cols="12" sm="6" md="3" >
                    <p> <v-icon>mdi-timer-sand</v-icon> {{currentSession.sessionTime.duration}} hours</p>
                </v-col>
                <v-col cols="12" sm="6" md="3" >
                    <p> <v-icon>mdi-cash</v-icon>  Price: {{currentSession.price}} NOK</p>
                </v-col>
                <v-col cols="12" sm="6" md="3" >
                    <v-chip label>{{currentSession.activity.name}}</v-chip>
                </v-col>
            </v-row>
            <v-row no-gutters=""> <!-- attendees -->
                <v-col>
                    <p> <v-icon>mdi-account-group-outline</v-icon> {{currentSession.booked.length}} booked, of {{currentSession.attendees}} available spots</p>
                </v-col>
            </v-row>
            <v-row no-gutters=""> <!-- Location -->
                <v-col>
                    <p > <v-icon>mdi-map-marker-radius</v-icon> {{currentSession.geoLocation.placeName}}</p>
                </v-col>
            </v-row>
                
        </v-container>
        <v-row justify="center"> <!-- Map -->
            <GmapMap
                :center="{lat:currentSession.geoLocation.lat, lng:currentSession.geoLocation.lng}"
                :zoom="17"
                map-type-id="roadmap"
                style="width: 100%; height: 400px"
                :options="{
                    zoomControl: false,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    rotateControl: false,
                    fullscreenControl: true,
                    disableDefaultUi: false
                    }">
            </GmapMap>
        </v-row> 
        <v-row  justify="center" class="teal"> <!-- booking knapp -->
            <v-btn 
            height="75"
            text
            large
            class=""
            color="success" 
            :disabled="ownedByHost || sessionFull || alreadyBooked || booked" 
            @click.prevent="bookSession">
            Book Session
            </v-btn>  
        </v-row>
    </v-container>
</template>



<script>
/* eslint-disable no-unused-vars */
import * as firebase from 'firebase';
import db from '@/firebase/init'
import {mapState} from 'vuex'
export default {
    name: 'SessionView',
    data(){
        return{
            id:this.$route.params.id,
            booked:false,
        }
    },
    methods:{
        bookSession(){
            db.collection('sessions').doc(this.id).update({
                booked: firebase.firestore.FieldValue.arrayUnion(
                    {
                        id:this.currentUser.user_id,
                        date:Date.now()   
                    })}
            )//end Firebase update of booking info
            this.booked = true
        },//end book session
    },
    computed:{            
        ...mapState(['currentUser','sessions']),
        currentSession(){
            let currentSession = this.$store.state.sessions.filter( session =>{
                return session.session_id === this.id
            })
            return currentSession[0]
        },
        ownedByHost(){
            let unBookable = false
            if(this.currentSession.host_id === this.currentUser.user_id){
                unBookable = true
            }
            return unBookable 
        },
        sessionFull(){
            let isFull = false
            if(this.currentSession.attendees <= this.currentSession.booked.length){
                isFull = true
            }
            return isFull
        },
        alreadyBooked(){
            let alreadyBooked = false
            let booked = this.currentSession.booked.find( booking => {
                return booking.id === this.currentUser.user_id
            })
            if(booked){
                alreadyBooked = true
            }
            return alreadyBooked
        },
    },   
    created(){ 
    },//end created
    mounted(){
    }
}
</script>


<style scoped>
p {
    text-transform: uppercase;
    color:#3b3b3b;
}


</style>

