import { createRouter, createWebHistory } from 'vue-router'
import Main from '../pages/Main.vue'
import Cards from '../pages/Portfolio.vue'
import BlogMusic from '../pages/BlogMusic.vue'
import BlogScience from '../pages/BlogScience.vue'
import PostList from '../pages/PostList.vue'
import BlogPost from '../pages/BlogPost.vue'
import PostDisplayGrid from '../pages/PostDisplay.vue'
import CreatePost from '../pages/PostCreate.vue'
import ModifyPost from '../pages/PostModify.vue'
import CreateUser from '../pages/UserCreate.vue'
import CreatePerson from '../pages/PersonCreate.vue'
import ModifyPerson from '../pages/PersonModify.vue'
import PersonList from '../pages/PersonList.vue'
import PersonDisplayGrid from '../pages/PersonDisplay.vue'
import VitalSignsCreate from '../pages/VitalSignsCreate.vue'
import UserLogin from '../pages/UserLogin.vue'
import TestFormGridSPanLogin from '../pages/TestFormGridSpanLogin.vue'
import TestFormGridSpan from '../pages/TestFormGridSpan.vue'
import TestFormGridEvents from '../pages/TestFormGridEvents.vue'
import TestFormGridVitalSign from '../pages/TestFormGridVitalSign.vue'
import TestDisplayGrid from '../pages/TestDisplayGrid.vue'

const routes = [
  { path: '/', name: 'Main', component: Main },
  { path: '/cards', name: 'Cards', component: Cards },
  { path: '/blog-music', name: 'BlogMusic', component: BlogMusic },
  { path: '/blog-science', name: 'BlogScience', component: BlogScience },
  { path: '/post-list', name: 'PostList', component: PostList },
  { path: '/blog/:id', name: 'BlogPost', component: BlogPost, props: true },
  { path: '/post/:id', name: 'PostDisplayGrid', component: PostDisplayGrid, props: true },
  { path: '/create-post', name: 'CreatePost', component: CreatePost },
  { path: '/modify-post/:id', name: 'ModifyPost', component: ModifyPost, props: true },
  { path: '/create-user', name: 'CreateUser', component: CreateUser },
  { path: '/create-person', name: 'CreatePerson', component: CreatePerson },
  { path: '/modify-person/:id', name: 'ModifyPerson', component: ModifyPerson, props: true },
  { path: '/person-list', name: 'PersonList', component: PersonList }, 
  { path: '/person/:id', name: 'PersonDisplayGrid', component: PersonDisplayGrid, props: true },
  { path: '/create-vs/:id', name: 'VitalSignsCreate', component: VitalSignsCreate, props: true},
  { path: '/login', name: 'Login', component: UserLogin },
  { path: '/form-login', name: 'FormSpanLogin', component: TestFormGridSPanLogin },
  { path: '/form-span', name: 'FormSpan', component: TestFormGridSpan },
  { path: '/form-events', name: 'FormEvents', component: TestFormGridEvents },
  { path: '/form-vital-sign', name: 'FormVitalSign', component: TestFormGridVitalSign },
  { path: '/disp-grid', name: 'DisplayGrid', component: TestDisplayGrid }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
