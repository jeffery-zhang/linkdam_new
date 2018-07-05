<template>
  <section class="product-preview index-section">
    <div class="product-feature">
      <div class="head">
        <div class="number">
          <img src="./assets/01.png"/>
        </div>
        <div class="feature">
          <p class="en-feature">
            All Currencies
          </p>
          <h3 class="cn-feature">
            {{$t('INDEX.SECTION_1.TITLE_1')}}
            <strong>
              {{$t('INDEX.SECTION_1.TITLE_2')}}
            </strong>
            {{$t('INDEX.SECTION_1.TITLE_3')}}
          </h3>
        </div>
      </div>
      <div class="others">
        <div class="sim-button" :class="{en: currentLang == 'en-US'}">
              <span class="inner">
                {{$t('INDEX.SECTION_1.FEATURE_1')}}
              </span>
          {{$t('INDEX.SECTION_1.FEATURE_2')}}
        </div>
      </div>
    </div>
    <div class="product-img">
      <img src="./assets/1_currencies.png" alt="LinkDam"/>
    </div>
  </section>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  name: 'section_1',
  data () {
    return {
      currentLang: Cookies.get('_lang') || 'en-US',
    }
  }
}
</script>
