<template>
    <ul class="colors colors--black">
        <li class="colors__item"
            v-for="(colorId, idx) in this.colors" :key="idx"
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
</template>

<script>
import getColorValue from '@/helpers/getColorValue';

export default {
  name: 'ProductColors',
  props: [
    'colors',
  ],
  methods: {
    getColorValue(colorId) {
      return getColorValue(colorId);
    },
  },
};
</script>
