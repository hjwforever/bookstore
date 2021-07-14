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

    <infinite-loading class="infinite-list" style="overflow:auto" spinner="waveDots" @infinite="load">
      <div slot="no-more">没有更多订单了...</div>
      <div slot="no-results">无结果...</div>
      <el-card v-for="(item, index) in orderList" :key="index" class="order-item-box" shadow="hover" @click="goTo(item.order_id)">
        <el-row slot="header" type="flex" justify="space-between" class="order-item-header">
          <span>订单时间：{{ item.update_time }}</span>
          <span>订单状态：{{ returnStatus(item.status) }}</span>
        </el-row>
        <el-row type="flex" justify="space-between" class="order-item-body">
          <el-col>
            <el-row>
              <el-col>
                <img :v-lazy="item.s_image" :alt="item.bookname">
              </el-col>
              <el-col>
                <el-row>
                  <el-col>
                    {{ item.bookname }}
                  </el-col>
                  <el-col>
                    订单号: {{ item.order_id }}
                  </el-col>
                  <el-col class="order-item-price">
                    ￥ {{ item.payment }}
                  </el-col>
                  <el-col>
                    {{ item.shipping_name }}快递
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
          <el-row type="flex" justify="end" class="order-item-amount">
            <span> {{ 'X' + item.item_amount }}</span>
          </el-row>
        </el-row>
      </el-card>
    </infinite-loading>
  </div>
</template>

<script>
import { getOrderList, ORDER_STATUS } from '@/api/order'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'Order',
  components: {
    InfiniteLoading
  },
  data() {
    return {
      title: '订单管理',
      search: '',
      searchAll: false,
      status: '-1',
      ORDER_STATUS: ORDER_STATUS,
      count: 0,
      orderList: []
    }
  },
  created() {
    // this.searchOrders()
    for (const key in ORDER_STATUS) {
      if (Object.hasOwnProperty.call(ORDER_STATUS, key)) {
        const element = ORDER_STATUS[key]
        console.log(key, element)
      }
    }
  },
  methods: {
    searchOrders($state) {
      getOrderList({
        searchAll: this.searchAll,
        keyword: this.search,
        status: Number(this.status)
      }).then(res => {
        if ($state) $state.loaded()
        console.log('订单搜索结果', res)
        // TODO: 更新订单列表
        // this.orderList = res.data
      }).catch(err => {
        if ($state) $state.complete()
        console.log('订单搜索出错', err)
        this.orderList = [
          {
            'order_id': 1,
            'user_id': 1,
            'order_number': 'jkaasd',
            'payment': 100.0,
            'payment_type': 1,
            'post_fee': 10.0,
            'update_time': '2021-07-13T02:23:36.000+00:00',
            'create_time': '2021-07-13T02:23:25.000+00:00',
            'item_amount': 90,
            'payment_time': '2021-07-13',
            'end_time': '2021-07-13',
            'close_time': '2021-07-13',
            'shipping_name': '顺丰',
            'shipping_code': '345',
            'buyer_message': 'buyerhjh',
            'buyer_rate': 0,
            'status': 1,
            'country': 'CN',
            'receiver_state': 'province',
            'receiver_city': 'city',
            'receiver_district': 'district',
            'detail_address': 'address',
            'zip_code': '898989',
            'phone': '18800122310'
          },
          {
            'order_id': 2,
            'user_id': 1,
            'order_number': '12313',
            'payment': 100.0,
            'payment_type': 1,
            'post_fee': 10.0,
            'update_time': '2021-07-13T02:23:36.000+00:00',
            'create_time': '2021-07-13T02:23:25.000+00:00',
            'item_amount': 90,
            'payment_time': '2021-07-13',
            'end_time': '2021-07-13',
            'close_time': '2021-07-13',
            'shipping_name': '顺丰',
            'shipping_code': '345',
            'buyer_message': 'buyerhjh',
            'buyer_rate': 0,
            'status': 1,
            'country': 'CN',
            'receiver_state': 'province',
            'receiver_city': 'city',
            'receiver_district': 'district',
            'detail_address': 'address',
            'zip_code': '898989',
            'phone': '18800122310'
          },
          {
            'order_id': 4,
            'user_id': 1,
            'order_number': 'ooo',
            'payment': 100.0,
            'payment_type': 1,
            'post_fee': 10.0,
            'update_time': '2021-07-13T02:23:36.000+00:00',
            'create_time': '2021-07-13T02:23:25.000+00:00',
            'item_amount': 90,
            'payment_time': '2021-07-13',
            'end_time': '2021-07-13',
            'close_time': '2021-07-13',
            'shipping_name': '顺丰',
            'shipping_code': '345',
            'buyer_message': 'buyerhjh',
            'buyer_rate': 0,
            'status': 2,
            'country': 'CN',
            'receiver_state': 'province',
            'receiver_city': 'city',
            'receiver_district': 'district',
            'detail_address': 'address',
            'zip_code': '898989',
            'phone': '18800122310'
          },
          {
            'order_id': 5,
            'user_id': 1,
            'order_number': 'jyusd',
            'payment': 100.0,
            'payment_type': 1,
            'post_fee': 10.0,
            'update_time': '2021-07-13T02:23:36.000+00:00',
            'create_time': '2021-07-13T02:23:25.000+00:00',
            'item_amount': 90,
            'payment_time': '2021-07-13',
            'end_time': '2021-07-13',
            'close_time': '2021-07-13',
            'shipping_name': '顺丰',
            'shipping_code': '345',
            'buyer_message': 'buyerhjh',
            'buyer_rate': 0,
            'status': 3,
            'country': 'CN',
            'receiver_state': 'province',
            'receiver_city': 'city',
            'receiver_district': 'district',
            'detail_address': 'address',
            'zip_code': '898989',
            'phone': '18800122310'
          }
        ]
      })
    },
    handleSelect(index) {
      this.status = String(index)
      this.searchOrders()
    },
    load($state) {
      console.log('test')
      this.searchOrders($state)
    },
    returnStatus(index) {
      for (const key in ORDER_STATUS) {
        if (Object.hasOwnProperty.call(ORDER_STATUS, key)) {
          const element = ORDER_STATUS[key]
          if (element.index === Number(index)) {
            return element.label || '未知'
          }
        }
      }
      return '未知'
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
      }

      .order-item-amount {
        margin-right: 0;
        font-weight: bold;
        font-size: 20px;
      }
    }
  }
}
</style>
