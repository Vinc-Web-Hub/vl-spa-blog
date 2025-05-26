<script setup>
import { useRouter } from 'vue-router';
import { createPost } from '../services/blogService';
import Form from '../components/Form.vue';
import formSchemaPost from '../models/formSchemaPerson.js';

const router = useRouter();

const handleSubmit = async (formData) => {
  try {
    await createPost(formData);
    router.push('/blog-list');
  } catch (err) {
    console.error('Failed to save post:', err);
    console.log('Error saving post. Please try again.');
  }
};
</script>

<template>
  <div class="form-outer">
      <Form :schema="formSchemaPost" @submit="handleSubmit" />
  </div>
</template>

<style scoped>
.form-outer {
  padding-left: 1rem;
  padding-right: 1rem;
  min-height: 100vh;
}

</style>
