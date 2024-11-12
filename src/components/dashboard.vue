<template>
  <div class="p-4 md:p-6 lg:p-8">
    <h2 class="text-2xl font-bold text-gray-700 mb-6">Manufacturing Dashboard</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="metric in metrics" :key="metric.title" class="bg-blue-100 p-4 rounded-lg shadow-md text-center">
        <h3 class="text-lg font-semibold text-blue-800">{{ metric.title }}</h3>
        <p class="text-2xl font-bold text-blue-600">{{ metric.value }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
    return {
      metrics: []
    };
  },
  mounted() {
    // Fetch the data from the backend API
    fetch('http://localhost:3000/getMetricsData')
      .then((response) => response.json())
      .then((data) => {
        if (data.title === "Production Status") {
            if (data.value === '1') {
                data.value = "Operational";
            }
        }
        this.metrics = data;

      })
      .catch((error) => {
        console.error('Error fetching dashboard data:', error);
      });
  },
}
</script>

<style>

</style>