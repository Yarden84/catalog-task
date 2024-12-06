<template>
    <aside class="sidebar-container">
        <ProductSidebarItem v-for="category in categories" :categories="category.categories" />
    </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import ProductSidebarItem from './ProductSidebarItem.vue'


export default defineComponent({
    components: {
        ProductSidebarItem,
    },
    setup() {
        const route = useRoute();
        const dataStore = useDataStore();
        const categories = computed(() => dataStore.categories);

        const active = computed(() => {
            if (route?.query?.id) {
                return route?.query?.id
            } else {
                ''
            }
        })

        return {
            categories,
        }
    }
})
</script>

<style lang="scss" scoped>
.sidebar-container {
    width: 10%;
    position: absolute;
    top: 120px;
    left: 15px;
}
</style>