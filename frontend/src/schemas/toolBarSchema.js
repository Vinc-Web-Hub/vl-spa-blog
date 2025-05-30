export default [
  {
    type: 'button',
    label: 'Edit',
    color: '--color-primary',        // Maps to --color-primary in CSS
    maxWidth: '100px',
    action: {
      type: 'navigate',
      to: (ctx) => `/modify-person/${ctx.id}`
    }
  },
  {
    type: 'button',
    label: 'Delete',
    color: '--color-red',        // Maps to --color-red in CSS
    maxWidth: '100px',
    action: {
      type: 'emit',
      event: 'delete-person'
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
