<template>
 <v-content >
    <v-container fluid error>
        <v-row >
            <v-col v-for="n in 6" :key="n" xs12 sm6 md4 lg3>
                <v-card max-width="500" >
                    <v-img height="200" src="https://images.complex.com/complex/image/upload/c_fill,dpr_auto,q_90,w_920/fl_lossy,pg_1/NBA-Off-Season-Training_Lead_1_g2ylen.jpg">
                    </v-img>
                    <v-spacer></v-spacer>
                    <v-card-text>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                         Temporibus vel eos, fugiat harum magni expedita quis illum, 
                         reiciendis dolorum odio amet nobis, veritatis deleniti culpa maiores. 
                         Facilis, necessitatibus. Sequi, at?
                    </v-card-text>
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