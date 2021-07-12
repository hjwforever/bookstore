<template>
  <el-card class="books">
    <template slot="header">
      <slot name="header" />
      <!-- <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"> -->
    </template>
    <el-row>
      <el-col :span="hasLeaderboard ? 18 : 24">
        <el-row :gutter="1">
          <el-col v-for="(book, index) in books" :key="index" :span="4" :xs="12" :sm="12" :lg="6">
            <!-- <div class="card-item" style="text-align: center;"> -->
            <div class="card-item">
              <!-- <el-card :body-style="{ textAlign: center,paddingLeft: '30px'}" shadow="hover"> -->
              <el-card :body-style="{ textAlign: 'center'}" shadow="hover">
                <el-badge :value="book.status || '抢购中'">
                  <img :src="book.img" alt="">
                </el-badge>
                <div class="book-detail">
                  <el-button type="text" class="button" @click="goToDetails(book)">{{ book.title }}</el-button>
                  <br><span class="book-author">{{ book.author }}</span><br>
                  <el-rate
                    :value="Number(book.rate)"
                    disabled
                    show-score
                    :colors="colors"
                  />
                  <div class="clearfix bottom book-price">
                    ￥ {{ book.price }}
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col v-if="hasLeaderboard" :span="6">
        <Leaderboard :books="books" />
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import Leaderboard from './Leaderboard.vue'

export default {
  name: 'Books',
  components: {
    Leaderboard
  },
  props: {
    books: {
      type: Array,
      required: true,
      default: () => [{
        'bookId': 1,
        'title': '书籍名称1',
        'author': 'bookstore',
        'img': '//z3.ax1x.com/2021/04/11/cwKLLj.png?imageView2/1/w/80/h/80',
        'description': 1,
        'price': 4,
        'rate': 3.4,
        'status': '已售罄'
      }]
    },
    hasLeaderboard: {
      type: Boolean,
      default: false
    },
    colors: {
      type: Array,
      default: () => ['#99A9BF', '#F7BA2A', '#FF9900']
    }
  },
  data() {
    return {
    }
  },
  methods: {
    goToDetails(item) {
      console.log('查看书籍', { ...item })
      // TODO: 跳转到书籍详情
      // this.$router.push({ path: `/items/${Number.parseInt(item.bookId)}` })

      this.$router.push({ name: 'Items', params: { bookId: item.bookId, book: item }})
      // this.$router.push({ name: 'Items', params: { book: item }})
    }
  }
}
</script>

<style lang="scss" scoped>
.books {
  background: #f0f3ef;
}

.card-item {
  z-index: 99;
}

.book-detail {
  position: relative;
  left: 0;
}

.book-author {
  font-size: 14px;
  color:#666666;
  line-height:18px;

  font-weight:400;
  text-decoration:none solid rgb(102, 102, 102);
}

.book-price {
  font-size: 14px;
  color:#d10000;
  line-height:14px;
  font-weight:400;
  text-decoration:none solid rgb(209, 0, 0);
}

.bottom {
margin-top: 13px;
line-height: 12px;
}

.clearfix:before,
.clearfix:after {
  display: table;
   content: "";
}
.clearfix:after {
  clear: both;
}
</style>
