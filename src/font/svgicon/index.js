import Vue from 'vue'
import SvgIcon from './index.vue'// svg组件

Vue.component('svg-icon', SvgIcon)//注册全局组件

// install svg-sprite-loader --save-dev
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./icons', false, /\.svg$/)
requireAll(req)
