<template>
    <div>
        <h1 class="font">- - 登录- -</h1>
                <el-row class="len">
                <el-col :span="4"><div class="grid-content bg-purple ">账户：</div></el-col>
                 <el-col :span="20"><div class="grid-content bg-purple-light"><input type="text"  placeholder="支持账号和手机号登录" class="border" v-model="user.username"></div></el-col>
                </el-row>
                  <el-row class="len">
                <el-col :span="4"><div class="grid-content bg-purple">密码：</div></el-col>
                  <el-col :span="20"><div class="grid-content bg-purple-light"> <input type="password"  placeholder="密码"  class="border" v-model="user.password"></div></el-col>
                </el-row>
                   <div class="len">
		          <button id='login' type="button" class="mui-btn mui-btn-block mui-btn-primary" @click="sumbit">登录</button>
                  </div>
                   <el-row class="len">
                 <el-col :span="11"><div class="grid-content bg-purple"><p class="zz"  @click="hadleChange(count=1)">找回密码</p></div></el-col>
                  <el-col :span="1"><div class="grid-content bg-purple-light">|</div></el-col>
                  <el-col :span="11"><div class="grid-content bg-purple-light"><p class="zz" @click="register">注册账户</p></div></el-col>
                  </el-row>

    </div>
</template>

<script>
export default {
data(){
        return{
            count:'',
            user:{
                username:'',
                password:'',
                psd:''
            }
        }
    },
    methods: {
        sumbit(){
            this.user.psd=this.$md5(this.user.password);
            this.postRequest('/user/login',this.user).then(
             resp=>{
                var data=resp.data;
                if(data.code==0){
                   this.$notify({
                     title: '登录成功',
                     message:data.data.name,
                     type: 'success'
                   });
                    this.$store.commit('addUser',data.data);
                    this.$router.push({name:'u_Home'});
                 }else{
                    this.$notify.error({
                      title: '登录失败',
                      message: data.msg
                    });
                 }
             })
        },
        hadleChange(count){
            var event=count;
            this.$emit('change',event)
        }
        ,
        register(){
            this.$router.push({name:'uregister'});
        }
    },
}
</script>

<style>
 .font{
            color: aquamarine;
            text-shadow: 3px 5px 5px #FFA54F;
            padding-top: 12%;
            padding-bottom: 10%;
        }
        .zz{
            color:blue;
            
            cursor: pointer;
        }
        .len{
            padding-top: 8%;
            padding-bottom: 3%;
        }
        .border:hover{
                  border: 2px solid #FFD700;
        }
        .b2:active{
                  border: 3px solid #FFD700;
                  background-color: #FFD700;
        }
</style>
