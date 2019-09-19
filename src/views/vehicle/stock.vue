<template>
  <div>
    <el-form :inline="true" :model="paramDto" ref="form">
      <el-form-item prop="vinNo">
        <el-input v-model="paramDto.vinNo" placeholder="车架号(后6位)" maxlength="10" clearable></el-input>
      </el-form-item>
      <el-form-item prop="carType">
        <el-select v-model="paramDto.carType" placeholder="车型" clearable>
          <el-option v-for="item in carTypeOptions" :key="item.value" :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="inDate">
        <el-date-picker
          v-model="paramDto.inDate"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="入库日期"
          end-placeholder="入库日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" plain>新增</el-button>
    <el-button type="primary" plain>导入</el-button>
    <el-table
      :data="tableData"
      class="x-table"
      stripe>
      <el-table-column
        prop="id"
        align="center"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="carType"
        align="center"
        label="车型">
        <template slot-scope="scope">
          <span>{{ scope.row.carType | carTypeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="vinNo"
        min-width="80"
        align="center"
        label="车架号">
      </el-table-column>
      <el-table-column
        prop="additionalConfiguration"
        min-width="150"
        align="center"
        label="附加配置">
      </el-table-column>
      <el-table-column
        prop="birth"
        align="center"
        label="出厂日期">
      </el-table-column>
      <el-table-column
        prop="arrive"
        min-width="100"
        align="center"
        label="到店日期">
      </el-table-column>
      <el-table-column
        prop="stockDay"
        align="center"
        label="库存天数">
      </el-table-column>
      <el-table-column
        fixed="right"
        width="120"
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small">修改</el-button>
          <el-button type="text" size="small">详情</el-button>
          <el-button type="text" size="small" style="color: #F56C6C">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="x-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="paramDto.page"
      :page-size="paramDto.limit"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
    <el-dialog
      title="记录处理结果"
      :visible.sync="dialogVisible"
      width="30%">
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="result"
        :rows="4"
        maxlength="200"
        show-word-limit>
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'stock',
  data () {
    return {
      paramDto: {
        page: 1,
        limit: 10,
        vinNo: '',
        carType: '',
        inDate: []
      },
      tableData: [
        {
          id: 1,
          carType: 'b',
          vinNo: 'GHALJ890ASD7G90',
          additionalConfiguration: '倒车影像、车载导航、空调',
          birth: '2019-06-27',
          arrive: '2019-08-13',
          stockDay: 42
        },
        {
          id: 2,
          carType: 'a',
          vinNo: 'GHALJ890ASD7G90',
          additionalConfiguration: '倒车影像、车载导航、空调',
          birth: '2019-06-27',
          arrive: '2019-08-13',
          stockDay: 42
        },
        {
          id: 3,
          carType: 'b',
          vinNo: 'GHALJ890ASD7G90',
          additionalConfiguration: '倒车影像、车载导航、空调',
          birth: '2019-06-27',
          arrive: '2019-08-13',
          stockDay: 42
        },
        {
          id: 4,
          carType: 'c',
          vinNo: 'GHALJ890ASD7G90',
          additionalConfiguration: '倒车影像、车载导航、空调',
          birth: '2019-06-27',
          arrive: '2019-08-13',
          stockDay: 42
        },
        {
          id: 5,
          carType: 'd',
          vinNo: 'GHALJ890ASD7G90',
          additionalConfiguration: '倒车影像、车载导航、自动空调、发动机启停',
          birth: '2019-06-27',
          arrive: '2019-08-13',
          stockDay: 42
        }
      ],
      total: 5,
      dialogVisible: false,
      result: ''
    }
  },
  computed: {
    carTypeOptions () {
      return this.$store.state.app.carTypeOptions
    }
  },
  methods: {
    onSearch () {
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    resetForm () {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style scoped lang="less">
</style>
