import { createRouter, createWebHistory } from 'vue-router'
import Main from '../pages/Main.vue'
import Cards from '../pages/Cards.vue'
import BlogMusic from '../pages/BlogMusic.vue'
import BlogScience from '../pages/BlogScience.vue'
import BlogList from '../pages/BlogList.vue'
import BlogPost from '../pages/BlogPost.vue'
import AddPost from '../pages/AddPost.vue'

const routes = [
  { path: '/', name: 'Main', component: Main },
  { path: '/cards', name: 'Cards', component: Cards },
  { path: '/blog-music', name: 'BlogMusic', component: BlogMusic },
  { path: '/blog-science', name: 'BlogScience', component: BlogScience },
  { path: '/blog-list', name: 'BlogList', component: BlogList },
  { path: '/blog/:id', name: 'BlogPost', component: BlogPost, props: true },
  { path: '/add-post', name: 'AddPost', component: AddPost }

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
