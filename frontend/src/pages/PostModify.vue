<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import FormGrid from '../components/FormGrid.vue';
import formSchemaPost from '../schemas/formSchemaPostModify.js';
import { fetchPostById, updatePost } from '../services/frontEndService.js';

const route = useRoute();
const router = useRouter();
const postData = ref(null);

const loadPost = async () => {
  const id = route.params.id;
  const data = await fetchPostById(id);
  if (data) postData.value = data;
  else router.push('/post-list');
};

onMounted(loadPost);

const handleSubmit = async (updated) => {
  try {
    await updatePost(route.params.id, updated);
    router.push('/post-list');
  } catch (err) {
    console.error('Failed to update post:', err);
    alert('Error updating post');
  }
};
</script>

<template>
  <div class="form-outer">
    <FormGrid
      v-if="postData"
      :schema="formSchemaPost"
      :initialValues="postData"
      @submit="handleSubmit"
    />
    <p v-else>Loading post data...</p>
  </div>
</template>

<style scoped>
.form-outer {
  padding-left: 1rem;
  padding-right: 1rem;
  min-height: 100vh;
}
</style>