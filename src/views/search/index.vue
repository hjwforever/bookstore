<template>
  <div class="search-main">
    <el-row style="position: absolute; z-index: 999; width:100%; max-height: 250px; top: 0;">
      <el-col :xs="24" :sm="18" :md="12" :lg="6" :xl="6" style="margin-top: 19px">
        <Category foldable :categories="categories" style="max-height: 250px;" @clicked="handleClicked" />
      </el-col>
      <el-col :xs="24" :sm="18" :md="12" :lg="12" :xl="12">
        <el-input v-model="search" clearable placeholder="请输入搜索内容" class="search-input" @keyup.enter.native="searchBooks">
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
    <el-row v-if="currentCategoriesList.length>0" style="position: absolute; margin-top: -25px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">全部分类</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(category, index) in currentCategoriesList" :key="index">
          <el-dropdown @mouseenter.native="chooseDrop(index)" @mouseleave.native="unChooseDrop">
            <span class="el-dropdown-link">
              {{ category.catename }}<i :class="unfoldIndex==index?'el-icon-arrow-up el-icon--right':'el-icon-arrow-down el-icon--right'" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-row style="max-width: 250px">
                <el-col v-for="(item,_index) in levelMap[index]" :key="_index" :span="levelMap[index].length < 6 ? 12:6">
                  <el-button type="text" class="category-item" :style="levelList.includes(item.cate_id)?'color: red':''" @click.native="searchBooks(1,item.cate_id)">{{ item.catename }}</el-button>
                </el-col>
              </el-row>
            </el-dropdown-menu>
          </el-dropdown>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <div style="margin-top: 100px" />
    <el-button-group class="button-group">
      <el-button icon="el-icon-bell" :style="activeName=='default'?'color: white; background-color: #c62e2d':''" @click="sort('default')">综合排序</el-button>
      <el-button icon="el-icon-price-tag" :style="activeName=='price'?'color: white; background-color: #c62e2d':''" @click="sort('price')">价格</el-button>
      <el-button icon="el-icon-alarm-clock" :style="activeName=='time'?'color: white; background-color: #c62e2d':''" @click="sort('time')">上架时间</el-button>
      <el-row type="flex" class="price-group">
        <el-input v-model="minPrice" suffix-icon="el-icon-minus" placeholder="最低价格" size="small" class="price-input" @keyup.enter.native="searchBooks">
          <template slot="prepend">￥</template>
        </el-input>
        <el-input v-model="maxPrice" placeholder="最高价格" size="small" class="price-input" @keyup.enter.native="searchBooks">
          <template slot="prepend">￥</template>
        </el-input>
      </el-row>
    </el-button-group>
    <!-- <el-tabs v-model="activeName" class="button-group">
      <el-tab-pane label="用户管理" name="first" />
      <el-tab-pane label="配置管理" name="second" />
      <el-tab-pane label="角色管理" name="third" />
      <el-tab-pane label="定时任务补偿" name="fourth" />
    </el-tabs> -->
    <el-row type="flex" :gutter="20" style="flex-wrap: wrap;" class="search-list">
      <el-col v-for="(book,index) in books" :key="index" :span="4" :xs="6" :sm="4" :xl="3" class="book-item">
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
      activeName: 1,
      topSearchVisible: true,
      pageSize: 72,
      pageNum: 1,
      minPrice: undefined,
      maxPrice: undefined,
      totalItemsNum: 999,
      isContentCategory: true,
      unfoldIndex: -1,
      currentCategoriesList: [],
      levelMap: [],
      levelList: []
    }
  },
  computed: {
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
      search({
        isContentCategory: this.isContentCategory,
        keyword: this.search,
        cate_id: categoryId !== -1 ? Number(categoryId) : (Number(this.$route.categoryId) || -1),
        lowPrice: this.minPrice || 0,
        highPrice: this.maxPrice || 9999999,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        console.log(res)
        const { currentCategoriesList, levelMap, searchResultPage } = res.data
        this.currentCategoriesList = currentCategoriesList
        this.levelList = []
        this.levelMap = []
        for (const key in levelMap) {
          if (Object.hasOwnProperty.call(levelMap, key)) {
            const element = levelMap[key]
            this.levelList.push(Number(key))
            this.levelMap.push(element)
          }
        }
        // this.levelMap = levelMap
        console.log('currentCategoriesList', this.currentCategoriesList)
        console.log('levelMap', this.levelMap)
        console.log('searchResultPage', searchResultPage)
        this.books = searchResultPage.list
        this.sort('default')
        this.totalItemsNum = searchResultPage.total
        this.pageNum = searchResultPage.pageNum
        this.pageSize = searchResultPage.pageSize
      }).catch(error => {
        console.log(error)
        this.books = this.mockBooks
      }).finally(() => {
        // this.search = ''
      })
    },
    chooseDrop(index) {
      this.unfoldIndex = index
    },
    unChooseDrop() {
      this.unfoldIndex = -1
    },
    handleClicked(categoryId) {
      this.searchBooks(1, categoryId)
    },
    sort(sortType) {
      if (sortType && ['time', 'price', 'default'].includes(sortType)) {
        console.log('sort: ' + sortType)
        this.activeName = sortType
        this.books = this.books.sort(function(a, b) {
          switch (sortType) {
            case 'time': {
              console.log('time')
              return a.publish_date < b.publish_date ? -1 : 1
            }
            case 'price': {
              console.log('price')
              return a.price < b.price ? -1 : 1
            }
            default: {
              console.log('default')
              return a.bookname.localeCompare(b.bookname)
            }
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import url("//unpkg.com/element-ui@2.15.3/lib/theme-chalk/index.css");
.search-main {
  background: #f7f7f7;
}

.search-input {
  margin: 20px 20px 0;
}

.button-group {
  margin: 20px 21px 0;
}

.price-group {
  margin-top: 5px;
}

.price-input {
  max-width: 150px;
}

.search-list {
  margin: 10px 20px 0;
  padding-left: 20px;
}

.book-item {
  margin-bottom: 20px;
}

.category-item {
  color: black;
}

.category-item:hover {
  color: red;
}
</style>
