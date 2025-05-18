<template>
  <div 
    class="post-card"
    @click="$emit('card-click', post._id)"
  >
    <!-- Title and Date section -->
    <div class="card-header">
      <h2 class="card-title">{{ post.title }}</h2>
      <span class="card-date">{{ formattedDate }}</span>
    </div>
    <!-- Content section -->
    <div class="card-content">
      <p v-if="truncate" class="card-text truncated">{{ post.content }}</p>
      <p v-else class="card-text">{{ post.content }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  post: {
    type: Object,
    required: true
  },
  truncate: {
    type: Boolean,
    default: true
  }
})

const formattedDate = computed(() => {
  const date = new Date(props.post.date)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})
</script>

<style scoped>
.post-card {
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  max-width: 48rem;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.post-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #f3f4f6;
  padding: 0.75rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-weight: 600;
  font-size: 1.125rem;
  color: #2563eb;
}

.card-date {
  font-size: 0.875rem;
  color: #4b5563;
}

.card-content {
  padding: 1.5rem;
}

.card-text {
  font-size: 1rem;
}

.truncated {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
