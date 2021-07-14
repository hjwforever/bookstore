<template>
  <el-card body-style="background: #ca4040; color: white" @mouseenter.native="show" @mouseleave.native="hide">
    <el-row type="flex" justify="space-around" style="max-height: 1px">
      <el-col><i class="el-icon-menu" /></el-col>
      <!-- <el-col><span>全部商品分类</span></el-col> -->
      <el-col><router-link
        to="/search"
      >全部商品分类</router-link></el-col>
    </el-row>
    <el-collapse-transition>
      <div v-show="visible">
        <br>
        <el-row v-for="item in categories" :key="item.cate_id">
          <el-popover
            placement="right-start"
            width="400"
            trigger="hover"
            :visible-arrow="false"
          >
            <template>
              <el-row v-for="(subCategory, index) in content.children" :key="subCategory.cate_id" @mouseenter.native="show">
                <el-divider v-if="index!==0" />
                <el-row>
                  <el-row class="popover-title">{{ subCategory.catename }}</el-row>
                  <el-row v-if="subCategory.children.length>0" type="flex" justify="space-between">
                    <div v-for="_subCategory in subCategory.children" :key="_subCategory.cate_id">
                      <!-- <el-col>
                        <el-divider v-if="index1!=0" direction="vertical" /></el-col> -->
                      <el-col>
                        <!-- <router-link
                          :to="'/search?categoryId='+_subCategory.cate_id"
                        >{{ _subCategory.catename }}</router-link> -->
                        <router-link
                          :to="'/search?categoryId='+_subCategory.cate_id"
                        ><el-button type="text" size="mini" @click="clicked(_subCategory.cate_id)">{{ _subCategory.catename }}</el-button>
                        </router-link>
                      </el-col>
                    </div>
                  </el-row>
                </el-row>
              </el-row>
            </template>
            <div slot="reference" @mouseenter.prevent="hadlePopoverShow($event)">
              <div v-show="false">{{ item }}</div>
              <span><router-link
                :to="'/search?categoryId='+item.cate_id"
              ><el-button type="text" style="color: white" size="mini" @click="clicked(item.cate_id)">{{ item.catename }}</el-button></router-link></span>
              <el-row v-if="item.children" type="flex">
                <el-col v-for="item1 in item.children" :key="item1.cate_id" class="subitem"><router-link
                  :to="'/search?categoryId='+item1.cate_id"
                ><el-button type="text" style="color: white" size="mini" @click="clicked(item1.cate_id)">{{ item1.catename }}</el-button></router-link></el-col>
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
  computed: {

  },
  created() {
    if (this.foldable === true) {
      setTimeout(() => {
        this.visible = false
      }, 500)
    }
  },
  methods: {
    hadlePopoverShow(event) {
      const item = JSON.parse(event.currentTarget.firstElementChild.innerHTML)
      const categoryList = { ...this.categories.find(_item => _item.cate_id === item.cate_id) }
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
    },
    clicked(categoryId) {
      // console.log('clicked', categoryId)
      this.visible = false
      this.$emit('clicked', categoryId)
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
