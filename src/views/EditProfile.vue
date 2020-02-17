<template>
    <v-container fluid>
        <v-row> <!-- Heading -->
            <v-col>
               <v-text class="display-1">Edit your profile here</v-text>
            </v-col>
        </v-row>
        <v-form> <!-- All Form Inputs -->
            <v-row> <!-- Edit Name and Email -->
                <v-col cols="12" sm="6" m4="4">
                    <v-text-field label="First Name" type="text"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" m4="4">
                    <v-text-field label="Last Name" type="text"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" m4="4">
                    <v-text-field label="Email" type="email"></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field label="Post code" type="number"></v-text-field>
                </v-col>
            </v-row>
            <v-row align="center"> <!-- Edit Personals -->
               <v-col name="gender"> <!-- set gender -->
                   <v-autocomplete dense :items="genderItems" label="Set Gender" v-model="genderValue">
                   </v-autocomplete>
               </v-col>
                <v-col> <!-- Date of Birth -->
                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="290px">
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                    v-model="date"
                                    label="Set Birthday"
                                    readonly
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                            ref="picker"
                            v-model="date"
                            :max="new Date().toISOString().substr(0, 10)"
                            min="1950-01-01"
                            @change="save"
                            ></v-date-picker>
                        </v-menu>
                </v-col>
            </v-row>
            <v-row> <!-- select interestd -->
                <v-col>
                    <v-autocomplete dense chips :items="interestItems" label="Set interests" v-model="interestValues" multiple outlined>
                    </v-autocomplete>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6" m4="4"><v-text-field type="text" placeholder="Never surrender, never say die" label="My motto"></v-text-field></v-col>
                <v-col cols="12" sm="6" m4="4"><v-text-field type="text" placeholder="Be happy, or die trying" label="My goal"></v-text-field></v-col>
            </v-row>
            <v-row> <!-- For Trainers -->
                <v-col>
                    <v-switch label="I'm a personal trainer"> </v-switch>
                </v-col>
            </v-row>
            <v-row> <!-- Submit button -->
                <v-col> 
                    <v-btn color="deep-orange" class="white--text" depressed>Update Info</v-btn>
                </v-col>
            </v-row>
         </v-form>
    </v-container>  
</template>


<script>
export default {
    name:'EditProfile',
    data(){
        return{
            genderItems:['male','female','not your business'],
            genderValue:null,
            interestItems:['basketball', 'yoga', 'running', 'windsurfing', 'bodybuilding','golf','Lacrosse'],
            interestValues:null,
            date:null,
            menu:false,


        }
    },
    watch: {
      model (val) {
        if (val.length > 5) {
          this.$nextTick(() => this.model.pop())
        }
      },
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
    },
    methods: {
      save (date) {
        this.$refs.menu.save(date)
      },
    },
}
</script>



<style scoped>



</style>
