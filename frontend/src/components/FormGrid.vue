<template>
  <div class="form-container">
    <h2>{{ formTitle }}</h2>
    <form @submit.prevent="onSubmit" class="grid-form" :style="gridTemplate">
<div
  v-for="(field, key) in visibleFields"
  :key="key"
  :class="['form-group', field.type === 'section' ? 'section-header' : '']"
  :style="gridStyle(field)"
>
  <template v-if="field.type === 'section'">
    <div class="section-title" @click="openSections[key] = !openSections[key]">
      <span>{{ field.label || key }}</span>
      <span class="toggle-icon">{{ openSections[key] ? '▾' : '▸' }}</span>
    </div>
  </template>

    <template v-else-if="shouldShowField(key)">

    <label :for="key">{{ key }}</label>

    <input
      v-if="field.type === 'string'"
      :id="key"
      :type="field.inputType || 'text'"
      v-model="formData[key]"
      :required="field.required"
    />

    <select
      v-else-if="field.type === 'enum'"
      :id="key"
      v-model="formData[key]"
      :required="field.required"
    >
      <option v-for="option in field.values" :key="option" :value="option">
        {{ option }}
      </option>
    </select>

    <textarea
      v-else-if="field.type === 'textarea'"
      :id="key"
      v-model="formData[key]"
      :rows="field.rows"
      :required="field.required"
    ></textarea>

    <input
      v-else-if="field.type === 'date'"
      :id="key"
      type="date"
      v-model="formData[key]"
      :required="field.required"
    />

    <div v-else class="error">
      Unsupported field type: {{ field.type }}
    </div>
  </template>
</div>

      <button type="submit" class="submit-button" :style="submitButtonStyle">
        Submit
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watchEffect } from 'vue'

const openSections = reactive({})

const props = defineProps({
  schema: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['submit'])
const formData = reactive({})

// Title
const formTitle = computed(() => props.schema.__meta__?.title || 'Dynamic Grid Form')

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
  return maxCol
})

// CSS grid template style
const gridTemplate = computed(() => ({
  gridTemplateColumns: `repeat(${totalColumns.value}, 1fr)`
}))

// Positioning of inputs
const gridStyle = (field) => ({
  gridColumn: `${field.col ?? 1} / span ${field.colSpan ?? (field.type === 'section' ? totalColumns.value : 1)}`,
  gridRow: `${field.row ?? 1} / span ${field.rowSpan ?? 1}`,
  alignSelf: field.align ?? 'stretch',
  justifySelf: field.justify ?? 'stretch'
})

// Submit button spans entire width
const submitButtonStyle = computed(() => ({
  gridColumn: `1 / span ${totalColumns.value}`
}))

// Initialize default values
watchEffect(() => {
  for (const key in visibleFields.value) {
    const field = visibleFields.value[key]
    if (field.type === 'section' && !(key in openSections)) {
      openSections[key] = true // sections open by default
    }
    if (!(key in formData) && field.type !== 'section') {
      formData[key] =
        field.default ??
        (field.type === 'string' || field.type === 'textarea' ? '' : null)
    }
  }
})

function shouldShowField(fieldKey) {
  const field = visibleFields.value[fieldKey]
  if (!field || field.type === 'section') return true

  // Find the closest section *before* this field by row number
  const fieldRow = field.row ?? 1
  let closestSectionKey = null
  let closestRow = -1

  for (const [key, value] of Object.entries(visibleFields.value)) {
    if (value.type === 'section' && (value.row ?? 0) < fieldRow && (value.row ?? 0) > closestRow) {
      closestSectionKey = key
      closestRow = value.row
    }
  }

  return closestSectionKey ? openSections[closestSectionKey] : true
}


function onSubmit() {
  emit('submit', { ...formData })
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
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.07);
}

h2 {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
}

.grid-form {
  display: grid;
  gap: 1rem;
  grid-auto-rows: minmax(80px, auto);
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 500;
  margin-bottom: 0.5rem;
}

input,
select,
textarea {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  background: #f9fafb;
  transition: border-color 0.2s;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #6366f1;
  outline: none;
}

.submit-button {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
}

.submit-button:hover {
  background: #1e40af;
}

.error {
  font-size: 0.95rem;
  color: #dc2626;
  margin-top: 0.25rem;
}

.section-header {
  grid-column: 1 / -1;
  background: #f3f4f6;
  border-bottom: 1px solid #d1d5db;
  border-radius: 0.5rem;
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.toggle-icon {
  font-size: 1.25rem;
  line-height: 1;
  margin-left: 0.5rem;
}

.section-header h3 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
}

</style>
