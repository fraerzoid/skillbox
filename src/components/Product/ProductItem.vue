<template>
  <div>
    <a
      class="catalog__pic"
      href="#"
      @click.prevent="gotoPage('product', {key: productItemData.key})"
    >
      <img
        :src="productItemData.image"
        :alt="productItemData.title"
      />
    </a>
    <h3 class="catalog__title">
        <a href="#"> {{productItemData.title}} </a>
    </h3>
    <span class="catalog__price"> {{productItemData.price | numberFormat }} ₽ </span>
    <ProductColors :colors="productItemData.colors"/>
  </div>
</template>

<script>
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';
import ProductColors from '@/components/Product/ProductColors.vue';

export default {
  components: {
    ProductColors,
  },
  props: [
    'productItemData',
  ],
  filters: {
    numberFormat,
  },
  methods: {
    gotoPage(pageName, pageParams) {
      gotoPage(pageName, pageParams);
    },
  },
};
</script>
