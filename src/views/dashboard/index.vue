<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div class="dashboard-text">roles: <span v-for="role in roles" :key="role">{{ role }}</span></div>
    <el-button v-if="visible" @click="testSession">Test Session</el-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { testSession } from '@/api/role'

export default {
  name: 'Dashboard',
  data() {
    return {
      user: null,
      visible: false
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  created() {
    // testSession()
    //   .then(() => {
    //     this.visible = true
    //   })
    //   .catch(() => {
    //     this.visible = false
    //   })
  },
  methods: {
    testSession() {
      testSession().then(res => {
        console.log(res)
      })
        .catch(err => {
          console.log(err)
        })
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
</style>
