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
    this.fetchData();
  },
  methods:{
    async fetchData(){
      try{ 
        const response = await fetch('http://localhost:3000/getMetricsData')
        const data = await response.json();
        this.metrics = data;

      }catch (error){
        console.error('Error fetching records:', error);
        alert('Something went wrong. Please try again');
      }
    }
  }
}
</script>

<style>

</style>