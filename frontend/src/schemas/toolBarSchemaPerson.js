export default [
  {
    type: 'button',
    label: 'Edit',
    color: '--color-primary',
    maxWidth: '100px',
    action: {
      type: 'navigate',
      to: (ctx) => `/modify-person/${ctx.id}`
    }
  },
  {
    type: 'button',
    label: 'Delete',
    color: '--color-text-error',
    maxWidth: '100px',
    action: {
      type: 'emit',
      event: 'delete-person'
    }
  },
  {
    type: 'button',
    label: 'Vital Sign',
    icon: 'icon-heart',
    color: '--color-primary',
    maxWidth: '100px',
    action: {
      type: 'navigate',
      to: (ctx) => `/create-vs/${ctx.id}`
    }
  }, 
  {
    type: 'dropdown',
    label: 'Actions',
    color: '--color-green',
    maxWidth: '200px',
    options: [
      { label: 'Duplicate', action: { type: 'emit', event: 'duplicate' } },
      { label: 'Delete', action: { type: 'emit', event: 'delete' } }
    ]
  }
]
