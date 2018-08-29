<template>
  <section class="product-preview index-section" id="section_11">
    <div class="product-feature">
      <div class="head">
        <div class="number">
          <img src="./assets/09.png"/>
        </div>
        <div class="feature">
          <p class="en-feature">
            APP
          </p>
          <h3 class="cn-feature">
            <strong>{{$t('INDEX.SECTION_11.TITLE_1')}}</strong>
          </h3>
        </div>
      </div>
      <div class="others">
        <p>{{$t('INDEX.SECTION_11.FEATURE_1')}}</p>
        <p>{{$t('INDEX.SECTION_11.FEATURE_2')}}</p>
        <p>{{$t('INDEX.SECTION_11.FEATURE_3')}}<span>{{$t('INDEX.SECTION_11.FEATURE_4')}}</span></p>
      </div>
    </div>
    <div class="product-img">
      <img src="./assets/11_app.png" alt="LinkDam"/>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'section_11',
  }
</script>

<style lang="scss" scoped>
  #section_11 {
    padding-bottom: 0;
  }

</style>
