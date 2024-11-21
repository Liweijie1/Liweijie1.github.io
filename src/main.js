import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.filter("formatTime",(value)=>{
  if(!value){
    return "00:00"
  }
  return String(Math.floor(value/60)).padStart(2,"0") + ":" + String(Math.floor(value%60)).padStart(2,"0")
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
