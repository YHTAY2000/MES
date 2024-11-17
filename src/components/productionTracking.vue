<template>
  <div class="flex-1 p-4 md:p-6 lg:p-8">
    <Alert :showAlert="alertDisplay" :type="alsertStatus" :alertMessage="message"/>
    <h2 class="text-gray-700 text-2xl mb-6 font-bold ">Production Tracking</h2>
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 class="mb-4 font-semibold text-lg text-gray-800">{{this.title}}</h3>
      <form @submit.prevent="addRecord" class="text-gray-800">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div class="flex flex-col "> 
            <input v-model="newRecord.pname" type="text" placeholder="Product Name"
            :class="[
              'border p-2 rounded-lg w-full text-gray-800', 
              {'border-pink-500': isInvalidName, 'focus:outline-none': isInvalidName}
            ]"
            />
            <p class="mt-2 text-pink-600 text-sm" :class="{'invisible':!isInvalidName}">
              Please enter the product name.
            </p>
          </div>
          <div class="flex flex-col"> 
            <input v-model="newRecord.batchNumber" type="text" placeholder="Batch Number"
            :class="[
              'border p-2 rounded-lg w-full text-gray-800', 
              {'border-pink-500': isInvalidNumber, 'focus:outline-none': isInvalidNumber}
            ]"
            />
            <p class="mt-2 text-pink-600 text-sm" :class="{'invisible':!isInvalidNumber}">
              Please enter the batch number.
            </p>
        </div>
          <div class="flex flex-col"> 
            <select id="status" v-model="newRecord.status" 
            :class="[
              'border p-2 rounded-lg w-full text-gray-800', 
              {'border-pink-500': isInvalidStatus, 'focus:outline-none': isInvalidStatus}
            ]"
            >
              <option value="" disabled selected>Choose Status</option>
              <option value="Scheduled">Scheduled</option>
              <option value="In-Progress">In-Progress</option>
              <option value="In-Progress">Assembly</option>
              <option value="In-Progress">Packaging</option>
              <option value="Completed">Completed</option>
              <option value="Shipped">Shipped</option>
            </select>
            <p class="mt-2 text-pink-600 text-sm" :class="{'invisible':!isInvalidStatus}">
              Please select status.
            </p>
          </div>
          <div class="flex flex-col"> 
            <input v-model="newRecord.quantity" type="number" placeholder="Quantity"
            :class="[
              'border p-2 rounded-lg w-full text-gray-800', 
              {'border-pink-500': isInvalidQuantity, 'focus:outline-none': isInvalidQuantity}
            ]"
            />
            <p class="mt-2 text-pink-600 text-sm" :class="{'invisible':!isInvalidQuantity}">
              Please enter the quantity number.
            </p>
          </div>
          <div class="flex flex-col"> 
            <div class="relative flex flex-col">
              <div class="flex items-center mb-1">
                <input id="date" v-model="newRecord.date" type="date" placeholder="Production Date"
                :class="[
                    'border p-2 rounded-lg w-full text-gray-800', 
                    {'border-pink-500': isInvalidDate, 'focus:outline-none': isInvalidDate}
                  ]"
                 />
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
            <p class="mt-2 text-pink-600 text-sm" :class="{'invisible':!isInvalidDate}">
                Please select date.
              </p>
          </div>
        </div>
        <button class="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg" type="submit">
          {{this.buttonName}}
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
      <div class="overflow-x-scroll md:overflow-hidden">
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
  </div>
</template>

<script>
import io from 'socket.io-client';
import Alert from './alert.vue';

export default {
  components:{
    Alert
  },
  data() {
    return {
      apiUrl: 'http://localhost:3000',
      alsertStatus: "",
      alertDisplay: false,
      message: "",
      title: "Add New Production Record",
      buttonName: "Add",
      productionRecords: [], 
      isInvalidName: false,
      isInvalidNumber: false,
      isInvalidStatus: false,
      isInvalidQuantity: false,
      isInvalidDate: false,
      showTooltip: null,
      isEditing: false,
      editIndex: null,
      socket: null,
      searchQuery: "",
      newRecord: {
        pname: '',
        batchNumber: '',
        status: '',
        quantity: null,
        date: '',
      },
     

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
      this.title="Add New Production Record";
      this.buttonName = "Add";
    });
  },
  watch:{
    alertDisplay(type){
      if (type){
          setTimeout(() => {
            this.alertDisplay = false
          }, 5000);
        }
    }
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
        const response = await fetch(`${this.apiUrl}/api/production/getProductionRecords`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();

        if (data.error) {

            this.alertDisplay = true;
            this.alsertStatus = "error";
            this.message = data.error;
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
      this.title = "Edit Production Record";
      this.buttonName = "Save";
      this.isEditing = true;
      this.editIndex = id;
    },
    async addRecord() {
      this.isInvalidName = !this.newRecord.pname.trim();
      this.isInvalidNumber = !this.newRecord.batchNumber.trim();
      this.isInvalidStatus = !this.newRecord.status.trim();
      this.isInvalidQuantity = !this.newRecord.quantity;
      this.isInvalidDate = !this.newRecord.date.trim();

      if (this.isInvalidName || this.isInvalidNumber || this.isInvalidStatus || this.isInvalidQuantity || this.isInvalidDate){
        return;
      }

      const url = this.isEditing
        ? `${this.apiUrl}/api/production/updateProductRecord/${this.editIndex}`
        : `${this.apiUrl}/api/production/addProductRecord`;

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
            this.alertDisplay = true;
            this.alsertStatus = "error";
            this.message = data.error;
            return;

        } else {
          this.alertDisplay = true;
          this.alsertStatus = "success";
          this.message = data.message;
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
          const response = await fetch(`${this.apiUrl}/api/production/deleteProductRecord/${id}`, {
            method: 'DELETE',

          })
          const data = await response.json();
          if (data.error){
            this.alertDisplay = true;
            this.alsertStatus = "error";
            this.message = data.error;
            return;
          }else {
            this.alertDisplay = true;
            this.alsertStatus = "success";
            this.message = data.message;
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