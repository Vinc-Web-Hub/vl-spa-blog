export default {
  __meta__: {
    title: 'Grid Form Example',
    maxWidth: '600px', // Add max-width configuration
  },
  name: {
    type: 'string',
    required: true,
    row: 1,
    col: 1,
    colSpan: 2
  },
  email: {
    type: 'string',
    required: true,
    row: 2,
    col: 1,
  },
  age: {
    type: 'number',
    required: true,
    min: 18,
    max: 120,
    row: 2,
    col: 2,
    placeholder: 'Enter your age'
  },
  salary: {
    type: 'number',
    min: 0,
    max: 1000000,
    step: 1000,
    row: 3,
    col: 1,
    placeholder: 'Annual salary'
  },
  bio: {
    type: 'textarea',
    rows: 4,
    row: 4,
    col: 1,
    colSpan: 2,
    rowSpan: 2
  },
  birthdate: {
    type: 'date',
    required: true,
    row: 3,
    col: 2
  }
}