<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import FormGrid from '../components/FormGrid.vue';
import formSchemaVS from '../schemas/formGridVitalSigns.js';
import { createVitalSigns, fetchPersonById } from '../services/frontEndService.js';

const route = useRoute();
const router = useRouter();
const personId = route.params.id;

const personData = ref(null);

const handleSubmit = async (formData) => {
  try {
    await createVitalSigns({ ...formData, personId }); // attach personId
    router.push('/');
  } catch (err) {
    console.error('Failed to create a VS record:', err);
    alert('Error creating a VS record. Please try again.');
  }
};

// Fetch the person's data
onMounted(async () => {
  const person = await fetchPersonById(personId);
  if (person) {
    personData.value = person;
  }
});
</script>

<template>
  <div class="test-wrapper">
    <h2 v-if="personData">Add Vital Sign for : {{ personData.firstname }} {{ personData.name }}</h2>
    <FormGrid
      v-if="personData"
      :schema="formSchemaVS"
      :initialValues="{ personId: personData._id, name: personData.name }"
      @submit="handleSubmit"
    />
    <p v-else>Loading patient info...</p>
  </div>
</template>
