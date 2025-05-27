export default {
  __meta__: {
    title: 'Add New Post'
  },
  title: { type: 'string', required: true },
  date: { type: 'date', required: true },
  domain: {
    type: 'enum',
    values: ['Music', 'Science'],
    required: true
  },
  content: { type: 'textarea', rows: 6, required: true }
}
