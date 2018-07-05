<template>
  <section class="product-preview">
    <div class="product-feature">
      <div class="head">
        <div class="number">
          <img src="./assets/09.png"/>
        </div>
        <div class="feature">
          <p class="en-feature">
            Comprehensive management tools
          </p>
          <h3 class="cn-feature">
            <strong>{{$t('INDEX.SECTION_9.TITLE_1')}}</strong>{{$t('INDEX.SECTION_9.TITLE_2')}}
          </h3>
        </div>
      </div>
      <div class="others">
        <p>{{$t('INDEX.SECTION_9.FEATURE_1')}}<span>{{$t('INDEX.SECTION_9.FEATURE_2')}}</span></p>
        <p><span>{{$t('INDEX.SECTION_9.FEATURE_3')}}</span>{{$t('INDEX.SECTION_9.FEATURE_4')}}</p>
      </div>
    </div>
    <div class="product-img">
      <img src="./assets/9_management.png" alt="LinkDam"/>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'section_9',
  }
</script>
