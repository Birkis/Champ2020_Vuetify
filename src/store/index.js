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
    activityList: [
                   {activity:'Basketball', activityImg:'https://bit.ly/38201dI'},
                   {activity:'Yoga', activityImg:'https://bit.ly/38201dI'},
                   {activity:'Golf', activityImg:'https://bit.ly/38201dI'},
                   {activity:'Running', activityImg:'https://bit.ly/38201dI'},
                   {activity:'koding', activityImg:'https://bit.ly/38201dI'},
                   {activity:'klatring', activityImg:'https://bit.ly/38201dI'}
                  ],
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

  },//end mutations
  actions: {
 
      //henter sessions med onSnapshot - filtrerer ut sessions som allerede eksisterer i State
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
            }else{
              console.log('Session with title '+ foundItem.sessionTitle + ' already in the State')
            }
            //payload.push(res.data())
          })
        })
        commit('SET_SESSIONS', payload)
      },
      //henter ut users med onSnapshot - Filtrerer vekk brukere som allerede eksisterer i State
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
            }else{
              console.log('User with ID '+ foundItem.user_id + ' already in the database')
            }
            //payload.push(res.data())
            })//end forEach
        })
        commit('SET_USERS', payload)
      },
      getCategories({commit}){
        let payload = []
        db.collection('category').get().then( result => {
          result.forEach( data => {
            payload.push(data.data())
          })
        })
        commit('SET_CATEGORIES', payload)
      }, 


  }
})//ends Vuex.store

//La til GIT HUB
//git push origin master -f

//## HVORDAN LEGGE OPP TIL GIT ##
// git remote add origin <LINK>
// git push origin master
// git push <REMOTE> <BRANCH>
// git push origin master -f
