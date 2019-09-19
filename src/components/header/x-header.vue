<template>
  <div class="x-header">
    <div class="one">
      <x-bread></x-bread>
    </div>
    <div class="two">
      <el-dropdown>
        <span class="el-dropdown-link">
          你好，任宏远<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item disabled>双皮奶</el-dropdown-item>
          <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import xBread from '../../components/header/x-bread'
export default {
  name: 'x-header',
  components: {
    xBread
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapMutations(['switchCollapse'])
  }
}
</script>

<style scoped lang="less">
  .x-header {
    height: 100%;
    line-height: 100%;
    padding-top: 22px;
    .one {
      width: 60%;
      height: 100%;
      float: left;
      box-sizing: border-box;
      padding-top: 2px;
    }
    .two {
      width: 40%;
      height: 100%;
      float: left;
      box-sizing: border-box;
      text-align: right;
    }
  }
</style>
