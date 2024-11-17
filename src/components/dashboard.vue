<template>
  <div class="p-4 md:p-6 lg:p-8">
    <h2 class="text-2xl font-bold text-gray-700 mb-6">Manufacturing Dashboard</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div class="bg-blue-100 p-4 rounded-lg shadow-md text-center">
        <h3 class="text-lg font-semibold text-blue-800">Production Status</h3>
        <p class="text-2xl  text-green-600 font-bold">{{this.status}}</p>
      </div>
      <div class="bg-blue-100 p-4 rounded-lg shadow-md text-center">
        <h3 class="text-lg text-blue-800 font-semibold ">Machine Utilization</h3>
        <p class=" font-bold text-red-600 text-2xl">{{this.utilizate}}%</p>
      </div>
      <div class="bg-blue-100 p-4 rounded-lg shadow-md text-center">
        <h3 class="font-semibold text-lg text-blue-800">Defect Rate</h3>
        <p class=" font-bold text-2xl text-red-600">{{ this.defectRate }}%</p>
      </div>
    </div >
    <Chart :utilizateRate="this.utilizate" :defect="this.defectRate"/>
  </div>
</template>

<script>
import Chart from './chart.vue';


export default {
  components:{
    Chart
  },
    data() {
    return {
      status: "",
      utilizate: 80,
      defectRate: "",    
    };
  },
  
  created() {
    this.fetchData();
  },
  methods:{
    async fetchData(){
      try{ 

        const response = await fetch('http://localhost:3000/api/dashboard/getMetricsData');

        const data = await response.json();

        if (data.error) {
          alert(`Server error: ${data.error}`);
          return; 
        }

        this.status = data.status || 'Unknown';
        this.defectRate = data.defectRate ? Math.round(data.defectRate) : 0;

      }catch (error){
        console.error('Error fetching records:', error);
        alert('The network connection is lost, please connect to the network!');
      }
    }
  },
  
}
</script>

<style>

</style>