<template>
  <el-card body-style="background: #ca4040; color: white" @mouseenter.native="show" @mouseleave.native="hide">
    <el-row type="flex" justify="space-around">
      <el-col><i class="el-icon-menu" /></el-col>
      <!-- <el-col><span>全部商品分类</span></el-col> -->
      <el-col><router-link
        to="/search"
      >全部商品分类</router-link></el-col>
    </el-row>
    <el-collapse-transition>
      <div v-if="visible">
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
      </div>
    </el-collapse-transition>
  </el-card>
</template>

<script>
export default {
  name: 'Category',
  props: {
    categories: {
      type: Array,
      required: true
    },
    foldable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      content: {},
      visible: true
    }
  },
  created() {
    console.log('categories :', this.categories)
    console.log('foldable :', this.foldable)
  },
  methods: {
    hadlePopoverShow(event) {
      const item = JSON.parse(event.currentTarget.firstElementChild.innerHTML)
      // console.log(item)
      const categoryList = { ...this.categories.find(_item => _item.value.cate_id === item.cate_id) }
      // console.log({ ...categoryList })
      // TODO: 获取第三级分类 或者直接渲染第三级分类
      this.content = categoryList
    },
    show() {
      if (this.foldable === true) {
        this.visible = true
      } else {
        return
      }
    },
    hide() {
      if (this.foldable === true) {
        this.visible = false
      } else {
        return
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.popover-title {
  font-weight: bold;
}

.subitem {
  font-size: 14px;
  line-height: 14px;
}
</style>
