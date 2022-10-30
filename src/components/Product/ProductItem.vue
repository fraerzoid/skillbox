<template>
  <div>
    <a class="catalog__pic" href="#">
      <img
        :src="productItemData.image"
        :alt="productItemData.title"
      />
    </a>
    <h3 class="catalog__title">
        <a href="#"> {{productItemData.title}} </a>
    </h3>
    <span class="catalog__price"> {{productItemData.price}} ₽ </span>
    <ul class="colors colors--black">
        <li class="colors__item"
            v-for="(colorId, idx) in productItemData.colors" :key="idx"
        >
            <label class="colors__label">
                <input
                    class="colors__radio sr-only"
                    type="radio"
                    :value="colorId"
                />
                <span
                    class="colors__value"
                    :style="{'background-color': getColorValue(colorId)}"
                >
                </span>
            </label>
        </li>
    </ul>
  </div>
</template>

<script>

import colors from '../../data/colors';

export default {
  props: [
    'productItemData',
  ],
  computed: {
    colors() {
      return colors;
    },
  },
  methods: {
    getColorValue(colorId) {
      const colorItem = this.colors.filter((item) => item.id === colorId);
      if (colorItem.length === 1) {
        return colorItem[0].value;
      }
      return 'red';
    },
  },
};
</script>
