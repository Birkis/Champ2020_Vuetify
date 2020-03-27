<template>
  <v-row justify="center">
      <v-col cols="2">
        <v-dialog
        v-model="dialog"
        width="300"
            >
            <template v-slot:activator="{ on }">
                <v-icon  v-on="on">mdi-plus</v-icon>
            </template>

            <v-card class="uploadCard">
                <v-card-title
                class="headline grey lighten-2"
                primary-title
                >
                Upload Profile Picture
                </v-card-title>

                <v-divider></v-divider>
                <input class="avatarUpload" type="file" @change="saveImage">
            </v-card>
        </v-dialog>
        </v-col>
  </v-row>
</template>

<script>
/* eslint-disable no-unused-vars */
import firebase from 'firebase'

    export default {
        data(){
            return{
                dialog: false,
                rules: [
                value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
                ],
                url:'',

            }
        },//end data
        methods:{
            saveImage(event){
                const file = event.target.files[0]
                const storageRef = firebase.storage().ref();
                const task = storageRef.child(file.name).put(file).then( snapshot=>{
                    snapshot.ref.getDownloadURL().then(res =>{
                        this.url = res
                        }).then(()=>{
                            this.$emit('updateUrl',this.url)
                        })
                    })
                
                
                }

        }
    }
</script>

<style scoped>



.avatarUpload{
    padding: 15px;
}

input.avatarUpload{
    color:lightgray;
}

.avatarUpload::-webkit-file-upload-button{
    color: slategrey;
    border: 1px solid lightgray;
    border-radius: 5px;
}

</style>