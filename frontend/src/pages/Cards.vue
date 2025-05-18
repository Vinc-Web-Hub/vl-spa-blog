<script setup>
import ImageCard from '../components/ImageCard.vue'

const cards = [
  {
    image: 'https://picsum.photos/id/23/300/200',
    title: 'A table !',
    description: 'Festin pour trois Rois.',
    date: '2025-05-01'
  },
  {
    image: 'https://picsum.photos/id/24/300/200',
    title: 'Lecture',
    description: 'Arrêt sur une page.',
    date: '2025-05-01'
  },
  {
    image: 'https://picsum.photos/id/39/300/200',
    title: 'Musique',
    description: 'Chi va piano va lontano.',
    date: '2025-05-01'
  },
  {
    image: 'https://picsum.photos/id/41/300/200',
    title: 'Rosée',
    description: "Figées par l'instant.",
    date: '2025-05-01'
  },
  // Add more cards as needed...
]
</script>

<template>
  <div class="blog-container">
  <h1 class="blog-list-title">Portfolio !</h1>
  <div class="cards-container">
    <ImageCard
      v-for="(card, index) in cards"
      :key="index"
      :image="card.image"
      :title="card.title"
      :description="card.description"
      :date="card.date"
      :descriptionOnly="false"
    />
  </div>
</div>
</template>

<style scoped>

.blog-container {
  padding-top: 6rem;
  padding-left: 1rem;
  padding-right: 1rem;
  min-height: 100vh;
}
.cards-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  padding: 1.5rem;
  padding-top: 2rem;
/*  min-height: 100vh */
}

.blog-list-title {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
}
/* Responsive breakpoints */
@media (min-width: 640px) {
  .cards-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .cards-container {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
