import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ProductData } from '@/types/ProductData'
import type { PromotionalSpots } from '@/types/PromotionalSpots'
import type { ProductsCategories } from '~/types/ProductsCategories'



export const useDataStore = defineStore('dataStore', () => {
    const productsData = ref<ProductData[] | null>(null);
    const promotionalSpots = ref<PromotionalSpots[] | null>(null);
    const categories = ref<ProductsCategories[] | null>(null);

    function setProducts(data: ProductData[]) {
        productsData.value = data;
    }

    function setPromotionalSpots(data: PromotionalSpots[]) {
        promotionalSpots.value = data;
    }

    function setCategories(data: ProductsCategories[]) {
        categories.value = data;
    }


    return {
        productsData,
        promotionalSpots,
        categories,
        setProducts,
        setPromotionalSpots,
        setCategories,
    };
});
