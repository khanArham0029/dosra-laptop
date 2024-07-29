import { createRouter, createWebHistory } from 'vue-router'
import SignUp from '../views/SignUp.vue'
import Login from '../views/login.vue'
import HomeView from '../views/Home.vue'
import forgotPassword from '../views/forgotPasswordView.vue'
import AdminView from '../views/adminView.vue'
import StudentAdmin from '../views/studentAdmin.vue'
import TeacherAdmin from '../views/teacherAdmin.vue'
import StudentView from '../views/studentView.vue'
import TeacherView from '../views/teacherView.vue'
import CourseView from '../views/courseDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: HomeView, meta: { transition: 'slide-right' } },
    { path: '/signup', name: 'signup', component: SignUp, meta: { transition: 'slide-right' } },
    { path: '/login', name: 'login', component: Login, meta: { transition: 'slide-right' } },
    { path: '/forgotPassword', name: 'forgot-password', component: forgotPassword,meta: { transition: 'slide-right' } },
    { path:'/adminView', name:'adminView', component:AdminView, meta: { transition: 'slide-right' }},
    { path: '/studentAdmin', name: 'studentAdmin', component: StudentAdmin , meta: { transition: 'slide-right' } },
    { path: '/teacherAdmin', name: 'teacherAdmin', component: TeacherAdmin , meta: { transition: 'slide-right' } },
    { path:'/studentView', name:'studentView',component: StudentView, meta: { transition: 'slide-right' }},
    { path: '/teacherView', name: 'teacherView', component: TeacherView, meta: { transition: 'slide-right' } },
    { path: '/courseDetails/:id', name: 'courseDetails', component: CourseView, props:true,meta: { transition: 'slide-right' } },
    
  ]
})

export default router