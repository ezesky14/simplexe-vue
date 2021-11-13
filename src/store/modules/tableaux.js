const state = () => ({
  all: [],
});

const getters = {};

const actions = {};

const mutations = {
  setTableaux(state, payload) {
    state.all = payload.tableaux;
  }
};

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations,
};
