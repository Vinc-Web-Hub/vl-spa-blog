import { createRouter, createWebHistory } from 'vue-router'
import Main from '../pages/Main.vue'
import Cards from '../pages/Cards.vue'
import BlogMusic from '../pages/BlogMusic.vue'
import BlogScience from '../pages/BlogScience.vue'
import BlogList from '../pages/BlogList.vue'
import BlogPost from '../pages/BlogPost.vue'
import AddPost from '../pages/AddPost.vue'
import CreateUser from '../pages/CreateUser.vue'
import UserLogin from '../pages/UserLogin.vue'
import TestFormGridSPanLogin from '../pages/TestFormGridSpanLogin.vue'
import TestFormGridSpan from '../pages/TestFormGridSpan.vue'
import ModifyPost from '../pages/ModifyPost.vue'

const routes = [
  { path: '/', name: 'Main', component: Main },
  { path: '/cards', name: 'Cards', component: Cards },
  { path: '/blog-music', name: 'BlogMusic', component: BlogMusic },
  { path: '/blog-science', name: 'BlogScience', component: BlogScience },
  { path: '/blog-list', name: 'BlogList', component: BlogList },
  { path: '/blog/:id', name: 'BlogPost', component: BlogPost, props: true },
  { path: '/add-post', name: 'AddPost', component: AddPost },
  { path: '/create-user', name: 'CreateUser', component: CreateUser },
  { path: '/login', name: 'Login', component: UserLogin },
  { path: '/form-login', name: 'FormSpanLogin', component: TestFormGridSPanLogin },
  { path: '/form-span', name: 'FormSpan', component: TestFormGridSpan },
  { path: '/modify-post/:id', name: 'ModifyPost', component: ModifyPost, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
