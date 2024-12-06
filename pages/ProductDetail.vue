<template>
  <div class="product-detail-container">
    <div class="carousel-container">
      <Carousel v-bind="{
        itemsToShow: 1
      }">
        <Slide v-for="image in images">
          <div class="loader-container" v-show="!imgLoaded">
            <Loader />
          </div>
          <img :src="image" alt="product image" class="carousel-img" @load="onImgLoad" v-show="imgLoaded">
        </Slide>

        <template #addons>
          <Pagination />
        </template>
      </Carousel>
    </div>

    <div class="product-detail">
      <div class="product-detail-title-container">
        <h4 class="product-detail-title">Color:</h4>
        <h4 class="product-detail-title">{{ chosenColor }}</h4>
      </div>
      <div class="product-colors-container radio-btns-container">
        <label v-for="(color, index) in hexColors" class="color-btn-container">
          <input type="radio" name="color" :value="index" @change="setColorName(index)"
            :checked="index === chosenIndex">
          <div class="color-btn" :style="{ backgroundColor: typeof color === 'string' ? color : '' }"></div>
        </label>
      </div>
      <div class="product-detail-title-container">
        <h4 class="product-detail-title">Size:</h4>
      </div>
      <div class="product-size-container radio-btns-container">
        <label v-for="(size, index) in sizes" class="size-btn-container">
          <input type="radio" name="size" :value="index" :checked="index === chosenIndex">
          <div class="size-btn">
            {{ size }}
          </div>
        </label>
      </div>
      <button class="add-to-cart" :disabled="!inStock">Add To Cart</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { ProductData } from '@/types/ProductData'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination } from 'vue3-carousel'
import { colornames } from 'color-name-list'

export default defineComponent({
  name: 'ProductDetail',
  components: {
    Carousel,
    Slide,
    Pagination,
  },
  setup() {
    const dataStore = useDataStore();
    const route = useRoute();
    const productId = Number(route.query.id);
    const index = dataStore.productsData ? dataStore.productsData.map(item => item.id).indexOf(productId) : -1;
    const product = ref<ProductData | null>(dataStore.productsData ? dataStore.productsData[index] : null);
    const imgLoaded = ref<Boolean>(false);
    const images = ref<String[]>(product.value?.images);
    const chosenIndex = ref<Number>(0);
    const colors = ref<String[]>([]);
    const hexColors = ref<String[]>([]);
    const inStock = ref<Boolean>(product.value?.stock);
    const chosenColor = ref<String>(product.value?.color);
    const sizes = ref<String[]>([...product.value?.size])


    if (product.value?.variant) {
      inStock.value = product.value?.variant[0].stock;
      colors.value = product.value?.variant.map(item => item.color || '')

      chosenColor.value = colors.value[0];

      for (let i = 0; i < colors.value.length; i++) {
        hexColors.value.push(colornames.find((color: any) => color?.name === colors.value[i]) || colors.value[i])
      }

      hexColors.value = hexColors.value.map((item: any) => {
        if (item?.hex)
          return item?.hex
        else {
          return item
        }
      })

      sizes.value = product.value?.variant[0].size
    }

    watch(chosenIndex, (newVal) => {
      images.value = product.value?.variant[newVal].images;
      chosenColor.value = colors.value[newVal];
      sizes.value = product.value?.variant[newVal].size;
      inStock.value = product.value?.variant[newVal].stock;
    })

    const onImgLoad = () => {
      setTimeout(() => {
        imgLoaded.value = true;
      }, 1000);
    }

    function setColorName(index) {
      chosenIndex.value = index
    }

    return {
      product,
      imgLoaded,
      onImgLoad,
      chosenIndex,
      images,
      hexColors,
      chosenColor,
      setColorName,
      sizes,
      inStock
    }
  },
})
</script>

