export default [
  {
    type: 'button',
    label: 'Edit',
    color: '--color-primary',
    maxWidth: '100px',
    action: {
      type: 'navigate',
      to: (ctx) => `/modify-post/${ctx.id}`
    }
  },
  {
    type: 'button',
    label: 'Delete',
    color: '--color-primary',
    maxWidth: '100px',
    action: {
      type: 'emit',
      event: 'delete-post'
    }
  }
]
