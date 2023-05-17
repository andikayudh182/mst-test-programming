import Vue from 'vue'
import VueRouter from 'vue-router'
import BarangView from '../views/BarangView.vue'
import CustomerView from '../views/CustomerView.vue'
import InputTransaksiView from '../views/InputTransaksiView.vue'
import DataTransaksiView from '../views/DataTransaksiView.vue'
import Login from '../views/LoginView.vue'

Vue.use(VueRouter)

const checkAuth = (to, from, next) => {
  const token = localStorage.getItem('token');
  if (token) {
   
    next();
    }
   else {
    // Jika pengguna tidak memiliki token, maka arahkan pengguna kembali ke halaman login
    next( {name:'login'} );
  }
};

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/input/transaksi',
    name: 'inputTransaksi',
    component: InputTransaksiView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/barang',
    name: 'barang',
    component: BarangView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/transaksi',
    name: 'transaksi',
    component: DataTransaksiView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/customer',
    name: 'customer',
    component: CustomerView,
    meta: {
      requiresAuth: true,
    },
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    checkAuth(to, from, next);
  } else {
    next();
  }
})

export default router
