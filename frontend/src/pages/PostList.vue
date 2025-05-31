<script setup>
import { ref, onMounted } from 'vue'
import GenericList from '../components/GenericList.vue'
import { fetchAllPosts } from '../services/frontEndService.js'
import listSchema from '../schemas/listSchemaPost.js'

const posts = ref([])

onMounted(async () => {
  posts.value = await fetchAllPosts()
})
</script>

<template>
  <GenericList
    :title="listSchema.title"
    :items="posts"
    :columns="listSchema.columns"
    :searchFields="listSchema.searchFields"
    :pageSizeOptions="listSchema.pageSizeOptions"
  />
</template>
