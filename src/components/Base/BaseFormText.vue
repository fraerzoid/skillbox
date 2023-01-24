<template>
    <BaseFormField
        :title="title"
        :error="error"
    >
        <input
            class="form__input"
            :placeholder="placeholder"
            v-model="dataValue"
            :type="type"
        >
    </BaseFormField>
</template>

<script>
import formFieldMixin from '@/mixins/fromFieldMixin';

export default {
  props: {
    type: {
      default: 'text',
    },
  },
  mixins: [formFieldMixin],
};
</script>
