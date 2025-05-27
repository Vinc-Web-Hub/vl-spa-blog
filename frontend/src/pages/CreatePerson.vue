<script setup>
import { useRouter } from 'vue-router';
import { createPerson } from '../services/frontEndService.js';
import Form from '../components/Form.vue';
import formSchemaPerson from '../models/formSchemaPerson.js';

const router = useRouter();

const handleSubmit = async (formData) => {
  try {
    console.log('Creating a person with data:', formData); // Optional: Alert for debugging
    await createPerson(formData);
    router.push('/');
  } catch (err) {
    console.error('Failed to create a person:', err);
    console.log('Error creating a person. Please try again.');
  }
};
</script>

<template>
  <div class="form-outer">
      <Form :schema="formSchemaPerson" @submit="handleSubmit" />
  </div>
</template>

<style scoped>
.form-outer {
  padding-left: 1rem;
  padding-right: 1rem;
  min-height: 100vh;
}

</style>
