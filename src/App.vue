<template>
  <div class="flex min-h-screen">
    <Sidebar/>
    <div class="p-6 bg-gray-100 ml-0 flex-1  md:ml-64 max-w-full">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/sidebar.vue';

export default {
  components: {
    Sidebar,
    
  },
  
};
</script>

<style>

</style>
