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