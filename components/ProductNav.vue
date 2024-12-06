<template>
    <header>
        <nav>
            <NuxtLink to="/" class="category-container" :class="{ active: !active }" v-show="categories">
                <h5>All</h5>
            </NuxtLink>
            <NuxtLink :to="{ path: '/', query: { id: category.id } }" v-for="category in categories"
                class="category-container" :class="{ active: active === category.id }">
                <h5>{{ category.name?.en }}</h5>
            </NuxtLink>
        </nav>
    </header>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
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
            active
        }
    }
})
</script>

<style lang="scss" scoped>
header {
    display: flex;
    align-items: center;
    justify-content: center;

    nav {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px 0 40px;
        margin: auto;

        a.category-container {
            color: #000;
            text-decoration: none;
            cursor: pointer;

            &:not(:last-child) {
                margin-right: 80px;
            }

            &:hover,
            &.active {
                h5 {
                    color: #000;

                    &::after {
                        content: '';
                        width: 100%;
                    }
                }
            }

            h5 {
                font-size: 18px;
                color: #3f3f3f;
                letter-spacing: 3px;
                position: relative;
                transition: 300 ease-in-out;

                &::after {
                    content: '';
                    width: 0;
                    height: 1px;
                    background-color: #000;
                    transition: 250ms ease-in-out;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                }
            }
        }
    }
}
</style>