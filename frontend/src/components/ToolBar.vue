<template>
  <div class="toolbar-wrapper">
    <div class="toolbar">
      <template v-for="(item, index) in schema" :key="index">
        <button
          v-if="item.type === 'button'"
          :class="item.class || 'toolbar-button'"
          @click="handleAction(item.action)"
        >
          <span v-if="item.icon" :class="['icon', item.icon]" aria-hidden="true"></span>
          {{ item.label }}
        </button>

        <div v-else-if="item.type === 'dropdown'" class="dropdown" ref="dropdownRefs[index]">
          <button
            :class="item.class || 'toolbar-button'"
            @click="toggleDropdown(index)"
          >
            <span v-if="item.icon" :class="['icon', item.icon]" aria-hidden="true"></span>
            {{ item.label }} ▼
          </button>
          <ul v-if="openDropdown === index" class="dropdown-menu">
            <li
              v-for="(option, idx) in item.options"
              :key="idx"
              @click="handleAction(option.action); closeDropdown()"
            >
              {{ option.label }}
            </li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  schema: {
    type: Array,
    required: true
  },
  context: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['custom-action'])
const router = useRouter()
const openDropdown = ref(null)
const dropdownRefs = ref([])

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

function toggleDropdown(index) {
  openDropdown.value = openDropdown.value === index ? null : index
}

function closeDropdown() {
  openDropdown.value = null
}

function handleClickOutside(event) {
  if (
    openDropdown.value !== null &&
    dropdownRefs.value[openDropdown.value] &&
    !dropdownRefs.value[openDropdown.value].contains(event.target)
  ) {
    closeDropdown()
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
})
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.toolbar-button:hover {
  background-color: #1e40af;
}

.icon {
  display: inline-block;
}

.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.25rem;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  z-index: 10;
  list-style: none;
  padding: 0.5rem 0;
  min-width: 150px;
}

.dropdown-menu li {
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.dropdown-menu li:hover {
  background-color: #f3f4f6;
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
