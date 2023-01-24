import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import API_BASE_URL from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: null,
    //
    colors: null,
  },
  mutations: {
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = null;
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
    setUserAccessKey(state, data) {
      state.userAccessKey = data;
    },
    setCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCardProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        productId: item.product.id,
        amount: item.quantity,
      }));
    },
    setCartLoading(state, data) {
      state.cartLoading = data;
    },
    setCartLoadingFailed(state, data) {
      state.cartLoading = data;
    },
  },
  getters: {
    colors(state) {
      return state.colors;
    },
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        const product = state.cartProductsData.find(
          (p) => p.product.id === item.productId,
        )?.product;
        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url,
          },
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce(
        (acc, item) => (item.product.price * item.amount) + acc,
        0,
      );
    },
  },
  actions: {
    loadCart(context) {
      return axios.get(`${API_BASE_URL}/api/baskets/`, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('setUserAccessKey', response.data.user.accessKey);
          }
          context.commit('setCartProductsData', response.data.items);
          context.commit('syncCardProducts');
        });
    },
    addProductToCart(context, { productId, amount }) {
      return (new Promise((resolve) => setTimeout(resolve, 2000)))
        .then(() => axios.post(`${API_BASE_URL}/api/baskets/products`, {
          productId,
          quantity: amount,
        }, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
          .then((response) => {
            context.commit('setCartProductsData', response.data.items);
            context.commit('syncCardProducts');
          }));
    },
    updateProductAmount(context, { productId, amount }) {
      context.commit('updateCartProductAmount', { productId, amount });
      if (amount < 1) {
        return new Promise((resolve) => setTimeout(resolve, 0));
      }
      return axios.put(`${API_BASE_URL}/api/baskets/products`, {
        productId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          context.commit('setCartProductsData', response.data.items);
          context.commit('syncCardProducts');
        })
        .catch(() => (context.commit('syncCardProducts')));
    },
    deleteProduct(context, productId) {
      context.commit('deleteCartProduct', productId);
      return (new Promise((resolve) => setTimeout(resolve, 2000)))
        .then(() => axios.delete(`${API_BASE_URL}/api/baskets/products`, {
          data: {
            productId,
          },
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
          .then((response) => {
            context.commit('setCartProductsData', response.data.items);
            context.commit('syncCardProducts');
          }))
        .catch(() => (context.commit('syncCardProducts')));
    },
  },
});
