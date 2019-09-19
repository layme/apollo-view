<template>
  <div>
    <el-form :inline="true" :model="paramDto" ref="form">
      <el-form-item prop="name">
        <el-input v-model="paramDto.name" placeholder="车主" maxlength="20" clearable></el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input v-model="paramDto.phone" placeholder="车主手机号" maxlength="11" clearable></el-input>
      </el-form-item>
      <el-form-item prop="plateNo">
        <el-input v-model="paramDto.plateNo" placeholder="车牌号" maxlength="10" clearable></el-input>
      </el-form-item>
      <el-form-item prop="vinNo">
        <el-input v-model="paramDto.vinNo" placeholder="车架号(后6位)" maxlength="30" clearable></el-input>
      </el-form-item>
      <el-form-item prop="carType">
        <el-select v-model="paramDto.carType" placeholder="车型" clearable>
          <el-option v-for="item in carTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" plain>新增</el-button>
    <el-table
      :data="tableData"
      class="x-table"
      stripe>
      <el-table-column
        prop="name"
        align="center"
        label="车主">
      </el-table-column>
      <el-table-column
        prop="phone"
        align="center"
        label="手机号">
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
        prop="plateNo"
        align="center"
        label="车牌照">
      </el-table-column>
      <el-table-column
        prop="vinNo"
        min-width="80"
        align="center"
        label="车架号">
      </el-table-column>
      <el-table-column
        prop="insuranceType"
        align="center"
        label="保险类型">
      </el-table-column>
      <el-table-column
        prop="insuranceNo"
        min-width="100"
        align="center"
        label="保单号">
      </el-table-column>
      <el-table-column
        prop="insuranceBeginDate"
        align="center"
        label="保险生效日期">
      </el-table-column>
      <el-table-column
        prop="insuranceEndDate"
        align="center"
        label="保险结束日期">
      </el-table-column>
      <el-table-column
        prop="isRemind"
        align="center"
        label="是否提醒">
        <template slot-scope="scope">
          <el-tag size="small" v-if="scope.row.isRemind === 0">未提醒</el-tag>
          <el-tag size="small" v-else type="success">已提醒</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        width="80"
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" v-if="scope.row.isPass === 0" @click="dialogVisible = true">处理</el-button>
          <el-button type="text" size="small" v-else>详情</el-button>
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
  name: 'insurance',
  data () {
    return {
      paramDto: {
        page: 1,
        limit: 10,
        name: '',
        phone: '',
        plateNo: '',
        vinNo: '',
        carType: ''
      },
      tableData: [
        {
          name: '王小虎',
          phone: '13266668888',
          carType: 'b',
          plateNo: '皖D2019',
          vinNo: 'GHALJ890ASD7G90',
          insuranceType: '交强险',
          insuranceNo: '2019707596029376786273',
          insuranceBeginDate: '2019-08-13',
          insuranceEndDate: '2020-08-12',
          isRemind: 0,
          isPass: 0
        },
        {
          name: '王小虎',
          phone: '13266668888',
          carType: 'b',
          plateNo: '皖D2019',
          vinNo: 'GHALJ890ASD7G90',
          insuranceType: '交强险',
          insuranceNo: '2019707596029376786273',
          insuranceBeginDate: '2019-08-13',
          insuranceEndDate: '2020-08-12',
          isRemind: 0,
          isPass: 0
        },
        {
          name: '王小虎',
          phone: '13266668888',
          carType: 'b',
          plateNo: '皖D2019',
          vinNo: 'GHALJ890ASD7G90',
          insuranceType: '交强险',
          insuranceNo: '2019707596029376786273',
          insuranceBeginDate: '2019-08-13',
          insuranceEndDate: '2020-08-12',
          isRemind: 0,
          isPass: 0
        },
        {
          name: '王小虎',
          phone: '13266668888',
          carType: 'b',
          plateNo: '皖D2019',
          vinNo: 'GHALJ890ASD7G90',
          insuranceType: '交强险',
          insuranceNo: '2019707596029376786273',
          insuranceBeginDate: '2019-08-13',
          insuranceEndDate: '2020-08-12',
          isRemind: 0,
          isPass: 0
        },
        {
          name: '王小虎',
          phone: '13266668888',
          carType: 'b',
          plateNo: '皖D2019',
          vinNo: 'GHALJ890ASD7G90',
          insuranceType: '交强险',
          insuranceNo: '2019707596029376786273',
          insuranceBeginDate: '2019-08-13',
          insuranceEndDate: '2020-08-12',
          isRemind: 0,
          isPass: 0
        },
        {
          name: '王小虎',
          phone: '13266668888',
          carType: 'b',
          plateNo: '皖D2019',
          vinNo: 'GHALJ890ASD7G90',
          insuranceType: '交强险',
          insuranceNo: '2019707596029376786273',
          insuranceBeginDate: '2019-08-13',
          insuranceEndDate: '2020-08-12',
          isRemind: 0,
          isPass: 0
        }
      ],
      total: 6,
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
