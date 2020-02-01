<template>
    <v-container>
        <v-app-bar app flat>
                <v-icon medium @click.prevent="drawer=!drawer"> mdi-dots-vertical </v-icon>
                <v-toolbar-title class="display-1" ><span class="font-weight-light">CHAMP</span><span class="font-weight-bold" >2020</span> 
                </v-toolbar-title>      
        </v-app-bar>    

        <v-navigation-drawer v-model="drawer" app class="deep-orange" >
                <v-list nav class="py-0">
                    <v-list-item v-for="link in links" :key="link.name" link :to="link.route" >
                        <v-list-item-icon>
                                <v-icon class="white--text">{{link.icon}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content> 
                                <v-list-item-title class="title white--text">{{link.name}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>



                </v-list>
        </v-navigation-drawer>    
       
    </v-container>
</template>


<script>
export default {
    data(){
        return{
            drawer:true,
            links:[
                {icon:'mdi-view-dashboard-outline', name:'Home', route:'/'},
                {icon:'mdi-format-list-text', name:'Sessions', route:'/sessionslist'},
                {icon:'mdi-plus', name:'Create Session', route:'/createsession'},
                {icon:'mdi-account-search-outline', name:'View Profiles', route:'/viewprofiles'},
                {icon:'mdi-account-edit-outline', name:'Edit Profile', route:'/editprofile'},

            ]


        }
    }
}
</script>

<style scoped>

</style>