<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <Sidebar/>

    <!-- Main Content -->
    <div class="flex-1 p-6 bg-gray-100 ml-0 md:ml-64 max-w-full">
      <!-- Router View to render routed components here -->
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

<style scoped>
/* Add any additional custom styles here */
</style>
