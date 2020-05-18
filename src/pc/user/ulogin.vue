<template>
<!-- 登录 -->
    <div class="ulogin">
        <div class="mei">
            <el-card class="box-card">
                  <!-- 第一个图片 -->
                 <img src="../../imgas/383262.jpg" alt="">
            <!-- 登录框 -->
                 <div class="login">
                    <el-card class="card" shadow="always">
                        <udenglu @change="hadleChange" v-if="msg==0"></udenglu>
                        <upsd v-else-if="msg==1"></upsd>
                        
                    </el-card>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import udenglu from '../user/udenglu.vue'
import upsd from '../user/upsd.vue'
export default {
    data(){
        return{
            msg:""
        }
    },
    methods: {
        hadleChange(event){
            this.msg=event;
        }
    },
    components:{
        udenglu,
        upsd,
    }

}
</script>
<style lang="scss" scoped>
.ulogin{
    width: 100%;
    height: 100%;
    padding-top: 2%;
    padding-left: 15%;

    .mei{
        
        width: 80%;
        border: 3px solid #ddd;
        .box-card{
          margin-top: 0;
          padding-top: 3%;
          width: 100%;
          img{
          width: 55%;
          height: 600px;
          float: left;
          }
        }
    }
    .login{
         text-align: center;
         .card{
          height: 600px;
        
         }

        
    }
   
}
</style>

