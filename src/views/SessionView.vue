<template>
    <v-container fluid v-if="currentSession">
            <p>Session is owned by host: {{ownedByHost}}</p>
            <p>Session is full: {{sessionFull}}</p>
            <p>User has already booked: {{alreadyBooked}}</p>
            <v-btn color="success" :disabled="ownedByHost || sessionFull || alreadyBooked || booked" @click.prevent="bookSession">Book Session</v-btn>        
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
            booked:false       
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
            console.log('It was updated with ' + this.id)
            this.booked = true
        },//end book session
    },
    watch:{
        booked(){

        }
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
        }

    },
    watch:{
    },//end watch
    created(){ 
    },//end created
}
</script>


<style scoped>


</style>

