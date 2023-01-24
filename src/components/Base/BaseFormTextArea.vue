<template>
    <BaseFormField
        :title="title"
        :error="error"
    >
        <textarea
            class="form__input form__input--area"
            :placeholder="placeholder"
            v-model="dataValue"
        ></textarea>
    </BaseFormField>
</template>

<script>
import formFieldMixin from '@/mixins/fromFieldMixin';

export default {
  mixins: [formFieldMixin],
};
</script>
