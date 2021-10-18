import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    budget: "",
    msg: "",
    rest: "",
  },

  // 定义一些对于state的操作，类似于组件中的methods, 只能通过 commit 触发，不能手动调用。
  // 接收 state 和 payload 参数。
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

  // 异步函数
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
