<template>
  <section class="product-preview horizontal index-section" id="section_5">
    <div class="product-feature">
      <div class="head">
        <div class="number">
          <img src="./assets/05.png"/>
        </div>
        <div class="feature">
          <p class="en-feature">
            Attack Self-destruction
          </p>
          <h3 class="cn-feature">
            <strong>{{$t('INDEX.SECTION_5.TITLE_1')}}</strong>{{$t('INDEX.SECTION_5.TITLE_2')}}
          </h3>
        </div>
      </div>
      <div class="others">
        <p>{{$t('INDEX.SECTION_5.FEATURE_1')}}<span>{{$t('INDEX.SECTION_5.FEATURE_2')}}</span>{{$t('INDEX.SECTION_5.FEATURE_3')}}</p>
        <p><span>{{$t('INDEX.SECTION_5.FEATURE_4')}}</span></p>
      </div>
    </div>
    <div class="product-img">
      <img src="./assets/5_attack.png" alt="LinkDam"/>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'section_5',
  }
</script>

<style lang="scss" scoped>
  #section_5 {
    padding-bottom: 0;
  }

  @media only screen and (min-width: 1200px) {
    #section_5 {
      .product-feature {
        max-width: 770px;
        margin-right: 120px;
        margin-left: 0;
      }
      .product-img {
        width: 430px;
      }
      .others {
        width: 500px;
        margin-left: 120px;
      }
    }
  }
</style>
