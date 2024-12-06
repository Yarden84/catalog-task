<template>
    <div class="promotion-container" :style="{ width: 20 * dimensions.x + '%' }">
        <div class="loader-container" alt="promotion image" v-show="!imgLoaded">
            <Loader />
        </div>
        <NuxtLink :to="promotion.link" target="_blank" v-show="imgLoaded">
            <img :src="promotion.image?.imageUrl" class="promotion-img" @load="onImgLoad">
        </NuxtLink>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { PropType } from 'vue'
import type { PromotionalSpots } from '@/types/PromotionalSpots'
import Loader from './Loader.vue'

interface Dimensions {
    x: number;
    y: number;
}

export default defineComponent({
    props: {
        promotion: {
            type: Object as PropType<PromotionalSpots>,
            required: true,
        },
    },
    components: {
        Loader
    },
    setup(props) {
        const imgLoaded = ref<Boolean>(false);
        const dimensions = ref<Dimensions>({
            x: 1,
            y: 1
        })

        dimensions.value = {
            x: props.promotion.type.split('x')[0],
            y: props.promotion.type.split('x')[1]
        }

        const onImgLoad = () => {
            imgLoaded.value = true;
        }

        return {
            imgLoaded,
            onImgLoad,
            dimensions
        }
    },
})
</script>

<style lang="scss" scoped>
.promotion-container {
    width: 20%;
    margin-bottom: 25px;
    margin-right: 5%;

    a {
        width: 100%;
        height: fit-content;
        display: block;

        .promotion-img {
            width: inherit;
            height: inherit;
            display: inherit;
        }
    }
}
</style>