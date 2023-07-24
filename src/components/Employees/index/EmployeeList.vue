<template>
  <div>
    <div class="mx-20">
        <h2 class="text-2xl font-bold">Mitarbeiterliste</h2>
        <div class="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
              <thead class="text-right">
                  <tr>
                    <th class="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900">ID</th>
                    <th class="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900">Name</th>
                    <th class="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900">Abteilung</th>
                    <th class="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"></th>
                  </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="employee in paginatedEmployees" :key="employee.id" class="bg-white">
                      <td class="whitespace-nowrap px-6 py-4 text-left text-sm text-gray-500">{{ employee.id }}</td>
                      <td class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">{{ employee.name }}</td>
                      <td class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">{{ employee.abteilung }}</td>
                      <td class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                          <a :href="'/employee/' + employee.id" class="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                              Ansehen
                          </a>
                      </td>
                  </tr>
              </tbody>
          </table>
          <!-- Pagination -->
          <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
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
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { fetchEmployees } from '@/services/Employees/employeeService';
library.add(faChevronLeft, faChevronRight);


export default {
    
  data() {
    return {
        allEmployees: [], // Hier werden alle Mitarbeiterdaten gespeichert
        employees: [], // Hier werden die paginierten Mitarbeiterdaten gespeichert
        currentPage: 1,
        itemsPerPage: 10,
        loading: true,
    };
  },
  mounted() {
    this.loadData();
  },
  computed: {
    totalPages() {
      return Math.ceil(this.allEmployees.length / this.itemsPerPage);
    },
    paginatedEmployees() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = this.currentPage * this.itemsPerPage;
      return this.allEmployees.slice(startIndex, endIndex);
    },
    displayedPages() {
      const totalVisiblePages = 5; // Anzahl der sichtbaren Seitennummern in der Mitte
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

      return Array(endPage - startPage + 1)
        .fill()
        .map((_, index) => startPage + index);
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
  methods: {
    async loadData() {
      try {
        this.allEmployees = await fetchEmployees();
        this.loading = false;
        this.updatePaginatedEmployees();
      } catch (error) {
        console.error('Fehler beim Laden der Daten:', error);
      }
    },
    updatePaginatedEmployees() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = this.currentPage * this.itemsPerPage;
        this.employees = this.allEmployees.slice(startIndex, endIndex);
    },
    changePage(pageNumber) {
      this.currentPage = pageNumber;
      this.updatePaginatedEmployees();
    },
  },
  components: {
    FontAwesomeIcon,
  },
};
</script>