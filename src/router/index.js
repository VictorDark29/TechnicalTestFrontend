import { createRouter, createWebHistory } from 'vue-router'
import UserManagement from '../components/UserManagement.vue'
import IotData from '../components/IotData.vue'
import Home from '@/components/Home.vue'
import Logs from '@/components/Logs.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/iot',
    name: 'Iot',
    component: IotData
  },
  {
    path:'/users',
    name:'Users',
    component: UserManagement

  },
  {
    path:'/logs',
    name:'Logs',
    component: Logs

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
