// src/schemas/postListSchema.js
export default {
  title: 'Post List',
  columns: [
    {
      key: 'title',
      label: 'Title',
      link: (p) => `/post/${p._id}`
    },
    { key: 'domain', label: 'Domain' },
    { key: 'date', label: 'Date', type: 'date' }
  ],
  searchFields: ['title', 'domain'],
  pageSizeOptions: [10, 20, 50]
}
