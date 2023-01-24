<template>
    <li class="cart__order">
        <h3>{{item.product.title}} X {{item.amount}}</h3>
        <b>{{item.amount * item.product.price | numberFormat}} ₽</b>
        <span>Артикул: {{item.product.id}}</span>
    </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'OrderItem',
  filters: {
    numberFormat,
  },
  props: [
    'item',
  ],
};
</script>
