<template>
  <section class="product-preview index-section">
    <div class="product-feature">
      <div class="head">
        <div class="number">
          <img src="./assets/10.png"/>
        </div>
        <div class="feature">
          <p class="en-feature">
            Lightweight protable
          </p>
          <h3 class="cn-feature">
            <strong>{{$t('INDEX.SECTION_10.TITLE_1')}}</strong>
          </h3>
        </div>
      </div>
      <div class="others">
        <p>{{$t('INDEX.SECTION_10.FEATURE_1')}}<span>{{$t('INDEX.SECTION_10.FEATURE_2')}}</span>{{$t('INDEX.SECTION_10.FEATURE_3')}}</p>
        <p>{{$t('INDEX.SECTION_10.FEATURE_4')}}<span>{{$t('INDEX.SECTION_10.FEATURE_5')}}</span></p>
        <p>{{$t('INDEX.SECTION_10.FEATURE_6')}}</p>
        <p>{{$t('INDEX.SECTION_10.FEATURE_7')}}</p>
      </div>
    </div>
    <div class="product-img">
      <img src="./assets/10_portable.png" alt="LinkDam"/>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'section_10',
  }
</script>
