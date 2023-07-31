// services/apiService.js
import supabase from "@/services/supabase"

// Get all employees from supabase db
export async function getAbsencesOfEmployee(employeeId) {
  try {
    // Abfrage zum Abrufen aller Datensätze aus der "User" Tabelle
    const { data, error } = await supabase
      .from('absences')
      .select('*')
      .eq('employee_id', employeeId)
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
}

export async function getTotalAbsencesInYear(reason, year) {
  try {
    // Abfrage zum Abrufen aller Datensätze aus der "User" Tabelle
    const { count, error } = await supabase
      .from('absences')
      .select('*', { count: 'exact' })
      .eq('reason', reason)
      .gte('start_date', `${Number(year)}-01-01`) // Größer oder gleich dem ersten Tag des Jahres
      .lt('start_date', `${Number(year) + 1}-01-01`)
    
    if (error) {
      console.error('Fehler beim Abrufen der Daten:', error);
      return [];
    }
    // data enthält die abgerufenen Benutzerdaten
    return count;
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
    return [];
  }
}