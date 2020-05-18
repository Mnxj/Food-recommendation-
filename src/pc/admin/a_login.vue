<template>
<!-- 外框 -->
<div class="a_login">
    <!-- 顶部 -->
    <div class="a_title">
        <p class="title-l">欢迎&nbsp;&nbsp;<span style="color:#FFB5B5 ;font-weight: bold;">{{admin.name}}</span>&nbsp;&nbsp;进入<span style="font-size:24px;  font-weight: bold;color:#000;">LIMT</span>，管理系统。。。</p>
        <p class="title-r">{{firstName|dateFormat}}</p>
    </div>
    <!-- 左边 -->
  <div class="center">
    <div class="a_center_left">
     <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
       <el-radio-button :label="false">展开</el-radio-button>
       <el-radio-button :label="true">收起</el-radio-button>
     </el-radio-group>
     <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <div  v-if="!isCollapse" class="block"><el-avatar  :size="30" ><img :src="admin.src" alt="" style="cursor: pointer;" @click="dialogVisible = !dialogVisible"></el-avatar></div>
        <el-submenu index="1">
             <template slot="title">
                <i class="el-icon-location"></i>
                  <span slot="title">记录</span>
             </template>
           <el-menu-item-group>
             <el-menu-item index="1-1" @click="flag=1" class="el-icon-user">
                &nbsp;<span style="font-weight: bold;color:#949449;">访客记录</span>
               
               </el-menu-item>
             <el-menu-item index="1-2" @click="flag=2" class="el-icon-user-solid">
                &nbsp;<span style="font-weight: bold;color:#EA7500;">用户记录</span>
               
               </el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
               <i class="el-icon-menu"></i>
                <span slot="title">管理</span>
            </template>
            <el-menu-item-group>
             <el-menu-item index="2-1" @click="flag=3" class="el-icon-user-solid"> 
               &nbsp;<span style="font-weight: bold;color:#BB5E00;">账户管理</span>
              </el-menu-item>
             <el-menu-item index="2-2" @click="flag=4" class="el-icon-info">
               &nbsp;<span style="font-weight: bold;color:#73BF00;">通知管理</span>
              </el-menu-item>
             <el-menu-item index="2-3" @click="flag=5" class="el-icon-s-promotion">
               &nbsp;<span style="font-weight: bold;color:#007979;">发布管理</span>
              </el-menu-item>
             <el-submenu index="2-4" >
                <template slot="title"> 
                  <i class="el-icon-s-order"></i><span style="font-weight: bold;color:#408080;">日志管理</span>
                </template>
                <el-menu-item index="2-4-1" @click="flag=6">置顶</el-menu-item>
                <el-menu-item index="2-4-2" @click="flag=7">审核</el-menu-item>
              </el-submenu>
               <el-menu-item index="2-5" @click="flag=10"  class="el-icon-video-camera-solid">
                  <span style="font-weight: bold;color: #000;">vlog审核</span>
               </el-menu-item>
             <el-menu-item index="2-6" @click="flag=8" class="el-icon-s-unfold">
               &nbsp;<span style="font-weight: bold;color: #C6A300;">标签管理</span>
             </el-menu-item>
             <el-menu-item index="2-7" @click="flag=9" class="el-icon-upload">&nbsp; 
               <span style="font-weight: bold;color: darkcyan;">更新说明</span>
               </el-menu-item>
            </el-menu-item-group>
        </el-submenu>
         <!-- <el-menu-item index="4">
          <i class="el-icon-setting"></i>
         <span slot="title">设置</span>
         </el-menu-item> -->
     </el-menu>
    </div>
    <!-- 右边 -->
    <div class="centerr">
       <adate v-if="flag==0"></adate>
       <Visitor v-else-if="flag==1"></Visitor>
       <Auser v-else-if="flag==2" ></Auser>
       <aidGL v-else-if="flag==3" :num='admin.id'></aidGL>
       <Alluserdata v-else-if="flag==4" :msg='admin.name'></Alluserdata>
       <release v-else-if="flag==5"></release>
       <esticky  v-else-if="flag==6"></esticky>
       <ereview  v-else-if="flag==7"></ereview>
       <alabel v-else-if="flag==8"></alabel>
       <alog v-else-if="flag==9" :msg='admin.name'></alog>
       <vreview v-else-if="flag==10"></vreview>
    </div>
  </div>
  <!-- modal -->
  <transition>
    <div class="fubiaoti"  v-if="dialogVisible">
      <div class="dataurl">
        <img :src="admin.src" alt="">
        <span style=" margin-right: 30px;">账号：{{admin.anumber}}</span>
      </div>
      <div class="datasore">
          <p>性别：{{admin.gender}}</p>
          <p>年龄：{{admin.age}}岁</p>
          <p>名字：{{admin.name}}</p>
          <p>邮箱：{{admin.emeil}}</p>
          <p>个性签名：{{admin.signature}}</p>
          <p>生日:{{admin.birthday}}</p>        
      </div>
      <span style="font-weight: bold;color: darkcyan; margin-left:90px;">初级管理员</span>
    </div>
  </transition>
