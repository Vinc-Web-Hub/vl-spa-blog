<template>
  <div class="form-container">
    <h2>{{ formTitle }}</h2>
    <form @submit.prevent="onSubmit">
      <div
        v-for="(field, key) in visibleFields"
        :key="key"
        class="form-group"
      >
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
          <option
            v-for="option in field.values"
            :key="option"
            :value="option"
          >
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
      </div>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { reactive, computed, watch } from 'vue'
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  schema: {
    type: Object,
    required: true
  },
  initialData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['submit'])

const formData = reactive({})

// Computed title
const formTitle = computed(() => props.schema.__meta__?.title || 'Dynamic Form')

// Filter out __meta__ for visible fields
const visibleFields = computed(() => {
  const copy = { ...props.schema }
  delete copy.__meta__
  return copy
})

// Reinitialize formData when initialData is set or updated
watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      for (const key in visibleFields.value) {
        const field = visibleFields.value[key]
        formData[key] =
          newData[key] ??
          field.default ??
          (field.type === 'string' || field.type === 'textarea' ? '' : null)
      }
    }
  },
  { immediate: true }
)

function onSubmit() {
  emit('submit', { ...formData })
}
</script>


<style scoped>
.form-container {
  max-width: 500px;
  width:100%;
  margin: 6rem auto 0 auto;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1.25rem;
}

h2 {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

label {
  font-weight: 500;
  margin-bottom: 0.25rem;
  display: block;
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
  border-color: var(--color-primary-dark);
  outline: none;
}

button[type='submit'] {
  margin-top: 0.5rem;
  padding: 0.6rem 0;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

button[type='submit']:hover {
  background: var(--color-primary-dark);
}

.error {
  font-size: 0.95rem;
  color: var(--color-text-error);
  margin-top: 0.25rem;
}
</style>

