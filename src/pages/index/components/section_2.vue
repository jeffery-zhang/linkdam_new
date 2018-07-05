<template>
  <section class="product-preview index-section">
    <div class="product-feature">
      <div class="head">
        <div class="number">
          <img src="./assets/02.png"/>
        </div>
        <div class="feature">
          <p class="en-feature">
            Storage and Trading
          </p>
          <h3 class="cn-feature">
            {{$t('INDEX.SECTION_2.TITLE_1')}}<strong>{{$t('INDEX.SECTION_2.TITLE_2')}}</strong>
          </h3>
        </div>
      </div>
      <div class="others">
        <p>{{$t('INDEX.SECTION_2.FEATURE_1')}}<span>{{$t('INDEX.SECTION_2.FEATURE_2')}}</span>{{$t('INDEX.SECTION_2.FEATURE_3')}}</p>
        <p>{{$t('INDEX.SECTION_2.FEATURE_4')}}<span>{{$t('INDEX.SECTION_2.FEATURE_5')}}</span>；</p>
      </div>
    </div>
    <div class="product-img">
      <img src="./assets/2_storage.png" alt="LinkDam"/>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'section_2',
  }
</script>
