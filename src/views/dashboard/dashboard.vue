<template>
  <div id="main">
    <el-row :gutter="20">
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-wait-take">
            <i class="el-icon-sell" style="font-size: 48px"></i>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">待提车辆</div>
            <count-to :start-val="0" :end-val="info.waitTake" :duration="1000" class="card-panel-num"/>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-wait-license">
            <i class="el-icon-coordinate" style="font-size: 48px"></i>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">待上牌车辆</div>
            <count-to :start-val="0" :end-val="info.waitLicense" :duration="1000" class="card-panel-num"/>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-stock">
            <i class="el-icon-truck" style="font-size: 48px"></i>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">现车库存</div>
            <count-to :start-val="0" :end-val="info.stock" :duration="1000" class="card-panel-num"/>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-sold">
            <i class="el-icon-data-line" style="font-size: 48px"></i>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">已售车辆</div>
            <count-to :start-val="0" :end-val="info.sold" :duration="1000" class="card-panel-num"/>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <div class="x-top">
        <el-date-picker
          v-model="yearParam"
          type="year"
          size="small"
          format="yyyy"
          :clearable="false"
          :editable="false"
          style="margin-left: 10px; width: 100px;"
          placeholder="选择年">
        </el-date-picker>
        年各车型销售曲线
        <ve-line :data="chartData" :settings="lineSettings"></ve-line>
      </div>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="x-top">
          <el-date-picker
            v-model="yearParam"
            type="year"
            size="small"
            format="yyyy"
            :clearable="false"
            :editable="false"
            style="margin-left: 10px; width: 100px;"
            placeholder="选择年">
          </el-date-picker> 年各车型销售占比
          <ve-pie :data="soldData" :settings="lineSettings"></ve-pie>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="x-top">
          <el-date-picker
            v-model="yearParam"
            type="month"
            size="small"
            format="yyyy-MM"
            :clearable="false"
            :editable="false"
            style="margin-left: 10px; width: 120px;"
            placeholder="选择年">
          </el-date-picker> 月员工销售数据
          <ve-histogram :data="workerData" :extend="histogramExtend" :legend-visible="false"
                        :tooltip-visible="false"></ve-histogram>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import 'echarts/lib/component/title'

export default {
  name: 'dashboard',
  components: {
    CountTo
  },
  data () {
    this.lineSettings = {
      labelMap: {
        'a': '海狮',
        'b': '海星',
        'c': '厢货',
        'd': 'GO1'
      }
    }
    this.histogramExtend = {
      series: {
        label: { show: true }
      }
    }
    return {
      info: {
        waitTake: 22,
        waitLicense: 12,
        sold: 1024,
        stock: 168
      },
      chartData: {
        columns: ['date', 'a', 'b', 'c', 'd'],
        rows: [
          { 'date': '2019-01', 'a': 28, 'b': 17, 'c': 9, 'd': 10 },
          { 'date': '2019-02', 'a': 12, 'b': 44, 'c': 6, 'd': 13 },
          { 'date': '2019-03', 'a': 33, 'b': 13, 'c': 4, 'd': 14 },
          { 'date': '2019-04', 'a': 15, 'b': 43, 'c': 8, 'd': 12 },
          { 'date': '2019-05', 'a': 55, 'b': 33, 'c': 3, 'd': 7 },
          { 'date': '2019-06', 'a': 32, 'b': 13, 'c': 5, 'd': 9 },
          { 'date': '2019-07', 'a': 11, 'b': 16, 'c': 3, 'd': 12 },
          { 'date': '2019-08', 'a': 45, 'b': 24, 'c': 7, 'd': 22 },
          { 'date': '2019-09', 'a': null, 'b': null, 'c': null, 'd': null },
          { 'date': '2019-10', 'a': null, 'b': null, 'c': null, 'd': null },
          { 'date': '2019-11', 'a': null, 'b': null, 'c': null, 'd': null },
          { 'date': '2019-12', 'a': null, 'b': null, 'c': null, 'd': null }
        ]
      },
      workerData: {
        columns: ['worker', 'count'],
        rows: [
          { 'worker': '任红森', 'count': 66 },
          { 'worker': '张三', 'count': 26 },
          { 'worker': '李四', 'count': 36 },
          { 'worker': '王二', 'count': 44 },
          { 'worker': '小明', 'count': 24 }
        ]
      },
      soldData: {
        columns: ['type', 'count'],
        rows: [
          { 'type': '海狮', 'count': 139 },
          { 'type': '海星', 'count': 153 },
          { 'type': '厢货', 'count': 293 },
          { 'type': 'GO1', 'count': 172 }
        ]
      },
      yearParam: new Date()
    }
  }
}
</script>

<style scoped lang="less">
  .card-panel {
    padding: 20px 40px;
    border: 1px solid #E4E7ED;
    height: 50px;
    border-radius: 4px;
    margin: 10px 0;

    &:hover {
      -webkit-box-shadow: #dcdee2 0 1px 6px;
      -moz-box-shadow: #dcdee2 0 1px 6px;
      box-shadow: #dcdee2 0 1px 6px;
    }

    .card-panel-icon-wrapper {
      float: left;
      width: 50%;
      /*margin: 14px 0 0 14px;*/
      /*padding: 16px;*/
    }

    .card-panel-description {
      float: left;
      width: 50%;
      text-align: right;
      font-weight: bold;
      /*margin: 26px 26px 26px 0;*/

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        line-height: 26px;
        font-size: 26px;
      }
    }

    .icon-wait-take {
      color: #40c9c6;
    }

    .icon-wait-license {
      color: #36a3f7;
    }

    .icon-sold {
      color: #34bfa3
    }

    .icon-stock {
      color: #f4516c;
    }
  }

  .x-top {
    padding-top: 30px;
    margin-top: 20px;
    border: 1px solid #E4E7ED;
    border-radius: 4px;
  }
</style>
