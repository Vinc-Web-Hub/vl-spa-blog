<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchPostsByDomain } from '../services/frontEndService'
import BlogCard from '../components/PostCard.vue'

const router = useRouter()
const musicPosts = ref([])
const loading = ref(true)
const error = ref(null)

const loadMusicPosts = async () => {
  try {
    const posts = await fetchPostsByDomain('Music')
    musicPosts.value = posts
  } catch (err) {
    error.value = 'Failed to load posts.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const goToPost = (id) => {
  router.push(`/post/${id}`)
}

onMounted(() => {
  loadMusicPosts()
})
</script>

<template>
  <div class="blog-container">
    <h1 class="blog-title">Music Posts</h1>
    <div v-if="loading" class="loading-message">Loading...</div>
    <div v-else-if="error" class="error-message">{{ error }}</div>
    <div v-else class="posts-container">
      <BlogCard
        v-for="post in musicPosts"
        :key="post._id"
        :post="post"
        :truncate="false"
        @card-click="goToPost"
      />
    </div>
  </div>
</template>

<style scoped>
.blog-container {
  padding-top: 6rem;
  padding-left: 1rem;
  padding-right: 1rem;
  min-height: 100vh;
}

.blog-title {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
}

.loading-message, 
.error-message {
  margin-bottom: 1.5rem;
}

.posts-container > * {
  margin-bottom: 1.5rem;
}

.posts-container > *:last-child {
  margin-bottom: 0;
}
</style>
