<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createPost } from '../services/blogService'

const router = useRouter()
const title = ref('')
const date = ref('')
const domain = ref('')
const content = ref('')

const addPost = async () => {
  if (!title.value || !date.value || !domain.value || !content.value) {
    alert('Please fill out all fields.')
    return
  }

  try {
    await createPost({
      title: title.value,
      date: date.value,
      domain: domain.value,
      content: content.value
    })
    router.push('/blog-list')
  } catch (err) {
    console.error('Failed to save post:', err)
    alert('Error saving post. Please try again.')
  }
}
</script>

<template>
  <div class="addpost-outer">
    <div class="addpost-container">
      <h1 class="addpost-title">Add New Post</h1>

      <div>
        <label class="addpost-label">Title</label>
        <input
          v-model="title"
          type="text"
          placeholder="Enter the post title"
          class="addpost-input"
        />
      </div>

      <div>
        <label class="addpost-label">Date</label>
        <input
          v-model="date"
          type="date"
          class="addpost-input"
        />
      </div>

      <div>
        <label class="addpost-label">Domain</label>
        <select
          v-model="domain"
          class="addpost-input"
        >
          <option value="" disabled>Select a domain</option>
          <option value="Music">Music</option>
          <option value="Science">Science</option>
        </select>
      </div>

      <div>
        <label class="addpost-label">Content</label>
        <textarea
          v-model="content"
          rows="6"
          placeholder="Write your content here..."
          class="addpost-input addpost-textarea"
        ></textarea>
      </div>

      <div class="addpost-actions">
        <button
          @click="addPost"
          class="addpost-button"
        >
          Save Post
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.addpost-outer {
  padding-top: 6rem;
  padding-left: 1rem;
  padding-right: 1rem;
  min-height: 100vh;
}

.addpost-container {
  max-width: 700px;
  margin: 0 auto;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.addpost-title {
  font-size: 2rem;
  font-weight: bold;
  color: #2d3748;
  margin-bottom: 1rem;
}

.addpost-label {
  display: block;
  font-size: 1rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.addpost-input {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(0,0,0,0.03);
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.addpost-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px #2563eb33;
}

.addpost-textarea {
  min-height: 120px;
  resize: vertical;
}

.addpost-actions {
  text-align: right;
}

.addpost-button {
  background: #2563eb;
  color: #fff;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
  cursor: pointer;
  transition: background 0.2s;
}

.addpost-button:hover {
  background: #1e40af;
}
</style>
