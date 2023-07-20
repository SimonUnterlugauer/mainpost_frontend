<template>
  <MainHeader />
  <router-view /> <!-- Hier werden die gerouteten Komponenten angezeigt -->

  <Footer />
</template>

<script>

import Footer from "./components/layout/Footer/Footer.vue";
import MainHeader from "./components/layout/Header/MainHeader.vue";

export default {
  name: 'App',
  components: {
    Footer, // Füge die Footer-Komponente als lokale Komponente hinzu
    MainHeader,
  },
}
</script>

