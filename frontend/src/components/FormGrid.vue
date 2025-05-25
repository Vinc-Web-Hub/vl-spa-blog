<template>
  <div class="form-container" :style="containerStyle">
    <h2>{{ formTitle }}</h2>
    <form @submit.prevent="onSubmit" class="grid-form" :style="gridTemplate">
      <div
        v-for="(field, key) in visibleFields"
        :key="key"
        :class="['form-group', field.type === 'section' ? 'section-header' : '']"
        :style="gridStyle(field)"
      >
        <template v-if="field.type === 'section'">
          <div class="section-title" @click="toggleSection(key)">
            <span>{{ field.label || key }}</span>
            <span class="toggle-icon">{{ openSections[key] ? '▾' : '▸' }}</span>
          </div>
        </template>

        <template v-else-if="shouldShowField(key)">
          <label :for="getFieldId(key)">{{ field.label || formatLabel(key) }}</label>

          <input
            v-if="field.type === 'string'"
            :id="getFieldId(key)"
            :type="field.inputType || 'text'"
            v-model="formData[key]"
            :required="field.required"
            :placeholder="field.placeholder"
            :disabled="field.disabled"
          />

          <select
            v-else-if="field.type === 'enum'"
            :id="getFieldId(key)"
            v-model="formData[key]"
            :required="field.required"
            :disabled="field.disabled"
          >
            <option value="" disabled>{{ field.placeholder || 'Select an option' }}</option>
            <option v-for="option in field.values" :key="option" :value="option">
              {{ option }}
            </option>
          </select>

          <textarea
            v-else-if="field.type === 'textarea'"
            :id="getFieldId(key)"
            v-model="formData[key]"
            :rows="field.rows || 4"
            :required="field.required"
            :placeholder="field.placeholder"
            :disabled="field.disabled"
          ></textarea>

          <input
            v-else-if="field.type === 'date'"
            :id="getFieldId(key)"
            type="date"
            v-model="formData[key]"
            :required="field.required"
            :disabled="field.disabled"
          />

          <input
            v-else-if="field.type === 'number'"
            :id="getFieldId(key)"
            type="number"
            v-model.number="formData[key]"
            :required="field.required"
            :min="field.min"
            :max="field.max"
            :step="field.step"
            :placeholder="field.placeholder"
            :disabled="field.disabled"
            :class="{ 'error-input': fieldErrors[key] }"
            @blur="validateNumberField(key, field)"
            @input="clearFieldError(key)"
          />

          <input
            v-else-if="field.type === 'email'"
            :id="getFieldId(key)"
            type="email"
            v-model="formData[key]"
            :required="field.required"
            :placeholder="field.placeholder"
            :disabled="field.disabled"
          />

          <div v-else-if="field.type === 'checkbox'" class="checkbox-container">
            <input
              :id="getFieldId(key)"
              type="checkbox"
              v-model="formData[key]"
              :required="field.required"
              :disabled="field.disabled"
            />
            <label :for="getFieldId(key)" class="checkbox-label">
              {{ field.checkboxLabel || field.label || formatLabel(key) }}
            </label>
          </div>

          <div v-else class="error">
            Unsupported field type: {{ field.type }}
          </div>

          <div v-if="field.help" class="help-text">
            {{ field.help }}
          </div>

          <div v-if="fieldErrors[key]" class="error-message">
            {{ fieldErrors[key] }}
          </div>
        </template>
      </div>

      <button type="submit" class="submit-button" :style="submitButtonStyle" :disabled="isSubmitting">
        {{ isSubmitting ? 'Submitting...' : (schema.__meta__?.submitText || 'Submit') }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watchEffect } from 'vue'

const openSections = reactive({})
const isSubmitting = ref(false)

