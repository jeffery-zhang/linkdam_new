<template>
  <div class="container" v-loading.fullscreen="loading">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ name: 'index' }">{{$t('HEADER.HOME')}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{$t('HEADER.MEDIA')}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
      <div class="list">
        <div class="media-report" v-for="item in data" :key="item.id">
          <div class="image" :style="{ backgroundImage: `url(${item.image})` }"></div>
          <div class="article">
            <div class="title ellipsis">{{item.title}}</div>
            <div class="desc hidden-md-and-down">{{item.description}}</div>
            <div class="time">{{timeTransfer(item.createDate, true)}}</div>
            <el-button class="hidden-xs-only" type="plain" round size="mini">MORE ></el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import get from 'service/getData'
import timeTransfer from 'service/timeTransfer'

export default {
  name: 'media-list',
  data () {
    return {
      loading: false,
      data: [],
      recData: [],
    }
  },
  methods: {
    getData(page) {
      this.loading = true
      get().getMediaList(page).then(res => {
        this.data = res.data.list;
        this.totalPage = res.data.totalPage;
        this.loading = false;
      })
    },
    getRecData() {
      get().getRecommendMedia().then(res => {
        this.recData = res.data.list;
      })
    },
    timeTransfer(time, simple) {
      return timeTransfer(time, simple)
    },
  },
  mounted() {
    this.getData()
    this.getRecData()
  },
}
</script>

<style lang="scss" scoped>
@import './../../../style-sheets/theme';
@import './../../../style-sheets/mixin';

.content {
  .list {
    * {
      transition: all .3s ease;
    }
    .media-report {
      display: flex;
      margin: 20px 0;
      border-radius: 10px;
      overflow: hidden;
      &:hover {
        box-shadow: 0 0px 10px 1px rgba(52, 154, 255, 0.8);
        cursor: pointer;
        .title {
          color: $theme-color;
        }
      }
      @media only screen and (min-width: 1024px) {
        & {
          width: 900px;
          margin: 20px auto 20px 10%;
        }
      }
      @media only screen and (max-width: 1024px) {
        & {
          margin: 20px 17px;
        }
      }
      .image {
        @include wh(40%, 0);
        padding-bottom: 27%;
        background-position: center center;
        background-size: cover;
      }
      .article {
        width: 60%;
        padding: 3%;
        .title {
          font-weight: bold;
        }
        .desc {
          margin: 20px 0;
          font-size: 14px;
          color: $light-grey-color;
        }
        .time {
          margin-bottom: 10px;
          color: $desc-color;
          font-size: 12px;
        }
        .el-button {
          max-width: 120px;
          color: $theme-color;
          &:hover {
            background-color: $theme-color;
            border-color: $theme-color;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
