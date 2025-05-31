// src/schemas/personListSchema.js
export default {
  title: 'Person List',
  columns: [
    {
      key: 'name',
      label: 'Name',
      link: (p) => `/person/${p._id}`
    },
  { key: 'firstname', label: 'Firstname' },
  { key: 'sex', label: 'Sex' },
  { key: 'birthDate', label: 'DOB', type: 'date' }
  ],
  searchFields: ['name', 'firstname', 'domain'],
  pageSizeOptions: [10, 20, 50]
}

