<template>
  <div class="search-main">
    <el-row style="position: absolute; z-index: 999; width:100%; max-height: 250px; top: 0;">
      <el-col :xs="24" :sm="18" :md="12" :lg="6" :xl="6" style="margin-top: 19px">
        <Category foldable :categories="categories" style="max-height: 250px;" />
      </el-col>
      <el-col :xs="24" :sm="18" :md="12" :lg="12" :xl="12">
        <el-input v-model="search" placeholder="请输入搜索内容" class="search-input" @keyup.enter.native="searchBooks">
          <el-button slot="append" type="primary" icon="el-icon-search" style="color: blue" @click.native="searchBooks" />
        </el-input>
      </el-col>
    </el-row>
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb> -->
    <!-- <el-row type="flex">
      <el-col>
        <el-switch v-model="topSearchVisible" />
      </el-col>
      <el-col><el-pagination
        v-if="topSearchVisible"
        background
        layout="total, prev, pager, next, jumper"
        :page-size="pageSize"
        :current-page="pageNum"
        :pager-count="9"
        :total="totalItemsNum"
        @prev-click="searchBooks"
        @current-change="searchBooks"
        @next-click="searchBooks"
      /></el-col>
    </el-row> -->
    <el-row style="position: absolute; margin-top: -25px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <el-dropdown>
            <span class="el-dropdown-link">
              下拉菜单<i class="el-icon-arrow-right el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-row style="max-width: 250px">
                <el-col v-for="(item,index) in 14" :key="index" :span="6">
                  <el-button type="text" size="mini" class="category-item" :style="index==1?'color: red':''">Test</el-button>
                </el-col>
              </el-row>
              <!-- <el-dropdown-item divided style="color: white">
                <el-button type="text" style="color: white">蚵仔煎1</el-button>
                <el-button type="text">蚵仔煎2</el-button>
                <el-button type="text">蚵仔煎3</el-button>
              </el-dropdown-item> -->
            </el-dropdown-menu>
          </el-dropdown>
        </el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row type="flex" :gutter="20" style="flex-wrap: wrap; margin-top: 100px" class="search-list">
      <el-col v-for="(book,index) in books" :key="book.book_id" :span="4" :xs="6" :sm="4" :xl="3" class="book-item">
        <el-card shadow="hover">
          <BookItem :book="geneRate(book)" bstyle="height: 315px;width: 185px;" />
        </el-card>
      </el-col>
    </el-row>
    <el-row type="flex" justify="end">
      <el-pagination
        v-if="topSearchVisible"
        background
        layout="total, prev, pager, next, jumper"
        :page-size="pageSize"
        :current-page="pageNum"
        :pager-count="9"
        :total="totalItemsNum"
        @prev-click="searchBooks"
        @current-change="searchBooks"
        @next-click="searchBooks"
      />
    </el-row>
  </div>
</template>

<script>
import { search, getCategory } from '@/api/item'
import BookItem from '@/components/Books/BookItem.vue'
import Category from '@/components/Category'

export default {
  name: 'Search',
  components: {
    BookItem, Category
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
      categories: [
        {
          'cate_id': 1,
          'parent_id': -1,
          'catename': '文学艺术',
          'look_amount': 0,
          'is_parent': true,
          'children': [
            {
              'cate_id': 2,
              'parent_id': 1,
              'catename': '文学',
              'look_amount': 0,
              'is_parent': true,
              'children': [
                {
                  'cate_id': 3,
                  'parent_id': 2,
                  'catename': '中国文学',
                  'look_amount': 0,
                  'is_parent': false,
                  'children': []
                }
              ]
            },
            {
              'cate_id': 4,
              'parent_id': 1,
              'catename': '小说',
              'look_amount': 0,
              'is_parent': true,
              'children': [
                {
                  'cate_id': 5,
                  'parent_id': 4,
                  'catename': '外国小说',
                  'look_amount': 0,
                  'is_parent': false,
                  'children': []
                }
              ]
            }
          ]
        },
        {
          'cate_id': 6,
          'parent_id': -1,
          'catename': '人文社科',
          'look_amount': 0,
          'is_parent': true,
          'children': [
            {
              'cate_id': 7,
              'parent_id': 6,
              'catename': '历史',
              'look_amount': 0,
              'is_parent': true,
              'children': [
                {
                  'cate_id': 8,
                  'parent_id': 7,
                  'catename': '世界史',
                  'look_amount': 0,
                  'is_parent': false,
                  'children': []
                }
              ]
            },
            {
              'cate_id': 12,
              'parent_id': 6,
              'catename': '法律',
              'look_amount': 0,
              'is_parent': true,
              'children': [
                {
                  'cate_id': 13,
                  'parent_id': 12,
                  'catename': '中国法律',
                  'look_amount': 0,
                  'is_parent': false,
                  'children': []
                },
                {
                  'cate_id': 14,
                  'parent_id': 12,
                  'catename': '法学理论',
                  'look_amount': 0,
                  'is_parent': false,
                  'children': []
                },
                {
                  'cate_id': 15,
                  'parent_id': 12,
                  'catename': '法律法规',
                  'look_amount': 0,
                  'is_parent': false,
                  'children': []
                },
                {
                  'cate_id': 16,
                  'parent_id': 12,
                  'catename': '外国及港澳台法律',
                  'look_amount': 0,
                  'is_parent': false,
                  'children': []
                }
              ]
            }
          ]
        }
      ],
      books: [],
      mockBooks: mockBooks,
      topSearchVisible: true,
      pageSize: 72,
      pageNum: 1,
      totalItemsNum: 999,
      isContentCategory: true
    }
  },
  created() {
    console.log('route params', this.$route.query)
    console.log('route params categoryId', this.$route.query.categoryId)
    this.searchBooks(this.pageNum, this.$route.query.categoryId)
    getCategory().then(res => {
      this.categories = res.data
    }).catch(err => {
      console.log(err)
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
    },
    searchBooks(pageNum = 1, categoryId = -1) {
      this.pageNum = Number(pageNum) || 1
      console.log('搜索内容', this.search)
      // highPrice: 999999,
      search({
        isContentCategory: this.isContentCategory,
        keyword: this.search,
        cate_id: categoryId || -1,
        lowPrice: 0,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        console.log(res)
        const { currentCategoriesList, levelMap, searchResultPage } = res.data
        console.log('currentCategoriesList', currentCategoriesList)
        console.log('levelMap', levelMap)
        console.log('searchResultPage', searchResultPage)
        this.books = searchResultPage.list
        this.totalItemsNum = searchResultPage.total
        this.pageNum = searchResultPage.pageNum
        this.pageSize = searchResultPage.pageSize
      }).catch(error => {
        console.log(error)
        this.books = this.mockBooks
      }).finally(() => {
        // this.search = ''
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

.book-item {
  margin-bottom: 20px;
}

.category-item {
  color: black
}

.category-item:hover {
  color: red
}
</style>
