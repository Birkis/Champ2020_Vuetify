<template>
    <v-container>
        <h1>Chat Window</h1>
        <p>Chat ID is: {{token}}</p>
        <p>The sender is: {{currentUser.name}}</p>
        <p>The recipient is: {{host.name}}</p>
    </v-container>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name:'Chat',
        props:['user_id','token'],
        data(){
            return{

            }
        },
        computed:{...mapState(['currentUser', 'users']),
            host(){
                return this.users.find( user => {
                    return user.user_id === this.user_id
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>