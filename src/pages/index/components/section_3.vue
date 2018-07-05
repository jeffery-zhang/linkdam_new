<template>
  <section class="product-preview index-section">
    <div class="product-feature">
      <div class="head">
        <div class="number">
          <img src="./assets/03.png"/>
        </div>
        <div class="feature">
          <p class="en-feature">
            Never Net
          </p>
          <h3 class="cn-feature">
            {{$t('INDEX.SECTION_3.TITLE_1')}}<strong>{{$t('INDEX.SECTION_3.TITLE_2')}}</strong>
          </h3>
        </div>
      </div>
      <div class="others">
        <p>{{$t('INDEX.SECTION_3.FEATURE_1')}}</p>
        <p>
          <span>{{$t('INDEX.SECTION_3.FEATURE_2')}}</span>
          {{$t('INDEX.SECTION_3.FEATURE_3')}}
          <span>{{$t('INDEX.SECTION_3.FEATURE_4')}}</span>
          {{$t('INDEX.SECTION_3.FEATURE_5')}}
        </p>
      </div>
    </div>
    <div class="product-img">
      <img src="./assets/3_nonet.png" alt="LinkDam"/>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'section_3',
  }
</script>
