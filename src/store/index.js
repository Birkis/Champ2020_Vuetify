import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sessions:[
      {id:1, title:'yoga in the park', host:'Marianne Birkeland'},
      {id:2, title:'Street Basket', host:'Michael Birkeland'},
      {id:3, title:'Fortnite Heroes', host:'Mio Birkeland'}
    ],
    interests:['basketball', 'yoga', 'running', 'windsurfing', 'bodybuilding','golf','Lacrosse','Strength','Pumping Iron', 'Rugby'],
    genderTypes: ['male','female','not your business'],
    activityList: [{activity:'Basketball', activityImg:'https://bit.ly/38201dI'},
                   {activity:'Yoga', activityImg:'https://bit.ly/38201dI'},
                   {activity:'Golf', activityImg:'https://bit.ly/38201dI'},
                   {activity:'Running', activityImg:'https://bit.ly/38201dI'} ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
