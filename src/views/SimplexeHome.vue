<template>
  <div class="simplexe-home-container">

     <div class="home-title">
      <span class="breadcrumb-active"
        >
          <font-awesome-icon
            icon="home"
            size="1x"
            class="icon"
          />Accueil
        </span
      >
    </div>

    <div class="alert-info">
      Veuillez selectionner le type de calcul que vous souhaitez
    </div>
    <div class="bloc1">
      <div class="chooser-type">
        <select class="dropdown" @change="reload()" v-model="typeSimplexe">
          <option v-for="type in simplexeTypeList" :key="type">
            {{ type }}
          </option>
        </select>
      </div>
    </div>

    <maxi-form-dynamic
      v-bind:type-simplexe="typeSimplexe"
      :key="times"
    ></maxi-form-dynamic>
  </div>
</template>

<script>
import { SimplexeType } from "@/core/enum/simplexe-type.enum";
import MaxiFormDynamic from "../components/MaxiFormDynamic.vue";
import { mapMutations } from "vuex";
export default {
  name: "simplexe-home",
  components: {
    MaxiFormDynamic,
  },
  data() {
    return {
      simplexeTypeList: Object.values(SimplexeType),
      times: 0,
    };
  },
  computed: {
    typeSimplexe: {
      get() {
        return this.$store.state.programmeLineaire.type_simplexe;
      },
      set(value) {
        this.$store.commit("setTypeSimplexe", value);
      },
    },
  },
  methods: {
    ...mapMutations(["setTypeSimplexe"]),
    reload() {
      this.times++;
    },
  },
};
</script>

<style>
@media only screen and (max-width: 400px) {
}

@media only screen and (min-width: 401px) and (max-width: 1200px) {
  .simplexe-home-container {
    padding: 60px;
  }
}

@media only screen and (min-width: 1200px) {
  .simplexe-home-container {
    padding: 60px;
  }
}

.alert-info {
  text-align: center;
}
.bloc1 {
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
}

.chooser-type {
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.home-title {
  padding-bottom: 20px;
}
</style>
