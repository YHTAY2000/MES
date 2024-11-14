<template>
  <div>
    <div class="fixed bg-gray-800 text-white p-4 top-0 left-0 w-64 h-full hidden md:block">
      <h2 class="cursor-default text-xl font-bold mb-6">MES System</h2>
      <nav>
        <ul>
          <li class="mb-4">
            <router-link to="/dashboard" class="cursor-pointer hover:text-blue-400">Dashboard</router-link>
          </li>
          <li class="mb-4">
            <router-link to="/pt" class="cursor-pointer hover:text-blue-400">Production Tracking</router-link>
          </li>
          <li class="mb-4">
            <router-link to="/qc" class="cursor-pointer hover:text-blue-400">Quality Control</router-link>
          </li>
        </ul>
      </nav>
    </div>

    <div class="md:hidden">
      <button @click="toggleSidebar" class=" p-2 text-white focus:outline-none">
        <span class="material-symbols-outlined">menu</span>
      </button>
      
      <nav class="p-1">
        <ul>
          <li class="mb-4">
            <router-link to="/dashboard" class="cursor-pointer hover:text-blue-400"><span class="material-symbols-outlined">dashboard</span></router-link>
          </li>
          <li class="mb-4">
            <router-link to="/pt" class="cursor-pointer hover:text-blue-400"><span class="material-symbols-outlined">precision_manufacturing</span></router-link>
          </li>
          <li class="mb-4">
            <router-link to="/qc" class="cursor-pointer hover:text-blue-400"><span class="material-symbols-outlined">fact_check</span></router-link>
          </li>
        </ul>
      </nav>
      
      <div v-if="sidebarVisible" class="fixed bg-opacity inset-0 z-10" @click="toggleSidebar"></div>

      <div v-if="sidebarVisible" class="fixed text-white p-4 top-0 left-0 bg-gray-800 w-64 h-full z-20">
        <h2 class="cursor-default text-xl font-bold mb-6">MES System</h2>
        <nav>
          <ul>
            <li class="mb-4">
              <router-link to="/dashboard" class="cursor-pointer hover:text-blue-400">Dashboard</router-link>
            </li>
            <li class="mb-4">
              <router-link to="/pt" class="cursor-pointer hover:text-blue-400">Production Tracking</router-link>
            </li>
            <li class="mb-4">
              <router-link to="/qc" class="cursor-pointer hover:text-blue-400">Quality Control</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      sidebarVisible: false, // Track visibility of sidebar in mobile view
    };
  },
  methods: {
    // Toggle the sidebar visibility
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    },
  },
};
</script>

<style scoped>
/* Optional styling for the mobile sidebar */
.material-icons {
  font-size: 30px;
}
</style>
