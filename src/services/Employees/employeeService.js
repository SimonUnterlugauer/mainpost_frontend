// services/apiService.js
import supabase from "@/services/supabase"


// Get all employees from supabase db
export async function fetchEmployees(startNumber, endNumber) {
  try {
    // Abfrage zum Abrufen aller Datensätze aus der "User" Tabelle
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .range(startNumber, endNumber) // auf seite 1 = 1-100
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

// Only get count of total number of employees
export async function getEmployeeCount() {
  try {
    // Abfrage zum Abrufen aller Datensätze aus der "User" Tabelle
    const { count, error } = await supabase.from('employees').select('*', { count: 'exact' });
    console.log(count);
    
    if (error) {
      console.error('Fehler beim Abrufen der Daten:', error);
      return 0;
    }

    // data enthält die abgerufenen Benutzerdaten
    return count;
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
    return 0;
  }
}

// Fetch only one employee according to set id 
export async function fetchEmployee(id) {
  try {
    // Abfrage zum Abrufen aller Datensätze aus der "User" Tabelle
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .eq('id', id)
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





// import axios from "blabla"

// Example fetch data from api via axios
// Fetch all employees from either db or api-call
// export async function fetchEmployees() {
//   try {
//     const response = await axios.get("http://localhost:8000/employees");
//     return response.data.employees;
//   } catch (error) {
//     console.error('Fehler beim Abrufen der Mitarbeiterdaten:', error);
//     return [];
//   }
// }
