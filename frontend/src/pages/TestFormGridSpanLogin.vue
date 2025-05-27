<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import FormGrid from '../components/FormGrid.vue'
import formSchemaLogin from '../schemas/formGridSpanSchemaLogin.js'

const loginSchema = formSchemaLogin
const errorMessage = ref('')
const router = useRouter()


const login = async ({ username, password }) => {
  try {
    const response = await axios.post('http://localhost:3001/api/users/login', {
      username,
      password
    })

    const { token, role } = response.data
    localStorage.setItem('token', token)
    localStorage.setItem('userRole', role)
    errorMessage.value = ''
    router.push('/')
  } catch (err) {
    errorMessage.value = err.response?.data?.error || 'Login failed'
  }
}
</script>

<template>
  <div class="test-wrapper">
    <FormGrid :schema="loginSchema" @submit="login" />
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.test-wrapper {
  padding: 2rem;
  max-width: 1000px;
  margin: auto;
}
.error {
  color: var(--color-text-error);
  text-align: center;
  margin-top: 1rem;
  font-weight: 500;
}
</style>
