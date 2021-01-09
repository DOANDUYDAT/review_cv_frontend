/* eslint-disable no-unused-vars */
const state = () => ({
  // cvId: 0,
  // userId: 0,
  // content: [],
  // link: "",
  // createdAt: null,
  // updatedAt: null,
  // name: ""
  cv: {},
  loading: false,
  error: null,
  command: ""
});
const getters = {
  data: state => state.cv,
  loading: state => state.loading,
  error: state => state.error,
  command: state => state.command
};
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
  setError(state, error) {
    state.error = error;
  },
  setCommand(state, command) {
    state.command = command;
  },
  incrementOrder(state, order) {
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
    const categoryItem = state.cv.content.filter(
      item => item.order == order
    )[0];
    categoryItem.isShow = !categoryItem.isShow;
  },
  updateCategoryItem(state, data) {
    const { type } = data;
    let categoryItem = state.cv.content.find(item => item.type == type);
    categoryItem = JSON.parse(JSON.stringify(data));
  },
  updateContentCv(state, data) {
    let contentCvItem = state.cv.content.find(
      item => item.order === data.order
    );
    console.log("payload: ", data);
    contentCvItem = JSON.parse(JSON.stringify(data));
    // contentCvItem.content = [];
    console.log("content Item: ", contentCvItem);
  }
};
/*eslint no-useless-catch: "error"*/
async function http(url, method = "GET", data) {
  try {
    const response = await fetch(url, {
      method,
      data
    });
    return await response.json();
  } catch (error) {
    console.log("Error ");
    throw error;
  }
}

const actions = {
  initState({ state, commit }, cv) {
    commit("setState", cv);
  },
  createCommand({ state, commit }, command) {
    commit("setCommand", command);
  },
  incrementOrder({ state, commit }, order) {
    commit("incrementOrder", order);
  },
  decrementOrder({ state, commit }, order) {
    commit("decrementOrder", order);
  },
  hiddenCategory({ state, commit }, order) {
    commit("hiddenCategory", order);
  },
  getListCV({ state, commit }) {
    return new Promise((resolve, reject) => {
      http("https://google.com")
        .then(({ data }) => {
          commit("setState", data);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  updateCategoryData({ state, commit }, data) {
    commit("updateCategoryItem", data);
  },
  updateContentCv({ state, commit }, data) {
    commit("updateContentCv", data);
  }
  // exec(command, arg) {
  //   document.execCommand(command, false, arg);
  // }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
