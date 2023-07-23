// services/apiService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const fetchEmployees = () => {
  return axios.get(`${BASE_URL}/employees`)
    .then(response => response.data.employees)
    .catch(error => {
      console.error('Fehler beim Abrufen der Mitarbeiterdaten:', error);
      return [];
    });
};