<style lang="scss" scoped>
.product-detail-container {
  display: flex;
  align-items: center;
  margin: auto;

  .carousel-container {
    width: 50%;

    .loader-container {
      height: 90vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .carousel-img {
      width: auto;
      height: 90vh;
    }

  }

  .product-detail-title-container {
    display: flex;
    align-items: center;

    .product-detail-title {
      font-size: 19px;
      letter-spacing: 2.7px;

      &:first-child {
        font-weight: 700;
        margin-right: 15px;
      }

      &:last-child:not(:first-child) {
        font-weight: 600;
      }
    }
  }

  .product-detail {
    width: 25%;
    display: flex;
    align-items: start;
    flex-direction: column;
    margin-left: 4%;

    >div {
      margin-bottom: 20px;
    }



    .radio-btns-container {
      display: flex;
      align-items: center;
      margin-bottom: 60px;

      label {
        cursor: pointer;
        position: relative;

        >div {
          border-radius: 50%;
          border: 1px solid #969696;
          pointer-events: none;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }
      }

      input,
      >div {
        width: 100%;
        height: 100%;
      }

      input {
        opacity: 0;
        cursor: pointer;

        &:checked+div {
          border: 2px solid #a8a8a8;

          &::after {
            content: '';
            width: 100%;
            height: 100%;
            display: block;
            background-color: transparent;
            border-radius: 50%;
            border: 4px solid #fff;
            position: absolute;
            top: 50%;
            right: 50%;
            transform: translate(50%, -50%);
          }
        }
      }


    }

    .product-colors-container {
      .color-btn-container {
        width: 60px;
        height: 60px;
        margin-right: 30px;
      }
    }

    .product-size-container {
      .size-btn-container {
        width: 80px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px 0;
        margin-right: 20px;

        input {
          &:checked+div {
            border: 2px solid #000000;

            &::after {
              content: '';
              display: none;
            }
          }
        }

        .size-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
        }
      }
    }

    .add-to-cart {
      width: 220px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #000;
      color: #fff;
      font-size: 16px;
      font-weight: 500;
      letter-spacing: 2.5px;
      border: none;
      border-radius: 15px;
      cursor: pointer;

      &::after {
        content: '';
        width: 21px;
        height: 21px;
        display: block;
        background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 26 26' xml:space='preserve'%3E%3Cg%3E%3Cpath style='fill:%23fff;' d='M25.856,10.641C21.673,19.5,20.312,19.5,19.5,19.5h-8c-2.802,0-4.949-1.648-5.47-4.2 c-0.016-0.078-1.6-7.853-2.005-10.025C3.826,4.21,3.32,3.5,1.5,3.5C0.671,3.5,0,2.829,0,2s0.671-1.5,1.5-1.5 c3.02,0,4.964,1.5,5.474,4.224c0.401,2.149,1.98,9.898,1.996,9.977c0.319,1.566,1.722,1.8,2.53,1.8h7.605 c0.817-0.878,2.679-4.261,4.038-7.141c0.354-0.749,1.249-1.068,1.997-0.716C25.89,8.997,26.21,9.891,25.856,10.641z M10.5,20.5 C9.119,20.5,8,21.619,8,23s1.119,2.5,2.5,2.5S13,24.381,13,23S11.881,20.5,10.5,20.5z M19.5,20.5c-1.381,0-2.5,1.119-2.5,2.5 s1.119,2.5,2.5,2.5S22,24.381,22,23S20.881,20.5,19.5,20.5z M14.663,12.344c0.1,0.081,0.223,0.12,0.346,0.12 s0.244-0.039,0.346-0.12c0.1-0.079,2.828-2.74,4.316-4.954c0.115-0.172,0.126-0.392,0.028-0.574 c-0.095-0.181-0.285-0.295-0.49-0.295h-2.226c0,0-0.217-4.291-0.359-4.49c-0.206-0.294-1.057-0.494-1.616-0.494 c-0.561,0-1.427,0.2-1.634,0.494c-0.141,0.198-0.328,4.49-0.328,4.49h-2.255c-0.206,0-0.395,0.114-0.492,0.295 c-0.097,0.182-0.086,0.403,0.028,0.574C11.816,9.605,14.564,12.265,14.663,12.344z'/%3E%3C/g%3E%3C/svg%3E");
        margin-left: 10px;
      }

      &:disabled {
        background-color: #919191;
        cursor: not-allowed;
      }
    }
  }
}
</style>
