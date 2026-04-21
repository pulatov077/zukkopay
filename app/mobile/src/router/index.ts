import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/IndexPage.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginPage.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterPage.vue')
  },

  // O'quvchi (Student) bo'limi - Pastki menyu (Tabs) bilan
  {
    path: '/student',
    component: () => import('../views/Student/TabsPage.vue'),
    children: [
      {
        path: '',
        redirect: '/student/dashboard'
      },
      {
        path: 'dashboard',
        name: 'StudentDashboard',
        component: () => import('../views/Student/Dashboard.vue')
      },
      {
        path: 'leaderboard',
        name: 'StudentLeaderboard',
        component: () => import('../views/Student/Reyting.vue')
      },
      {
        path: 'wallet',
        name: 'StudentWallet',
        component: () => import('../views/Student/Wallet.vue')
      },
      {
        path: 'profil',
        name: 'StudentProfil',
        component: () => import('../views/Student/Profil.vue')
      },
      {
        path: 'earn',
        name: 'StudentEarn',
        component: () => import('../views/Student/Earn.vue')
      },
      {
        path: 'store',
        name: 'StudentStore',
        component: () => import('../views/Student/Store.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;