<script setup>
import ImageCard from '../components/ImageCard.vue'
import image1 from '../assets/images/image1-small.jpg'
import image2 from '../assets/images/image2-small.jpg'
import image3 from '../assets/images/image3-small.jpg'

const cards = [
  {
    image: image1,
    title: 'Tableau Noir !',
    description: "Beaucoup d'attention",
    date: '2025-05-01'
  },
  {
    image: image2,
    title: 'Lecture',
    description: 'Equation quadratique ',
    date: '2025-05-01'
  },
  {
    image: image3,
    title: 'Loupe',
    description: 'Encore plus près',
    date: '2025-05-01'
  },

  // Add more cards as needed...
]
</script>

<template>
  <div class="blog-container">
  <h1 class="post-list-title">Welcome to my Universe</h1>
  <div class="cards-container">
    <ImageCard
      v-for="(card, index) in cards"
      :key="index"
      :image="card.image"
      :title="card.title"
      :description="card.description"
      :date="card.date"
      :descriptionOnly="true"
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
  min-height: 10vh;
}

.post-list-title {
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
