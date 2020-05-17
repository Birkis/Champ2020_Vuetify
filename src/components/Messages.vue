<template>
    <div >
        <div v-for="msg in messages[0].msgs" :key="msg.time">
            <div v-if="currentUser.user_id == msg.sender" class="d-flex flex-row-reverse mb-5">
                <v-chip class=" large teal lighten-2 dark-grey--text mx-5 mt-1" >{{msg.message}}</v-chip>
            </div> 
            <div v-if="currentUser.user_id !== msg.sender" class="d-flex flex-row mb-2">
                <v-chip class=" large deep-orange lighten-1 white--text mx-5 mt-1"  >{{msg.message}}</v-chip>       
            </div>

            
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
    export default {
        name:'Messages',
        props: ['messages'],
        data(){
            return{
                msgs:[]
            }
        },
        computed:{ 
            user_a(){
                
                return null
            },
            me(){
                return null
            },
            ...mapState(['currentUser'])
         }
    }
</script>

<style lang="scss" scoped>

</style>