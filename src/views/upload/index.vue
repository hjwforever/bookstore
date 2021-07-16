<template>
  <div id="upload">
    <el-card class="form-container">
      <el-form ref="form" status-icon :rules="rules" :model="form" label-width="80px">
        <el-form-item label="书籍名称" prop="bookname" class="form-item">
          <el-input v-model="form.bookname" name="bookname" />
        </el-form-item>
        <el-form-item label="作者" prop="author" class="form-item">
          <el-input v-model="form.author" name="author" />
        </el-form-item>
        <el-form-item label="出版社" prop="press" class="form-item">
          <el-input v-model="form.press" name="press" />
        </el-form-item>
        <el-form-item label="出版时间" prop="publish_date" class="form-item">
          <el-date-picker v-model="form.publish_date" type="date" name="publish_date" placeholder="出版时间" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="isbn" prop="isbn" class="form-item">
          <el-input v-model="form.isbn" name="isbn" />
        </el-form-item>
        <el-form-item label="书籍类别" prop="cate_id" class="form-item">
          <!-- <el-input v-model="form.cate_id" name="cate_id" /> -->
          <el-select v-model="form.cate_id" name="cate_id" placeholder="请选择书籍类别">
            <el-option
              v-for="(item, index) in categories"
              :key="index"
              :label="item.catename"
              :value="item.cate_id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="页数" prop="pages" class="form-item">
          <el-input v-model="form.pages" name="pages" />
        </el-form-item>
        <el-form-item label="库存数量" prop="store_amount" class="form-item">
          <el-input v-model="form.store_amount" name="store_amount" />
        </el-form-item>
        <el-form-item label="书籍价格" prop="price" class="form-item">
          <el-input v-model="form.price" name="price">
            <template slot="prepend">￥</template>
          </el-input>
        </el-form-item>
        <el-form-item label-width="80px" label="上传图片" prop="image">
          <el-upload
            class="upload-demo"
            accept=".jpg,.png"
            action=""
            :limit="1"
            :auto-upload="false"
            :on-change="onchange"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </el-form-item>
        <el-form-item label="描述" prop="description" class="form-item">
          <el-input v-model="form.description" type="textarea" name="description" />
        </el-form-item>
        <!-- <el-form-item style="padding-top:20px;">
              <el-button type="primary" @click="onSubmit2">立即创建</el-button>
              <el-button>取消</el-button>
            </el-form-item> -->
        <el-form-item style="padding-top:20px;">
          <el-button :v-loading="loading" type="primary" @click="submitForm('form')">提交</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { uploadNewBook } from '@/api/book'
import { getAllLeafCategory } from '@/api/item'
import { mapGetters } from 'vuex'

export default {
  data() {
    const checkImg = (rule, value, callback) => {
      if (!this.param || this.param.length <= 0) {
        return callback(new Error('请选择书籍图片进行上传'))
      } else {
        callback()
      }
    }
    return {
      fileList: [],
      form: {
        'bookname': '',
        'press': '',
        'cate_id': undefined,
        'author': '',
        'publish_date': '',
        'isbn': '',
        'price': '',
        'pages': '',
        'store_amount': undefined,
        's_image': '',
        'b_image': '',
        'description': ''
      },
      // form: { 'bookname': 'test', 'press': 'jwh', 'cate_id': '3', 'author': 'jwh', 'publish_date': '2021-7-13', 'isbn': '31223', 'price': '43', 'pages': '32', 'store_amount': '12', 's_image': '', 'b_image': '', 'description': 'test' },
      param: null,
      loading: false,
      categories: [],
      rules: {
        bookname: [
          { required: true, message: '请填写书籍名称', trigger: 'blur' }
        ],
        press: [
          { required: true, message: '请填写出版社', trigger: 'blur' }
        ],
        cate_id: [
          { required: true, message: '请填写书籍类别', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '请填写作者', trigger: 'blur' }
        ],
        publish_date: [
          { required: true, type: 'date', message: '请选择出版时间', trigger: 'blur' }
        ],
        isbn: [
          { required: true, message: '请填写isbn号码', trigger: 'blur' }
        ],
        price: [
          { required: true, /* type: 'number',*/ message: '请填写书籍价格', trigger: 'blur' }
        ],
        pages: [
          { required: true, /* type: 'number',*/ message: '请填写书籍页数', trigger: 'blur' }
        ],
        store_amount: [
          { required: true, /* type: 'number',*/ message: '请填写书籍库存', trigger: 'blur' }
        ],
        image: [
          { validator: checkImg, trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请填写书籍描述', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  created() {
    if (!this.user.nickname) {
      this.$message.error('请登录')
      setTimeout(() => {
        this.$router.push({ path: '/login?redirect=' + this.$route.path, params: { redirect: this.$route.path }})
      }, 400)
    }
    getAllLeafCategory()
      .then(res => {
        console.log('获取所有叶子节点类别', res)
        this.categories = res.data
      })
      .catch(err => {
        console.log('获取所有叶子节点类别失败', err)
      })
  },
  methods: {
    beforeRemove(file, fileList) {
      // return this.$confirm(`确定移除 ${ file.name }？`);
    },
    // onchange(file, filesList) {
    //   console.log(file)
    //   // 创建临时的路径来展示图片
    //   var windowURL = window.URL || window.webkitURL
    //   this.src = windowURL.createObjectURL(file.raw)
    //   // 重新写一个表单上传的方法
    //   this.param = new FormData()
    //   this.param.append('file', file.raw, file.name)
    //   // return false;
    // },
    onchange(file, filesList) {
      console.log('file', file.raw)
      // filesList.push(file.raw)
      this.param = new FormData()
      this.param.append('file', file.raw, file.name)
      console.log(this.fileList)
    },
    handleRemove(file, filesList) {
      this.param.delete('file')
      this.fileList = []
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.form.publish_date = this.$moment(this.form.publish_date).format('YYYY-M-D')
          console.log('form', this.form)
          uploadNewBook(this.form, this.param)
            .then(res => {
              this.loading = false
              console.log('上传书籍', res)
              this.$message.success('上传书籍成功')
              this.resetForm('form')
            })
            .catch(err => {
              this.loading = false
              console.log('上传书籍失败', err)
              this.$message.error('上传书籍失败 ' + err.msg)
            })
        } else {
          console.log('error submit!!')
          this.$message.info('请正确填写书籍信息并选择封面图片')
          return false
        }
      })
    },
    resetForm(formName) {
      this.loading = false
      this.fileList = []
      this.$refs[formName].resetFields()
    },
    onSubmit() {
      // var names = this.form.name
      // this.param.append('message', names)
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      // 然后通过下面的方式把内容通过axios来传到后台
      // 下面的this.$reqs 是在主js中通过Vue.prototype.$reqs = axios 来把axios赋给它;
      this.$reqs.post('/upload', this.param, config).then(function(result) {
        console.log(result)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .upload-container {
    text-align: center;
    // margin: 0px auto;

    .form-container {
      text-align: center;
      // padding: 0px auto;
    }
  }
  // .text-left {
  //   text-align: left;
  // }

  .form-item {
    max-width: 400px;
  }
</style>
