<!-- eslint-disable max-len -->
<template>
  <div>
    <BasePreloader v-if="this.productLoading"></BasePreloader>
    <div v-else-if="!this.productData">
        <span>
            Произошла ошибка при загрузке товаров
        </span>
        <button @click.prevent="loadProduct()">
            Попробовать еще раз
        </button>
    </div>
    <main v-else class="content container">
        <div class="content__top">
          <ul class="breadcrumbs">
            <li class="breadcrumbs__item">
              <router-link
                class="breadcrumbs__link"
                :to="{name:'main'}"
              >
                Каталог
              </router-link>
            </li>
            <li class="breadcrumbs__item">
              <router-link
                class="breadcrumbs__link"
                :to="{name:'main'}"
              >
                {{category?.title}}
              </router-link>
            </li>
            <li class="breadcrumbs__item">
              <a class="breadcrumbs__link">
                {{product?.title}}
              </a>
            </li>
          </ul>
        </div>

        <section class="item">
          <div class="item__pics pics">
            <div class="pics__wrapper">
              <img width="570" height="570" :src="product?.image.file.url" :alt="product?.title">
            </div>
          </div>

          <div class="item__info">
            <span class="item__code">Артикул: {{product?.id}}</span>
            <h2 class="item__title">
              {{product?.title}}
            </h2>
            <div class="item__form">
              <form class="form" action="#" method="POST" @submit.prevent="addToCart()">
                <b class="item__price">
                  {{product?.price | numberFormat}} ₽
                </b>

                <ProductColors :colors="product?.colors"/>

                <fieldset class="form__block">
                  <legend class="form__legend">Объемб в ГБ:</legend>

                  <ul class="sizes sizes--primery">
                    <li class="sizes__item">
                      <label class="sizes__label">
                        <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="32">
                        <span class="sizes__value">
                          32gb
                        </span>
                      </label>
                    </li>
                    <li class="sizes__item">
                      <label class="sizes__label">
                        <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="64">
                        <span class="sizes__value">
                          64gb
                        </span>
                      </label>
                    </li>
                    <li class="sizes__item">
                      <label class="sizes__label">
                        <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="128" checked="">
                        <span class="sizes__value">
                          128gb
                        </span>
                      </label>
                    </li>
                  </ul>
                </fieldset>

                <div class="item__row">
                  <div class="form__counter">
                    <button type="button" aria-label="Убрать один товар" @click="decProductAmount">
                      <svg width="12" height="12" fill="currentColor">
                        <use xlink:href="#icon-minus"></use>
                      </svg>
                    </button>

                    <input type="text" v-model.number="productAmout">

                    <button type="button" aria-label="Добавить один товар" @click="incProductAmount">
                      <svg width="12" height="12" fill="currentColor">
                        <use xlink:href="#icon-plus"></use>
                      </svg>
                    </button>
                  </div>

                  <button
                    class="button button--primery"
                    type="submit"
                    :disabled="productAddSending"
                  >
                    В корзину
                  </button>
                </div>
                <div v-show="productAdded">
                  <span>"Товар добавлен в корзину"</span>
                </div>
                <div v-show="productAddSending">
                  <span>"Добавляем товар в корзину..."</span>
                </div>
              </form>
            </div>
          </div>

          <div class="item__desc">
            <ul class="tabs">
              <li class="tabs__item">
                <a class="tabs__link tabs__link--current">
                  Описание
                </a>
              </li>
              <li class="tabs__item">
                <a class="tabs__link" href="#">
                  Характеристики
                </a>
              </li>
              <li class="tabs__item">
                <a class="tabs__link" href="#">
                  Гарантия
                </a>
              </li>
              <li class="tabs__item">
                <a class="tabs__link" href="#">
                  Оплата и доставка
                </a>
              </li>
            </ul>

            <div class="item__content">
              <p>
                Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
                Синхронизация со смартфоном<br>
                Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
                Поддержка сторонних приложений<br>
              </p>

              <a href="#">
                Все характеристики
              </a>

              <h3>Что это?</h3>

              <p>
                Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать свои велотренировки, сделав их максимально эффективными.
                Wahoo ELEMNT BOLT GPS синхронизируется с датчиками по ANT+, объединяя полученную с них информацию.
                Данные отображаются на дисплее, а также сохраняются на смартфоне.
                При этом на мобильное устройство можно установить как фирменное приложение, так и различные приложения сторонних разработчиков.
                Велокомпьютер точно отслеживает местоположение, принимая сигнал с целого комплекса спутников.
                Эта информация позволяет смотреть уже преодоленные маршруты и планировать новые велопрогулки.
              </p>

              <h3>Дизайн</h3>

              <p>
                Велокомпьютер Wahoo ELEMNT BOLT очень компактный.
                Размеры устройства составляют всего 74,6 x 47,3 x 22,1 мм. что не превышает габариты смартфона.
                Корпус гаджета выполнен из черного пластика.
                На обращенной к пользователю стороне расположен дисплей диагональю 56 мм.
                На дисплей выводятся координаты и скорость, а также полученная со смартфона и синхронизированных датчиков информация: интенсивность, скорость вращения педалей, пульс и т.д. (датчики не входят в комплект поставки). Корпус велокомпьютера имеет степень защиты от влаги IPX7.
                Это означает, что устройство не боится пыли, а также выдерживает кратковременное (до 30 минут) погружение в воду на глубину не более 1 ыметра.
              </p>
            </div>
          </div>
        </section>
      </main>
  </div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import ProductColors from '@/components/Product/ProductColors.vue';
import axios from 'axios';
import API_BASE_URL from '@/config';
import BasePreloader from '@/components/Base/BasePreloader.vue';
import { mapActions } from 'vuex';

export default {
  name: 'ProductPage',
  data() {
    return {
      productAmout: 1,
      //
      productData: null,
      productLoading: true,
      productLoadingFailed: false,
      //
      productAdded: false,
      productAddSending: false,
    };
  },
  components: {
    ProductColors,
    BasePreloader,
  },
  filters: {
    numberFormat,
  },
  computed: {
    product() {
      return this.productData;
    },
    category() {
      return this.productData?.category;
    },
  },
  methods: {
    ...mapActions(['addProductToCart']),
    addToCart() {
      this.productAdded = false;
      this.productAddSending = true;
      this.addProductToCart(
        { productId: this.product.id, amount: this.productAmout },
      ).then(() => {
        this.productAdded = true;
        this.productAddSending = false;
      });
    },
    incProductAmount() {
      this.productAmout += 1;
    },
    decProductAmount() {
      this.productAmout -= 1;
    },
    loadProduct() {
      this.productLoading = true;
      this.productLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL}/api/products/${this.$route.params.id}`)
          // eslint-disable-next-line no-return-assign
          .then((response) => this.productData = response.data)
          // eslint-disable-next-line no-return-assign
          .catch(() => this.productLoadingFailed = true)
          // eslint-disable-next-line no-return-assign
          .then(() => this.productLoading = false);
      }, 500);
    },
  },
  watch: {
    // eslint-disable-next-line object-shorthand
    '$route.params.id': {
      handler() {
        this.loadProduct();
      },
      immediate: true,
    },
  },
};
</script>
