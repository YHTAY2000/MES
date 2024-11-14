<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold text-gray-700 mb-6">Quality Control</h2>

    <form @submit.prevent="addInspection" class="mb-6 flex flex-col md:flex-row gap-4">
      <input
        v-model="newInspection.title"
        type="text"
        placeholder="Inspection Title"
        class="border border-gray-300 p-2 w-full md:w-100 text-gray-500	"
        required
      />
      <input
        v-model="newInspection.date"
        type="date"
        class="border border-gray-300 p-2 text-gray-500	 rounded w-full md:w-100"
        required
      />
      <button type="submit" class="bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
        Schedule
      </button>
    </form>

    <div v-if="inspections.length > 0">
      <table class="text-center bg-white text-gray-500 rounded">
        <thead>
          <tr class="bg-gray-200 text-gray-700">
            <th class="py-3 px-4">Title</th>
            <th class="py-3 px-4">Date</th>
            <th class="py-3 px-4">Status</th>
            <th class="py-3 px-4">Defects</th>
            <th class="py-3 px-4">Total Produced</th>
            <th class="py-3 px-4">Total Defects</th>
            <th class="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(inspection, index) in inspections" :key="index">
            <td class="py-2 px-4">{{ inspection.title }}</td>
            <td class="py-2 px-4">{{ inspection.date }}</td>
            <td class="py-2 px-4">{{ inspection.status }}</td>
            <td class="py-2 px-4">{{ inspection.defect ? "Yes" : "No" }}</td>
            <td class="py-2 px-4">{{ inspection.total_produced === null ? "Empty" :inspection.total_produced }}</td>
            <td class="py-2 px-4">{{ inspection.total_defected === null ? "Empty" : inspection.total_defected }}</td>
            <td class="py-2 px-4">
              
              <button @click="changeStatus(inspection.id,  inspection.status === 'Scheduled' ? 'Completed' : 'Scheduled')" class="text-green-600 hover:underline">  {{ inspection.status === 'Scheduled' ? 'Complete' : 'Uncompleted' }}</button>
              <button @click="flagDefect(inspection.id, inspection.total_produced, inspection.total_defected, inspection.defect_details, inspection.defect)" class="text-yellow-600 ml-4  hover:underline">{{inspection.defect ? 'Update Defect Details' : 'Flag Defect'}}</button>
              <button @click="deleteRecord(inspection.id)" class="ml-4 text-red-600 hover:underline">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else class="text-gray-600">No inspections scheduled.</p>

    <!-- Export to CSV Button -->
    <button @click="exportToCSV" class="bg-blue-500 mt-6 px-4 py-2  text-white  hover:bg-blue-600">
      Export to CSV
    </button>
  </div>
</template>

<script>
export default {
  name: "QualityControl",
  data() {
    return {
      apiUrl: 'http://localhost:3000',
      inspections: [],
      newInspection: {
        title: "",
        date: "",
        status: "Scheduled",
        defect: false,
        totalProduced: "",
        totalDefected: "",
        defectDetails: "",
      },
    };
  },
  created(){
    this.fetchRecords();
  },
  methods: {
    async addInspection() {
      try{
        const response = await fetch(`${this.apiUrl}/addInspection`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: this.newInspection.title,  
            date: this.newInspection.date,
            status: this.newInspection.status,
            defect: this.newInspection.defect,
          })
        })
        const data = response.json()
        if (data){

          alert(data);
          this.fetchRecords();
          this.newInspection.title = "";
          this.newInspection.date = "";
        }
      }catch (error){
        console.error('Error adding record:', error),
        alert('There was an error adding the record. Please try again.');
      }  
    },
    async fetchRecords() {

      try{
        const response = await fetch(`${this.apiUrl}/getInspectionData`,{
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
          },
        })
        const data = await response.json();
            if (data) { 
              this.inspections = data.data.map(record =>({
                ...record,
                date: record.date ? new Date(record.date).toLocaleDateString() : null,
              }));
            }
      }catch(error){

          console.error('Error fetching records:', error);
          alert('Something error, please contact to the adminstrator'); 

      };
    },
    async changeStatus(id, status) {
      try{
        const response = await fetch(`${this.apiUrl}/changeStatusData/${id}/${status}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        const result = await response.json();

        if (result){
          this.fetchRecords();
          alert(result.message);

        }

      } catch (error) {
        console.error('Error fetching records:', error);
        alert('Something went wrong.');
      }
    
    },
    async flagDefect(id, totalProduce, totalDefects, description, defectType) {

      const isNum = (value) => !isNaN(value) && value.trim() !== '';

      const getTotalProduced = defectType == 1 ? prompt("Edit total number of produce:", totalProduce) : prompt("Enter total number of produce:");
      
      if (getTotalProduced === null) return; 

      if (getTotalProduced !== null && (getTotalProduced === '' || !isNum(getTotalProduced))) {
        alert("Please enter a valid number for total produced.");
        return;
      }

      const getTotalDefect = defectType == 1 ? prompt("Edit total number of defects:", totalDefects) : prompt("Enter total number of defects:");

      if (getTotalDefect === null) return; 

      if (getTotalDefect !== null && (getTotalDefect === '' || !isNum(getTotalDefect))) {
        alert("Please enter a valid number for total defects.");
        return;
      }

      const getdescription = defectType == 1 ? prompt("Edit defect details:", description) : prompt("Enter defect details:");
      


      if (getTotalProduced !== null && getTotalDefect !== null && getdescription !== null) {
        try{
          const response = await fetch(`${this.apiUrl}/addDefectDesc/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              produceNo: getTotalProduced,
              defectNo: getTotalDefect,
              desc: getdescription,
            })
      
          });

          const result = await response.json();

          if (result){
            this.fetchRecords();
            alert(result.message);

          }
      
        } catch (error) {
          console.error('Error fetching records:', error);
          alert('Something went wrong.');
        }
      }
    },
    async deleteRecord(id) {
      const confirmation = confirm("Do you want to delete the records?");

      if (confirmation){
        try{
          const response = await fetch(`${this.apiUrl}/deleteRecord/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
          });

          const result = await response.json();

          if (result){
            this.fetchRecords();
            alert(result.message);

          }

        } catch (error) {
          console.error('Error fetching records:', error);
          alert('Something went wrong. Please try again later');
        }
      }
    },
    exportToCSV() {
      const csvContent = this.inspections.map((inspection) => ({
        Title: inspection.title,
        Date: inspection.date,
        Status: inspection.status,
        Defects: inspection.defect ? "Yes" : "No",
        produce: inspection.total_produced,
        defect: inspection.total_defected,
        DefectDetails: inspection.defect_details || "",
      }));

      const csvHeader = "Title,Date,Status,Defects,Total Produced, Total Defects, Defect Details\n";
      const csvData = csvContent.map((row) => Object.values(row).join(",")).join("\n");

      const blob = new Blob([csvHeader + csvData], { type: "text/csv" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "quality-control-report.csv";
      link.click();
    },
  },
};
</script>

<style scoped>

</style>
