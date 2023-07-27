<template>
  <div>
    <div class="mx-20">
        <h2 class="text-2xl font-bold">Mitarbeiterliste</h2>
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
              <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="employee in showEmployees" :key="employee.id" class="bg-white">
                      <td class="whitespace-nowrap px-6 py-4 text-left text-sm text-gray-500">{{ employee.id }}</td>
                      <td class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">{{ employee.residence_city }}</td>
                      <td class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                        <div v-if="employee.expiration">
                          <span class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Aktiv</span>
                        </div>
                        <div v-else>
                          <span class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">Inaktiv</span>
                        </div>
                      </td>
                      <td class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                        <div v-if="!employee.freelance">
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
          </table>
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
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { fetchEmployees, getEmployeeCount } from '@/services/Employees/employeeService';
library.add(faChevronLeft, faChevronRight);


export default {
  data() {
    return {
      showEmployees: [], // Hier werden alle Mitarbeiterdaten gespeichert
      totalEmployees: 0, // Hier werden die paginierten Mitarbeiterdaten gespeichert
      currentPage: 1,
      itemsPerPage: 100,
      loading: true,
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      try {
        this.showEmployees = await fetchEmployees(
          (this.currentPage - 1) * this.itemsPerPage,
          this.currentPage * this.itemsPerPage - 1
        );
        this.totalEmployees = await getEmployeeCount();
        this.loading = false;
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
  },
};
</script>