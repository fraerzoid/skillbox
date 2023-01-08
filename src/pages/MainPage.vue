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
                <div v-if="this.productsLoading">
                    <span>
                        Производится загрузка товаров
                    </span>
                    <BasePreloader></BasePreloader>
                </div>
                <div v-if="this.productsLoadingFailed">
                    <span>
                        Произошла ошибка при загрузке товаров
                    </span>
                    <button @click.prevent="loadProducts()">
                        Попробовать еще раз
                    </button>
                </div>
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
import ProductList from '@/components/Product/ProductList.vue';
import BasePagination from '@/components/Base/BasePagination.vue';
import ProductFilter from '@/components/Product/ProductFilter.vue';
import axios from 'axios';
import API_BASE_URL from '@/config';
import BasePreloader from '@/components/Base/BasePreloader.vue';

export default {
  name: 'MainPage',
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
    BasePreloader,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,
      //
      page: 1,
      prouctsPerPage: 3,
      productsData: null,
      //
      productsLoading: true,
      productsLoadingFailed: false,
    };
  },
  computed: {
    filtredProducts() {
      let result = this.products;
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
      return this.productsData
        ? this.productsData.items.map((product) => ({
          ...product,
          image: product.image.file.url,
        }))
        : [];
    },
    productsCount() {
      return this.productsData
        ? this.productsData.pagination.total
        : 0;
    },
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL}/api/products`, {
          params: {
            page: this.page,
            limit: this.prouctsPerPage,
            categoryId: this.filterCategoryId,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
            colorId: this.filterColorId,
          },
        })
          // eslint-disable-next-line no-return-assign
          .then((response) => this.productsData = response.data)
          // eslint-disable-next-line no-return-assign
          .catch(() => this.productsLoadingFailed = true)
          // eslint-disable-next-line no-return-assign
          .then(() => this.productsLoading = false);
      }, 500);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterColorId() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
