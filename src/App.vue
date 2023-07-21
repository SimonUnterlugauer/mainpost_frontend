<template>

  <div v-if="!authState.user">
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

import Footer from "./components/layout/Footer/Footer.vue";
import MainNavigation from "./components/layout/Navigation/MainNavigation.vue";
import MainHeader from "./components/layout/Header/MainHeader.vue";
import LoginComponent from "./components/Authentification/Login/LoginComponent.vue";
import authState from '@/services/Authentification/authState';


export default {
  
  name: 'App',
  components: {
    Footer, 
    MainNavigation,
    MainHeader,
    LoginComponent
  },
  computed: {
    authState() {
      return authState;
    },
  },
}
</script>

