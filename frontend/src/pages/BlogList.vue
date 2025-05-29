<script setup>
import { ref, onMounted } from 'vue'
import GenericList from '../components/GenericList.vue'
import { fetchAllPosts } from '../services/frontEndService.js'

const posts = ref([])

onMounted(async () => {
  posts.value = await fetchAllPosts()
  console.log('Posts fetched:', posts.value) // Optional: Alert for debugging
})

const columns = [
  {
    key: 'title',
    label: 'Title',
    link: (p) => `/post/${p._id}`
  },
  { key: 'domain', label: 'Domain' },
  { key: 'date', label: 'Date', type: 'date' }
]
</script>

<template>
  <GenericList
    title="Post List"
    :items="posts"
    :columns="columns"
    :searchFields="['title', 'domain']"
    :pageSizeOptions="[10, 20, 50]"
  />
</template>
