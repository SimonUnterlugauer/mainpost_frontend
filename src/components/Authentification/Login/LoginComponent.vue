<template>
    <!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<!--
  This example requires updating your template:

  ```
  <html class="h-full bg-white">
  <body class="h-full">
  ```
-->
<div class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
  <div class="w-full max-w-sm space-y-10">
    <div>
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
    </div>
    <form class="space-y-6" @submit.prevent="loginWithSupabase">
        <div class="relative -space-y-px rounded-md shadow-sm">
          <div class="pointer-events-none absolute inset-0 z-10 rounded-md ring-1 ring-inset ring-gray-300"></div>
          <div class="">
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required
              v-model="email"
              class="relative px-4 block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Email address"
            >
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              v-model="password"
              class="relative block w-full px-4 rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Password"
            >
          </div>
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        </div>
    </form>

  </div>
</div>

</template>


<script>
import supabase from '@/services/supabase';  // Passe den Pfad entsprechend an
console.log(supabase);

export default {
    data() {
        return {
        email: '',
        password: '',
        };
    },
    methods: {
        async loginWithSupabase() {
            try {
                const { user, error } = await supabase.auth.signInWithPassword({
                email: this.email,
                password: this.password,
                });

                if (error) {
                console.error('Fehler beim Anmelden:', error.message);
                } else {
                console.log('Anmeldung erfolgreich:', user);
                }
            } catch (error) {
                console.error('Unbekannter Fehler:', error);
            }
        },
    },
};
</script>