<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import DisplayGrid from '../components/DisplayGrid.vue'
import formSchemaPerson from '../schemas/formSchemaPerson.js'
import { fetchPersonById } from '../services/frontEndService.js'

const route = useRoute()
const personData = ref(null)

onMounted(async () => {
  const id = route.params.id
  personData.value = await fetchPersonById(id)
    console.log('Person Data !!!!!!:', personData.value) // Optional: Alert for debugging

})
</script>

<template>
  <div class="test-wrapper">
    <div v-if="personData">
      <DisplayGrid :schema="formSchemaPerson" :document="personData" />
    </div>
    <p v-else>Loading...</p>
  </div>
</template>

<style scoped>
.test-wrapper {
  padding: 2rem;
}
</style>
