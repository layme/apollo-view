<template>
  <el-container class="my-container">
    <el-aside width="200px" class="x-aside">
      <el-scrollbar wrap-class="scrollbar-wrapper" style="height: 100%">
        <x-menu :menu-list="menuList" :collapse="isCollapse"></x-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header>
        <x-header></x-header>
      </el-header>
      <el-main class="x-main">
        <el-collapse-transition>
        <el-scrollbar wrap-class="scrollbar-wrapper" class="x-wrapper">
          <router-view/>
        </el-scrollbar>
        </el-collapse-transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import xMenu from '../components/menu/x-menu'
import xHeader from '../components/header/x-header'
export default {
  name: 'home',
  components: {
    xMenu,
    xHeader
  },
  computed: {
    menuList () {
      return this.$store.getters.menuList
    },
    isCollapse () {
      return this.$store.state.app.isCollapse
    }
  }
}
</script>

<style scoped lang="less">
  .my-container {
    width: 100%;
    height: 100%;
  }
  .x-aside {
    background-color: #304156;
  }
  .x-main {
    background-color: #EBEEF5;
    .x-wrapper {
      padding: 15px;
      background-color: #FFFFFF;
      border-radius: 4px;
      height: ~"calc(100% - 30px)";
    }
  }
</style>
