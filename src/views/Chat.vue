<template>
    <v-container>
        <h1>Chat Window</h1>
        <p>Chat ID is: {{token}}</p>
        <div class="all-chat" v-chat-scroll>
            <div v-for="(message, index) in msgs" :key="index" >
                <div v-if="message.sender === me" class="d-flex flex-row mb-5">
                    <div>
                        <v-chip class=" large teal lighten-2 dark-grey--text" > {{message.message}}</v-chip>
                        
                        <p class="overline ml-3 font-weight-medium chat">{{my_name}}</p>
                        
                    </div>
                </div>
                <div v-if="message.sender === user_a" class="d-flex flex-row-reverse mb-2">
                    <div>
                        <v-chip  class=" large deep-orange lighten-1 white--text" justify-content="flex-end" > {{message.message}}</v-chip>
                        
                        <p class="overline ml-3 font-weight-medium chat">{{user_a_name}}</p>
                    </div>
                    
                </div>     
            </div>
        </div>
        <v-divider></v-divider>
        <v-form @submit.prevent="send(message)"> <!-- send en melding -->
            <v-text-field
                class="mx-5 mt-5"
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
    import moment from 'moment'
    export default {
        name:'Chat',
        props:['user_a','token','me','user_a_name','my_name'],
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
                    sender:this.me
                }
                db.collection('chats').doc(this.token).update({
                    msgs: firebase.firestore.FieldValue.arrayUnion(item)
                })
                this.message = ''
            }
        },
        mounted(){
            let ref = db.collection('chats')
            ref.onSnapshot( snap => {
                snap.docChanges().forEach( change => {
                    if(change.type === 'added' && change.doc.data().token === this.token){
                        this.msgs = change.doc.data().msgs
                    } else if(change.type === 'modified' && change.doc.data().token === this.token){
                        let myMessages = change.doc.data().msgs
                        this.msgs.push(myMessages[myMessages.length -1])
                    }
                })
            })

        }
    }
</script>

<style lang="scss" scoped>

.all-chat{
    max-height: 700px;
    overflow: auto;
}

.all-chat::-webkit-scrollbar{
    width: 3px;
}

.all-chat::-webkit-scrollbar-track{
    background: #ddd;
}

.all-chat::-webkit-scrollbar-thumb{
    background: #aaa;
}



.chat{
    margin-bottom: 1px;

}
.chat-line {
    margin-bottom: 5px;
}

</style>