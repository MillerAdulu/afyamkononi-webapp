import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login'
import Admin from '@/views/Admin'
import KMPDU from '@/views/KMPDU'
import HealthFacility from "@/views/HealthFacility";

import HealthFacilites from '@/components/HealthFacilities'
import PatientInfo from '@/components/PatientInfo';
import AddPatientRecord from '@/components/AddPatientRecord'

import FacilityPatients from '@/components/FacilityPatients'

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
    },
    {
      path: '/kmpdu',
      component: KMPDU,
      children: [{
        path: 'healthfacilities',
        component: HealthFacilites
      }]
    },
    {
      path: '/healthfacility',
      component: HealthFacility,
      children: [{
          path: 'patients',
          component: FacilityPatients
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