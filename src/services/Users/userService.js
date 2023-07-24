import supabase from '@/services/supabase';

export default {
  async fetchUsers() {
    try {
      // Abfrage zum Abrufen aller Datensätze aus der "User" Tabelle
      const { data, error } = await supabase
        .from('users')
        .select('*')
      console.log(data);
      
      if (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
        return [];
      }

      // data enthält die abgerufenen Benutzerdaten
      return data;
    } catch (error) {
      console.error('Fehler beim Abrufen der Daten:', error);
      return [];
    }
  },

  async fetchLoggedUser() {
    const loggedUser = await supabase.auth.getUser();
    if (!loggedUser || !loggedUser.data || !loggedUser.data.user) {
      console.error('Benutzerdaten nicht verfügbar.');
      return null;
    }
    const email = loggedUser.data.user.email;
    try {
      // Abfrage zum Abrufen aller Datensätze aus der "User" Tabelle
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
      
      if (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
        return [];
      }
      console.log(data);
      // data enthält die abgerufenen Benutzerdaten
      return data;
    } catch (error) {
      console.error('Fehler beim Abrufen der Daten:', error);
      return [];
    }
  }
};