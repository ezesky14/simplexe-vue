<template>
  <div class="pagination">
    <button
      class="pagination-button"
      v-for="(tablebutton, index) in tableauButtonLength"
      :key="index"
      @click="changeCurrentTableau(index)"
    >
      {{ tablebutton }}
    </button>
  </div>
</template>

<script>
export default {
  name: "tableau-pagination",
  props: ["tableauButtonLength", "changeCurrentTableau"],

  created() {
    
  },
};
</script>

<style>
.pagination {
  display: flex;
  justify-content: flex-end;
}

.pagination-button {
  margin: 5px
;
}
</style>
