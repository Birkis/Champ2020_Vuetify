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
        <SessionCard :sessions="searchResult"/>
    </v-container>
</template>

<script>
    /* eslint-disable no-unused-vars */

    import axios from "axios";
    // import db from 'firebase/init'
    export default {
        name:'Search',
        data(){
            return {
                searchText:"",
                searchResponse: {traits:{
                        trening: [
                            {value:null}
                        ]
                }}
            }
        },
        computed: {
            searchResult(){
                return this.$store.getters.searchSessions(this.searchResponse.traits.trening[0].value)
            },
        },
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
                    if(response.traits.trening[0].confidence > 0.95){
                        console.log(response.traits.trening[0].value)
                        }
                    else {
                        console.log('Not sure what user wants')
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