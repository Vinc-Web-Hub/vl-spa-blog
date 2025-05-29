export default {
  __meta__: {
    title: 'Add New Post',
    maxWidth: '600px'
  },
  title: { type: 'string', required: true, row: 1, col: 1, colSpan: 2, label: 'Title', placeholder: 'Enter post title' },
  date: { type: 'date', required: true, row:2, col: 1 },
  domain: {
    type: 'enum',
    values: ['Music', 'Science'],
    required: true,
    row: 2,
    col: 2 
  },
  content: { type: 'textarea', rows: 6, required: true, row: 3, col: 1, colSpan: 2, rowSpan: 6, label: 'Content', placeholder: 'Write your post content here' }
}
