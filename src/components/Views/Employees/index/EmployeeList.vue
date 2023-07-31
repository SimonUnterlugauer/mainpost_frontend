<template>
  <div>
    <div class="mb-16" v-if="loaded">
      <StatBoxesComponent :firstStat="this.totalActiveEmployees" :secondStat="this.fullTimeRatio" :thirdStat="450" />
    </div>
    <div class="">
        <div class="grid md:grid-cols-2 space-x-2 md:space-x-4 mb-16">
          <div class="overflow-hidden rounded-lg bg-white shadow">
            <div class="p-5">
                <div class="flex items-center w-full">
                  <EmployeeBarChartComponent />
                </div>
            </div>
          </div>
          <div class="overflow-hidden rounded-lg bg-white shadow">
            <div class="p-5">
                <div class="flex items-center">
                  Statistik 2
                </div>
            </div>
          </div>
        </div>
      <div class="mx-20">
        <!-- Filter Mitarbeiterliste -->
        <div v-if="loaded" class="flex flex-wrap space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-1/2 mb-6">
          <div>
              <label for="status" class="block text-sm font-medium leading-6 text-gray-900">
              Status
              </label>
              <select
                  id="status"
                  name="status"
                  v-model="status" 
                  @change="onStatusChange"
                  class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="all">Alle</option>
                <option value="active">Aktiv</option>
                <option value="inactive">Inaktiv</option>
              </select>
          </div>
          <div>
              <label for="type" class="block text-sm font-medium leading-6 text-gray-900">
              Anstellungsart
              </label>
              <select
              id="type"
              name="type"
              v-model="type" 
              @change="onTypeChange"
              class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="all">Alle</option>
                <option value="time-based">Zeitarbeit</option>
                <option value="auxiliary">Aushilfe</option>
                <option value="default">Vollzeitkräfte</option>
                <option value="variable">Variabel</option>
              </select>
          </div>
        </div>
        <!-- Ende Filter Mitarbeiterliste -->
        <div class="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
              <thead class="text-right">
                  <tr>
                    <th class="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900">ID</th>
                    <th class="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900">Stadt</th>
                    <th class="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th class="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900">
                      Festanstellung
                    </th>
                    <th class="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"></th>
                  </tr>
              </thead>
              <tbody v-if="loaded" class="divide-y divide-gray-200 bg-white">
                  <tr  v-for="employee in showEmployees" :key="employee.id" class="bg-white">
                      <td class="whitespace-nowrap px-6 py-4 text-left text-sm text-gray-500">{{ employee.id }}</td>
                      <td class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">{{ employee.residence_city }}</td>
                      <td class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                        <div v-if="!employee.expiration">
                          <span class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Aktiv</span>
                        </div>
                        <div v-else>
                          <span class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">Inaktiv</span>
                        </div>
                      </td>
                      <td class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                        <div v-if="employee.type == 'default'">
                          <span class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">ja</span>
                        </div>
                        <div v-else>
                          <span class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">nein</span>
                        </div>
                      </td>
                      <td class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                          <a :href="'/employee/' + employee.id" class="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                              Ansehen
                          </a>
                      </td>
                  </tr>
              </tbody>
              <tbody v-else>
                <td>
                  <div class="flex items-center justify-center">
                    <div class="animate-spin rounded-full h-6 w-6 border-t-4 border-gray-500"></div>
                  </div>
                </td>
                <td>
                  <div class="flex items-center justify-end">
                    <div class="animate-spin rounded-full h-6 w-6 border-t-4 border-gray-500"></div>
                  </div>
                </td>
                <td>
                  <div class="flex items-center justify-end">
                    <div class="animate-spin rounded-full h-6 w-6 border-t-4 border-gray-500"></div>
                  </div>
                </td>
                <td>
                  <div class="flex items-center justify-end">
                    <div class="animate-spin rounded-full h-6 w-6 border-t-4 border-gray-500"></div>
                  </div>
                </td>
                <td>
                  <div class="flex items-center justify-end">
                    <div class="animate-spin rounded-full h-6 w-6 border-t-4 border-gray-500"></div>
                  </div>
                </td>
              </tbody>
          </table>
          <!-- <div v-else>
            <div class="flex items-center justify-center">
              <div class="animate-spin rounded-full h-6 w-6 border-t-4 border-gray-500"></div>
            </div>
          </div> -->
          <!-- Pagination -->
          <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div>
              <p class="text-sm text-gray-700">
                Showing
                <span class="font-medium">{{ (itemsPerPage * (currentPage -1)) + 1 }}</span>
                to
                <span class="font-medium">{{ currentPage * itemsPerPage }}</span>
                of
                <span class="font-medium">{{ totalEmployees }}</span>
                results
              </p>
            </div>
            <div class="flex flex-1 justify-between gap-x-3 sm:justify-end">
              <button
                  @click="changePage(currentPage - 1)"
                  :disabled="currentPage === 1"
                  class="px-3 py-2 text-blue-500 font-bold mx-1 rounded"
                  >
                      <font-awesome-icon icon="chevron-left" />
              </button>
              <!-- Erster Button -->
              <button
                  v-if="showFirstPageButton"
                  @click="changePage(1)"
                  :class="{ 'bg-blue-500': currentPage === 1, 'bg-gray-300': currentPage !== 1 }"
                  class="px-3 py-2 text-white font-bold mx-1 rounded"
              >
                  1
              </button>

              <!-- ... -->
              <!-- Weitere Seiten werden durch ... ersetzt -->
              <span v-if="showEllipsisBefore">...</span>

              <!-- Anzeigen der Seitennummern in der Mitte -->
              <button
                  v-for="pageNumber in displayedPages"
                  :key="pageNumber"
                  @click="changePage(pageNumber)"
                  :class="{ 'bg-blue-500': currentPage === pageNumber, 'bg-gray-300': currentPage !== pageNumber }"
                  class="px-3 py-2 text-white font-bold mx-1 rounded"
              >
                  {{ pageNumber }}
              </button>

              <!-- ... -->
              <!-- Weitere Seiten werden durch ... ersetzt -->
              <span v-if="showEllipsisAfter">...</span>

              <!-- Letzter Button -->
              <button
                  v-if="showLastPageButton"
                  @click="changePage(totalPages)"
                  :class="{
                  'bg-blue-500': currentPage === totalPages,
                  'bg-gray-300': currentPage !== totalPages,
                  }"
                  class="px-3 py-2 text-white font-bold mx-1 rounded"
              >
                  {{ totalPages }}
              </button>
              <button
                  @click="changePage(currentPage + 1)"
                  :disabled="currentPage === totalPages"
                  class="px-3 py-2 text-blue-500 font-bold mx-1 rounded"
                  >
                      <font-awesome-icon icon="chevron-right" />
              </button>
            </div> 
          </div>
        </div>  
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import {  getEmployeeCount, fetchFilteredEmployees } from '@/services/Employees/employeeService';
import StatBoxesComponent from '../../../SubComponents/Statistics/StatBoxesComponent.vue';
import EmployeeBarChartComponent from '../../../SubComponents/Charts/Employees/EmployeeBarChartComponent'
library.add(faChevronLeft, faChevronRight);


