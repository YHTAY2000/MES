import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import Dashboard from './components/dashboard.vue';
import ProductionTracking from './components/productionTracking.vue';
import QualityControl from './components/qualityControl.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Dashboard, meta: { title: 'Dashboard - Manufacturing System' } },
        { path: '/dashboard', component: Dashboard, meta: { title: 'Dashboard - Manufacturing System' } },
        { path: '/pt', component: ProductionTracking, meta: { title: 'Production Tracking - Manufacturing System' } },
        { path: '/qc', component: QualityControl, meta: { title: 'Quality Check - Manufacturing System' } },
    ]
});


router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;  
  } else {
    document.title = 'Manufacturing System';  
  }
  next();  
});

createApp(App).use(router).mount('#app');
