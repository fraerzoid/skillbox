import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/data/products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [
      { productId: 1, amount: 2 },
    ],
    colors: null,
  },
  mutations: {
    addProductToCart(state, { productId, amount }) {
      const productItem = state.cartProducts.find((item) => item.productId === productId);
      if (productItem) {
        productItem.amount += amount;
      } else {
        state.cartProducts.push({
          productId,
          amount,
        });
      }
    },
    updateCartProductAmount(state, { productId, amount }) {
      const productItem = state.cartProducts.find((item) => item.productId === productId);
      if (productItem) {
        productItem.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter((item) => item.productId !== productId);
    },
    setColors(state, data) {
      state.colors = data;
    },
  },
  getters: {
    cartDetailProucts(state) {
      return state.cartProducts.map((item) => ({
        ...item,
        product: products.find((p) => p.key === item.productId),
      }));
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProucts.reduce(
        (acc, item) => (item.product.price * item.amount) + acc,
        0,
      );
    },
    colors(state) {
      return state.colors;
    },
  },
});
