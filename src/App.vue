<!-- Grundbaustein der Applikation von dort aus wird alles gerendert -->
<template>
  <div v-if="!isAuthenticated">
    <!-- Zeige die Login-Komponente an -->
    <LoginComponent/>
  </div>

  <div v-else>
    <!-- Start Navigation -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6">
        <div class="flex h-16 shrink-0 items-center">
          <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=white" alt="Your Company">
        </div>
        <MainNavigation />
        
      </div>
    </div>
    <!-- End Navigation -->
    <div class="lg:pl-72">
      <MainHeader />
      <main class="py-10">
        <div class="px-4 sm:px-6 lg:px-8">
          <div class="mt-10">
            <router-view /> <!-- Hier werden die gerouteten Komponenten angezeigt -->
          </div>
          <Footer />
        </div>
      </main>
    </div>
  </div>
  
</template>

<script>
// Importe neue Komponenten die überall zu sehen sind
import Footer from "./components/Layout/Footer/Footer.vue";
import MainNavigation from "./components/Layout/Navigation/MainNavigation.vue";
import MainHeader from "./components/Layout/Header/MainHeader.vue";
import LoginComponent from "./components/Authentification/Login/LoginComponent.vue";
import supabase from '@/services/supabase';  // Passe den Pfad entsprechend an


export default {

  data() {
    return {
      isAuthenticated: false,
      finished: false,
    };
  },
  name: 'App',
  components: {
    Footer, 
    MainNavigation,
    MainHeader,
    LoginComponent
  },
  mounted() {
    // Funktion, die bei einem Seiten-Reload oder Initialisierung aufgerufen wird
    this.checkAuthState();
  },
  methods: {
    checkAuthState() {
      this.finished = false;
      // Hier kommt dein Code zum Überprüfen des Authentifizierungszustands
      supabase.auth.onAuthStateChange((event, session) => {
          if (event == 'SIGNED_IN') {
            console.log('SIGNED_IN', session)
            this.isAuthenticated = true;
          } else if (event == 'SIGNED_OUT') {
            console.log('SIGNED_OUT', session);
            this.isAuthenticated = false;
          } 
      })
      this.finished = true
    },
    // Weitere Vue-Methoden hier
  },
}
</script>

