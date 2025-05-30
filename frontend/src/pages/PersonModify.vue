<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import FormGrid from '../components/FormGrid.vue';
import formSchemaPerson from '../schemas/formSchemaPersonModify.js';
import { fetchPersonById, updatePerson } from '../services/frontEndService.js';

const route = useRoute();
const router = useRouter();
const personData = ref(null);

const loadPerson = async () => {
  const id = route.params.id;
  const data = await fetchPersonById(id);
  if (data) personData.value = data;
  else router.push('/person-list');
};

onMounted(loadPerson);

const handleSubmit = async (updated) => {
  try {
    await updatePerson(route.params.id, updated);
    router.push('/person-list');
  } catch (err) {
    console.error('Failed to update person:', err);
    alert('Error updating person');
  }
};
</script>

<style scoped>
.form-outer {
  padding: 2rem;
  min-height: 100vh;
}
</style><template>
  <div class="form-outer">
    <FormGrid
      v-if="personData"
      :schema="formSchemaPerson"
      :initialValues="personData"
      @submit="handleSubmit"
    />
    <p v-else>Loading person data...</p>
  </div>
</template>
