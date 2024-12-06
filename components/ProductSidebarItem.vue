<template>
    <div v-for="category in categories" class="checkboxes-container">
        <NuxtLink :to="{ path: '/', query: { id: category.id } }" class="checkbox-container">
            <label>
                <input type="checkbox" value="" :checked="active === category?.id">
                <div class="checkbox"></div>
            </label>
            <h6>{{ category?.name?.en }}</h6>
        </NuxtLink>
        <ProductSidebarItem :categories="category?.categories" v-if="category?.categories" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
    props: {
        categories: {
            type: Object,
            required: true,
        },
    },
    setup() {
        const route = useRoute();

        const active = computed(() => {
            if (route?.query?.id) {
                return route?.query?.id
            } else {
                ''
            }
        })

        return {
            active
        }
    }
})
</script>

<style lang="scss" scoped>
.checkbox-container {
    display: flex;
    align-items: start;
    color: #000;
    text-decoration: none;
    margin-bottom: 20px;

    label {
        width: 17px;
        height: 17px;
        border-radius: 2px;
        border: 1px solid #444444;
        cursor: pointer;
        position: relative;

        >div {
            width: 100%;
            height: 100%;
            background-color: transparent;
            border-radius: 2px;
            border: 1px solid #fff;
            pointer-events: none;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
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
                background-color: #000;
            }
        }
    }

    h6 {
        font-size: 16px;
        font-weight: 600;
        letter-spacing: 1.5px;
        line-height: 1.2;
        margin-left: 7px;
    }
}
</style>