import './assets/main.css'
import 'flowbite';

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'


import App from './App.vue'
import './assets/main.css';
import Dashboard from './components/dashboard.vue';
import ProductionTracking from './components/productionTracking.vue';
import QualityControl from './components/qualityControl.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Dashboard },
        { path: '/dashboard', component: Dashboard },
        { path: '/pt', component: ProductionTracking },
        { path: '/qc', component: QualityControl },
    ]
});

createApp(App).use(router).mount('#app')
