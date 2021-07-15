<template>
  <div class="myAccount">
    <div class="wrapper1">
      <div class="user-image">
        <div class="user-image-item">
          <el-image :src="user.avatar" class="user-image-content" />
        </div>
      </div>
    </div>
    <div class="user-message">
      <el-row v-for="(item, key, index) in user" :key="index" class="user-message-item">
        <div v-if="!Array.isArray(item)">
          <el-row type="flex">
            <el-col v-if="returnName(key).label" :span="6" class="message-label">{{ returnName(key).label }}:</el-col>
            <el-col v-if="returnName(key).label" :span="18" class="message-content" style="display: flex">
              <el-input :value="returnValue(key, item)" :disabled="!returnName(key).editable">{{ item }} </el-input>
              <el-button v-if="returnName(key).editable" type="primary" @click="handleEdit(key)">修改</el-button>
            </el-col>
          </el-row>
        </div>
        <div v-else class="item-box">
          {{ returnDeepName(key, deepDic).label }}
          <el-card v-for="(_item, _key, _index) in item" :key="_index" class="item-card">
            <el-row v-for="(__item, __key, __index) in _item" :key="__index" type="flex">
              <el-col v-if="returnDeepName(__key, returnName(key).label).label" :span="6" class="message-label">{{ returnDeepName(__key, returnName(key).label).label + ':   ' }}</el-col>
              <el-col v-if="returnDeepName(__key, returnName(key).label).label" :span="12" class="message-content">
                {{ __item }}
              </el-col>
            </el-row>
          </el-card>
          <!-- <el-carousel :interval="4000" type="card">
            <el-carousel-item v-for="(_item, _key, _index) in item" :key="_index">
              <el-row v-for="(__item, __key, __index) in _item" :key="__index" type="flex">
                <el-col v-if="returnDeepName(__key, returnName(key).label).label" :span="6" class="message-label">{{ returnDeepName(__key, returnName(key).label).label + ':   ' }}</el-col>
                <el-col v-if="returnDeepName(__key, returnName(key).label).label" :span="12" class="message-content">
                  {{ __item }}
                </el-col>
              </el-row>
            </el-carousel-item>
          </el-carousel> -->
        </div>
      </el-row>
    </div>
    <el-dialog
      :title="'修改'+title"
      :visible.sync="dialogVisible"
      width="30%"
      center
      destroy-on-close
      @before-close="handleClose"
    >
      <el-input v-model="newValue" :disabled="disabled" :type="title=='密码'? 'password':'text'" :placeholder="'请输入新'+title" />
      <el-input v-model="captcha" placeholder="请输入验证码" style="margin-top: 20px; width: 50%" /><el-button :v-loading="captchaLoading" type="success" @click="getCaptcha">获取验证码</el-button>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button @click="getCenterInfo">获取</el-button>
        <el-button type="primary" :v-loading="submitLoading" @click="handleSubmit">确认修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getCaptcha, bindEmail, getPwdCaptcha, modifyPassword } from '@/api/auth'
import { getUserCenter } from '@/api/user'
import { validEmail } from '@/utils/validate'

