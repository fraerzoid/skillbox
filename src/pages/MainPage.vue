<template>
    <main class="content container">
        <div class="content__top content__top--catalog">
            <h1 class="content__title">Каталог</h1>
            <span class="content__info"> 152 товара </span>
        </div>

        <div class="content__catalog">
            <ProductFilter
                :price-from.sync="filterPriceFrom"
                :price-to.sync="filterPriceTo"
                :category-id.sync="filterCategoryId"
                :color-id.sync="filterColorId"
            ></ProductFilter>
            <section class="catalog">
                <ProductList
                    :products="products"
                >
                </ProductList>
                <BasePagination
                    v-model="page"
                    :per-page="prouctsPerPage"
                    :count="productsCount"
                ></BasePagination>
            </section>
        </div>
    </main>
</template>

<script>
import products from '@/data/products';
import ProductList from '@/components/Product/ProductList.vue';
import BasePagination from '@/components/Base/BasePagination.vue';
import ProductFilter from '@/components/Product/ProductFilter.vue';

export default {
  name: 'MainPage',
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,
      //
      page: 1,
      prouctsPerPage: 6,
    };
  },
  computed: {
    filtredProducts() {
      let result = products;
      if (this.filterPriceFrom > 0) {
        result = result.filter((item) => item.price >= this.filterPriceFrom);
      }
      if (this.filterPriceTo > 0) {
        result = result.filter((item) => item.price <= this.filterPriceTo);
      }
      if (this.filterCategoryId) {
        result = result.filter((item) => item.categoryId === this.filterCategoryId);
      }
      if (this.filterColorId > 0) {
        result = result.filter((item) => item.colors.includes(this.filterColorId));
      }
      return result;
    },
    products() {
      const offset = (this.page - 1) * this.prouctsPerPage;
      return this.filtredProducts.slice(offset, offset + this.prouctsPerPage);
    },
    productsCount() {
      return this.filtredProducts.length;
    },
  },
};
</script>
