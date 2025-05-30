<template>
  <div class="toolbar-wrapper">
    <div class="toolbar">
      <template v-for="(item, index) in schema" :key="index">
        <button
          v-if="item.type === 'button'"
          :class="item.class || 'toolbar-button'"
          @click="handleAction(item.action)"
        >
          {{ item.label }}
        </button>
        <!-- Extend with other types: icon, dropdown, etc. -->
      </template>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  schema: {
    type: Array,
    required: true
  },
  context: {
    type: Object,
    default: () => ({}) // e.g. { id: '1234' }
  }
})

const emit = defineEmits(['custom-action'])
const router = useRouter()

function handleAction(action) {
  if (!action || typeof action !== 'object') return

  switch (action.type) {
    case 'navigate':
      router.push(typeof action.to === 'function' ? action.to(props.context) : action.to)
      break
    case 'emit':
      emit(action.event, props.context)
      break
    case 'callback':
      if (typeof action.fn === 'function') action.fn(props.context)
      break
    default:
      console.warn('Unknown action type:', action)
  }
}
</script>

<style scoped>
.toolbar-wrapper {
  background-color: #f3f4f6;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: flex-start;
}

.toolbar-button {
  flex: 1 1 150px;
  padding: 0.6rem 1rem;
  background-color: #2563eb;
  color: #fff;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  transition: background 0.2s;
}

.toolbar-button:hover {
  background-color: #1e40af;
}

@media (max-width: 600px) {
  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .toolbar-button {
    width: 100%;
  }
}
</style>
