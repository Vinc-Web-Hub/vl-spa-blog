export default {
  __meta__: {
    title: 'Vital Signs',
    maxWidth: '400px', // Add max-width configuration
    description: 'Enter the vital signs of the patient.',
    icon: 'heart-rate', // Example icon, adjust as needed
  },
  name: {
    type: 'string',
    required: true,
    row: 1,
    col: 1,
  },
   date: {
    type: 'date',
    required: true,
    row: 2,
    col: 1
  },
   time: {
    type: 'time',
    required: true,
    row: 2,
    col: 2
  },
  Temp: {
    type: 'number',
    required: true,
    min: 32,
    max: 45,
    step: 0.1,
    row: 3,
    col: 1,
    placeholder: 'Temp. (°C)',
  },
  SPB: {
    type: 'number',
    required: true,
    min: 50,
    max: 300,
    step:5,
    row: 4,
    col: 1,
    placeholder: 'Syst. BP(mmHg)'
  },
  DPB: {
    type: 'number',
    required: true,
    min: 50,
    max: 200,
    step: 5,
    row: 4,
    col: 2,
    placeholder: 'Diast. BP (mmHg)'
  },
  HR: {
    type: 'number',
    required: true,
    min: 30,
    max: 300,
    step: 1,
    row: 5,
    col: 1,
    placeholder: 'Heart Rate (bpm)'
  },
    RespRate: {
    type: 'number',
    required: true,
    min: 10,
    max: 100,
    step: 1,
    row: 6,
    col: 1,
    placeholder: 'Resp Rate (rpm)'
  },
  SpO2: {
    type: 'number',
    min: 0,
    max: 100,
    step: 1,
    row: 7,
    col: 1,
    placeholder: 'Oxygen Sat. (%)'
  }
}