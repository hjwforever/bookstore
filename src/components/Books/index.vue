<template>
  <el-card class="books">
    <template slot="header">
      <slot name="header" />
      <!-- <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"> -->
    </template>
    <el-row>
      <el-col :span="hasLeaderboard ? 18 : 24" :xs="24">
        <el-row :gutter="1">
          <el-col v-for="(book, index) in books" :key="index" :span="4" :xs="12" :sm="12" :lg="6">
            <!-- <div class="card-item" style="text-align: center;"> -->
            <div class="card-item">
              <!-- <el-card :body-style="{ textAlign: center,paddingLeft: '30px'}" shadow="hover"> -->
              <el-card :body-style="{ textAlign: 'center'}" shadow="hover">
                <BookItem :book="book" />
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col v-if="hasLeaderboard" :span="6" :xs="24">
        <Leaderboard :books="books" />
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import Leaderboard from './Leaderboard.vue'
import BookItem from './BookItem'

export default {
  name: 'Books',
  components: {
    Leaderboard, BookItem
  },
  props: {
    books: {
      type: Array,
      required: true,
      default: () => [{
        'book_id': 1,
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
    geneRate(item) {
      if (Number(item.rate) > 0) {
        return item
      } else {
        const _item = item
        _item.rate = (3 + Math.random() * 2).toFixed(1)
        return _item
      }
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
</style>
