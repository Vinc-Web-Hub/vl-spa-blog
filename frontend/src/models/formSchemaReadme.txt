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

limitation de la largeur d'un formulaire

 __meta__: {
    title: 'Grid Form Example',
    maxWidth: '600px', // Add max-width configuration
  },

controle des valeurs minn max et incrément d'un champ numerique

 salary: {
    type: 'number',
    min: 0,
    max: 1000000,
    step: 1000,

ajout de "placeholder" optionnels dans les champs

  age: {
    type: 'number',
    required: true,
    min: 18,
    max: 120,
    row: 2,
    col: 2,
    placeholder: 'Enter your age'

exemple d'un fichier formGridExample.js

 __meta__: {
    title: 'Grid Form Example',
    maxWidth: '600px', // Add max-width configuration
  },
  name: {
    type: 'string',
    required: true,
    row: 1,
    col: 1,
    colSpan: 2
  },
  email: {
    type: 'string',
    required: true,
    row: 2,
    col: 1,
  },
  age: {
    type: 'number',
    required: true,
    min: 18,
    max: 120,
    row: 2,
    col: 2,
    placeholder: 'Enter your age'
  },
  salary: {
    type: 'number',
    min: 0,
    max: 1000000,
    step: 1000,
    row: 3,
    col: 1,
    placeholder: 'Annual salary'
  },
  bio: {
    type: 'textarea',
    rows: 4,
    row: 4,
    col: 1,
    colSpan: 2,
    rowSpan: 2
  },
  birthdate: {
    type: 'date',
    required: true,
    row: 3,
    col: 2
  }
}