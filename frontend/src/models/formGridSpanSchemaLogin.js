export default {
  __meta__: {
    title: 'Login',
  },
  username: {
    type: 'string',
    required: true,
    row: 1,
    col: 1
  },
  password: {
    type: 'string',
    required: true,
    inputType: 'password',
    row: 2,
    col: 1
  }
}
