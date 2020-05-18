<template>
    <div class="m_login">
		<div class="login-k">
		  <form id='login-form' class="login-">
		   <h3 class="login-title">账号密码登录</h3>
		   <input type="text"  placeholder="支持账号和手机号登录" v-model="name">
		   <input type="password"  placeholder="密码" v-model="psd">
		   <button id='login' type="button" class="mui-btn mui-btn-block mui-btn-primary"  @click="submitForm">登录</button>
		   <div class="link-area"><router-link to="/m_index/m_regiter">注册账号</router-link> 
		   		<span class="spliter">|</span><router-link to="/m_index/m_psd">忘了密码</router-link>
		   </div>
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
            this.postRequest('/user/login',{
				username:this.name,
				psd:this.$md5(this.psd)
			}).then(
             resp=>{
                var data=resp.data;
                if(data.code==0){
                    console.log(data)
                   	this.$message({
          				message: '登录成功',
          				type: 'success'
        			});
					this.$store.commit('addUser',data.data);
					this.$router.push({name:"mindex"})
				 }else{
                  this.$message.error('登录失败');
                 }
             })
	 }
    },
}
</script>
<style lang="scss" scoped>
.m_login{
	width: 100%;
	height: 780px;
	background: url(../../imgas/369854.jpg);
    background-size:100% 100%;
	display:flex;
	line-height: 70px;
	justify-content:center;
	position: relative;
	.login-k{ 
		position: absolute;
		top: 20%;
		opacity: 0.7;
		width: 300px;
		height: 300px;
		border: 1px solid #F0F8FF;
		background-color: #FAEBD7;
		border-radius: 5px;
		text-align: center;
		 box-shadow: 4px -4px 8px  #DCDCDC;
		 .login-{
			 margin: 20px;
		 }
	}
}
</style>

