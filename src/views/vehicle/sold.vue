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
          start-placeholder="销售日期"
          end-placeholder="销售日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="plateDate">
        <el-date-picker
          v-model="paramDto.plateDate"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="上牌日期"
          end-placeholder="上牌日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="deliverDate">
        <el-date-picker
          v-model="paramDto.deliverDate"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="交车日期"
          end-placeholder="交车日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
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
        prop="plateNo"
        align="center"
        label="车牌号">
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
        prop="saleDate"
        align="center"
        label="销售日期">
      </el-table-column>
      <el-table-column
        prop="plateDate"
        min-width="100"
        align="center"
        label="上牌日期">
      </el-table-column>
      <el-table-column
        prop="deliverDate"
        align="center"
        label="交车日期">
      </el-table-column>
      <el-table-column
        fixed="right"
        width="120"
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" v-if="!scope.row.plateDate" @click="plateVisible = true">上牌</el-button>
          <el-button type="text" size="small" v-if="!scope.row.deliverDate" @click="takeVisible = true">提车</el-button>
          <el-button type="text" size="small">详情</el-button>
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
      title="上牌"
      :visible.sync="plateVisible"
      width="30%">
      <el-form :model="plateDto" label-width="80px">
        <el-form-item label="上牌日期">
          <el-date-picker type="date" placeholder="选择日期" v-model="plateDto.plateDate" style="width: 300px;"></el-date-picker>
        </el-form-item>
        <el-form-item label="车牌号码">
          <el-input v-model="plateDto.plateNo" placeholder="请输入车牌号" style="width: 300px;"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="plateVisible = false">取 消</el-button>
        <el-button type="primary" @click="plateVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="交车"
      :visible.sync="takeVisible"
      width="40%">
      <el-form :model="deliverDto" label-width="80px">
        <el-form-item label="交车日期">
          <el-date-picker type="date" placeholder="选择日期" v-model="deliverDto.deliverDate" style="width: 300px;"></el-date-picker>
        </el-form-item>
        <el-form-item label="赠送礼品">
          <el-checkbox-group v-model="deliverDto.gift">
            <el-checkbox label="水杯" name="type"></el-checkbox>
            <el-checkbox label="导航" name="type"></el-checkbox>
            <el-checkbox label="保险" name="type"></el-checkbox>
            <el-checkbox label="油卡" name="type"></el-checkbox>
            <el-checkbox label="保养" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="交车照片">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="takeVisible = false">取 消</el-button>
        <el-button type="primary" @click="takeVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'sold',
  data () {
    return {
      paramDto: {
        page: 1,
        limit: 10,
        name: '',
        phone: '',
        plateNo: '',
        vinNo: '',
        carType: '',
        inDate: [],
        plateDate: [],
        deliverDate: []
      },
      tableData: [
        {
          id: 1,
          name: '王小虎',
          phone: '13266668888',
          plateNo: '皖K1234',
          carType: 'b',
          vinNo: 'GHALJ890ASD7G90',
          additionalConfiguration: '倒车影像、车载导航、空调',
          saleDate: '2019-06-27',
          plateDate: '2019-08-13',
          deliverDate: '2019-08-13'
        },
        {
          id: 1,
          name: '王小虎',
          phone: '13266668888',
          plateNo: '皖K1234',
          carType: 'b',
          vinNo: 'GHALJ890ASD7G90',
          additionalConfiguration: '倒车影像、车载导航、空调',
          saleDate: '2019-06-27',
          plateDate: '2019-08-13',
          deliverDate: ''
        },
        {
          id: 1,
          name: '王小虎',
          phone: '13266668888',
          plateNo: '皖K1234',
          carType: 'b',
          vinNo: 'GHALJ890ASD7G90',
          additionalConfiguration: '倒车影像、车载导航、空调',
          saleDate: '2019-06-27',
          plateDate: '2019-08-13',
          deliverDate: '2019-08-13'
        },
        {
          id: 1,
          name: '王小虎',
          phone: '13266668888',
          plateNo: '',
          carType: 'b',
          vinNo: 'GHALJ890ASD7G90',
          additionalConfiguration: '倒车影像、车载导航、空调',
          saleDate: '2019-06-27',
          plateDate: '',
          deliverDate: '2019-08-13'
        },
        {
          id: 1,
          name: '王小虎',
          phone: '13266668888',
          plateNo: '皖K1234',
          carType: 'b',
          vinNo: 'GHALJ890ASD7G90',
          additionalConfiguration: '倒车影像、车载导航、空调',
          saleDate: '2019-06-27',
          plateDate: '2019-08-13',
          deliverDate: ''
        }
      ],
      total: 5,
      plateVisible: false,
      takeVisible: false,
      plateDto: {
        plateDate: new Date(),
        plateNo: '皖K'
      },
      deliverDto: {
        deliverDate: new Date(),
        gift: []
      }
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
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    }
  }
}
</script>

<style scoped lang="less">
</style>
