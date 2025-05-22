<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import Form from '../components/Form.vue'
import formSchemaLogin from '../models/formSchemaLogin.js'

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
  <Form :schema="loginSchema" @submit="login" />
  <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
</template>

<style scoped>
.error {
  color: #dc2626;
  text-align: center;
  margin-top: 1rem;
  font-weight: 500;
}
</style>
