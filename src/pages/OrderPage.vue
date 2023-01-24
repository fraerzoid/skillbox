<template>
    <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        3 товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText
              v-model="formData.name"
              title="ФИО"
              placeholder="Введите ваше полное имя"
              :error="formError.name"
            >
            </BaseFormText>
            <BaseFormText
              v-model="formData.address"
              title="Адрес доставки"
              placeholder="Введите ваш адрес"
              :error="formError.address"
            >
            </BaseFormText>
            <BaseFormText
              v-model="formData.phone"
              title="Телефон"
              placeholder="Введите ваш телефон"
              :error="formError.phone"
            >
            </BaseFormText>
            <BaseFormText
              v-model="formData.email"
              title="Email"
              placeholder="Введи ваш Email"
              :error="formError.email"
            >
            </BaseFormText>
            <BaseFormTextArea
              v-model="formData.comments"
              title="Комментарий к заказу"
              placeholder="Ваши пожелания"
              :error="formError.comments"
            >
            </BaseFormTextArea>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    value="0"
                    checked=""
                  >
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
              <OrderItem
                v-for="item in products"
                :key="item.productId"
                :item="item"
              >
              </OrderItem>
          </ul>
          <div class="cart__total">
            <p>Доставка:
              <b>{{this.deliveryCost | numberFormat}} ₽</b>
            </p>
            <p>Итого:
              <b>{{products.length}}</b> товара на сумму
              <b>{{summary + this.deliveryCost | numberFormat }} ₽
              </b>
            </p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block">
          <h4>Заявка не отправлена!</h4>
          <p>
            Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseFormText from '@/components/Base/BaseFormText.vue';
import BaseFormTextArea from '@/components/Base/BaseFormTextArea.vue';
import OrderItem from '@/components/Order/OrderItem.vue';
import { mapGetters } from 'vuex';
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'OrderPage',
  components: {
    BaseFormText,
    BaseFormTextArea,
    OrderItem,
  },
  filters: {
    numberFormat,
  },
  data() {
    return {
      formData: {},
      formError: {},
      deliveryCost: 500,
    };
  },
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts',
      summary: 'cartTotalPrice',
    }),
  },
};
</script>>
