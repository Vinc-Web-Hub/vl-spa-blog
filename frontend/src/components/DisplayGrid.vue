<script setup>
import { computed } from 'vue'

console.log('DisplayGrid component loaded')
// import { defineProps } from 'vue'

const props = defineProps({
  schema: { type: Object, required: true },
  document: { type: Object, required: true },
  title: { type: String, default: '' }
})

// Extract meta and content
const title = computed(() => props.title || props.schema.__meta__?.title || 'Details')

// Filter visible fields based on their visibility
const visibleFields = computed(() => {
  const { __meta__, ...fields } = props.schema

  return Object.entries(fields).reduce((acc, [key, field]) => {
    const isVisible =
      field.visible === undefined ||
      (typeof field.visible === 'function'
        ? field.visible(props.document)
        : !!field.visible)

    if (isVisible) acc[key] = field
    return acc
  }, {})
})

// Grid style
const gridStyle = (field) => {
  return {
    gridColumn: `${field.col} / span ${field.colSpan || 1}`,
    gridRow: `${field.row} / span ${field.rowSpan || 1}`
  }
}

// Dynamically calculate the max column number
const totalColumns = computed(() => {
  return Math.max(
    ...Object.values(visibleFields.value).map(f => (f.col || 1) + (f.colSpan || 1) - 1),
    1
  )
})

// Format display values
function formatValue(value, type) {
  if (!value) return ''
  if (type === 'date') return new Date(value).toLocaleDateString()
  return value
}

</script>

<template>
  <div class="display-grid-container">
    <h2>{{ title }}</h2>
    <div class="grid-display" :style="`grid-template-columns: repeat(${totalColumns}, 1fr);`">
      <div
        v-for="(field, key) in visibleFields"
        :key="key"
        class="display-cell"
        :style="gridStyle(field)"
      >
        <label class="display-label">{{ field.label || key }}</label>

        <div class="display-value">{{ formatValue(document[key], field.type) }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.display-grid-container {
  max-width: 800px;
  margin: 4rem auto;
  padding: 2rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.07);
}

h2 {
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.5rem;
}

.grid-display {
  display: grid;
  gap: 1rem;
}

.display-cell {
  background: var(--color-white);
  border: 1px solid var(--color-white);
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
}

.display-label {
  font-weight: 600;
  color: var(--color-text-medium);
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
}

.display-value {
  font-size: 1rem;
  color: var(--color-text-dark);
}
</style>
