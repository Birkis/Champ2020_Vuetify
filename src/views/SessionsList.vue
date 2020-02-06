<template>
    <v-content>
        <v-layout justify-center row wrap>
            <v-flex xs-12>
                <h1 class="display-1">Sessions List</h1>
            </v-flex>
             
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12 sm6 md4 lg3 v-for="x in 5" :key="x.index" pa-2>
                <v-card min-width="300" max-width="400">
                    <v-layout row wrap>
                        <v-layout column>
                                <v-flex xs12 md6>
                                    <v-card-title>
                                        Session title
                                    </v-card-title>
                                </v-flex>
                                <v-flex xs12 md6>
                                    <v-card-subtitle>
                                        Host Name
                                    </v-card-subtitle>
                                </v-flex>

                        </v-layout>
                        
                        <v-flex xs12 md6>
                            <v-card-subtitle>
                                A short description of the session
                            </v-card-subtitle>     
                   
                        </v-flex>
                         
                    </v-layout>
                    
                    <v-rating v-model="rating" readonly="readonly" ></v-rating>
                    <v-card-actions>
                        <v-btn class="" text depressed color="deep-orange" > Share </v-btn>
                    
                    <v-spacer></v-spacer>
                    <v-btn icon @click="show =!show">
                        <v-icon> {{  show ? 'mdi-chevron-up' : 'mdi-chevron-down'}}</v-icon>
                    </v-btn>
                    </v-card-actions>
                    <v-card-transition>
                        <div v-show="show">
                            <v-divider></v-divider>
                            <v-card-text>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus, illum excepturi! Minus, nulla voluptas. Voluptatem, voluptas a? Dolores voluptatum commodi, perferendis rem quis provident aliquam fuga dignissimos harum voluptatem culpa?
                            </v-card-text>

                        </div>
                    </v-card-transition>
                </v-card>

            </v-flex>
           
        </v-layout>
       
    </v-content>
</template>


<script>
export default {
    name:'SessionsList',
    data(){
        return{
            show:false,
            rating:2,
            readonly:true,

        }
    }
}
</script>