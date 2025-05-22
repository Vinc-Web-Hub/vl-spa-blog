There are 2 Dynamic Form components : Form.vue and FormGrid.vue

Form.vue is a simple mono-column component
FormGrid.vue allows to create complex form, with several columns, and offers span over rows and columns
and form sections.

The Forms are described within .js files called Schemas 

Options for fields layout wihthin a form :
align: maps to align-self → controls vertical alignment
  Values: start, center, end, stretch
justify: maps to justify-self → controls horizontal alignment
  Values: start, center, end, stretch

span sur plusieurs colonnes ou lignes

  bio: {
    type: 'textarea',
    rows: 4,
    row: 3,
    col: 1,
    colSpan: 2,
    rowSpan: 2
  },
  
  creation d'une section

  section1: {
  type: 'section',
  label: 'User Information',
  row: 1,
  col: 1
},

