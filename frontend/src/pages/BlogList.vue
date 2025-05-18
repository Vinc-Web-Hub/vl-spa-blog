<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchAllPosts } from '../services/blogService'
import BlogCard from '../components/BlogCard.vue'

const router = useRouter()
const allPosts = ref([])
const loading = ref(true)
const error = ref(null)

const loadPosts = async () => {
  try {
    const posts = await fetchAllPosts()
    allPosts.value = posts
  } catch (err) {
    error.value = 'Failed to load posts.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const goToPost = (id) => {
  router.push(`/blog/${id}`)
}

onMounted(loadPosts)
</script>

<template>
  <div class="blog-list-container">
    <h1 class="blog-list-title">All Blog Posts</h1>
    <div v-if="loading" class="loading-indicator">Loading...</div>
    <div v-else-if="error" class="error-message">{{ error }}</div>
    <div v-else class="blog-cards-container">
      <BlogCard
        v-for="post in allPosts"
        :key="post._id"
        :post="post"
        :truncate="true"
        @card-click="goToPost"
      />
    </div>
  </div>
</template>

<style scoped>
.blog-list-container {
  padding-top: 6rem;
  padding-left: 1rem;
  padding-right: 1rem;
  min-height: 100vh;
}

.blog-list-title {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
}

.loading-indicator,
.error-message {
  margin-bottom: 1.5rem;
}

.blog-cards-container > * {
  margin-bottom: 1.5rem;
}

.blog-cards-container > *:last-child {
  margin-bottom: 0;
}
</style>
