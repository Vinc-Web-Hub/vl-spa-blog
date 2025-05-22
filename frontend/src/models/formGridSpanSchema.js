export default {
  __meta__: {
    title: 'Grid Form Example',
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
  bio: {
    type: 'textarea',
    rows: 4,
    row: 3,
    col: 1,
    colSpan: 2,
    rowSpan: 2
  },
  birthdate: {
    type: 'date',
    row: 2,
    col: 2
  }
}
