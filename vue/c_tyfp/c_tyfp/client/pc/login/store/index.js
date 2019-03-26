import Vue from 'vue'
import Vuex from 'vuex'
import paramsEpay from './modules/paramsEpay'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    paramsEpay
  }
})
