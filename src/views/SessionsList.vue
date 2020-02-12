<template>
 <v-content >
    <v-container fluid error>
        <v-row >
            <v-col v-for="n in 6" :key="n" xs12 sm6 md4 lg3>
                <v-card max-width="500" >
                    <v-img height="300" src="https://images.complex.com/complex/image/upload/c_fill,dpr_auto,q_90,w_920/fl_lossy,pg_1/NBA-Off-Season-Training_Lead_1_g2ylen.jpg" class="white--text align-end">
                    
                    <v-card-title class="display-1">Baskeball by the Beach</v-card-title>
                    </v-img>
                    <v-spacer></v-spacer>
                    <v-row>
                            <v-col >
                                <v-chip-group class="ma-3">
                                    <v-chip mx-5 v-for="x in 3" :key="x" outlined color="orange">basketball</v-chip>
                                </v-chip-group>
                                <v-row>
                                    <v-col cols="5">
                                        <v-card-subtitle>Spots available: 2 of 5</v-card-subtitle>
                                        <v-card-subtitle>Venice Beach</v-card-subtitle>
                                    </v-col>
                                    <v-col cols="4"> 
                                        <v-card-subtitle>Duration: 2h30min</v-card-subtitle>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-card-subtitle>Price: 34Kr.</v-card-subtitle>
                                    </v-col>
                                </v-row>
                            
                                
                                <v-card-text>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                    Temporibus vel eos, fugiat harum magni expedita quis illum, 
                                    reiciendis dolorum odio amet nobis, veritatis deleniti culpa maiores. 
                                    Facilis, necessitatibus. Sequi, at?
                                </v-card-text>
                                
                                
                            </v-col>
                        </v-row>
                     <v-spacer></v-spacer>
                    <v-card-actions>
                        <v-btn text color="primary">Book Now</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
     
    </v-container>
  </v-content>
</template>


<script>
export default {
    name:'SessionsList',
    data(){
        return{
         

        }
    }
}
</script>