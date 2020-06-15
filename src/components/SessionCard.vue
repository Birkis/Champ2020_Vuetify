<template>
    <v-container fluid>
        <v-row>
            <v-col v-for="(session,index) in sessions" :key="index">
                <v-card max-width="500" class="my-2">
                    <v-list-item>
                    <v-list-item-avatar color="green"> <img :src="session.hostPicture" alt="Host Avatar Photo"> </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="headline"> 
                            <router-link 
                                :to="{  name:'SessionView',
                                        params: { id:session.session_id } }">
                                        {{session.sessionTitle}}
                            </router-link> 
                        </v-list-item-title>
                        <v-list-item-subtitle><router-link :to="{ name:'ProfileView', params:{id:session.host_id}}">{{session.hostName}}</router-link></v-list-item-subtitle>
                    </v-list-item-content>
                    </v-list-item>

                        <v-img :src="session.activity.photoURL" height="194" gradient="to bottom, rgba(100,115,201,.33), rgba(25,32,72,.99)"></v-img>
                        <v-card-text>
                            {{session.sessionDescription}}
                        </v-card-text>
                        <v-card-actions>                           
                            <v-btn v-if="currentUser.user_id !== session.host_id"  text color="deep-orange accent-4">
                                Book Now
                            </v-btn>
                            <!-- SAVE SESSION <v-btn text color="deep-orange accent-4">
                                Save
                            </v-btn> -->
                              <v-btn v-if="currentUser && currentUser.user_id === session.host_id"
                                     text 
                                     color="deep-orange accent-4"
                                     @click.prevent="deleteSession(session.session_id)"
                                     >
                                Delete
                            </v-btn>
                          
                        <v-spacer></v-spacer>
                            <v-btn icon>
                                <v-icon>mdi-heart</v-icon>
                            </v-btn>
                            <v-btn icon>
                                <v-icon>mdi-share-variant</v-icon>
                            </v-btn>
                        </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        
    </v-container>
</template>
<script>
import db from '@/firebase/init'
import {mapState} from 'vuex'
export default {
    name:'SessionCard',
    props:['sessions'],
    computed: { ...mapState(['currentUser']) },
    data(){
        return{
            hostName:null,
            host_id:null,
            hostProfilePic:null,         
        }
    },
    methods:{
        deleteSession(sessionId){
            db.collection('sessions').doc(sessionId).delete()
        }
    },
    mounted(){
    },
    created(){
       
    }

}
</script>

<style>

</style>