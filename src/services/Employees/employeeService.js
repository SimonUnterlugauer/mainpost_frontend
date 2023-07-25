// services/apiService.js
import axios from 'axios';


// Get all employees -- from url = localhost
export async function fetchEmployees() {
  try {
    const response = await axios.get("http://localhost:8000/employees");
    return response.data.employees;
  } catch (error) {
    console.error('Fehler beim Abrufen der Mitarbeiterdaten:', error);
    return [];
  }
}

export async function fetchOneEmployee(id){
  const response = await axios.get("http://localhost:8000/employees/{{id}}");
}

// Get only one employee
export async function fetchEmployee(id) {
  return id;
}
