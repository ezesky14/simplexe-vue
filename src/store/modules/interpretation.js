const state = () => ({
  id: "",
  zmax: "",
  e1: "",
  e2: "",
  e3: "",
  x1: "",
  x2: "",
  x3: "",
  programme_lineaireId: "",
});

const getters = {};

const actions = {};

const mutations = {
  setInterpretation(state, payload) {
    const { interpretation } = payload;
    for (const property in interpretation) {
      state[property] = interpretation[property];
    }
  },
};

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations,
};
