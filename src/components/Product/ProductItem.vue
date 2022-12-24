<template>
  <div>
    <router-link
      class="catalog__pic"
      :to="{name:'product', params:{key:product.key}}"
    >
      <img
        :src="product.image"
        :alt="product.title"
      />
    </router-link>
    <h3 class="catalog__title">
        <a href="#"> {{product.title}} </a>
    </h3>
    <span class="catalog__price"> {{product.price | numberFormat }} ₽ </span>
    <ProductColors :colors="product.colors"/>
  </div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import ProductColors from '@/components/Product/ProductColors.vue';

export default {
  components: {
    ProductColors,
  },
  props: [
    'product',
  ],
  filters: {
    numberFormat,
  },
};
</script>
