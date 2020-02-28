<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <v-img height="500" class="align-end" src="https://images.complex.com/complex/image/upload/c_fill,dpr_auto,q_90,w_920/fl_lossy,pg_1/NBA-Off-Season-Training_Lead_1_g2ylen.jpg">
                <v-avatar class="ma-4 white--text headline" color="success" left>MB</v-avatar>
                <h1 class="display-1 white--text">Sessions Title</h1>
                </v-img>
            </v-col>   
        </v-row>
        <v-row justify="center">
            <v-col cols="8">
                <p class="subtitle-1 grey--text">Some Description of the session. Prefferably not too long!</p>    
            </v-col>
        
            <v-col cols="8">
                <v-chip-group class="ma-3">
                    <v-chip mx-5 v-for="x in 3" :key="x" outlined color="orange">basketball</v-chip>
                </v-chip-group>
                <v-row no-gutters>
                    <v-col cols="5">
                        <v-card-subtitle>Spots available: 2 of 5</v-card-subtitle>
                        <v-card-subtitle>Venice Beach</v-card-subtitle>
                    </v-col>
                    <v-col cols="4"> 
                        <v-card-text>24-3-2020 kl. 17:30</v-card-text>
                        <v-card-subtitle>Duration: 2h30min</v-card-subtitle>
                    </v-col>
                    <v-col cols="3">
                        <v-card-subtitle>Price: 34Kr.</v-card-subtitle>
                    </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                    <v-col>
                        <v-img height="300" src="https://www.sketchappsources.com/resources/source-image/google-maps-ui-kit-agapimo.jpg"></v-img>
                    </v-col>
                </v-row>            
                                
                    
                    
                                
            </v-col>
        </v-row>
    </v-container>
</template>



<script>
// eslint-disable-next-line no-unused-vars
import db from '@/firebase/init'

export default {
    name: 'SessionView',
    created(){
        
       

    }, //end created
  
}
</script>


<style scoped>


</style>