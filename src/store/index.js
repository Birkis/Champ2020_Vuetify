/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import db from '@/firebase/init'

Vue.use(Vuex)


export default new Vuex.Store({
  
  state: {
    sessions:[],
    interests:['basketball', 'yoga', 'running', 'windsurfing', 'bodybuilding','golf','Lacrosse','Strength','Pumping Iron', 'Rugby'],
    genderTypes: ['male','female','not your business'],
    activityList: [{activity:'Basketball', activityImg:'https://bit.ly/38201dI'},
                   {activity:'Yoga', activityImg:'https://bit.ly/38201dI'},
                   {activity:'Golf', activityImg:'https://bit.ly/38201dI'},
                   {activity:'Running', activityImg:'https://bit.ly/38201dI'}],
    loggedInUser:null
    
  },//end state
    
  mutations: {
    createSession (state, payload) {
    state.sessions.push(payload)
    },
    loadSessions(state, payload){
      state.sessions = payload
    },
  },
  actions: {
    createSession ({commit}, payload) {
      const sessions = {
        sessionTitle: payload.sessionTitle,
        hostName: payload.hostName,
        sessionDescription: payload.sessionDescription
      }
      commit('createSession', sessions)
    },
    getSessions({commit}){
      let loadedSessions = []
      db.collection('sessions').get().then(res => {
        res.forEach(doc => {
            db.collection('sessions').doc(doc.id).set({session_id:doc.id},{merge:true});             
        })
      })
      db.collection('sessions').get().then( data => {
        //data.forEach(doc => console.log(doc.data()))
        data.forEach(doc => loadedSessions.push(doc.data()))
      })
      commit('loadSessions', loadedSessions)
    },
  },
  modules: {
  }
})


// lage en action som laster ned alle sessions fra Firebase. 
// sende de til en mutation som setter State

// db.collection('sessions').get().then(res => {
//   res.forEach(doc => {
//       db.collection('sessions').doc(doc.id).set({session_id:doc.id},{merge:true});             
//   })
// })
// db.collection('sessions').get().then(res=>{
//   res.forEach(doc => this.sessions.push(doc.data())
//   )
// }) 