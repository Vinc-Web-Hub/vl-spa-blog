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


gestion des evenements : Date et Heure

Ajout d'une option "help" pour le champ a saisir dans le formulaire.

help: 'Select the date for your event'

Type Date

dafaut sur la date courante : useCurrentDate: true,
containte min et mex : 
    min: '1900-01-01',
    max: '2010-12-31',

Type Time

dafaut sur l'heure courante : useCurrentTime: true,
custom default :     default: '09:00',
containtes min, max et sur l'incrément de temps
    min: '08:00',
    max: '17:00',
    step: '900', // 15-minute intervals (900 seconds)

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
    default: '2025-05-27',
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