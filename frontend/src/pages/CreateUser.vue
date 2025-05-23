<script setup>
import { ref } from 'vue'
import axios from 'axios'

const username = ref('')
const password = ref('')
const role = ref('viewer')
const message = ref('')

const createUser = async () => {
  try {
    await axios.post('http://localhost:3001/api/users', {
      username: username.value,
      password: password.value,
      role: role.value
    })
    message.value = 'User created successfully!'
    username.value = ''
    password.value = ''
    role.value = 'viewer'
  } catch (err) {
    message.value = 'Failed to create user.'
    console.error(err)
  }
}
</script>

<template>
  <div class="container">
    <h1>Create New User</h1>
    <form @submit.prevent="createUser">
      <label>Username:</label>
      <input v-model="username" required />

      <label>Password:</label>
      <input type="password" v-model="password" required />

      <label>Role:</label>
      <select v-model="role">
        <option value="admin">Admin</option>
        <option value="editor">Editor</option>
        <option value="viewer">Viewer</option>
      </select>

      <button type="submit">Create User</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<style scoped>
.container {
  max-width: 400px;
  margin: 6rem auto 0 auto;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 16px rgba(0,0,0,0.07);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

h1 {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

input,
select {
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  background: #f9fafb;
  transition: border-color 0.2s;
}

input:focus,
select:focus {
  border-color: #6366f1;
  outline: none;
}

button[type="submit"] {
  margin-top: 0.5rem;
  padding: 0.6rem 0;
  background: var(--color-primary);
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

button[type="submit"]:hover {
  background: var(--color-primary-dark)
}

p {
  text-align: center;
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #16a34a;
}

p:empty {
  display: none;
}
</style>
