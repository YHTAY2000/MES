<template>
    <div>
        <div
        v-if="showAlert"
        :class="[
          'fixed right-3 w-80 border-l-4 p-4',
          showAlert ? 'animate-slideInFromLeft' : 'animate-slideOutToLeft',
          type == 'success'? 'bg-green-400 text-green-800 border-green-600':'bg-orange-300'
        ]"
      >
      <p>{{ alertMessage }}</p>
      </div>
     
    </div>
  </template>
  
  <script>
  export default {
    props: {
        type: {
            type: String,
        },
        showAlert: {
            type: Boolean,
            default: false
        },
        
    },
    data(){
        return{
        }
    },
    computed: {
        alertMessage() {
            switch (this.type) {
                case 'success':
                return 'Data added successful!';
                case 'error':
                return 'Something went wrong!';
                case 'info':
                return 'Here is some information.';
                default:
                return '';
            }
        }
    },
    methods: {
      hideAlert() {
      this.showAlert = !this.showAlert; // Toggle visibility
      },
    },
  };
  </script>
  
  <style scoped>
  /* Scoped styling (if needed) */
  </style>
  