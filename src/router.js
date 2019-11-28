import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login'
import Admin from '@/views/Admin'
import KMPDB from '@/views/KMPDB'
import HealthFacility from "@/views/HealthFacility";

import PatientInfo from '@/components/PatientInfo';
import AddPatientRecord from '@/components/AddPatientRecord'

import AccountTransactions from '@/components/AccountTransactions'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      component: Login,
    },
    {
      path: '/admin',
      component: Admin,
      children: [{
        path: 'transactions',
        component: AccountTransactions
      }, ]
    },
    {
      path: '/kmpdb',
      component: KMPDB,
      children: [{
        path: 'transactions',
        component: AccountTransactions
      }, {
        path: 'transacations',
        component: AccountTransactions
      }]
    },
    {
      path: '/healthfacility',
      component: HealthFacility,
      children: [{
          path: 'transactions',
          component: AccountTransactions
        },
        {
          path: 'search',
          component: PatientInfo,
        },
        {
          path: 'new',
          component: AddPatientRecord
        }
      ]
    }
  ]
})

router.beforeEach((to, _, next) => {
  let token = localStorage.getItem("token")
  if (token && token.length == 0 && to.fullPath != '/') next({
    path: '/'
  })

  next()

})

export default router
