<template>
  <el-card>
    <el-row slot="header" type="flex" justify="space-between">
      <span class="content-header">好书推荐</span>
      <el-button type="text" @click="changeRecommed"><svg-icon icon-class="change" /> 换一批</el-button>
    </el-row>
    <el-row>
      <el-col v-for="(book,index) in recommendBooks" :key="index" :push="1" :span="4" :xs="12" :sm="12" :lg="6">
        <BookItem :book="book" />
        <!-- <el-badge :value="book.status || '抢购中'">
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
        </div> -->
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import BookItem from '../Books/BookItem'
import { getRecommend } from '@/api/item'

export default {
  name: 'RecommendBooks',
  components: {
    BookItem
  },
  props: {
    bookId: {
      type: Number,
      default: 0
    },
    recommendBooks: {
      type: Array,
      default: () => [{
        'book_id': 56,
        'cate_id': 8,
        'bookname': '西学/大众人文经典读本',
        'press': '光明日报出版社',
        'author': '贾可卿等编',
        'publish_date': '2004-02-29T16:00:00.000+00:00',
        'isbn': '9787801458506',
        'price': 45.6, 'pages': 479,
        'deal_amount': 0,
        'look_amount': 0,
        'store_amount': 0,
        's_image': 'https://img1.xinhuashudian.com/images/2018/08/08/d401a4a4-7d5e-45c9-b22e-e4c793a3f853.png',
        'b_image': 'https://img1.xinhuashudian.com/images/2018/08/08/d401a4a4-7d5e-45c9-b22e-e4c793a3f853.png',
        'description': '大众人文经典读本。国粹、西学、大师，融汇古今，贯通中西，213篇传世华章。一个博士群体历经3年倾情奉献，38位大学校长联合推荐。有志青年的思想灯塔，荟萃经典的人文航母。本书是一本关于西方文化的普及读本，编选西方思想大师在政治、经济、哲学、伦理、艺术、宗教等各个方面的代表著作，比较全面地反映了西方文化的主要特色和发展脉络。同时，对所选文章进行评析，供读者思考和赏鉴。',
        'rate': 0,
        'rate_num': 0 }]
    },
    colors: {
      type: Array,
      default: () => ['#99A9BF', '#F7BA2A', '#FF9900']
    }
  },
  data() {
    return {
      title: '书籍详情'
    }
  },
  created() {

  },
  methods: {
    changeRecommed() {
      console.log('换一批书籍推荐')
      getRecommend({
        recommendNum: 4
      }).then(res => {
        console.log('推荐结果', res)
        this.$emit('update:recommend-books', res.data)
      }).catch(err => {
        console.log('获取书籍推荐失败', err)
      })
    },
    goToDetails(item) {
      console.log('查看书籍', { ...item })
      this.$router.push({ name: 'Items', params: { bookId: item.bookId, book: item }})
    },
    returnBook(book) {
      const _book = book
      console.log('book1', book)
      _book.s_image = _book.s_image.split('?')[0]
      _book.b_image = _book.b_image.split('?')[0]
      console.log('book2', _book)
      return _book
    }
  }
}
</script>

<style lang="scss" scoped>
.content-header {
  // text-align: center;
  font-weight: bold;
  font-size: 18px;
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
