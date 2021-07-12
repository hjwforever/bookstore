<template>
  <div class="dashboard-container">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="18" :md="12" :lg="6" :xl="6">
        <Category :categories="categories" style="max-height: 250px" />
      </el-col>
      <el-col :xs="24" :sm="18" :md="12" :lg="10" :xl="10" class="item">
        <el-carousel height="250px">
          <el-carousel-item v-for="item in img1" :key="item">
            <!-- <h3 class="small">{{ item }}</h3> -->
            <img :src="item" fit="fit" alt="" referrerPolicy="no-referrer">
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :xs="24" :sm="18" :md="12" :lg="8" :xl="8" class="aside-items">
        <el-col class="item">
          <el-carousel height="120px">
            <el-carousel-item v-for="item in 4" :key="item">
            <!-- <h3 class="small">{{ item }}</h3> -->
            </el-carousel-item>
          </el-carousel>
        </el-col>
        <el-row :gutter="10">
          <el-col :xs="12" :sm="12">
            <el-carousel height="120px">
              <el-carousel-item v-for="item in 4" :key="item">
                <!-- <h3 class="small">{{ item }}</h3> -->
              </el-carousel-item>
            </el-carousel>
          </el-col>
          <el-col :xs="12" :sm="12">
            <el-carousel height="120px">
              <el-carousel-item v-for="item in 4" :key="item">
                <!-- <h3 class="small">{{ item }}</h3> -->
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <Books :books="books" :has-leaderboard="true">
      <div slot="header" style="text-align: center;">
        <img src="https://img6.xinhuashudian.com/images/2021/06/25/eb4b2504-3fc1-44e6-9bb0-5f253a820f75.jpg?x-oss-process=image/format,webp" alt="特色图书" referrerPolicy="no-referrer">
      </div>
    </Books>

    <Books :books="books" :has-leaderboard="true">
      <div slot="header" style="text-align: center;">
        <img src="https://img5.xinhuashudian.com/images/2021/06/25/6fff3870-2767-4c25-867f-207fd830234c.jpg?x-oss-process=image/format,webp" alt="文创产品" referrerPolicy="no-referrer">
      </div>
    </Books>

    <Books :books="books" :has-leaderboard="true">
      <div slot="header" style="text-align: center;">
        <img src="https://img7.xinhuashudian.com/images/2021/06/25/4bd395d5-ea59-4669-977c-01de3eaa40ee.jpg?x-oss-process=image/format,webp" alt="大家值得买" referrerPolicy="no-referrer">
      </div>
    </Books>
    <!-- <div class="dashboard-text">name: {{ name }}</div>
    <div class="dashboard-text">roles: <span v-for="role in roles" :key="role">{{ role }}</span></div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Category from '@/components/Category'
import Books from '@/components/Books'

