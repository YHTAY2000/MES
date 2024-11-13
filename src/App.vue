<template>
  <div class="flex min-h-screen">
    <Sidebar/>
    <div class="p-6 bg-gray-100 flex-1 ml-0 md:ml-64 max-w-full">
      <router-view></router-view>
      
    </div>
  </div>
</template>

<script>
import Sidebar from './components/sidebar.vue';
import Toast from './components/toast.vue';

export default {
  components: {
    Sidebar,
    Toast
  },
};
</script>

<style>

</style>
