//1引入
import VueRouter from 'vue-router'

//2导入组件
import m_index from './router/m_index.vue'
import pc_index from './router/pc_index.vue'
//2.2手机组件
import m_login from './phone/rightupper/m_login.vue'
import m_help from './phone/rightupper/m_help.vue'
import m_abourt from './phone/rightupper/m_abourt.vue'
import m_regiter from './phone/rightupper/m_regiter.vue'
import m_data from './phone/rightupper/m_data.vue'
import m_resetpsd from './phone/rightupper/m_resetpsd.vue'
import m_psd from './phone/rightupper/m_psd.vue'
import m_sMS from './phone/rightupper/m_sMS.vue'
import m_release from './phone/rightupper/m_release.vue'
import m_readmoretext from './phone/utils/m_readmoretext.vue'
import m_readmorevideo from './phone/utils/m_readmorevideo.vue'
//2.3pc客户端
import uHome from './pc/user/uHome.vue'
import ulogin from './pc/user/ulogin.vue'
import uResetpsd from './pc/user/uResetpsd.vue'
import uregister from './pc/user/uregister.vue'
import release from './pc/user/relesase/release.vue'
import picture from './pc/user/upload/picture.vue'
import video from './pc/user/upload/video.vue'
import upicture from './pc/user/components/upicture.vue'
import uvideo from './pc/user/components/uvideo.vue'
import uforum from './pc/user/uforum.vue'
//2.3.1用户菜单栏
import password from './pc/user/setup/password.vue'
import Data from './pc/user/setup/Data.vue'
import Feedback from './pc/user/setup/Feedback.vue'
import abourt from './pc/user/setup/abourt.vue'
import setEassy from './pc/user/setup/setEassy.vue'
import setVideo from './pc/user/setup/setVideo.vue'
import FriendChar from './pc/user/setup/FriendChar.vue'
import FriendChar1 from './pc/user/setup/FriendChar1.vue'
import userdata from './pc/user/relesase/userdata.vue'
import userdata1 from './pc/user/relesase/userdata1.vue'
//2.3.2详情文章页
import readmoretext from './pc/user/readmore/readmoretext.vue'
import readmoretext2 from './pc/user/readmore/readmoretext2.vue'
import readmorevideo from './pc/user/readmore/readmorevideo.vue'
import readmorevideo2 from './pc/user/readmore/readmorevideo2.vue'
import readmorevideo3 from './pc/user/readmore/readmorevideo3.vue'
//2。4管理员系统
import admin from './pc/admin/admin.vue'
import a_login from './pc/admin/a_login.vue'

//3创建路由对象
var router=new VueRouter({
  mode:'hash',
  routes: [
     {//默认访问的是pc端
      path: '/',
      redirect: '/pc_index'
    },
    {
      path:'/admin',
      component:admin
    },
    {
      path:'/admin/a_login/:admin',
      component:a_login,
      name:'a_login'
    },
    {
      path: '/pc_index', // pc端首页
      component: pc_index
      
    },
    {
      path:'/pc_index/ulogin',
      component:ulogin,
      name:'ulogin'
    },
    {
      path:'/pc_index/uregister',
      component:uregister,
      name:'uregister'
    },
    {
      path:'/pc_index/uHome',
      component:uHome,
      name:'u_Home'
    },
    {
      path:'/pc_index/uHome/uforum',
      component:uforum,
      name:'uforum'
    },
    {
      path:'/pc_index/uHome/uforum/upicture',
      component:upicture,
      name:'upicture'
    },
    {
      path:'/pc_index/uHome/uforum/uvideo',
      component:uvideo,
      name:'uvideo'
    },
    {
      path:'/pc_index/ulogin/uResetpsd/:email',
      component:uResetpsd,
      name:'uResetpsd'

    },
    {
      path:'/pc_index/uHome/release',
      component:release,
      name:'release',
    },
    {
      path:'/pc_index/uHome/release/picture/:params',
      component:picture,
      name:'picture'
    },
    {
      path:'/pc_index/uHome/release/video/:params',
      component:video,
      name:'video'
    },
    
    //用户栏
    {
      path:'/pc_index/user/password',
      component:password,
      name:'password'
    },
    {
      path:'/pc_index/user/Data',
      component:Data,
      name:'Data'
    },
    {
      path:'/pc_index/user/Feedback',
      component:Feedback,
      name:'Feedback'
    },
    {
      path:'/pc_index/user/abourt',
      component:abourt,
      name:'abourt'
    },
    {
      path:'/pc_index/user/setEassy',
      component:setEassy,
      name:'setEassy'
    },
    {
      path:'/pc_index/user/setVideo',
      component:setVideo,
      name:'setVideo'
    },
   
    {
      path:'/pc_index/user/FriendChar',
      component:FriendChar,
      name:'FriendChar'
    },
    {
      path:'/pc_index/user/FriendChar1',
      component:FriendChar1,
      name:'FriendChar1'
    },
    {
      path:'/pc_index/user/userdata/:user2',
      component:userdata,
      name:'userdata'
    },
    {
      path:'/pc_index/user/userdata1/:user2',
      component:userdata1,
      name:'userdata1'
    },
    //详情页
    {
      path:'/pc_index/user/readmore/readmoretext/:Text',
      component:readmoretext,
      name:'readmoretext'
    },
    {
      path:'/pc_index/user/readmore/readmoretext2/:radname',
      component:readmoretext2,
      name:'readmoretext2'
    },
    { 
      name:'readmorevideo',
      path:'/pc_index/user/readmore/readmorevideo',
      component:readmorevideo,
     
    },
    { 
      name:'readmorevideo3',
      path:'/pc_index/user/readmore/readmorevideo3',
      component:readmorevideo3,
     
    },
    {
      path:'/pc_index/user/readmore/readmorevideo2/:radname',
      component:readmorevideo2,
      name:'readmorevideo2'
    },
    
    {
      path:'/m_login',
      component:m_login
    },
    //手机url
    {
      path: '/m_index', // 手机端首页
      component: m_index,
      name:'mindex'
    },
    
    {
      path:'/m_index/m_help',
      component:m_help
    },
    {
      path:'/m_index/m_abourt',
      component:m_abourt
    },
    
    {
      path:'/m_index/m_data/:user',
      component:m_data,
      name:'m_data'
    },
    {
      path:'/m_index/m_regiter',
      component:m_regiter
    },
    {
      path:'/m_index/m_resetpsd',
      component:m_resetpsd,
      name:'m_resetpsd'
    },
    {
      path:'/m_index/m_psd',
      component:m_psd
    },
    {
      path:'/m_index/m_sMS/:num',
      component:m_sMS,
      name:'m_sMS'
    },{
      path:'/m_index/m_release/:list',
      component:m_release,
      name:'m_release'
    },
    {
      path:'/m_index/m_readmoretext/:Text',
      component:m_readmoretext,
      name:'m_readmoretext'
    },
    {
      path:'/m_index/m_readmorevideo/:video',
      component:m_readmorevideo,
      name:'m_readmorevideo'
    },
  ]
})
// 把路由对象暴露出去
export default router