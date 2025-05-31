<script setup>
import { defineProps, ref, computed, watch } from 'vue';
import debounce from 'lodash.debounce';

const props = defineProps({
  title: String,
  items: Array,
  columns: Array,
  searchFields: {
    type: Array,
    default: () => []
  },
  pageSizeOptions: {
    type: Array,
    default: () => [10, 20, 50]
  }
});

const searchRaw = ref('');
const searchQuery = ref('');
const sortKey = ref('');
const sortAsc = ref(true);
const currentPage = ref(1);
const perPage = ref(props.pageSizeOptions[0] || 10);

const onSearchInput = debounce((e) => {
  searchQuery.value = e.target.value;
  searchRaw.value = e.target.value;
}, 300);

function resetSearch() {
  searchRaw.value = '';
  searchQuery.value = '';
  currentPage.value = 1;
}

watch([searchQuery, perPage], () => {
  currentPage.value = 1;
});

const filteredItems = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return props.items.filter(item =>
    props.searchFields.some(field =>
      item[field]?.toString().toLowerCase().includes(query)
    )
  );
});

function sortBy(key) {
  if (sortKey.value === key) {
    sortAsc.value = !sortAsc.value;
  } else {
    sortKey.value = key;
    sortAsc.value = true;
  }
  currentPage.value = 1;
}

const sortedItems = computed(() => {
  if (!sortKey.value) return filteredItems.value;
  return [...filteredItems.value].sort((a, b) => {
    const aVal = a[sortKey.value]?.toString().toLowerCase() || '';
    const bVal = b[sortKey.value]?.toString().toLowerCase() || '';
    return sortAsc.value
      ? aVal.localeCompare(bVal)
      : bVal.localeCompare(aVal);
  });
});

const totalPages = computed(() => Math.ceil(sortedItems.value.length / perPage.value));

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return sortedItems.value.slice(start, start + perPage.value);
});

function format(value, type) {
  if (type === 'date') {
    const date = new Date(value);
    return isNaN(date.getTime()) ? '' : date.toLocaleDateString();
  }
  return value ?? '';
}
</script>

<template>
  <div class="generic-list">
    <h2>{{ title }}</h2>

    <div class="header-controls">
      <div class="search-controls">
        <input
          @input="onSearchInput"
          type="text"
          :value="searchRaw"
          :placeholder="`Search ${searchFields.join(' or ')}`"
          class="search-input"
        />
        <button @click="resetSearch" class="reset-button">Reset</button>
      </div>

      <div class="page-size-selector">
        <label>Rows per page:</label>
        <select v-model.number="perPage">
          <option v-for="option in pageSizeOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
    </div>

    <table class="data-table" v-if="paginatedItems.length">
      <thead>
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            @click="sortBy(col.key)"
          >
            {{ col.label }}
            <span>
              <span v-if="sortKey === col.key">{{ sortAsc ? '▲' : '▼' }}</span>
              <span v-else>⇅</span>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in paginatedItems" :key="item._id || item.id">
          <td v-for="col in columns" :key="col.key">
            <router-link
              v-if="col.link"
              :to="col.link(item)"
            >
              {{ item[col.key] }}
            </router-link>
            <span v-else>
              {{ format(item[col.key], col.type) }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="filteredItems.length > perPage" class="pagination">
      <button :disabled="currentPage === 1" @click="currentPage--">Previous</button>
      <button
        v-for="page in totalPages"
        :key="page"
        :class="{ active: page === currentPage }"
        @click="currentPage = page"
      >
        {{ page }}
      </button>
      <button :disabled="currentPage === totalPages" @click="currentPage++">Next</button>
    </div>

    <p v-else-if="!filteredItems.length" class="no-results">No items found.</p>
  </div>
</template>

<style scoped>
.generic-list {
  padding: 1.5rem;
  font-family: var(--font-family-app);
}

h2 {
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text-dark);
}

.header-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.search-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
}

.search-input {
  padding: 0.5rem 0.75rem;
  width: 100%;
  max-width: 280px;
  border: 1px solid var(--color-background-light);
  border-radius: 0.375rem;
  font-size: 1rem;
}

.reset-button {
  padding: 0.5rem 0.75rem;
  background: var(--color-background-medium);
  color: var(--color-white);
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.reset-button:hover {
  background-color: var(--color-background-medium);
}

.page-size-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
  font-size: 0.95rem;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.data-table th,
.data-table td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.data-table th {
  background-color: var(--color-header-light);
  font-weight: 600;
  user-select: none;
}

.data-table th.sortable {
  cursor: pointer;
}

.data-table th.sortable:hover {
  background-color: var(--color-header-ultralight);
}

.data-table tbody tr:nth-child(even) {
  background-color: var(--color-background-ultralight);
}

.data-table tbody tr:hover {
  background-color: var(--color-background-light);
}

router-link,
a {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
}

router-link:hover,
a:hover {
  text-decoration: underline;
}

.no-results {
  margin-top: 1.5rem;
  color: #9ca3af;
  font-style: italic;
  text-align: center;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

.pagination button {
  padding: 0.5rem 0.75rem;
  background: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}

.pagination button:disabled {
  background-color: var(--color-background-medium);
  cursor: not-allowed;
}

.pagination button.active {
  background-color: var(--color-primary-dark);
}

</style>
