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
    loggedInUser:null,
    users:[],
    currentSession:{},
    categories:[],
    currentUser:{}
    
  },//end state
  mutations: {
      SET_SESSIONS(state, payload){
        state.sessions = payload
      },
      SET_USERS(state,payload){
        state.users = payload
      },
      SET_CATEGORIES(state, payload){
        state.categories = payload
      },
      SET_CURRENTUSER(state,payload){
        state.currentUser = payload 
      },
      RESET_CURRENTUSER(state,payload){
        state.currentUser = payload
      }
  },//end mutations
  actions: {
      getSessions({commit}){
        let payload = []      
        let ref = db.collection('sessions')
        ref.onSnapshot( snap =>{
          snap.forEach( res =>{
            const ID = res.data().session_id
            const foundItem = this.state.sessions.find( ({session_id}) => {
              return session_id === ID            
              })//end find
              if(foundItem===undefined){
                payload.push(res.data())
                }
              })
          commit('SET_SESSIONS', payload)
        })
        
      },
      getUsers({commit}){
        let payload = []
        let ref = db.collection('users')
        ref.onSnapshot( snap => {
          snap.forEach( res => {
            const ID = res.data().user_id
            const foundItem = this.state.users.find( ({user_id}) => {
              return user_id === ID            
              })//end find
            if(foundItem===undefined){
              payload.push(res.data())
                }
              })//end forEach
        commit('SET_USERS', payload)
        }) 
      },
      getCategories({commit}){
        let payload = []
        db.collection('category').get().then( result => {
          result.forEach( data => {
            payload.push(data.data())
            commit('SET_CATEGORIES', payload)
          })
        })
        
      },
      setCurrentUser({commit},user_id){
        let payload = null
        db.collection('users').doc(user_id).get().then( res => {
           payload = res.data()
           commit('SET_CURRENTUSER', payload)
          })   
      },
      resetCurrentUser({commit}){
        let payload = null
        commit('RESET_CURRENTUSER',payload)
      }
  }//end Actions 
})//ends Vuex.store

//La til GIT HUB
//git push origin master -f

//## HVORDAN LEGGE OPP TIL GIT ##
// git remote add origin <LINK>
// git push origin master
// git push <REMOTE> <BRANCH>
// git push origin master -f
