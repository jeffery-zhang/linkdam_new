<template>
  <div class="container" v-loading.fullscreen="loading">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ name: 'index' }">{{$t('HEADER.HOME')}}</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'media-list' }">{{$t('HEADER.MEDIA')}}</el-breadcrumb-item>
      <el-breadcrumb-item class="ellipsis" style="width:120px;">{{data.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
      <div class="article">
        <div class="title">{{data.title}}</div>
        <div class="time">{{timeTransfer(data.createDate)}}</div>
        <div class="main"></div>
      </div>
      <rec-article></rec-article>
    </div>
  </div>
</template>

<script>
import get from 'service/getData'
import timeTransfer from 'service/timeTransfer'
import recArticle from './rec-article';

export default {
  name: 'media-detail',
  components: {
    recArticle,
  },
  data () {
    return {
      loading: false,
      id: 0,
      data: {},
    }
  },
  methods: {
    getData() {
      this.loading = true;
      get().getMedia(this.$route.query.id).then(res => {
        this.data = res.data
        document.querySelector('.main').innerHTML = this.data.content
        this.loading = false
      })
    },
    timeTransfer(time, simple) {
      return timeTransfer(time, simple)
    },
  },
  mounted () {
    this.id = this.$route.query.id
    this.getData()
  },
  watch: {
    $route() {
      this.id = this.$route.query.id
    },
    id() {
      this.getData()
    }
  },
}
</script>

<style lang="scss" scoped>
@import './../../../style-sheets/theme';

.content {
  .article {
    @media only screen and (min-width: 1024px) {
      & {
        width: 900px;
        margin: 100px auto 200px 10%;
      }
    }
    @media only screen and (max-width: 1024px) {
      & {
        margin: 60px 17px 100px;
      }
    }
    .title {
      margin-bottom: 30px;
      text-align: center;
      font-size: 22px;
      font-weight: bold;
    }
    .time {
      margin-bottom: 60px;
      text-align: center;
      color: $desc-color;
      font-size: 12px;
    }
  }
}
</style>
