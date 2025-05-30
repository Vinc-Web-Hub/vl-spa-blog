export default {
  __meta__: {
    title: 'Modify Person'
  },
  name: {
    type: 'string',
    label: 'Name',
    required: true,
    row: 1,
    col: 1
  },
  firstname: {
    type: 'string',
    label: 'First Name',
    required: true,
    row: 1,
    col: 2
  },
  birthDate: {
    type: 'date',
    label: 'Birth Date',
    required: true,
    row: 2,
    col: 1
  },
  sex: {
    type: 'enum',
    label: 'sex',
    values: ['Male', 'Female'],
    required: true,
    row: 2,
    col: 2
  },
  registrationDate: {
    type: 'date',
    label: 'Registration Date',
    required: true,
    visible: false,
    row: 3,
    col: 1
  }
}
