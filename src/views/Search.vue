<template>
    <v-container>
        <v-text-field
            name="Search"
            label="Ask me (almost) anything ..."
            v-model="searchText"
        ></v-text-field>
        <v-btn color="success" @click.prevent="getData">Search</v-btn>
        <p>
          {{searchResponse}}  
        </p>
    </v-container>
</template>

<script>
    import axios from "axios";
    // import db from 'firebase/init'
    export default {
        name:'Search',
        data(){
            return {
                searchText:"",
                searchResponse: {}
            }
        },
        computed: {},
        methods: {
            getData() {
                let response = ''
                const config = {
                    headers: { Authorization: `Bearer S473FJ6FIGSIWSDSILRL762YACI5ZCYF` },
                    params: {
                        q: this.searchText
                            }
                    };
                axios
                .get("https://api.wit.ai/message", config)
                .then(data => {
                    this.searchResponse = data.data;
                    response = data.data
                    
                })
                .then( data => {
                    this.searchText = ''
                    if(data){
                        console.log(response.intents[0])
                        }
                    else {
                        console.log(response.intents[0])
                    }
                    }
                )
                .catch(error => {
                    console.error(error);
                });

            }//end getData
        },
    }
</script>

<style scoped>

</style>