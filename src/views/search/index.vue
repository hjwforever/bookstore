<template>
  <div class="search-main">
    <el-input v-model="search" placeholder="请输入搜索内容" class="search-input" @keyup.enter.native="searchBooks">
      <el-button slot="append" type="primary" icon="el-icon-search" style="color: blue" @click.native="searchBooks" />
    </el-input>
    <el-row type="flex" :gutter="2" style="flex-wrap: wrap;" class="search-list">
      <el-col v-for="(book,index) in books" :key="book.book_id" :span="6">
        <el-card shadow="hover">
          <BookItem :book="geneRate(book)" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { search } from '@/api/item'
import BookItem from '@/components/Books/BookItem'

export default {
  name: 'Search',
  components: {
    BookItem
  },
  data() {
    const mockBooks = []
    for (let index = 0; index < 18; index++) {
      mockBooks.push({
        'book_id': 486,
        'cate_id': 19,
        'bookname': '影视创业学',
        'press': '中国广播电视出版社',
        'author': '吴延熊 等 编',
        'publish_date': '2020-08-31T16:00:00.000+00:00',
        'isbn': '9787504383884',
        'price': 88.0,
        'pages': 404,
        'deal_amount': 0,
        'look_amount': 0,
        'store_amount': 0,
        's_image': 'https://img2.xinhuashudian.com/sc/4773/1202334773_0_1_original_800x800.jpg?x-oss-process=image/resize,m_mfit,h_160,w_160',
        'b_image': 'https://img2.xinhuashudian.com/sc/4773/1202334773_0_1_original_800x800.jpg?x-oss-process=image/resize,m_mfit,h_375,w_375',
        'description': '《影视创业学》遵循创业学的通用流程和共性要点，按照创业理解——创业准备——创业实施——创业管理的逻辑顺序搭建内容架构。以创业为目标，把影视作为重要的教学内容和手段，实行“三实三段”全程训练的创业教育模式，通过课堂的实例分析——创客训练营的实境训练——创业大赛的实战检验三个阶段培养，让学生能够萌发创业机动，有清晰的创业思路和基本的创业能力。本书前10章，都以名言警句点睛，以案例导读揭示问题引发兴趣，以创业标杆、创业警示、知识拓展与引用案例互相印证，从影视作品分析中挖掘行业特点，并将理论转化为创客训练中的实践',
        'rate': 0.0,
        'rate_num': 0
      })
    }
    return {
      title: '搜索页面',
      search: '',
      books: [],
      mockBooks: mockBooks
    }
  },
  created() {
    console.log('route params', this.$route.query)
    console.log('route params categoryId', this.$route.query.categoryId)
    this.searchBooks()
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
    },
    searchBooks() {
      console.log('搜索内容', this.search)
      search({
        keyword: this.search,
        cate_id: -1,
        lowPrice: 0,
        // highPrice: 999999,
        pageNum: 1,
        pageSize: 72
      }).then(res => {
        console.log(res)
      }).catch(error => {
        console.log(error)
        this.books = this.mockBooks
      }).finally(() => {
        this.search = ''
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.search-main {
  background: #f7f7f7;
}

.search-input {
  margin: 20px 20px 0;
}

.search-list {
  margin: 10px 20px 0;
  padding-left: 20px;
}
</style>
