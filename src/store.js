import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    patientSearchResult: {},
    snackbarColor: '',
    snackbarMessage: '',
    snackbarStatus: false,
  },
  mutations: {
    SET_PATIENT_SEARCH_RESULT(state, searchResult) {
      state.patientSearchResult = searchResult
    },
    SET_SNACKBAR_COLOR(state, color) {
      state.snackbarColor = color
    },
    SET_SNACKBAR_MESSAGE(state, message) {
      state.dialogMessage = message
    },
    SET_SNACKBAR_STATUS(state, status) {
      state.dialogStatus = status
    }
  },
  actions: {
    setPatientResult({
      commit
    }, searchResult) {
      commit('SET_PATIENT_SEARCH_RESULT', searchResult)
    },
    setSnackbarColor({
      commit
    }, color) {
      commit('SET_SNACKBAR_COLOR', color)
    },
    setSnackbarMessage({
      commit
    }, message) {
      commit('SET_SNACKBAR_MESSAGE', message)
    },
    setSnackbarStatus({
      commit
    }, status) {
      commit('SET_SNACKBAR_STATUS', status)
    }
  },
  getters: {
    patientResult: state => state.patientSearchResult,
    snackbarColor: state => state.snackbarColor,
    snackbarMessage: state => state.snackbarMessage,
    snackbarStatus: state => state.snackbarStatus
  }
})