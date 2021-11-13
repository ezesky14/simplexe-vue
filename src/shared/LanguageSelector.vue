<template>
  <div class="language-selector-container">
    <div class="selected-language" @click="setIsOpen(true)">
      <font-awesome-icon
        icon="language"
        size="1x"
        :style="{ marginRight: '10px' }"
      />
      {{ languagesMap[selectedLanguage] }}
    </div>
    <div class="selector-language" v-if="isOpen">
      <div
        class="language-selector-item"
        v-for="language in languageList"
        :key="language"
        @click="setLanguage(language)"
      >
        {{ languagesMap[language] }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { languages } from "./../core/enum/languages.enum";
export default {
  name: "language-selector",
  data() {
    return {
      languagesMap: languages,
      languageList: Object.keys(languages),
      isOpen: false,
    };
  },
  computed: mapState({
    selectedLanguage: (state) => state.preferences.selectedLanguage,
  }),
  methods: {
    setIsOpen(value) {
      this.isOpen = value;
    },
    setLanguage(language) {
      this.$store.commit({ type: "setCurrentLanguage", language });
      this.isOpen = false;
    },
  },
};
</script>

<style scoped>
@media only screen and (max-width: 600px) {
  .selector-language {
    width: calc(100% - 30px);
  }
}

@media only screen and (min-width: 601px) {
  .language-selector-container {
    padding: 0px 10px;
  }
}
.selector-language {
  border: 1px solid;
  position: absolute;
}
.selected-language {
  display: block;
  cursor: pointer;
}

.language-selector-item {
  padding: 10px;
  text-align: center;
  background-color: rgba(100, 140, 100, 0.4);
  color: #fff;
  cursor: pointer;
}

.language-selector-item:hover {
  background-color: royalblue;
  color: white;
}
</style>
