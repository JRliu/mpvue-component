import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: 'slide_left',
    'usingComponents': {
      'slider-left': '../../../static/components/slide_left/index'
    }
  }
}
