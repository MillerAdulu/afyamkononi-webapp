import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    patientSearchResult: {}
  },
  mutations: {
    SET_PATIENT_SEARCH_RESULT(state, searchResult) {
      state.patientSearchResult = searchResult
    }
  },
  actions: {
    setPatientResult({
      commit
    }, searchResult) {
      commit('SET_PATIENT_SEARCH_RESULT', searchResult)
    },
  },
  getters: {
    patientResult: state => state.patientSearchResult
  }
})