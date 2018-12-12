import Vue from 'vue'
import Router from 'vue-router'
import VueCookies from 'vue-cookies'
import Dashboard from './views/Dashboard.vue'
import Subject from './views/Subject.vue'
import Tree from './views/Tree.vue'
import Mini from './views/Mini.vue'
import AreaTest from './views/AreaTest.vue'
import SpeedChallenge from './views/SpeedChallenge.vue'

import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import RegisterTeacher from './views/RegisterTeacher.vue'
import RegisterTeacherClass from './views/RegisterTeacherClass.vue'
import ProfileTeacher from './views/ProfileTeacher.vue'
import TeacherSession from './views/TeacherSession.vue'

import store from './store'
// Puzzle

Vue.use(Router)

let auth = (to, from, next) => {
  return VueCookies.get('token') ? next() : next({path: '/'})
}

let checkProfile = (to, from, next) => {
  let role = store.getters.getUser.role
  if (role) {
    switch(role.name) {
      case "teacher": {
        next('/profile/teacher')
        break
      }
      case "student": {
        next('/dashboard')
        break
      }
      case "demo-user": {
        next('/dashboard')
        break
      }
      case "paid-user": {
        next('/dashboard')
        break
      }
    }
  }
  next()
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {
        let user = store.getters.getUser
        if (user) {
          checkProfile(to, from, next)
        }
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        isHeader: true
      },
      beforeEnter: (to, from, next) => { 
          auth(to, from, next)
          checkProfile(to, from, next)
      }
    },
    {
      path: '/area/:slug',
      name: 'area',
      component: Dashboard,
      meta: {
        isHeader: true
      },
      beforeEnter: auth
    },
    {
      path: '/subject/:slug',
      name: 'subject',
      component: Subject,
      meta: {
        isHeader: true
      },
      beforeEnter: auth
    },
    {
      path: '/mini/:slug',
      name: 'mini',
      component: Mini,
      meta: {
        isHeader: true
      },
      beforeEnter: auth
    },
    {
      path: '/speed-challenge/:id',
      name: 'SpeedChallenge',
      component: SpeedChallenge,
      meta: {
        isHeader: true
      },
      beforeEnter: auth
    },
    {
      path: '/area-test/:slug',
      name: 'area',
      component: AreaTest,
      meta: {
        isHeader: true
      },
      beforeEnter: auth
    },
    {
      path: '/tree/:id',
      name: 'tree',
      component: Tree,
      meta: {
        isHeader: true
      },
      beforeEnter: auth
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/teacher/register',
      name: 'register-teacher',
      component: RegisterTeacher
    },
    {
      path: '/teacher/register/class',
      name: 'register-class',
      component: RegisterTeacherClass
    },
    {
      path: '/profile/teacher',
      name: 'profileTeacher',
      component: ProfileTeacher,
      meta: {
        isHeader: true
      },
      beforeEnter: auth
    },
    {
      path: '/teacher/session/:klassId',
      name: 'teacherSession',
      component: TeacherSession,
      meta: {
        isHeader: true
      },
      beforeEnter: auth
    },
    {
      path: '/paid/register',
      name: 'tree',
      component: () => import('@/views/paid/register/stepOne'),
    },
    {
      path: '/profile',
      name: 'tree',
      component: () => import('@/views/Profile'),
      meta: {
        isHeader: true
      },
      beforeEnter: auth
    },
    {
      path: '/success',
      name: 'success',
      component: () => import('@/views/Success'),
    }
  ]
})
