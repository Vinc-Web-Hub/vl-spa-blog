import { createRouter, createWebHistory } from 'vue-router'
import Main from '../pages/Main.vue'
import Cards from '../pages/Cards.vue'
import BlogMusic from '../pages/BlogMusic.vue'
import BlogScience from '../pages/BlogScience.vue'
import BlogList from '../pages/BlogList.vue'
import BlogPost from '../pages/BlogPost.vue'
import AddPost from '../pages/AddPost.vue'
import ModifyPost from '../pages/ModifyPost.vue'
import CreateUser from '../pages/CreateUser.vue'
import UserLogin from '../pages/UserLogin.vue'
import CreatePerson from '../pages/CreatePerson.vue'
import PatientList from '../pages/PatientList.vue'
import AddVitalSigns from '../pages/AddVitalSigns.vue'
import TestFormGridSPanLogin from '../pages/TestFormGridSpanLogin.vue'
import TestFormGridSpan from '../pages/TestFormGridSpan.vue'
import TestFormGridEvents from '../pages/TestFormGridEvents.vue'
import TestFormGridVitalSign from '../pages/TestFormGridVitalSign.vue'

const routes = [
  { path: '/', name: 'Main', component: Main },
  { path: '/cards', name: 'Cards', component: Cards },
  { path: '/blog-music', name: 'BlogMusic', component: BlogMusic },
  { path: '/blog-science', name: 'BlogScience', component: BlogScience },
  { path: '/blog-list', name: 'BlogList', component: BlogList },
  { path: '/blog/:id', name: 'BlogPost', component: BlogPost, props: true },
  { path: '/add-post', name: 'AddPost', component: AddPost },
  { path: '/modify-post/:id', name: 'ModifyPost', component: ModifyPost, props: true },
  { path: '/create-user', name: 'CreateUser', component: CreateUser },
  { path: '/add-vs', name: 'AddVitalSigns', component: AddVitalSigns },
  { path: '/login', name: 'Login', component: UserLogin },
  { path: '/add-patient', name: 'CreatePerson', component: CreatePerson }, 
  { path: '/patient-list', name: 'PatientList', component: PatientList }, 
  { path: '/form-login', name: 'FormSpanLogin', component: TestFormGridSPanLogin },
  { path: '/form-span', name: 'FormSpan', component: TestFormGridSpan },
  { path: '/form-events', name: 'FormEvents', component: TestFormGridEvents },
  { path: '/form-vital-sign', name: 'FormVitalSign', component: TestFormGridVitalSign } 
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
