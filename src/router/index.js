import {createWebHistory,createRouter} from "vue-router";
import Register from '../components/RegisterComponent.vue';
import Login from '../components/LoginComponent.vue';
import Dashboard from '../components/DashboardComponent.vue';
const Home =()=> import('../components/HomeComponent.vue')

export const routes=[
    {
        name:'HomeComponent',
        path:'/',
        component:Home
    },
    {
        name:'register',
        path:'/register',
        component:Register
    },
    {
        name:'login',
        path:'/login',
        component:Login
    },
    {
        name:'DashboardComponent',
        path:'/dashboard',
        component:Dashboard
    },
]

const router=createRouter({
    history:createWebHistory(),
    routes:routes
})

export default router;
