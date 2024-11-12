<template>
    <div class="flex-1 p-4 md:p-6 lg:p-8">
      <h2 class="text-2xl font-bold text-gray-700 mb-6">Production Tracking</h2>
  
      <!-- Production Record Form -->
      <div class="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Add New Production Record</h3>
        <form @submit.prevent="addRecord" class="text-gray-800">
          <div class="grid grid-cols-2 md:grid-cols-2 gap-4">
            <input
              v-model="newRecord.pname"
              type="text"
              placeholder="Product Name"
              class="border p-2 rounded-lg w-full text-gray-800"
              required
            />
            <select id="status" v-model="newRecord.status" class="border p-2 rounded-lg w-full text-gray-800" required>
                <option value="Operational">Operational</option>
                <option value="Non-Operational">Non-Operational</option>
            </select>
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
            <tr v-for="(record,index) in productionRecords" :key="index">
              <td class="border p-2">{{ record.product_name }}</td>
              <td class="border p-2">{{ record.status }}</td>
              <td class="border p-2">{{ record.quantity }}</td>
              <td class="border p-2">{{ record.date }}</td>
              <td class="border p-2">
                <button @click="editRecord(index,record.id)" class="text-blue-500">Edit</button>
                <button @click="deleteRecord(record.id)" class="text-red-500 ml-2">Delete</button>
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
          pname: '',
          status: '',
          quantity: null,
          date: '',
        },
        isEditing: false,
        editIndex: null,
      };
    },
    mounted() {
        this.fetchRecords();
    },
    methods: {

    fetchRecords() {
        fetch('http://localhost:3000/getProductionRecords')
        .then((response) => response.json())
        .then((data) => {
            if (data) {
                this.productionRecords = data.map(record => ({
                    ...record,
                    date: record.date ? new Date(record.date).toLocaleDateString() : null,
                }));
            }
        })
        .catch((error) => {
            console.error('Error fetching records:', error);
        });
    },
    addRecord() {
        const url = this.isEditing
        ? `http://localhost:3000/updateProductRecord/${this.editIndex}`
        : 'http://localhost:3000/addProductionRecord';
    
        fetch(url, {
            method: this.isEditing ? 'PUT' : 'POST',
            headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            pname: this.newRecord.pname,  
            status: this.newRecord.status,
            quantity: this.newRecord.quantity,
            date: this.newRecord.date
        })
        })
        .then(response => response.json())
        .then(data => {
        this.fetchRecords();
        this.resetForm();
        })
        .catch(error => console.error('Error adding record:', error));
    },
    editRecord(index,id) {
        console.log(index);
        console.log(id);

        this.newRecord = {
            pname: this.productionRecords[index].product_name, 
            ...this.productionRecords[index],
            
        };
        this.isEditing = true;
        this.editIndex = id;
      },
      deleteRecord(index) {
        const recordId = this.productionRecords[index].id;
        fetch(`http://localhost:3000/deleteProductionRecord/${recordId}`, {
            method: 'DELETE',
        })
            .then(() => {
            this.productionRecords.splice(index, 1);  // Remove from local list after successful delete
            })
            .catch(error => {
            console.error('Error deleting record:', error);
            });
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
  </style>
  