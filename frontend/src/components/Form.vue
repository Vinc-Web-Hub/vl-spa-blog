<template>
  <div class="form-container">
    <h2>Dynamic Form</h2>
    <form @submit.prevent="handleSubmit">
      <div
        v-for="(field, key) in schema"
        :key="key"
        class="form-group"
      >
        <label :for="key">{{ key }}</label>

        <!-- Input: string -->
        <input
          v-if="field.type === 'string'"
          :id="key"
          type="text"
          v-model="formData[key]"
          :required="field.required"
        />

        <!-- Select: enum -->
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

        <!-- Textarea -->
        <textarea
          v-else-if="field.type === 'textarea'"
          :id="key"
          v-model="formData[key]"
          :rows="field.rows"
          :required="field.required"
        ></textarea>

        <!-- Date input -->
        <input
          v-else-if="field.type === 'date'"
          :id="key"
          type="date"
          v-model="formData[key]"
          :required="field.required"
        />

        <!-- Unknown field type -->
        <div v-else class="error">
          Unsupported field type: {{ field.type }}
        </div>
      </div>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { formSchema as schema } from '../models/formSchema.js';

const formData = reactive({});

for (const key in schema) {
  const field = schema[key];
  formData[key] =
    field.default ??
    (field.type === 'string' || field.type === 'textarea' ? '' : null);
}

function handleSubmit() {
  console.log('Form submitted:', { ...formData });
}
</script>

<style scoped>
.form-container {
  max-width: 500px;
  margin: 6rem auto 0 auto;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: column;
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
  border-color: #6366f1;
  outline: none;
}

button[type='submit'] {
  margin-top: 0.5rem;
  padding: 0.6rem 0;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

button[type='submit']:hover {
  background: #1e40af;
}

.error {
  font-size: 0.95rem;
  color: #dc2626;
  margin-top: 0.25rem;
}
</style>
