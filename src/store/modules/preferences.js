const state = () => ({
  selectedLanguage: "fr",
});

const getters = {
  getCurrentLanguage: (state) => {
    return state.selectedLanguage;
  },
};

const actions = {
  setCurrentLanguage(context) {
    context.commit("setCurrentLanguage");
  },
};

const mutations = {
  setCurrentLanguage(state, payload) {
    state.selectedLanguage = payload.language;
  },
};

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations,
};
