<template>
    <div>
        <div
        :class="[
          'fixed right-3 w-80 border-l-4 p-4',
          isVisible ? 'block' : 'hidden', 
          showAlert ? 'animate-slideInFromLeft' : 'animate-slideOutToLeft',
          type == 'success'? 'block text-green-900 bg-green-100 border border-green-500':'block bg-red-100 border border-red-400 text-red-700'
        ]"
      >
      <p>{{ this.alertMessage }}</p>
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
        alertMessage:{
          type: String,
        }
        
    },
    data(){
        return{
          isVisible: false
        }
    },
    watch: {
      showAlert(type){
        if (type){
          this.isVisible = true
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
  