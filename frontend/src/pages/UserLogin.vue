<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginUser } from '../services/frontEndService.js'
import Form from '../components/Form.vue'
import formSchemaLogin from '../schemas/formSchemaLogin.js'

const loginSchema = formSchemaLogin
const errorMessage = ref('')
const router = useRouter()

const login = async ({ username, password }) => {
  try {
    console.log('Logging in...') // Optional: Alert for debugging
    const { token, role } = await loginUser({ username, password })
    localStorage.setItem('token', token)
    localStorage.setItem('userRole', role)
    errorMessage.value = ''
    router.push('/')
  } catch (err) {
    errorMessage.value = err.message
  }
}
</script>


<template>
  <Form :schema="loginSchema" @submit="login" />
  <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
</template>

<style scoped>
.error {
  color: var(--color-text-error);
  text-align: center;
  margin-top: 1rem;
  font-weight: 500;
}
</style>