export default {
  name: 'Dashboard',
  components: {
    Category, Books
  },
  data() {
    const testItems = []
    const bookStatus = ['已售罄', '抢购中', '火爆新品', '超值促销']
    // [
    //   {
    //     label: '已售罄',
    //     type: 'error'
    //   },
    //   {
    //     label: '抢购中',
    //     type: 'error'
    //   },
    //   {
    //     label: '火爆新品',
    //     type: 'error'
    //   },
    //   {
    //     label: '超值促销',
    //     type: 'error'
    //   }
    // ]
    for (let i = 1; i < 10; i++) {
      testItems.push({
        title: '书籍名称' + i,
        author: 'bookstore',
        img: '//z3.ax1x.com/2021/04/11/cwKLLj.png?imageView2/1/w/80/h/80',
        description: i,
        price: i * 3 + 1,
        rate: (3 + Math.random() * 2).toFixed(1),
        status: bookStatus[i % 4]
      })
    }
    return {
      user: null,
      visible: false,
      content: {},
      books: testItems,
      img1: [
        '//img7.xinhuashudian.com/images/2021/06/30/44619814-33e9-4856-a6b6-b78c3e8718f4.jpg?x-oss-process=image/resize,m_mfit,h_750,w_750/format,webp/watermark,image_aW1hZ2VzLzIwMTgvMDcvMjEvNTc4N2Q2YWMtNGU1YS00NzQxLTkzNWUtYWY3NDk1Mzc3OWE3LnBuZw==,t_50,g_center',
        'http://img2.xinhuashudian.com/images/2021/06/23/959cb415-80dc-4328-9368-10b89c0b0953.jpg',
        'https://img7.xinhuashudian.com/images/2021/06/23/582b2805-eba2-4c80-ba4e-b79c682708bc.jpg?x-oss-process=image/resize,m_mfit,h_750,w_750/format,webp/watermark,image_aW1hZ2VzLzIwMTgvMDcvMjEvNTc4N2Q2YWMtNGU1YS00NzQxLTkzNWUtYWY3NDk1Mzc3OWE3LnBuZw==,t_50,g_center',
        '//z3.ax1x.com/2021/04/11/cwKLLj.png?imageView2/1/w/80/h/80',
        'http://img2.xinhuashudian.com/bookbasepic/C/00085/710401604X0858609-fm.jpg'
      ],
      img2: [
        'https://img2.xinhuashudian.com/images/2021/06/15/7af0941d-5c2d-43e3-9e5b-dd1f2dc48429.png?x-oss-process=image/resize,m_mfit,h_750,w_750/format,webp/watermark,image_aW1hZ2VzLzIwMTgvMDcvMjEvNTc4N2Q2YWMtNGU1YS00NzQxLTkzNWUtYWY3NDk1Mzc3OWE3LnBuZw==,t_50,g_center',
        'https://img7.xinhuashudian.com/images/2021/06/04/916040ba-632e-458e-88ce-72d7b0899c45.jpg?x-oss-process=image/resize,m_mfit,h_750,w_750/format,webp/watermark,image_aW1hZ2VzLzIwMTgvMDcvMjEvNTc4N2Q2YWMtNGU1YS00NzQxLTkzNWUtYWY3NDk1Mzc3OWE3LnBuZw==,t_50,g_center',
        'https://img9.xinhuashudian.com/images/2021/04/18/80d7db66-413c-4008-9471-ee33363df0fe.jpg?x-oss-process=image/resize,m_mfit,h_750,w_750/format,webp/watermark,image_aW1hZ2VzLzIwMTgvMDcvMjEvNTc4N2Q2YWMtNGU1YS00NzQxLTkzNWUtYWY3NDk1Mzc3OWE3LnBuZw==,t_50,g_center'
      ],
      img3: [
        'https://img5.xinhuashudian.com/images/2021/07/02/0d301ac9-d3c9-4ca2-b196-f618fcc5a026.jpg?x-oss-process=image/resize,m_mfit,h_160,w_160',
        'https://img5.xinhuashudian.com/images/2021/06/24/8efc18bc-6c17-4499-a740-56b04ffa8185.jpg?x-oss-process=image/resize,m_mfit,h_160,w_160'
      ],
      img4: [
        'https://img8.xinhuashudian.com/images/2021/06/11/57c61779-86ff-4251-827f-bfebd6f5df4c.jpg?x-oss-process=image/resize,m_mfit,h_750,w_750/format,webp/watermark,image_aW1hZ2VzLzIwMTgvMDcvMjEvNTc4N2Q2YWMtNGU1YS00NzQxLTkzNWUtYWY3NDk1Mzc3OWE3LnBuZw==,t_50,g_center',
        'https://img7.xinhuashudian.com/images/2021/03/19/25c3beaf-b3a0-44ef-be51-564a2893dfdb.jpg?x-oss-process=image/resize,m_mfit,h_750,w_750/format,webp/watermark,image_aW1hZ2VzLzIwMTgvMDcvMjEvNTc4N2Q2YWMtNGU1YS00NzQxLTkzNWUtYWY3NDk1Mzc3OWE3LnBuZw==,t_50,g_center'
      ],
      categories: [{
        'label': '文学艺术',
        'value': {
          'cate_id': '1',
          'parent_id': '-1',
          'name': '文学艺术',
          'status': '1',
          'sort_order': '1',
          'is_parent': '1',
          'created': '2/7/2021 11:50:51',
          'updated': '2/7/2021 11:51:07'
        },
        'children': [
          {
            'label': '文学',
            'value': {
              'cate_id': '2',
              'parent_id': '1',
              'name': '文学',
              'status': '1',
              'sort_order': '1',
              'is_parent': '1',
              'created': '3/7/2021 11:50:57',
              'updated': '3/7/2021 11:51:11'
            },
            'children': [{
              'label': '文学',
              'value': {
                'cate_id': '2',
                'parent_id': '1',
                'name': '文学',
                'status': '1',
                'sort_order': '1',
                'is_parent': '1',
                'created': '3/7/2021 11:50:57',
                'updated': '3/7/2021 11:51:11'
              },
              'children': []
            },
            {
              'label': '小说',
              'value': {
                'cate_id': '4',
                'parent_id': '1',
                'name': '小说',
                'status': '1',
                'sort_order': '1',
                'is_parent': '1',
                'created': '3/7/2021 11:51:17',
                'updated': '3/7/2021 11:51:22'
              },
              'children': []
            }]
          },
          {
            'label': '小说',
            'value': {
              'cate_id': '4',
              'parent_id': '1',
              'name': '小说',
              'status': '1',
              'sort_order': '1',
              'is_parent': '1',
              'created': '3/7/2021 11:51:17',
              'updated': '3/7/2021 11:51:22'
            },
            'children': [{
              'label': '文学',
              'value': {
                'cate_id': '2',
                'parent_id': '1',
                'name': '文学',
                'status': '1',
                'sort_order': '1',
                'is_parent': '1',
                'created': '3/7/2021 11:50:57',
                'updated': '3/7/2021 11:51:11'
              },
              'children': []
            },
            {
              'label': '小说',
              'value': {
                'cate_id': '4',
                'parent_id': '1',
                'name': '小说',
                'status': '1',
                'sort_order': '1',
                'is_parent': '1',
                'created': '3/7/2021 11:51:17',
                'updated': '3/7/2021 11:51:22'
              },
              'children': []
            }]
          },
          {
            'label': '小说2',
            'value': {
              'cate_id': '5',
              'parent_id': '1',
              'name': '小说',
              'status': '1',
              'sort_order': '1',
              'is_parent': '1',
              'created': '3/7/2021 11:51:17',
              'updated': '3/7/2021 11:51:22'
            },
            'children': []
          },
          {
            'label': '小说3',
            'value': {
              'cate_id': '6',
              'parent_id': '1',
              'name': '小说',
              'status': '1',
              'sort_order': '1',
              'is_parent': '1',
              'created': '3/7/2021 11:51:17',
              'updated': '3/7/2021 11:51:22'
            },
            'children': []
          }
        ]
      },
      {
        'label': '文学艺术',
        'value': {
          'cate_id': '11',
          'parent_id': '-1',
          'name': '文学艺术',
          'status': '1',
          'sort_order': '1',
          'is_parent': '1',
          'created': '2/7/2021 11:50:51',
          'updated': '2/7/2021 11:51:07'
        },
        'children': [
          {
            'label': '文学',
            'value': {
              'cate_id': '12',
              'parent_id': '1',
              'name': '文学',
              'status': '1',
              'sort_order': '1',
              'is_parent': '1',
              'created': '3/7/2021 11:50:57',
              'updated': '3/7/2021 11:51:11'
            },
            'children': []
          },
          {
            'label': '小说',
            'value': {
              'cate_id': '14',
              'parent_id': '1',
              'name': '小说',
              'status': '1',
              'sort_order': '1',
              'is_parent': '1',
              'created': '3/7/2021 11:51:17',
              'updated': '3/7/2021 11:51:22'
            },
            'children': []
          }
        ]
      },
      {
        'label': '文学艺术',
        'value': {
          'cate_id': '121',
          'parent_id': '-1',
          'name': '文学艺术',
          'status': '1',
          'sort_order': '1',
          'is_parent': '1',
          'created': '2/7/2021 11:50:51',
          'updated': '2/7/2021 11:51:07'
        },
        'children': [
          {
            'label': '文学',
            'value': {
              'cate_id': '122',
              'parent_id': '1',
              'name': '文学',
              'status': '1',
              'sort_order': '1',
              'is_parent': '1',
              'created': '3/7/2021 11:50:57',
              'updated': '3/7/2021 11:51:11'
            },
            'children': []
          },
          {
            'label': '小说',
            'value': {
              'cate_id': '44',
              'parent_id': '1',
              'name': '小说',
              'status': '1',
              'sort_order': '1',
              'is_parent': '1',
              'created': '3/7/2021 11:51:17',
              'updated': '3/7/2021 11:51:22'
            },
            'children': []
          }
        ]
      },
      {
        'label': '文学艺术',
        'value': {
          'cate_id': '51',
          'parent_id': '-1',
          'name': '文学艺术',
          'status': '1',
          'sort_order': '1',
          'is_parent': '1',
          'created': '2/7/2021 11:50:51',
          'updated': '2/7/2021 11:51:07'
        },
        'children': [
          {
            'label': '文学',
            'value': {
              'cate_id': '62',
              'parent_id': '1',
              'name': '文学',
              'status': '1',
              'sort_order': '1',
              'is_parent': '1',
              'created': '3/7/2021 11:50:57',
              'updated': '3/7/2021 11:51:11'
            },
            'children': []
          },
          {
            'label': '小说',
            'value': {
              'cate_id': '64',
              'parent_id': '1',
              'name': '小说',
              'status': '1',
              'sort_order': '1',
              'is_parent': '1',
              'created': '3/7/2021 11:51:17',
              'updated': '3/7/2021 11:51:22'
            },
            'children': []
          }
        ]
      }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])

  },
  created() {
  },
  methods: {
    translateToTree(list) {
      console.log(list)
    },
    hadlePopoverShow(event) {
      const item = JSON.parse(event.currentTarget.firstElementChild.innerHTML)
      console.log(item)
      const categoryList = { ...this.categories.find(_item => _item.value.cate_id === item.cate_id) }
      console.log({ ...categoryList })
      // TODO: 获取第三级分类 或者直接渲染第三级分类
      this.content = categoryList
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    background: #f0f3ef;
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.item {
  margin: 0 0 10px;
}

.subitem {
  font-size: 14px;
  line-height: 14px;
}

.aside-items {
  display: flex;
  flex-direction: column;
}

.popover-title {
  // font-size: 16px;
  font-weight: bold;
}

.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

.el-carousel__item:nth-child(2n) {
   background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
   background-color: #d3dce6;
}
</style>
