<template>
  <div class="dashboard-container">
    <!-- <img :src="qrcodeImg" alt="qrcode"> -->
    <el-row :gutter="10">
      <el-col :xs="24" :sm="18" :md="12" :lg="6" :xl="6">
        <Category :categories="categories" style="max-height: 250px" />
      </el-col>
      <el-col :xs="24" :sm="18" :md="12" :lg="10" :xl="10" class="item">
        <el-carousel height="175px">
          <el-carousel-item v-for="item in img1" :key="item">
            <!-- <h3 class="small">{{ item }}</h3> -->
            <img :src="item" fit="fit" alt="" referrerPolicy="no-referrer">
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :xs="24" :sm="18" :md="12" :lg="8" :xl="8" class="aside-items">
        <el-col class="item">
          <el-carousel height="120px">
            <el-carousel-item v-for="item in img2" :key="item">
              <!-- <h3 class="small">{{ item }}</h3> -->
              <img :src="item" fit="fit" alt="" referrerPolicy="no-referrer">
            </el-carousel-item>
          </el-carousel>
        </el-col>
        <el-row :gutter="10">
          <el-col :xs="12" :sm="12">
            <el-carousel height="120px">
              <el-carousel-item v-for="item in img3" :key="item">
                <!-- <h3 class="small">{{ item }}</h3> -->
                <img :src="item" fit="fit" alt="" referrerPolicy="no-referrer">
              </el-carousel-item>
            </el-carousel>
          </el-col>
          <el-col :xs="12" :sm="12">
            <el-carousel height="120px">
              <el-carousel-item v-for="item in img4" :key="item">
                <!-- <h3 class="small">{{ item }}</h3> -->
                <img :src="item" fit="fit" alt="" referrerPolicy="no-referrer">
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <RecommendBooks :recommend-books.sync="recommandBooks" />
    <div v-for="(categoryBooks, index) in popularCategories" :key="index">
      <Books :books="categoryBooks.value" :has-leaderboard="true">
        <div slot="header" class="content-header">
          <span>{{ categoryBooks.label }}</span>
          <!-- <img :src="headerImages[index].value" :alt="headerImages[index].label" referrerPolicy="no-referrer"> -->
        </div>
      </Books>
    </div>
    <!-- <div class="dashboard-text">name: {{ name }}</div>
    <div class="dashboard-text">roles: <span v-for="role in roles" :key="role">{{ role }}</span></div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Category from '@/components/Category'
import Books from '@/components/Books'
import RecommendBooks from '@/components/Recommend'
import { getIndexData } from '@/api/item'
// import { getBookInfo } from '@/api/book'

