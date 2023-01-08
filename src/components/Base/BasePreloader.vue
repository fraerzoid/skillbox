<template>
  <div>
      <span>
          Производится загрузка товаров
      </span>
      <loader
          object="#ff9633"
          color1="#fffffz"
          color2="#17fd3d"
          size="5"
          speed="2"
          bg="#343a40"
          disableScrolling="false"
          name="circular"
      >
      </loader>
  </div>
</template>

<script>

export default {
  name: 'BasePreloader',
};
</script>
