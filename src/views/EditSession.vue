
<template>
    <v-container>
        <v-text-field
            name="title"
            label="Session Title"
            id="title"
        ></v-text-field>
        <v-text-field
            name="description"
            label="Description"
            id="description"
        ></v-text-field>
        <v-text-field
            name="name"
            label="label"
            id="id"
        ></v-text-field>
    </v-container>
</template>

<script>
// JEG VENTER LITT MED Å FULLFØRE DENNE VIEWEN. ER USIKKER PÅ OM BRUKER SKAL KUNNE REDIGERE EN SESSION

export default {
        name:'Edit Session',
        data(){
            return{

            }
        },
        computed:{
        },
        methods:{
        }
    }
</script>

<style lang="scss" scoped>

</style>