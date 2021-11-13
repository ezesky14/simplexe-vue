<template id="simpelexe-navbar">
  <div class="navbar">
    <div class="navbar-desktop">
      <span class="navbar-title">Simplexe App</span>
      <simplexe-menu class="menu-desktop"></simplexe-menu>
    </div>

    <div class="navbar-mobile">
      <font-awesome-icon
        icon="align-center"
        size="2x"
        transform="shrink-6 left-4"
        pull="left"
        class="menu-mobile-button"
        @click="setIsMenuOpened(true)"
      />

      <div class="menu-mobile-container" v-show="isMobileMenuOpened">
        <font-awesome-icon
          icon="window-close"
          size="3x"
          class="menu-mobile-close"
          @click="close()"
        />
        <div class="menu-mobile-bloc1">
          <span class="navbar-title">Simplexe App</span>
        </div>
        <simplexe-menu></simplexe-menu>
      </div>
    </div>
  </div>
</template>

<script>
import SimplexeMenu from "@/shared/Menu.vue";

import "./Navbar.css";

export default {
  name: "navbar",
  data() {
    return { isMobileMenuOpened: false };
  },
  components: {
    SimplexeMenu,
  },
  methods: {
    close() {
      this.setIsMenuOpened(false);
    },

    setIsMenuOpened(value) {
      this.isMobileMenuOpened = value;
    },
  },
};
</script>

<style>
@media only screen and (max-width: 600px) {
  .navbar-desktop {
    display: none;
  }

  .menu-mobile-container {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(47, 91, 99, 0.9);
  }

  .menu-mobile-bloc1 {
    width: 80%;
    background-color: rgba(93, 161, 240, 0.9);
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .menu-mobile-button,
  .menu-mobile-close {
    color: white;
    cursor: pointer;
  }

  .menu-mobile-close {
    position: absolute;
    right: 0;
    padding: 10px;
  }
}

@media only screen and (min-width: 601px) {
  .navbar-mobile {
    display: none;
  }

  .navbar-desktop {
    display: flex;
    width: 100%;
  }
}
</style>
