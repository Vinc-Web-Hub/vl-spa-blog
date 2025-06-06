export default {
  __meta__: {
    title: 'Event Registration Form',
    maxWidth: '700px',
  },
  eventName: {
    type: 'string',
    required: true,
    row: 1,
    col: 1,
    colSpan: 2,
    label: 'Event Name',
    placeholder: 'Enter event name'
  },
  
  // Date field with current date as default
  eventDate: {
    type: 'date',
    required: true,
    row: 2,
    col: 1,
    useCurrentDate: true,
    label: 'Event Date',
    help: 'Select the date for your event'
  },
  
  // Time field with current time as default
  eventTime: {
    type: 'time',
    required: true,
    row: 2,
    col: 2,
    useCurrentTime: true,
    label: 'Event Time',
    help: 'Select the start time'
  },
  
  // Date field with custom default
  registrationDeadline: {
    type: 'date',
    required: true,
    row: 3,
    col: 1,
    default: '2025-05-27', // Custom default date
    label: 'Registration Deadline',
    help: 'Last date to register'
  },
  
  // Time field with custom default time
  reminderTime: {
    type: 'time',
    row: 3,
    col: 2,
    default: '09:00',
    label: 'Daily Reminder Time',
    help: 'When to send daily reminders'
  },
  
  // Date field with min/max constraints
  birthDate: {
    type: 'date',
    row: 4,
    col: 1,
    min: '1900-01-01',
    max: '2010-12-31',
    label: 'Birth Date',
    help: 'Must be between 1900 and 2010'
  },
  
  // Time field with constraints and step
  appointmentTime: {
    type: 'time',
    row: 4,
    col: 2,
    min: '08:00',
    max: '17:00',
    step: '900', // 15-minute intervals (900 seconds)
    label: 'Appointment Time',
    help: 'Business hours: 8 AM - 5 PM'
  },
  
  // Optional date field (no default)
  alternativeDate: {
    type: 'date',
    row: 5,
    col: 1,
    label: 'Alternative Date',
    placeholder: 'Optional backup date'
  },
  
  // Optional time field
  flexibleTime: {
    type: 'time',
    row: 5,
    col: 2,
    label: 'Flexible Time',
    help: 'If main time is not available'
  },
  
  notes: {
    type: 'textarea',
    rows: 3,
    row: 6,
    col: 1,
    colSpan: 2,
    label: 'Additional Notes',
    placeholder: 'Any special requirements or notes...'
  }
}