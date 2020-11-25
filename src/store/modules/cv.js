/* eslint-disable no-unused-vars */
const state = () => ({
  // cvId: 0,
  // userId: 0,
  // content: [],
  // link: "",
  // createdAt: null,
  // updatedAt: null,
  // name: ""
  cv: {}
});
const getters = {};
const mutations = {
  setState(state, cv) {
    const { cvId, userId, content, name, link, createdAt, updatedAt } = cv;
    // console.log(state)
    // state.cvId = cvId;
    // state.userId = userId;
    // state.content = content;
    // state.link = link;
    // state.name = name;
    // state.createdAt = createdAt;
    // state.updatedAt = updatedAt;
    state.cv = cv;
  },
  incrementOrder(state, order) {
    debugger;
    const length = state.cv.content.length;
    if (order != length) {
      // const nextItem = state.cv.content.filter(e => e.order === nextOrder);
      const nextOrder = order + 1;
      state.cv.content.forEach(e => {
        if (e.order === order) {
          e.order++;
        } else if (e.order === nextOrder) {
          e.order--;
        }
      });
      // content
      // for(let i=0; i< state.cv.content)
    }
  },
  decrementOrder(state, order) {
    if (order > 1) {
      const previousOrder = order - 1;
      // const previousItem = state.cv.content.filter(e => e.order === previousOrder);
      state.cv.content.forEach(e => {
        if (e.order === previousOrder) {
          e.order++;
        } else if (e.order === order) {
          e.order--;
        }
      });
    }
  },
  hiddenCategory(state, order) {
    debugger;
    const categoryItem = state.cv.content.filter(
      item => item.order == order
    )[0];
    categoryItem.isShow = !categoryItem.isShow;
  }
};
const actions = {
  initState({ state, commit }, cv) {
    commit("setState", cv);
  },
  incrementOrder({ state, commit }, order) {
    commit("incrementOrder", order);
  },
  decrementOrder({ state, commit }, order) {
    commit("decrementOrder", order);
  },
  hiddenCategory({ state, commit }, order) {
    commit("hiddenCategory", order);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
