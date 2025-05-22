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

