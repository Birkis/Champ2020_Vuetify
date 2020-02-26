<template>
  <v-content>
      <h1 class="display-1" justify-start >Create Session Here</h1>
    <v-form>
         <v-container>
            <v-row> <!--  Title -->
                <v-col> 
                    <v-text-field label="Session Title" type="text"></v-text-field>
                </v-col>
            </v-row>
            <v-row> <!--  Descriotion -->
                <v-col>
                    <v-text-field label="Description" type="text"></v-text-field>
                </v-col>
            </v-row>
            <v-row> <!--  Activity -->
                <v-col>
                    <v-autocomplete dense :items="activities" label="Activity" v-model="activity"></v-autocomplete>
                </v-col>
            </v-row>
            <v-row> <!--  Start Time & Duration -->
                <v-col>
                    <v-text-field label="Start date" placeholder="21/10"></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field label="Start time" placeholder="17:30"></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field label="Duration" type="number"></v-text-field>
                </v-col>
        
            </v-row>
            <v-row> <!-- People & Price -->
                <v-col>
                    <v-text-field label="How many people" type="number"></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field label="Price" type="number"></v-text-field>
                </v-col>
            </v-row>
            <v-row> <!-- Location -->
                <v-col>
                    <gmap-autocomplete class="gPlaces" @place_changed="setPlace"></gmap-autocomplete>
                </v-col>
            </v-row>
            <v-row> <!-- Tags -->
                <v-col>
                    <v-autocomplete  chips :items="interests" label="Add tags" v-model="interestValues" multiple outlined>
                        </v-autocomplete>
                </v-col>
            </v-row>
        </v-container>
    <v-container> <!-- Create Session Button-->
        <v-row>
            <v-col>
                <v-btn color="deep-orange" class="white--text" @click.prevent="logValues" depressed>
                    Create Session
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
    </v-form>
   

  </v-content>
</template>


<script>
export default {
    name:'CreateSession',
    data(){
        return{
            //activityItems:['Basketball', 'Yoga', 'Running'],
            activity: null,
            interestValues: null,
            selectedPlace: null,
            geoLocation: {
                lat:null,
                lng:null
            }
        }
    },
    methods: {
        setPlace(place) {
            this.selectedPlace = place;
            this.geoLocation.lat = place.geometry.location.lat()
            this.geoLocation.lng = place.geometry.location.lng()
        },
        logValues(){
            console.log(this.geoLocation.lat)
        }
    },
    computed: {
        interests(){
            return this.$store.state.interests
        },
        activities(){
            const activities = []
            this.$store.state.activityList.forEach(res =>{
                activities.push(res.activity)
            })
            return activities
        }

    }    
}
</script>

<style scoped>

 .gPlaces{
     color:black;
     width: 100%;
     padding: 10px;
 }

</style>