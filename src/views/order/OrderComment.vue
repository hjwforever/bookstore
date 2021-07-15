<template>
  <el-row class="comment-container">
    <el-card v-for="(book, index) in order.orderItemList" :key="index" shadow="hover">
      <el-form ref="form" :rules="rules" :model="order" label-width="80px" class="comment-form">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="book.bookname" disabled />
        </el-form-item>
        <el-form-item label="评价" prop="rate">
          <el-rate
            v-model="commentForm.commentAndRatesList[index].rate"
            :max="10"
            show-score
            :colors="colors"
          />
        </el-form-item>
        <el-form-item label="用户评价" prop="comment">
          <el-input v-model="commentForm.commentAndRatesList[index].comment" type="textarea" />
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item> -->
      </el-form>
    </el-card>

  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'OrderComment',
  props: {
    order: {
      type: Object,
      default: () => {
        return {
          initOrder: { 'order_id': 1, 'user_id': 1, 'order_number': 'jkaasd', 'payment': 100, 'payment_type': 1, 'post_fee': 10, 'update_time': '2021-07-13T02:23:36.000+00:00', 'create_time': '2021-07-13T02:23:25.000+00:00', 'item_amount': 90, 'payment_time': '2021-07-13T02:23:47.000+00:00', 'payment_ddl_time': '2021-07-13T16:27:38.000+00:00', 'end_time': '2021-07-13T02:23:55.000+00:00', 'close_time': '2021-07-13T02:23:57.000+00:00', 'shipping_name': '顺丰', 'shipping_code': '345', 'buyer_message': 'buyerhjh', 'buyer_rate': 0, 'status': 1, 'country': 'CN', 'receiver_state': 'province', 'receiver_city': 'city', 'receiver_district': 'district', 'detail_address': 'address', 'zip_code': '898989', 'phone': '18800122310' },
          orderItemList: [
            { book_id: 1, amount: 3, bookname: '人骨手镯', press: '朝华出版社', author: null, price: 19, store_amount: 0, s_image: 'https://img7.xinhuashudian.com/bookbasepic/C/00176/75054153280918030-fm.jpg?x-oss-process=image/resize,m_mfit,h_160,w_160' },
            { book_id: 2, amount: 5, bookname: '老故事新道理(经典珍藏版)', press: '北京工业大学出版社', author: null, price: 40.85, store_amount: 0, s_image: 'https://img2.xinhuashudian.com/bookbasepic/C/00175/75639162960916971-fm.jpg?x-oss-process=image/resize,m_mfit,h_160,w_160' },
            { book_id: 25, amount: 22, bookname: '乱世猎人(3)', press: '中国对外翻译出版公司', author: null, price: 20.9, store_amount: 0, s_image: 'https://img8.xinhuashudian.com/bookbasepic/C/00194/75001153340927968-fm.jpg?x-oss-process=image/resize,m_mfit,h_160,w_160' }
          ]
        }
      }
    },
    colors: {
      type: Array,
      default: () => ['#99A9BF', '#F7BA2A', '#FF9900']
    }
  },
  data() {
    const checkComment = (rule, value, callback) => {
      if (!value) {
        console.log('rule, value', rule, value)
        return callback(new Error('请填写买家评价~'))
      }
      setTimeout(() => {
        const length = String(value).length
        if (length < 15 || length > 60) {
          callback(new Error('字数必须大于15小于60'))
        } else {
          callback()
        }
      }, 1000)
    }
    return {
      title: '新建订单',
      commentForm: {
        order_id: -1,
        commentAndRatesList: []
      },
      // {
      // "book_id" : "1",
      // "comment" : "评论评论评论",
      // "rate" : "6"
      // },
      rules: {
        name: [
          { required: true, message: '请输入商品名称~', trigger: 'blur' }
        ],
        rate: [
          { required: true, message: '请给出商品评分~', trigger: 'change' }
        ]
        // ,comment: [
        //   { required: true, validator: checkComment, trigger: 'blur' }
        // ]
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
    // this.order.name = this.book.bookname || ''
    console.log('order', this.order)
    this.commentForm.order_id = this.order.initOrder.order_id
    this.order.orderItemList.forEach(book => {
      this.commentForm.commentAndRatesList.push({
        book_id: book.book_id,
        comment: '',
        rate: NaN
      })
    })
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    submitForm(formName, index) {
      this.$refs[formName][index].validate((valid) => {
        if (valid) {
          console.log('验证成功!')
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
.comment-container {
  // background-color: #f0f0f0;
  .comment-form {
    // margin-bottom: 100px;
  }
}
.el-card .is-hover-shadow {
  margin-bottom: 30px;
}
</style>
