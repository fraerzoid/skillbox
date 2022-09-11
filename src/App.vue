<template>
  <section class="catalog">
    <ProductList :products="products"></ProductList>
    <BasePagination
      v-model="page"
      :per-page="prouctsPerPage"
      :count="productsCount"
    ></BasePagination>
  </section>
</template>

<script>
import products from './data/products';
import ProductList from './components/Product/ProductList.vue';
import BasePagination from './components/Base/BasePagination.vue';

export default {
  name: 'App',
  components: {
    ProductList,
    BasePagination,
  },
  data() {
    return {
      page: 1,
      prouctsPerPage: 3,
    };
  },
  computed: {
    products() {
      const offset = (this.page - 1) * this.prouctsPerPage;
      return products.slice(offset, offset + this.prouctsPerPage);
    },
    productsCount() {
      return products.length;
    },
  },
};
</script>
