<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import DisplayGrid from '../components/DisplayGrid.vue'
import formSchemaPost from '../schemas/formSchemaPost.js'
import ToolBar from '../components/ToolBar.vue'
import toolBarSchemaPost from '../schemas/toolBarSchemaPost.js'
import { fetchPostById } from '../services/frontEndService.js'

const route = useRoute()
const postData = ref(null)

onMounted(async () => {
  const id = route.params.id
  postData.value = await fetchPostById(id)
    console.log('POst Data !!!!!!:', postData.value) // Optional: Alert for debugging

})
</script>

<template>
  <div class="main-wrapper">
    <div v-if="postData">
      <ToolBar :schema="toolBarSchemaPost" :context="{ id: postData._id }" />
      <DisplayGrid :schema="formSchemaPost" :document="postData" :title="'Post Detail'" />
    </div>
    <p v-else>Loading...</p>
  </div>
  
</template>

<style scoped>
.main-wrapper {
  padding: 2rem;
  max-width: 1500px;
  margin: auto;
}
</style>
