<template>
    <div class="flex-1 p-4 md:p-6 lg:p-8">
      <h2 class="text-2xl font-bold text-gray-700 mb-6">Production Tracking</h2>
  
      <!-- Production Record Form -->
      <div class="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Add New Production Record</h3>
        <form @submit.prevent="addRecord">
          <div class="grid grid-cols-2 md:grid-cols-2 gap-4">
            <input
              v-model="newRecord.name"
              type="text"
              placeholder="Product Name"
              class="border p-2 rounded-lg w-full text-gray-800"
              required
            />
            <input
              v-model="newRecord.status"
              type="text"
              placeholder="Status"
              class="border p-2 rounded-lg w-full text-gray-800"
              required
            />
            <input
              v-model="newRecord.quantity"
              type="number"
              placeholder="Quantity"
              class="border p-2 rounded-lg w-full text-gray-800"
              required
            />
            <input
              v-model="newRecord.date"
              type="date"
              placeholder="Production Date"
              class="border p-2 rounded-lg w-full"
              required
            />
          </div>
          <button class="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg" type="submit">
            Add Record
          </button>
        </form>
      </div>
  
      <!-- Production Records Table -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Production Records</h3>
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-100 text-gray-800 border">
              <th class="">Product Name</th>
              <th class="">Status</th>
              <th class="">Quantity</th>
              <th class="">Date</th>
              <th class="">Actions</th>
            </tr>
          </thead>
          <tbody class="text-gray-800 text-center">
            <tr v-for="(record, index) in productionRecords" :key="index">
              <td class="border p-2">{{ record.name }}</td>
              <td class="border p-2">{{ record.status }}</td>
              <td class="border p-2">{{ record.quantity }}</td>
              <td class="border p-2">{{ record.date }}</td>
              <td class="border p-2">
                <button @click="editRecord(index)" class="text-blue-500">Edit</button>
                <button @click="deleteRecord(index)" class="text-red-500 ml-2">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        productionRecords: [],
        newRecord: {
          name: '',
          status: '',
          quantity: null,
          date: '',
        },
        isEditing: false,
        editIndex: null,
      };
    },
    methods: {

      addRecord() {
        if (this.isEditing) {
          this.productionRecords.splice(this.editIndex, 1, { ...this.newRecord });
          this.isEditing = false;
          this.editIndex = null;
        } else {
          this.productionRecords.push({ ...this.newRecord });
        }
        this.resetForm();
      },

      editRecord(index) {
        this.newRecord = { ...this.productionRecords[index] };
        this.isEditing = true;
        this.editIndex = index;
      },

      deleteRecord(index) {
        this.productionRecords.splice(index, 1);
      },

      resetForm() {
        this.newRecord = {
          name: '',
          status: '',
          quantity: null,
          date: '',
        };
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles here if needed */
  </style>
  