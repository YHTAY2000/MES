<template>
    <div>  
      <Transition>
      <div v-if="showAlert"
        :class="[
          'fixed right-3 w-80 border-l-4 p-4',
          isVisible ? 'block' : 'hidden', 
          type === 'success' 
            ? 'block text-green-900 bg-green-100 border border-green-500' 
            : 'block bg-red-100 border border-red-400 text-red-700'
        ]"
      >
      <p>{{ alertMessage }}</p>
      </div>
    </Transition>
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
          this.isVisible = type
        }
      }
    },
  };
  </script>
  
  <style scoped>

  @keyframes slideInFromLeft {
      0% {
        transform: translateX(100%);
        opacity: 0;
      }
      100% {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes slideOutToLeft {
      0% {
        transform: translateX(0);
        opacity: 1;
      }
      100% {
        transform: translateX(100%);
        opacity: 0;
      }
    }

    .v-enter-active {
      animation: slideInFromLeft 0.5s ease-out;
    }

    .v-leave-active {
      animation: slideOutToLeft 0.5s ease-in;
    }
  

  </style>
  