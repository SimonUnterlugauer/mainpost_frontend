<template>
    <div v-if="loaded" class="flex flex-wrap space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-1/2">
        <div>
            <label for="year" class="block text-sm font-medium leading-6 text-gray-900">
            Jahr
            </label>
            <select
                id="year"
                name="year"
                v-model="year" 
                @change="onYearChange"
                class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            </select>
        </div>
        <div>
            <label for="reason" class="block text-sm font-medium leading-6 text-gray-900">
            Grund
            </label>
            <select
            id="reason"
            name="reason"
            v-model="reason" 
            @change="onReasonChange"
            class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
            <option value="vacation">Urlaub</option>
            <option value="illness">Krankheit</option>
            </select>
        </div>
        </div>
    <div  class="w-full mt-16" v-if="loadedChart">
        <canvas ref="barChartCanvas" class="w-full h-fit"/>
    </div>
    <div class="mt-16" v-else>
        <div class="flex items-center justify-center">
            <div class="animate-spin rounded-full h-6 w-6 border-t-4 border-gray-500"></div>
        </div>
    </div>
</template>

<script>
import { getMonthlyAbsencesInYear } from '@/services/Absences/absencesService';
import Chart from 'chart.js/auto';

export default {
  data() {
    return {
      absences: [],
      monthNames: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
        ],
      reason: '',
      year: '',
      loaded: false,
      chart: null,
      loadedChart: false,
    };
  },
  created() {
    if (this.chart) {
        this.chart.destroy();
    }
    this.loadData();
  },

  methods: {
    
    async onYearChange() {
      if (this.chart) {
        this.chart.destroy();
      }

      // Update the URL with the new selected year and reason
      await this.$router.push({ query: { reason: this.reason, year: this.year } });

      // Ensure that the chart is only created after the route is updated and the data is loaded
      this.$nextTick(() => {
        this.loadData();
      });
    },
    async onReasonChange() {
      if (this.chart) {
        this.chart.destroy();
      }

      // Update the URL with the new selected year and reason
      await this.$router.push({ query: { reason: this.reason, year: this.year } });

      // Ensure that the chart is only created after the route is updated and the data is loaded
      this.$nextTick(() => {
        this.loadData();
      });
    },
    async loadData() {
        this.loadedChart = false;
        // Retrieve the reason and year from the route query
        if (this.$route.query.reason) {
            this.reason = this.$route.query.reason;
        } else {
            this.reason = "illness";
        }
        if (this.$route.query.year) {
            this.year = this.$route.query.year;
        } else {
            this.year = "2020";
        }
        // Use this.reason and this.year in your API call or any other logic
        // to load data based on the selected reason and year.
        try {
            for (let i = 1; i <= 12; i++) {
            this.absences[i] = await getMonthlyAbsencesInYear(this.reason, this.year, i);
            }
            console.log(this.absences);
        } catch (error) {
            console.error('Fehler beim Laden der Daten:', error);
        }
        this.loadedChart = true;
        // Wait for the next tick to ensure that the canvas element is rendered
        this.$nextTick(() => {
            this.createBarChart();
        });
    },
    async createBarChart() {
        this.loaded = false;
        const months = Object.keys(this.absences).map(Number);
        const absenceCounts = Object.values(this.absences);
        // Map the numeric months to month names
        const monthLabels = months.map(month => this.monthNames[month - 1]);
        const ctx = this.$refs.barChartCanvas.getContext('2d');

        this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
            labels: monthLabels,
            datasets: [
                {
                label: this.reason+ " " + this.year,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                data: absenceCounts,
                },
            ],
            },
            options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                beginAtZero: true,
                },
            },
            },
        });
        this.loaded = true;
    },
  },
};

</script>