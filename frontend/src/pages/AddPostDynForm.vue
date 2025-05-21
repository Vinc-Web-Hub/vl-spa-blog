<script setup>
import { useRouter } from 'vue-router';
import { createPost } from '../services/blogService';
import Form from '../components/Form.vue';
import { formSchemaPost as schema } from '../models/formSchemaPost.js';

const router = useRouter();

const handleSubmit = async (formData) => {
  try {
    await createPost(formData);
    router.push('/blog-list');
  } catch (err) {
    console.error('Failed to save post:', err);
    alert('Error saving post. Please try again.');
  }
};
</script>

<template>
  <div class="addpost-outer">
    <div class="addpost-container">
      <h1 class="addpost-title">Add New Post</h1>
      <Form :schema="schema" @submit="handleSubmit" />
    </div>
  </div>
</template>

<style scoped>
.addpost-outer {
  padding-top: 6rem;
  padding-left: 1rem;
  padding-right: 1rem;
  min-height: 100vh;
}

.addpost-container {
  max-width: 700px;
  margin: 0 auto;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.addpost-title {
  font-size: 2rem;
  font-weight: bold;
  color: #2d3748;
  margin-bottom: 1rem;
}
</style>
