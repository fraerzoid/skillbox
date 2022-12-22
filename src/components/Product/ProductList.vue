<template>
    <ul class="catalog__list">
      <ProductItem
        v-for="item in products"
        :key="item.key"
        :productItemData="item"
      />
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
