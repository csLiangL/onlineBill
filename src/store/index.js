import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    budget: "",
    msg: "",
    rest: "",
  },
  mutations: {
    clearMsg(state) {
      state.msg = "";
    },
    setBudget(state, payload) {
      state.budget = payload.budget;
    },
    setRest(state, payload) {
      state.rest = payload.rest;
    }
  },
  actions: {

    // 设置状态，并在2s后消失
    setMsg(context, payload) {
      context.state.msg = payload.msg
      setTimeout(() => {
        context.commit("clearMsg");
      }, 2000)
    },
  },
  modules: {
  }
})
