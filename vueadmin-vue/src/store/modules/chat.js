import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  state: {
    chatHistory:[]
  },

  mutations: {
    setchatHistory(state,chatHistory){
        state.chatHistory = chatHistory
        localStorage.setItem('chatHistory',JSON.stringify(chatHistory))
    },

    resetState(state){
        state.chatHistory = []
    }
  },

  actions: {
  },

}