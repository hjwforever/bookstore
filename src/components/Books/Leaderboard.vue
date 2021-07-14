<template>
  <el-card>
    <img src="https://img4.xinhuashudian.com/images/2021/06/25/b49763d3-228e-4d65-b438-963c3d154136.png?x-oss-process=image/format,webp" referrerPolicy="no-referrer">
    <!-- <img src="https://cdn.jsdelivr.net/gh/hjwforever/images@main/img/2021/07/12/Leaderboard.webp" referrerPolicy="no-referrer"> -->
    <el-collapse v-model="activeNames" accordion @change="handleChange">
      <div v-for="(book, index) in books" :key="index">
        <el-row>
          <el-col :span="2" :style="index < 3 ? {color: 'red',fontWeight: 'bold'}: {}"><span>{{ index+1 }}</span></el-col>
          <el-col :span="22">
            <el-collapse-item v-if="index!=activeNames[0]" :title="shorterName(book.bookname)" :name="index" @mouseenter.native="handleMouseEnter(index)">
              {{ shorterName(book.bookname) }}
            </el-collapse-item>
            <div v-else class="book-item" @click="goToDetails(book)">
              <el-row type="flex" justify="space-around" style="align-items: center;">
                <el-col>
                  <img :width="100" :src="book.s_image" :alt="book.bookname" referrerPolicy="no-referrer">
                  <!-- <img :v-lazy="book.img" :alt="book.bookname"> -->
                </el-col>
                <el-col>
                  <el-row>
                    <el-col>
                      <span class="" style="height:20px;width:100px;">{{ shorterName(book.bookname) }}</span>
                    </el-col>
                    <el-col>
                      <span class="book-author" style="height:20px;width:100px;">{{ shorterName(book.author) }}</span>
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
          </el-col>
        </el-row>
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
      this.$router.push({ name: 'Items', params: { bookId: item.bookId, book: item }})
    },
    shorterName(name) {
      return name.length < 14 ? name : name.slice(0, 10) + '...'
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
