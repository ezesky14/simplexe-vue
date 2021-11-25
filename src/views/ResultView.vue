<template>
  <div class="result-view">
    <div class="result-title">
      <span class="breadcrumb"
        ><router-link class="menu-item" to="/">
          <font-awesome-icon
            icon="home"
            size="1x"
            class="icon"
          />Accueil</router-link
        ></span
      >
      /
      <span class="breadcrumb-active">
        <font-awesome-icon
          icon="calculator"
          size="1x"
          class="icon"
        />Resultats</span
      >
    </div>

    <dynamic-tableau
      v-bind:current-tableau-index="currentTableauPosition"
    ></dynamic-tableau>

    <tableau-pagination
      v-bind:tableau-button-length="nbTableau"
      v-bind:change-current-tableau="setCurrentTableau"
    ></tableau-pagination>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { getProgrammeLineaire } from "../services/programme-lineaire.service";
import DynamicTableau from "./../components/DynamicTableau.vue";
import TableauPagination from "./../components/TableauPagination.vue";

export default {
  name: "result-view",
  components: {
    DynamicTableau,
    TableauPagination,
  },
  data() {
    return { programmeLineaireID: null, currentTableauPosition: 0 };
  },
  computed: {
    nbTableau: {
      get() {
        return this.$store.state.programmeLineaire.nb_tableau;
      },
      set(value) {
        this.$store.commit("setNombreTableau", value);
      },
    },
  },
  methods: {
    ...mapMutations([
      "setProgrammeLineaire",
      "setTableaux",
      "setColonnesTableau",
      "setInterpretation",
    ]),

    setCurrentTableau(position) {
      this.currentTableauPosition = position;
    },
  },
  created() {
    this.programmeLineaireID = this.$route.params.id;

    if (process.env.VUE_APP_BACKEND_AVAILABLE === "true") {
      getProgrammeLineaire(this.programmeLineaireID).then((response) => {
        this.setProgrammeLineaire(response.data.programmeLineaire);
        this.setTableaux(response.data);
        this.setColonnesTableau(response.data);
        this.setInterpretation(response.data);
      });
    } else {
      if ( this.$store.state.programmeLineaire.id === null) {
        this.$router.push("/");
      }
    }
  },
};
</script>

<style scoped>
.result-view {
  padding: 10px;
}

.result-title {
  margin: 20px;
}
</style>
