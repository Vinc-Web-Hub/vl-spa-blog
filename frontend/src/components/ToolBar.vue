<template>
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
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  schema: {
    type: Array,
    required: true
  },
  context: {
    type: Object,
    default: () => ({}) // e.g. { id: '1234' }
  }
});

const emit = defineEmits(['custom-action']);
const router = useRouter();

function handleAction(action) {
  if (!action || typeof action !== 'object') return;

  switch (action.type) {
    case 'navigate':
      if (typeof action.to === 'function') {
        router.push(action.to(props.context));
      } else {
        router.push(action.to);
      }
      break;
    case 'emit':
      emit(action.event, props.context);
      break;
    case 'callback':
      if (typeof action.fn === 'function') action.fn(props.context);
      break;
    default:
      console.warn('Unknown action type:', action);
  }
}
</script>

<style scoped>
.toolbar {
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem 0;
  margin-bottom: 1rem;
}
.toolbar-button {
  padding: 0.4rem 0.8rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.toolbar-button:hover {
  background: #1e40af;
}
</style>
