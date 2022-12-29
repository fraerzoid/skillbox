<template>
    <ul class="colors colors--black">
        <li class="colors__item"
            v-for="(item, idx) in this.colors" :key="idx"
        >
            <label class="colors__label">
                <input
                    class="colors__radio sr-only"
                    type="radio"
                    :value="item.id"
                />
                <span
                    class="colors__value"
                    :style="{'background-color': getColorValue(item.id)}"
                >
                </span>
            </label>
        </li>
    </ul>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'ProductColors',
  props: [
    'colors',
  ],
  data() {
    return {
      colorsData: null,
    };
  },
  computed: {
    ...mapGetters({ storedColors: 'colors' }),
    colorsItems() {
      return this.storedColors ? this.storedColors.items : [];
    },
  },
  methods: {
    ...mapMutations(['setColors']),
    getColorValue(colorId) {
      const filtredColorItems = this.colorsItems.filter((item) => item.id === colorId);
      if (filtredColorItems.length === 1) {
        return filtredColorItems[0].code;
      }
      return '';
    },
    loadColors() {
      if (!this.storedColors) {
        axios.get('https://vue-study.skillbox.cc/api/colors')
          // eslint-disable-next-line no-return-assign
          .then((response) => (
            this.setColors(response.data)
          ));
      }
    },
  },
  created() {
    this.loadColors();
  },
};
</script>
