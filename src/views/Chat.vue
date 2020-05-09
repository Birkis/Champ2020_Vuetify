<template>
    <v-container>
        <h1>Chat Window</h1>
        <p>Chat ID is: {{token}}. The chat is between {{myID}} and {{user_id}}</p>

        <ul>
            <li v-for="(message, index) in msgs" :key="index">{{message.message}} - {{message.time}} </li>
        </ul>

        <v-form @submit.prevent="send(message)"> <!-- send en melding -->
            <v-text-field
                name="me"
                label="Type Message"
                id="me"
                v-model="message"
            ></v-text-field>
        </v-form>
        





    </v-container>
</template>

<script>
/* eslint-disable no-unused-vars */

    import {mapState} from 'vuex'
    import firebase from 'firebase'
    import db from '@/firebase/init'
    export default {
        name:'Chat',
        props:['user_id','token','myID','messages'],
        data(){
            return{
                message:'',
                msgs:[]
            }
        },
        methods:{
            send(message){
                let item = {
                    message,
                    time:Date.now(),
                    sender:this.myID
                }
                db.collection('chats').doc(this.token).update({
                    msgs: firebase.firestore.FieldValue.arrayUnion(item)
                })
                this.message = ''
            }
        },
        created(){
            let ref = db.collection('chats')
            ref.onSnapshot( snap => {
                snap.docChanges().forEach( change => {
                    if(change.type === 'added' && change.doc.data().token === this.token){
                        this.msgs = change.doc.data().msgs
                    }
                    if(change.type === 'modified' && change.doc.data().token === this.token){
                        this.msgs = change.doc.data().msgs 
                    }
                })
            })

        }
    }

/* 
- I Vuex slår jeg opp alle chatID'er lagret på din bruker. Alle dine chats blir lastet inn i VUEX som chats.
- Når Chatten lastes inn skal jeg sjekke om det finnes en chat mellom partene. 

- Hvis det ikke er det så oppretter jeg en ny via $router og lagrer den på Firestore på begge brukerne.

- Hvis det er det, så laster jeg inn objektet via fra $store.

Funksjonen vil alltid bruke .update ettersom det alltid vil være en chat der i utgangspunktet (tom eller ei)
 

*/
</script>

<style lang="scss" scoped>

</style>