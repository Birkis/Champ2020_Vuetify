<template>
    <v-container grid-list-xs>
        <v-row justify="center">
            <v-col cols="12" >
                <v-card 
                    flat
                    outlined
                    >
                        
                        <v-row class="px-8">
                            <v-col cols="12" sm="5">
                                <v-text-field
                            name="School"
                            label="School"
                            id="school"
                            type="text"
                            v-model="eduItem.school"
                        ></v-text-field></v-col>
                        <v-col cols="12" sm="5" >
                            <v-text-field
                            name="Degree"
                            label="Degree"
                            id="degree"
                            type="text"
                            v-model="eduItem.degree"
                            ></v-text-field>
                        
                        </v-col>
                        <v-col cols="12" sm="2" >
                            <v-text-field
                            name="CompletedYear"
                            label="Completed Year"
                            id="completed"
                            type="month"
                            v-model="eduItem.completed"
                            ></v-text-field>
                      
                        </v-col>      
                        </v-row>

                        <v-card-actions>
                            <v-btn class="ml-5 teal lighten-4 mb-3" text @click.prevent="addEducation" >Add Education</v-btn>
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
                eduItem:{
                    school:'',
                    degree:'',
                    completed:null
                }
                
            }
        },
        methods:{
            addEducation(){
                this.$emit('addEducation', this.eduItem)
                this.eduItem={}
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>