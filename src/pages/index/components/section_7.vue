<template>
  <section class="product-preview horizontal index-section" id="section_7">
    <div class="product-feature">
      <div class="head">
        <div class="number">
          <img src="./assets/07.png"/>
        </div>
        <div class="feature">
          <p class="en-feature">
            Never transmit data
          </p>
          <h3 class="cn-feature">
            {{$t('INDEX.SECTION_7.TITLE_1')}}<strong>{{$t('INDEX.SECTION_7.TITLE_2')}}</strong>
          </h3>
        </div>
      </div>
      <div class="others">
        <p>{{$t('INDEX.SECTION_7.FEATURE_1')}}<span>{{$t('INDEX.SECTION_7.FEATURE_2')}}</span></p>
      </div>
    </div>
    <div class="product-img">
      <img src="./assets/7_transmit.png" alt="LinkDam"/>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'section_7',
  }
</script>

<style lang="scss" scoped>
  @media only screen and (min-width: 1200px) {
    #section_7 {
      .product-feature {
        width: 720px;
        margin-right: 70px;
        margin-left: 0;
      }
      .product-img {
        width: 580px;
      }
      .others {
        width: 600px;
        margin-left: 120px;
      }
    }
  }
</style>
