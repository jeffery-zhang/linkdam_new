<template>
  <section class="product-preview index-section">
    <div class="product-feature">
      <div class="head">
        <div class="number">
          <img src="./assets/06.png"/>
        </div>
        <div class="feature">
          <p class="en-feature">
            Bluetooth
          </p>
          <h3 class="cn-feature">
            <strong>{{$t('INDEX.SECTION_6.TITLE_1')}}</strong>
          </h3>
        </div>
      </div>
      <div class="others">
        <p>{{$t('INDEX.SECTION_6.FEATURE_1')}}<span>{{$t('INDEX.SECTION_6.FEATURE_2')}}</span>；</p>
        <p><span>{{$t('INDEX.SECTION_6.FEATURE_3')}}</span>{{$t('INDEX.SECTION_6.FEATURE_4')}}</p>
      </div>
    </div>
    <div class="product-img">
      <img src="./assets/6_bluetooth.png" alt="LinkDam"/>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'section_6',
  }
</script>
