import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

import '@/style/grid.scss'

export default {
  config: {
    navigationBarTitleText: 'waterfall'
  }
}
