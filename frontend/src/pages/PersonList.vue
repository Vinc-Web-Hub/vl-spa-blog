<script setup>
import { ref, onMounted } from 'vue'
import GenericList from '../components/GenericList.vue'
import { fetchAllPerson } from '../services/frontEndService.js'
import listSchema from '../schemas/listSchemaPerson.js'

const person = ref([])

onMounted(async () => {
  person.value = await fetchAllPerson()
})
</script>

<template>
  <GenericList
    :title="listSchema.title"
    :items="person"
    :columns="listSchema.columns"
    :searchFields="listSchema.searchFields"
    :pageSizeOptions="listSchema.pageSizeOptions"
  />
</template>