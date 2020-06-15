<template>
<v-container grid-list-xs>
         <v-row>
            <v-col v-for="(user,index) in users" :key="index">
               <v-card
                    width="400"
                    class="mx-auto"
                    >
                    <v-list-item>
                    <v-list-item-avatar color="grey" size="55"><v-img :src="user.profilePic"></v-img></v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="headline white--text"><router-link :to="{ name:'ProfileView', params:{id:user.user_id}}" >{{user.name}}</router-link></v-list-item-title>
                        <v-rating v-if="!null" dense v-model="rating"></v-rating>
                    </v-list-item-content>
                    </v-list-item>

                    <v-divider></v-divider>
                    <v-row justify="start">
                        <v-col cols="10" class="mx-3" >                        
                            <span class="overline" v-for="(interest,index) in user.interests" :key="index">{{interest}} | </span>
                        </v-col>
                    </v-row>
                    <v-divider ></v-divider>

                    <v-card-text>
                       {{user.motto}}
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                    <v-btn
                        v-if="currentUser.user_id !== user.user_id"
                        text
                        color="deep-purple accent-4"
                        @click.prevent="sendMessage(user.user_id,
                                                    user.name, 
                                                    user.chats, 
                                                    currentUser.user_id,
                                                    currentUser.name, 
                                                    currentUser.chats)"    
                    >
                        contact
                    </v-btn>
                  
                    <v-spacer></v-spacer>
                    <v-btn icon>
                        
                    </v-btn>
                    <v-btn icon @click.prevent="test" >
                        <v-icon>mdi-share-variant</v-icon>
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    
</v-container>
</template>

<script>
/* eslint-disable no-unused-vars */
import db from '@/firebase/init'
import {mapState} from 'vuex'
import firebase from 'firebase'

export default {
    name:'ProfileCard',
    props:['users'],
    data(){
        return {
            rating:0,
        }
    },
    computed:{
        myChats(){
            return this.$store.getters.myChats(this.currentUser.user_id)
        },
        ...mapState(['currentUser'])}
    ,
    methods:{
        sendMessage(user_a,user_a_name, a_chats, user_b, user_b_name, b_chats){                  
            if(a_chats !== undefined){
                let ourChat = a_chats.find( chat => b_chats.includes(chat))
                this.$router.push({name:'Chat', params: {user_a, 
                                                         token:ourChat, 
                                                         me:user_b, 
                                                         user_a_name,
                                                         my_name:user_b_name}})
                }
            else {
                console.log('We create a new chat')
                let token = Math.random().toString(16).substr(2,12)
                db.collection('chats').doc(token).set({
                    token,
                    users:{
                        user_a,
                        user_b
                    },
                    msgs:[]
                })
                db.collection('users').doc(user_b).update({
                    chats: firebase.firestore.FieldValue.arrayUnion(token)
                })
                db.collection('users').doc(user_a).update({
                    chats: firebase.firestore.FieldValue.arrayUnion(token)
                })
                this.$router.push({name:'Chat', params: {user_a, token, me:user_b}}) 
            }
                   
        },
    }
    

}
</script>

<style scoped>
.header-image{
    background-size:cover; 
    background-color: rgba(0, 255, 255, 1);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(10px);
    
}

</style>