<template>
<v-content class="" > 
    <v-layout justify-center>
        <h1 class="display-1" justify-center>Edit Your Profile</h1>
    </v-layout>   
    <v-container>
       <v-form v-model="valid"> 
            <v-layout row wrap justify-space-around>
                <v-flex xs12 md5> <!-- Name & Email input Collapsed Code -->
                            <v-container> <!-- Diverse input fields -->
                                <v-layout row wrap>   <!-- firstname, lastname, email -->
                                    <v-text-field
                                        v-model="firstname"
                                        :rules="nameRules"
                                        :counter="10"
                                        label="First name"
                                        required
                                    ></v-text-field>   <!-- firstname -->                        
                                    <v-text-field
                                        v-model="lastname"
                                        :rules="nameRules"
                                        :counter="10"
                                        label="Last name"
                                        required
                                    ></v-text-field> <!-- lastname -->
                                    <v-text-field
                                        v-model="email"
                                        :rules="emailRules"
                                        label="E-mail"
                                        required
                                    ></v-text-field> <!-- email -->
                                </v-layout>
                                <v-combobox
                                v-model="gender_model"
                                :items="gender_options"
                                :search-input.sync="gender_search"
                                hide-selected
                                hint="Set your gender"
                                label="Where do you identify?"
                                persistent-hint
                                small-chips
                                >  <!-- gender -->
                                    <template v-slot:no-data>
                                        <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-title>
                                            No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new one
                                            </v-list-item-title>
                                        </v-list-item-content>
                                        </v-list-item>
                                    </template>
                                </v-combobox>
                            </v-container>
                            <v-container fluid> <!--  Add some Tags Collapsed code  -->
                                <v-combobox
                                                v-model="model"
                                                :items="items"
                                                :search-input.sync="search"
                                                hide-selected
                                                hint="Maximum of 5 tags"
                                                label="Add some tags to your profile"
                                                multiple
                                                persistent-hint
                                                small-chips
                                                >
                                                <template v-slot:no-data>
                                                    <v-list-item>
                                                    <v-list-item-content>
                                                        <v-list-item-title>
                                                        No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new one
                                                        </v-list-item-title>
                                                    </v-list-item-content>
                                                    </v-list-item>
                                                </template>
                                </v-combobox>
                            </v-container>  
                            <v-container>  <!-- DOB Picker -->
                                <v-menu
                                    ref="menu"
                                    v-model="menu"
                                    :close-on-content-click="false"
                                    :return-value.sync="dob"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                    >
                                    <template v-slot:activator="{ on }">
                                            <v-text-field
                                            v-model="dob"
                                            label="Set your date of birth"
                                            readonly
                                            v-on="on"
                                            ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="dob" no-title scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.menu.save(dob)">OK</v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </v-container>               
                </v-flex>    
                <v-flex xs12 md5> <!-- Add Bio -->
                            <v-textarea
                                name="input-7-1"
                                label="Bio"
                                placeholder="Fill this space with something ingenious"
                                hint="Write a few words about yourself"
                                ></v-textarea>
                            <v-text-field
                                        v-model="motto"
                                        :rules="mottoRules"
                                        :counter="60"
                                        label="motto"
                            ></v-text-field> 


                </v-flex>
            </v-layout>
        </v-form>
    </v-container>  
</v-content> 
</template>


<script>
export default {
    name:'EditProfile',
    data(){
        return{

            items: ['indoor', 'outdoor', 'gym', 'fitness','professional','amateur','noob','enthusiast','team sports','mindfulness'],
            model: [],
            search: null,
            valid: false,
            menu:false,
            firstname: '',
            lastname: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 10 || 'Name must be less than 10 characters',
            ],
            mottoRules: [
                v => v.length <= 60 || 'Motto must be less than 40 characters',
            ],
            dob: new Date().toISOString().substr(0, 10),
            located:null,
            gender_options:['Male','Female','None of yo business','Somewhere in between'],
            gender_model:[],
            gender_search: null,
            gender_valid:false,
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            isTrainer:false,
            motto:'',
            trainsAt:[],
            reviews:[ {rating:5, description:'Elsket det!',reviewer:'Jens Jensen'} ]

        }
    },
    watch: {
      model (val) {
        if (val.length > 5) {
          this.$nextTick(() => this.model.pop())
        }
      },
    },
}
</script>

<style scoped>



</style>
