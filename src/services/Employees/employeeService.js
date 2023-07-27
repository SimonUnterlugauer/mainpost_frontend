// services/apiService.js
import axios from 'axios';


// Fetch all employees from either db or api-call
export async function fetchEmployees() {
  try {
    const response = await axios.get("http://localhost:8000/employees");
    return response.data.employees;
  } catch (error) {
    console.error('Fehler beim Abrufen der Mitarbeiterdaten:', error);
    return [];
  }
}

// Fetch only one employee according to set id 
export async function fetchEmployee(id) {
  return id;
}
