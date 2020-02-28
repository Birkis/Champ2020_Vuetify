<template>
 <v-content >
     <SessionCard/>
  </v-content>
</template>


<script>
// import firebase from 'firebase'
import SessionCard from '@/components/SessionCard'
import db from '@/firebase/init' 

export default {
    name:'SessionsList',
    components:{
        SessionCard
    },
    data(){
        return{
            sessions:[],
            session_ids:[],
            name:null,
            email:null,
            locAtt:[]
        }
    },
    created(){
        db.collection('sessions').get().then(res => {
            res.forEach(doc => {
                db.collection('sessions').doc(doc.id).set({session_id:doc.id},{merge:true});             
            })
        })
        db.collection('sessions').get().then(res=>{
            res.forEach(doc => this.sessions.push(doc.data())
            )
        }) 
    },
    mounted(){
        // let user = db.collection('users').doc(firebase.auth().currentUser.uid).get().then( res => {
        //     this.name = res.data().name
        //     this.email = res.data().email
        //     });
        
        
      
    }
}
</script>