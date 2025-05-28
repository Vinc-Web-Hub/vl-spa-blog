<script setup>
import DisplayGrid from '../components/DisplayGrid.vue'
import formGridSpanSchema from '../schemas/formGridSpanSchema.js'

const personData = {
  name: 'Alice Martin',
  email: 'alice.martin@example.com',
  bio: 'Alice is a software engineer with 10 years of experience in backend development.',
  birthdate: '1985-11-15T00:00:00.000Z'
}

console.log('DisplayGrid Schema:', formGridSpanSchema)
console.log('Person Data:', personData)
console.log('DisplayGrid Component:', DisplayGrid)

</script>

<template>
    <div class="test-wrapper">
        <DisplayGrid :schema="formGridSpanSchema" :document="personData" />
    </div>
</template>

<style scoped>
.test-wrapper {
  padding: 2rem;
  max-width: 1000px;
  margin: auto;
}
</style>