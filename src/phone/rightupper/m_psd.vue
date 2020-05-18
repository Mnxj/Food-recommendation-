<template>
    <div>
         <h1 class="font">- - 找回密码- -</h1>
            <input type="text" placeholder="请输入邮箱" v-model="user.email" class="border" @change="keyPressy">
            <div class="daji">
              <span v-show="show" @click="getCode">获取验证码</span>
              <span v-show="!show" class="count">{{count}} s</span>
            </div>
             <input type="text"  placeholder="验证码"  class="border" v-model="user.yanz">
            <button id='login' type="button" class="mui-btn mui-btn-block mui-btn-primary" @click="sumbit">提交</button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            user:{
                email:"",
                 yanz:"",
            },
            show: true,
            count: '',
             timer: null,
        }
    },
    methods: {
        sumbit(){
           
            this.postRequest('/user/tj',this.user).then(
             resp=>{
                 if(resp.data.code==200){
                  this.$router.push({name:'m_resetpsd',params:{email:this.user.email}});
                 }else{
                     console.log("错误")
                 }
             }
            )
        },
         getCode(){
             this.postRequest('/user/email',this.user).then(
             resp=>{
                 
                 if(resp.data.code==0){
                    const TIME_COUNT = 60;
                    if (!this.timer) {
                        this.count = TIME_COUNT;
                         this.show = false;
                         this.timer = setInterval(() => {
                     if (this.count > 0 && this.count <= TIME_COUNT) {
                         this.count--;
                     } else {
                         this.show = true;
                         clearInterval(this.timer);
                         this.timer = null;
                    }
                        }, 1000)
                    }
                 }else{
                     
                 }
             })
    
         },
          keyPressy(){
            var y=this.user.email;
              var r = y.match(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/);
               if(r == null){
                   alert("请按规则重新输入");
                   this.user.email="";
               }
         }  
    },

}
</script>

<style>
 .font{
            color:blanchedalmond;
            text-shadow: 3px 5px 5px #FFA54F;
            padding-top: 12%;
            padding-bottom: 10%;
}
.border:hover{
     border: 2px solid #FFD700;
}

.daji{
    position: relative;
    z-index: 99999;
    margin-top: -15%;
    float:right;
    border: 2px solid #ddd;
    background-color: #ddd;
    padding: 8px;
}
</style>
