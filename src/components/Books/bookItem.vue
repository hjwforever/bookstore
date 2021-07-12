<template>
  <el-row>
    <el-col :span="14">
      <img :src="book.img" :alt="book.description">
    </el-col>
    <el-col :span="14">
      <span>价格: {{ book.price }}</span>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Book',
  props: {
    bookId: {
      type: Number,
      default: 0
    },
    book: {
      type: Object,
      default: () => {
        return {
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
    }
  },
  data() {
    return {
      title: '书籍详情'
    }
  },
  created() {

  }
}
</script>

<style lang="scss" scoped>
</style>
