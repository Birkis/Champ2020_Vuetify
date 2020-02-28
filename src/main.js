import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import * as VueGoogleMaps from "vue2-google-maps";
import SessionCard from '@/components/SessionCard'

Vue.component('SessionCard', SessionCard)

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCOJ6qYzF-NgOqmzSaw2ffWFRComuU-QyQ",
    libraries: "places" // necessary for places input
  }
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
