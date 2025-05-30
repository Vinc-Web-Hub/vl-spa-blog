export default [
  {
    type: 'button',
    label: 'Edit',
    color: 'primary',        // Maps to --color-primary in CSS
    maxWidth: '50px',
    action: {
      type: 'navigate',
      to: (ctx) => `/modify-person/${ctx.id}`
    }
  },
  {
    type: 'button',
    label: 'Delete',
    color: 'red',        // Maps to --color-red in CSS
    maxWidth: '140px',
    action: {
      type: 'emit',
      event: 'delete-person'
    }
  }
]
