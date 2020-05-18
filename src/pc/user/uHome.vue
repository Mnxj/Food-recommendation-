<template>
    <div class="uHome" >
      <main>
        <!-- 首页 -->
        <div class="cd-fixed-bg cd-bg-1" >
            
        </div> 
       <div class="cd-scrolling-bg cd-color-1">
         <div class="cd-container">
             <div class="tu_text">
               <img src="../../imgas/simple-house-logo.png" width="60px" height="60px" alt="">
            </div>
            <div class="text">
                <p style="color:#fff">欢迎。。。 </p>
                <p style="color:#fff">This is LITM</p>
            </div>
            <!-- 右 -->
            <div class="right">
                <button class="button" @click="flag = true">首页</button>
                <button class="button"  @click="flag = false">abourt</button>
                <button class="button"  @click="ufroum">forum</button>
            </div>
             <div class="wangy" @click="drawer = !drawer">
                <img src="../../imgas/wangyi.png" width="50px" height="50px;" alt="">
            </div>
            <!-- 中间 -->
            <ushoye v-if="flag"></ushoye>
            <uabourt v-else></uabourt>
          </div>
       </div>
      
        </main>
        <transition>
           <iframe v-show="drawer" class="wangyiy" frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=450 src="//music.163.com/outchain/player?type=0&id=3060170902&auto=1&height=430"></iframe>
        </transition>
    </div>
</template>
<script>
import ushoye from '../user/ushoye.vue'
import uabourt from '../user/uabourt.vue'
export default {
    data() {
        return {
            tetitflag:true,
            flag:true,
            drawer: false,
        }
    },
    created(){
        this.getFriend()
    },
    methods:{
        getFriend(){
           if(this.getUserflag.flag){
              this.$notify.info({
                  title: '消息',
                  message:this.getUserflag.text
               });
           }
           if(this.getToflag.flag){
              this.$notify.info({
                  title: '消息',
                  message:this.getToflag.text
               });
           }
           //wss://域名
           //ws://localhost:443
           this.$websocket.dispatch('WEBSOCKET_INIT',"ws://localhost:443/ws/asset/"+this.$store.getters.getUser.id)
        },
        ufroum(){
             this.$router.push({name:'uforum'});
        }
        //  closeSel(event){
        //     var btn =  document.getElementById('myPanel')// 得到点击出现的节点
            
        //     if(btn){
        //         this.tetitflag = true;
        //          if(!btn.contains(event.target)){            //按钮.app-download以外的区域
        //                     this.tetitflag = false;
        //          }
        //     }
        //  },
    },
    computed:{     
        getUserflag(){
            return this.$websocket.getters.getUserflag();
        },
        getToflag(){
            return this.$websocket.getters.getToflag();
        },
    },
    components:{
        ushoye,
        uabourt
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

.uHome{
    width: 1024px;
    margin: auto;
    background-color: #DDD;
    margin: 0 10%;
    height: 100%;
    .cd-fixed-bg {
        height: 500px;
        background-size: cover;
        background-attachment: fixed;
        background-repeat: no-repeat;
        background-position: center center;
        
    }
    .cd-fixed-bg.cd-bg-1 {
       background-image: url(../../imgas/P91103-174009.jpg);
       
    }
    .cd-scrolling-bg {
      min-height: 100%;
    }
    .cd-container{
        margin-top:-50px;    
    .tu_text{
        margin-top: -50px;
        padding-left:10px; 
        
       }
       .text{
        margin-top: -70px;
        padding-left:90px;
        font-weight: bold;
       }
        .right{
        float:right;
        margin-top: -70px ;
        padding-right:30px;
           .button{
            background-color: #ffffff00;
            margin: 10px;
            color: #fff;
            width: 100px;
            
           }
          .button:focus{
               box-shadow: 10px 10px 5px #888888;
           }
        }
    }
   .wangy{
       position: fixed; 
       z-index: 9999;
       margin-left: -70px;
       width: 50px;
       height: 50px;;
   }
   .wangy:active{
       box-shadow: 2px 2px 5px #888888;
   }
   .wangyiy{
       position: fixed;
        top:20%;
        left:75%;
       z-index: 99999;
   }    
}

</style>
