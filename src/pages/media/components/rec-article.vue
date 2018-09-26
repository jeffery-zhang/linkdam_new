<template>
  <div class="recommend hidden-md-and-down">
    <h4>{{$t('HEADER.ESSENCE')}}</h4>
    <div class="item" v-for="item in data" :key="item.id">
      <el-button type="text" @click="showDetail(item.id)">{{item.title}}</el-button>
      <span class="time">{{timeTransfer(item.createDate, true)}}</span>
    </div> 
  </div>
</template>

<script>
import get from 'service/getData'
import timeTransfer from 'service/timeTransfer'

export default {
  name: 'rec-article',
  data () {
    return {
      data: [],
    }
  },
  methods: {
    getData() {
      get().getRecommendMedia().then(res => {
        this.data = res.data.list;
      })
    },
    showDetail(id) {
      this.$router.push({
        name: 'media-detail',
        query: {
          id,
        },
      })
    },
    timeTransfer(time, simple) {
      return timeTransfer(time, simple)
    },
  },
  mounted() {
    this.getData()
  },
}
</script>

<style lang="scss" scoped>
@import './../../../style-sheets/theme';

.recommend {
  position: absolute;
  right: 100px;
  top: 54px;
  width: 225px;
  padding: 16px 20px 30px;
  background-color: #fafafa;
  h4 {
    margin-bottom: 10px;
  }
  .item {
    padding: 10px 0;
    &:not(:last-child) {
      border-bottom: 1px solid #e8e8f2;
    }
  }
  .el-button {
    line-height: 18px;
    white-space: normal;
    text-align: left;
  }
  .time {
    margin-bottom: 10px;
    color: $desc-color;
    font-size: 12px;
  }
}
</style>
