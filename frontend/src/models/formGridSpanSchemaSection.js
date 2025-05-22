export default {
  __meta__: {
    title: 'Grid Form Example',
  },
  section1: {
  type: 'section',
  label: 'User Info',
  row: 1,
  col: 1
},
username: {
  type: 'string',
  row: 2,
  col: 1
},
password: {
  type: 'string',
  inputType: 'password',
  row: 2,
  col: 2
},
section2: {
  type: 'section',
  label: 'Preferences',
  row: 3,
  col: 1
},
language: {
  type: 'enum',
  values: ['EN', 'FR', 'DE'],
  row: 4,
  col: 1
},
section4: {
  type: 'section',
  label: 'Preferences',
  row: 5,
  col: 1
},
 bio: {
    type: 'textarea',
    rows: 4,
    row: 6,
    col: 1,
    colSpan: 2,
    rowSpan: 2
  },
altname: {
  type: 'string',
  row: 7,
  col: 1
},
   other: {
    type: 'textarea',
    rows: 4,
    row: 8,
    col: 1,
    colSpan: 2,
    rowSpan: 2
  },
}
