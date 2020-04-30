<template>
    <v-container grid-list-xs>
        <v-row justify="center">
            <v-col cols="8" >
                <v-card 
                    flat
                    outlined
                    width="500">
                        
                        <v-row>
                            <v-col class="mx-5">
                                <v-text-field
                            name="School"
                            label="School"
                            id="school"
                            type="text"
                        ></v-text-field>
                        <v-text-field
                            name="Degree"
                            label="Degree"
                            id="degree"
                            type="text"
                        ></v-text-field>
                        <v-text-field
                            name="CompletedYear"
                            label="Completed Year"
                            id="completed"
                            type="month"
                        ></v-text-field>
                            </v-col>
                        </v-row>

                        <v-card-actions>
                            <v-btn color="success" text>Add Education</v-btn>
                        </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        
    </v-container>
</template>

<script>
    export default {
        name:'EducationList',
        data(){
            return{

            }
        }
    }
</script>

<style lang="scss" scoped>

</style>