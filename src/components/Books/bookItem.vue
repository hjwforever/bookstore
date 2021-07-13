<template>
  <div class="book-item" :style="bstyle">
    <el-badge v-if="hasBadge" :value="book.status || randomBookTag(book.book_id)">
      <img :src="book.s_image" :alt="book.bookname" referrerPolicy="no-referrer" class="book-img">
    </el-badge>
    <img v-else :src="book.s_image" :alt="book.bookname" referrerPolicy="no-referrer" class="book-img">
    <div class="book-detail">
      <el-button type="text" class="button" @click="goToDetails">{{ returnBookName(book.bookname) }}</el-button>
      <br><span class="book-author">{{ returnBookName(book.author) }}</span><br>
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
  </div>
</template>

<script>
export default {
  name: 'BookItem',
  props: {
    bookId: {
      type: Number,
      default: 0
    },
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
    },
    colors: {
      type: Array,
      default: () => ['#99A9BF', '#F7BA2A', '#FF9900']
    },
    bookStatus: {
      type: Array,
      default: () => ['已售罄', '抢购中', '火爆新品', '超值促销']
    },
    bstyle: {
      type: String,
      default: ''
    },
    hasBadge: {
      type: Boolean,
      default: false
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
    goToDetails() {
      console.log('查看书籍', { ...this.book })
      // this.$router.push({ path: `/items/${Number.parseInt(item.bookId)}` })
      this.$router.push({ name: 'Items', params: { bookId: this.book.book_id, book: this.book }})
    },
    returnBookName(name) {
      return name.length < 14 ? name : name.slice(0, 10) + '...'
    },
    geneRate(item) {
      if (Number(item.rate) > 0) {
        return item
      } else {
        const _item = item
        _item.rate = (3 + Math.random() * 2).toFixed(1)
        return _item
      }
    },
    randomBookTag(book_id) {
      return this.bookStatus[(book_id + Math.round(Math.random() * 10)) % 4]
    }
  }
}
</script>

<style lang="scss" scoped>
.book-item {
  max-width: 225px;
  max-height: 390px;
}

.book-img {
  width: 165px;
  height: 240px;
  // max-width: 165px;
  // max-height: 240px;
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
