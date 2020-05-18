<template>
<div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
   created(){
    this.visitCount();
    this.getB();
    
  },
  methods: {
    getB(){
      if (this._isMobile()) {
      // alert("手机端");
      this.$router.replace('/m_login');
      } else {
     // alert("pc端");
      if(this.$route.path==='/admin'){
         //如果输入的时管理员界面就跳转
           this.$router.replace('/admin');
       }else{
          this.$router.replace('/pc_index');
       }
      
      }  
    },
    _isMobile(){
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    },
    visitCount:function(){
        this.getRequest('/visit/count')
    }
  },
}
</script>
<style lang="scss"  scoped>
</style>
