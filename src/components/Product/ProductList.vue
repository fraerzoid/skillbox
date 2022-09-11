<template>
    <ul class="catalog__list">
        <li class="catalog__item" v-for="(item, idx) in products" :key="idx">
            <ProductItem :productItemData="item"></ProductItem>
        </li>
    </ul>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  components: {
    ProductItem,
  },
  props: [
    'products',
  ],
};
</script>
