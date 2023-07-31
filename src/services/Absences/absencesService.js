// services/apiService.js
import supabase from "@/services/supabase"

// Get all employees from supabase db
export async function getAbsencesOfEmployee(employeeId) {
  console.log(Number(employeeId));
  try {
    // Abfrage zum Abrufen aller Datensätze aus der "User" Tabelle
    const { data, error } = await supabase
      .from('absences')
      .select('*')
      .eq('employee_id', Number(employeeId))
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


// get absences in month xxx
export async function getMonthlyAbsencesInYear(reason, year, month) {
  let endDateCondition;
  if (Number(month) === 12) {
    // If the month is 12, set the endDateCondition to December 31 of the next year
    const nextYear = Number(year) + 1;
    endDateCondition = `${nextYear}-01-01`;
  } else {
    // For other months, set the endDateCondition to the start of the next month
    endDateCondition = `${year}-${Number(month) + 1}-01`;
  }
  try {
    const { count, error } = await supabase
      .from('absences')
      .select('*', { count: 'exact' })
      .eq('reason', reason)
      .gte('start_date', `${Number(year)}-${Number(month)}-01`) 
      .lt('start_date', endDateCondition)
    
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