export default {
  name: 'Dashboard',
  components: {
    Category, Books, RecommendBooks
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
        book_id: i,
        bookname: '书籍名称' + i,
        author: 'bookstore',
        img: '//z3.ax1x.com/2021/04/11/cwKLLj.png?imageView2/1/w/80/h/80',
        s_image: '//z3.ax1x.com/2021/04/11/cwKLLj.png?imageView2/1/w/80/h/80',
        b_image: '//z3.ax1x.com/2021/04/11/cwKLLj.png?imageView2/1/w/80/h/80',
        description: i,
        price: i * 3 + 1,
        rate: (3 + Math.random() * 2).toFixed(1),
        status: bookStatus[i % 4]
      })
      // testItems.push({
      //   'book_id': 1,
      //   'cate_id': 3,
      //   'bookname': '人骨手镯',
      //   'press': '朝华出版社',
      //   'author': '苏京',
      //   'publish_date': '2006-03-31T16:00:00.000+00:00',
      //   'isbn': '9787505415324',
      //   'price': 19.0,
      //   'pages': 230,
      //   'deal_amount': 0,
      //   'look_amount': 0,
      //   'store_amount': 0,
      //   's_image': 'https://img7.xinhuashudian.com/bookbasepic/C/00176/75054153280918030-fm.jpg?x-oss-process=image/resize,m_mfit,h_160,w_160',
      //   'b_image': 'https://img7.xinhuashudian.com/bookbasepic/C/00176/75054153280918030-fm.jpg?x-oss-process=image/resize,m_mfit,h_375,w_375',
      //   'description': '是个梦吗？不是梦吗？张梦菲辗转反侧。这个情景，已经出现好多次了。初次见那个白袍的人影，她还只在屋角。再次见到，她已经会移动，并且，每见一次，移动的距离就大一点。距上次见她已有近一年时间，这两次的情形几乎一模一样，不同的，只是这次她说了一句话。张梦菲细细一想，她俯在自己耳边，说的是一句：“无处可逃......”因为对生的留恋，她们徘徊人间，不愿离去......本书为《锦绣旗袍》姊妹篇，咒怨不断，恐怖不止......是2006年天涯社区莲蓬鬼话版主力作！',
      //   'rate': 0.0,
      //   'rate_num': 0
      // })
    }
    return {
      recommendNum: 4,
      cate_top: 3,
      book_top: 8,
      qrcodeImg: '',
      recommandBooks: [],
      popularCategories: [],
      headerImages: [
        {
          label: '特色图书',
          value: 'https://img6.xinhuashudian.com/images/2021/06/25/eb4b2504-3fc1-44e6-9bb0-5f253a820f75.jpg'
        },
        {
          label: '文创产品',
          value: 'https://img5.xinhuashudian.com/images/2021/06/25/6fff3870-2767-4c25-867f-207fd830234c.jpg'
        },
        {
          label: '大家值得买',
          value: 'https://img7.xinhuashudian.com/images/2021/06/25/4bd395d5-ea59-4669-977c-01de3eaa40ee.jpg'
        }],
      user: null,
      visible: false,
      content: {},
      books: testItems,
      img1: [
        'http://bookstore.makerhu.com:8081/images/bookFace/2021/7/16/5d9570c0-9d40-49cf-b87a-ef4d87ee9693.jpg',
        'http://bookstore.makerhu.com:8081/images/bookFace/2021/7/16/1c84634d-8263-43f1-bf84-3c6d45ed72b7.jpg',
        'http://bookstore.makerhu.com:8081/images/bookFace/2021/7/16/c8c7af01-eb58-425d-86e6-b7b701a42dc8.jpg',
        'http://bookstore.makerhu.com:8081/images/bookFace/2021/7/16/916528de-2f1f-4363-a773-459529fdf0d9.png',
        'http://bookstore.makerhu.com:8081/images/bookFace/2021/7/16/cfffce7c-dccb-4933-b124-b2f6f88fe48e.jpg'
      ],
      img2: [
        'http://bookstore.makerhu.com:8081/images/bookFace/2021/7/16/2804693b-b512-4957-83cc-453ff9bb6888.jpg',
        'http://bookstore.makerhu.com:8081/images/bookFace/2021/7/16/01f4ef24-70fb-4427-8f55-ecc5a7c199f1.jpg',
        'http://bookstore.makerhu.com:8081/images/bookFace/2021/7/16/249a1ea6-9d46-4bc3-b856-4b148a4835b0.png'
      ],
      img3: [
        'http://bookstore.makerhu.com:8081/images/bookFace/2021/7/16/5c30768f-690e-46eb-aea1-59cd86d8e536.jpg',
        'http://bookstore.makerhu.com:8081/images/bookFace/2021/7/16/c87bce9d-e9df-48a5-a618-08defade31e5.jpg'
      ],
      img4: [
        'http://bookstore.makerhu.com:8081/images/bookFace/2021/7/16/2550f5d0-b5d1-4735-974a-54a6d6499c58.jpg',
        'http://bookstore.makerhu.com:8081/images/bookFace/2021/7/16/4e8eab44-658f-484f-b085-eb3e054cc142.jpg'
      ],
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
    getIndexData({
      recommendNum: this.recommendNum,
      cate_top: this.cate_top,
      book_top: this.book_top
    }).then(res => {
      console.log('获取首页信息', res)
      const { categorysDto, popularCategories, recommandBooks } = res.data
      this.categories = categorysDto
      this.recommandBooks = recommandBooks

      for (const key in popularCategories) {
        if (Object.hasOwnProperty.call(popularCategories, key)) {
          let element = popularCategories[key]
          element = element.map(item => this.geneRate(item))
          console.log(key, element)
          this.popularCategories.push({
            label: key,
            value: element
          })
        }
      }
      console.log('categories', this.categories)
      console.log('popularCategories', this.popularCategories)
      console.log('recommandBooks', this.recommandBooks)
    }).catch(err => {
      console.log(err)
      const data = {
        'categorysDto': [
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
                'children': []
              }
            ]
          }
        ],
        'recommandBooks': [
          {
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
          },
          {
            'book_id': 286,
            'cate_id': 16,
            'bookname': '国际私法论丛--理论前沿立法探讨与司法实践',
            'press': '高等教育出版社',
            'author': '赵相林',
            'publish_date': '2005-07-31T16:00:00.000+00:00',
            'isbn': '9787040176957',
            'price': 37.05,
            'pages': 430,
            'deal_amount': 0,
            'look_amount': 0,
            'store_amount': 0,
            's_image': 'https://img8.xinhuashudian.com/bookbasepic/C/00069/70401769550846578-fm.jpg?x-oss-process=image/resize,m_mfit,h_160,w_160',
            'b_image': 'https://img8.xinhuashudian.com/bookbasepic/C/00069/70401769550846578-fm.jpg?x-oss-process=image/resize,m_mfit,h_375,w_375',
            'description': '本书是一本关于国际私法的理论研究著作，全书本书汇集了部分学人对国际私法理论、立法和司法问题的探索，内容涉及涉外民事关系、国际私法理论、区际法律冲突、国际项目融资法律适用研究等方面。',
            'rate': 0.0,
            'rate_num': 0
          }
        ],
        'popularCategories': [
          {
            label: '中国文学',
            value: [
              {
                'book_id': 29,
                'cate_id': 3,
                'bookname': '粉爱',
                'press': '朝华出版社',
                'author': '小米粥',
                'publish_date': '2006-04-30T16:00:00.000+00:00',
                'isbn': '9787505415393',
                'price': 20.71,
                'pages': 219,
                'deal_amount': 0,
                'look_amount': 2,
                'store_amount': 0,
                's_image': 'https://img9.xinhuashudian.com/bookbasepic/C/00198/75054153950930816-fm.jpg?x-oss-process=image/resize,m_mfit,h_160,w_160',
                'b_image': 'https://img9.xinhuashudian.com/bookbasepic/C/00198/75054153950930816-fm.jpg?x-oss-process=image/resize,m_mfit,h_375,w_375',
                'description': '本年度最值得期待的爆笑青春网络小说炫酷出炉，小米粥用你能想到的和想不到的“网络式”搞掂了这部小书哦。最幻语言！最IN情节！最炫人物！最酷爱情！主人公的名字叫小米粥，高一时是一个学习不错的学生，故事要从他高二的时候说起......',
                'rate': 0.0,
                'rate_num': 0
              },
              {
                'book_id': 23,
                'cate_id': 3,
                'bookname': '海是倒过来的天',
                'press': '春风文艺出版社',
                'author': '花火工作室',
                'publish_date': '2009-08-31T16:00:00.000+00:00',
                'isbn': '9787531335979',
                'price': 15.96,
                'pages': 252,
                'deal_amount': 0,
                'look_amount': 1,
                'store_amount': 0,
                's_image': 'https://img4.xinhuashudian.com/bookbasepic/C/00889/97875313359791651088-fm.jpg?x-oss-process=image/resize,m_mfit,h_160,w_160',
                'b_image': 'https://img4.xinhuashudian.com/bookbasepic/C/00889/97875313359791651088-fm.jpg?x-oss-process=image/resize,m_mfit,h_375,w_375',
                'description': '风风雨雨，《花火》已经走过五年的历程。这五年里，我最大的欣慰便是，曾经的那批小写手已经成长为独当一面的优秀作家。《海是倒过来的天》分别收录了他们繁华鼎盛时期的作品，当我回头再看这些文字时，就好像发现了流年与我擦身而过的痕迹。',
                'rate': 0.0,
                'rate_num': 0
              }
            ]
          },
          {
            label: '产业经济',
            value: [
              {
                'book_id': 345,
                'cate_id': 23,
                'bookname': '我们在燃烧(日本电子企业研发史)',
                'press': '华夏出版社',
                'author': '(美国)鲍勃·约翰斯通著//李先柏译',
                'publish_date': '2004-09-30T16:00:00.000+00:00',
                'isbn': '9787508035345',
                'price': 30.4,
                'pages': 330,
                'deal_amount': 0,
                'look_amount': 0,
                'store_amount': 0,
                's_image': 'https://img1.xinhuashudian.com/images/2018/08/08/d401a4a4-7d5e-45c9-b22e-e4c793a3f853.png',
                'b_image': 'https://img1.xinhuashudian.com/images/2018/08/08/d401a4a4-7d5e-45c9-b22e-e4c793a3f853.png',
                'description': '本书详细介绍了长期居于世界领先地位的日本电子企业的研发活动，并对不同历史时期的日本电子企业的技术状况以及研发人员的所思所为进行了详尽地分析和描述，对其长盛不衰的秘密进行了深入的探究。这些描写和分析，涉及到日本的传统文化、政府管理职能的转变、人才流动、技术转让等诸多方面。这些对我国企业的研发活动都具有很大的启示意义和很好的指导与借鉴价值。&lt;BR&gt;作者跟踪访谈了不少难得一见的日本实业家，说服他们讲出自己的故事，其中不乏过去和现在的关键人物。通过材料揭开了日本公司的面纱，展现了诸如佳能、卡西欧、精工',
                'rate': 0.0,
                'rate_num': 0
              },
              {
                'book_id': 372,
                'cate_id': 23,
                'bookname': '出行宝典(柯达携程)',
                'press': '学林出版社',
                'author': '本社编',
                'publish_date': '2003-07-31T16:00:00.000+00:00',
                'isbn': '9787806685792',
                'price': 14.25,
                'pages': 139,
                'deal_amount': 0,
                'look_amount': 0,
                'store_amount': 0,
                's_image': 'https://img1.xinhuashudian.com/images/2018/08/08/d401a4a4-7d5e-45c9-b22e-e4c793a3f853.png',
                'b_image': 'https://img1.xinhuashudian.com/images/2018/08/08/d401a4a4-7d5e-45c9-b22e-e4c793a3f853.png',
                'description': '细致的“游线设计”，丰富的“玩家指南”，伴你快乐，安全出行。全书共分九篇，每条旅游线路都以最科学的方案设计。无处不在的提醒，和旅游发烧友的经验，帮你避免旅途麻烦和遗憾。所有信息经过多方核实，确保准确无误。给读者以吃、住、行、游、娱、购等多方面信息。以最鲜亮的彩色图案给你最好的视觉感受。',
                'rate': 0.0,
                'rate_num': 0
              }
            ]
          }
        ]
      }

      console.log('获取首页信息 Mock', data)
      const { categorysDto, popularCategories, recommandBooks } = data
      this.categories = categorysDto
      this.recommandBooks = recommandBooks
      this.popularCategories = popularCategories

      console.log('Mock categories', this.categories)
      console.log('Mock popularCategories', this.popularCategories)
      console.log('Mock recommandBooks', this.recommandBooks)
    })
    // getCategory().then(res => {
    //   console.log('获取分类列表', res)
    //   this.categories = res.data
    // })
  },
  methods: {
    testQRCode() {
      this.$request.post('', {

      })
    },
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
    },
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
.dashboard {
  &-container {
    // background: #f0f3ef;
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.content-header {
  text-align: center;
  font-weight: bold;
  font-size: 18px;
}

.item {
  margin: 0 0 10px;
  width: 400px;
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
