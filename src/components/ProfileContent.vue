<template>
  <v-container>
      <v-container>
           <v-row justify="start">
          <v-col v-for="tag in tags" :key="tag" cols="3">
              <v-chip-group column>
                  <v-chip>{{tag}}</v-chip>
              </v-chip-group>
          </v-col>
      </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-container>
        <v-row>
            <v-col>
                <v-subheading class="grey--text">Motto</v-subheading>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <p>{{motto}}</p>
            </v-col>
        </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-container>
        <v-row>
            <v-col>
                <v-subheading class="grey--text">Education</v-subheading>
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