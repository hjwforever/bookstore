<template>
  <el-form ref="form" :rules="rules" :model="order" label-width="80px">
    <el-form-item label="商品名称" prop="name">
      <el-input v-model="order.name" disabled />
    </el-form-item>
    <el-form-item label="配送地址" prop="addr_id">
      <el-select v-model="order.addr_id" placeholder="请选择配送地址">
        <div v-for="(address, index) in addressesList" :key="index">
          <el-option v-if="order.addr_id!=address.addr_id" :label="address.detail_address" :value="address.addr_id" />
        </div>
      </el-select>
    </el-form-item>
    <!-- <el-form-item label="活动时间">
      <el-col :span="11">
        <el-date-picker v-model="order.date1" type="date" placeholder="选择日期" style="width: 100%;" />
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-time-picker v-model="order.date2" placeholder="选择时间" style="width: 100%;" />
      </el-col>
    </el-form-item> -->
    <!-- <el-form-item label="即时配送">
      <el-switch v-model="order.delivery" />
    </el-form-item> -->
    <el-form-item label="售后服务" prop="services">
      <el-checkbox-group v-model="order.services">
        <el-checkbox disabled label="七天无条件退换" name="type" />
        <el-checkbox label="意外换新" name="type" />
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="备注" prop="buyer_message">
      <el-input v-model="order.buyer_message" clearable type="textarea" />
    </el-form-item>
    <!-- <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item> -->
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NewOrder',
  props: {
    book: {
      type: Object,
      default: () => {
        return {
          'book_id': 2,
          'cate_id': 5,
          'bookname': '老故事新道理(经典珍藏版)',
          'press': '北京工业大学出版社',
          'author': '穆子青//戈晨',
          'publish_date': '2006-03-31T16:00:00.000+00:00',
          'isbn': '9787563916290',
          'price': 40.85,
          'pages': 441,
          'deal_amount': 0,
          'look_amount': 0,
          'store_amount': 0,
          's_image': 'https://img2.xinhuashudian.com/bookbasepic/C/00175/75639162960916971-fm.jpg?x-oss-process=image/resize,m_mfit,h_160,w_160',
          'b_image': 'https://img2.xinhuashudian.com/bookbasepic/C/00175/75639162960916971-fm.jpg?x-oss-process=image/resize,m_mfit,h_375,w_375',
          'description': '本书收录了古今中外成语、寓言、战争、处世、交友、教子、管理等18大类数百则故事。在这些故事中，以古代故事居多，称为“老故事”当之无愧。在体例安排上，本书除了讲述故事外，还设计了开篇引言和新道理两个精彩的部分，能引领你进入一个美丽隽永的哲理世界。书中的每一个故事都是一把心灵的钥匙，用心去阅读、去领悟，心中的成功之门、智慧之门、友谊之门、爱情之门等等便会一一开启，阳光便会照射进来，温暖舒畅，如沐春风。',
          'rate': 0.0,
          'rate_num': 0
        }
      }
    }
  },
  data() {
    return {
      title: '新建订单',
      order: {
        name: '',
        region: '北京市海淀区上园村3号',
        // date1: '',
        // date2: '',
        addr_id: undefined,
        payment_type: 2,
        orderDetailList: [],
        delivery: false,
        additional: [],
        services: ['七天无条件退换'],
        buyer_message: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        addr_id: [
          { required: true, message: '请选择收货区域', trigger: 'blur' }
        ],
        buyer_message: [
          { required: true, message: '请填写买家备注', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'defaultAddress',
      'addressesList',
      'user'
    ])
  },
  watch: {
  },
  created() {
    this.order.name = this.book.bookname || ''
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    clearOrder() {
      this.order = {
        name: '',
        region: '北京市海淀区上园村3号',
        // date1: '',
        // date2: '',
        addr_id: undefined,
        payment_type: 2,
        orderDetailList: [],
        delivery: false,
        additional: [],
        services: ['七天无条件退换'],
        buyer_message: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
