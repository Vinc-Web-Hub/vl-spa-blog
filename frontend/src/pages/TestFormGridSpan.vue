<script setup>
import FormGrid from '../components/FormGrid.vue'
import schema from '../models/formGridSpanSchemaUR.js'

function handleSubmit(data) {
  console.log('Submitted Data:', data)
  alert('Form submitted! Check the console.')
}
</script>

<template>
  <div class="test-wrapper">
    <FormGrid :schema="schema" @submit="handleSubmit" />
  </div>
</template>

<style scoped>
.test-wrapper {
  padding: 2rem;
  max-width: 1000px;
  margin: auto;
}
</style>
