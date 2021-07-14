<template>
  <div class="book-detail">
    <el-card>
      <el-row class="detail-box">
        <el-col :span="12" class="book-image">
          <img :src="book.s_image || book.b_image" :alt="book.bookname" referrerPolicy="no-referrer">
        </el-col>
        <el-row class="content">
          <el-col :span="12" class="title">
            <span>{{ book.bookname }}</span>
          </el-col>
          <el-col :span="12" class="rate">
            <el-rate
              :value="Number(book.rate)"
              disabled
              show-score
              :colors="colors"
            />
          </el-col>
          <el-col :span="12" class="author-press">
            <el-button type="text" @click.native="goToSearch(book.press)">{{ book.press }}</el-button> 编
            <el-button type="text" @click.native="goToSearch(book.author)">{{ book.author }}</el-button> 著
          </el-col>
          <el-col :span="12" class="price">
            <span>￥{{ book.price }}</span>
          </el-col>
          <!-- <el-col :span="12" class="adress">
            <span>配送至</span>
            <el-dropdown split-button type="primary" @click="selectAddress" @command="test">
              {{ defaultAddress.detail_address }}
              <el-dropdown-menu slot="dropdown">
                <div v-for="(address, index) in addressesList" :key="address.addr_id">
                  <el-dropdown-item v-if="defaultAddress.addr_id!=address.addr_id">{{ address.detail_address + index }}</el-dropdown-item>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col> -->
        </el-row>
      </el-row>
      <el-row>
        <el-col :span="24" class="button-group">
          <el-button-group>
            <el-button type="sucess" @click.native="addToCart">加入购物车</el-button>
            <el-button type="primary" @click.native="handleBuy">立即购买</el-button>
          </el-button-group>
        </el-col>
      </el-row>
      <!-- <BookItem :book="book" /> -->
    </el-card>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <NewOrder ref="newOrder" :book="book" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getBookInfo } from '@/api/book'
import { generateOrder } from '@/api/order'
import { mapGetters } from 'vuex'
import NewOrder from '@/views/order/NewOrder'

export default {
  name: 'Book',
  components: {
    NewOrder
  },
  props: {
    bookId: {
      type: String,
      default: '0'
    },
    colors: {
      type: Array,
      default: () => ['#99A9BF', '#F7BA2A', '#FF9900']
    }
    // book: {
    //   type: Object,
    //   default: () => {
    //     return {
    //       'bookId': 0,
    //       'title': '书籍名称1',
    //       'author': 'bookstore',
    //       'img': '//z3.ax1x.com/2021/04/11/cwKLLj.png?imageView2/1/w/80/h/80',
    //       'description': 1,
    //       'price': 0,
    //       'rate': 3.4,
    //       'status': '已售罄'
    //     }
    //   }
    // }
  },
  data() {
    return {
      title: '书籍详情',
      book: {
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
      },
      dialogVisible: false,
      order: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        additional: [],
        services: ['七天无条件退换'],
        desc: ''
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
  created() {
    getBookInfo(this.bookId).then(res => {
      console.log('书籍详情', res)
      this.book = this.geneRate(res.data)
      this.order.name = this.book.bookname
      this.order.origin = this.defaultAddress.detail_address
    })
  },
  methods: {
    geneRate(item) {
      if (Number(item.rate) > 0) {
        return item
      } else {
        const _item = item
        _item.rate = (3 + Math.random() * 2).toFixed(1)
        return _item
      }
    },
    goToSearch(search) {
      console.log('查找书籍', search)
      this.$router.push({ path: '/search', query: { search }})
    },
    selectAddress(item) {
      console.log('item', item)
    },
    test(item) {
      console.log('item', item)
    },
    addToCart() {
      console.log('addToCart ' + this.book.book_id + ' ' + this.book.bookname)
    },
    handleBuy() {
      this.dialogVisible = true
    },
    handleClose() {
      console.log('this.$refs', this.$refs)
      this.dialogVisible = false
      this.$refs.newOrder.clearOrder()
    },
    handleSubmit() {
      const order = { ...this.$refs.newOrder.order }
      console.log('order', order)
      if (this.$refs.newOrder.order.addr_id > 0 && String(this.$refs.newOrder.order.buyer_message).length > 0) {
        this.dialogVisible = false
        generateOrder(order)
          .then(res => {
            console.log('生成订单', res)
            this.$message.success(res.msg)
          })
          .catch(err => {
            console.log('生成订单失败', err)
          })
        this.$refs.newOrder.clearOrder()
      } else {
        this.$message.error('请选择收货地址并填写买家备注')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.book-detail {
  display: flex;
  // margin: 0 50px;
  .detail-box {
    text-align: center;
    .book-image {
      padding-left: 20px;
    }
    .content {
      .title {
        color: #333333;
        font-size: 25px;
      }

      .rate {
        margin-top: 10px;
      }

      .price {
        font-size: 31px;
        color: #f63515;//#c62e2d;
        line-height: 30px;
        font-weight: 700;
      }

      .adress {
        color: #666666;
      }
    }
  }

  .button-group {
    text-align: center;
  }
}
</style>
