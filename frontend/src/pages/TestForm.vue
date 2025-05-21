<template>
  <div class="test-form-wrapper">
    <Form />
  </div>
</template>

<script setup>
import Form from '../components/FormBasic.vue'; // Adjust the path if needed
</script>

<style scoped>
.test-form-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  background-color: #f3f4f6; /* light gray background for contrast */
  padding-top: 4rem;
}
</style>
