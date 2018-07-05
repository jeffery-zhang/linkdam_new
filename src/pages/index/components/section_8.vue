<template>
  <section class="product-preview horizontal index-section" id="section_8">
    <div class="product-img hide-xs">
      <img src="./assets/8_superhard.png" alt="LinkDam"/>
    </div>
    <div class="product-feature">
      <div class="head">
        <div class="number">
          <img src="./assets/08.png"/>
        </div>
        <div class="feature">
          <p class="en-feature">
            Superhard alloy
          </p>
          <h3 class="cn-feature">
            {{$t('INDEX.SECTION_8.TITLE_1')}}<br><strong>{{$t('INDEX.SECTION_8.TITLE_2')}}</strong>
          </h3>
        </div>
      </div>
    </div>
    <div class="product-img hide-lg">
      <img src="./assets/8_superhard.png" alt="LinkDam"/>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'section_8',
  }
</script>

<style lang="scss" scoped>
  @media only screen and (min-width: 1025px) {
    #section_8 {
      .product-feature {
        width: 780px;
        margin-left: 60px;
        margin-right: 0;
      }
      .product-img {
        width: 660px;
      }
      .others {
        width: 360px;
        margin-left: 120px;
      }
    }
  }
</style>
