<template id="dynamic-tableau">
  <div class="dynamic-tableau-container">
    <div class="simplexe-row">
      <span class="simplexe-cel">VDB/VHB</span>

      <span
        class="simplexe-cel table-label"
        v-for="(vdbLabel, index) in vdbLabelArray"
        :key="index"
        >{{ vdbLabel }}</span
      >

      <span class="simplexe-cel table-label">B</span>
      <span class="simplexe-cel table-label">R</span>
    </div>

    <div
      class="simplexe-row"
      v-for="(col, rowIndex) in transformedColonnes"
      :key="rowIndex"
    >
      <span class="simplexe-cel table-label">{{
        vhbLabelArray[rowIndex]
      }}</span>

      <span
        class="simplexe-cel table-value"
        v-for="(value, colIndex) in col"
        v-bind:class="{
          pivot: value.positionValue === currentTableau.pivot,
          'v-entrante': value.positionValue === currentTableau['v_entrante'],
          'v-sortante':
            (value.vhbValue + value.vdbValue).toLowerCase() ===
            currentTableau['v_sortante'],
        }"
        :key="colIndex"
        >{{ value.value }}</span
      >
    </div>

    <div v-show="isLast">
      <interpretation
        :interpretation="$store.state.interpretation"
        :type="$store.state.programmeLineaire.type_simplexe"
      ></interpretation>
    </div>
  </div>
</template>

<script>
import Interpretation from "./Interpretation.vue";

export default {
  name: "dynamic-tableau",
  props: ["currentTableauIndex"],
  components: {
    Interpretation,
  },
  computed: {
    isLast() {
      return (
        this.currentTableauIndex === this.$store.state.tableaux.all.length - 1
      );
    },
    currentTableau() {
      return this.$store.state.tableaux.all[this.currentTableauIndex];
    },
    currentColonnesTableaux() {
      return this.$store.state.colonnes.all.filter((colonne) => {
        return colonne.tableauIndex === this.currentTableauIndex;
      });
    },
    transformedColonnes() {
      const _transformedColonnes = [];
      const colonnesNumber = this.currentColonnesTableaux.length / 4;
      let start = 0;
      let end = 8;

      for (let i = 0; i < 4; i++) {
        _transformedColonnes.push(
          this.currentColonnesTableaux.slice(start, end)
        );
        start += colonnesNumber;
        end += colonnesNumber;
      }

      return _transformedColonnes;
    },
    vhbLabelArray() {
      return this.currentTableau
        ? [...this.currentTableau.vhbLabels.split(","), "Z"]
        : [];
    },
    vdbLabelArray() {
      return this.currentTableau
        ? this.currentTableau.vdbLabels.split(",")
        : [];
    },
  },

  created() {},
};
</script>

<style scoped>
.dynamic-tableau-container {
  padding: 10px;
}

.simplexe-row {
  display: flex;
  padding: 1px;
  justify-content: space-around;
}

.simplexe-cel {
  width: 10%;
  margin: 5px;
  flex-grow: 2;
  text-align: center;
}

.pivot {
  background-color: rgb(236, 171, 30);
}

.v-entrante {
  background-color: rgb(122, 194, 120);
}

.v-sortante {
  background-color: rgb(104, 111, 219);
}

.table-label {
  border: 1px solid rgb(37, 204, 255);
  border-radius: 10px;
}

.table-value,
.table-label {
  box-shadow: 5px 3px 10px rgb(29 31 120 / 50%);
}
</style>
