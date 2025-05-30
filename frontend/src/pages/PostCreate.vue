<script setup>
import { useRouter } from 'vue-router';
import Form from '../components/FormGrid.vue';
import formSchemaPost from '../schemas/formSchemaPost.js';
import { createPost } from '../services/frontEndService.js';

const router = useRouter();

const handleSubmit = async (formData) => {
  try {
    await createPost(formData);
    router.push('/post-list');
  } catch (err) {
    console.error('Failed to save post:', err);
    console.log('Error saving post. Please try again.');
  }
};
</script>

<template>
  <div class="form-outer">
      <Form :schema="formSchemaPost" :title="'Create Post...'" @submit="handleSubmit" />
  </div>
</template>

<style scoped>
.form-outer {
  padding-left: 1rem;
  padding-right: 1rem;
  min-height: 100vh;
}

</style>
