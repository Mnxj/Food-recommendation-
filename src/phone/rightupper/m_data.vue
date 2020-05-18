<template>
    <div class="m_data">
        <mtop></mtop>
        <div class="userdata2">
                <div class="dataurl">
                    <img :src="user.src" alt="">
                    <span style=" margin-right: 80px;">账号：{{user.anumber}}</span>
                     
                </div>
                <div class="datasore">
                    <p>性别：{{user.gender}}</p>
                    <p>年龄：{{user.age}}岁</p>
                    <p>名字：{{user.name}}</p>
                    <p>邮箱：{{user.emeil}}</p>
                    <p>个性签名：{{user.signature}}</p>
                    <p>生日:{{user.birthday}}</p>
                    
                </div>
                <el-button @click="Exit"  style="left:120px;">退出登录</el-button>
        </div>
    </div>
</template>

<script>
import mtop from '../rightupper/m_top.vue'
export default {
    data(){
        return{
            user:'',
            userflag:false
        }
    },
     created(){
         this.getUser()
    },
    methods:{
        getUser(){
             this.user=this.$route.params.user;
             var id=this.$store.getters.getUser.id;
             if(this.user.id==id){
                 this.userflag=true
             }
        },
        Exit(){
            this.$store.commit('remove');
             this.$router.replace('/m_login');
        },
    },
    components:{
        mtop
    }

}
</script>

<style lang="scss" scoped>
.m_data{
      .userdata2{
        
        margin: auto;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        padding-top: 40px;
       padding-bottom: 40px;
        .dataurl{
            
             height: 60px;
             border-bottom-style: dotted;
             border-width: 1px;
             border-color: #000;
             padding-left: 40px;
              img{
                width: 50px;
                height: 50px;
                border-radius: 50px;
                margin-right: 40px;
             }
        }
        .datasore{
             padding: 40px;
        }
    }
}
</style>

