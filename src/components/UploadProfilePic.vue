<template>
  <v-row justify="center">
      <v-col cols="2">
        <v-dialog
        v-model="dialog"
        width="500"
            >
            <template v-slot:activator="{ on }">
                <v-avatar
                    v-on="on"
                    size="60"
                    color="red"
                >
                    <img src="https://bit.ly/39j0x7I" alt="alt">
                </v-avatar>
            </template>

            <v-card>
                <v-card-title
                class="headline grey lighten-2"
                primary-title
                >
                Upload Profile Picture
                </v-card-title>

                <v-divider></v-divider>

                    <v-file-input
                        :rules="rules"
                        accept="image/png, image/jpeg, image/bmp"
                        placeholder="Pick an avatar"
                        prepend-icon="mdi-camera"
                        label="Avatar"
                    ></v-file-input>
            </v-card>
        </v-dialog>
      </v-col>
  </v-row>
</template>

<script>
    export default {
        data(){
            return{
                dialog: false,
                rules: [
                value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
                ],

            }
        }//end data
    }
</script>

<style scoped>

</style>