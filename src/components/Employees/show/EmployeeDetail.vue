<template>
  <div v-if="employee[0]">
    <ul  role="list" class="grid grid-cols-1 gap-6">
      <li class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
        <div class="grid grid-cols-1 sm:grid-cols-2 w-full items-center justify-between space-y-4 p-6">
          <div>
          <!-- Geburtstag -->
            <div class="grid grid-cols-2">
              <div>
                <p class="font-medium">
                  Geburtstag
                </p>
              </div>
              <div class="flex items-center">
                <p class="text-sm text-gray-700">
                  {{ employee[0].birthday }}
                </p>
              </div>
            </div>
            <!-- Anstellungsart -->
            <div class="grid grid-cols-2">
              <div>
                <p class="font-medium">
                  Anstellungsart
                </p>
              </div>
              <div class="flex items-center">
                <p class="text-sm text-gray-700">
                  {{ employee[0].type }}
                </p>
              </div>
            </div>
          </div>
          <!-- Anstellungsart -->
          <div class="grid grid-cols-2">
            <div>
              <p class="font-medium">
                Ort
              </p>
            </div>
            <div class="flex items-center">
              <p class="text-sm text-gray-700">
                {{ employee[0].residence_zip }} {{ employee[0].residence_city }}
              </p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { fetchEmployee } from '@/services/Employees/employeeService';

export default {
  data() {
    return {
      employee: [],
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const routeParams = this.$route.params;
      try {
        this.employee = await fetchEmployee(routeParams.id);
        console.log(this.employee);
      } catch (error) {
        console.error('Fehler beim Laden der Daten:', error);
      }
    },
  },
};
</script>