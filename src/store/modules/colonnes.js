const state = () => ({
    all: [],
  });
  
  const getters = {};
  
  const actions = {
    
  };
  
  const mutations = {

    setColonnesTableau(state, payload) {
      state.all = payload.colonnesTableaux;
    }
  };
  
  export default {
    namespace: true,
    state,
    getters,
    actions,
    mutations,
  };
  