const state = () => ({
  id: null,
  e1x1: null,
  e1x2: null,
  e1x3: null,
  e1b: null,
  e2x1: null,
  e2x2: null,
  e2x3: null,
  e2b: null,
  e3x1: null,
  e3x2: null,
  e3x3: null,
  e3b: null,
  zx1: null,
  zx2: null,
  zx3: null,
  type_simplexe: "Maximisation a trois variables",
  nb_tableau: null,
});

const getters = {
  getValue: (state) => (key) => {
    return state[key];
  },
  getTypeSimplexe: (state) => {
    return state.type_simplexe;
  },
  getNombreTableau: (state) => {
    return state.nb_tableau;
  },
};

const actions = {};

const mutations = {
  setValue(state, payload) {
    const { fieldKey, value } = payload;
    state[fieldKey] = value;
  },
  setTypeSimplexe(state, typeSimplexe) {
    state.type_simplexe = typeSimplexe;
  },
  setNombreTableau(state, value) {
    state.nb_tableau = value;
  },
  setId(state, id) {
    state.nb_tableau = id;
  },
  setProgrammeLineaire(state, programmeLineaire) {
    for (const property in programmeLineaire) {
      state[property] = programmeLineaire[property];
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
