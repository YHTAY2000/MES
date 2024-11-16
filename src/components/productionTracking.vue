<template>
  <div class="flex-1 p-4 md:p-6 lg:p-8">
    <h2 class="text-gray-700 text-2xl mb-6 font-bold ">Production Tracking</h2>
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 class="mb-4 font-semibold text-lg text-gray-800">Add New Production Record</h3>
      <form @submit.prevent="addRecord" class="text-gray-800">
        <div class="grid grid-cols-2 md:grid-cols-2 gap-5">
          <input v-model="newRecord.pname" type="text" placeholder="Product Name"
            class="border p-2 rounded-lg w-full text-gray-800" required />
          <input v-model="newRecord.batchNumber" type="text" placeholder="Batch Number"
            class="border p-2 rounded-lg w-full text-gray-800" required />
          <select id="status" v-model="newRecord.status" class="border p-2 rounded-lg w-full text-gray-800" required>
            <option value="" disabled selected>Choose Status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="In-Progress">In-Progress</option>
            <option value="In-Progress">Assembly</option>
            <option value="In-Progress">Packaging</option>
            <option value="Completed">Completed</option>
            <option value="Shipped">Shipped</option>
          </select>
          <input v-model="newRecord.quantity" type="number" placeholder="Quantity"
            class="border p-2 rounded-lg w-full text-gray-800" required />
          <div class="relative flex flex-col">
            <div class="flex items-center mb-1">
              <input id="date" v-model="newRecord.date" type="date" placeholder="Production Date"
                class="border p-2 rounded-lg w-full text-gray-800" required />
              <span class="relative ml-2 cursor-pointer text-gray-500" @mouseover="showTooltip = 'date'"
                @mouseleave="showTooltip = null">
                ℹ️
                <div v-if="showTooltip === 'date'"
                  class="absolute top-0 left-3 p-1 w-40 z-10 bg-gray-700 text-white text-xs">
                  Select the date of production for this item.
                </div>
              </span>
            </div>
          </div>
        </div>
        <button class="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg" type="submit">
          Add Record
        </button>
      </form>
    </div>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Production Records</h3>
      <div class="mb-4">
        <div class="mb-4 flex justify-end">
          <input type="text" v-model="searchQuery" class="border p-2 w-60 text-gray-800 rounded-lg "
            placeholder="Search by Product Name..." />
        </div>
      </div>
      <table v-if="filteredRecords.length > 0" class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-100 text-gray-800 border">
            <th class="">Product Name</th>
            <th class="">Batch No</th>
            <th class="">Status</th>
            <th class="">Quantity</th>
            <th class="">Date</th>
            <th class="">Actions</th>
          </tr>
        </thead>
        <tbody class="text-gray-800 text-center">
          <tr v-for="(record, index) in filteredRecords" :key="index">
            <td class="border p-2">{{ record.product_name }}</td>
            <td class="border p-2">{{ record.batch_number }}</td>
            <td class="border p-2">{{ record.status }}</td>
            <td class="border p-2">{{ record.quantity }}</td>
            <td class="border p-2">{{ record.date }}</td>
            <td class="border p-2">
              <button @click="editRecord(index, record.id)" class="text-blue-500">Edit</button>
              <button @click="deleteRecord(record.id)" class="text-red-500 ml-2">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else class="text-gray-600">No production data.</p>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {

  data() {
    return {
      apiUrl: 'http://localhost:3000',
      productionRecords: [],
      newRecord: {
        pname: '',
        batchNumber: '',
        status: '',
        quantity: null,
        date: '',
      },
      showTooltip: null,
      isEditing: false,
      editIndex: null,
      socket: null,
      searchQuery: ''

    };
  },
  created() {

    this.socket = io('http://localhost:3000');

    this.socket.on('initialData', (data) => {
      if (data.error) {
        alert(`Server error: ${data.error}`);
        return;
      } else {
        this.productionRecords = data.map(record => ({
          ...record,
          date: record.date ? new Date(record.date).toLocaleDateString() : null,
        }));
      }
    });
  },
  mounted() {
    this.socket.on('dataProductionUpdated', () => {
      this.fetchRecords();
      this.resetForm();

    });
  },
  computed: {
    filteredRecords() {
      if (!this.searchQuery) {
        return this.productionRecords;
      }

      return this.productionRecords.filter(record => {
        return record.product_name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    }
  },
  methods: {
    async fetchRecords() {
      try {
        const response = await fetch(`${this.apiUrl}/getProductionRecords`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();

        if (data.error) {

          alert(`Server error: ${data.error}`);
          return;

        } else {
          this.productionRecords = data.map(record => ({
            ...record,
            date: record.date ? new Date(record.date).toLocaleDateString() : null,
          }));
        }
      } catch (error) {
        console.error('Error fetching records:', error);
        alert('The network connection is lost, please connect to the network!');
      }
    },

    editRecord(index, id) {
      const inputDate = this.productionRecords[index].date;

      this.newRecord = {
        pname: this.productionRecords[index].product_name,
        batchNumber: this.productionRecords[index].batch_number,
        ...this.productionRecords[index],
        date: inputDate
          ? (() => {
            const [day, month, year] = inputDate.split('/');
            return `${year}-${month}-${day}`;
          })()
          : null,
      };
      this.isEditing = true;
      this.editIndex = id;
    },
    async addRecord() {
      const url = this.isEditing
        ? `${this.apiUrl}/updateProductRecord/${this.editIndex}`
        : `${this.apiUrl}/addProductRecord`;

      try {
        const response = await fetch(url, {
          method: this.isEditing ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pname: this.newRecord.pname,
            batchNo: this.newRecord.batchNumber,
            status: this.newRecord.status,
            quantity: this.newRecord.quantity,
            date: this.newRecord.date
          })
        })
        const data = await response.json();

        if (data.error) {
          alert(`Server error: ${data.error}`);
          return;

        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('Error fetching records:', error);
        alert('The network connection is lost, please connect to the network!');
      }
    },
    async deleteRecord(id) {
      const confirmation = confirm("Are you sure to delete the date?");
      if (confirmation) {
        try {
          const response = await fetch(`${this.apiUrl}/deleteProductRecord/${id}`, {
            method: 'DELETE',

          })
          const data = await response.json();
          if (data.error){
            alert(`Server error: ${data.error}`);
            return;
          }else {
            alert(data.message);
          }
        } catch (error) {
          console.error('Error fetching records:', error);
          alert('The network connection is lost, please connect to the network!');
        }
      }

    },
    resetForm() {
      this.newRecord = {
        name: '',
        batchNumber: '',
        status: '',
        quantity: null,
        date: '',
      };
    },
  },
};
</script>

<style scoped></style>