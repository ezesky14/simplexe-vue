<template id="simplexe-menu">
  <div class="menu">
    <router-link class="menu-item" to="/">
      <font-awesome-icon
        icon="home"
        size="1x"
        :style="{ marginRight: '10px' }"
      />
      <span>Accueil</span></router-link
    >
    <router-link class="menu-item" to="/about">
      <font-awesome-icon
        icon="box"
        size="1x"
        :style="{ marginRight: '10px' }"
      />
      <span>A propos</span></router-link
    >

    <language-selector class="menu-item" />
  </div>
</template>

<script>
import LanguageSelector from "./LanguageSelector.vue";
export default {
  name: "simplexe-menu",
  components: {
    LanguageSelector,
  },
};
</script>

<style>
@media only screen and (max-width: 600px) {
  .menu {
    display: flex;
    flex-direction: column;

    width: 80%;
  }

  .menu-item {
    color: white;
    padding: 20px;
    align-content: flex-end;
    border-bottom: thistle 1px solid;
    font-size: 1.3rem;
  }

  .menu-item:hover {
    background-color: rgba(34, 128, 151, 0.603);
  }

  .router-link-exact-active {
    background-color: rgba(34, 128, 151, 0.603);
    text-decoration: none;
  }
}

@media only screen and (min-width: 601px) {
  .menu {
    display: flex;
    justify-content: flex-end;
    flex-grow: 5;
    align-items: center;
  }

  .menu-item {
    color: white;
    padding: 0px 10px;
    align-content: flex-end;
  }

  .router-link-exact-active {
    color: rgba(128, 191, 207, 0.603);
    text-decoration: none;
  }
}
</style>
