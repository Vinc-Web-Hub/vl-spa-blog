<script setup>
import GenericList from '../components/GenericList.vue'

const patients = [
  {
    _id: '1',
    name: 'Doe',
    firstname: 'Jane',
    sex: 'Female',
    birthdate: '1990-05-01'
  },
  {
    _id: '2',
    name: 'Smith',
    firstname: 'John',
    sex: 'Male',
    birthdate: '1985-11-20'
  },
  {
    _id: '3',
    name: 'Martin',
    firstname: 'Alice',
    sex: 'Female',
    birthdate: '1978-02-15'
  }
]

const columns = [
  {
    key: 'name',
    label: 'Name',
    link: (patient) => `/patients/${patient._id}`
  },
  { key: 'firstname', label: 'Firstname' },
  { key: 'sex', label: 'Sex' },
  { key: 'birthdate', label: 'DOB', type: 'date' }
]
</script>

<template>
  <GenericList
    title="Patient List"
    :items="patients"
    :columns="columns"
    :searchFields="['name', 'firstname']"
    :pageSizeOptions="[5, 10, 20]"
  />
</template>
