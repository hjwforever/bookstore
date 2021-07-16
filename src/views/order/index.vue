<template>
  <div class="order-container">
    <el-menu :default-active="status" background-color="#f7f7f7" active-text-color="#c62e2d" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item v-for="(item, index) in ORDER_STATUS" :key="item.index" :index="String(item.index)">
        {{ item.label }}
      </el-menu-item>
    </el-menu>
    <el-input v-model="search" clearable placeholder="订单号/书籍名称" class="search-input" @keyup.enter.native="searchOrders">
      <el-button slot="append" type="primary" icon="el-icon-search" style="color: blue" @click.native="searchOrders" />
    </el-input>

    <div class="infinite-list" style="overflow:auto" spinner="waveDots" @infinite="load">
      <!-- <div slot="no-more">没有更多订单了...</div>
      <div slot="no-results">无结果...</div> -->
      <el-card v-for="(item, index) in orderList" :key="index" class="order-item-box" shadow="hover" @click="goTo(item.order_id)">
        <el-row slot="header" type="flex" justify="space-between" class="order-item-header">
          <span>订单更新时间：{{ item.initOrder.update_time }}</span>
          <span>订单状态：{{ returnStatus(item.initOrder.status) }}</span>
        </el-row>
        <el-row type="flex" justify="space-between" class="order-item-body">
          <el-col>
            <el-row>
              <el-row>
                <el-col v-for="(book, _index) in item.orderItemList" :key="_index" :span="1">
                  <el-tooltip placement="top">
                    <el-row slot="content">
                      <div v-for="(bookItem,key, bookIndex) in book" :key="bookIndex">
                        <el-col v-if="bookItem">
                          {{ returnName(key) }}: {{ bookItem }}
                        </el-col>
                      </div>
                    </el-row>
                    <el-avatar :src="book.s_image" :alt="book.bookname" referrer-policy="no-referrer" />
                  </el-tooltip>
                </el-col>
              </el-row>
              <el-col>
                <el-row>
                  <el-col>
                    {{ item.bookname }}
                  </el-col>
                  <el-col>
                    订单号: {{ item.initOrder.order_number }}
                  </el-col>
                  <el-col class="order-item-price">
                    ￥ {{ item.initOrder.payment }}
                  </el-col>
                  <el-col>
                    {{ returnShippingName(item.initOrder.shipping_name) }}快递(￥{{ Number(item.initOrder.post_fee).toFixed(2) }})
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
          <el-row type="flex" justify="end" class="order-item-amount">
            <span> {{ 'X' + item.initOrder.item_amount }}</span>
          </el-row>
          <el-button-group v-if="allowedStatus.includes(Number(item.initOrder.status))" style="margin-left: 10px">
            <el-button v-if="item.initOrder.status==0" @click.native="cancelOrder(item.initOrder.order_id)">取消订单</el-button>
            <el-button v-if="item.initOrder.status==0" type="primary" style="margin-top: 10px" @click.native="goToPay(item.initOrder.order_id)">支付订单</el-button>
            <el-button v-if="item.initOrder.status==1 && hasAnyRight(['ship'])" type="primary" style="margin-top: 10px" @click.native="goToShip(item.initOrder.order_id)">确认已发货</el-button>
            <el-button v-if="item.initOrder.status==2" type="primary" @click.native="confirmReceipt(item.initOrder.order_id)">确认收货</el-button>
            <el-button v-if="item.initOrder.status==3" type="success" @click.native="goToComment(item)">前往评价</el-button>
            <el-button v-if="item.initOrder.status==5" disabled circle type="success" icon="el-icon-check">订单已完成</el-button>
          </el-button-group>
        </el-row>
      </el-card>
    </div>
    <el-dialog
      title="订单支付"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      center
    >
      <img :src="orderImg" :alt="'支付订单'+order_id" referrerPolicy="no-referrer">
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">返 回</el-button>
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
    <!-- <el-button v-if="allowedStatus.includes(Number(item.initOrder.status))" :type="Number(item.initOrder.status)==allowedStatus[0]?'primary':'success'" style="margin-left: 10px" @click.native="handleAction(Number(item.initOrder.status))">去{{ returnStatus(item.initOrder.status).slice(1) }}</el-button> -->
    <!-- fullscreen -->
    <!-- custom-class="comment-container" -->
    <el-dialog
      title="订单评价"
      :visible.sync="commentDialogVisible"
      width="30%"
      :before-close="commentHandleClose"
      center
      fullscreen
      destroy-on-close
    >
      <OrderComment ref="OrderComment" :order="order" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="commentHandleClose">取 消</el-button>
        <el-button :loading="submitLoading" type="primary" @click="submitComment">确 定</el-button>
      </span>
    </el-dialog>
    <el-row type="flex" justify="end">
      <el-pagination
        background
        layout="total, prev, pager, next, jumper"
        :page-size="pageSize"
        :current-page="pageNum"
        :pager-count="9"
        :total="totalItemsNum"
        @prev-click="searchOrders"
        @current-change="searchOrders"
        @next-click="searchOrders"
      />
    </el-row>

  </div>
