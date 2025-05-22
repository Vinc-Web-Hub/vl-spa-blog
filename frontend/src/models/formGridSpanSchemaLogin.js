export default {
  __meta__: {
    title: 'Login',
  },
  section1: {
  type: 'section',
  label: 'User Information',
  row: 1,
  col: 1
},
  username: {
    type: 'string',
    required: true,
    row: 2,
    col: 1
  },
  password: {
    type: 'string',
    required: true,
    inputType: 'password',
    row: 3,
    col: 1
  }
}
