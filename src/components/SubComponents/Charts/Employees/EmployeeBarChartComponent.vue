<template>
   <div class="w-full">
    <div v-if="loaded">
      <canvas ref="chartCanvas" />
    </div>
    <div v-else class="w-full">
      <div class="flex items-center justify-center">
        <div class="animate-spin rounded-full h-6 w-6 border-t-4 border-gray-500"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import {getTotalAbsencesInYear} from '@/services/Absences/absencesService.js'

export default {
  data() {
    return {
      sickDays2023: 0,
      sickDays2022: 0,
      sickDays2021: 0, 
      sickDays2020: 0,
      vacationDays2020: 0, 
      vacationDays2021: 0, 
      vacationDays2022: 0, 
      vacationDays2023: 0,
      loaded: false,
      chart: null,
      data: {
        labels: ['2020', '2021', '2022', '2023'],
        datasets: [
          {
            label: 'Urlaubstage',
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data: [0, 0, 0, 0],
          },
          {
            label: 'Krankheiten',
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            data: [0, 0, 0, 0],
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
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.sickDays2020 = await getTotalAbsencesInYear("illness", "2020");
      this.vacationDays2020 = await getTotalAbsencesInYear("vacation", "2020");
      this.sickDays2021 = await getTotalAbsencesInYear("illness", "2021");
      this.vacationDays2021 = await getTotalAbsencesInYear("vacation", "2021");
      this.sickDays2022 = await getTotalAbsencesInYear("illness", "2022");
      this.vacationDays2022 = await getTotalAbsencesInYear("vacation", "2022");
      this.sickDays2023 = await getTotalAbsencesInYear("illness", "2023");
      this.vacationDays2023 = await getTotalAbsencesInYear("vacation", "2023");
      this.loaded = true;
      this.createChartOnNextTick();
    },
    createChartOnNextTick() {
      this.$nextTick(() => {
        this.loaded = true;
        const ctx = this.$refs.chartCanvas.getContext('2d');
        this.updateChartData(); // Aktualisiere die Diagramm-Daten
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: this.data,
          options: {
            ...this.options,
            onClick: this.handleChartClick,
          } 
        });
      });
    },
    updateChartData() {
      // Erstelle ein neues Datenobjekt mit den aktualisierten Werten
      this.data = {
        labels: ['2020', '2021', '2022', '2023'],
        datasets: [
          {
            label: 'Urlaubstage',
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data: [this.vacationDays2020, this.vacationDays2021, this.vacationDays2022, this.vacationDays2023],
          },
          {
            label: 'Krankheiten',
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            data: [this.sickDays2020, this.sickDays2021, this.sickDays2022, this.sickDays2023],
          },
        ],
      };
    },
    handleChartClick(event, activeElements) {
      if (activeElements && activeElements.length > 0) {
        const activeElement = activeElements[0];
        const datasetIndex = activeElement.datasetIndex;
        const dataIndex = activeElement.index;

        let selectedData = {};
        if (dataIndex === 0 && datasetIndex === 0) {
          selectedData = { reason: 'vacation', year: '2020' };
        } else if (dataIndex === 0 && datasetIndex === 1) {
          selectedData = { reason: 'illness', year: '2020' };
        } else if (dataIndex === 1 && datasetIndex === 0) {
          selectedData = { reason: 'vacation', year: '2021' };
        } else if (dataIndex === 1 && datasetIndex === 1) {
          selectedData = { reason: 'illness', year: '2021' };
        } else if (dataIndex === 2 && datasetIndex === 0) {
          selectedData = { reason: 'vacation', year: '2022' };
        } else if (dataIndex === 2 && datasetIndex === 1) {
          selectedData = { reason: 'illness', year: '2022' };
        } else if (dataIndex === 3 && datasetIndex === 0) {
          selectedData = { reason: 'vacation', year: '2023' };
        } else if (dataIndex === 3 && datasetIndex === 1) {
          selectedData = { reason: 'illness', year: '2023' };
        }

        // Route to the new component with the selectedData as query parameters
        this.$router.push({ name: 'MonthlyAbsences', query: selectedData });
      }
    },

  },
  beforeUnmount() {
    // Destruktion des Diagramms, wenn die Komponente entfernt wird
    if (this.chart) {
      this.chart.destroy();
    }
  },
};
</script>

  