import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  state: {
    permList:[],
    menuList:[],
    authoritys:[],
    hasRoutes:false,
    editableTabsValue: 'Index',
    editableTabs: [{
    title: '首页',
    name: 'Index'
    }],
  },

  mutations: {
    setMenuList(state,menuList){
        state.menuList = menuList

    },

    setPermitList(state,authoritys){
        state.authoritys = authoritys
        state.permList = authoritys
    },

    changeRouteStatus(state,hasRoutes){
        state.hasRoutes = hasRoutes
    },

    addTab(state,tab){

      let index = state.editableTabs.findIndex(e => e.name === tab.name)

      if(index === -1){
        state.editableTabs.push({
          title:tab.title,
          name:tab.name
        })
      }
      state.editableTabsValue = tab.name
    },

    resetState(state){
      state.permList = '',
      state.menuList = '',
      state.authoritys = '',
      state.hasRoutes = false,
      state.editableTabsValue = 'Index',
      state.editableTabs = [{
      title: '首页',
      name: 'Index'
      }]
    }
  },

  actions: {
  },

}