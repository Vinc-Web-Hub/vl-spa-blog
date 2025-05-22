export default{
  __meta__: {
    title: 'User Login'
  },
  username: {
    type: 'string',
    required: true
  },
  password: {
    type: 'string',
    required: true,
    inputType: 'password' // 👈 NEW!
  }
}
