import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sessions:[
      {sessionTitle:'Yoga i parken',
      sessionHost:'Marianne Birkeland',
      sessionDescription:'En kort beskrivelse av yoga',                
      },
      {sessionTitle:'Boksing i kjelleren',
      sessionHost:'Michael Birkeland',
      sessionDescription:'En kort beskrivelse av boksing',                
      },
      {sessionTitle:'Løping i skogen',
      sessionHost:'Shanti Birkeland',
      sessionDescription:'En kort beskrivelse av løping',                
      }
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
