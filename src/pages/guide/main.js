import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    // navigationBarTitleText: 'guide',
    // navigationStyle: 'custom'
    'navigationBarTitleText': 'guide',

    'navigationBarTextStyle': '#fff',

    'navigationBarBackgroundColor': '#663399',

    'enablePullDownRefresh': true,

    'backgroundColor': '#aa154e',

    'backgroundTextStyle': 'dark',

    'onReachBottomDistance': 15,

    'navigationStyle': 'custom'
  }
}
