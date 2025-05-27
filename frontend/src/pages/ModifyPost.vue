<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPostById, updatePost } from '../services/frontEndService.js';
import Form from '../components/Form.vue';
import formSchemaPost from '../schemas/formSchemaPost.js';

const route = useRoute();
const router = useRouter();
const postId = route.params.id;

const initialData = ref(null);
const loading = ref(true);

onMounted(async () => {
  try {
    const post = await getPostById(postId);
    console.log('Fetched post:', post); // <-- Debug log
    initialData.value = post;
  } catch (err) {
    console.error('Failed to load post:', err);
    console.log('Error loading post. Please try again.');
  } finally {
    loading.value = false;
  }
});

const handleSubmit = async (formData) => {
  try {
    await updatePost(postId, formData);
    router.push('/blog-list');
  } catch (err) {
    console.error('Failed to update post:', err);
    console.log('Error updating post. Please try again.');
  }
};
</script>

<template>
  <div class="form-outer">
    <div v-if="loading">Loading...</div>
    <Form v-else :schema="formSchemaPost" :initialData="initialData" @submit="handleSubmit" />
  </div>
</template>

<style scoped>
.form-outer {
  padding-left: 1rem;
  padding-right: 1rem;
  min-height: 100vh;
}
</style>
