/* eslint-disable no-unused-vars */
const state = cv => cv;
const getters = {};
const mutations = {
  setState(state, cv) {
    state = cv;
  }
};
const actions = {
  initState({ state, commit }, cv) {
    commit("setState", cv);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
