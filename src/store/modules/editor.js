/* eslint-disable no-unused-vars */
const BIG_FONT_SIZE_DEFAULT = 24;
const SMALL_FONT_SIZE_DEFAULT = 16;
const LINE_HEIGHT_DEFAULT = 6;
const FONT_FAMILY_DEFAULT = "";

const state = () => ({
  bigFont: BIG_FONT_SIZE_DEFAULT,
  smallFont: SMALL_FONT_SIZE_DEFAULT,
  lineHeight: LINE_HEIGHT_DEFAULT,
  fontFamily: "Calibri",
  currentTab: "ContentCV",
  oSelection: null,
  sFormat: [],
  sJustify: null,
  editting: false
});

const getters = {};

const mutations = {
  fontIncrease(state) {
    state.bigFont += 4;
    state.smallFont += 4;
  },
  fontDecrease(state) {
    state.bigFont -= 4;
    state.smallFont -= 4;
  },
  fontDefault(state) {
    state.bigFont = BIG_FONT_SIZE_DEFAULT;
    state.smallFont = SMALL_FONT_SIZE_DEFAULT;
  },
  heightDecrease(state) {
    state.lineHeight -= 4;
  },
  heightDefault(state) {
    state.lineHeight = LINE_HEIGHT_DEFAULT;
  },
  heightIncrease(state) {
    state.lineHeight += 4;
  },
  changeFontFamily(state, fontFamily) {
    state.fontFamily = fontFamily;
  },
  changeTab(state, tab) {
    state.currentTab = tab;
  },
  changeSFormat(state, sFormat) {
    state.sFormat = [...sFormat];
  },
  changeSJusitfy(state, sJustify) {
    state.sJustify = sJustify;
  },
  changeOSelection(state, oSelection) {
    state.oSelection = oSelection;
  },
  changeEditting(state, status) {
    state.editting = status;
  }
};

const actions = {
  fontIncrease({ state, commit }, data) {
    commit("fontIncrease");
  },
  fontDecrease({ state, commit }, data) {
    commit("fontDecrease");
  },
  fontDefault({ state, commit }, data) {
    commit("fontDefault");
  },
  heightDecrease({ state, commit }, data) {
    commit("heightDecrease");
  },
  heightDefault({ state, commit }, data) {
    commit("heightDefault");
  },
  heightIncrease({ state, commit }, data) {
    commit("heightIncrease");
  },
  changeFontFamily({ state, commit }, fontFamily) {
    commit("changeFontFamily", fontFamily);
  },
  changeTab({ state, commit }, tab) {
    commit("changeTab", tab);
  },
  changeSFormat({ state, commit }, sFormat) {
    commit("changeSFormat", sFormat);
  },
  changeSJusitfy({ state, commit }, sJustify) {
    commit("changeSJusitfy", sJustify);
  },
  changeOSelection({ state, commit }, oSelection) {
    commit("changeOSelection", oSelection);
  },
  changeEditting({ state, commit }, status) {
    commit("changeEditting", status);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
