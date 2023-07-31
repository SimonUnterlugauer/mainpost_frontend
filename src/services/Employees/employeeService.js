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

// Get all employees from db filtered
export async function fetchFilteredEmployees(startNumber, endNumber, filterOne = null, filterTwo = null) {
  try {
    // Starten Sie die Abfrage zum Abrufen aller Datensätze aus der "employees" Tabelle
    let query = supabase.from('employees').select('*').range(startNumber, endNumber);

    // Überprüfen Sie, ob filterOne und filterTwo definiert sind und fügen Sie sie der Abfrage hinzu
    if (filterOne !== null) {
      query = query.filter(filterOne.field, filterOne.operator, filterOne.value);
    }
    if (filterTwo !== null) {
      query = query.filter(filterTwo.field, filterTwo.operator, filterTwo.value);
    }

    // Führen Sie die Abfrage aus
    const { data, error } = await query;
    // console.log(data);

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
export async function getEmployeeCount(filter = null, filter_two = null) {
  // const filter = ( 'expiration', "is", null);
  try {
    // Abfrage zum Abrufen aller Datensätze aus der "User" Tabelle
    let query = supabase.from('employees').select('*', { count: 'exact' });
    if (filter) {
      query = query.filter(filter.field, filter.operator, filter.value);
    }
    if (filter_two) {
      query = query.filter(filter_two.field, filter_two.operator, filter_two.value);
    }
    const { count, error } = await query;
    // console.log(count);

    
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
// export async function fetchEmployees(id, ...) {
//   try {
//     const response = await axios.get("http://localhost:8000/employees/{{id}}");
//     return response.data.employees;
//   } catch (error) {
//     console.error('Fehler beim Abrufen der Mitarbeiterdaten:', error);
//     return [];
//   }
// }
