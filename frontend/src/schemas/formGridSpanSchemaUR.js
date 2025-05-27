export default {
  __meta__: {
    title: "User Registration Form",
    submitText: "Create Account",
    minColumns: 2
  },
  personalInfo: {
    type: 'section',
    label: 'Personal Information',
    row: 1,
    open: true
  },
  firstName: {
    type: 'string',
    label: 'First Name',
    required: true,
    placeholder: 'Enter your first name',
    row: 2,
    col: 1
  },
  lastName: {
    type: 'string',
    label: 'Last Name',
    required: true,
    placeholder: 'Enter your last name',
    row: 2,
    col: 2
  },
  email: {
    type: 'email',
    label: 'Email Address',
    required: true,
    row: 3,
    colSpan: 2,
    help: 'We will never share your email'
  },
  age: {
    type: 'number',
    label: 'Age',
    min: 18,
    max: 120,
    row: 4,
    col: 1
  },
  subscribe: {
    type: 'checkbox',
    label: 'Subscribe to newsletter',
    checkboxLabel: 'Yes, I want to receive updates',
    row: 5,
    colSpan: 2
  }
}