<template>
  <div style="height: 500px">
    <ve-heatmap :data="chartData" :settings="chartSettings" height="1000px"></ve-heatmap>
  </div>
</template>

<script>
export default {
  name: 'customerMap',
  data () {
    this.chartSettings = {
      key: 'oBvDtR6nzWtVchkY4cLHtnah1VVZQKRK',
      bmap: {
        center: [116.989369, 32.635833],
        zoom: 12,
        roam: true,
        mapStyle: {
          // style: 'light'
        }
      },
      type: 'bmap'
    }
    return {
      chartData: {
        columns: ['lat', 'lng'],
        rows: []
      }
    }
  },
  methods: {
    buildPos () {
      for (let i = 0; i < 800; i++) {
        this.chartData.rows.push({
          'lat': Math.random() + 116.5,
          'lng': Math.random() + 32.1
        })
      }
    }
  },
  created () {
    this.buildPos()
  }
}
</script>

<style scoped lang="less">
</style>
