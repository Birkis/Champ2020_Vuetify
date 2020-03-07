<template>
  <v-container>
      <v-container>
          <v-chip-group column>
            <v-row justify="start">
                <v-col v-for="tag in user.interests" :key="tag" cols="2">
                        <v-chip class="mx-1" >{{tag}}</v-chip>
                </v-col>
            </v-row>
      </v-chip-group>
      </v-container>
      <v-divider></v-divider>
      <v-container>
        <v-row>
            <v-col>
                <p class="grey--text">Motto</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <p>{{user.motto}}</p>
            </v-col>
        </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-container>
        <v-row>
            <v-col>
                <p class="grey--text">Education</p>
            </v-col>
        </v-row>
        <v-row v-for="(school,index) in schools" :key="index">
            <v-col>
                <v-list-item two-line>
                        <v-list-item-content >
                            <v-list-item-title>{{school.name}}</v-list-item-title>
                            <v-list-item-subtitle v-if="school.certified"><v-icon>mdi-check</v-icon></v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
            </v-col>
        </v-row>
      </v-container>

  </v-container>
</template>

<script>
/* eslint-disable no-unused-vars */
export default {
    name:'ProfileContent',
    props:['user'],
    data(){
        return{
            motto:'Det er i oppoverbakke det blir vanskelig',
            tags:['moro','klatring','Xbox','koding','piano'],
            schools:[
                {
                name:'AFPT',
                certified:true,
                },
                {
                name:'Iderettshøyskolen',
                certified:true,
                },
                ]
        }
    }

}
</script>

<style>

</style>