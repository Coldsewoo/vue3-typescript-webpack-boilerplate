import { createRouter, createWebHistory } from 'vue-router'

import DefaultLayout from 'Layouts/DefaultLayout'
const App = () => import('@/App.vue')

const routes: Array<any> = [
  {
    path: '/a',
    name: 'DefaultLayout',
    component: DefaultLayout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: App,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
