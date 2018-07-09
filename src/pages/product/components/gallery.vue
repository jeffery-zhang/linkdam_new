<template>
  <el-col :sm="12" :xs="24">
    <div class="product-booth">
      <img :src="currentItem.slide" alt="LINKDAM">
    </div>
    <div class="thumb-gallery">
      <swiper class="clearfix" :options="swiperOption" ref="displaySwiper">
        <swiper-slide v-for="item in items" :key="item.id" :class="{active: currentItem.id == item.id}" v-if="item.color == color">
          <img :src="item.slide" @click="currentItem = item"/>
        </swiper-slide>
      </swiper>
    </div>
  </el-col>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';

import slide1_b from './../../../assets/LinkDam-black-01.png'
import slide2_b from './../../../assets/LinkDam-black-02.png'
import slide3_b from './../../../assets/LinkDam-black-03.png'
import slide1_w from './../../../assets/LinkDam-white-01.png'
import slide2_w from './../../../assets/LinkDam-white-02.png'
import slide3_w from './../../../assets/LinkDam-white-03.png'

import 'swiper/dist/css/swiper.min.css';

export default {
  name: 'gallery',
  components: {
    swiper,
    swiperSlide,
  },
  props: [
    'color',
  ],
  data() {
    const items = [
      {
        slide: slide1_b,
        color: '黑色',
        id: 1,
      },
      {
        slide: slide2_b,
        color: '黑色',
        id: 2,
      },
      {
        slide: slide3_b,
        color: '黑色',
        id: 3,
      },
      {
        slide: slide1_w,
        color: '白色',
        id: 4,
      },
      {
        slide: slide2_w,
        color: '白色',
        id: 5,
      },
      {
        slide: slide3_w,
        color: '白色',
        id: 6,
      },
    ];
    return {
      items,
      currentItem: items[0],
      swiperOption: {
        slidesPerView: 3.5,
        loop: false,
      },
    };
  },
  watch: {
    color(nv) {
      if (nv == '白色') {
        this.currentItem = this.items[3];
      } else {
        this.currentItem = this.items[0];
      }
    },
  },
}
</script>

<style lang="scss">
@import './../../../style-sheets/theme.scss';
@import './../../../style-sheets/mixin.scss';

.product-booth {
  padding: 0 20px;
}
.swiper-container {
  padding: 20px;
  .swiper-slide {
    transition: box-shadow .3s ease;
    &.active {
      box-shadow: 0 0px 5px 1px rgba(52, 154, 255, .8);
    }
  }
}
</style>
