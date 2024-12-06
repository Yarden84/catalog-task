<template>
  <div class="product-list-container" v-if="products && promotions">
    <ProductItem v-for="product in products" :product="product" />
    <div class="promotions-title">
      <h3>Promotions:</h3>
    </div>
    <div class="promotions-container">
      <PromotionalItem v-for="promotion in promotions" :promotion="promotion" />
    </div>
  </div>
  <div class="loader-container" v-else>
    <Loader />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import ProductItem from '../components/ProductItem.vue'
import PromotionalItem from '../components/PromotionalItem.vue'
import Loader from './Loader.vue'


export default defineComponent({
  name: 'ProductListing',
  components: {
    ProductItem,
    PromotionalItem,
  },
  setup() {
    const route = useRoute();
    const productCategory = computed(() => {
      if (route?.query?.id) {
        return route?.query?.id
      } else {
        ''
      }
    })
    const dataStore = useDataStore();
    const products = computed(() => {

      if (dataStore.productsData) {
        return dataStore.productsData.filter((item) => item.categories.indexOf(productCategory.value) !== -1 || !productCategory.value)
      } else {
        return null
      }
    });
    const promotions = computed(() => dataStore.promotionalSpots);

    return {
      products,
      promotions
    }
  },
})
</script>

<style lang="scss" scoped>
.product-list-container {
  width: 90%;
  display: flex;
  align-items: start;
  flex-wrap: wrap;
  padding: 20px;
  margin-left: auto;

  .promotions-title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    h3 {
      width: 100%;
      display: block;
      font-size: 30px;
      font-weight: 600;
      letter-spacing: 3px;
      text-align: center;
      margin: 50px auto 25px;
    }
  }

  .promotions-container {
    width: 100%;
    display: flex;

  }
}

.loader-container {
  width: 90%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
}
</style>
