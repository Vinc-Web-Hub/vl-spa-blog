<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchPostById } from '../services/blogService'

const route = useRoute()
const router = useRouter()

const post = ref(null)
const loading = ref(true)
const error = ref(null)

const loadPost = async () => {
  loading.value = true
  try {
    const id = route.params.id
    const fetchedPost = await fetchPostById(id)
    if (fetchedPost) {
      post.value = fetchedPost
    } else {
      error.value = 'Post not found.'
      router.push('/blog-list')
    }
  } catch (err) {
    console.error('Error loading post:', err)
    error.value = 'Failed to load post.'
  } finally {
    loading.value = false
  }
}

onMounted(loadPost)
watch(() => route.params.id, loadPost)
</script>

<template>
  <div class="blogpost-container">
    <div v-if="loading">Loading post...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div class="blogpost-content">
        <h1 class="blogpost-title">{{ post.title }}</h1>
        <p class="blogpost-meta">{{ post.date }} — {{ post.domain }}</p>
        <div class="blogpost-body">
          {{ post.content }}
        </div>
      </div>

      <!-- Back link based on domain -->
      <div class="blogpost-back">
        <RouterLink
          :to="post.domain === 'Music' ? '/blog-music' : '/blog-science'"
          class="blogpost-back-link"
        >
          ← Back to Blog {{ post.domain }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blogpost-container {
  padding: 1.5rem;
  padding-top: 6rem;
  max-width: 700px;
  margin: 0 auto;
  min-height: 100vh;
}

.blogpost-content {
  margin-bottom: 2rem;
}

.blogpost-title {
  font-size: 2rem;
  font-weight: bold;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.blogpost-meta {
  color: #6b7280;
  font-size: 0.9rem;
}

.blogpost-body {
  margin-top: 1rem;
  font-size: 1.125rem;
  white-space: pre-line;
  color: #374151;
}

.blogpost-back {
  margin-top: 2rem;
}

.blogpost-back-link {
  color: #2563eb;
  text-decoration: none;
  font-size: 0.95rem;
}

.blogpost-back-link:hover {
  text-decoration: underline;
}
</style>
