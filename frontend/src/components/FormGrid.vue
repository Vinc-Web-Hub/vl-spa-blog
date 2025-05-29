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
          <label :for="getFieldId(key)" class="form-label">{{ field.label || formatLabel(key) }}</label>

          <input
            v-if="field.type === 'string'"
            :id="getFieldId(key)"
            :type="field.inputType || 'text'"
            v-model="formData[key]"
            :required="field.required"
            :placeholder="field.placeholder"
            :disabled="field.disabled"
            class="form-input"
          />

          <select
            v-else-if="field.type === 'enum'"
            :id="getFieldId(key)"
            v-model="formData[key]"
            :required="field.required"
            :disabled="field.disabled"
            class="form-input"
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
            class="form-input"
          ></textarea>

          <input
            v-else-if="field.type === 'date'"
            :id="getFieldId(key)"
            type="date"
            v-model="formData[key]"
            :required="field.required"
            :disabled="field.disabled"
            :min="field.min"
            :max="field.max"
            class="form-input"
          />

          <input
            v-else-if="field.type === 'time'"
            :id="getFieldId(key)"
            type="time"
            v-model="formData[key]"
            :required="field.required"
            :disabled="field.disabled"
            :min="field.min"
            :max="field.max"
            :step="field.step"
            class="form-input"
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
            :class="['form-input', { 'error-input': fieldErrors[key] }]"
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
            class="form-input"
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

          <div v-else class="error">Unsupported field type: {{ field.type }}</div>

          <div v-if="field.help" class="help-text">{{ field.help }}</div>
          <div v-if="fieldErrors[key]" class="error-message">{{ fieldErrors[key] }}</div>
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
  },
  initialValues: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['submit'])
const formData = reactive({})
const fieldErrors = reactive({})

const formTitle = computed(() => props.schema.__meta__?.title || 'Dynamic Form')

const visibleFields = computed(() => {
  const { __meta__, ...fields } = props.schema
  return fields
})

const containerStyle = computed(() => {
  const maxWidth = props.schema.__meta__?.maxWidth || '800px'
  return {
    maxWidth: maxWidth,
    margin: '6rem auto 0 auto',
    padding: '2rem'
  }
})

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

const gridTemplate = computed(() => ({
  gridTemplateColumns: `repeat(${totalColumns.value}, 1fr)`
}))

const gridStyle = (field) => ({
  gridColumn: `${field.col ?? 1} / span ${field.colSpan ?? (field.type === 'section' ? totalColumns.value : 1)}`,
  gridRow: field.row ? `${field.row} / span ${field.rowSpan ?? 1}` : 'auto',
  alignSelf: field.align ?? 'stretch',
  justifySelf: field.justify ?? 'stretch'
})

const submitButtonStyle = computed(() => ({
  gridColumn: `1 / span ${totalColumns.value}`
}))

watchEffect(() => {
  for (const [key, field] of Object.entries(visibleFields.value)) {
    if (field.type === 'section' && !(key in openSections)) {
      openSections[key] = field.open !== false
    }
    if (!(key in formData) && field.type !== 'section') {
      formData[key] = props.initialValues[key] ?? getDefaultValue(field)
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
      if (field.useCurrentDate) return getCurrentDate()
      return ''
    case 'time':
      if (field.useCurrentTime) return getCurrentTime()
      return ''
    case 'enum':
      return ''
    default:
      return null
  }
}

function getCurrentDate() {
  const now = new Date()
  return now.toISOString().split('T')[0]
}

function getCurrentTime() {
  const now = new Date()
  return now.toTimeString().slice(0, 5)
}

function getFieldId(key) {
  return `field-${key}`
}

function formatLabel(key) {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim()
}

function toggleSection(key) {
  openSections[key] = !openSections[key]
}

function shouldShowField(fieldKey) {
  const field = visibleFields.value[fieldKey]
  if (!field || field.type === 'section') return true
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

function validateNumberField(key, field) {
  const value = formData[key]
  delete fieldErrors[key]
  if ((value === null || value === '') && !field.required) return true
  if (field.required && (value === null || value === '')) {
    fieldErrors[key] = 'This field is required'
    return false
  }
  if (field.min !== undefined && value < field.min) {
    fieldErrors[key] = `Min: ${field.min}`
    return false
  }
  if (field.max !== undefined && value > field.max) {
    fieldErrors[key] = `Max: ${field.max}`
    return false
  }
  return true
}

function clearFieldError(key) {
  delete fieldErrors[key]
}

async function onSubmit() {
  if (isSubmitting.value) return
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
  max-width: 800px;
  width: 100%;
  margin: 6rem auto 0 auto;
  padding: 2rem;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);
  font-family: -apple-system, BlinkMacSystemFont, 'San Francisco', 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

h2 {
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 2rem;
  color: #1f2937;
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
  color: #374151;
  letter-spacing: 0.01em;
}

input:not([type="checkbox"]),
select,
textarea {
  width: 100%;
  padding: 0.65rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  background: #f9fafb;
  transition: all 0.2s ease;
  color: #1f2937;
}

input:not([type="checkbox"]):focus,
select:focus,
textarea:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  outline: none;
}

input:disabled,
select:disabled,
textarea:disabled {
  background-color: #f9fafb;
  color: #9ca3af;
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
  color: #6b7280;
  margin-top: 0.25rem;
}

.submit-button {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: 0.01em;
}

.submit-button:hover:not(:disabled) {
  background: #1e40af;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.submit-button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.error-message {
  font-size: 0.875rem;
  color: #ef4444;
  margin-top: 0.25rem;
  font-weight: 500;
}

.section-header {
  grid-column: 1 / -1;
  background: #f3f4f6;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.section-title:hover {
  background-color: #e5e7eb;
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
