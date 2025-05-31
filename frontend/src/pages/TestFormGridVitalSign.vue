<script setup>
import FormGrid from '../components/FormGrid.vue'
import schema from '../schemas/formGridVitalSigns.js'

function handleSubmit(data) {
  console.log('Submitted Data:', data)
  console.log('Form submitted! Check the console.')
}
</script>

<template>
  <div class="main-wrapper">
    <FormGrid :schema="schema" @submit="handleSubmit" />
  </div>
</template>

<style scoped>
.main-wrapper {
  padding: 2rem;
  max-width: 1500px;
  margin: auto;
}
</style>
