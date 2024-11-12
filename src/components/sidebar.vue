<template>
    <div class="fixed w-64 bg-gray-800 text-white p-4 top-0 left-0 h-full">
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
  </template>
  
  <script>
  export default {
    name: "Sidebar",
  };
  </script>
  
  