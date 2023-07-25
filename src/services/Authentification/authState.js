import { reactive, watchEffect } from 'vue';
import supabase from '@/services/supabase';

const authState = reactive({
  user: supabase.auth.getUser(),
  session: supabase.auth.getSession(),
});

// Überwache Änderungen des Authentifizierungsstatus in Echtzeit
watchEffect(() => {
  const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
    authState.user = supabase.auth.getUser();
    authState.session = session;
  });

  return () => {
    authListener.unsubscribe();
  };
});


export default authState;
