<template>
  <div class="dashboard-container">
    <el-col :xs="24" :sm="18" :md="12" :lg="6" :xl="4">
      <el-card body-style="background: #ca4040; color: white">
        <el-row type="flex" justify="space-around">
          <el-col><i class="el-icon-menu" /></el-col>
          <!-- <el-col><span>全部商品分类</span></el-col> -->
          <el-col><router-link
            to="/search"
          >全部商品分类</router-link></el-col>
        </el-row>
        <br>
        <el-row v-for="item in categories" :key="item.value.cate_id">
          <el-popover
            placement="right-start"
            width="200"
            trigger="hover"
            :visible-arrow="false"
          >
            <template>
              <el-row v-for="(subCategory, index) in content.children" :key="subCategory.cate_id">
                <el-divider v-if="index!==0" />
                <el-row>
                  <el-row class="popover-title">{{ subCategory.label }}</el-row>
                  <el-row v-if="subCategory.children.length>0" type="flex">
                    <el-col v-for="(_subCategory, index1) in subCategory.children" :key="_subCategory.value.cate_id" class="subitem"><el-divider v-if="index1!=0" direction="vertical" /><router-link
                      :to="'/search?categoryId='+_subCategory.value.cate_id"
                    >{{ _subCategory.label }}</router-link></el-col>
                  </el-row>
                </el-row>
              </el-row>
            </template>
            <div slot="reference" @mouseenter.prevent="hadlePopoverShow($event)">
              <div v-show="false">{{ item.value }}</div>
              <span><router-link
                :to="'/search?categoryId='+item.value.cate_id"
              >{{ item.label }}</router-link></span>
              <el-row v-if="item.children" type="flex">
                <el-col v-for="item1 in item.children" :key="item1.value.cate_id" class="subitem"><router-link
                  :to="'/search?categoryId='+item1.value.cate_id"
                >{{ item1.label }}</router-link></el-col>
              </el-row>
            </div>
          </el-popover>
          <br>
        </el-row>
      </el-card>
    </el-col>
    <!-- <div class="dashboard-text">name: {{ name }}</div>
    <div class="dashboard-text">roles: <span v-for="role in roles" :key="role">{{ role }}</span></div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      user: null,
      visible: false,
      content: {},
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
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.subitem {
  font-size: 14px;
  line-height: 14px;
}

.popover-title {
  // font-size: 16px;
  font-weight: bold;
}
</style>
