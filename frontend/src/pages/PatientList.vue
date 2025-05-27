<script setup>
import { ref, onMounted } from 'vue'
import GenericList from '../components/GenericList.vue'
import { fetchAllPatients } from '../services/frontEndService.js'

const patients = ref([])

onMounted(async () => {
  patients.value = await fetchAllPatients()
  console.log('Patients fetched:', patients.value) // Optional: Alert for debugging
})

const columns = [
  {
    key: 'name',
    label: 'Name',
    link: (p) => `/patients/${p._id}`
  },
  { key: 'firstname', label: 'Firstname' },
  { key: 'sex', label: 'Sex' },
  { key: 'birthDate', label: 'DOB', type: 'date' }
]
</script>

<template>
  <GenericList
    title="Patient List"
    :items="patients"
    :columns="columns"
    :searchFields="['name', 'firstname']"
    :pageSizeOptions="[10, 20, 50]"
  />
</template>
