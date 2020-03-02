<template>
    <v-container fluid>
        <v-row>
            <v-col v-for="session in sessions" :key="session.sessionTitle">
                <v-card max-width="500" class="my-2">
                    <v-list-item>
                    <v-list-item-avatar color="green"></v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="headline"> <router-link to="/profileview">{{session.sessionTitle}}</router-link> </v-list-item-title>
                        <v-list-item-subtitle>{{session.hostName}}</v-list-item-subtitle>
                    </v-list-item-content>
                    </v-list-item>

                        <v-img src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg" height="194"></v-img>
                        <v-card-text>
                            {{session.sessionDescription}}
                        </v-card-text>

                        <v-card-actions>
                            <v-btn text color="deep-orange accent-4">
                                Book Now
                            </v-btn>
                            <v-btn text color="deep-orange accent-4">
                                Save
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
export default {
    name:'SessionCard',
    props:['sessions'],
    data(){
        return{
            
        }
    }

}
</script>

<style>

</style>