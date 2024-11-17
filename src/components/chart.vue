<template>
   <div class="flex border-4 border-blue-300 bg-blue-200 mt-10 justify-center items-center">
    <div class="w-96 h-96">
        <Pie :data="data" :options="options" />
    </div>
  </div>
</template>
  
  <script lang="ts">
  import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
  import { Pie } from 'vue-chartjs'

  ChartJS.register(ArcElement, Tooltip, Legend);
  
  export default {
    name: 'App',
    components: {
      Pie
    },
    props:{
        utilizateRate:{
            type: String
        },
        defect:{
            type:String
        },
        
    },
    data() {
      return {
        data: {
          labels: ['Machine Utilization', 'Defect Rate'],
          datasets: [
            {
            data: [parseFloat(this.utilizateRate), parseFloat(this.defect)],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
              ],
              hoverOffset: 2
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Pie Chart Example'
            }
          }
        }
      };
    }
  };
  </script>
  