<template>
  <div>
    <el-card>
      <!-- <el-col :span="14">
      <img :v-lazy="book.img" :alt="book.description">
    </el-col>
    <el-col :span="10">
      <span>价格: {{ book.price }}</span>
    </el-col> -->
      <BookItem :book="book" />
    </el-card>
  </div>
</template>

<script>
import BookItem from './BookItem'
import { getBookInfo } from '@/api/book'

export default {
  name: 'Book',
  components: {
    BookItem
  },
  props: {
    bookId: {
      type: Number,
      default: 0
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
        'bookId': 0,
        'title': '书籍名称1',
        'author': 'bookstore',
        'img': '//z3.ax1x.com/2021/04/11/cwKLLj.png?imageView2/1/w/80/h/80',
        'description': 1,
        'price': 0,
        'rate': 3.4,
        'status': '已售罄'
      }
    }
  },
  created() {
    getBookInfo(this.bookId).then(res => {
      console.log('书籍详情', res)
      this.book = this.geneRate(res.data)
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
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
