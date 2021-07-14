<template>
  <div class="myAccount">
    <div class="wrapper1">
      <!--   用户照片    -->
      <div class="user-image">
        <div class="user-image-item">
          <el-image :src="user.avatar" class="user-image-content" />
        </div>
      </div>
    </div>
    <div class="user-message">
      <div class="user-message-item">
        <label class="message-label">用户id：</label>
        <label class="message-content">{{ user.uid }}</label>
      </div>
      <div class="user-message-item">
        <label class="message-label">用户名：</label>
        <label class="message-content">{{ user.name }}</label>
      </div>
      <div class="user-message-item">
        <label class="message-label">角色：</label>
        <label class="message-content">
          <span v-for="(role,index) in user.roles" :key="index">{{ role }}</span>
        </label>
      </div>
      <div class="user-message-item">
        <label class="message-label">权限：</label>
        <label class="message-content">
          <span v-for="(right,index) in user.rights" :key="index">{{ right.description }}  </span>
        </label>
      </div>
      <!-- <div class="user-message-item">
        <label class="message-label">  相关部门：</label>
        <label class="message-content">
          <span v-for="department in user.departments" :key="department.did">{{ department.dname }}        </span>
        </label>
      </div> -->
      <div class="user-message-item">
        <label class="message-label">性别：</label>
        <label class="message-content">{{ user.gender }}</label>
      </div>
      <div class="user-message-item">
        <label class="message-label">邮箱：</label>
        <label class="message-content">{{ user.email }}</label>
      </div>
      <div class="user-message-item" style="margin-bottom: 0">
        <label class="message-label">生日：</label>
        <label class="message-content">{{ user.birthday || "暂无" }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MyAccount',
  data() {
    return {
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
</style>