export default {
  name: 'MyAccount',
  data() {
    return {
      editableKeyList: ['email', 'addressesList', 'password'],
      deepDic: {
        roles: '角色列表',
        rights: '权限列表',
        addressesList: '地址列表'
      },
      nameDic: {
        'uid': '用户ID',
        // 'gender': '性别',
        'name': '账号名称',
        'password': '密码',
        'nickname': '用户昵称',
        'email': '邮箱',
        'birthday': '生日',
        // 'avatar': 'https://z3.ax1x.com/2021/04/11/cwKLLj.png',
        // 'active': true,
        'roles': { 'role_id': '角色编号', 'rolename': '角色名称', 'description': '角色描述' },
        'rights': { 'priv_id': '权限编号', 'privname': '权限名称', 'description': '权限描述' },
        'addressesList': {
          'addr_id': '地址ID',
          // 'user_id': '用户ID',
          'phone': '手机号码',
          'zip_code': '邮政编码',
          'receiver_state': '省份',
          'receiver_city': '城市',
          'receiver_district': '区/县',
          'detail_address': '详细地址',
          'country': '国家',
          'default_addr': '是否为默认地址'
        }
      },
      dialogVisible: false,
      title: '',
      newValue: '',
      captchaLoading: false,
      submitLoading: false,
      captcha: '',
      disabled: false
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  created() {
  },
  methods: {
    returnName(originName) {
      return {
        label: this.nameDic[originName],
        editable: this.editableKeyList.includes(originName)
      }
    },
    returnDeepName(originName, dic) {
      return {
        label: dic[originName],
        editable: this.editableKeyList.includes(originName)
      }
    },
    returnValue(key, item) {
      return key === 'password' ? '' : (item || 'null')
    },
    handleEdit(key) {
      this.title = this.returnName(key).label
      this.dialogVisible = true
    },
    getCaptcha() {
      this.captchaLoading = true
      if (this.title === '密码' || this.title === 'password') {
        if (this.newValue.length < 6 || this.newValue.length > 16) {
          this.$message({
            message: '请输入长度在6~16的密码',
            type: 'error',
            duration: 3000
          })
          return
        }
        console.log('getPwdCaptcha')
        getPwdCaptcha()
          .then(res => {
            this.disabled = true
            console.log('获取修改密码的验证码', res)
            this.$message.success('验证码已发送，请在新邮箱查看')
            this.captchaLoading = false
          })
          .catch(err => {
            this.disabled = false
            this.captchaLoading = false
            console.log('获取修改密码的验证码失败', err)
          })
      } else {
        if (!validEmail(this.newValue)) {
          this.$message({
            message: '请输入正确格式的邮箱',
            type: 'error',
            duration: 800
          })
          return
        }
        console.log('getCaptcha')
        getCaptcha({ keyword: this.newValue })
          .then(res => {
            this.disabled = true
            this.captchaLoading = false
            this.$message.success('验证码已发送，请在邮箱查看')
            console.log('获取绑定邮箱的验证码', res)
          })
          .catch(err => {
            this.disabled = false
            this.captchaLoading = false
            console.log('获取绑定邮箱的验证码失败', err)
          })
      }
    },
    clearDialog() {
      this.captchaLoading = false
      this.submitLoading = false
      this.captcha = ''
      this.newValue = ''
    },
    handleClose() {
      this.dialogVisible = false
      this.disabled = false
      this.clearDialog()
    },
    handleSubmit() {
      this.submitLoading = true
      if (this.title === '密码' || this.title === 'password') {
        modifyPassword({ password: this.newValue, captcha: this.captcha })
          .then(res => {
            this.getCenterInfo()
            console.log('修改密码成功', res)
            this.$message.success(res.msg)
            this.handleClose()
          })
          .catch(err => {
            console.log('修改密码失败', err)
          })
      } else {
        bindEmail({ email: this.newValue, captcha: this.captcha })
          .then(res => {
            this.getCenterInfo()
            this.$message.success(res.msg)
            console.log('绑定邮箱成功', res)
            this.handleClose()
          })
          .catch(err => {
            console.log('绑定邮箱失败', err)
          })
      }
    },
    getCenterInfo() {
      getUserCenter()
        .then(res => {
          this.$message.success(res.msg)
          console.log('获取个人中心信息成功', res)
        })
        .catch(err => {
          console.log('获取个人中心信息失败', err)
        })
    }
  }
}
</script>

<style scoped>
.myAccount {
  margin-top: 50px;
}

.user-message {
  margin-left: 40px;
  float: left;
  position: relative;
}

.user-message-item {
  color: #606266;
  font-weight: 700;
  font-size: 22px;
  margin-bottom: 20px;
}

.message-label {
  width: 120px;
  text-align: right;
  display: inline-block;
}

.user-image {
  margin-left: 60px;
  float: left;
  position: relative;
}

.user-image-content {
  width: 120px;
  height: 120px;
}

.user-image-label {
  font-weight: 200;
  color: #8492a6;
  font-size: 14px;
  display: block;
  text-align: center;
  margin-top: 5px;
}

.clearFloat {
  clear: both;
}

.empty-block {
  height: 20px;
}

.recent-accessed {
  margin: 20px 40px;
}

.recent-accessed-label {
  color: #606266;
  font-weight: 700;
  font-size: 22px;
  margin: 5px 0;
  width: 120px;
  text-align: right;
  display: inline-block;
}

.recent-accessed-list {
  margin-left: 120px;
}

.recent-accessed-item {
  margin-right: 20px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.item-box {
  margin-bottom: 20px;
}

.item-card {
  margin-top: 10px;
}
</style>