export default {
  data() {
    return {
      showEmployees: [], // Hier werden alle Mitarbeiterdaten gespeichert
      totalEmployees: 0, // Hier werden die paginierten Mitarbeiterdaten gespeichert
      currentPage: 1,
      itemsPerPage: 100,
      loaded: false,
      totalActiveEmployees: 0,
      totalActiveFullTimeEmployees: 0,
      fullTimeRatio: 0,
      status: 'all',
      type: 'all',
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async onStatusChange() {
      this.currentPage = 1;
      console.log("Changed Reason");
      this.loadData();
    },
    async onTypeChange() {
      this.currentPage = 1;
      console.log("Changed Type");
      this.loadData();
    },
    
    async loadData() {
      console.log(this.type);
      // set status filter
      let status_filter;
      if (this.status === 'all') {
        status_filter = null;
      } else if (this.status === "active") {
        status_filter = { field: 'expiration', operator: 'is', value: null };
      } else if (this.status === 'inactive') {
        status_filter = { field: 'expiration', operator: 'not.is', value: null };
      }

      // set type filter
      let type_filter
      if (this.type === 'all') {
        type_filter = null;
      } else if (this.type === "time-based") {
        type_filter = { field: 'type', operator: 'eq', value: "time-based" };
      } else if (this.type === 'default') {
        type_filter = { field: 'type', operator: 'eq', value: "default" };
      } else if (this.type === 'variable') {
        type_filter = { field: 'type', operator: 'eq', value: "variable" };
      } else if (this.type === 'auxiliary') {
        type_filter = { field: 'type', operator: 'eq', value: "auxiliary" };
      }
      try {
        // get employees
          this.showEmployees = await fetchFilteredEmployees(
          (this.currentPage - 1) * this.itemsPerPage,
          this.currentPage * this.itemsPerPage - 1,
          type_filter, 
          status_filter,
        );
        // Get employee count
        this.totalEmployees = await getEmployeeCount(
          type_filter, 
          status_filter
        );
        
        
        // Get total active employees
        this.totalActiveEmployees = await getEmployeeCount({ field: 'expiration', operator: 'is', value: null });
        
        // Get ratio of full time employees
        this.totalActiveFullTimeEmployees = await getEmployeeCount({ field: 'expiration', operator: 'is', value: null }, { field: 'type', operator: 'eq', value: 'default' });
        this.fullTimeRatio = 100 * (this.totalActiveFullTimeEmployees/this.totalActiveEmployees).toFixed(4);
        console.log(this.fullTimeRatio);
        this.loaded = true;
      } catch (error) {
        console.error('Fehler beim Laden der Daten:', error);
      }
    },
    changePage(pageNumber) {
      this.currentPage = pageNumber;
      this.loadData();
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalEmployees / this.itemsPerPage);
    },
    displayedPages() {
      const totalVisiblePages = 3; // Anzahl der sichtbaren Seitennummern in der Mitte
      const halfVisiblePages = Math.floor(totalVisiblePages / 2);

      let startPage = Math.max(this.currentPage - halfVisiblePages, 1);
      let endPage = Math.min(this.currentPage + halfVisiblePages, this.totalPages);

      if (endPage - startPage + 1 < totalVisiblePages) {
        if (this.currentPage <= halfVisiblePages) {
          endPage = Math.min(startPage + totalVisiblePages - 1, this.totalPages);
        } else {
          startPage = Math.max(endPage - totalVisiblePages + 1, 1);
        }
      }

      return Array(endPage - startPage + 1).fill().map((_, index) => startPage + index);
    },
    showFirstPageButton() {
      return this.displayedPages[0] > 1;
    },
    showLastPageButton() {
      return this.displayedPages[this.displayedPages.length - 1] < this.totalPages;
    },
    showEllipsisBefore() {
      return this.displayedPages[0] > 2;
    },
    showEllipsisAfter() {
      return this.displayedPages[this.displayedPages.length - 1] < this.totalPages - 1;
    },
  },
  components: {
    FontAwesomeIcon,
    StatBoxesComponent,
    EmployeeBarChartComponent,
  },
};
</script>