const props = defineProps({
  schema: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['submit'])
const formData = reactive({})
const fieldErrors = reactive({})

// Title
const formTitle = computed(() => props.schema.__meta__?.title || 'Dynamic Grid Form')

// Container style with dynamic max-width
const containerStyle = computed(() => {
  const maxWidth = props.schema.__meta__?.maxWidth || '800px'
  return {
    maxWidth: maxWidth
  }
})

// Fields without __meta__
const visibleFields = computed(() => {
  const { __meta__, ...fields } = props.schema
  return fields
})

// Dynamically compute the number of columns from the highest col + colSpan
const totalColumns = computed(() => {
  let maxCol = 1
  for (const field of Object.values(visibleFields.value)) {
    const startCol = field.col ?? 1
    const span = field.colSpan ?? 1
    const endCol = startCol + span - 1
    if (endCol > maxCol) maxCol = endCol
  }
  return Math.max(maxCol, props.schema.__meta__?.minColumns || 1)
})

// CSS grid template style
const gridTemplate = computed(() => ({
  gridTemplateColumns: `repeat(${totalColumns.value}, 1fr)`
}))

// Positioning of inputs
const gridStyle = (field) => ({
  gridColumn: `${field.col ?? 1} / span ${field.colSpan ?? (field.type === 'section' ? totalColumns.value : 1)}`,
  gridRow: field.row ? `${field.row} / span ${field.rowSpan ?? 1}` : 'auto',
  alignSelf: field.align ?? 'stretch',
  justifySelf: field.justify ?? 'stretch'
})

// Submit button spans entire width
const submitButtonStyle = computed(() => ({
  gridColumn: `1 / span ${totalColumns.value}`
}))

// Initialize default values
watchEffect(() => {
  for (const [key, field] of Object.entries(visibleFields.value)) {
    if (field.type === 'section' && !(key in openSections)) {
      openSections[key] = field.open !== false // sections open by default unless explicitly closed
    }
    if (!(key in formData) && field.type !== 'section') {
      formData[key] = getDefaultValue(field)
    }
  }
})

function getDefaultValue(field) {
  if (field.default !== undefined) return field.default
  
  switch (field.type) {
    case 'string':
    case 'textarea':
    case 'email':
      return ''
    case 'number':
      return null
    case 'checkbox':
      return false
    case 'date':
      return ''
    case 'enum':
      return ''
    default:
      return null
  }
}

function shouldShowField(fieldKey) {
  const field = visibleFields.value[fieldKey]
  if (!field || field.type === 'section') return true

  // Find the closest section *before* this field by row number
  const fieldRow = field.row ?? Infinity
  let closestSectionKey = null
  let closestRow = -1

  for (const [key, value] of Object.entries(visibleFields.value)) {
    if (value.type === 'section') {
      const sectionRow = value.row ?? 0
      if (sectionRow <= fieldRow && sectionRow > closestRow) {
        closestSectionKey = key
        closestRow = sectionRow
      }
    }
  }

  return closestSectionKey ? openSections[closestSectionKey] : true
}

function toggleSection(key) {
  openSections[key] = !openSections[key]
}

function getFieldId(key) {
  return `field-${key}`
}

function formatLabel(key) {
  return key.replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim()
}

function validateNumberField(fieldKey, field) {
  const value = formData[fieldKey]
  
  // Clear any existing error
  delete fieldErrors[fieldKey]
  
  // Skip validation if field is empty and not required
  if ((value === null || value === undefined || value === '') && !field.required) {
    return true
  }
  
  // Check if value exists for required fields
  if (field.required && (value === null || value === undefined || value === '')) {
    fieldErrors[fieldKey] = 'This field is required'
    return false
  }
  
  // Validate min value
  if (field.min !== undefined && value < field.min) {
    fieldErrors[fieldKey] = `Value must be at least ${field.min}`
    return false
  }
  
  // Validate max value
  if (field.max !== undefined && value > field.max) {
    fieldErrors[fieldKey] = `Value must be no more than ${field.max}`
    return false
  }
  
  return true
}

function clearFieldError(fieldKey) {
  if (fieldErrors[fieldKey]) {
    delete fieldErrors[fieldKey]
  }
}

function validateAllFields() {
  let isValid = true
  
  for (const [key, field] of Object.entries(visibleFields.value)) {
    if (field.type === 'number') {
      const fieldValid = validateNumberField(key, field)
      if (!fieldValid) isValid = false
    }
  }
  
  return isValid
}

async function onSubmit() {
  if (isSubmitting.value) return
  
  // Validate all fields before submission
  if (!validateAllFields()) {
    return
  }
  
  isSubmitting.value = true
  try {
    await emit('submit', { ...formData })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.form-container {
  max-width: 800px; /* Default fallback - will be overridden by inline style */
  width: 100%;
  margin: 6rem auto 0 auto;
  padding: 2rem;
  background: var(--color-myapp-white);
  border-radius: 1rem;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);
  font-family: -apple-system, BlinkMacSystemFont, 'San Francisco', 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

h2 {
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 2rem;
  color: var(--color-text-dark);
  letter-spacing: -0.01em;
}

.grid-form {
  display: grid;
  gap: 1.5rem;
  grid-auto-rows: minmax(auto, auto);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 500;
  font-size: 0.95rem;
  color: var(--color-text-dark);
  letter-spacing: 0.01em;
}

input:not([type="checkbox"]),
select,
textarea {
  width: 100%;
  padding: 0.65rem 1rem;
  border: 1px solid var(--color-header-light);
  border-radius: 0.5rem;
  font-size: 0.95rem;
  background: var(--color-myapp-white);
  transition: all 0.2s ease;
  color: var(--color-text-dark);
}

input:not([type="checkbox"]).error-input,
select.error-input,
textarea.error-input {
  border-color: #ef4444;
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}

input:not([type="checkbox"]):focus,
select:focus,
textarea:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  outline: none;
}

input:disabled,
select:disabled,
textarea:disabled {
  background-color: var(--color-myapp-white);
  color: var(--color-header-light);
  cursor: not-allowed;
}

select {
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1rem;
  padding-right: 2.5rem;
  -webkit-appearance: none;
}

textarea {
  resize: vertical;
  line-height: 1.6;
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.checkbox-container input[type="checkbox"] {
  width: auto;
  margin: 0;
}

.checkbox-label {
  margin: 0;
  cursor: pointer;
}

.help-text {
  font-size: 0.875rem;
  color: var(-—color-text-grey);
  margin-top: 0.25rem;
}

.submit-button {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: var(--color-primary);
  color: var(--color-myapp-white);
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: 0.01em;
}

.submit-button:hover:not(:disabled) {
  background: var(--color-primary);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.submit-button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.error {
  font-size: 0.875rem;
  color: var(--color-text-error);
  margin-top: 0.25rem;
  padding: 0.5rem;
  background-color: var(--color-header-light);
  border-radius: 0.375rem;
  border: 1px solid #fecaca;
}

.error-message {
  font-size: 0.875rem;
  color: #ef4444;
  margin-top: 0.25rem;
  font-weight: 500;
}

.section-header {
  grid-column: 1 / -1;
  background: var(--color-header-light);
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: val(--color-text-dark);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.section-title:hover {
  background-color: var(--color-header-light);
}

.toggle-icon {
  font-size: 1.25rem;
  line-height: 1;
  transition: transform 0.2s ease;
}

@media (max-width: 768px) {
  .form-container {
    margin-top: 4rem;
    padding: 1.5rem;
  }
  
  .grid-form {
    gap: 1.25rem;
  }
}
</style>