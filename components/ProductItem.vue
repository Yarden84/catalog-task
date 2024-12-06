<template>
  <div class="product-container" v-if="product.images && product.name && product.brand && product.price">
    <div class="loader-container" v-show="!imgLoaded">
      <Loader />
    </div>
    <NuxtLink :to="{ path: '/productDetail', query: { id: product.id } }" v-show="imgLoaded">
      <div class="product-img-container">
        <img :src="product.images[0]" alt="product image" class="product-img" @load="onImgLoad">
      </div>
    </NuxtLink>

    <h4 class="product-name" v-if="product.name.dk">{{ product.name.dk }}</h4>
    <h4 class="product-name" v-else>{{ product.name.en }}</h4>
    <h5 class="product-brand">{{ product.brand }}</h5>
    <h6 class="product-price">{{ product.price }} kr</h6>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { PropType } from 'vue'
import type { ProductData } from '@/types/ProductData'
import Loader from './Loader.vue'

export default defineComponent({
  name: 'ProductItem',
  props: {
    product: {
      type: Object as PropType<ProductData>,
      required: true,
    },
  },
  components: {
    Loader
  },
  setup() {
    const imgLoaded = ref<Boolean>(false);

    const onImgLoad = () => {
      imgLoaded.value = true;
    }

    return {
      imgLoaded,
      onImgLoad
    }
  },
})
</script>

<style lang="scss" scoped>
.product-container {
  width: 20%;
  margin-bottom: 25px;

  &:not(:nth-child(4n + 1)) {
    margin-left: 5%;
  }

  .loader-container {
    width: 100%;
    height: 175.0547046%;
    aspect-ratio: 343 / 457;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #696969;
  }

  .product-img-container {
    width: fit-content;
    height: fit-content;
    position: relative;

    &::after {
      content: '';
      width: 100%;
      height: 100%;
      background-color: #fff;
      opacity: 0;
      transition: 200ms ease-out;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }

    &:hover {
      .product-img {
        transform: scale(1.01);
      }

      &::after {
        opacity: 0.2;
      }
    }

    .product-img {
      width: 100%;
      height: auto;
      transform: scale(1);
      transition: 200ms ease-out;
    }
  }

  .product-name,
  .product-price {
    font-weight: 700;
  }

  .product-name {
    font-size: 15px;
  }

  .product-brand {
    font-size: 14px;
  }

  .product-price {
    font-size: 14px;
  }
}
</style>
