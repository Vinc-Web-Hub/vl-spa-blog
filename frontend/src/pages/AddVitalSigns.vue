<script setup>
import { useRouter } from 'vue-router';
import { createVitalSigns } from '../services/blogService.js';
import FormGrid from '../components/FormGrid.vue'
import formSchemaVS from '../models/formGridVitalSigns.js'

const router = useRouter();

const handleSubmit = async (formData) => {
  try {
    await createVitalSigns(formData);
    router.push('/');
  } catch (err) {
    console.error('Failed to create a VS record:', err);
    console.log('Error creating a VS record. Please try again.');
  }
};
</script>

<template>
  <div class="test-wrapper">
      <FormGrid :schema="formSchemaVS" @submit="handleSubmit" />
  </div>
</template>

<style scoped>
.test-wrapper {
  padding: 2rem;
  max-width: 1000px;
  margin: auto;
}
</style>