</template>

<script>
import { getOrderList, ORDER_STATUS, pay, ship, cancelOrder, confirmReceipt, commentOrder } from '@/api/order'
import OrderComment from './OrderComment.vue'
import { backtop } from '@/utils'
import { mapGetters } from 'vuex'

export default {
  name: 'Order',
  components: {
    OrderComment
  },
  data() {
    return {
      title: '订单管理',
      search: '',
      status: '-1',
      ORDER_STATUS: ORDER_STATUS,
      orderList: [],
      allowedStatus: [0, 1, 2, 3, 5],
      dialogVisible: false,
      commentDialogVisible: false,
      orderImg: '',
      order_id: -1,
      order: {},
      submitLoading: false,
      pageSize: 10,
      pageNum: 1,
      totalItemsNum: 999,
      nameDic: { 'book_id': '书籍ID', 'amount': '商品数目', 'bookname': '书籍名称', 'press': '出版社', 'author': '作者', 'price': '价格', 'store_amount': '库存数量', 's_image': '商品图片' }
    }
  },
  created() {
    console.log('this.rights', this.rights)
    this.search = this.$route.query.search || ''
    this.searchOrders(1)
    // for (const key in ORDER_STATUS) {
    //   if (Object.hasOwnProperty.call(ORDER_STATUS, key)) {
    //     const element = ORDER_STATUS[key]
    //     console.log(key, element)
    //   }
    // }
  },
  computed: {
    ...mapGetters([
      'rights'
    ]),
    searchAll() {
      const allowedRights = ['allRights', 'ship']
      return this.rights.some(right => {
        return allowedRights.includes(right.privname)
      }) || false
    }
  },
  methods: {
    searchOrders(pageNum = 1) {
      this.pageNum = Number(pageNum) || 1
      getOrderList({
        searchAll: this.searchAll,
        keyword: this.search || this.$route.query.search,
        status: Number(this.status),
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        // if ($state) $state.loaded()
        backtop()
        console.log('订单搜索结果', res)
        // TODO: 更新订单列表
        this.orderList = res.data.list
        this.totalItemsNum = res.data.total
      }).catch(err => {
        // if ($state) $state.complete()
        console.log('订单搜索出错', err)
        this.orderList = []
        // this.orderList = [{ 'initOrder': { 'order_id': 1, 'user_id': 1, 'order_number': 'jkaasd', 'payment': 100, 'payment_type': 1, 'post_fee': 10, 'update_time': '2021-07-13T02:23:36.000+00:00', 'create_time': '2021-07-13T02:23:25.000+00:00', 'item_amount': 90, 'payment_time': '2021-07-13T02:23:47.000+00:00', 'payment_ddl_time': '2021-07-13T16:27:38.000+00:00', 'end_time': '2021-07-13T02:23:55.000+00:00', 'close_time': '2021-07-13T02:23:57.000+00:00', 'shipping_name': '顺丰', 'shipping_code': '345', 'buyer_message': 'buyerhjh', 'buyer_rate': 0, 'status': 1, 'country': 'CN', 'receiver_state': 'province', 'receiver_city': 'city', 'receiver_district': 'district', 'detail_address': 'address', 'zip_code': '898989', 'phone': '18800122310' }, 'orderItemList': [{ 'book_id': 1, 'amount': 3, 'bookname': '人骨手镯', 'press': '朝华出版社', 'author': null, 'price': 19, 'store_amount': 0, 's_image': 'https://img7.xinhuashudian.com/bookbasepic/C/00176/75054153280918030-fm.jpg?x-oss-process=image/resize,m_mfit,h_160,w_160' }, { 'book_id': 2, 'amount': 5, 'bookname': '老故事新道理(经典珍藏版)', 'press': '北京工业大学出版社', 'author': null, 'price': 40.85, 'store_amount': 0, 's_image': 'https://img2.xinhuashudian.com/bookbasepic/C/00175/75639162960916971-fm.jpg?x-oss-process=image/resize,m_mfit,h_160,w_160' }, { 'book_id': 25, 'amount': 22, 'bookname': '乱世猎人(3)', 'press': '中国对外翻译出版公司', 'author': null, 'price': 20.9, 'store_amount': 0, 's_image': 'https://img8.xinhuashudian.com/bookbasepic/C/00194/75001153340927968-fm.jpg?x-oss-process=image/resize,m_mfit,h_160,w_160' }] }, { 'initOrder': { 'order_id': 2, 'user_id': 1, 'order_number': '12313', 'payment': 100, 'payment_type': 1, 'post_fee': 10, 'update_time': '2021-07-13T02:23:36.000+00:00', 'create_time': '2021-07-13T02:23:25.000+00:00', 'item_amount': 90, 'payment_time': '2021-07-13T02:23:47.000+00:00', 'payment_ddl_time': '2021-07-13T16:24:44.000+00:00', 'end_time': '2021-07-13T02:23:55.000+00:00', 'close_time': '2021-07-13T02:23:57.000+00:00', 'shipping_name': '顺丰', 'shipping_code': '345', 'buyer_message': 'buyerhjh', 'buyer_rate': 0, 'status': 3, 'country': 'CN', 'receiver_state': 'province', 'receiver_city': 'city', 'receiver_district': 'district', 'detail_address': 'address', 'zip_code': '898989', 'phone': '18800122310' }, 'orderItemList': [{ 'book_id': 1, 'amount': 8, 'bookname': '人骨手镯', 'press': '朝华出版社', 'author': null, 'price': 19, 'store_amount': 0, 's_image': 'https://img7.xinhuashudian.com/bookbasepic/C/00176/75054153280918030-fm.jpg?x-oss-process=image/resize,m_mfit,h_160,w_160' }] }, { 'initOrder': { 'order_id': 4, 'user_id': 1, 'order_number': 'ooo', 'payment': 100, 'payment_type': 1, 'post_fee': 10, 'update_time': '2021-07-13T02:23:36.000+00:00', 'create_time': '2021-07-13T02:23:25.000+00:00', 'item_amount': 90, 'payment_time': '2021-07-13T02:23:47.000+00:00', 'payment_ddl_time': '2021-07-13T16:24:55.000+00:00', 'end_time': '2021-07-13T02:23:55.000+00:00', 'close_time': '2021-07-13T02:23:57.000+00:00', 'shipping_name': '顺丰', 'shipping_code': '345', 'buyer_message': 'buyerhjh', 'buyer_rate': 0, 'status': 2, 'country': 'CN', 'receiver_state': 'province', 'receiver_city': 'city', 'receiver_district': 'district', 'detail_address': 'address', 'zip_code': '898989', 'phone': '18800122310' }, 'orderItemList': [{ 'book_id': 42, 'amount': 66, 'bookname': '古国的故事(彩色人文故事)', 'press': '光明日报出版社', 'author': null, 'price': 28.31, 'store_amount': 0, 's_image': 'https://img8.xinhuashudian.com/bookbasepic/C/00038/78014596010819914-fm.jpg?x-oss-process=image/resize,m_mfit,h_160,w_160' }] }, { 'initOrder': { 'order_id': 5, 'user_id': 1, 'order_number': 'jyusd', 'payment': 100, 'payment_type': 1, 'post_fee': 10, 'update_time': '2021-07-12T02:23:36.000+00:00', 'create_time': '2021-07-12T02:23:25.000+00:00', 'item_amount': 90, 'payment_time': '2021-07-12T02:23:47.000+00:00', 'payment_ddl_time': '2021-07-13T16:24:05.000+00:00', 'end_time': '2021-07-12T02:23:55.000+00:00', 'close_time': '2021-07-12T02:23:57.000+00:00', 'shipping_name': '顺丰', 'shipping_code': '345', 'buyer_message': 'buyerhjh', 'buyer_rate': 0, 'status': 3, 'country': 'CN', 'receiver_state': 'province', 'receiver_city': 'city', 'receiver_district': 'district', 'detail_address': 'address', 'zip_code': '898989', 'phone': '18800122310' }, 'orderItemList': [{ 'book_id': 42, 'amount': 22, 'bookname': '古国的故事(彩色人文故事)', 'press': '光明日报出版社', 'author': null, 'price': 28.31, 'store_amount': 0, 's_image': 'https://img8.xinhuashudian.com/bookbasepic/C/00038/78014596010819914-fm.jpg?x-oss-process=image/resize,m_mfit,h_160,w_160' }] }, { 'initOrder': { 'order_id': 6, 'user_id': 1, 'order_number': '12313', 'payment': 100, 'payment_type': 1, 'post_fee': 10, 'update_time': '2021-07-13T02:23:36.000+00:00', 'create_time': '2021-07-13T02:23:25.000+00:00', 'item_amount': 90, 'payment_time': '2021-07-13T02:23:47.000+00:00', 'payment_ddl_time': '2021-07-06T16:28:10.000+00:00', 'end_time': '2021-07-13T02:23:55.000+00:00', 'close_time': '2021-07-13T02:23:57.000+00:00', 'shipping_name': '顺丰', 'shipping_code': '345', 'buyer_message': 'buyerhjh', 'buyer_rate': 0, 'status': 0, 'country': 'CN', 'receiver_state': 'province', 'receiver_city': 'city', 'receiver_district': 'district', 'detail_address': 'address', 'zip_code': '898989', 'phone': '18800122310' }, 'orderItemList': [{ 'book_id': 3, 'amount': 6, 'bookname': '一刀能割出多少爱', 'press': '光明日报出版社', 'author': null, 'price': 19, 'store_amount': 0, 's_image': 'https://img4.xinhuashudian.com/bookbasepic/C/00180/78020620200920510-fm.jpg?x-oss-process=image/resize,m_mfit,h_160,w_160' }] }, { 'initOrder': { 'order_id': 7, 'user_id': 1, 'order_number': 'DxgqfRoK', 'payment': 47.5, 'payment_type': 0, 'post_fee': 0.4087236948357842, 'update_time': '2021-07-14T04:02:50.000+00:00', 'create_time': '2021-07-14T04:02:50.000+00:00', 'item_amount': 2, 'payment_time': null, 'payment_ddl_time': '2021-07-14T04:07:50.000+00:00', 'end_time': null, 'close_time': null, 'shipping_name': null, 'shipping_code': null, 'buyer_message': '请用顺丰发货', 'buyer_rate': 0, 'status': 0, 'country': null, 'receiver_state': null, 'receiver_city': null, 'receiver_district': null, 'detail_address': null, 'zip_code': null, 'phone': null }, 'orderItemList': [] }, { 'initOrder': { 'order_id': 8, 'user_id': 1, 'order_number': 'aWXslzha', 'payment': 47.5, 'payment_type': 0, 'post_fee': 8.160488562279202, 'update_time': '2021-07-14T04:04:15.000+00:00', 'create_time': '2021-07-14T04:04:15.000+00:00', 'item_amount': 2, 'payment_time': null, 'payment_ddl_time': '2021-07-14T04:09:15.000+00:00', 'end_time': null, 'close_time': null, 'shipping_name': null, 'shipping_code': null, 'buyer_message': '请用顺丰发货', 'buyer_rate': 0, 'status': 0, 'country': null, 'receiver_state': null, 'receiver_city': null, 'receiver_district': null, 'detail_address': null, 'zip_code': null, 'phone': null }, 'orderItemList': [{ 'book_id': 6, 'amount': 5, 'bookname': '锦年花开', 'press': '北方妇女儿童出版社', 'author': null, 'price': 26.6, 'store_amount': 9, 's_image': 'https://img5.xinhuashudian.com/bookbasepic/C/00873/97875385411821627947-fm.jpg?x-oss-process=image/resize,m_mfit,h_160,w_160' }, { 'book_id': 8, 'amount': 1, 'bookname': '异龙', 'press': '新世界出版社', 'author': null, 'price': 20.9, 'store_amount': 0, 's_image': 'https://img2.xinhuashudian.com/bookbasepic/C/00874/97875104057161628466-fm.jpg?x-oss-process=image/resize,m_mfit,h_160,w_160' }] }, { 'initOrder': { 'order_id': 9, 'user_id': 1, 'order_number': 'Wm1ELXnE', 'payment': 47.5, 'payment_type': 0, 'post_fee': 12.257945645298793, 'update_time': '2021-07-14T04:06:09.000+00:00', 'create_time': '2021-07-14T04:06:09.000+00:00', 'item_amount': 2, 'payment_time': null, 'payment_ddl_time': '2021-07-14T04:11:09.000+00:00', 'end_time': null, 'close_time': null, 'shipping_name': null, 'shipping_code': null, 'buyer_message': '请用顺丰发货', 'buyer_rate': 0, 'status': 0, 'country': null, 'receiver_state': null, 'receiver_city': null, 'receiver_district': null, 'detail_address': null, 'zip_code': null, 'phone': null }, 'orderItemList': [{ 'book_id': 6, 'amount': 5, 'bookname': '锦年花开', 'press': '北方妇女儿童出版社', 'author': null, 'price': 26.6, 'store_amount': 9, 's_image': 'https://img5.xinhuashudian.com/bookbasepic/C/00873/97875385411821627947-fm.jpg?x-oss-process=image/resize,m_mfit,h_160,w_160' }, { 'book_id': 8, 'amount': 1, 'bookname': '异龙', 'press': '新世界出版社', 'author': null, 'price': 20.9, 'store_amount': 0, 's_image': 'https://img2.xinhuashudian.com/bookbasepic/C/00874/97875104057161628466-fm.jpg?x-oss-process=image/resize,m_mfit,h_160,w_160' }] }, { 'initOrder': { 'order_id': 10, 'user_id': 1, 'order_number': '7S3qxdrJ', 'payment': 47.5, 'payment_type': 0, 'post_fee': 7.966305560579001, 'update_time': '2021-07-14T04:09:44.000+00:00', 'create_time': '2021-07-14T04:09:44.000+00:00', 'item_amount': 2, 'payment_time': null, 'payment_ddl_time': '2021-07-14T04:14:44.000+00:00', 'end_time': null, 'close_time': null, 'shipping_name': null, 'shipping_code': null, 'buyer_message': '请用顺丰发货', 'buyer_rate': 0, 'status': 0, 'country': '国家', 'receiver_state': '省份', 'receiver_city': '城市', 'receiver_district': '区/县', 'detail_address': '详细地址', 'zip_code': '100086', 'phone': '3' }, 'orderItemList': [{ 'book_id': 6, 'amount': 5, 'bookname': '锦年花开', 'press': '北方妇女儿童出版社', 'author': null, 'price': 26.6, 'store_amount': 9, 's_image': 'https://img5.xinhuashudian.com/bookbasepic/C/00873/97875385411821627947-fm.jpg?x-oss-process=image/resize,m_mfit,h_160,w_160' }, { 'book_id': 8, 'amount': 1, 'bookname': '异龙', 'press': '新世界出版社', 'author': null, 'price': 20.9, 'store_amount': 0, 's_image': 'https://img2.xinhuashudian.com/bookbasepic/C/00874/97875104057161628466-fm.jpg?x-oss-process=image/resize,m_mfit,h_160,w_160' }] }]
      })
    },
    handleSelect(index) {
      this.status = String(index)
      this.searchOrders()
    },
    load($state) {
      console.log('test')
      this.searchOrders()
    },
    returnStatus(index) {
      for (const key in ORDER_STATUS) {
        if (Object.hasOwnProperty.call(ORDER_STATUS, key)) {
          const element = ORDER_STATUS[key]
          if (element.index === Number(index)) {
            return element.label || '已完成'
          }
        }
      }
      return '已完成'
    },
    returnShippingName(shipping_name) {
      if (String(shipping_name).slice(-2).indexOf('快递') >= 0) {
        return String(shipping_name).replace('快递', '')
      } else return shipping_name || '京东'
    },
    handleAction(statusIndex) {
      switch (statusIndex) {
        case this.allowedStatus[0]: {
          console.log('action1', statusIndex, '支付')
          break
        }
        case this.allowedStatus[1]: {
          console.log('action2', statusIndex, '评价')
          break
        }
        default: {
          console.log('error statusIndex')
        }
      }
    },
    handleClose() {
      console.log('dialog关闭')
      this.dialogVisible = false
      this.searchOrders()
    },
    commentHandleClose() {
      console.log('评论dialog关闭')
      this.submitLoading = false
      this.commentDialogVisible = false
      this.searchOrders()
    },
    submitComment() {
      const commentForm = { ...this.$refs.OrderComment.commentForm }
      // commentForm.commentAndRatesList = { ...commentForm.commentAndRatesList }
      console.log('commentForm', commentForm)
      for (let index = 0; index < commentForm.commentAndRatesList.length; index++) {
        const bookComment = commentForm.commentAndRatesList[index]
        if (!bookComment.comment) {
          this.$message.error('请填写买家评价')
          return
        } else if (bookComment.length < 15 || bookComment.length > 60) {
          this.$message.error('字数必须大于15小于60')
          return
        }
      }
      this.submitLoading = true
      console.log('this.$refs.OrderComment', this.$refs.OrderComment)
      commentOrder({ ...commentForm })
        .then(res => {
          this.searchOrders()
          console.log('订单评价', res)
          this.submitLoading = false
          this.commentDialogVisible = false
        })
        .catch(err => console.log('订单评价失败', err))
    },
    cancelOrder(order_id) {
      console.log('取消订单')
      cancelOrder({
        order_id: Number(order_id)
      })
        .then(res => {
          console.log('取消订单', res)
          this.searchOrders()
        })
        .catch(err => console.log('取消订单失败', err))
    },
    goToPay(order_id) {
      console.log('前往支付 订单' + order_id)
      this.orderImg = '/api/payment/createQrCode/' + order_id
      this.dialogVisible = true
      // pay()
      //   .then(res => console.log('支付订单', res))
      //   .catch(err => console.log('支付订单失败', err))
    },
    goToShip(order_id) {
      ship({
        order_id: Number(order_id),
        shipping_name: '',
        shipping_code: order_id + '-' + Math.random * 100
      })
        .then(res => {
          console.log('确认发货', res)
          this.searchOrders()
        })
        .catch(err => console.log('确认发货失败', err))
    },
    confirmReceipt(order_id) {
      console.log('确认收货')
      confirmReceipt({
        order_id: Number(order_id)
      })
        .then(res => {
          console.log('确认收货', res)
          this.searchOrders()
        })
        .catch(err => console.log('确认收货失败', err))
    },
    goToComment(orderDetails) {
      console.log('前往评价')
      // TODO: 前往评论
      this.order = { ...orderDetails }
      this.commentDialogVisible = true
      console.log('orderDetails', this.order)
    },
    returnName(originName) {
      return this.nameDic[originName]
    }
  }
}
</script>

<style lang="scss" scoped>
.order-container {
  background-color: #f9f9f9;

  .order-item-box {
    margin: 10px;
    background-color: #fff;
    .order-item-header {
      font-size: 12px;
      color:#2c3e50;
    }

    .order-item-body {
      align-items: center;

      .order-item-price {
        font-weight: bold;
        font-size: 18px;
        color: #f63515;
      }

      .order-item-amount {
        margin-right: 0;
        font-weight: bold;
        font-size: 20px;
        color: #f63515;
      }
    }
  }
}
</style>
