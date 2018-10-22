<template>
  <section id="banner" class="index-section">
    <a href="#/product">
      <img src="./assets/banner-web-EN.png" alt="LINKDAM" class="hidden-sm-and-down" v-if="currLang == 'en-US'">
      <img src="./assets/banner-web-CN.png" alt="LINKDAM" class="hidden-sm-and-down" v-if="currLang == 'zh-CN'">
      <img src="./assets/banner-mobile-EN.png" alt="LINKDAM" class="hidden-md-and-up" v-if="currLang == 'en-US'">
      <img src="./assets/banner-mobile-CN.png" alt="LINKDAM" class="hidden-md-and-up" v-if="currLang == 'zh-CN'">
    </a>
  </section>
</template>

<script>
export default {
  name: 'banner',
  data () {
    return {
      currLang: localStorage.getItem('_lang') || 'zh-CN',
    }
  },
}
</script>

<style lang="scss">
  #banner {
    a {
      width: 100%;
      height: 100%;
    }
  }
</style>
