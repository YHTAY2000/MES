<template>
    <div class="p-4">
      <h2 class="text-2xl font-bold text-gray-700 mb-6">Quality Control</h2>
      
      <!-- Form to Schedule a New Inspection -->
      <form @submit.prevent="scheduleInspection" class="mb-6 flex flex-col md:flex-row gap-4">
        <input 
          v-model="newInspection.title" 
          type="text" 
          placeholder="Inspection Title" 
          class="border border-gray-300 p-2 rounded w-full md:w-1/3"
          required
        />
        <input 
          v-model="newInspection.date" 
          type="date" 
          class="border border-gray-300 p-2 rounded w-full md:w-1/3"
          required
        />
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Schedule</button>
      </form>
      
      <!-- Inspection Records Table -->
      <div v-if="inspections.length > 0" class="overflow-x-auto">
        <table class="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr class="bg-gray-200 text-gray-700 text-left">
              <th class="py-3 px-4">Title</th>
              <th class="py-3 px-4">Date</th>
              <th class="py-3 px-4">Status</th>
              <th class="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(inspection, index) in inspections" :key="index" class="border-t">
              <td class="py-2 px-4">{{ inspection.title }}</td>
              <td class="py-2 px-4">{{ inspection.date }}</td>
              <td class="py-2 px-4">{{ inspection.status }}</td>
              <td class="py-2 px-4">
                <button @click="markComplete(index)" class="text-green-600 hover:underline">Complete</button>
                <button @click="deleteInspection(index)" class="ml-4 text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else class="text-gray-600">No inspections scheduled.</p>
    </div>
  </template>
  
  <script>
  export default {
    name: "QualityControl",
    data() {
      return {
        inspections: [],
        newInspection: {
          title: "",
          date: "",
          status: "Scheduled",
        },
      };
    },
    methods: {
      scheduleInspection() {
        // Add new inspection to inspections array
        this.inspections.push({ ...this.newInspection });
        // Reset form fields
        this.newInspection.title = "";
        this.newInspection.date = "";
      },
      markComplete(index) {
        // Update status to "Completed"
        this.inspections[index].status = "Completed";
      },
      deleteInspection(index) {
        // Remove inspection from array
        this.inspections.splice(index, 1);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles here if needed */
  </style>
  