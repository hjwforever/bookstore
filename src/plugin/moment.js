import Vue from 'vue'
import * as moment from 'moment'

moment.locale('zh-cn')
Vue.prototype.$moment = moment

export default moment
