<template>   
    <v-container>
        <v-form  >
            <v-row>
                <v-col>
                    <v-text-field
                        name="title"
                        label="Title of Category"
                        id="title"
                        v-model="name"
                    ></v-text-field>
                    <v-autocomplete dense chips :items="predefinedTags" label="Set tags" v-model="tags" multiple outlined>
                    </v-autocomplete>
                    <img :src="photoRef" class="uploadPreview">

                    <v-file-input   accept="image/*" 
                                    label="Category photo"
                                    filled
                                    prepend-icon="mdi-camera"
                                    v-model="value"
                                    @change="storeImage">
                    </v-file-input>
                    <v-btn @click.prevent="saveInterest()">
                        Sumbit Interest
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
        
    </v-container>
</template>

<script>
/* eslint-disable no-unused-vars */
import firebase from 'firebase'
import db from '@/firebase/init'


    export default {
        name:'AddInterests',
        components:{},
        computed:{},
        data(){
            return{
                name:null,
                tags:[],
                photoURL:'',
                predefinedTags:[
                    'indoor', 
                    'outdoor',
                    'aerobic',
                    'anaerobic',
                    'ball',
                    'team',
                    'solo',
                    ],
                photoRef:null,
                storageRef:null,
                value:null,
            }
        }, //end data
        watch:{
            photoObj(x){
                console.log('This is the photoObj ' +x)
            },
            photoURL(x){
                console.log(x)
            }
        },
        methods:{
            saveInterest(photo){            
                // LAGRE TIL CATEGORY
                db.collection('category').doc(this.name).set({
                    name:this.name,
                    tags:this.tags,
                    photoURL:this.photoURL
                    })
                this.tags = null
                this.name = null
                this.photoURL = null
                this.photoRef = null
                this.value = null
            },
            storeImage(event){
                const reader = new FileReader();
                reader.onload = e => {
                    this.photoRef = e.target.result
                    }
                reader.readAsDataURL(event)
                // STORE IMAGE TO FIREBASE
                this.storageRef = firebase.storage().ref();
                this.storageRef.child(event.name).put(event).then( snapshot=>{
                    snapshot.ref.getDownloadURL().then(res =>{
                        this.photoURL = res
                        })
                    })                 
            },
        },
        created(){
        }
    }
</script>

<style lang="scss" scoped>

.uploadPreview{
    width: 100%;
}

</style>