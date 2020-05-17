<template>
    <v-container>
        <v-row>
            <v-col cols="4">
                <p v-for="(token,index) in currentUser.chats" :key="index" @click.prevent="getChat(token)" >
                    {{token}}
                </p>
            </v-col>    
            <v-col cols="8">
                <Messages :messages="messages"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {mapState} from 'vuex'
import Messages from '@/components/Messages'

    export default {
        name:'MyMessages',
        components: {
            Messages
        },
        data(){
            return {
                messages:[]
            }
        },
        computed: {
            myChats(){
            return this.$store.getters.myChats(this.currentUser.user_id)
            },

            ...mapState(['currentUser'])
        }, //end computed   
        methods:{
            getChat(token){
                let data = this.$store.getters.myMessages(token)
                this.messages = data
            }

        },//end methods 
    }//end export
</script>

<style lang="scss" scoped>

</style>