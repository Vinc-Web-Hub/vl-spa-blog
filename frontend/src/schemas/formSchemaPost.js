export default {
  __meta__: {
    title: 'Add New Post'
  },
  title: { type: 'string', required: true, row: 1, col: 1 },
  date: { type: 'date', required: true, row:2, col: 1 },
  domain: {
    type: 'enum',
    values: ['Music', 'Science'],
    required: true,
    row: 3,
    col: 1 
  },
  content: { type: 'textarea', rows: 6, required: true, row: 4, col: 1, colSpan: 6}
}
