import Vue from "vue";
import Vuex from "vuex";

import programmeLineaire from "./modules/programmeLineaire";
import tableaux from "./modules/tableaux";
import colonnes from "./modules/colonnes";
import interpretation from "./modules/interpretation";
import preferences from "./modules/preferences";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

const store = new Vuex.Store({
modules: {
    preferences,
    programmeLineaire,
    tableaux,
    colonnes,
    interpretation,
  },
  strict: debug,
});

export default store;
