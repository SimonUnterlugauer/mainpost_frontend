<template>
  <div class="flex mb-12" v-if="employee[0]">
    <div class="mr-4 flex-shrink-0">
      <span class="inline-block h-14 w-14 overflow-hidden rounded-full bg-gray-100">
        <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </span>
    </div>
    <div class="flex items-center">
      <h4 class="text-4xl font-bold text-blue-500">Mitarbeiter {{ employee[0].id }}</h4>
      <div v-if="employee[0].expiration" class="ml-6">
        <span class="inline-flex text-md items-center rounded-md bg-green-50 px-2 py-1 font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Aktiv</span>
      </div>
      <div v-else class="ml-6">
        <span class="inline-flex text-md items-center rounded-md bg-red-50 px-2 py-1 font-medium text-red-700 ring-1 ring-inset ring-red-600/20">Inaktiv</span>
      </div>
    </div>
  </div>
  <div v-if="employee[0]">
    <ul  role="list" class="grid grid-cols-1 gap-6">
      <li class="col-span-1  rounded-lg bg-white shadow">
        <div class=" w-full items-center justify-between space-y-2 p-6">
          <div class="grid grid-cols-1 sm:grid-cols-2">
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
                <p v-if="employee[0].type == 'default'" class="text-sm text-gray-700">
                   Festanstellung
                </p>
                <p v-else-if="employee[0].type == 'auxiliary'" class="text-sm text-gray-700">
                   Aushilfe
                </p>
                <p v-else class="text-sm text-gray-700">
                   Zeitarbeit
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class=" w-full items-center justify-between space-y-4 p-6">
          <div class="grid grid-cols-1 sm:grid-cols-2">
            <!-- Geburtstag -->
            <div class="grid grid-cols-2">
              <div>
                <p class="font-medium">
                  Wohnort
                </p>
              </div>
              <div class="flex items-center">
                <p class="text-sm text-gray-700">
                  {{ employee[0].residence_zip }} {{ employee[0].residence_city }}
                </p>
              </div>
            </div>
            <!-- Anstellungsart -->
            <div class="grid grid-cols-2">
              <div>
                <p class="font-medium">
                  Straße
                </p>
              </div>
              <div class="flex items-center">
                <p class="text-sm text-gray-700">
                  {{ employee[0].residence_street }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div class="mt-6 min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
    <div v-if="absences">
      <div v-if="absences.length !== 0">
        <ListComponent :listData="absences"/>
      </div>
      <div v-else>
        <EmptyList />
      </div>
    </div>
  </div>
</template>

<script>
import { fetchEmployee } from '@/services/Employees/employeeService';
import ListComponent from '../../layout/List/ListComponent.vue';
import EmptyList from '../../layout/List/EmptyList.vue';
import { getAbsencesOfEmployee } from '@/services/Absences/absencesService'

export default {
  data() {
    return {
      employee: [],
      absences: [],
    };
  },
  components: {
    ListComponent, 
    EmptyList,
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const routeParams = this.$route.params;
      try {
        this.employee = await fetchEmployee(routeParams.id);
        this.absences = await getAbsencesOfEmployee(routeParams.id);
        console.log(this.absences);
      } catch (error) {
        console.error('Fehler beim Laden der Daten:', error);
      }
    },
  },
};
</script>