</div>
    
</template>

<script>
//日历
import adate from '../admin/adate.vue'
//访客记录
import Visitor from '../admin/Visitor.vue'
//用户记录
import Auser from '../admin/Auser.vue'
import aidGL from '../admin/aidGL.vue'
import release from '../admin/release.vue'
//日志
import alog from '../admin/alog'
//全体通知
import Alluserdata from '../admin/Alluserdata'
//发布标签
import alabel from '../admin/alabel'
//置顶v
import esticky from '../admin/components/esticky'
//审核
import vreview from '../admin/components/vreview'
import ereview  from '../admin/components/ereview'
export default {
    data() {
        return {
            flag:0,//用作判断
            firstName:'',//存放时间
            isCollapse: false,//展开,
            admin:'',
            dialogVisible:false,//显示资料卡
        }
    },
    created(){
       this.getTime()
       this.getAdmin()
    },
    methods: {
        getTime(){
            this.firstName = new Date();
            //1秒调用一次时间函数
            this.timer = setTimeout(()=>{   //设置延迟执行 
                 this.getTime()
            },1000);
        },
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath);
        },
        getAdmin(){
          this.admin=this.$route.params.admin;
        }
        
    },
    components:{
     adate,
     Visitor,
     Auser,
     aidGL,
     release,
     alog,
     Alluserdata,
     alabel,
     esticky,
     vreview,
     ereview
    }
}
</script>
<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: all 1s ease;
}
.v-enter,.v-leave-to
{
  transform: translatex(100%);
  opacity: 0;
}
.a-enter-active,
.a-leave-active {
  transition: all 1s ease;
}
.a-enter,.v-leave-to
{
  transform: translatey(100%);
  opacity: 0;
}
.a_login{
   
    width: 100%;
    height: 100%;
    
    .a_title{
        height: 100px;
        background-color: grey;
        margin:0  50px;
        padding:40px 0 10px 10px; 
       
        .title-l{
            float: left;
            color: #fff;
           letter-spacing:5px; 
        }
        .title-r{
            float: right;
            color: #fff;
            padding-right: 30px;
        }

    }
    .center{
      padding-top:30px;
      background-color: #fff;
      margin: 0 50px;
     
        .a_center_left{
        float: left;
          .el-menu-vertical-demo:not(.el-menu--collapse) {
          width: 200px;
          min-height: 400px;
          .block{
              text-align: center;
          }
        }
      }
      .centerr{
       padding-left: 210px;   
      }
    
  }
  .fubiaoti{
      position: fixed;
      top:20%;
      left:70%;
      width: 300px;
      height: 400px;
      border-radius: 50px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      background-color:#6FB7B7;
      z-index: 99999;
      .dataurl{
             width: 300px;
             height: 60px;
             border-bottom-style: dotted;
             border-width: 1px;
             border-color: #000;
             padding-left: 40px;
             margin-top: 40px;
              img{
                width: 50px;
                height: 50px;
                border-radius: 50px;
                margin-right: 20px;
             }
        }
        .datasore{
             padding: 40px;
            p{
              color: #000;
            }
        }
  }
}
</style>
