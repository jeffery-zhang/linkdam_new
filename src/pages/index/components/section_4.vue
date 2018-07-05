<template>
  <section class="product-preview horizontal index-section" id="section_4">
    <div class="product-img hide-xs">
      <img src="./assets/4_encryption.png" alt="LinkDam"/>
    </div>
    <div class="product-feature">
      <div class="head">
        <div class="number">
          <img src="./assets/04.png"/>
        </div>
        <div class="feature">
          <p class="en-feature">
            High encryption
          </p>
          <h3 class="cn-feature">
            <strong>{{$t('INDEX.SECTION_4.TITLE_1')}}</strong>{{$t('INDEX.SECTION_4.TITLE_2')}}
          </h3>
        </div>
      </div>
      <div class="others">
        <p>{{$t('INDEX.SECTION_4.FEATURE_1')}}</p>
        <p>{{$t('INDEX.SECTION_4.FEATURE_2')}}<span>{{$t('INDEX.SECTION_4.FEATURE_3')}}</span>{{$t('INDEX.SECTION_4.FEATURE_4')}}</p>
      </div>
    </div>
    <div class="product-img hide-lg">
      <img src="./assets/4_encryption.png" alt="LinkDam"/>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'section_4',
  }
</script>

<style lang="scss" scoped>
  @media only screen and (min-width: 1200px) {
    #section_4 {
      .product-feature {
        max-width: 480px;
        margin-left: 30px;
        margin-right: 0;
      }
      .others {
        width: 400px;
        margin-left: 80px;
      }
    }
  }
</style>
