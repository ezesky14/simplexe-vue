<template>
  <div class="interpretation-container">
    <h2>Interpretation de la solution</h2>
    <div
      class="interpretation-row"
      v-for="(label, iIndex) in labels"
      :key="iIndex"
    >
      <div
        class="interpretation-item"
        v-for="(sLabel, sLabelIndex) in label"
        :key="sLabelIndex"
      >
        <font-awesome-icon icon="box" size="1x" class="interpretation-icon" />

        {{ sLabel }} = {{ interpretation[sLabel] }}
      </div>
    </div>

    <div class="interpretation-row">
      <div class="interpretation-item">
        <font-awesome-icon
          icon="check"
          size="1x"
          class="interpretation-icon"
        />Pour Z = {{ interpretation.zmax }}
      </div>
    </div>
  </div>
</template>

<script>
import { SimplexeType } from "@/core/enum/simplexe-type.enum";

export default {
  name: "interpretation",
  props: ["interpretation", "type"],
  methods: {
    getLabels(type) {
      let list;
      if (type === SimplexeType.MAXI_TROIS_VARIABLES) {
        list = [
          ["x1", "x2", "x3"],
          ["e1", "e2", "e3"],
        ];
      }

      if (type === SimplexeType.MAXI_DEUX_VARIABLES) {
        list = [
          ["x1", "x2"],
          ["e1", "e2", "e3"],
        ];
      }

      if (type === SimplexeType.MINI_TROIS_VARIABLES) {
        list = [
          ["y1", "y2", "y3"],
          ["e1", "e2", "e3"],
        ];
      }

      if (type === SimplexeType.MINI_DEUX_VARIABLES) {
        list = [
          ["y1", "y2"],
          ["e1", "e2", "e3"],
        ];
      }

      return list;
    },
  },
  computed: {
    labels() {
      return this.getLabels(this.type);
    },
  },
};
</script>

<style scoped>
.interpretation-container {
  box-shadow: 6px 12px 10px 2px rgba(66, 63, 63, 0.2);
  padding: 10px;
  margin: 30px 10px;
  background-color: rgb(93, 179, 194);
  color: white;
}

.interpretation-row {
  display: flex;
  justify-content: space-between;
}

.interpretation-item {
  min-width: 100px;
  padding-bottom: 10px;
}

.interpretation-icon {
  margin-right: 10px;
}
</style>
