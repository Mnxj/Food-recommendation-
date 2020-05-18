<template>
    <el-menu
     :default-active="activeIndex"
       class="el-menu-demo utop"
        mode="horizontal"
      @select="handleSelect"
       background-color="#545c64"
     text-color="#fff"
     active-text-color="#ffd04b">
     <el-menu-item index="1"><span @click="index">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;首页&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></el-menu-item>
     <el-submenu index="2">
       <template slot="title">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;创作中心&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</template>
       <el-menu-item index="2-1" @click="data(5)">日志</el-menu-item>
       <el-menu-item index="2-2" @click="data(6)">vlog</el-menu-item>
     </el-submenu>
     <el-menu-item index="3" @click="data(8)">
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;好友&nbsp;&nbsp;
       <span v-if="getUserflag.flag">
         <el-tooltip class="item" effect="dark" :content="getUserflag.text" placement="bottom">
         <div  style="float:right; width:7px; height:7px;background-color: red;
          border-radius:50% ">
          </div>
         </el-tooltip>
       </span>
       &nbsp;&nbsp;&nbsp;&nbsp;
       </el-menu-item>
     <el-menu-item index="4"  @click="data(7)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消息中心&nbsp;&nbsp;
       <span v-if="getToflag.flag">
         <el-tooltip class="item" effect="dark" :content="getToflag.text" placement="bottom">
         <div  style="float:right; width:7px; height:7px;background-color: red;
          border-radius:50% ">
          </div>
         </el-tooltip>
       </span>
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-menu-item>
     <!-- <el-menu-item ><el-input v-model="input" placeholder="请输入内容" class="input1"></el-input></el-menu-item>
     <el-menu-item index="7" >搜索</el-menu-item> -->
     <el-menu-item index="5">
       <el-tooltip class="item" effect="dark" :content="user.name" placement="bottom">
       <img :src="user.src" width="60px" height="60px" alt="" @click="UserData"></el-tooltip></el-menu-item>
     <el-submenu index="6">
        <template slot="title">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;设置&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</template>
        <el-menu-item index="6-1" @click="data(1)">修改资料</el-menu-item>
        <el-menu-item index="6-2" @click="data(2)">修改密码</el-menu-item>
        <el-menu-item index="6-3" @click="data(3)">意见反馈</el-menu-item>
        <el-menu-item index="6-4" @click="data(4)">关于</el-menu-item>
        <el-menu-item index="6-5" @click="Exit">退出登录</el-menu-item>
     </el-submenu>
    </el-menu>
</template>

<script>
export default {
     data() {
      return {
        user:'',
        // input:'',
        activeIndex: '0',
        newsfalg:true
      };
    },
    created(){
      this.getUser()
    },
    methods: {
      UserData(){
         this.$router.push({name:'userdata1',params:{user2:this.user}});
      },
      index(){
         this.$router.push({name:'u_Home'});
      },
      handleSelect(key, keyPath) {

      },
      getUser(){
        this.user=this.$store.getters.getUser;
      },
      Exit(){
        this.$store.commit('remove');
         this.$websocket.state.websock.onclose();
        this.$router.push({name:'ulogin'});
      },
      data(num){
        if(num==1){
          this.$router.push({name:'Data'});
        }else if(num==2){
         this.$router.push({name:'password'});
        }else if(num==3){
         this.$router.push({name:'Feedback'});
        }else if(num==4){
         this.$router.push({name:'abourt'});
        }else if(num==5){
         this.$router.push({name:'setEassy'});
        }else if(num==6){
         this.$router.push({name:'setVideo'});
        }else if(num==8){
           //this.$websocket.state.websock.send(JSON.stringify(112233));
           this.$websocket.dispatch('setUserFlag');
           this.$router.push({name:'FriendChar'});
        }else if(num==7){
          this.$websocket.dispatch('setToFlag');
         this.$router.push({name:'FriendChar1'});
        }
        
      },
      
    
    
    
    
    },
    computed:{     
        getUserflag(){
            return this.$websocket.getters.getUserflag();
        },
        getToflag(){
            return this.$websocket.getters.getToflag();
        },
    },
    
}
</script>
<style lang="scss" scoped>
.utop{
  padding-left: 170px;
  .input1{
   height: 40px;
  }
}
</style>
 