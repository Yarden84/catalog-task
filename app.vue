<template>
  <NuxtPage />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useDataStore } from '@/stores/data'
import data from '@/assets/data.json'

export default defineComponent({
  name: 'App',
  setup() {
    const dataStore = useDataStore();

    onMounted(() => {
      if (data.products) dataStore.setProducts(data.products);
      if (data.promotionalSpots) dataStore.setPromotionalSpots(data.promotionalSpots);
      if (data.categories) dataStore.setCategories(data.categories.categories);
    });
  },
})
</script>
