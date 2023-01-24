import BaseFormField from '@/components/Base/BaseFormField.vue';

export default {
  name: 'BaseFormText',
  props: ['title', 'error', 'placeholder'],
  components: {
    BaseFormField,
  },
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
