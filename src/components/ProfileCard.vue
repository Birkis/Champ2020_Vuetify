<template>
<v-container grid-list-xs>
         <v-row>
            <v-col v-for="(user,index) in users" :key="index">
               <v-card
                    max-width="300"
                    class="mx-auto"
                      >
                    
                    
                    <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
                    height="150"
                    align="end"
                    class="align-end header-image"
                    >
                    <v-list-item>
                    <v-list-item-avatar color="grey" size="55"><v-img :src="user.profilePic"></v-img></v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="headline white--text"><router-link :to="{ name:'ProfileView', params:{id:user.user_id}}" >{{user.name}}</router-link></v-list-item-title>
                        <v-rating v-if="!null" dense v-model="rating"></v-rating>
                    </v-list-item-content>
                    </v-list-item>
                    </v-img>
                    <v-row justify="start">
                        <v-col cols="5" class="mx-1" v-for="(interest,index) in user.interests" :key="index">                        
                            <v-chip>{{interest}}</v-chip>
                        </v-col>
                    </v-row>
                    

                    <v-card-text>
                       {{user.motto}}
                    </v-card-text>

                    <v-card-actions>
                    <v-btn
                        text
                        color="deep-purple accent-4"
                        
                        
                    >
                        contact
                    </v-btn>
                  
                    <v-spacer></v-spacer>
                    <v-btn icon>
                        
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
/* eslint-disable no-unused-vars */
import db from '@/firebase/init'

export default {
    name:'ProfileCard',
    props:['users'],
    data(){
        return {
            rating:0
        
        

        }
    },
    computed:{

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