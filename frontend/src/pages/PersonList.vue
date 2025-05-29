<script setup>
import { ref, onMounted } from 'vue'
import GenericList from '../components/GenericList.vue'
import { fetchAllPerson } from '../services/frontEndService.js'

const person = ref([])

onMounted(async () => {
  person.value = await fetchAllPerson()
  console.log('Person fetched:', person.value) // Optional: Alert for debugging
})

const columns = [
  {
    key: 'name',
    label: 'Name',
    link: (p) => `/person/${p._id}`
  },
  { key: 'firstname', label: 'Firstname' },
  { key: 'sex', label: 'Sex' },
  { key: 'birthDate', label: 'DOB', type: 'date' }
]
</script>

<template>
  <GenericList
    title="Patient List"
    :items="person"
    :columns="columns"
    :searchFields="['name', 'firstname']"
    :pageSizeOptions="[10, 20, 50]"
  />
</template>
