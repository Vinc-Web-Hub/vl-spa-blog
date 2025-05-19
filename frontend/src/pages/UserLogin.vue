<template>
  <div class="form-container">
    <h2>User Login</h2>
    <form @submit.prevent="login">
      <label>Username</label>
      <input v-model="username" type="text" required />

      <label>Password</label>
      <input v-model="password" type="password" required />

      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const username = ref('');
const password = ref('');
const errorMessage = ref('');

const login = async () => {
  try {
    const response = await axios.post('http://localhost:3001/api/users/login', {
      username: username.value,
      password: password.value,
    });

    const { token, role } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', role);
    errorMessage.value = '';
    alert('Login successful!');

    // Optional: redirect after login
    // window.location.href = '/';
  } catch (err) {
    errorMessage.value = err.response?.data?.error || 'Login failed';
  }
};
</script>

<style scoped>
.form-container {
  max-width: 400px;
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
  gap: 1rem;
}

label {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

input {
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  background: #f9fafb;
  transition: border-color 0.2s;
}

input:focus {
  border-color: #6366f1;
  outline: none;
}

button[type='submit'] {
  margin-top: 0.5rem;
  padding: 0.6rem 0;
  background: #6366f1;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

button[type='submit']:hover {
  background: #4f46e5;
}

.error {
  text-align: center;
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #dc2626;
}
</style>
