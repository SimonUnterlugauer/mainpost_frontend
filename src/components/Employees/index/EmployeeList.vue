<template>
  <div>
    <div class="mx-20">
        <h2 class="text-2xl font-bold">Mitarbeiterliste</h2>
        <table class="mt-4 w-full">
        <thead>
            <tr class="bg-gray-200">
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Abteilung</th>
            <th class="px-4 py-2">Ansehen</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="employee in employees" :key="employee.id" class="border-b">
            <td class="px-4 py-2">{{ employee.name }}</td>
            <td class="px-4 py-2">{{ employee.abteilung }}</td>
            <td class="px-4 py-2">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Ansehen
                </button>
            </td>
            </tr>
        </tbody>
        </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      employees: [],
    };
  },
  mounted() {
    this.fetchEmployees();
  },
  methods: {
    fetchEmployees() {
      axios
        .get("http://localhost:8000/employees")
        .then((response) => {
          this.employees = response.data.employees;
          this.loading = false; // Daten wurden geladen
          console.log(this.employees);
        })
        .catch((error) => {
          console.error("Fehler beim Abrufen der Mitarbeiterdaten:", error);
        });
    },
  },
};
</script>