// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//1入口文件
import Vue from 'vue'
//导入app组件
import App from './App'
//1.1导入路由的包
import VueRouter from 'vue-router'
//1.2安装路由
Vue.use(VueRouter)
//1.3导入自己的路由模块
import router from './router.js'

const originalPush = VueRouter.prototype.push 
VueRouter.prototype.push = function push(location, onResolve, onReject) 
{ if (onResolve || onReject) 
  return originalPush.call(this, location, onResolve, onReject) 
  return originalPush.call(this, location).catch(err => err) 
}



//1.4引入resource
/*引入资源请求插件*/
import VueResource from 'vue-resource'
/*使用VueResource插件*/
Vue.use(VueResource)
//1.5引入富文本
import VueQuillEditor from 'vue-quill-editor'
//一定要引入这三个css，不然文本编辑器会出现不规则黑白几何图形
//这三个css可以在main.js中引入，也可以在具体使用的.vue文件中引入
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

//1.6视频播发插件
import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
Vue.use(VideoPlayer)

//注册Vuex
import Vuex from 'vuex'
Vue.use(Vuex)
//每次刚进入网站，肯定会调用mainjs，在刚调用的时候，先从本地存储中数据读出来
var user=JSON.parse(localStorage.getItem('user'))

var store=new Vuex.Store({
  state:{
    user:user,
  },
  mutations:{
    //添加记录
    addUser(state,goodsinfo){
      if(state.user==''||state.user==null){
        state.user = goodsinfo
        localStorage.setItem('user',JSON.stringify(state.user))
      }
    },
    remove(state){
      state.user=''
      localStorage.setItem('user',JSON.stringify(state.user))
    },
  },
  getters:{
    //获取用户信息
    getUser(state){
      return state.user;
    }
  },
})

import websocket from './utils/websocket'
Vue.prototype.$websocket = websocket;
// 导入格式化时间的插件
import moment from 'moment'
// 定义全局的过滤器
Vue.filter('dateFormat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

//3.1安装jquery
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

import { HappyScroll } from 'vue-happy-scroll'
//自定义组件名
Vue.component('happy-scroll', HappyScroll)
// 引入css
import 'vue-happy-scroll/docs/happy-scroll.css'

//4安装ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 导入 MUI 的样式
import '../src/lib/mui/css/mui.min.css'
import '../src/lib/mui/js/mui.min.js'
//导入样式


//5引入图表模块
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts 
import  'echarts/theme/macarons.js'

//6引入axios
import {getRequest} from '../src/utils/request'
import {postRequest} from '../src/utils/request'
import {deleteRequest} from '../src/utils/request'
import {putRequest} from '../src/utils/request'
import {uploadFileRequest} from '../src/utils/request'
Vue.prototype.postRequest=postRequest;
Vue.prototype.getRequest=getRequest;
Vue.prototype.deleteRequest=deleteRequest;
Vue.prototype.putRequest=putRequest;
Vue.prototype.uploadFileRequest=uploadFileRequest;

//7.引入babel-polyfill处理器
import 'babel-polyfill'

// 按需导入 Mint-UI 中的组件   
import { Header, Swipe, Navbar, TabItem,SwipeItem, Button, Lazyload } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.component(Navbar.name, Navbar)
Vue.component(TabItem.name, TabItem)
Vue.use(Lazyload);

import 'mint-ui/lib/style.css'
//8引入mad5
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

//在定制化程度较高的项目中，开发者可能只想通过 vue-amap 引入高德地图，
//而部分实例化的操作直接基于高德地图的 sdk 完成。
//这个时候就需要 lazyAMapApiLoaderInstance。
//引入amap
import VueAMap from 'vue-amap';
Vue.use(VueAMap);


//引入图片剪切
import VueCropper from 'vue-cropper' 
Vue.use(VueCropper)

VueAMap.initAMapApiLoader({
  key: '1fee4bf84f874925343bcc8e799017c5',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','AMap.Geolocation','AMap.Geocoder'],
  // 默认高德 sdk 版本为 1.4.4
  uiVersion: '1.0.11'
});
//生产提示
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  //render方法的实质就是生成template模板
  render:c=>c(App),
  router, //1.4挂在路由对象到VM实列上
  store
})
