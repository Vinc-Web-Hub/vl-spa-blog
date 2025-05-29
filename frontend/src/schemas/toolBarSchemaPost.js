export default [
  {
    type: 'button',
    label: 'Edit',
    action: {
      type: 'navigate',
      to: (ctx) => `/modify-post/${ctx.id}`
    }
  },
  {
    type: 'button',
    label: 'Delete',
    action: {
      type: 'emit',
      event: 'delete-post'
    }
  }
]
