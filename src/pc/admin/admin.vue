<template>
    <div class="admin">
        <div class="admin-bg">
         <form id='login-form' class="login">
		   <h3 class="login-title">管理员登录</h3>
		   <input type="text"  placeholder="支持账号和手机号登录" v-model="name">
		   <input type="password"  placeholder="密码" v-model="psd">
		   <button id='login' type="button" class="mui-btn mui-btn-block mui-btn-primary"  @click="submitForm">登录</button>
		  </form>
       </div>
    </div>
       
</template>

<script>
export default {

data() {
		return {
			name:'',
			psd:''
		}
	},methods: {
	 submitForm(){
          this.postRequest('/user/adminLogin',{username:this.name,psd:this.$md5(this.psd)}).then(
             resp=>{
                var data=resp.data;
                if(data.code==0){
                   this.$notify({
                     title: '成功',
                     type: 'success'
                   });
                    console.log(this.$store.state.user);
                    this.$router.push({name:'a_login',params:{admin:data.data}});
                 }else{
                    this.$notify.error({
                      title: '失败',
                      message: data.msg
                    });
                 }
             })
	 }
    },
}
</script>
<style lang="scss" scoped>
.admin{
    position:absolute;
    height: 100%;
    width: 100%;
    background: url(../../imgas/admin1.jpg) no-repeat;
    .admin-bg{
        opacity: 0.7;
        width: 27%;
        height: 39%;
        background-color: beige;
        margin-top: 20%;
        margin-left: 35%;
        text-align: center;
        padding-left: 2%;
        border-radius: 4%;
        .login{
            padding-top: 4%;
           width: 90%;
           height: 70%;
           .login-title{
               padding-bottom: 10%;
           }
        }
    }
}
</style>
