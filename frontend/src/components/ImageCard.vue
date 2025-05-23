<script setup>
const props = defineProps({
  image: String,
  title: String,
  description: String,
  date: String,
  descriptionOnly: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="image-card">
    <img
      :src="image"
      alt="Card Image"
      class="card-image"
    />
    <div
      class="card-content"
      :class="{ 'description-only': descriptionOnly }"
    >
      <template v-if="!descriptionOnly">
        <h2 class="card-title">{{ title }}</h2>
        <p class="card-description">{{ description }}</p>
        <p class="card-date">{{ date }}</p>
      </template>
      <template v-else>
        <p class="card-description">{{ description }}</p>
      </template>
    </div>
  </div>
</template>

<style scoped>
.image-card {
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transform: translateY(0);
  transition: all 0.3s ease;
}

.image-card:hover {
  transform: translateY(-0.5rem);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.card-image {
  width: 100%;
  height: 12rem;
  object-fit: cover;
}

.card-content {
  padding: 1rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.card-description {
  color: var(---color-text-grey);
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.card-date {
  color: var(--color-text-light);
  font-size: 0.75rem;
}

/* Center description when in descriptionOnly mode, but don't set min-height */
.description-only {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
}

.description-only .card-description {
  margin-bottom: 0;
}
</style>