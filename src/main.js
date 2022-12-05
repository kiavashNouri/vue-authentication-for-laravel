import { createApp } from 'vue'
import App from './App.vue';
import axios from 'axios'
import router from './router';
const app = createApp(App)
axios.defaults.withCredentials = false;
app.config.globalProperties.$axios = axios
import '@/assets/css/style.css';
app.use(router)
app.mount('#app')
