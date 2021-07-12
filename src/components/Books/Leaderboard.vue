<template>
  <el-card>
    <img src="https://cdn.jsdelivr.net/gh/hjwforever/images@main/img/2021/07/12/Leaderboard.webp">
    <el-collapse v-model="activeNames" accordion @change="handleChange">
      <div v-for="(book, index) in books" :key="index">
        <el-collapse-item v-if="index!=activeNames[0]" :title="book.title" :name="index" @mouseenter.native="handleMouseEnter(index)">
          {{ book.title }}
        </el-collapse-item>
        <div v-else class="book-item" @click="goToDetails(book)">
          <el-row type="flex" justify="space-around" style="align-items: center;">
            <el-col>
              <el-avatar shape="square" :size="100" fit="fit" :src="book.img" :alt="book.title" />
              <!-- <img :src="book.img" :alt="book.title"> -->
            </el-col>
            <el-col>
              <el-row>
                <el-col>
                  <span class="" style="height:20px;width:100px;">{{ book.title }}</span>
                </el-col>
                <el-col>
                  <span class="book-author" style="height:20px;width:100px;">{{ book.author }}</span>
                </el-col>
                <el-col>
                  <el-rate
                    :value="Number(book.rate)"
                    disabled
                    show-score
                    :colors="colors"
                  />
                  <br>
                </el-col>
                <el-col>
                  <span class="book-price" style="height:20px;width:100px;">￥ {{ book.price }}</span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-collapse>
  </el-card>
</template>

<script>
export default {
  name: 'Leaderboard',
  props: {
    books: {
      type: Array,
      required: true,
      default: () => [{
        'title': '书籍名称1',
        'author': 'bookstore',
        'img': '//z3.ax1x.com/2021/04/11/cwKLLj.png?imageView2/1/w/80/h/80',
        'description': 1,
        'price': 4,
        'rate': 3.4,
        'status': '已售罄'
      }]
    },
    colors: {
      type: Array,
      default: () => ['#99A9BF', '#F7BA2A', '#FF9900']
    }
  },
  data() {
    return {
      activeNames: ['0']
    }
  },
  methods: {
    handleChange(val) {
      // console.log(val)
    },
    handleMouseEnter(index) {
      this.activeNames = [index]
    },
    goToDetails(item) {
      console.log('查看书籍', { ...item })
      // TODO: 跳转到书籍详情
    }
  }
}
</script>

<style lang="scss" scoped>
.book-item {
  cursor: pointer;
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
</style>
