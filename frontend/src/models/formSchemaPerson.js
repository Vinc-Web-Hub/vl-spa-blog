export default {
  __meta__: {
    title: 'Add New Person'
  },
  name: { type: 'string', required: true },
  firstname: { type: 'string', required: true },
  birthDate: { type: 'date', required: true },
  sex: {
    type: 'enum',
    values: ['Male', 'Female'],
    required: true
  },
  registrationDate: { type: 'date', required: true },
}
